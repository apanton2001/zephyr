"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import RevenueProgressBar from "@/components/dashboard/RevenueProgressBar";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import LeadFunnel from "@/components/dashboard/LeadFunnel";
import TrafficSources from "@/components/dashboard/TrafficSources";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AutomationStatus from "@/components/dashboard/AutomationStatus";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Dashboard() {
  // Sample data - in a real app, this would come from an API
  const [dashboardData, setDashboardData] = useState({
    revenue: {
      current: 75000,
      target: 500000,
      lastMonthRevenue: 15000,
      arpc: 350,
      growthRate: 28
    },
    customers: {
      active: 214,
      newTrials: 43,
      conversionRate: 32,
      churnRate: 4.5
    },
    leads: {
      total: 3240,
      demoBooked: 67,
      demoToTrial: 41,
      conversionRate: 12.4
    },
    traffic: {
      organic: 1230,
      paid: 2150,
      referral: 840,
      direct: 560,
      social: 980,
      email: 360
    },
    engagement: {
      dau: 145,
      mau: 320,
      keyFeatureAdoption: 78,
      avgSessionTime: 24.5
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Cargo Command Dashboard</h1>
        
        {/* Revenue Progress Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Revenue Progress</h2>
          <RevenueProgressBar 
            current={dashboardData.revenue.current} 
            target={dashboardData.revenue.target} 
            growthRate={dashboardData.revenue.growthRate}
          />
        </section>
        
        {/* Key Metrics Grid */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Metrics</h2>
          <MetricsGrid 
            revenue={dashboardData.revenue}
            customers={dashboardData.customers}
            leads={dashboardData.leads}
            engagement={dashboardData.engagement}
          />
        </section>
        
        {/* Lead Funnel & Traffic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Lead Funnel</h2>
            <LeadFunnel data={dashboardData.leads} />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Traffic Sources</h2>
            <TrafficSources data={dashboardData.traffic} />
          </section>
        </div>
        
        {/* Recent Activity & Automation Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <RecentActivity />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Automation Status</h2>
            <AutomationStatus />
          </section>
        </div>
      </main>
    </div>
  );
} 