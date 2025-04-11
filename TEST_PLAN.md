# Zephyr Warehouse CRM Test Plan

This document outlines the testing strategy for the Zephyr Warehouse CRM system, organized in dependency order with AI prompts for test development.

## Level 1: Core Infrastructure Tests
These tests can be developed independently as they have no dependencies on other components.

### 1.1 Authentication System Tests
```prompt
As an AI specializing in Jest and Supabase Auth, it is your goal to write authentication system tests. You will write tests for user registration, login, role-based access control, and JWT token management. You will write the test first, then execute 'npm test auth' and continue to fix errors until the test passes. Follow these principles:
- One test file per authentication feature
- Mock Supabase auth responses
- Test both success and failure scenarios
- Verify role-based permissions
- Test token refresh flows
Full features to test:
- User registration
- Login/logout
- Password reset
- Role assignment
- Permission verification
- Session management
```

### 1.2 Database Schema Tests
```prompt
As an AI specializing in Jest and Supabase, it is your goal to write database schema validation tests. You will write tests that verify table structures, relationships, and constraints. You will write the test first, then execute 'npm test schema' and continue to fix errors until the test passes. Follow these principles:
- Test each table's structure independently
- Verify foreign key constraints
- Test unique constraints
- Validate default values
- Check timestamp triggers
Full features to test:
- Table creation
- Column types and constraints
- Foreign key relationships
- Index creation
- RLS policies
```

### 1.3 API Integration Framework Tests
```prompt
As an AI specializing in Jest and Express.js, it is your goal to write API integration framework tests. You will write tests for the base API functionality, middleware, and error handling. You will write the test first, then execute 'npm test api-framework' and continue to fix errors until the test passes. Follow these principles:
- Test middleware chains
- Verify error handling
- Test request validation
- Check response formats
- Test rate limiting
Full features to test:
- API routing
- Middleware execution
- Error responses
- Request validation
- Response formatting
```

## Level 2: Basic Feature Tests
These tests depend only on the core infrastructure being in place.

### 2.1 Warehouse Location Management Tests
```prompt
As an AI specializing in Jest and TypeScript, it is your goal to write warehouse location management tests. You will write tests for location creation, updates, and queries. You will write the test first, then execute 'npm test locations' and continue to fix errors until the test passes. Follow these principles:
- Test location CRUD operations
- Verify coordinate systems
- Test capacity calculations
- Validate location hierarchies
Full features to test:
- Location creation
- Zone management
- Capacity tracking
- Location queries
- Coordinate validation
```

### 2.2 Inventory Management Tests
```prompt
As an AI specializing in Jest and TypeScript, it is your goal to write inventory management tests. You will write tests for inventory tracking, updates, and basic queries. You will write the test first, then execute 'npm test inventory' and continue to fix errors until the test passes. Follow these principles:
- Test inventory CRUD operations
- Verify stock level tracking
- Test barcode integration
- Validate SKU management
Full features to test:
- Item creation
- Stock updates
- Location assignment
- Barcode validation
- Category management
```

### 2.3 Employee Management Tests
```prompt
As an AI specializing in Jest and TypeScript, it is your goal to write employee management tests. You will write tests for employee profiles, skills, and basic task assignment. You will write the test first, then execute 'npm test employees' and continue to fix errors until the test passes. Follow these principles:
- Test employee CRUD operations
- Verify skill tracking
- Test department assignment
- Validate performance metrics
Full features to test:
- Profile management
- Skill tracking
- Department assignment
- Performance recording
```

## Level 3: Advanced Feature Tests
These tests depend on basic features being implemented.

### 3.1 Predictive Inventory Tests
```prompt
As an AI specializing in Jest and Machine Learning, it is your goal to write predictive inventory tests. You will write tests for inventory prediction algorithms and alerts. You will write the test first, then execute 'npm test inventory-prediction' and continue to fix errors until the test passes. Follow these principles:
- Test prediction accuracy
- Verify alert thresholds
- Test historical data analysis
- Validate recommendation logic
Full features to test:
- Stock predictions
- Low stock alerts
- Reorder recommendations
- Seasonal analysis
- Trend detection
```

### 3.2 Order Management Tests
```prompt
As an AI specializing in Jest and TypeScript, it is your goal to write order management tests. You will write tests for order processing and tracking. You will write the test first, then execute 'npm test orders' and continue to fix errors until the test passes. Follow these principles:
- Test order lifecycle
- Verify status transitions
- Test client associations
- Validate pricing calculations
Full features to test:
- Order creation
- Status updates
- Client tracking
- Price calculation
- Order history
```

