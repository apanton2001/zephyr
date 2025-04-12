# Zephyr Warehouse Management System

A modern, full-stack warehouse management system built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

The project is organized into two main directories:

- `backend` - Node.js API with Express and MongoDB
- `frontend` - React application with TypeScript and Material UI

## Features

- **User Authentication**: Secure JWT-based authentication
- **Role-Based Access Control**: Admin, Manager, and Employee roles
- **Product Management**: Add, update, and track inventory
- **Dashboard**: Visual overview of inventory status
- **Low Stock Alerts**: Automatic notification for items below threshold
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Set up the backend:
   ```
   cd backend
   npm install
   ```

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Configure environment variables:
   - Create `.env` files in both backend and frontend directories
   - Backend `.env` example:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/zephyr-wms
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     ```
   - Frontend `.env` example:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

5. Start development servers:
   - Backend:
     ```
     cd backend
     npm run dev
     ```
   - Frontend:
     ```
     cd frontend
     npm start
     ```

## Development Roadmap

- [ ] Complete CRUD operations for products
- [ ] Implement user management features
- [ ] Add transaction history
- [ ] Implement reporting functionality
- [ ] Add barcode scanning support
- [ ] Integrate with shipping providers

## License

This project is licensed under the MIT License - see the LICENSE file for details.