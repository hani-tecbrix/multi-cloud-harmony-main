import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/mw_logo_v.svg";
import { Home } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "user@mindverse.com" && password === "user123") {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Try user@mindverse.com / user123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src={logo} alt="CloudWatch" className="h-24" />
          </div>
          {/* <CardTitle className="text-2xl">Welcome Back!</CardTitle> */}
          <CardDescription>
            Sign in to manage your cloud and SaaS subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@mindverse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Sign In
            </Button>
            <div className="flex items-center justify-center mt-4">
              <a
                href="/landing.html"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors no-underline"
              >
                <Home className="h-4 w-4" />
                Home
              </a>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Demo credentials: user@mindverse.com / user123
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
