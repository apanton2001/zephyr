import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShoppingCart, 
  Clock, 
  RefreshCw,
  CheckCircle,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import { theme } from '../../utils/theme';

// Types for low stock items
interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  predictedDaysUntilStockout: number;
  predictedDemand: number;
  recommendedOrderQuantity: number;
  lastOrdered: string | null;
  location: string;
  price: number;
  supplier: string;
  status: 'low' | 'critical';
  priority: 'high' | 'medium' | 'low';
}

const LowStockAlerts = () => {
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showProcessing, setShowProcessing] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockData: LowStockItem[] = [
          {
            id: '1',
            name: 'Mechanical Keyboard',
            sku: 'ELC-2038',
            category: 'Electronics',
            currentStock: 16,
            reorderPoint: 20,
            predictedDaysUntilStockout: 18,
            predictedDemand: 4,
            recommendedOrderQuantity: 25,
            lastOrdered: '2025-03-10',
            location: 'B-206',
            price: 129.99,
            supplier: 'TechSupplies Inc.',
            status: 'low',
            priority: 'medium'
          },
          {
            id: '2',
            name: 'Standing Desk Converter',
            sku: 'FRN-1042',
            category: 'Furniture',
            currentStock: 8,
            reorderPoint: 10,
            predictedDaysUntilStockout: 10,
            predictedDemand: 3,
            recommendedOrderQuantity: 15,
            lastOrdered: '2025-03-05',
            location: 'A-105',
            price: 159.99,
            supplier: 'Office Essentials Ltd.',
            status: 'low',
            priority: 'medium'
          },
          {
            id: '3',
            name: 'Wireless Headphones',
            sku: 'ELC-3011',
            category: 'Electronics',
            currentStock: 5,
            reorderPoint: 15,
            predictedDaysUntilStockout: 6,
            predictedDemand: 2,
            recommendedOrderQuantity: 20,
            lastOrdered: '2025-02-20',
            location: 'B-210',
            price: 89.99,
            supplier: 'AudioGadgets Co.',
            status: 'critical',
            priority: 'high'
          },
          {
            id: '4',
            name: 'USB-C Hub',
            sku: 'ELC-2091',
            category: 'Electronics',
            currentStock: 3,
            reorderPoint: 12,
            predictedDaysUntilStockout: 2,
            predictedDemand: 4,
            recommendedOrderQuantity: 30,
            lastOrdered: null,
            location: 'B-215',
            price: 35.99,
            supplier: 'TechSupplies Inc.',
            status: 'critical',
            priority: 'high'
          }
        ];
        setLowStockItems(mockData);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Toggle select all items
  const toggleSelectAll = () => {
    if (selectedItems.length === lowStockItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(lowStockItems.map(item => item.id));
    }
  };

  // Toggle select individual item
  const toggleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Handle reorder action
  const handleReorderSelectedItems = () => {
    if (selectedItems.length === 0) return;
    
    setShowProcessing(true);
    
    // Simulate API call to create purchase orders
    setTimeout(() => {
      setShowProcessing(false);
      // Reset selection after successful reorder
      setSelectedItems([]);
      
      // In a real app, you would:
      // 1. Create purchase orders for selected items
      // 2. Update the items list with new status
      // 3. Show confirmation to user
    }, 2000);
  };

  // Function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle className="h-3 w-3 mr-1" /> High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <Clock className="h-3 w-3 mr-1" /> Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Clock className="h-3 w-3 mr-1" /> Low
          </span>
        );
      default:
        return null;
    }
  };

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Critical
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            Low Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Low Stock Alerts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Items requiring immediate attention and reordering
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setLowStockItems([...lowStockItems])}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
          </button>
          <button 
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={selectedItems.length === 0 || showProcessing}
            onClick={handleReorderSelectedItems}
          >
            {showProcessing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Reorder Selected ({selectedItems.length})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alerts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Critical Alerts */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-100 dark:border-red-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Critical Stock</p>
              <h3 className="text-xl font-bold mt-1 text-red-900 dark:text-red-200">2 Items</h3>
            </div>
            <div className="bg-red-100 dark:bg-red-800/50 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
            </div>
          </div>
          <p className="text-xs text-red-700 dark:text-red-400 mt-2">
            Immediate reorder required
          </p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Low Stock</p>
              <h3 className="text-xl font-bold mt-1 text-amber-900 dark:text-amber-200">2 Items</h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
            Reorder within 2 weeks
          </p>
        </div>

        {/* Last Reordered */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Last Reordered</p>
              <h3 className="text-xl font-bold mt-1 text-blue-900 dark:text-blue-200">0 Items</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-2">
            In the last 24 hours
          </p>
        </div>
      </div>

      {/* Low Stock Items Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th scope="col" className="px-3 py-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                      checked={selectedItems.length === lowStockItems.length && lowStockItems.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Predicted Days Left
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Supplier
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recommendation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex justify-center items-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Loading alert data...</span>
                    </div>
                  </td>
                </tr>
              ) : lowStockItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No low stock items to display
                  </td>
                </tr>
              ) : (
                lowStockItems.map((item) => (
                  <tr key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${item.status === 'critical' ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            SKU: {item.sku} | Location: {item.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(item.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="font-medium">{item.currentStock}</div>
                      <div className="text-xs">Reorder point: {item.reorderPoint}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'critical' ? (
                        <div className="text-sm font-medium text-red-600 dark:text-red-400">
                          {item.predictedDaysUntilStockout} days
                        </div>
                      ) : (
                        <div className="text-sm text-amber-600 dark:text-amber-400">
                          {item.predictedDaysUntilStockout} days
                        </div>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {item.predictedDemand} units/week
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.supplier}
                      <div className="text-xs">
                        {item.lastOrdered ? `Last ordered: ${item.lastOrdered}` : 'No recent orders'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="text-primary">Order {item.recommendedOrderQuantity} units</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Cost: ${(item.price * item.recommendedOrderQuantity).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="inline-flex items-center text-primary hover:text-primary/80 dark:hover:text-primary/90">
                        Order Now <ExternalLink className="ml-1 h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlerts;
