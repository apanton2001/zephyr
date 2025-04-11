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

interface PredictionCardsProps {
  predictions: Prediction[];
}

function PredictionCards({ predictions }: PredictionCardsProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {predictions.map(prediction => (
        <div 
          key={prediction.id} 
          className={`p-4 rounded-lg shadow border ${getUrgencyColor(prediction.urgency)}`}
        >
          <h3 className="text-lg font-semibold mb-2">{prediction.product}</h3>
          <p className="text-sm text-gray-600 mb-2">Category: {prediction.category}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p>Stock: {prediction.stock}</p>
              <p>Daily Usage: {prediction.dailyUsage}</p>
              <p>Days Left: {prediction.daysLeft}</p>
            </div>
            <div>
              <p>Confidence: {prediction.confidence}%</p>
              <p>Restock: {prediction.restockDate}</p>
              <p>
                Urgency: 
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-opacity-30">
                  {prediction.urgency.charAt(0).toUpperCase() + prediction.urgency.slice(1)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PredictionCards;
