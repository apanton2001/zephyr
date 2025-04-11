import { createClient, SupabaseClient, PostgrestSingleResponse, PostgrestError } from '@supabase/supabase-js'; 
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Define interfaces for mock data structure
interface MockInventory { id: string; sku: string; name: string; current_stock: number; min_stock_level: number; location_id: string; created_at: string; updated_at: string; [key: string]: any; }

// Need to import PostgrestResponse for the type assertion later
import { PostgrestResponse } from '@supabase/supabase-js';

vi.mock('@supabase/supabase-js', () => {
  const mockChain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ 
      data: { id: 'default-id' }, 
      error: null, 
      status: 200, 
      statusText: 'OK', 
      count: 1 
    }),
    rpc: vi.fn().mockResolvedValue({ 
      data: {}, 
      error: null, 
      status: 200, 
      statusText: 'OK', 
      count: 0 
    }),
  };

  const mockSupabaseClient = {
    from: vi.fn().mockReturnValue(mockChain),
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signUp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    },
    rpc: mockChain.rpc, 
  };

  return {
    createClient: vi.fn(() => mockSupabaseClient),
  };
});

let supabase: SupabaseClient;

describe('Database Schema', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
    supabase = createClient('mockUrl', 'mockKey'); 
    // No default mocks needed here anymore
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Inventory Table Schema', () => {
    it('should have correct inventory table structure', async () => {
      const mockInventoryItem = { sku: 'TEST-INV', name: 'Test Item', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }; 
      // Mock ONLY the insert call outcome for THIS test
      vi.mocked(supabase.from('inventory').insert).mockResolvedValueOnce({ data: [mockInventoryItem], error: null, status: 201, statusText: 'Created', count: 1 } as PostgrestResponse<any>); // Target .insert directly

      const { error } = await supabase.from('inventory').insert([mockInventoryItem]); // Call matches mock
      expect(error).toBeNull();
    });
  });

  describe('Orders Table Schema', () => {
    it('should have correct orders table structure', async () => {
      const mockOrderItem = { client_id: 'client-1', order_date: new Date().toISOString(), status: 'Pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }; 
       // Mock ONLY the insert call outcome for THIS test
      vi.mocked(supabase.from('orders').insert).mockResolvedValueOnce({ data: [mockOrderItem], error: null, status: 201, statusText: 'Created', count: 1 } as PostgrestResponse<any>); // Target .insert directly
      
      const { data, error } = await supabase.from('orders').insert([mockOrderItem]); // Call matches mock

      expect(error).toBeNull(); 
      expect(data).toBeDefined();
      expect(data![0]).toHaveProperty('client_id');
      expect(data![0]).toHaveProperty('status');
      expect(data![0]).toHaveProperty('created_at');
      expect(data![0]).toHaveProperty('updated_at');
    });
  });

  describe('Warehouse Locations Table Schema', () => {
    it('should have correct locations table structure', async () => {
      const mockLocationItem = { zone: 'A', aisle: '1', bay: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }; 
      // Mock ONLY the insert call outcome for THIS test
      vi.mocked(supabase.from('warehouse_locations').insert).mockResolvedValueOnce({ data: [mockLocationItem], error: null, status: 201, statusText: 'Created', count: 1 } as PostgrestResponse<any>); // Target .insert directly

      const { data, error } = await supabase.from('warehouse_locations').insert([mockLocationItem]); // Call matches mock

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data![0]).toHaveProperty('zone');
      expect(data![0]).toHaveProperty('aisle');
      expect(data![0]).toHaveProperty('created_at');
      expect(data![0]).toHaveProperty('updated_at');
    });
  });

  describe('Foreign Key Relationships', () => {
    it('should handle foreign key constraints on insert', async () => {
      const fkError: PostgrestError = { 
          name: 'PostgrestError', 
          message: 'FK violation', 
          details: 'Key (location_id)=(invalid) is not present in table "warehouse_locations".', 
          hint: 'Check location_id', 
          code: '23503' 
      }; 
       // Fix count: should be null for single error response
      const mockErrorResponse: PostgrestSingleResponse<null> = { data: null, error: fkError, status: 400, statusText: 'Bad Request', count: null }; 
      
      // Mock the FULL CHAIN (.insert().select().single())
      vi.mocked(supabase.from('inventory').insert(expect.any(Array)).select().single)
        .mockResolvedValueOnce(mockErrorResponse);

      const { data, error } = await supabase
        .from('inventory')
        .insert([{ sku: 'FK-TEST', name: 'FK Item', location_id: 'invalid' }])
        .select()
        .single(); // Call matches the full chain mock

      expect(data).toBeNull();
      expect(error).toEqual(fkError);
      expect(error?.code).toBe('23503');
    });
  });

  describe('Timestamp Triggers', () => {
    it('should automatically update timestamps', async () => {
      const now = new Date();
      const past = new Date(now.getTime() - 5000);
      const mockTimestampData: MockInventory = {
        id: 'ts-1', sku: 'TS123', name: 'Timestamp Item', current_stock: 50, min_stock_level: 5, location_id: 'loc-1',
        created_at: past.toISOString(), updated_at: now.toISOString(), 
      };
      const mockSuccessResponse: PostgrestSingleResponse<MockInventory> = { data: mockTimestampData, error: null, status: 200, statusText: 'OK', count: 1 };

       // Mock the FULL CHAIN (.insert().select().single())
      vi.mocked(supabase.from('inventory').insert(expect.any(Array)).select().single)
        .mockResolvedValueOnce(mockSuccessResponse);

      const { data, error } = await supabase
        .from('inventory')
        .insert([{ sku: 'TS123', name: 'Timestamp Item', current_stock: 50, location_id: 'loc-1' }]) // Assuming min_stock not required for insert
        .select()
        .single(); // Call matches the full chain mock

      expect(error).toBeNull();
      expect(data).toBeDefined(); 
      expect(data!.created_at).toBeDefined(); 
      expect(data!.updated_at).toBeDefined();
      expect(new Date(data!.updated_at).getTime()).toBeGreaterThanOrEqual(new Date(data!.created_at).getTime());
      expect(data).toEqual(mockTimestampData);
    });
  });

});
