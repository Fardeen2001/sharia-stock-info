import { FileText, LineChart, Users, TrendingUp } from "lucide-react";
import { DashboardCard } from "./dashboard-card";

interface StatsCardsProps {
  postCount: number;
  stockCount: number;
}

export function StatsCards({ postCount, stockCount }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total Posts"
        value={postCount}
        icon={FileText}
        description="Published blog posts"
      />
      <DashboardCard
        title="Halal Stocks"
        value={stockCount}
        icon={LineChart}
        description="Tracked Shariah-compliant stocks"
      />
      <DashboardCard
        title="Monthly Views"
        value="10.2K"
        icon={Users}
        description="Last 30 days"
      />
      <DashboardCard
        title="Engagement Rate"
        value="12.5%"
        icon={TrendingUp}
        description="Average post engagement"
      />
    </div>
  );
}