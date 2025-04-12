# Zephyr WMS Backend

Backend services for the Zephyr Warehouse Management System.

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the root of the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

3. Build the TypeScript code:
   ```
   npm run build
   ```

4. Run the server:
   - For development:
     ```
     npm run dev
     ```
   - For production:
     ```
     npm start
     ```

## API Endpoints

### Authentication

- `POST /api/users/login` - Login user
- `POST /api/users` - Register a new user (Admin only)

### User Management

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete a user (Admin only)

### Product Management

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a product (Manager only)
- `PUT /api/products/:id` - Update a product (Manager only)
- `DELETE /api/products/:id` - Delete a product (Manager only)
- `GET /api/products/low-stock` - Get products with stock below minimum threshold

## Data Models

### User

- name: String (required)
- email: String (required, unique)
- password: String (required)
- role: String (enum: 'admin', 'manager', 'employee', default: 'employee')
- isActive: Boolean (default: true)

### Product

- name: String (required)
- sku: String (required, unique)
- description: String
- category: String (required)
- price: Number (required)
- quantity: Number (required, default: 0)
- location: String
- supplier: String
- minimumStock: Number (default: 0)
- imageUrl: String
- isActive: Boolean (default: true)