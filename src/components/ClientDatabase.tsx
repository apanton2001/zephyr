import React from 'react';

function ClientDatabase() {
  const clients = [
    { id: 1, name: 'Client A', contact: 'John Smith', email: 'john@clienta.com', phone: '(555) 123-4567', orders: 12, totalSpent: '$15,400.25' },
    { id: 2, name: 'Client B', contact: 'Jane Doe', email: 'jane@clientb.com', phone: '(555) 234-5678', orders: 8, totalSpent: '$9,200.75' },
    { id: 3, name: 'Client C', contact: 'Mike Johnson', email: 'mike@clientc.com', phone: '(555) 345-6789', orders: 5, totalSpent: '$6,800.50' },
    { id: 4, name: 'Client D', contact: 'Sarah Williams', email: 'sarah@clientd.com', phone: '(555) 456-7890', orders: 3, totalSpent: '$3,500.30' },
    { id: 5, name: 'Client E', contact: 'Tom Brown', email: 'tom@cliente.com', phone: '(555) 567-8901', orders: 7, totalSpent: '$11,300.80' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4">Client Database</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Contact</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Orders</th>
              <th className="py-2 px-4 border-b text-left">Total Spent</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.contact}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
                <td className="py-2 px-4 border-b">{client.orders}</td>
                <td className="py-2 px-4 border-b">{client.totalSpent}</td>
                <td className="py-2 px-4 border-b">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Add New Client</button>
      </div>
    </div>
  );
}

export default ClientDatabase;
