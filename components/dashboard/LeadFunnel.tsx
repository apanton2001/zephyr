"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LeadFunnelProps {
  data: {
    total: number;
    demoBooked: number;
    demoToTrial: number;
    conversionRate: number;
  };
}

export default function LeadFunnel({ data }: LeadFunnelProps) {
  // Calculate percentages for visualization
  const demoBookedPercent = (data.demoBooked / data.total) * 100;
  const trialPercent = (data.demoToTrial / data.demoBooked) * 100;
  const customerPercent = data.conversionRate; // Already a percentage
  
  // Animation variants
  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (i: number) => ({
      width: `${i}%`,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="space-y-6">
        {/* Total Leads */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium">Total Leads</h3>
            <span className="text-sm font-bold">{data.total.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <motion.div
              className="h-full bg-indigo-600 rounded-full"
              initial="hidden"
              animate="visible"
              custom={100}
              variants={barVariants}
            />
          </div>
        </div>
        
        {/* Demos Booked */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium">Demos Booked</h3>
            <div className="flex text-sm">
              <span className="font-bold">{data.demoBooked.toLocaleString()}</span>
              <span className="text-muted-foreground ml-2">({demoBookedPercent.toFixed(1)}%)</span>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <motion.div
              className="h-full bg-purple-600 rounded-full"
              initial="hidden"
              animate="visible"
              custom={demoBookedPercent}
              variants={barVariants}
            />
          </div>
        </div>
        
        {/* Trials Started */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium">Trials Started</h3>
            <div className="flex text-sm">
              <span className="font-bold">{data.demoToTrial.toLocaleString()}</span>
              <span className="text-muted-foreground ml-2">({trialPercent.toFixed(1)}% of demos)</span>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial="hidden"
              animate="visible"
              custom={trialPercent}
              variants={barVariants}
            />
          </div>
        </div>
        
        {/* Customers */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium">Paying Customers</h3>
            <div className="flex text-sm">
              <span className="font-bold">
                {Math.round(data.demoToTrial * (data.conversionRate / 100)).toLocaleString()}
              </span>
              <span className="text-muted-foreground ml-2">({customerPercent.toFixed(1)}% of trials)</span>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <motion.div
              className="h-full bg-emerald-600 rounded-full"
              initial="hidden"
              animate="visible"
              custom={customerPercent}
              variants={barVariants}
            />
          </div>
        </div>
      </div>
      
      {/* Funnel visualization */}
      <div className="mt-8 relative h-32">
        <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
          <motion.path
            d="M0,0 L400,0 L300,50 L200,100 L100,50 L0,0 Z"
            fill="url(#gradient)"
            fillOpacity="0.2"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="33%" stopColor="#8b5cf6" />
              <stop offset="66%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Funnel labels */}
        <div className="absolute top-0 left-0 text-xs font-semibold text-muted-foreground">
          Leads
        </div>
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 text-xs font-semibold text-muted-foreground">
          Demos
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-muted-foreground">
          Trials
        </div>
        <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 text-xs font-semibold text-muted-foreground">
          Customers
        </div>
      </div>
    </div>
  );
} 