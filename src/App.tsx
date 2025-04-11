import React, { useState, useEffect } from 'react'
import PredictiveInventory from './components/PredictiveInventory'
import WarehouseLayout from './components/WarehouseLayout'
import Dashboard from './components/Dashboard'
import Inventory from './components/Inventory'
import ClientOrderTracker from './components/ClientOrderTracker'
import LowStockAlerts from './components/LowStockAlerts'
import EmployeeTasks from './components/EmployeeTasks'
import FinancialReports from './components/FinancialReports'
import ClientDatabase from './components/ClientDatabase'
import ProductLocations from './components/ProductLocations'
import MetricsDashboard from './components/metrics/MetricsDashboard'
import TestRunner from './components/TestRunner'

// Icons for navigation
import { 
  LayoutDashboard,
  BarChart3,
  Package,
  LineChart,
  ClipboardList,
  MapPin,
  AlertCircle,
  Users,
  DollarSign,
  UserCheck,
  Warehouse,
  Settings,
  LogOut,
  BellRing,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  
  // Mock user data
  const user = {
    name: 'Alex Morgan',
    role: 'Warehouse Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  // Effect to apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'metrics', label: 'Performance Metrics', icon: <BarChart3 size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'predictive', label: 'Predictive Inventory', icon: <LineChart size={20} /> },
    { id: 'orders', label: 'Client Orders', icon: <ClipboardList size={20} /> },
    { id: 'locations', label: 'Product Locations', icon: <MapPin size={20} /> },
    { id: 'alerts', label: 'Low Stock Alerts', icon: <AlertCircle size={20} /> },
    { id: 'tasks', label: 'Employee Tasks', icon: <UserCheck size={20} /> },
    { id: 'reports', label: 'Financial Reports', icon: <DollarSign size={20} /> },
    { id: 'clients', label: 'Client Database', icon: <Users size={20} /> },
    { id: 'layout', label: 'Warehouse Layout', icon: <Warehouse size={20} /> },
    { id: 'testing', label: 'Test Components', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'inventory': return <Inventory />;
      case 'predictive': return <PredictiveInventory />;
      case 'orders': return <ClientOrderTracker />;
      case 'locations': return <ProductLocations />;
      case 'alerts': return <LowStockAlerts />;
      case 'tasks': return <EmployeeTasks />;
      case 'reports': return <FinancialReports />;
      case 'clients': return <ClientDatabase />;
      case 'layout': return <WarehouseLayout />;
      case 'metrics': return <MetricsDashboard />;
      case 'testing': return <TestRunner />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background-dark text-white' : 'bg-background-light'}`}>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar / Navigation */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-200 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close button (mobile) */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Warehouse className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold">Zephyr</h1>
            </div>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button 
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeTab === item.id ? 'bg-primary text-white' : `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}`} 
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile & theme toggle */}
          <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-4`}>
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button className="relative">
                <BellRing size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                {notificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notificationsCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col lg:pl-64 min-h-screen">
        {/* Header */}
        <header className={`sticky top-0 z-30 flex h-16 items-center justify-between px-4 md:px-6 ${darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'} shadow-sm`}>
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold">{navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}</h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Other header controls could go here */}
            <button className="text-error hover:text-red-700 transition-colors duration-200 flex items-center space-x-1">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6">
          <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-6`}>
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className={`px-4 py-3 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'} text-xs border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <p>© 2025 Zephyr Warehouse CRM. All rights reserved.</p>
            <p>Version 0.1.0</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
