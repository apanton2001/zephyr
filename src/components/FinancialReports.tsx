import React from 'react';

function FinancialReports() {
  const reports = [
    { id: 1, period: 'May 2023', revenue: '$45,000.00', expenses: '$32,000.00', profit: '$13,000.00' },
    { id: 2, period: 'April 2023', revenue: '$42,500.00', expenses: '$31,200.00', profit: '$11,300.00' },
    { id: 3, period: 'March 2023', revenue: '$38,700.00', expenses: '$29,800.00', profit: '$8,900.00' },
    { id: 4, period: 'February 2023', revenue: '$41,200.00', expenses: '$30,500.00', profit: '$10,700.00' },
    { id: 5, period: 'January 2023', revenue: '$39,800.00', expenses: '$31,000.00', profit: '$8,800.00' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4">Financial Reports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Period</th>
              <th className="py-2 px-4 border-b text-left">Revenue</th>
              <th className="py-2 px-4 border-b text-left">Expenses</th>
              <th className="py-2 px-4 border-b text-left">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{report.period}</td>
                <td className="py-2 px-4 border-b text-green-600">{report.revenue}</td>
                <td className="py-2 px-4 border-b text-red-600">{report.expenses}</td>
                <td className="py-2 px-4 border-b" style={{ color: parseFloat(report.profit.replace('$', '').replace(',', '')) >= 0 ? 'green' : 'red' }}>{report.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Generate Report</button>
        <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">Export Data</button>
      </div>
    </div>
  );
}

export default FinancialReports;
