import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground mt-1">Find answers and get support</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10 inline-block">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold">Email Support</h3>
            <p className="text-sm text-muted-foreground">support@cloudwatch.com</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-4">
            <div className="p-4 rounded-full bg-secondary/10 inline-block">
              <Phone className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold">Phone Support</h3>
            <p className="text-sm text-muted-foreground">1-800-CLOUD-00</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center space-y-4">
            <div className="p-4 rounded-full bg-accent/10 inline-block">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Available 24/7</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I add a new client?</AccordionTrigger>
              <AccordionContent>
                Navigate to the Clients page and click the "Add Client" button. Fill in the required information including company name, industry, and contact details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How are consumption-based subscriptions billed?</AccordionTrigger>
              <AccordionContent>
                Consumption-based subscriptions are billed based on actual usage. The system tracks usage metrics and generates invoices at the end of each billing cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I export reports?</AccordionTrigger>
              <AccordionContent>
                Yes, you can export all reports in PDF or Excel format. Navigate to the Reports page and click the "Export" button for any report.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I track spending across multiple clouds?</AccordionTrigger>
              <AccordionContent>
                The dashboard provides a unified view of spending across AWS, Azure, and GCP. You can also generate detailed reports for individual cloud providers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
