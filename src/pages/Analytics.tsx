
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { 
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart as RechartsBar,
  Bar,
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from "recharts";

const Analytics = () => {
  // Mock data for demo purposes
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  
  // Status distribution data
  const statusData = [
    { name: "Applied", value: 25, color: "#3B82F6" },  // blue-500
    { name: "Interview", value: 12, color: "#F59E0B" }, // amber-500
    { name: "Offered", value: 3, color: "#10B981" },   // green-500
    { name: "Rejected", value: 10, color: "#EF4444" },  // red-500
  ];
  
  // Application over time data
  const timeData = [
    { date: "2023-01-01", count: 2 },
    { date: "2023-01-15", count: 5 },
    { date: "2023-02-01", count: 8 },
    { date: "2023-02-15", count: 12 },
    { date: "2023-03-01", count: 18 },
    { date: "2023-03-15", count: 25 },
    { date: "2023-04-01", count: 32 },
    { date: "2023-04-15", count: 40 },
    { date: "2023-05-01", count: 45 },
    { date: "2023-05-15", count: 50 },
  ];
  
  // Roles/categories data
  const roleData = [
    { name: "Frontend", applied: 15, interview: 7, offered: 2 },
    { name: "Backend", applied: 10, interview: 5, offered: 1 },
    { name: "Full Stack", applied: 8, interview: 3, offered: 0 },
    { name: "UX/UI", applied: 5, interview: 2, offered: 0 },
    { name: "DevOps", applied: 2, interview: 0, offered: 0 },
  ];
  
  // Insights data
  const insights = [
    {
      title: "Frontend roles show higher success",
      description: "You're getting more interviews for Frontend positions. Consider focusing on these roles."
    },
    {
      title: "Application-to-interview ratio improving",
      description: "Your interview rate has increased by 15% in the last month, indicating better targeting or improved resume."
    },
    {
      title: "Consider adding portfolio links",
      description: "Applications with direct links to your work are 30% more likely to get interviews."
    },
    {
      title: "Response time analysis",
      description: "Most responses come within 2 weeks. Consider following up if you haven't heard back after that time."
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jobwise-dark mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Track your application progress and gain insights to improve your job search
        </p>
      </div>

      {/* Time Period Selector */}
      <div className="mb-8">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="last30days">Last 30 Days</TabsTrigger>
            <TabsTrigger value="last90days">Last 90 Days</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Applications", value: "50", change: "+5", color: "bg-jobwise-light" },
          { title: "Interview Rate", value: "24%", change: "+2%", color: "bg-blue-100" },
          { title: "Offer Rate", value: "6%", change: "+1%", color: "bg-green-100" },
          { title: "Avg. Response Time", value: "12 days", change: "-2 days", color: "bg-amber-100" },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className={`p-6 ${card.color}`}>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-jobwise-dark">{card.value}</h3>
                    <p className={`text-sm font-medium ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Application Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-jobwise-dark">Application Status</CardTitle>
              <PieChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie data={statusData}>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} Applications`, ""]} />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-jobwise-dark">Applications Over Time</CardTitle>
              <LineChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLine data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      formatter={(value) => [`${value} Applications`, ""]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="Applications" 
                      stroke="#A3A3CC" 
                      strokeWidth={2}
                      activeDot={{ r: 8, fill: "#5C5C99" }} 
                    />
                  </RechartsLine>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications by Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-jobwise-dark">Applications by Role</CardTitle>
              <BarChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBar data={roleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applied" name="Applied" fill="#A3A3CC" />
                    <Bar dataKey="interview" name="Interview" fill="#5C5C99" />
                    <Bar dataKey="offered" name="Offered" fill="#292966" />
                  </RechartsBar>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-jobwise-dark">Insights & Tips</CardTitle>
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-jobwise-light/20 rounded-lg border border-jobwise-light/30">
                    <h3 className="font-medium text-jobwise-dark">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// Lightbulb icon for insights
const Lightbulb = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="9" y1="18" x2="15" y2="18"></line>
    <line x1="10" y1="22" x2="14" y2="22"></line>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
  </svg>
);

export default Analytics;
