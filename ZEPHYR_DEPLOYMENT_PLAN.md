# Zephyr Warehouse CRM - Deployment Plan

## Overview
This deployment plan outlines the strategy for deploying the Zephyr Warehouse CRM system, with particular focus on replicating and enhancing the AR Picking Assistant functionality available at https://cargo-command.lovable.app/ar-pickingreplicate/enahnce.

## Target Deployment URL
- **Production URL**: https://cargo-command.lovable.app/ar-pickingreplicate/enahnce
- **Staging URL**: To be determined based on Vercel deployment

## Deployment Phases

### Phase 1: Development Environment Setup & Initial Backend Deployment

#### Step 1: Initial Supabase Configuration
- [ ] **Create Supabase Project**
  - Log into Supabase dashboard and create a new project for Zephyr Warehouse CRM
  - Note down the API URL and anon key for environment configuration
  - Configure project settings including region and database password

- [ ] **Database Schema Implementation**
  - Deploy the Prisma schema to Supabase
  - Create the following tables with appropriate relationships:
    - Inventory (with SKU as primary key)
    - Orders
    - Clients
    - Tasks
    - Employees
    - Warehouse Locations
    - Picking Routes

- [ ] **Authentication Setup**
  - Configure Supabase authentication providers
  - Set up role-based access control policies
  - Create initial admin user for system access
  - Define row-level security policies for warehouse data

- [ ] **Real-time API Configuration**
  - Enable Supabase real-time capabilities for inventory and order tables
  - Set up appropriate channels for real-time updates
  - Configure webhook endpoints for external integrations

#### Step 2: Backend API Development
- [ ] **Express.js API Setup**
  - Scaffold the API structure with proper routing
  - Implement core middleware (authentication, logging, error handling)
  - Set up connection to Supabase

- [ ] **Core API Endpoints Implementation**
  - Create CRUD operations for inventory management
  - Implement order processing endpoints
  - Develop task assignment and management APIs
  - Build warehouse mapping endpoints

- [ ] **AR Picking Assistant Specific Endpoints**
  - Create optimized picking route generation endpoint
  - Implement real-time location tracking API
  - Develop item recognition and validation endpoints
  - Build performance metrics tracking for picking tasks

### Phase 2: Frontend Deployment & Integration

#### Step 3: Frontend Preparation
- [ ] **Build Process Configuration**
  - Set up build pipeline for the React application
  - Configure environment variables for production
  - Implement code splitting and optimization

- [ ] **API Integration**
  - Connect frontend components to newly created backend APIs
  - Replace mock data with real API calls
  - Implement error handling and loading states

#### Step 4: AR Picking Interface Enhancement
- [ ] **AR Visualization Improvements**
  - Implement 3D warehouse visualization
  - Develop AR overlay for item location
  - Create interactive picking path visualization
  - Build real-time updates for stock movements

- [ ] **Mobile Optimization**
  - Ensure responsive design for warehouse mobile devices
  - Optimize touch interactions for warehouse staff
  - Implement offline capabilities for intermittent connectivity
  - Test on target warehouse devices

### Phase 3: Testing & Optimization

#### Step 5: Performance Testing
- [ ] **Load Testing**
  - Simulate high volume order processing
  - Test real-time subscription performance
  - Validate database query performance
  - Measure API response times under load

- [ ] **Usability Testing**
  - Conduct warehouse staff user testing
  - Gather feedback on AR picking interface
  - Validate workflow efficiency improvements
  - Document training requirements

#### Step 6: Security Audit
- [ ] **Vulnerability Assessment**
  - Perform dependency vulnerability scanning
  - Run penetration testing on API endpoints
  - Validate authentication security
  - Review database access policies

### Phase 4: Deployment & Monitoring

#### Step 7: Production Deployment
- [ ] **Database Migration**
  - Execute production database schema migration
  - Seed initial reference data
  - Validate data integrity

- [ ] **Backend Deployment**
  - Deploy API to Vercel production environment
  - Configure production environment variables
  - Set up monitoring and logging

- [ ] **Frontend Deployment**
  - Deploy frontend application to Vercel
  - Configure CDN and caching policies
  - Validate cross-browser compatibility

