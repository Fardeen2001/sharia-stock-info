"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "./stats-cards";
import { RecentPosts } from "./recent-posts";
import { AdminActions } from "./admin-actions";
import { QuickActions } from "./quick-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDashboardData } from "@/hooks/use-dashboard-data";

export function AdminDashboard() {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-10 text-destructive">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <AdminActions />
        </div>

        <div className="space-y-8">
          <StatsCards postCount={data.postCount} stockCount={data.stockCount} />

          <div className="grid grid-cols-1 gap-8">
            <QuickActions />
            <RecentPosts posts={data.recentPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
