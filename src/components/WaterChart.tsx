import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  Droplets,
  Clock,
  Home
} from "lucide-react";

// Sample data for charts
const dailyData = [
  { day: "Mon", usage: 280, target: 300, saved: 20 },
  { day: "Tue", usage: 320, target: 300, saved: -20 },
  { day: "Wed", usage: 250, target: 300, saved: 50 },
  { day: "Thu", usage: 290, target: 300, saved: 10 },
  { day: "Fri", usage: 310, target: 300, saved: -10 },
  { day: "Sat", usage: 380, target: 300, saved: -80 },
  { day: "Sun", usage: 260, target: 300, saved: 40 }
];

const weeklyData = [
  { week: "Week 1", usage: 2100, target: 2200, efficiency: 95 },
  { week: "Week 2", usage: 1980, target: 2200, efficiency: 90 },
  { week: "Week 3", usage: 2250, target: 2200, efficiency: 102 },
  { week: "Week 4", usage: 1850, target: 2200, efficiency: 84 }
];

const deviceUsageData = [
  { device: "Shower", usage: 45, color: "#3b82f6" },
  { device: "Dishwasher", usage: 20, color: "#10b981" },
  { device: "Washing Machine", usage: 25, color: "#f59e0b" },
  { device: "Other", usage: 10, color: "#ef4444" }
];

const hourlyPattern = [
  { hour: "6AM", usage: 45 },
  { hour: "7AM", usage: 120 },
  { hour: "8AM", usage: 85 },
  { hour: "9AM", usage: 30 },
  { hour: "10AM", usage: 25 },
  { hour: "11AM", usage: 20 },
  { hour: "12PM", usage: 35 },
  { hour: "1PM", usage: 40 },
  { hour: "2PM", usage: 15 },
  { hour: "3PM", usage: 20 },
  { hour: "4PM", usage: 25 },
  { hour: "5PM", usage: 30 },
  { hour: "6PM", usage: 95 },
  { hour: "7PM", usage: 110 },
  { hour: "8PM", usage: 75 },
  { hour: "9PM", usage: 45 },
  { hour: "10PM", usage: 35 },
  { hour: "11PM", usage: 15 }
];

export const WaterChart = () => {
  const totalUsageThisWeek = dailyData.reduce((sum, day) => sum + day.usage, 0);
  const totalSavedThisWeek = dailyData.reduce((sum, day) => sum + Math.max(0, day.saved), 0);
  const avgDailyUsage = totalUsageThisWeek / 7;
  const weeklyTrend = ((totalUsageThisWeek - 2100) / 2100) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Water Usage Analytics</h2>
        <p className="text-muted-foreground">Detailed insights into your water consumption patterns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Droplets className="w-5 h-5" />
            <span className="text-sm font-medium">Weekly Usage</span>
          </div>
          <div className="text-2xl font-bold">{totalUsageThisWeek}L</div>
          <div className="flex items-center gap-1 text-sm">
            {weeklyTrend > 0 ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-500" />
            )}
            <span className={weeklyTrend > 0 ? "text-red-500" : "text-green-500"}>
              {Math.abs(weeklyTrend).toFixed(1)}%
            </span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm font-medium">Water Saved</span>
          </div>
          <div className="text-2xl font-bold">{totalSavedThisWeek}L</div>
          <div className="text-sm text-muted-foreground">This week</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Daily Average</span>
          </div>
          <div className="text-2xl font-bold">{avgDailyUsage.toFixed(0)}L</div>
          <div className="text-sm text-muted-foreground">Per day</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Efficiency</span>
          </div>
          <div className="text-2xl font-bold">87%</div>
          <div className="text-sm text-muted-foreground">vs target</div>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="devices">By Device</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        {/* Daily Usage Chart */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Daily Water Usage vs Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="5 5"
                    name="target"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="usage"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Trends */}
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Weekly Usage Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Device Usage Breakdown */}
        <TabsContent value="devices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage by Device</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceUsageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="usage"
                      label={({ device, usage }) => `${device}: ${usage}%`}
                    >
                      {deviceUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceUsageData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: device.color }}
                      />
                      <span className="font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{device.usage}%</span>
                      <Badge variant="outline">
                        {device.usage > 30 ? "High" : device.usage > 20 ? "Medium" : "Low"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Patterns */}
        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Hourly Usage Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={hourlyPattern}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="usage" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};