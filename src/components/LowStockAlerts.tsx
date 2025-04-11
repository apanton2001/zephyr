import React from 'react';

function LowStockAlerts() {
  const lowStockItems = [
    { id: 1, product: 'Gadget B', currentStock: 45, minimumStock: 50, category: 'Electronics', lastUpdated: '2023-05-30' },
    { id: 2, product: 'Part D', currentStock: 15, minimumStock: 30, category: 'Hardware', lastUpdated: '2023-05-29' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Low Stock Alerts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Current Stock</th>
              <th className="py-2 px-4 border-b text-left">Minimum Stock</th>
              <th className="py-2 px-4 border-b text-left">Last Updated</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.product}</td>
                <td className="py-2 px-4 border-b">{item.category}</td>
                <td className="py-2 px-4 border-b text-red-600">{item.currentStock}</td>
                <td className="py-2 px-4 border-b">{item.minimumStock}</td>
                <td className="py-2 px-4 border-b">{item.lastUpdated}</td>
                <td className="py-2 px-4 border-b">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Reorder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LowStockAlerts;