#### Step 8: Post-Deployment Activities
- [ ] **Monitoring Setup**
  - Implement application performance monitoring
  - Set up alerting for critical errors
  - Configure usage analytics
  - Establish log aggregation

- [ ] **Documentation & Training**
  - Finalize API documentation
  - Create user guides for warehouse staff
  - Develop administrator documentation
  - Conduct training sessions

## Current Focus: Phase 1 - Step 1 (Initial Supabase Configuration)

The immediate focus is on setting up the Supabase environment to support the AR Picking functionality with the following specific actions:

### Action Items for Step 1.1: Supabase Project Creation

1. **Sign up/login to Supabase**
   - Navigate to https://app.supabase.io/
   - Log in with appropriate credentials
   - Create a new organization if needed

2. **Create a new project**
   - Project name: "zephyr-warehouse-crm"
   - Database password: Generate a secure password
   - Region: Select nearest to target users
   - Pricing plan: Select appropriate tier based on expected usage

3. **Gather API credentials**
   - Save the API URL: `https://[project-id].supabase.co`
   - Save the anon key and service role key securely
   - Document these in a secure environment variables file

4. **Initial project settings**
   - Enable row-level security
   - Configure CORS allowed origins
   - Set up database backups

### Action Items for Step 1.2: Database Schema Implementation

1. **Create core tables**:

```sql
-- Create Inventory table
CREATE TABLE inventory (
  sku TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  current_stock INTEGER NOT NULL,
  min_stock_level INTEGER NOT NULL,
  max_stock_level INTEGER,
  reorder_quantity INTEGER,
  location_id TEXT,
  barcode TEXT,
  unit_price DECIMAL(10,2),
  supplier_id TEXT,
  last_restock_date TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status TEXT NOT NULL,
  total_amount DECIMAL(10,2),
  shipping_address JSONB,
  tracking_number TEXT,
  priority INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Warehouse Location table
CREATE TABLE warehouse_locations (
  id TEXT PRIMARY KEY,
  zone TEXT NOT NULL,
  aisle TEXT NOT NULL,
  bay TEXT NOT NULL,
  level TEXT NOT NULL,
  position TEXT NOT NULL,
  capacity DECIMAL(10,2),
  current_utilization DECIMAL(10,2),
  x_coordinate INTEGER,
  y_coordinate INTEGER,
  z_coordinate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Picking Routes table
CREATE TABLE picking_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  employee_id UUID,
  status TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  total_distance DECIMAL(10,2),
  estimated_duration INTEGER, -- in seconds
  actual_duration INTEGER, -- in seconds
  route_path JSONB, -- array of location IDs in sequence
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

2. **Create relationships and indexes**:

```sql
-- Add foreign key constraint for inventory location
ALTER TABLE inventory
ADD CONSTRAINT fk_inventory_location
FOREIGN KEY (location_id)
REFERENCES warehouse_locations(id);

-- Create indexes for common queries
CREATE INDEX idx_inventory_category ON inventory(category);
CREATE INDEX idx_inventory_current_stock ON inventory(current_stock) WHERE current_stock <= min_stock_level;
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_picking_routes_status ON picking_routes(status);
```

3. **Set up RLS policies**:

```sql
-- Enable RLS on tables
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE picking_routes ENABLE ROW LEVEL SECURITY;

-- Create policies for inventory
CREATE POLICY "Inventory viewable by authenticated users"
ON inventory FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Inventory editable by warehouse staff"
ON inventory FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' IN ('admin', 'warehouse_staff'));

-- Create policies for picking routes
CREATE POLICY "Picking routes viewable by authenticated users"
ON picking_routes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Picking routes assignable to self"
ON picking_routes FOR UPDATE
TO authenticated
USING (
  employee_id = auth.uid()
  OR auth.jwt() ->> 'role' IN ('admin', 'warehouse_manager')
);
```

### Next Steps After Completion of Step 1:

Once the Supabase configuration is complete, we will proceed to:

1. Implement the Express.js API with proper connection to Supabase
2. Create the core inventory management endpoints
3. Develop the AR picking assistant specific functionality
4. Test the backend services before proceeding to frontend integration

This deployment plan will be updated throughout the implementation process with more specific details and progress tracking.
