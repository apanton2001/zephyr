import { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  AlertTriangle, 
  ArrowUpCircle, 
  ArrowDownCircle,
  RefreshCw,
  PlusCircle,
  Download,
  MoreHorizontal,
  TrendingUp
} from 'lucide-react';
import { theme } from '../../utils/theme';

// Types for inventory items
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  predictedDemand: number;
  predictedDaysUntilReorder: number;
  location: string;
  lastUpdated: string;
  price: number;
  status: 'ok' | 'low' | 'critical' | 'overstock';
}

// Types for filter state
interface FilterState {
  category: string;
  status: string;
  search: string;
}

const PredictiveInventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    status: 'all',
    search: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockData: InventoryItem[] = [
          {
            id: '1',
            name: 'Premium Ergonomic Chair',
            sku: 'FRN-1001',
            category: 'Furniture',
            currentStock: 24,
            reorderPoint: 15,
            predictedDemand: 5,
            predictedDaysUntilReorder: 32,
            location: 'A-101',
            lastUpdated: '2025-03-15',
            price: 199.99,
            status: 'ok'
          },
          {
            id: '2',
            name: 'Wireless Mouse',
            sku: 'ELC-2034',
            category: 'Electronics',
            currentStock: 103,
            reorderPoint: 30,
            predictedDemand: 12,
            predictedDaysUntilReorder: 89,
            location: 'B-204',
            lastUpdated: '2025-04-01',
            price: 45.99,
            status: 'overstock'
          },
          {
            id: '3',
            name: 'Mechanical Keyboard',
            sku: 'ELC-2038',
            category: 'Electronics',
            currentStock: 16,
            reorderPoint: 20,
            predictedDemand: 4,
            predictedDaysUntilReorder: 18,
            location: 'B-206',
            lastUpdated: '2025-04-05',
            price: 129.99,
            status: 'low'
          },
          {
            id: '4',
            name: 'Standing Desk Converter',
            sku: 'FRN-1042',
            category: 'Furniture',
            currentStock: 8,
            reorderPoint: 10,
            predictedDemand: 3,
            predictedDaysUntilReorder: 10,
            location: 'A-105',
            lastUpdated: '2025-03-28',
            price: 159.99,
            status: 'low'
          },
          {
            id: '5',
            name: 'Wireless Headphones',
            sku: 'ELC-3011',
            category: 'Electronics',
            currentStock: 5,
            reorderPoint: 15,
            predictedDemand: 2,
            predictedDaysUntilReorder: 6,
            location: 'B-210',
            lastUpdated: '2025-04-08',
            price: 89.99,
            status: 'critical'
          },
          {
            id: '6',
            name: 'Office Chair Mat',
            sku: 'FRN-1089',
            category: 'Furniture',
            currentStock: 42,
            reorderPoint: 20,
            predictedDemand: 3,
            predictedDaysUntilReorder: 65,
            location: 'A-110',
            lastUpdated: '2025-03-20',
            price: 49.99,
            status: 'ok'
          },
          {
            id: '7',
            name: 'USB-C Hub',
            sku: 'ELC-2091',
            category: 'Electronics',
            currentStock: 3,
            reorderPoint: 12,
            predictedDemand: 4,
            predictedDaysUntilReorder: 2,
            location: 'B-215',
            lastUpdated: '2025-04-09',
            price: 35.99,
            status: 'critical'
          },
          {
            id: '8',
            name: 'Desk Organizer',
            sku: 'FRN-1102',
            category: 'Furniture',
            currentStock: 27,
            reorderPoint: 15,
            predictedDemand: 2,
            predictedDaysUntilReorder: 40,
            location: 'A-115',
            lastUpdated: '2025-03-25',
            price: 29.99,
            status: 'ok'
          },
        ];
        setInventoryItems(mockData);
        setFilteredItems(mockData);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    const filtered = inventoryItems.filter((item) => {
      // Apply category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      
      // Apply status filter
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }
      
      // Apply search filter
      if (filters.search && 
          !item.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !item.sku.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setFilteredItems(filtered);
  }, [filters, inventoryItems]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      category: e.target.value,
    });
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      status: e.target.value,
    });
  };

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Optimal
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            Low Stock
          </span>
        );
      case 'critical':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Critical
          </span>
        );
      case 'overstock':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Overstock
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
          <h1 className="text-2xl font-bold">Predictive Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor stock levels and view predictive restocking recommendations
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="mr-2 h-4 w-4" /> Export
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Summary Cards - Alerts and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Critical Stock Alert */}
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

        {/* Low Stock Alert */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Low Stock</p>
              <h3 className="text-xl font-bold mt-1 text-amber-900 dark:text-amber-200">2 Items</h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-lg">
              <ArrowDownCircle className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
            Reorder within 2 weeks
          </p>
        </div>

        {/* Optimal Stock */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Optimal Stock</p>
              <h3 className="text-xl font-bold mt-1 text-green-900 dark:text-green-200">3 Items</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-lg">
              <Package className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <p className="text-xs text-green-700 dark:text-green-400 mt-2">
            Inventory at optimal levels
          </p>
        </div>

        {/* Overstock Alert */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Overstock</p>
              <h3 className="text-xl font-bold mt-1 text-blue-900 dark:text-blue-200">1 Items</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-lg">
              <ArrowUpCircle className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-2">
            Consider running promotions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-40">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                value={filters.category}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            <div className="w-40">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                value={filters.status}
                onChange={handleStatusChange}
              >
                <option value="all">All Statuses</option>
                <option value="ok">Optimal</option>
                <option value="low">Low Stock</option>
                <option value="critical">Critical</option>
                <option value="overstock">Overstock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Predicted Demand
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Days Until Reorder
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
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
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex justify-center items-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Loading inventory data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No inventory items match your filters
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                          <Package className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            SKU: {item.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="font-medium">{item.currentStock}</div>
                      <div className="text-xs">Reorder point: {item.reorderPoint}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-primary" />
                        <span>{item.predictedDemand} units/week</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'critical' ? (
                        <div className="text-sm font-medium text-red-600 dark:text-red-400">
                          Reorder now
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.predictedDaysUntilReorder} days
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary/80 dark:hover:text-primary/90 mr-4">
                        Edit
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredItems.length}</span> of{' '}
                <span className="font-medium">{filteredItems.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-primary text-sm font-medium text-white">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInventoryManagement;
