import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/mw_logo_h.svg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Navigation Header - Same as Landing Page */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] transition-all duration-300">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Multi-Cloud Harmony" 
              className="h-10 transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <span className="hidden font-bold text-xl text-primary">Multi-Cloud Harmony</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="/#features" 
              className="nav-link relative text-[#262626] no-underline font-medium text-[0.95rem] transition-colors duration-200 hover:text-primary"
            >
              Features
            </a>
            <a 
              href="/#providers" 
              className="nav-link relative text-[#262626] no-underline font-medium text-[0.95rem] transition-colors duration-200 hover:text-primary"
            >
              Providers
            </a>
            <a 
              href="/#benefits" 
              className="nav-link relative text-[#262626] no-underline font-medium text-[0.95rem] transition-colors duration-200 hover:text-primary"
            >
              Benefits
            </a>
            <Button
              onClick={handleSignIn}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold text-[0.95rem] bg-gradient-to-r from-primary to-secondary shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:from-[#1e2d73] hover:to-[#2e9bb3]"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {children}
        </div>
      </main>

      {/* Footer - Same as Landing Page */}
      <footer className="bg-[#262626] text-white py-16 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-base font-semibold mb-4">Product</h3>
              <ul className="list-none">
                <li className="mb-3">
                  <a href="/#features" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Features
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/#benefits" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Benefits
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/#providers" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Providers
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-semibold mb-4">Resources</h3>
              <ul className="list-none">
                <li className="mb-3">
                  <Link to="/help" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/help" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    API Reference
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-semibold mb-4">Company</h3>
              <ul className="list-none">
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    About Us
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Contact
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Careers
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-semibold mb-4">Support</h3>
              <ul className="list-none">
                <li className="mb-3">
                  <a href="tel:+97141234567" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    +971 4 123 4567
                  </a>
                </li>
                <li className="mb-3">
                  <a href="mailto:support@mindverse.com" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    support@mindverse.com
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="text-white/70 no-underline transition-colors duration-200 hover:text-white">
                    24/7 Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/10 text-white/60">
            <p>&copy; 2025 Mind Verse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

