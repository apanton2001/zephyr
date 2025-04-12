# Zephyr WMS Frontend

Frontend for the Zephyr Warehouse Management System.

## Technologies Used

- React
- TypeScript
- Material UI
- React Router
- React Query

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the root of the frontend directory
   - Add the following variables:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

3. Run the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## Features

- Authentication and user management
- Responsive dashboard
- Product inventory management
- Low stock alerts
- Role-based access control

## Folder Structure

- `src/api` - API service functions
- `src/components` - Reusable UI components
- `src/context` - React context providers
- `src/pages` - Page components
- `src/utils` - Utility functions
- `public` - Static assets