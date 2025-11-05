import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Package, Calendar, Mail, Send, Clock } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";

// Import vendor icons for chart legends
import awsIcon from "@/assets/vendors-icons/aws.png";
import azureIcon from "@/assets/vendors-icons/azure.png";
import googleCloudIcon from "@/assets/vendors-icons/google-cloud.png";
import oracleIcon from "@/assets/vendors-icons/oracle.png";

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
  Azure: "#06b6d4", // Cyan-500
  GCP: "#3B82F6", // Blue
  SaaS: "#10B981", // Green
};

// Icon mapping for cloud providers
const PROVIDER_ICONS: { [key: string]: string } = {
  AWS: awsIcon,
  Azure: azureIcon,
  GCP: googleCloudIcon,
  Oracle: oracleIcon,
};

// Custom Legend Component with Icons
const CustomLegend = ({ payload }: { payload?: Array<{ value: string; color: string }> }) => {
  if (!payload) return null;
  
  return (
    <div className="flex items-center justify-center gap-4 pt-3 flex-wrap">
      {payload.map((entry, index) => {
        const iconSrc = PROVIDER_ICONS[entry.value];
        return (
          <div key={index} className="flex items-center gap-2">
            {iconSrc ? (
              <img 
                src={iconSrc} 
                alt={entry.value} 
                className="w-4 h-4 object-contain"
              />
            ) : (
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
            )}
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        );
      })}
    </div>
  );
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
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof unpaidInvoices[0] | null>(null);
  const [isSendingAll, setIsSendingAll] = useState(false);
  const [reminderType, setReminderType] = useState<"now" | "schedule">("now");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // Handle date range logic here
  };

  const handleSendReminder = (invoice: typeof unpaidInvoices[0]) => {
    setSelectedInvoice(invoice);
    setIsSendingAll(false);
    setReminderType("now");
    setScheduledDate("");
    setScheduledTime("");
    setReminderDialogOpen(true);
  };

  const handleSendAllReminders = () => {
    setSelectedInvoice(null);
    setIsSendingAll(true);
    setReminderType("now");
    setScheduledDate("");
    setScheduledTime("");
    setReminderDialogOpen(true);
  };

  const handleConfirmReminder = () => {
    if (reminderType === "schedule") {
      if (!scheduledDate || !scheduledTime) {
        toast.error("Please select both date and time for scheduling");
        return;
      }
      
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const now = new Date();
      
      if (scheduledDateTime <= now) {
        toast.error("Scheduled time must be in the future");
        return;
      }

      if (isSendingAll) {
        const overdueCount = unpaidInvoices.filter(inv => inv.status === "overdue").length;
        toast.success(`Payment reminders scheduled for ${overdueCount} clients on ${scheduledDate} at ${scheduledTime}`);
      } else {
        toast.success(`Payment reminder scheduled for ${selectedInvoice?.client} (${selectedInvoice?.id}) on ${scheduledDate} at ${scheduledTime}`);
      }
    } else {
      if (isSendingAll) {
        const overdueCount = unpaidInvoices.filter(inv => inv.status === "overdue").length;
        toast.success(`Payment reminders sent to ${overdueCount} clients`);
      } else {
        toast.success(`Payment reminder sent to ${selectedInvoice?.client} for ${selectedInvoice?.id}`);
      }
    }
    
    setReminderDialogOpen(false);
    setSelectedInvoice(null);
    setIsSendingAll(false);
    setReminderType("now");
    setScheduledDate("");
    setScheduledTime("");
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
          borderColor="#10B981"
        />
        <MetricCard
          title="Cloud Spending"
          value="$89,420"
          change="+8.2% from last month"
          changeType="positive"
          icon={TrendingUp}
          borderColor="#3B82F6"
        />
        <MetricCard
          title="Active Clients"
          value="284"
          change="+23 new this month"
          changeType="positive"
          icon={Users}
          borderColor="#8B5CF6"
        />
        <MetricCard
          title="Subscriptions"
          value="1,429"
          change="+156 this month"
          changeType="positive"
          icon={Package}
          borderColor="#F59E0B"
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
                  content={<CustomLegend />}
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
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#06b6d4" }}
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
              {pieData.map((entry, index) => {
                const iconSrc = PROVIDER_ICONS[entry.name];
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {iconSrc ? (
                        <img 
                          src={iconSrc} 
                          alt={entry.name} 
                          className="w-4 h-4 object-contain"
                        />
                      ) : (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
                        />
                      )}
                      <span className="text-muted-foreground">{entry.name}</span>
                    </div>
                    <span className="font-medium">{entry.value}%</span>
                  </div>
                );
              })}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reminder Dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              {isSendingAll ? "Send Reminders to All Clients" : "Send Payment Reminder"}
            </DialogTitle>
            <DialogDescription>
              {isSendingAll 
                ? "Choose to send payment reminders now or schedule them for later"
                : `Choose to send payment reminder to ${selectedInvoice?.client} (${selectedInvoice?.id}) now or schedule it for later`
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <RadioGroup value={reminderType} onValueChange={(value) => setReminderType(value as "now" | "schedule")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="now" id="now" />
                <Label htmlFor="now" className="flex items-center gap-2 cursor-pointer">
                  <Send className="h-4 w-4 text-primary" />
                  <span className="font-medium">Send Now</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="flex items-center gap-2 cursor-pointer">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Schedule</span>
                </Label>
              </div>
            </RadioGroup>

            {reminderType === "schedule" && (
              <div className="space-y-4 pl-7 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="reminder-date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="reminder-date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminder-time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time
                  </Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                {scheduledDate && scheduledTime && (
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Reminder will be sent on{" "}
                      <span className="font-medium text-foreground">
                        {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmReminder} className="bg-primary hover:bg-primary/90">
              {reminderType === "now" ? (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send {isSendingAll ? "All Reminders" : "Reminder"}
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Reminder
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
