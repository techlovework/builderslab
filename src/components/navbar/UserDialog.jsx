import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Settings, ShoppingBag, LogOut, Download, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function UserDialog({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadUser();
    }
  }, [isOpen]);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
      // User not logged in
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserIcon className="w-5 h-5 mr-2" />
            Account
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800 mx-auto"></div>
            </div>
          ) : user ? (
            <>
              {/* User Profile */}
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-slate-200 text-slate-700 text-lg font-semibold">
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{user.full_name || 'User'}</h3>
                  <p className="text-sm text-slate-600">{user.email}</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {user.role || 'user'}
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-blue-800">Templates Owned</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$0</div>
                  <div className="text-sm text-green-800">Total Spent</div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <Link to={createPageUrl("Dashboard")} onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    My Templates
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-3" />
                  Downloads
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Not logged in */}
              <div className="text-center py-8">
                <UserIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Sign in to your account</h3>
                <p className="text-slate-600 mb-6">Access your purchased templates and manage your account</p>
                <Button onClick={handleLogin} className="w-full bg-slate-800 hover:bg-slate-700">
                  Sign In with Google
                </Button>
              </div>

              {/* Benefits */}
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-semibold text-slate-800 flex items-center">
                  <Crown className="w-4 h-4 mr-2 text-amber-500" />
                  Member Benefits
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Download purchased templates anytime
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Lifetime updates on all templates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Priority customer support
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}