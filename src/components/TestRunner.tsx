import React, { useEffect, useState } from 'react';
import { runTestSuite } from '../utils/testUtils';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import PredictiveInventory from './PredictiveInventory';
import ClientOrderTracker from './ClientOrderTracker';
import LowStockAlerts from './LowStockAlerts';
import EmployeeTasks from './EmployeeTasks';
import FinancialReports from './FinancialReports';
import ClientDatabase from './ClientDatabase';
import ProductLocations from './ProductLocations';
import MetricsDashboard from './metrics/MetricsDashboard';

function TestRunner() {
  const [activeComponent, setActiveComponent] = useState<string>('none');
  const [testResults, setTestResults] = useState<Array<{ component: string, passed: boolean, message: string }>>([]);
  
  const runComponentTest = (component: string) => {
    // Reset previous test results
    setTestResults([]);
    
    // Set the active component to test
    setActiveComponent(component);
    
    // Add a small delay to ensure component is rendered
    setTimeout(() => {
      let results: Array<{ component: string, passed: boolean, message: string }> = [];
      
      // Run tests based on the selected component
      switch (component) {
        case 'dashboard':
          results = testDashboard();
          break;
        case 'inventory':
          results = testInventory();
          break;
        case 'predictive':
          results = testPredictiveInventory();
          break;
        case 'metrics':
          results = testMetricsDashboard();
          break;
        default:
          results = [{ component, passed: false, message: 'No tests defined for this component' }];
      }
      
      setTestResults(results);
    }, 500);
  };
  
  const testDashboard = () => {
    const results: Array<{ component: string, passed: boolean, message: string }> = [];
    
    // Check if the dashboard title is rendered
    const titleElement = document.querySelector('h2');
    const hasDashboardTitle = titleElement && titleElement.textContent?.includes('Zephyr Dashboard');
    results.push({ 
      component: 'Dashboard', 
      passed: hasDashboardTitle, 
      message: hasDashboardTitle ? 'Dashboard title found' : 'Dashboard title not found' 
    });
    
    // Check if metric cards are rendered
    const metricTexts = ['Total Inventory', 'Low Stock Alerts', 'Pending Orders', 'Employee Tasks'];
    for (const text of metricTexts) {
      const hasMetric = Array.from(document.querySelectorAll('*'))
        .some(el => el.textContent?.includes(text));
      
      results.push({ 
        component: 'Dashboard', 
        passed: hasMetric, 
        message: hasMetric ? `Found metric: ${text}` : `Missing metric: ${text}` 
      });
    }
    
    // Check if recent activity section is rendered
    const hasRecentActivity = Array.from(document.querySelectorAll('*'))
      .some(el => el.textContent?.includes('Recent Activity'));
    
    results.push({ 
      component: 'Dashboard', 
      passed: hasRecentActivity, 
      message: hasRecentActivity ? 'Recent Activity section found' : 'Recent Activity section not found' 
    });
    
    return results;
  };
  
  const testInventory = () => {
    const results: Array<{ component: string, passed: boolean, message: string }> = [];
    
    // Check if the inventory title is rendered
    const titleElement = document.querySelector('h2');
    const hasInventoryTitle = titleElement && titleElement.textContent?.includes('Inventory Management');
    results.push({ 
      component: 'Inventory', 
      passed: hasInventoryTitle, 
      message: hasInventoryTitle ? 'Inventory title found' : 'Inventory title not found' 
    });
    
    // Check if the table headers are rendered
    const tableHeaders = ['Product', 'Category', 'Stock', 'Price', 'Last Updated', 'Action'];
    for (const header of tableHeaders) {
      const hasHeader = Array.from(document.querySelectorAll('th'))
        .some(el => el.textContent?.includes(header));
      
      results.push({ 
        component: 'Inventory', 
        passed: hasHeader, 
        message: hasHeader ? `Found table header: ${header}` : `Missing table header: ${header}` 
      });
    }
    
    // Check if buttons are rendered
    const buttons = ['Add Product', 'Export Inventory'];
    for (const buttonText of buttons) {
      const hasButton = Array.from(document.querySelectorAll('button'))
        .some(el => el.textContent?.includes(buttonText));
      
      results.push({ 
        component: 'Inventory', 
        passed: hasButton, 
        message: hasButton ? `Found button: ${buttonText}` : `Missing button: ${buttonText}` 
      });
    }
    
    return results;
  };
  
  const testPredictiveInventory = () => {
    const results: Array<{ component: string, passed: boolean, message: string }> = [];
    
    // Check if the predictive inventory title is rendered
    const titleElement = document.querySelector('h1');
    const hasPredictiveTitle = titleElement && titleElement.textContent?.includes('Inventory Predictions');
    results.push({ 
      component: 'PredictiveInventory', 
      passed: hasPredictiveTitle, 
      message: hasPredictiveTitle ? 'Predictive Inventory title found' : 'Predictive Inventory title not found' 
    });
    
    // Check if filters are rendered
    const filters = ['Urgency', 'Category'];
    for (const filter of filters) {
      const hasFilter = Array.from(document.querySelectorAll('label'))
        .some(el => el.textContent?.includes(filter));
      
      results.push({ 
        component: 'PredictiveInventory', 
        passed: hasFilter, 
        message: hasFilter ? `Found filter: ${filter}` : `Missing filter: ${filter}` 
      });
    }
    
    // Check if tabs are rendered
    const tabs = ['Table View', 'Card View'];
    for (const tab of tabs) {
      const hasTab = Array.from(document.querySelectorAll('*'))
        .some(el => el.textContent?.includes(tab));
      
      results.push({ 
        component: 'PredictiveInventory', 
        passed: hasTab, 
        message: hasTab ? `Found tab: ${tab}` : `Missing tab: ${tab}` 
      });
    }
    
    return results;
  };
  
  const testMetricsDashboard = () => {
    const results: Array<{ component: string, passed: boolean, message: string }> = [];
    
    // Check if the metrics dashboard title is rendered
    const titleElement = document.querySelector('h1');
    const hasMetricsTitle = titleElement && titleElement.textContent?.includes('Zephyr Performance Metrics');
    results.push({ 
      component: 'MetricsDashboard', 
      passed: hasMetricsTitle, 
      message: hasMetricsTitle ? 'Metrics Dashboard title found' : 'Metrics Dashboard title not found' 
    });
    
    // Check if metric options are rendered
    const metricOptions = ['Overview', 'Order Processing', 'Inventory Accuracy', 'Task Completion'];
    for (const option of metricOptions) {
      const hasOption = Array.from(document.querySelectorAll('*'))
        .some(el => el.textContent?.includes(option));
      
      results.push({ 
        component: 'MetricsDashboard', 
        passed: hasOption, 
        message: hasOption ? `Found metric option: ${option}` : `Missing metric option: ${option}` 
      });
    }
    
    // Check if KPI section is rendered in overview
    const hasKPISection = Array.from(document.querySelectorAll('*'))
      .some(el => el.textContent?.includes('Key Performance Indicators'));
    
    results.push({ 
      component: 'MetricsDashboard', 
      passed: hasKPISection, 
      message: hasKPISection ? 'KPI section found' : 'KPI section not found' 
    });
    
    return results;
  };
  
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'predictive':
        return <PredictiveInventory />;
      case 'metrics':
        return <MetricsDashboard />;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Zephyr Component Test Runner</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Component to Test</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded ${activeComponent === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => runComponentTest('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeComponent === 'inventory' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => runComponentTest('inventory')}
          >
            Inventory
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeComponent === 'predictive' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => runComponentTest('predictive')}
          >
            Predictive Inventory
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeComponent === 'metrics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => runComponentTest('metrics')}
          >
            Metrics Dashboard
          </button>
        </div>
      </div>
      
      {testResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Test Results</h2>
          <div className="bg-gray-100 p-4 rounded">
            {testResults.map((result, index) => (
              <div 
                key={index} 
                className={`mb-1 p-2 rounded ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <span className={`font-semibold ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                  {result.passed ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span className="ml-2">{result.message}</span>
              </div>
            ))}
            
            <div className="mt-4">
              <span className="font-semibold">Summary: </span>
              <span>
                {testResults.filter(r => r.passed).length} passed, {testResults.filter(r => !r.passed).length} failed
              </span>
            </div>
          </div>
        </div>
      )}
      
      {activeComponent !== 'none' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Component Preview</h2>
          <div className="border border-gray-300 rounded p-4">
            {renderActiveComponent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestRunner;
