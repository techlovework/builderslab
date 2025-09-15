import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut, ShoppingBag } from "lucide-react";
import { User } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const GoogleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

export default function UserDialog({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadUserData();
    }
  }, [isOpen]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await User.login();
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserIcon className="w-5 h-5 mr-2" />
            Account
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-800 mx-auto"></div>
            </div>
          ) : user ? (
            <>
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserIcon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-800">{user.full_name}</h3>
                <p className="text-sm text-slate-500">{user.email}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link to={createPageUrl("Dashboard")}>
                  <Button variant="outline" className="w-full justify-start" onClick={onClose}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    My Templates
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="py-4">
              <div className="text-center">
                <UserIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <h3 className="font-semibold text-slate-800 mb-2">Join BuildersLab</h3>
                <p className="text-sm text-slate-500 mb-6">Sign in or create an account with Google to access your templates and manage purchases.</p>
              </div>
              <div className="space-y-3">
                <Button onClick={handleLogin} className="w-full bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm">
                  <GoogleIcon className="w-5 h-5 mr-3" />
                  Sign in with Google
                </Button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-4">
                We use Google for secure and easy login. We do not support email/password registration at this time.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}