import { Bell, Search, User, AlertCircle, CheckCircle2, TrendingUp, CreditCard, Phone, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/mw_logo_h.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Building2, FileText, Package } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Badge } from "@/components/ui/badge";
import CartSidebar from "./CartSidebar";
import { RoleSwitcher } from "./RoleSwitcher";
import { useUserRole } from "@/contexts/UserRoleContext";

const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "Invoice Paid",
    message: "Acme Corp paid invoice INV-001 ($45,280)",
    time: "2 hours ago",
    icon: CheckCircle2,
    unread: true,
  },
  {
    id: 2,
    type: "warning",
    title: "Budget Alert",
    message: "AWS spending exceeded 90% of monthly budget",
    time: "5 hours ago",
    icon: AlertCircle,
    unread: true,
  },
  {
    id: 3,
    type: "info",
    title: "New Subscription",
    message: "TechStart Inc added 3 new SaaS subscriptions",
    time: "1 day ago",
    icon: TrendingUp,
    unread: false,
  },
  {
    id: 4,
    type: "warning",
    title: "Payment Reminder",
    message: "Invoice INV-003 is due in 3 days ($18,900)",
    time: "2 days ago",
    icon: CreditCard,
    unread: false,
  },
  {
    id: 5,
    type: "success",
    title: "Cost Optimization",
    message: "You saved 15% by optimizing GCP resources",
    time: "3 days ago",
    icon: CheckCircle2,
    unread: false,
  },
];

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps = {} as HeaderProps) => {
  const navigate = useNavigate();
  const { user, isPartner, isCustomer } = useUserRole();
  const [open, setOpen] = useState(false);
  const { results, searchQuery, setSearchQuery } = useSearch();
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  // Dubai format contact numbers
  const supportNumbers = [
    { label: "General Support", number: "+971 4 123 4567" },
    { label: "Technical Support", number: "+971 4 234 5678" },
    { label: "Billing Support", number: "+971 4 345 6789" },
  ];

  const handlePhoneClick = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  // Global keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleSelect = (path: string) => {
    navigate(path);
    setOpen(false);
    setSearchQuery(""); // Clear search when closing
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setSearchQuery(""); // Clear search when closing
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="flex h-14 items-center gap-2 sm:gap-4 px-2 sm:px-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-9 w-9 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <img src={logo} alt="MindVerse" className="h-8" />
          </div>

          <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search... (⌘K)"
                className="pl-9 h-9 bg-background cursor-text text-sm sm:text-base"
                onClick={() => setOpen(true)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <RoleSwitcher />
            
            {/* Portal Support Dropdown - Only for Partner and Customer */}
            {(isPartner || isCustomer) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 h-9 px-2 sm:px-3">
                    <Phone className="h-4 w-4" />
                    <span className="hidden md:inline">Portal Support</span>
                    <ChevronDown className="h-3 w-3 opacity-50 hidden sm:inline" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Contact Support</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {supportNumbers.map((support, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                      onClick={() => handlePhoneClick(support.number)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Phone className="h-4 w-4 hover:text-primary" />
                        <span className="text-sm font-medium">{support.label}</span>
                      </div>
                      <a 
                        href={`tel:${support.number.replace(/\s/g, "")}`}
                        className="text-sm hover:text-primary hover:underline font-mono"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {support.number}
                      </a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-xs text-muted-foreground justify-center">
                    Available 24/7
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-destructive" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)]">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 px-2">
                      {unreadCount}
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  {mockNotifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex items-start gap-3 p-3 cursor-pointer"
                        onClick={() => {}}
                      >
                        <div className={`p-1.5 rounded ${notification.unread ? 'bg-primary/10' : 'bg-muted'}`}>
                          <Icon className={`h-4 w-4 ${notification.type === 'success' ? 'text-green-600' : notification.type === 'warning' ? 'text-orange-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${notification.unread ? '' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CartSidebar />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover max-w-[calc(100vw-2rem)]">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/help")}>
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput 
          placeholder="Search clients, invoices, providers..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {results.clients.length > 0 && (
            <CommandGroup heading="Clients">
              {results.clients.map((client) => (
                <CommandItem
                  key={client.id}
                  onSelect={() => handleSelect(`/clients`)}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  <span>{client.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.invoices.length > 0 && (
            <CommandGroup heading="Invoices">
              {results.invoices.map((invoice) => (
                <CommandItem
                  key={invoice.id}
                  onSelect={() => handleSelect(`/invoices`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{invoice.id} - {invoice.client}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results.providers.length > 0 && (
            <CommandGroup heading="Providers">
              {results.providers.map((provider) => (
                <CommandItem
                  key={provider.id}
                  onSelect={() => handleSelect(`/marketplace`)}
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span>{provider.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
