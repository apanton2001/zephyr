// Dashboard component for Zephyr Warehouse CRM
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  ArrowUp, 
  ArrowDown, 
  Package, 
  AlertTriangle, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

function Dashboard() {
  // Mock data for charts with proper typing
  const revenueData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 19200, 15700, 21300, 22800, 24100],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  const orderStatusData: ChartData<'doughnut'> = {
    labels: ['Completed', 'Processing', 'Shipped', 'Pending', 'Canceled'],
    datasets: [
      {
        data: [63, 15, 10, 8, 4],
        backgroundColor: [
          '#10B981', // Success green
          '#2563EB', // Primary blue
          '#6B7280', // Secondary gray
          '#F59E0B', // Warning amber
          '#EF4444', // Error red
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const inventoryData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Stock Levels',
        data: [320, 420, 380, 410, 390, 450],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  // Chart options with proper typing
  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
    cutout: '70%',
  };

  // Mock stat data
  const stats = [
    { 
      title: 'Total Inventory', 
      value: '1,432', 
      change: '+8.2%', 
      isPositive: true,
      icon: <Package size={18} />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-800',
    },
    { 
      title: 'Low Stock Items', 
      value: '5', 
      change: '-2', 
      isPositive: true,
      icon: <AlertTriangle size={18} />,
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-800',
    },
    { 
      title: 'Pending Orders', 
      value: '18', 
      change: '+3', 
      isPositive: false,
      icon: <ShoppingBag size={18} />,
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-800',
    },
    { 
      title: 'Tasks Completed', 
      value: '94%', 
      change: '+12%', 
      isPositive: true,
      icon: <CheckCircle size={18} />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-800',
    },
  ];

  // Mock recent activities
  const recentActivities = [
    { 
      id: 1, 
      description: 'Order #8832 shipped to Acme Corp', 
      time: '10 min ago',
      icon: <ShoppingBag size={14} />,
      iconColor: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-800/50 dark:text-indigo-300'
    },
    { 
      id: 2, 
      description: 'Stock update: +200 units of Widget X-200', 
      time: '45 min ago',
      icon: <Package size={14} />,
      iconColor: 'text-blue-500 bg-blue-100 dark:bg-blue-800/50 dark:text-blue-300'
    },
    { 
      id: 3, 
      description: 'Task #45 assigned to Maria L.', 
      time: '1 hour ago',
      icon: <Clock size={14} />,
      iconColor: 'text-amber-500 bg-amber-100 dark:bg-amber-800/50 dark:text-amber-300'
    },
    { 
      id: 4, 
      description: 'New client registered: TechSolutions Inc.', 
      time: '3 hours ago',
      icon: <Users size={14} />,
      iconColor: 'text-green-500 bg-green-100 dark:bg-green-800/50 dark:text-green-300'
    },
    { 
      id: 5, 
      description: 'Inventory forecast updated for Q3', 
      time: '5 hours ago',
      icon: <TrendingUp size={14} />,
      iconColor: 'text-purple-500 bg-purple-100 dark:bg-purple-800/50 dark:text-purple-300'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message & date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-heading2 font-bold">Welcome back, Alex</h1>
          <p className="text-secondary dark:text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <Clock className="mr-2 h-4 w-4" /> Last 30 Days
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Download Report
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.iconBg} p-2 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-xs font-medium flex items-center ${stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.isPositive ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs. last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:col-span-2 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <div className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-2 rounded-full">
              +24.5% from last month
            </div>
          </div>
          <div className="h-[250px]">
            <Line data={revenueData} options={lineOptions} />
          </div>
        </div>

        {/* Order status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6">Order Status</h3>
          <div className="h-[250px] flex items-center justify-center">
            <Doughnut data={orderStatusData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Inventory and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory levels */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:col-span-2 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6">Inventory Levels</h3>
          <div className="h-[250px]">
            <Bar data={inventoryData} options={barOptions} />
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className={`flex-shrink-0 h-8 w-8 rounded-full ${activity.iconColor} flex items-center justify-center mr-3`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
