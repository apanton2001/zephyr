import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock all the components that App renders
jest.mock('../components/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="dashboard">Dashboard Component</div>;
  };
});

jest.mock('../components/Inventory', () => {
  return function MockInventory() {
    return <div data-testid="inventory">Inventory Component</div>;
  };
});

jest.mock('../components/PredictiveInventory', () => {
  return function MockPredictiveInventory() {
    return <div data-testid="predictive-inventory">Predictive Inventory Component</div>;
  };
});

jest.mock('../components/metrics/MetricsDashboard', () => {
  return function MockMetricsDashboard() {
    return <div data-testid="metrics-dashboard">Metrics Dashboard Component</div>;
  };
});

describe('App Component', () => {
  test('renders the app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Zephyr - Warehouse CRM/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<App />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventory/i)).toBeInTheDocument();
    expect(screen.getByText(/Predictive Inventory/i)).toBeInTheDocument();
  });

  test('shows Dashboard by default', () => {
    render(<App />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  test('navigates to Inventory when clicked', () => {
    render(<App />);
    
    // Click on Inventory option
    fireEvent.click(screen.getByText(/^Inventory$/i));
    
    // Should show Inventory component
    expect(screen.getByTestId('inventory')).toBeInTheDocument();
  });

  test('navigates to Predictive Inventory when clicked', () => {
    render(<App />);
    
    // Click on Predictive Inventory option
    fireEvent.click(screen.getByText(/Predictive Inventory/i));
    
    // Should show Predictive Inventory component
    expect(screen.getByTestId('predictive-inventory')).toBeInTheDocument();
  });

  test('navigates to Performance Metrics when clicked', () => {
    render(<App />);
    
    // Click on Performance Metrics option
    fireEvent.click(screen.getByText(/Performance Metrics/i));
    
    // Should show Metrics Dashboard component
    expect(screen.getByTestId('metrics-dashboard')).toBeInTheDocument();
  });
});
