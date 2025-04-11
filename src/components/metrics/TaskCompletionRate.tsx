import React from 'react';

function TaskCompletionRate() {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 m-6">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">Task Completion Rate: 87%</h2>
        <span className="ml-auto text-green-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          +2.5% increase from last quarter
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">What is Task Completion Rate?</h3>
          <p className="text-gray-300 text-sm">
            Task Completion Rate measures the percentage of assigned tasks that are completed on time by warehouse staff. This metric helps us understand employee productivity and identify bottlenecks in workflow processes.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">How We Calculate It</h3>
          <p className="text-gray-300 text-sm">
            Task Completion Rate is calculated by dividing the number of completed tasks by the total number of assigned tasks within a specific time period, then multiplying by 100 to get a percentage.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Task Breakdown by Type</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Daily checklist items</span>
                <span className="text-sm text-green-400">95% completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">35% of tasks</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Customer order fulfillment</span>
                <span className="text-sm text-green-400">92% completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">25% of tasks</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Inventory updates</span>
                <span className="text-sm text-green-400">87% completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">20% of tasks</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Quality control checks</span>
                <span className="text-sm text-green-400">83% completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">10% of tasks</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Administrative work</span>
                <span className="text-sm text-green-400">79% completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '79%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">10% of tasks</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Weekly Performance</h3>
          <div className="bg-gray-800 p-4 rounded-lg h-48 relative">
            {/* This would be replaced with an actual chart component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Bar chart showing weekly completion rates vs targets</p>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-gray-500">
              <span>Week 2</span>
              <span>Week 4</span>
              <span>Week 6</span>
              <span>Week 8</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Improvement Initiatives</h3>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Time Management Training</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Implemented specialized training sessions to help employees better prioritize their tasks.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Task Management Software</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Deployed a new task tracking system to better visualize workflow and identify bottlenecks.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Team Structure Optimization</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Reorganized teams based on skill sets to better match employees with appropriate tasks.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Department Performance</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Receiving</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Inventory</span>
              <span className="text-sm font-medium">89%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Picking</span>
              <span className="text-sm font-medium">87%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Packing</span>
              <span className="text-sm font-medium">86%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Shipping</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-sm font-medium">83%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCompletionRate;
