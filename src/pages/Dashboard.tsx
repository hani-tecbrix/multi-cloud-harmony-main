import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Package, Calendar, Mail, Send } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const spendingData = [
  { name: "Jan", AWS: 13000, Azure: 7500, GCP: 3000, Budget: 26000 },
  { name: "Feb", AWS: 13500, Azure: 8000, GCP: 3200, Budget: 26000 },
  { name: "Mar", AWS: 14100, Azure: 9200, GCP: 3800, Budget: 26000 },
  { name: "Apr", AWS: 13800, Azure: 8800, GCP: 3500, Budget: 26000 },
  { name: "May", AWS: 14200, Azure: 9500, GCP: 4000, Budget: 26000 },
  { name: "Jun", AWS: 14500, Azure: 9800, GCP: 4200, Budget: 26000 },
];

const pieData = [
  { name: "AWS", value: 48 },
  { name: "Azure", value: 32 },
  { name: "GCP", value: 14 },
  { name: "SaaS", value: 7 },
];

const COLORS = {
  AWS: "#F59E0B", // Amber
  Azure: "#14B8A6", // Teal
  GCP: "#3B82F6", // Blue
  SaaS: "#10B981", // Green
};

const unpaidInvoices = [
  { id: "INV-003", client: "DataFlow Ltd", amount: 18900, date: "2025-01-13", status: "pending", daysOverdue: 0 },
  { id: "INV-005", client: "Digital Dynamics", amount: 5800, date: "2025-01-11", status: "overdue", daysOverdue: 2 },
  { id: "INV-007", client: "TechCorp Inc", amount: 25600, date: "2025-01-08", status: "overdue", daysOverdue: 5 },
  { id: "INV-009", client: "CloudNet Solutions", amount: 12300, date: "2025-01-05", status: "overdue", daysOverdue: 8 },
  { id: "INV-011", client: "Startup Labs", amount: 8900, date: "2025-01-02", status: "overdue", daysOverdue: 11 },
];

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("thisyear");

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // Handle date range logic here
  };

  const handleSendReminder = (invoice: typeof unpaidInvoices[0]) => {
    toast.success(`Payment reminder sent to ${invoice.client} for ${invoice.id}`);
  };

  const handleSendAllReminders = () => {
    const overdueCount = unpaidInvoices.filter(inv => inv.status === "overdue").length;
    toast.success(`Payment reminders sent to ${overdueCount} clients`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of your cloud and SaaS management</p>
        </div>
        <Select value={dateRange} onValueChange={handleDateRangeChange}>
          <SelectTrigger className="w-[180px] h-9">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="lastweek">Last Week</SelectItem>
            <SelectItem value="lastmonth">Last Month</SelectItem>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="thisyear">This Year</SelectItem>
            <SelectItem value="custom">Custom Range...</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$147,280"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Cloud Spending"
          value="$89,420"
          change="+8.2% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Active Clients"
          value="284"
          change="+23 new this month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Subscriptions"
          value="1,429"
          change="+156 this month"
          changeType="positive"
          icon={Package}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Spend Over Time Line Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-medium">Spend Over Time</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Last 6 months by cloud provider</p>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[90px] h-8">
                <SelectValue placeholder="All..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All...</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="gcp">GCP</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    fontSize: "12px"
                  }} 
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconType="line"
                />
                <Line 
                  type="monotone" 
                  dataKey="Budget" 
                  stroke="#9CA3AF" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#9CA3AF" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="AWS" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#F59E0B" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Azure" 
                  stroke="#14B8A6" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#14B8A6" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="GCP" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spend by Provider Pie Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Spend by Provider</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Current month breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
                    />
                    <span className="text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-medium">Unpaid Invoices</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {unpaidInvoices.length} unpaid invoices • ${unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()} total outstanding
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSendAllReminders}
            className="shadow-sm"
          >
            <Send className="h-4 w-4 mr-2" />
            Send All Reminders
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Days Overdue</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unpaidInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium text-sm">{invoice.id}</TableCell>
                  <TableCell className="text-sm">{invoice.client}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={
                        invoice.status === "pending" 
                          ? "bg-warning/10 text-warning hover:bg-warning/20" 
                          : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {invoice.daysOverdue > 0 ? (
                      <Badge variant="destructive" className="bg-red-100 text-red-700">
                        {invoice.daysOverdue} days
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendReminder(invoice)}
                      className="hover:shadow-sm"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
