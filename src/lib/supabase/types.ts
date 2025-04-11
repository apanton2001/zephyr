// Database types for Zephyr Warehouse CRM

export interface Inventory {
  sku: string;
  name: string;
  description?: string;
  category?: string;
  current_stock: number;
  min_stock_level: number;
  max_stock_level?: number;
  reorder_quantity?: number;
  location_id?: string;
  barcode?: string;
  unit_price?: number;
  supplier_id?: string;
  last_restock_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: Record<string, any>;
  total_orders: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  client_id: string;
  order_date: string;
  status: OrderStatus;
  total_amount?: number;
  shipping_address?: Record<string, any>;
  tracking_number?: string;
  priority: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  picked: boolean;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  auth_id?: string;
  name: string;
  email: string;
  role: EmployeeRole;
  department?: string;
  hire_date?: string;
  skills?: Record<string, any>;
  performance_metrics?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  employee_id?: string;
  task_type: TaskType;
  description: string;
  status: TaskStatus;
  due_date?: string;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface WarehouseLocation {
  id: string;
  zone: string;
  aisle: string;
  bay: string;
  level: string;
  position: string;
  capacity?: number;
  current_utilization?: number;
  x_coordinate?: number;
  y_coordinate?: number;
  z_coordinate?: number;
  created_at: string;
  updated_at: string;
}

export interface PickingRoute {
  id: string;
  order_id?: string;
  employee_id?: string;
  status: PickingRouteStatus;
  start_time?: string;
  end_time?: string;
  total_distance?: number;
  estimated_duration?: number;
  actual_duration?: number;
  route_path?: Array<string>; // Array of location IDs
  created_at: string;
  updated_at: string;
}

// Enum types
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PICKING = 'picking',
  PACKING = 'packing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned'
}

export enum EmployeeRole {
  ADMIN = 'admin',
  WAREHOUSE_MANAGER = 'warehouse_manager',
  WAREHOUSE_STAFF = 'warehouse_staff',
  ORDER_MANAGEMENT = 'order_management',
  PICKER = 'picker',
  PACKER = 'packer'
}

export enum TaskType {
  PICKING = 'picking',
  PACKING = 'packing',
  INVENTORY_CHECK = 'inventory_check',
  RESTOCKING = 'restocking',
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue'
}

export enum PickingRouteStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Database definitions for Supabase
export type Database = {
  public: {
    Tables: {
      inventory: {
        Row: Inventory;
        Insert: Omit<Inventory, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Inventory, 'created_at' | 'updated_at'>>;
      };
      clients: {
        Row: Client;
        Insert: Omit<Client, 'id' | 'created_at' | 'updated_at' | 'total_orders' | 'total_spent'>;
        Update: Partial<Omit<Client, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'> & { order_date?: string };
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<OrderItem, 'id' | 'created_at' | 'updated_at'>>;
      };
      employees: {
        Row: Employee;
        Insert: Omit<Employee, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Employee, 'id' | 'created_at' | 'updated_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>;
      };
      warehouse_locations: {
        Row: WarehouseLocation;
        Insert: Omit<WarehouseLocation, 'created_at' | 'updated_at'> & { current_utilization?: number };
        Update: Partial<Omit<WarehouseLocation, 'created_at' | 'updated_at'>>;
      };
      picking_routes: {
        Row: PickingRoute;
        Insert: Omit<PickingRoute, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<PickingRoute, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
