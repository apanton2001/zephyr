import React from 'react';

function EmployeeTasks() {
  const tasks = [
    { id: 1, employee: 'John Doe', task: 'Inventory Check - Electronics', status: 'In Progress', dueDate: '2023-06-05' },
    { id: 2, employee: 'Jane Smith', task: 'Pack Order #1234', status: 'Completed', dueDate: '2023-06-02' },
    { id: 3, employee: 'Mike Johnson', task: 'Restock Hardware Aisle', status: 'Not Started', dueDate: '2023-06-07' },
    { id: 4, employee: 'Sarah Williams', task: 'Process Returns', status: 'In Progress', dueDate: '2023-06-04' },
    { id: 5, employee: 'Tom Brown', task: 'Warehouse Cleaning', status: 'Not Started', dueDate: '2023-06-10' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-6">
      <h2 className="text-2xl font-bold mb-4">Employee Tasks</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Employee</th>
              <th className="py-2 px-4 border-b text-left">Task</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{task.employee}</td>
                <td className="py-2 px-4 border-b">{task.task}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Add New Task</button>
      </div>
    </div>
  );
}

export default EmployeeTasks;
