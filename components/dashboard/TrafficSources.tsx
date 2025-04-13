"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrafficSourcesProps {
  data: {
    organic: number;
    paid: number;
    referral: number;
    direct: number;
    social: number;
    email: number;
  };
}

export default function TrafficSources({ data }: TrafficSourcesProps) {
  // Calculate total traffic
  const totalTraffic = Object.values(data).reduce((sum, value) => sum + value, 0);
  
  // Calculate percentages
  const getPercentage = (value: number) => {
    return (value / totalTraffic) * 100;
  };
  
  // Generate traffic source data with colors
  const trafficSources = [
    { 
      name: "Organic", 
      value: data.organic, 
      percentage: getPercentage(data.organic),
      color: "from-blue-500 to-indigo-600",
      iconClass: "bg-blue-100 text-blue-800" 
    },
    { 
      name: "Paid", 
      value: data.paid, 
      percentage: getPercentage(data.paid),
      color: "from-purple-500 to-purple-600",
      iconClass: "bg-purple-100 text-purple-800" 
    },
    { 
      name: "Referral", 
      value: data.referral, 
      percentage: getPercentage(data.referral),
      color: "from-emerald-500 to-emerald-600",
      iconClass: "bg-emerald-100 text-emerald-800" 
    },
    { 
      name: "Direct", 
      value: data.direct, 
      percentage: getPercentage(data.direct),
      color: "from-amber-500 to-amber-600",
      iconClass: "bg-amber-100 text-amber-800" 
    },
    { 
      name: "Social", 
      value: data.social, 
      percentage: getPercentage(data.social),
      color: "from-rose-500 to-rose-600",
      iconClass: "bg-rose-100 text-rose-800" 
    },
    { 
      name: "Email", 
      value: data.email, 
      percentage: getPercentage(data.email),
      color: "from-sky-500 to-sky-600",
      iconClass: "bg-sky-100 text-sky-800" 
    },
  ];
  
  // Sort by traffic volume (descending)
  const sortedSources = [...trafficSources].sort((a, b) => b.value - a.value);

  // Variants for animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <div className="text-sm font-medium text-muted-foreground mb-1">Total Traffic</div>
        <div className="text-2xl font-bold">{totalTraffic.toLocaleString()} visitors</div>
      </div>
      
      {/* Traffic breakdown */}
      <motion.div 
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedSources.map((source, index) => (
          <motion.div key={index} className="space-y-1" variants={item}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 bg-gradient-to-r ${source.color}`} />
                <span className="text-sm font-medium">{source.name}</span>
              </div>
              <div className="text-sm font-bold">{source.value.toLocaleString()}</div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${source.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${source.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Top source highlight */}
      <div className="mt-6 p-3 rounded-lg bg-muted/30 border border-muted">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${sortedSources[0].iconClass}`}>
            {getSourceIcon(sortedSources[0].name)}
          </div>
          <div>
            <div className="text-sm font-medium">{sortedSources[0].name} is your top source</div>
            <div className="text-xs text-muted-foreground">
              {sortedSources[0].percentage.toFixed(1)}% of total traffic
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get icon based on source name
function getSourceIcon(sourceName: string): JSX.Element {
  switch (sourceName) {
    case "Organic":
      return <span>🔍</span>;
    case "Paid":
      return <span>💰</span>;
    case "Referral":
      return <span>🔗</span>;
    case "Direct":
      return <span>📌</span>;
    case "Social":
      return <span>👥</span>;
    case "Email":
      return <span>📧</span>;
    default:
      return <span>📊</span>;
  }
} 