import { createClient } from '@supabase/supabase-js';

// Environment variables would normally be used here
// For now, we'll use placeholder values that will be replaced in a .env file
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Real-time subscription setup for inventory updates
export const setupInventorySubscription = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('inventory-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'inventory'
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

// Real-time subscription for order status changes
export const setupOrderSubscription = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('order-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'orders'
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

// Picking routes subscription for real-time updates on warehouse activity
export const setupPickingRouteSubscription = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('picking-route-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'picking_routes'
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Session handling
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};
