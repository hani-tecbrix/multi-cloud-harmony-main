import { useState, useMemo } from "react";

// Mock data for search
const allClients = [
  { id: 1, name: "Acme Corporation", industry: "Technology" },
  { id: 2, name: "TechStart Inc", industry: "Startup" },
  { id: 3, name: "DataFlow Ltd", industry: "Finance" },
  { id: 4, name: "CloudNet Solutions", industry: "Healthcare" },
  { id: 5, name: "Digital Dynamics", industry: "Retail" },
];

const allInvoices = [
  { id: "INV-001", client: "Acme Corp", amount: 45280 },
  { id: "INV-002", client: "TechStart Inc", amount: 28500 },
  { id: "INV-003", client: "DataFlow Ltd", amount: 62100 },
  { id: "INV-004", client: "CloudNet", amount: 38900 },
  { id: "INV-005", client: "Digital Dynamics", amount: 19800 },
  { id: "INV-006", client: "Modern Inc", amount: 52300 },
  { id: "INV-007", client: "Enterprise Corp", amount: 74100 },
  { id: "INV-008", client: "Startup Labs", amount: 12500 },
];

const allProviders = [
  { id: 1, name: "Amazon AWS", type: "Cloud" },
  { id: 2, name: "Microsoft Azure", type: "Cloud" },
  { id: 3, name: "Google Cloud", type: "Cloud" },
  { id: 4, name: "Salesforce", type: "SaaS" },
  { id: 5, name: "Microsoft 365", type: "SaaS" },
  { id: 6, name: "Slack", type: "SaaS" },
];

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const results = useMemo(() => {
    if (!searchQuery) {
      return { clients: [], invoices: [], providers: [] };
    }

    const query = searchQuery.toLowerCase();

    const clients = allClients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.industry.toLowerCase().includes(query)
    );

    const invoices = allInvoices.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(query) ||
        invoice.client.toLowerCase().includes(query)
    );

    const providers = allProviders.filter(
      (provider) =>
        provider.name.toLowerCase().includes(query) ||
        provider.type.toLowerCase().includes(query)
    );

    return { clients, invoices, providers };
  }, [searchQuery]);

  return { results, searchQuery, setSearchQuery };
};

