-- Zephyr Warehouse CRM Database Schema
-- This schema defines all tables required for the AR picking assistant functionality

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

-- Create Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address JSONB,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
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

-- Create order items to track specific products in an order
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  sku TEXT NOT NULL REFERENCES inventory(sku),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  picked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE, -- Links to Supabase auth.users
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  hire_date DATE,
  skills JSONB,
  performance_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  task_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  priority INTEGER DEFAULT 0,
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
  current_utilization DECIMAL(10,2) DEFAULT 0,
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
  employee_id UUID REFERENCES employees(id),
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
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_sku ON order_items(sku);
CREATE INDEX idx_picking_routes_status ON picking_routes(status);
CREATE INDEX idx_picking_routes_employee ON picking_routes(employee_id);
CREATE INDEX idx_tasks_employee ON tasks(employee_id);
CREATE INDEX idx_tasks_status ON tasks(status);

-- Enable Row Level Security on all tables
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE picking_routes ENABLE ROW LEVEL SECURITY;

-- Create default security policies

-- Inventory policies
CREATE POLICY "Inventory viewable by authenticated users"
ON inventory FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Inventory editable by warehouse staff"
ON inventory FOR UPDATE
TO authenticated
USING (auth.jwt() ? 'role' AND auth.jwt()->>'role' IN ('admin', 'warehouse_staff'));

CREATE POLICY "Inventory insertable by warehouse staff"
ON inventory FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ? 'role' AND auth.jwt()->>'role' IN ('admin', 'warehouse_staff'));

-- Orders policies
CREATE POLICY "Orders viewable by authenticated users"
ON orders FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Orders editable by order management"
ON orders FOR UPDATE
TO authenticated
USING (auth.jwt() ? 'role' AND auth.jwt()->>'role' IN ('admin', 'order_management'));

-- Picking routes policies
CREATE POLICY "Picking routes viewable by authenticated users"
ON picking_routes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Picking routes assignable to self"
ON picking_routes FOR UPDATE
TO authenticated
USING (
  employee_id = auth.uid()
  OR (auth.jwt() ? 'role' AND auth.jwt()->>'role' IN ('admin', 'warehouse_manager'))
);

-- Function to update timestamps on record changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = TIMEZONE('utc', NOW());
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_inventory_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at
BEFORE UPDATE ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_warehouse_locations_updated_at
BEFORE UPDATE ON warehouse_locations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_picking_routes_updated_at
BEFORE UPDATE ON picking_routes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
