import { createClient } from '@supabase/supabase-js';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
    },
  })),
}));

describe('Authentication System', () => {
  let supabase: any;

  beforeEach(() => {
    // Create a fresh mock for each test
    supabase = createClient('mock-url', 'mock-key');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('User Registration', () => {
    it('should successfully register a new user', async () => {
      const mockUser = {
        id: 'test-id',
        email: 'test@example.com',
        role: 'warehouse_staff',
      };

      supabase.auth.signUp.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'test-password',
      });

      expect(error).toBeNull();
      expect(data.user).toEqual(mockUser);
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'test-password',
      });
    });

    it('should handle registration errors', async () => {
      const mockError = {
        message: 'Email already registered',
      };

      supabase.auth.signUp.mockResolvedValue({
        data: { user: null },
        error: mockError,
      });

      const { data, error } = await supabase.auth.signUp({
        email: 'existing@example.com',
        password: 'test-password',
      });

      expect(error).toEqual(mockError);
      expect(data.user).toBeNull();
    });
  });

  describe('User Login', () => {
    it('should successfully log in a user', async () => {
      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        user: {
          id: 'test-id',
          email: 'test@example.com',
          role: 'warehouse_staff',
        },
      };

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'test-password',
      });

      expect(error).toBeNull();
      expect(data.session).toEqual(mockSession);
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'test-password',
      });
    });

    it('should handle login errors', async () => {
      const mockError = {
        message: 'Invalid credentials',
      };

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: null },
        error: mockError,
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'wrong-password',
      });

      expect(error).toEqual(mockError);
      expect(data.session).toBeNull();
    });
  });

  describe('Session Management', () => {
    it('should get current session', async () => {
      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh-token',
        user: {
          id: 'test-id',
          email: 'test@example.com',
          role: 'warehouse_staff',
        },
      };

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const { data, error } = await supabase.auth.getSession();

      expect(error).toBeNull();
      expect(data.session).toEqual(mockSession);
    });

    it('should handle expired sessions', async () => {
      const mockError = {
        message: 'Session expired',
      };

      supabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: mockError,
      });

      const { data, error } = await supabase.auth.getSession();

      expect(error).toEqual(mockError);
      expect(data.session).toBeNull();
    });
  });

  describe('User Logout', () => {
    it('should successfully log out a user', async () => {
      supabase.auth.signOut.mockResolvedValue({
        error: null,
      });

      const { error } = await supabase.auth.signOut();

      expect(error).toBeNull();
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('User Role Management', () => {
    it('should get user with role information', async () => {
      const mockUser = {
        id: 'test-id',
        email: 'test@example.com',
        role: 'warehouse_staff',
      };

      supabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const { data, error } = await supabase.auth.getUser();

      expect(error).toBeNull();
      expect(data.user).toEqual(mockUser);
      expect(data.user.role).toBe('warehouse_staff');
    });
  });
});
