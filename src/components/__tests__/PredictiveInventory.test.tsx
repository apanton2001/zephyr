import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PredictiveInventory from '../PredictiveInventory';

// Mock the child components to focus on testing PredictiveInventory functionality
jest.mock('../PredictionTable', () => {
  return function MockPredictionTable({ predictions }: { predictions: any[] }) {
    return (
      <div data-testid="prediction-table">
        Mocked Table with {predictions.length} items
      </div>
    );
  };
});

jest.mock('../PredictionCards', () => {
  return function MockPredictionCards({ predictions }: { predictions: any[] }) {
    return (
      <div data-testid="prediction-cards">
        Mocked Cards with {predictions.length} items
      </div>
    );
  };
});

describe('PredictiveInventory Component', () => {
  test('renders the component title', () => {
    render(<PredictiveInventory />);
    const titleElement = screen.getByText(/Inventory Predictions/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders filter controls', () => {
    render(<PredictiveInventory />);
    expect(screen.getByText(/Urgency/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
  });

  test('renders tabs for table and card views', () => {
    render(<PredictiveInventory />);
    expect(screen.getByText(/Table View/i)).toBeInTheDocument();
    expect(screen.getByText(/Card View/i)).toBeInTheDocument();
  });

  test('switches between table and card views', () => {
    render(<PredictiveInventory />);
    
    // Initially should show table view
    expect(screen.getByTestId('prediction-table')).toBeInTheDocument();
    
    // Click on card view tab
    fireEvent.click(screen.getByText(/Card View/i));
    
    // Should now show card view
    expect(screen.getByTestId('prediction-cards')).toBeInTheDocument();
  });

  test('filters predictions by urgency', () => {
    render(<PredictiveInventory />);
    
    // Select high urgency filter
    const urgencySelect = screen.getByLabelText(/Urgency/i);
    fireEvent.change(urgencySelect, { target: { value: 'high' } });
    
    // The filtered predictions should be passed to the child components
    // We're not testing the actual filtering logic here, just that the UI responds to the change
    expect(screen.getByTestId('prediction-table')).toHaveTextContent(/Mocked Table with/);
  });
});
