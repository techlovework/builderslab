

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, ShoppingBag, User, Search, CheckCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart } from "../components/context/CartContext";
import SearchDialog from "../components/navbar/SearchDialog";
import CartDialog from "../components/navbar/CartDialog";
import UserDialog from "../components/navbar/UserDialog";

const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

function Notification() {
  const { showNotification, notificationMessage } = useCart();

  return (
    <div 
      className={`fixed top-24 right-6 z-[100] transition-all duration-500 ${
        showNotification ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'
      }`}
    >
      {showNotification && (
        <div className="bg-white border border-green-200 shadow-2xl rounded-2xl p-4 flex items-center space-x-3 backdrop-blur-xl">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-800">{notificationMessage}</span>
        </div>
      )}
    </div>
  );
}

function LayoutContent({ children }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');

        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        :root {
          --primary: #252711ff;
          --primary-light: #374151;
          --secondary: #6366f1;
          --secondary-light: #818cf8;
          --accent: #059669;
          --accent-light: #10b981;
          --surface: #f9fafb;
          --surface-elevated: #ffffff;
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --border: #e5e7eb;
          --border-light: #f3f4f6;
        }
        
        .glass-navbar {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.3s ease-in-out;
        }

        .glass-navbar-scrolled {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(71, 85, 105, 0.4);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modern-shadow {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .modern-shadow-lg {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modern-shadow-xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .hover-lift {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #5856eb, #7c3aed);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }

        .modern-card {
          background: #ffffff;
          border: 1px solid #f3f4f6;
          border-radius: 16px;
          transition: all 0.2s ease;
        }

        .modern-card:hover {
          border-color: #e5e7eb;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .limelight-regular {
          font-family: "Limelight", sans-serif;
          font-weight: 400;
          font-style: normal;
        }

      `}</style>
      
      <Notification />

      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'glass-navbar-scrolled' : 'glass-navbar'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
            
              <span className="text-xl font-bold text-white limelight-regular"> {"<BuildersLab/>"} </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to={createPageUrl("Templates")} 
                className={`nav-link text-sm font-medium text-slate-300 hover:text-white px-3 py-2 ${
                  location.pathname === createPageUrl("Templates") ? 'active text-white' : ''
                }`}
              >
                Templates
              </Link>
              <Link 
                to={createPageUrl("AIBuilder")} 
                className={`nav-link text-sm font-medium text-slate-300 hover:text-white px-3 py-2 ${
                  location.pathname === createPageUrl("AIBuilder") ? 'active text-white' : ''
                }`}
              >
                AI Builder
              </Link>
              <Link 
                to={createPageUrl("Team")} 
                className={`nav-link text-sm font-medium text-slate-300 hover:text-white px-3 py-2 ${
                  location.pathname === createPageUrl("Team") ? 'active text-white' : ''
                }`}
              >
                Team
              </Link>
              <Link 
                to={createPageUrl("contact")} 
                className={`nav-link text-sm font-medium text-slate-300 hover:text-white px-3 py-2 ${
                  location.pathname === createPageUrl("contact") ? 'active text-white' : ''
                }`}
              >
                Contact
              </Link>
              <Link 
                to={createPageUrl("Dashboard")} 
                className={`nav-link text-sm font-medium text-slate-300 hover:text-white px-3 py-2 ${
                  location.pathname === createPageUrl("Dashboard") ? 'active text-white' : ''
                }`}
              >
                My Templates
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              {/* Desktop Action Buttons */}
              <div className="hidden sm:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-xs font-medium text-white">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
                  onClick={() => setUserOpen(true)}
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex sm:hidden items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-xs font-medium text-white">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
                  onClick={() => setUserOpen(true)}
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-1 border-t border-slate-600">
              <Link 
                to={createPageUrl("Templates")} 
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === createPageUrl("Templates") 
                    ? 'text-white bg-slate-700' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                Templates
              </Link>
              <Link 
                to={createPageUrl("AIBuilder")} 
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === createPageUrl("AIBuilder") 
                    ? 'text-white bg-slate-700' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                AI Builder
              </Link>
              <Link 
                to={createPageUrl("Team")} 
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === createPageUrl("Team") 
                    ? 'text-white bg-slate-700' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                Team
              </Link>
              <Link 
                to={createPageUrl("contact")} 
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === createPageUrl("contact") 
                    ? 'text-white bg-slate-700' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                Contact
              </Link>
              <Link 
                to={createPageUrl("Dashboard")} 
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === createPageUrl("Dashboard") 
                    ? 'text-white bg-slate-700' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                My Templates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-xl font-bold text-white limelight-regular">{"<BuildersLab/>"}</span>
              </div>
              <p className="text-slate-400 text-base leading-relaxed max-w-md">
                Premium website templates crafted by world-class designers. 
                Transform your vision into reality with our collection of stunning, 
                modern templates.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link to={createPageUrl("Templates")} className="hover:text-white transition-colors duration-200 text-sm">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("AIBuilder")} className="hover:text-white transition-colors duration-200 text-sm">
                    AI Builder
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Team")} className="hover:text-white transition-colors duration-200 text-sm">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("contact")} className="hover:text-white transition-colors duration-200 text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-400">
                  <i className="fas fa-envelope text-lg"></i>
                  <span className="text-sm">info@builderslab.net</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <i className="fas fa-phone text-lg"></i>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex space-x-4 pt-2">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 640 640" fill="currentColor">
                      <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2025 BuildersLab. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/1234567890?text=Hello!%20I'm%20interested%20in%20your%20templates."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform group-hover:scale-105">
          <WhatsAppIcon className="w-7 h-7 text-white" /> 
        </div>
      </a>

      {/* Dialogs */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDialog isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <UserDialog isOpen={userOpen} onClose={() => setUserOpen(false)} />
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <CartProvider>
      <LayoutContent currentPageName={currentPageName}>
        {children}
      </LayoutContent>
    </CartProvider>
  );
}

