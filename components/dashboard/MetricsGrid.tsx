"use client";

import { motion } from "framer-motion";

interface MetricsGridProps {
  revenue: {
    current: number;
    lastMonthRevenue: number;
    arpc: number;
    growthRate: number;
  };
  customers: {
    active: number;
    newTrials: number;
    conversionRate: number;
    churnRate: number;
  };
  leads: {
    total: number;
    demoBooked: number;
    demoToTrial: number;
    conversionRate: number;
  };
  engagement: {
    dau: number;
    mau: number;
    keyFeatureAdoption: number;
    avgSessionTime: number;
  };
}

export default function MetricsGrid({
  revenue,
  customers,
  leads,
  engagement,
}: MetricsGridProps) {
  // Format numbers as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentages
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const metricCards = [
    {
      title: "Active Subscriptions",
      value: customers.active,
      change: "+12 this week",
      changePositive: true,
      category: "customers"
    },
    {
      title: "New Trials",
      value: customers.newTrials,
      change: "+8 from last week",
      changePositive: true,
      category: "customers"
    },
    {
      title: "Trial Conversion",
      value: formatPercent(customers.conversionRate),
      change: "+2.3% from last month",
      changePositive: true,
      category: "customers"
    },
    {
      title: "Churn Rate",
      value: formatPercent(customers.churnRate),
      change: "-0.5% from last month",
      changePositive: true,
      category: "customers"
    },
    {
      title: "Avg. Revenue Per Customer",
      value: formatCurrency(revenue.arpc),
      change: "+$50 from last month",
      changePositive: true,
      category: "revenue"
    },
    {
      title: "Last Month Revenue",
      value: formatCurrency(revenue.lastMonthRevenue),
      change: "+28% from previous",
      changePositive: true,
      category: "revenue"
    },
    {
      title: "Lead to Customer",
      value: formatPercent(leads.conversionRate),
      change: "+1.2% from last month",
      changePositive: true,
      category: "leads"
    },
    {
      title: "Feature Adoption",
      value: formatPercent(engagement.keyFeatureAdoption),
      change: "+3.5% from last month",
      changePositive: true,
      category: "engagement"
    }
  ];

  // Animation variants for the grid
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "revenue":
        return "from-blue-600 to-blue-400";
      case "customers":
        return "from-purple-600 to-purple-400";
      case "leads":
        return "from-emerald-600 to-emerald-400";
      case "engagement":
        return "from-amber-600 to-amber-400";
      default:
        return "from-gray-600 to-gray-400";
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {metricCards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-card p-4 rounded-lg shadow-sm relative overflow-hidden"
          variants={item}
        >
          {/* Category indicator */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getCategoryColor(card.category)}`} />
          
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{card.title}</h3>
          <p className="text-2xl font-bold">{card.value}</p>
          
          <div className={`text-xs mt-2 ${card.changePositive ? 'text-green-600' : 'text-red-600'}`}>
            {card.change}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 