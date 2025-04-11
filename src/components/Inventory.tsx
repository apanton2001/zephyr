import React from 'react';

function Inventory() {
  const inventoryItems = [
    { id: 1, product: 'Widget A', category: 'Electronics', stock: 120, price: '$12.50', lastUpdated: '2023-05-25' },
    { id: 2, product: 'Gadget B', category: 'Electronics', stock: 45, price: '$25.00', lastUpdated: '2023-05-30' },
    { id: 3, product: 'Tool C', category: 'Hardware', stock: 80, price: '$8.75', lastUpdated: '2023-05-28' },
    { id: 4, product: 'Part D', category: 'Hardware', stock: 15, price: '$3.20', lastUpdated: '2023-05-29' },
    { id: 5, product: 'Component E', category: 'Parts', stock: 200, price: '$5.50', lastUpdated: '2023-05-27' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Stock</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Last Updated</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.product}</td>
                <td className="py-2 px-4 border-b">{item.category}</td>
                <td className="py-2 px-4 border-b" style={{ color: item.stock < 50 ? 'red' : 'inherit' }}>{item.stock}</td>
                <td className="py-2 px-4 border-b">{item.price}</td>
                <td className="py-2 px-4 border-b">{item.lastUpdated}</td>
                <td className="py-2 px-4 border-b">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Update Stock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Add Product</button>
        <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">Export Inventory</button>
      </div>
    </div>
  );
}

export default Inventory;
