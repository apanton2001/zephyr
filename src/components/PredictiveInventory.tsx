import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import PredictionTable from './PredictionTable';
import PredictionCards from './PredictionCards';

const mockPredictions = [
  { id: 1, product: 'Widget A', stock: 120, dailyUsage: 10, daysLeft: 12, urgency: 'low', confidence: 85, restockDate: '2023-06-15', category: 'Electronics' },
  { id: 2, product: 'Gadget B', stock: 45, dailyUsage: 15, daysLeft: 3, urgency: 'high', confidence: 92, restockDate: '2023-06-03', category: 'Electronics' },
  { id: 3, product: 'Tool C', stock: 80, dailyUsage: 5, daysLeft: 16, urgency: 'low', confidence: 78, restockDate: '2023-06-20', category: 'Hardware' },
  { id: 4, product: 'Part D', stock: 15, dailyUsage: 5, daysLeft: 3, urgency: 'high', confidence: 95, restockDate: '2023-06-03', category: 'Hardware' },
  { id: 5, product: 'Component E', stock: 200, dailyUsage: 20, daysLeft: 10, urgency: 'medium', confidence: 88, restockDate: '2023-06-10', category: 'Parts' },
];

function PredictiveInventory() {
  const [activeTab, setActiveTab] = useState('table');
  const [sortConfig, setSortConfig] = useState({ key: 'daysLeft', direction: 'ascending' });
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  const sortedPredictions = [...mockPredictions].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b] ? 1 : -1;
    }
    return a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b] ? 1 : -1;
  });

  const filteredPredictions = sortedPredictions.filter(prediction => 
    (filterUrgency === 'all' || prediction.urgency === filterUrgency) && 
    (filterCategory === 'all' || prediction.category === filterCategory)
  );

  const categories = Array.from(new Set(mockPredictions.map(p => p.category)));

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Inventory Predictions</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={filterUrgency} 
            onChange={e => setFilterUrgency(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="table" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <PredictionTable 
            predictions={filteredPredictions} 
            onSort={handleSort} 
            sortConfig={sortConfig} 
          />
        </TabsContent>
        <TabsContent value="cards">
          <PredictionCards predictions={filteredPredictions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PredictiveInventory;
