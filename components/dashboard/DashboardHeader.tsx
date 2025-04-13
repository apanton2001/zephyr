"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  // Sample user state
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@cargocommand.com",
    role: "Admin",
    avatarUrl: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
  });

  // Navigation items
  const navItems = [
    { name: "Dashboard", href: "/dashboard", current: true },
    { name: "Leads", href: "/dashboard/leads", current: false },
    { name: "Customers", href: "/dashboard/customers", current: false },
    { name: "Traffic", href: "/dashboard/traffic", current: false },
    { name: "Automations", href: "/dashboard/automations", current: false },
    { name: "Settings", href: "/dashboard/settings", current: false },
  ];

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Cargo Command
              </span>
            </Link>
            
            <nav className="ml-10 hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Secondary nav and user */}
          <div className="flex items-center space-x-2">
            {/* Goal progress indicator */}
            <div className="hidden sm:flex items-center mr-4">
              <div className="text-sm font-medium mr-2">$500k Goal:</div>
              <div className="w-32 bg-muted h-2 rounded-full">
                <motion.div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "15%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="text-sm ml-2">15%</div>
            </div>
            
            {/* Notification bell */}
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent">
              <span>🔔</span>
            </button>
            
            {/* User dropdown */}
            <div className="relative ml-3">
              <div className="flex items-center">
                <button className="flex items-center text-sm rounded-full">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatarUrl}
                    alt="User avatar"
                  />
                  <span className="hidden md:flex items-center ml-2">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="ml-1">▼</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 