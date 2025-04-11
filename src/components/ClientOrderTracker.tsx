import React from 'react';

function ClientOrderTracker() {
  const orders = [
    { id: 1, client: 'Client A', orderDate: '2023-05-28', status: 'Shipped', total: '$1,200.50' },
    { id: 2, client: 'Client B', orderDate: '2023-05-30', status: 'Processing', total: '$850.75' },
    { id: 3, client: 'Client C', orderDate: '2023-06-01', status: 'Pending', total: '$3,400.25' },
    { id: 4, client: 'Client D', orderDate: '2023-06-02', status: 'Shipped', total: '$675.30' },
    { id: 5, client: 'Client E', orderDate: '2023-06-03', status: 'Processing', total: '$2,100.80' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shipped': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4">Client Order Tracker</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Client</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.client}</td>
                <td className="py-2 px-4 border-b">{order.orderDate}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientOrderTracker;
