import React from 'react';

function InventoryAccuracy() {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 m-6">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">Inventory Accuracy: 99.2%</h2>
        <span className="ml-auto text-green-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          +1.2% increase from last quarter
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '99.2%' }}></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">What is Inventory Accuracy?</h3>
          <p className="text-gray-300 text-sm">
            Inventory Accuracy measures how closely our physical inventory counts match our recorded inventory in the system. This is a critical metric for operational reliability, financial reporting, and customer satisfaction through reliable order fulfillment.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">How We Calculate It</h3>
          <p className="text-gray-300 text-sm">
            Inventory Accuracy is calculated by dividing the number of correctly recorded items by the total number of items in inventory, then multiplying by 100. Our current score of 99.2% means that for every 1,000 items in our warehouse, 992 are correctly recorded in our system.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Error Distribution</h3>
          <div className="bg-gray-800 p-4 rounded-lg h-48 relative">
            {/* This would be replaced with an actual pie chart component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full" style={{ 
                background: 'conic-gradient(#3B82F6 0% 45%, #60A5FA 45% 65%, #F59E0B 65% 80%, #EF4444 80% 100%)' 
              }}></div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Historical Performance</h3>
          <div className="bg-gray-800 p-4 rounded-lg h-48 relative">
            {/* This would be replaced with an actual chart component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Chart showing upward trend from 97.5% to 99.2% over 9 months</p>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-gray-500">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Improvement Initiatives</h3>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Cycle Counting Implementation</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Introduced continuous cycle counting instead of periodic inventory audits, improving accuracy by 0.8%.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">RFID Tracking System</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Deployed RFID tags and readers for high-value items, reducing misplacement errors by 82%.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">ABC Analysis Implementation</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Categorized inventory by value and turnover, allowing for more focused control of critical items.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Accuracy by Product Category</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Electronics</span>
              <span className="text-sm font-medium">98.7%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Apparel</span>
              <span className="text-sm font-medium">99.3%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '99.3%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Home Goods</span>
              <span className="text-sm font-medium">99.1%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '99.1%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Accessories</span>
              <span className="text-sm font-medium">98.9%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98.9%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Food Items</span>
              <span className="text-sm font-medium">98.6%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98.6%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryAccuracy;
