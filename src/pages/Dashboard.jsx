import React, { useState, useEffect } from "react";
import { User, Purchase } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ShoppingBag, Calendar, LogIn } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
      
      const userPurchases = await Purchase.filter({ user_email: userData.email }, '-created_date');
      setPurchases(userPurchases);
    } catch (error) {
      console.error('Error loading user data:', error);
      // This is expected if the user is not logged in.
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await User.login();
      // The login function will handle redirection, and upon return,
      // the useEffect should re-run and fetch user data.
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <Card className="shadow-2xl border-0 rounded-3xl p-4 sm:p-8">
            <CardHeader>
              <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
              <CardTitle className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                Access Your Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                Please sign in to view your purchased templates, manage downloads, and access your account details.
              </p>
              <Button onClick={handleLogin} size="lg" className="w-full bg-slate-800 hover:bg-slate-700">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Continue
              </Button>
              <div className="text-sm">
                <Link to={createPageUrl("Home")} className="font-medium text-amber-600 hover:text-amber-500">
                  or return to homepage
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Welcome back, {user?.full_name || 'User'}!
          </h1>
          <p className="text-xl text-slate-600">
            Manage your purchased templates and downloads
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90">Total Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{purchases.length}</div>
              <div className="text-blue-100 text-sm">Templates owned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${purchases.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(2)}
              </div>
              <div className="text-green-100 text-sm">All time spending</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90">Last Purchase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {purchases.length > 0 ? format(new Date(purchases[0].created_date), 'MMM d') : '-'}
              </div>
              <div className="text-purple-100 text-sm">Most recent</div>
            </CardContent>
          </Card>
        </div>

        {/* Purchases List */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Your Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No purchases yet</h3>
                <p className="text-slate-500 mb-6">Start building your template collection today</p>
                <Link to={createPageUrl("Templates")}>
                  <Button>Browse Templates</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                          Template Purchase
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600">
                          <div>
                            <span className="font-medium">Amount:</span>
                            <div className="text-lg font-bold text-slate-800">${purchase.amount}</div>
                          </div>
                          <div>
                            <span className="font-medium">Payment:</span>
                            <div className="capitalize">{purchase.payment_method.replace('_', ' ')}</div>
                          </div>
                          <div>
                            <span className="font-medium">Date:</span>
                            <div>{format(new Date(purchase.created_date), 'MMM d, yyyy')}</div>
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            <Badge 
                              className={
                                purchase.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : purchase.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }
                            >
                              {purchase.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        {purchase.status === 'completed' && (
                          <Button size="sm" className="bg-slate-800 hover:bg-slate-700">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}