import { useState } from "react";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Users as UsersIcon, UserPlus, Search, Shield, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock users data
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    title: "System Administrator",
    email: "john.doe@example.com",
    role: "Tenant Admin",
    accessList: ["Dashboard", "Users", "Settings"]
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    name: "Jane Smith",
    title: "IT Manager",
    email: "jane.smith@example.com",
    role: "Tenant Admin",
    accessList: ["Dashboard", "Reports", "Users"]
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    name: "Michael Johnson",
    title: "Developer",
    email: "michael.j@example.com",
    role: "User",
    accessList: ["Dashboard"]
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    name: "Sarah Williams",
    title: "Operations Manager",
    email: "sarah.w@example.com",
    role: "Tenant Admin",
    accessList: ["Dashboard", "Reports", "Users", "Settings"]
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    name: "David Brown",
    title: "Support Specialist",
    email: "david.brown@example.com",
    role: "User",
    accessList: ["Dashboard", "Help"]
  }
];

// Available access options
const accessOptions = [
  "Dashboard",
  "Users",
  "Marketplace",
  "Reports",
  "Orders",
  "Settings",
  "Help & Support"
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    role: "",
    accessList: [] as string[]
  });

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.role) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (newUser.accessList.length === 0) {
      toast.error("Please select at least one access permission");
      return;
    }

    toast.success(`User ${newUser.firstName} ${newUser.lastName} added successfully!`);
    setIsAddSheetOpen(false);
    setNewUser({
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      role: "",
      accessList: []
    });
  };

  const handleAccessToggle = (access: string) => {
    setNewUser(prev => ({
      ...prev,
      accessList: prev.accessList.includes(access)
        ? prev.accessList.filter(a => a !== access)
        : [...prev.accessList, access]
    }));
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === "Tenant Admin") {
      return "bg-purple-500/10 text-purple-700 border-purple-500/20";
    }
    return "bg-blue-500/10 text-blue-700 border-blue-500/20";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user accounts and access permissions
          </p>
        </div>
        <Button 
          variant="gradient" 
          size="sm"
          onClick={() => setIsAddSheetOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <SectionCard
        title={`Users (${filteredUsers.length})`}
        icon={UsersIcon}
        badge={
          <Badge variant="secondary">{filteredUsers.length} {filteredUsers.length !== 1 ? 'users' : 'user'}</Badge>
        }
      >
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, title, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-muted">
                          <UsersIcon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-sm">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{user.title}</TableCell>
                    <TableCell className="text-sm">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toast.info("View user details")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toast.info("Edit user")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => toast.info("Delete user")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      {/* Add New User Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b">
            <SheetTitle className="text-xl">Add New User</SheetTitle>
            <SheetDescription className="text-sm mt-1">
              Create a new user account with access permissions
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="flex-1">
            <div className="px-6 py-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    Personal Information
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="System Administrator"
                        value={newUser.title}
                        onChange={(e) => setNewUser({...newUser, title: e.target.value})}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Role & Access
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">
                      Role <span className="text-destructive">*</span>
                    </Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tenant Admin">Tenant Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Access List */}
                  <div className="space-y-2">
                    <Label>
                      Access List <span className="text-destructive">*</span>
                    </Label>
                    <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                      {accessOptions.map((access) => (
                        <div key={access} className="flex items-center space-x-2">
                          <Checkbox
                            id={access}
                            checked={newUser.accessList.includes(access)}
                            onCheckedChange={() => handleAccessToggle(access)}
                          />
                          <Label
                            htmlFor={access}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {access}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {newUser.accessList.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {newUser.accessList.length} permission{newUser.accessList.length !== 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="px-6 py-4 border-t bg-muted/30">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddSheetOpen(false);
                setNewUser({
                  firstName: "",
                  lastName: "",
                  title: "",
                  email: "",
                  role: "",
                  accessList: []
                });
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddUser}
              className="flex-1"
              disabled={
                !newUser.firstName ||
                !newUser.lastName ||
                !newUser.email ||
                !newUser.role ||
                newUser.accessList.length === 0
              }
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Users;

