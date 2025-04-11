import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MetricsDashboard from '../MetricsDashboard';

// Mock the child components
jest.mock('../OrderProcessingSpeed', () => {
  return function MockOrderProcessingSpeed() {
    return <div data-testid="order-processing-speed">Order Processing Speed Component</div>;
  };
});

jest.mock('../InventoryAccuracy', () => {
  return function MockInventoryAccuracy() {
    return <div data-testid="inventory-accuracy">Inventory Accuracy Component</div>;
  };
});

jest.mock('../TaskCompletionRate', () => {
  return function MockTaskCompletionRate() {
    return <div data-testid="task-completion-rate">Task Completion Rate Component</div>;
  };
});

describe('MetricsDashboard Component', () => {
  test('renders the dashboard title', () => {
    render(<MetricsDashboard />);
    const titleElement = screen.getByText(/Zephyr Performance Metrics/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders metric navigation options', () => {
    render(<MetricsDashboard />);
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Processing/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventory Accuracy/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Completion/i)).toBeInTheDocument();
  });

  test('shows overview by default', () => {
    render(<MetricsDashboard />);
    expect(screen.getByText(/Key Performance Indicators/i)).toBeInTheDocument();
  });

  test('navigates to Order Processing Speed dashboard', () => {
    render(<MetricsDashboard />);
    
    // Click on Order Processing option
    fireEvent.click(screen.getByText(/Order Processing/i));
    
    // Should show Order Processing Speed component
    expect(screen.getByTestId('order-processing-speed')).toBeInTheDocument();
  });

  test('navigates to Inventory Accuracy dashboard', () => {
    render(<MetricsDashboard />);
    
    // Click on Inventory Accuracy option
    fireEvent.click(screen.getByText(/Inventory Accuracy/i));
    
    // Should show Inventory Accuracy component
    expect(screen.getByTestId('inventory-accuracy')).toBeInTheDocument();
  });

  test('navigates to Task Completion Rate dashboard', () => {
    render(<MetricsDashboard />);
    
    // Click on Task Completion option
    fireEvent.click(screen.getByText(/Task Completion/i));
    
    // Should show Task Completion Rate component
    expect(screen.getByTestId('task-completion-rate')).toBeInTheDocument();
  });
});
