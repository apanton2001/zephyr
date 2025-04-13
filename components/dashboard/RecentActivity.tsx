"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "lead" | "demo" | "trial" | "payment" | "automation";
  action: string;
  timestamp: Date;
  details: string;
  status?: "success" | "pending" | "failed";
}

export default function RecentActivity() {
  // Sample data - in a real app, this would come from an API
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "act1",
      type: "lead",
      action: "New lead generated",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      details: "From LinkedIn Ads Campaign",
      status: "success"
    },
    {
      id: "act2",
      type: "demo",
      action: "Demo scheduled",
      timestamp: new Date(Date.now() - 1000 * 60 * 42), // 42 minutes ago
      details: "Warehouse Partners Inc.",
      status: "success"
    },
    {
      id: "act3",
      type: "trial",
      action: "Trial started",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      details: "LogiTrack Systems",
      status: "success"
    },
    {
      id: "act4",
      type: "payment",
      action: "Payment received",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      details: "$350.00 - Monthly Plan",
      status: "success"
    },
    {
      id: "act5",
      type: "automation",
      action: "Lead list processed",
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      details: "1,200 records processed",
      status: "success"
    },
    {
      id: "act6",
      type: "lead",
      action: "Lead enrichment completed",
      timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
      details: "85% enrichment rate",
      status: "success"
    },
  ]);

  // Get appropriate icon for activity type
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "lead":
        return "👤";
      case "demo":
        return "🎮";
      case "trial":
        return "🔄";
      case "payment":
        return "💰";
      case "automation":
        return "⚙️";
      default:
        return "📋";
    }
  };

  // Get color for activity type
  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "lead":
        return "bg-blue-500";
      case "demo":
        return "bg-purple-500";
      case "trial":
        return "bg-indigo-500";
      case "payment":
        return "bg-emerald-500";
      case "automation":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get status indicator color
  const getStatusColor = (status?: Activity["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "pending":
        return "bg-amber-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative mr-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)} bg-opacity-20 text-foreground`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(activity.status)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium truncate">{activity.action}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{activity.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
          View all activity →
        </button>
      </div>
    </div>
  );
} 