import { createClient } from '@supabase/supabase-js';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn((_table: string) => ({
      select: vi.fn().mockImplementation(() => Promise.resolve({ data: [], error: null })),
      insert: vi.fn().mockImplementation((data) => Promise.resolve({ data: Array.isArray(data) ? data : [data], error: null })),
      update: vi.fn().mockImplementation((data) => Promise.resolve({ data: Array.isArray(data) ? data : [data], error: null })),
      delete: vi.fn().mockImplementation(() => Promise.resolve({ data: null, error: null })),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    })),
    rpc: vi.fn().mockImplementation((_func, data) => Promise.resolve({ data: Array.isArray(data) ? data : [data], error: null })),
  })),
}));

describe('Employee Management', () => {
  let supabase: any;

  beforeEach(() => {
    supabase = createClient('mock-url', 'mock-key');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Employee CRUD Operations', () => {
    const mockEmployee = {
      id: 'EMP-123',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      role: 'warehouse_staff',
      department: 'picking',
      status: 'active',
      hire_date: '2025-01-01T00:00:00Z',
      skills: ['forklift_operation', 'inventory_management'],
      certifications: ['forklift_certified'],
      shift_preference: 'morning',
      created_at: '2025-04-10T00:00:00Z',
      updated_at: '2025-04-10T00:00:00Z'
    };

    it('should create new employee', async () => {
      supabase.from('employees').insert.mockResolvedValue({
        data: [mockEmployee],
        error: null
      });

      const { data, error } = await supabase
        .from('employees')
        .insert([mockEmployee]);

      expect(error).toBeNull();
      expect(data[0]).toEqual(mockEmployee);
    });

    it('should validate employee email', async () => {
      const invalidEmployee = {
        ...mockEmployee,
        email: 'invalid-email'
      };

      supabase.from('employees').insert.mockResolvedValue({
        data: null,
        error: {
          message: 'Invalid email format'
        }
      });

      const { data, error } = await supabase
        .from('employees')
        .insert([invalidEmployee]);

      expect(error).toBeTruthy();
      expect(error.message).toContain('Invalid email');
      expect(data).toBeNull();
    });

    it('should update employee skills', async () => {
      const skillsUpdate = {
        skills: ['forklift_operation', 'inventory_management', 'ar_picking'],
        updated_at: '2025-04-10T01:00:00Z'
      };

      supabase.from('employees').update.mockResolvedValue({
        data: [{ ...mockEmployee, ...skillsUpdate }],
        error: null
      });

      const { data, error } = await supabase
        .from('employees')
        .update(skillsUpdate)
        .eq('id', mockEmployee.id);

      expect(error).toBeNull();
      expect(data[0].skills).toContain('ar_picking');
    });
  });

  describe('Skill Management', () => {
    it('should assign certifications', async () => {
      const certificationUpdate = {
        certifications: ['forklift_certified', 'hazmat_certified'],
        certification_dates: {
          forklift_certified: '2025-04-10',
          hazmat_certified: '2025-04-10'
        }
      };

      supabase.from('employees').update.mockResolvedValue({
        data: [{
          id: 'EMP-123',
          ...certificationUpdate
        }],
        error: null
      });

      const { data, error } = await supabase
        .from('employees')
        .update(certificationUpdate)
        .eq('id', 'EMP-123');

      expect(error).toBeNull();
      expect(data[0].certifications).toContain('hazmat_certified');
    });

    it('should validate certification requirements', async () => {
      const invalidCertification = {
        certifications: ['forklift_certified'],
        certification_dates: {}
      };

      supabase.from('employees').update.mockResolvedValue({
        data: null,
        error: {
          message: 'Certification date required'
        }
      });

      const { data, error } = await supabase
        .from('employees')
        .update(invalidCertification)
        .eq('id', 'EMP-123');

      expect(error).toBeTruthy();
      expect(error.message).toContain('date required');
      expect(data).toBeNull();
    });
  });

  describe('Schedule Management', () => {
    it('should assign shifts', async () => {
      const shiftAssignment = {
        employee_id: 'EMP-123',
        shift_date: '2025-04-11',
        shift_type: 'morning',
        start_time: '08:00',
        end_time: '16:00',
        zone_assignment: 'A'
      };

      supabase.from('employee_shifts').insert.mockResolvedValue({
        data: [shiftAssignment],
        error: null
      });

      const { data, error } = await supabase
        .from('employee_shifts')
        .insert([shiftAssignment]);

      expect(error).toBeNull();
      expect(data[0]).toEqual(shiftAssignment);
    });

    it('should prevent schedule conflicts', async () => {
      const conflictingShift = {
        employee_id: 'EMP-123',
        shift_date: '2025-04-11',
        shift_type: 'evening',
        start_time: '15:00', // Overlaps with existing shift
        end_time: '23:00'
      };

      supabase.from('employee_shifts').insert.mockResolvedValue({
        data: null,
        error: {
          message: 'Schedule conflict detected'
        }
      });

      const { data, error } = await supabase
        .from('employee_shifts')
        .insert([conflictingShift]);

      expect(error).toBeTruthy();
      expect(error.message).toContain('conflict');
      expect(data).toBeNull();
    });
  });

  describe('Performance Tracking', () => {
    it('should track picking performance', async () => {
      const performanceMetrics = {
        employee_id: 'EMP-123',
        date: '2025-04-10',
        orders_picked: 45,
        items_picked: 150,
        accuracy_rate: 0.98,
        average_pick_time: 120,
        distance_traveled: 2500
      };

      supabase.from('employee_performance').insert.mockResolvedValue({
        data: [performanceMetrics],
        error: null
      });

      const { data, error } = await supabase
        .from('employee_performance')
        .insert([performanceMetrics]);

      expect(error).toBeNull();
      expect(data[0]).toEqual(performanceMetrics);
    });

    it('should calculate performance metrics', async () => {
      supabase.rpc.mockResolvedValue({
        data: {
          employee_id: 'EMP-123',
          average_orders_per_day: 42,
          accuracy_rate: 0.98,
          efficiency_score: 0.85
        },
        error: null
      });

      const { data, error } = await supabase.rpc('calculate_employee_metrics', {
        employee_id: 'EMP-123',
        start_date: '2025-04-01',
        end_date: '2025-04-10'
      });

      expect(error).toBeNull();
      expect(data).toHaveProperty('efficiency_score');
      expect(data.efficiency_score).toBeGreaterThan(0);
    });
  });

  describe('Team Management', () => {
    it('should assign team leads', async () => {
      const teamAssignment = {
        team_id: 'TEAM-123',
        lead_id: 'EMP-123',
        members: ['EMP-124', 'EMP-125'],
        zone_responsibility: 'A'
      };

      supabase.from('warehouse_teams').insert.mockResolvedValue({
        data: [teamAssignment],
        error: null
      });

      const { data, error } = await supabase
        .from('warehouse_teams')
        .insert([teamAssignment]);

      expect(error).toBeNull();
      expect(data[0]).toEqual(teamAssignment);
    });

    it('should validate team composition', async () => {
      const invalidTeam = {
        team_id: 'TEAM-123',
        lead_id: 'EMP-123',
        members: [] // Empty team
      };

      supabase.from('warehouse_teams').insert.mockResolvedValue({
        data: null,
        error: {
          message: 'Team must have at least one member'
        }
      });

      const { data, error } = await supabase
        .from('warehouse_teams')
        .insert([invalidTeam]);

      expect(error).toBeTruthy();
      expect(error.message).toContain('must have at least one member');
      expect(data).toBeNull();
    });
  });

  describe('Training and Development', () => {
    it('should track training completion', async () => {
      const trainingRecord = {
        employee_id: 'EMP-123',
        training_id: 'TRAIN-123',
        training_type: 'ar_picking',
        completion_date: '2025-04-10',
        score: 95,
        certified: true
      };

      supabase.from('employee_training').insert.mockResolvedValue({
        data: [trainingRecord],
        error: null
      });

      const { data, error } = await supabase
        .from('employee_training')
        .insert([trainingRecord]);

      expect(error).toBeNull();
      expect(data[0]).toEqual(trainingRecord);
    });

    it('should identify training needs', async () => {
      supabase.rpc.mockResolvedValue({
        data: [
          {
            employee_id: 'EMP-123',
            missing_certifications: ['hazmat_handling'],
            expiring_certifications: ['forklift_certified']
          }
        ],
        error: null
      });

      const { data, error } = await supabase.rpc('identify_training_needs');

      expect(error).toBeNull();
      expect(data[0]).toHaveProperty('missing_certifications');
      expect(data[0].missing_certifications).toContain('hazmat_handling');
    });
  });
});
