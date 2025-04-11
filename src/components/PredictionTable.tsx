import React from 'react';

type Prediction = {
  id: number;
  product: string;
  stock: number;
  dailyUsage: number;
  daysLeft: number;
  urgency: string;
  confidence: number;
  restockDate: string;
  category: string;
};

type SortConfig = {
  key: string;
  direction: 'ascending' | 'descending';
};

interface PredictionTableProps {
  predictions: Prediction[];
  onSort: (key: string) => void;
  sortConfig: SortConfig;
}

function PredictionTable({ predictions, onSort, sortConfig }: PredictionTableProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('product')}
            >
              Product{getSortIndicator('product')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('category')}
            >
              Category{getSortIndicator('category')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('stock')}
            >
              Stock{getSortIndicator('stock')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('dailyUsage')}
            >
              Daily Usage{getSortIndicator('dailyUsage')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('daysLeft')}
            >
              Days Left{getSortIndicator('daysLeft')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('urgency')}
            >
              Urgency{getSortIndicator('urgency')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('confidence')}
            >
              Confidence{getSortIndicator('confidence')}
            </th>
            <th 
              className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200" 
              onClick={() => onSort('restockDate')}
            >
              Restock Date{getSortIndicator('restockDate')}
            </th>
          </tr>
        </thead>
        <tbody>
          {predictions.map(prediction => (
            <tr key={prediction.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{prediction.product}</td>
              <td className="py-2 px-4 border-b">{prediction.category}</td>
              <td className="py-2 px-4 border-b">{prediction.stock}</td>
              <td className="py-2 px-4 border-b">{prediction.dailyUsage}</td>
              <td className="py-2 px-4 border-b">{prediction.daysLeft}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyColor(prediction.urgency)}`}>
                  {prediction.urgency.charAt(0).toUpperCase() + prediction.urgency.slice(1)}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{prediction.confidence}%</td>
              <td className="py-2 px-4 border-b">{prediction.restockDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PredictionTable;
