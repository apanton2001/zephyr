import React, { useState } from 'react';
import OrderProcessingSpeed from './OrderProcessingSpeed';
import InventoryAccuracy from './InventoryAccuracy';
import TaskCompletionRate from './TaskCompletionRate';

function MetricsDashboard() {
  const [activeMetric, setActiveMetric] = useState('overview');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Zephyr Performance Metrics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeMetric === 'overview' ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveMetric('overview')}
          >
            <h2 className="text-lg font-semibold mb-2">Overview</h2>
            <p className="text-sm text-gray-300">View all key performance indicators at a glance</p>
          </div>
          
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeMetric === 'order-processing' ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveMetric('order-processing')}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Order Processing</h2>
              <span className="text-green-400 text-sm">92%</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Order fulfillment efficiency metrics</p>
          </div>
          
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeMetric === 'inventory-accuracy' ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveMetric('inventory-accuracy')}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Inventory Accuracy</h2>
              <span className="text-green-400 text-sm">99.2%</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Physical vs. system inventory match rate</p>
          </div>
          
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeMetric === 'task-completion' ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveMetric('task-completion')}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Task Completion</h2>
              <span className="text-green-400 text-sm">87%</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Employee task completion performance</p>
          </div>
          
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeMetric === 'financial' ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveMetric('financial')}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Financial Performance</h2>
              <span className="text-green-400 text-sm">+12%</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Revenue, costs, and profitability metrics</p>
          </div>
          
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeMetric === 'customer' ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveMetric('customer')}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Customer Satisfaction</h2>
              <span className="text-green-400 text-sm">94%</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Customer feedback and satisfaction scores</p>
          </div>
        </div>
        
        {activeMetric === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Key Performance Indicators</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Order Processing Speed</span>
                    <span className="text-sm font-medium text-green-400">92% (+5.7%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Inventory Accuracy</span>
                    <span className="text-sm font-medium text-green-400">99.2% (+1.2%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Task Completion Rate</span>
                    <span className="text-sm font-medium text-green-400">87% (+2.5%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">On-time Delivery</span>
                    <span className="text-sm font-medium text-green-400">95% (+3.2%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm font-medium text-green-400">94% (+2.1%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Recent Improvements</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">Order Batching Optimization</h3>
                  <p className="text-sm text-gray-300 mt-1">Reduced picking time by 27% through intelligent order grouping</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Implemented: 2 weeks ago</span>
                    <span>Impact: High</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">RFID Tracking System</h3>
                  <p className="text-sm text-gray-300 mt-1">Reduced inventory misplacement errors by 82%</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Implemented: 1 month ago</span>
                    <span>Impact: High</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">Team Structure Optimization</h3>
                  <p className="text-sm text-gray-300 mt-1">Improved task completion rate by matching skills to tasks</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Implemented: 3 weeks ago</span>
                    <span>Impact: Medium</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Warehouse Activity</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Orders Processed Today</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Picked Today</span>
                  <span className="font-semibold">1,532</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tasks</span>
                  <span className="font-semibold">83</span>
                </div>
                <div className="flex justify-between">
                  <span>Low Stock Alerts</span>
                  <span className="font-semibold text-red-400">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Shipments</span>
                  <span className="font-semibold">42</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Upcoming Challenges</h2>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">Holiday Season Preparation</h3>
                  <p className="text-sm text-gray-300 mt-1">Preparing for 3x order volume during upcoming holiday season</p>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-end text-xs text-gray-400 mt-1">
                    <span>65% ready</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">New Product Line Integration</h3>
                  <p className="text-sm text-gray-300 mt-1">Adding 200+ new SKUs to inventory system</p>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-end text-xs text-gray-400 mt-1">
                    <span>40% complete</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">Warehouse Layout Optimization</h3>
                  <p className="text-sm text-gray-300 mt-1">Redesigning layout to improve picking efficiency</p>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-end text-xs text-gray-400 mt-1">
                    <span>80% complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeMetric === 'order-processing' && <OrderProcessingSpeed />}
        {activeMetric === 'inventory-accuracy' && <InventoryAccuracy />}
        {activeMetric === 'task-completion' && <TaskCompletionRate />}
        {activeMetric === 'financial' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Financial Performance Dashboard</h2>
            <p className="text-gray-300">Financial metrics dashboard is under development.</p>
          </div>
        )}
        {activeMetric === 'customer' && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Customer Satisfaction Dashboard</h2>
            <p className="text-gray-300">Customer satisfaction dashboard is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricsDashboard;
