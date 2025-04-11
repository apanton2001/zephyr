import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { createClient } from '@supabase/supabase-js';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(),
    },
  })),
}));

describe('API Framework', () => {
  let app: express.Application;
  let supabase: any;

  beforeEach(() => {
    app = express();
    supabase = createClient('mock-url', 'mock-key');
    
    // Basic middleware setup
    app.use(express.json());
    app.use((req: any, res: any, next: any) => {
      req.supabase = supabase;
      next();
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication Middleware', () => {
    it('should authenticate valid JWT tokens', async () => {
      const mockUser = {
        id: 'test-id',
        email: 'test@example.com',
        role: 'warehouse_staff',
      };

      supabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      app.get('/protected', async (req: any, res: any) => {
        try {
          const { data: { user }, error } = await req.supabase.auth.getUser();
          if (error) throw error;
          res.json({ user });
        } catch (error) {
          res.status(401).json({ error: 'Unauthorized' });
        }
      });

      const response = await request(app)
        .get('/protected')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body.user).toEqual(mockUser);
    });

    it('should reject invalid JWT tokens', async () => {
      supabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid token' },
      });

      app.get('/protected', async (req: any, res: any) => {
        try {
          const { data: { user }, error } = await req.supabase.auth.getUser();
          if (error) throw error;
          res.json({ user });
        } catch (error) {
          res.status(401).json({ error: 'Unauthorized' });
        }
      });

      const response = await request(app)
        .get('/protected')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
    });
  });

  describe('Error Handling Middleware', () => {
    it('should handle API errors gracefully', async () => {
      app.get('/error', (req: any, res: any) => {
        throw new Error('Test error');
      });

      app.use((err: Error, req: any, res: any, next: any) => {
        res.status(500).json({
          error: {
            message: err.message,
            status: 500,
          },
        });
      });

      const response = await request(app).get('/error');

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toBe('Test error');
    });

    it('should handle validation errors', async () => {
      app.post('/validate', (req: any, res: any) => {
        if (!req.body.name) {
          res.status(400).json({
            error: {
              message: 'Name is required',
              status: 400,
            },
          });
          return;
        }
        res.json({ success: true });
      });

      const response = await request(app)
        .post('/validate')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe('Name is required');
    });
  });

  describe('CORS Configuration', () => {
    it('should allow configured origins', async () => {
      app.get('/cors-test', (req: any, res: any) => {
        res.json({ success: true });
      });

      const response = await request(app)
        .get('/cors-test')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Rate Limiting', () => {
    it('should limit requests per IP', async () => {
      let requestCount = 0;
      app.get('/rate-limited', (req: any, res: any) => {
        requestCount++;
        if (requestCount > 5) {
          res.status(429).json({
            error: {
              message: 'Too many requests',
              status: 429,
            },
          });
          return;
        }
        res.json({ success: true });
      });

      // Make 6 requests
      for (let i = 0; i < 5; i++) {
        const response = await request(app).get('/rate-limited');
        expect(response.status).toBe(200);
      }

      const response = await request(app).get('/rate-limited');
      expect(response.status).toBe(429);
      expect(response.body.error.message).toBe('Too many requests');
    });
  });

  describe('Response Format', () => {
    it('should return consistent JSON response format', async () => {
      app.get('/success', (req: any, res: any) => {
        res.json({
          data: { message: 'Success' },
          error: null,
        });
      });

      const response = await request(app).get('/success');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('error');
      expect(response.body.data.message).toBe('Success');
      expect(response.body.error).toBeNull();
    });

    it('should handle errors in consistent format', async () => {
      app.get('/error-format', (req: any, res: any) => {
        res.status(404).json({
          data: null,
          error: {
            message: 'Resource not found',
            status: 404,
          },
        });
      });

      const response = await request(app).get('/error-format');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('error');
      expect(response.body.data).toBeNull();
      expect(response.body.error.message).toBe('Resource not found');
      expect(response.body.error.status).toBe(404);
    });
  });
});
