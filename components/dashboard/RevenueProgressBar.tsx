"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RevenueProgressBarProps {
  current: number;
  target: number;
  growthRate: number;
}

export default function RevenueProgressBar({
  current,
  target,
  growthRate,
}: RevenueProgressBarProps) {
  const percentage = (current / target) * 100;
  const [animationComplete, setAnimationComplete] = useState(false);

  // Format numbers as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-bold">{formatCurrency(current)}</h3>
          <p className="text-muted-foreground">Current Revenue</p>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold">{formatCurrency(target)}</h3>
          <p className="text-muted-foreground">Target ($500k)</p>
        </div>
      </div>
      
      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          {/* Pulsing effect for the leading edge */}
          {animationComplete && (
            <motion.div 
              className="absolute right-0 top-0 h-full w-2 bg-white opacity-75"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
        
        {/* Percentage marker */}
        <div 
          className="absolute top-[-24px] text-sm font-semibold text-foreground"
          style={{ left: `${Math.min(Math.max(percentage - 4, 0), 96)}%` }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <div className={`mr-2 px-2 py-1 rounded ${growthRate > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {growthRate > 0 ? '+' : ''}{growthRate}%
          </div>
          <span className="text-muted-foreground">Monthly Growth</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {/* Calculate estimated months to reach target */}
          {growthRate > 0 && (
            <span>
              Est. completion: {Math.ceil(Math.log(target / current) / Math.log(1 + growthRate / 100))} months
            </span>
          )}
        </div>
      </div>
      
      {/* Animated particles for "GoogleGeminiEffect"-inspired visual */}
      <div className="relative h-4 mt-1">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-purple-400"
            initial={{ left: `${i * 10}%`, top: "50%", opacity: 0.3 }}
            animate={{ 
              top: ["30%", "70%", "30%"],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 2 + (i % 3), 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
} 