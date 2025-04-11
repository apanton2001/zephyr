# Supabase Setup Guide for Zephyr Warehouse CRM

This guide will walk you through the process of setting up Supabase for the Zephyr Warehouse CRM system, as outlined in Phase 1, Step 1 of the [ZEPHYR_DEPLOYMENT_PLAN.md](./ZEPHYR_DEPLOYMENT_PLAN.md).

## Prerequisites

- A Supabase account (sign up at [https://supabase.com](https://supabase.com))
- Node.js installed (v16+)
- Git installed

## Step 1: Create a New Supabase Project

1. Log in to your Supabase account at [https://app.supabase.io](https://app.supabase.io)
2. Click "New Project"
3. Enter project details:
   - Name: `zephyr-warehouse-crm`
   - Database Password: Generate a secure password and save it
   - Region: Choose the region closest to your users
   - Pricing Plan: Select the appropriate tier
4. Click "Create new project"

## Step 2: Gather API Credentials

1. Once your project is created, go to the project dashboard
2. Navigate to Project Settings → API
3. Copy the following values:
   - **Project URL**: `https://[project-id].supabase.co`
   - **API Key**: Copy the `anon` public key
4. Create a `.env` file in the root of your project by copying the `.env.example` file:
   ```
   cp .env.example .env
   ```
5. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Step 3: Deploy Database Schema

1. Go to the SQL Editor in your Supabase project dashboard
2. Create a new query
3. Copy the contents of `src/lib/supabase/schema.sql` into the query editor
4. Run the query to create all necessary tables, indexes, and RLS policies

## Step 4: Configure Authentication

1. In your Supabase dashboard, go to Authentication → Settings
2. Configure Site URL:
   - Site URL: `https://cargo-command.lovable.app` (or your development URL)
3. Set up Email Auth:
   - Enable Email Signup
   - Disable Email Confirmations for development if needed
4. Configure JWT settings:
   - JWT Expiry: `604800` (7 days in seconds)

## Step 5: Configure Row Level Security Policies

The database schema includes RLS policies for basic security. If you need additional policies:

1. Go to the Table Editor in your Supabase dashboard
2. Select a table (e.g., `inventory`)
3. Go to the "Policies" tab
4. Review and modify existing policies or add new ones as needed

## Step 6: Create Initial Admin User

1. Go to Authentication → Users in your Supabase dashboard
2. Click "Invite user"
3. Enter the admin email address
4. After the user is created, go to the SQL Editor and run:

```sql
INSERT INTO employees (auth_id, name, email, role)
VALUES 
  ((SELECT id FROM auth.users WHERE email = 'admin@example.com'),
   'Admin User',
   'admin@example.com',
   'admin');
```

Replace `'admin@example.com'` with the actual admin email.

## Step 7: Verify Setup

1. Go to Table Editor in your Supabase dashboard
2. Verify that all tables have been created correctly
3. Check that RLS policies are in place

## Step 8: Test Connection from Application

After setting up your environment variables, you can test the connection from your application:

```typescript
// In your development console
import { supabase } from './src/lib/supabase/client';

// Test the connection
async function testConnection() {
  const { data, error } = await supabase.from('inventory').select('count(*)');
  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connection successful, count:', data);
  }
}

testConnection();
```

## Common Issues and Troubleshooting

- **CORS Errors**: If you encounter CORS errors, go to Project Settings → API → CORS and add your frontend URL to the allowed origins.
- **RLS Blocking Access**: If you can't access data, ensure your RLS policies are correctly configured and that you're authenticating users properly.
- **Authentication Issues**: Check that you're correctly managing JWT tokens on the frontend.

## Next Steps

After completing this Supabase setup, proceed to Step 2 in the deployment plan: Backend API Development.

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Guides](https://supabase.com/docs/guides/auth)
