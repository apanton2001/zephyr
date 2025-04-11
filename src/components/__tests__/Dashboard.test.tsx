import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  test('renders dashboard title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Zephyr Dashboard/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders key metric cards', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Total Inventory/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Stock Alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Tasks/i)).toBeInTheDocument();
  });

  test('renders recent activity section', () => {
    render(<Dashboard />);
    const activitySection = screen.getByText(/Recent Activity/i);
    expect(activitySection).toBeInTheDocument();
  });
});