### 3.3 Task Management Tests
```prompt
As an AI specializing in Jest and TypeScript, it is your goal to write task management tests. You will write tests for task assignment and tracking. You will write the test first, then execute 'npm test tasks' and continue to fix errors until the test passes. Follow these principles:
- Test task assignment logic
- Verify priority handling
- Test completion tracking
- Validate performance metrics
Full features to test:
- Task creation
- Assignment rules
- Priority management
- Progress tracking
- Completion metrics
```

## Level 4: Integration Feature Tests
These tests require multiple components to be working together.

### 4.1 AR Picking Assistant Tests
```prompt
As an AI specializing in Jest and Three.js/AR.js, it is your goal to write AR picking assistant tests. You will write tests for the AR visualization and picking optimization. You will write the test first, then execute 'npm test ar-picking' and continue to fix errors until the test passes. Follow these principles:
- Test route optimization
- Verify AR overlay accuracy
- Test picking sequence logic
- Validate distance calculations
Full features to test:
- Route generation
- AR visualization
- Item location
- Path optimization
- View mode switching
```

### 4.2 Warehouse Layout Visualization Tests
```prompt
As an AI specializing in Jest and Three.js, it is your goal to write warehouse visualization tests. You will write tests for the interactive warehouse map. You will write the test first, then execute 'npm test warehouse-viz' and continue to fix errors until the test passes. Follow these principles:
- Test map rendering
- Verify interaction handlers
- Test data overlays
- Validate layout updates
Full features to test:
- Map rendering
- Interactive elements
- Data visualization
- Layout updates
- Zone highlighting
```

### 4.3 Analytics and Reporting Tests
```prompt
As an AI specializing in Jest and Data Visualization, it is your goal to write analytics and reporting tests. You will write tests for metrics calculation and report generation. You will write the test first, then execute 'npm test analytics' and continue to fix errors until the test passes. Follow these principles:
- Test metric calculations
- Verify report generation
- Test data aggregation
- Validate visualization data
Full features to test:
- Metric calculation
- Report generation
- Data visualization
- Performance tracking
- Trend analysis
```

## Level 5: System Integration Tests
These tests verify the entire system working together.

### 5.1 End-to-End Workflow Tests
```prompt
As an AI specializing in Jest and Cypress, it is your goal to write end-to-end workflow tests. You will write tests that verify complete business processes. You will write the test first, then execute 'npm test e2e' and continue to fix errors until the test passes. Follow these principles:
- Test complete workflows
- Verify system integration
- Test real-time updates
- Validate data consistency
Full features to test:
- Order fulfillment
- Inventory management
- Task completion
- System synchronization
- Real-time updates
```

### 5.2 Performance Tests
```prompt
As an AI specializing in k6 and Load Testing, it is your goal to write performance tests. You will write tests that verify system performance under load. You will write the test first, then execute 'k6 run performance.js' and continue to fix errors until the test passes. Follow these principles:
- Test system throughput
- Verify response times
- Test concurrent users
- Validate resource usage
Full features to test:
- Load handling
- Response times
- Concurrent operations
- Resource utilization
- Error rates
```

## Test Execution Order

1. Core Infrastructure (Level 1)
   - Authentication
   - Database Schema
   - API Framework

2. Basic Features (Level 2)
   - Warehouse Locations
   - Inventory Management
   - Employee Management

3. Advanced Features (Level 3)
   - Predictive Inventory
   - Order Management
   - Task Management

4. Integration Features (Level 4)
   - AR Picking Assistant
   - Warehouse Visualization
   - Analytics and Reporting

5. System Integration (Level 5)
   - End-to-End Workflows
   - Performance Tests

## Test Commands

```bash
# Run all tests
npm test

# Run specific test suites
npm test auth
npm test schema
npm test api-framework
npm test locations
npm test inventory
npm test employees
npm test inventory-prediction
npm test orders
npm test tasks
npm test ar-picking
npm test warehouse-viz
npm test analytics
npm test e2e

# Run performance tests
k6 run performance.js
```

## Test Development Guidelines

1. Always write tests before implementation (TDD)
2. Follow SOLID principles
3. Keep tests focused and isolated
4. Use meaningful test descriptions
5. Mock external dependencies
6. Test edge cases and error conditions
7. Maintain test data fixtures
8. Document test requirements and assumptions
9. Use consistent naming conventions
10. Regular test maintenance and updates
