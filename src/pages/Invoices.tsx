import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Plus, FileDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { downloadInvoicePDF } from "@/lib/downloadUtils";
import { toast } from "sonner";

const invoicesData = [
  { id: "INV-001", client: "Acme Corp", amount: 45280, date: "2024-01-15", status: "paid", dueDate: "2024-02-15" },
  { id: "INV-002", client: "TechStart Inc", amount: 28500, date: "2024-01-18", status: "pending", dueDate: "2024-02-18" },
  { id: "INV-003", client: "DataFlow Ltd", amount: 62100, date: "2024-01-20", status: "paid", dueDate: "2024-02-20" },
  { id: "INV-004", client: "CloudNet", amount: 38900, date: "2024-01-22", status: "overdue", dueDate: "2024-02-22" },
  { id: "INV-005", client: "Digital Dynamics", amount: 19800, date: "2024-01-25", status: "pending", dueDate: "2024-02-25" },
  { id: "INV-006", client: "Modern Inc", amount: 52300, date: "2024-01-28", status: "paid", dueDate: "2024-02-28" },
  { id: "INV-007", client: "Enterprise Corp", amount: 74100, date: "2024-02-01", status: "paid", dueDate: "2024-03-01" },
  { id: "INV-008", client: "Startup Labs", amount: 12500, date: "2024-02-03", status: "pending", dueDate: "2024-03-03" },
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoicesData.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track all client invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => {
              filteredInvoices.forEach(invoice => {
                setTimeout(() => {
                  downloadInvoicePDF(invoice);
                }, filteredInvoices.indexOf(invoice) * 200);
              });
              toast.success(`Downloading ${filteredInvoices.length} invoice(s)...`);
            }}
            className="gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download All
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-3xl font-bold">$67,300</p>
              <Badge variant="secondary" className="bg-warning/10 text-warning">2 Pending</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Paid This Month</p>
              <p className="text-3xl font-bold">$232,380</p>
              <Badge variant="secondary" className="bg-success/10 text-success">4 Invoices</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-3xl font-bold">$38,900</p>
              <Badge variant="secondary" className="bg-destructive/10 text-destructive">1 Invoice</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium text-sm">{invoice.id}</TableCell>
                  <TableCell className="text-sm">{invoice.client}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{invoice.dueDate}</TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className={
                      invoice.status === "paid" ? "bg-success/10 text-success" :
                      invoice.status === "pending" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="View Invoice">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => {
                          downloadInvoicePDF(invoice);
                          toast.success(`Invoice ${invoice.id} downloaded successfully`);
                        }}
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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

export default Invoices;
