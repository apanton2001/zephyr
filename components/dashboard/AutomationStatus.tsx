"use client";

import { motion } from "framer-motion";

interface AutomationTask {
  id: string;
  name: string;
  status: "active" | "inactive" | "warning" | "error";
  lastRun: string;
  successRate: number;
  type: "lead" | "outreach" | "twitter" | "trial" | "payment";
}

export default function AutomationStatus() {
  // Sample automation task data
  const automationTasks: AutomationTask[] = [
    {
      id: "auto1",
      name: "Lead List Processing",
      status: "active",
      lastRun: "10 minutes ago",
      successRate: 98.4,
      type: "lead"
    },
    {
      id: "auto2",
      name: "Personalized Outreach",
      status: "active",
      lastRun: "25 minutes ago",
      successRate: 94.7,
      type: "outreach"
    },
    {
      id: "auto3",
      name: "Twitter Content Bot",
      status: "active",
      lastRun: "2 hours ago",
      successRate: 100,
      type: "twitter"
    },
    {
      id: "auto4",
      name: "Trial User Engagement",
      status: "warning",
      lastRun: "1 hour ago",
      successRate: 87.2,
      type: "trial"
    },
    {
      id: "auto5",
      name: "Payment Processing",
      status: "inactive",
      lastRun: "2 days ago",
      successRate: 0,
      type: "payment"
    },
  ];

  // Get status indicator colors
  const getStatusColor = (status: AutomationTask["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-400";
      case "warning":
        return "bg-amber-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get status text
  const getStatusText = (status: AutomationTask["status"]) => {
    switch (status) {
      case "active":
        return "Running";
      case "inactive":
        return "Stopped";
      case "warning":
        return "Attention needed";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  // Animation variants
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Automation Status</h3>
        <button className="text-xs font-medium text-primary hover:underline">
          Configure
        </button>
      </div>
      
      <motion.div 
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {automationTasks.map((task) => (
          <motion.div 
            key={task.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-muted"
            variants={item}
          >
            <div className="flex items-center">
              <div className="relative mr-3">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}>
                  {task.status === "active" && (
                    <motion.div 
                      className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 opacity-75"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium">{task.name}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{getStatusText(task.status)}</span>
                  <span className="mx-1">•</span>
                  <span>Last run: {task.lastRun}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-sm font-bold">
                {task.status !== "inactive" ? `${task.successRate}%` : "-"}
              </div>
              <div className="text-xs text-muted-foreground">
                {task.status !== "inactive" ? "Success rate" : "Not running"}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900">
        <div className="flex items-center text-sm text-blue-700 dark:text-blue-400">
          <span className="mr-2">💡</span>
          <span>All automation workflows are running through n8n with API integrations.</span>
        </div>
      </div>
    </div>
  );
} 