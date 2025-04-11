import React from 'react';

function OrderProcessingSpeed() {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 m-6">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">Order Processing Speed: 92%</h2>
        <span className="ml-auto text-green-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          +5.7% increase from last quarter
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">What is Order Processing Speed?</h3>
          <p className="text-gray-300 text-sm">
            Order Processing Speed measures how efficiently we process customer orders from the moment they're received to when they're shipped out. It's a critical metric that directly impacts customer satisfaction and operational efficiency.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">How We Calculate It</h3>
          <p className="text-gray-300 text-sm">
            Order Processing Speed is calculated as a percentage of orders processed within target time frames compared to total orders. The current score of 92% means that 92% of all orders are processed within or faster than our target timeframes.
          </p>
          
          <div className="mt-4 flex items-center">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium">Average Processing Time</h4>
              <p className="text-2xl font-bold">50 minutes</p>
              <p className="text-xs text-gray-400">Our current average order processing time from receipt to shipping is 50 minutes, which is 16% faster than industry standard of 60 minutes.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Historical Performance</h3>
          <div className="bg-gray-800 p-4 rounded-lg h-48 relative">
            {/* This would be replaced with an actual chart component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Chart showing upward trend from 70% to 92% over 9 months</p>
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
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Order Batching Optimization</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Implemented a new batching algorithm that groups similar orders to reduce picking time by 27%.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Streamlined Carrier Integration</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Automated shipping carrier selection and documentation, reducing shipping stage time by 35%.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Real-time Order Priority System</h4>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-8">Developed a dynamic priority system that automatically escalates urgent orders to ensure on-time delivery.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Processing Stages Breakdown</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Order Receipt</span>
              <span className="text-sm font-medium">5 minutes</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">Time from order submission to order appearing in our system.</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97%' }}></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">97% efficient</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Order Verification</span>
              <span className="text-sm font-medium">8 minutes</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">Checking availability and customer information accuracy.</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">94% efficient</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Picking</span>
              <span className="text-sm font-medium">16 minutes</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">Time required to locate and retrieve all items from warehouse.</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">91% efficient</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Packing</span>
              <span className="text-sm font-medium">12 minutes</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">Product packaging, labeling, and preparation for shipment.</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">88% efficient</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Shipping</span>
              <span className="text-sm font-medium">9 minutes</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">Final documentation and carrier handoff process.</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '93%' }}></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-400">93% efficient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderProcessingSpeed;
