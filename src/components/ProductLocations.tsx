import React from 'react';

function ProductLocations() {
  const locations = [
    { id: 1, product: 'Widget A', category: 'Electronics', location: 'Aisle 1, Shelf 3', stock: 120 },
    { id: 2, product: 'Gadget B', category: 'Electronics', location: 'Aisle 1, Shelf 5', stock: 45 },
    { id: 3, product: 'Tool C', category: 'Hardware', location: 'Aisle 2, Shelf 2', stock: 80 },
    { id: 4, product: 'Part D', category: 'Hardware', location: 'Aisle 2, Shelf 4', stock: 15 },
    { id: 5, product: 'Component E', category: 'Parts', location: 'Aisle 3, Shelf 1', stock: 200 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4">Product Locations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Location</th>
              <th className="py-2 px-4 border-b text-left">Stock at Location</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.product}</td>
                <td className="py-2 px-4 border-b">{item.category}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b" style={{ color: item.stock < 50 ? 'red' : 'inherit' }}>{item.stock}</td>
                <td className="py-2 px-4 border-b">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Update Location</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Map New Location</button>
      </div>
    </div>
  );
}

export default ProductLocations;
