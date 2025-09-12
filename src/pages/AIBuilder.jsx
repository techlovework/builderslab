import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Rocket, Star, ArrowRight, Check, Clock, X } from "lucide-react";

export default function AIBuilder() {
  const [prompt, setPrompt] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showWorkingMessage, setShowWorkingMessage] = useState(false);

  const features = [
    "Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI",
    "Mobile First", "Dark Mode", "Animation", "Contact Forms"
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      features: ["1 AI-generated website", "Basic customization", "Standard templates", "Email support"],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      features: ["5 AI-generated websites", "Advanced customization", "Premium templates", "Priority support", "Source code included"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      features: ["Unlimited websites", "Full customization", "All templates", "24/7 support", "White-label option", "API access"],
      popular: false
    }
  ];

  const handleGenerateWebsite = () => {
    setShowWorkingMessage(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-medium">
              🚀 AI Builder is coming soon! Try the demo below - launching Q2 2025
            </span>
          </div>
        </div>
      </div>

      {/* Working Message Modal */}
      {showWorkingMessage && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center border border-slate-700">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">We're Working On It!</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Thanks for testing our AI Builder! We're currently developing this amazing feature. 
              It will be ready soon with all the functionality you see here.
            </p>
            <div className="flex flex-col gap-3">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
                Expected Launch: Q2 2025
              </Badge>
              <Button 
                onClick={() => setShowWorkingMessage(false)}
                className="bg-slate-700 hover:bg-slate-600"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200 font-medium">AI-Powered Website Generation</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Build Websites with
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI Magic</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Describe your vision and watch our AI create a stunning, fully functional website in minutes. 
            No coding required, infinite possibilities.
          </p>

          {/* AI Builder Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-2 text-purple-400" />
                  Try AI Builder Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Describe your website
                  </label>
                  <Textarea
                    placeholder="I need a modern e-commerce website for selling handmade jewelry with a clean design, shopping cart, and payment integration..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400 min-h-24"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Select features you want
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <Badge
                        key={feature}
                        variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          selectedFeatures.includes(feature)
                            ? "bg-purple-500 hover:bg-purple-600"
                            : "border-white/30 text-slate-300 hover:bg-white/10"
                        }`}
                        onClick={() => {
                          setSelectedFeatures(prev =>
                            prev.includes(feature)
                              ? prev.filter(f => f !== feature)
                              : [...prev, feature]
                          );
                        }}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4"
                  onClick={handleGenerateWebsite}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Generate My Website
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-slate-400">Websites Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">2min</div>
              <div className="text-slate-400">Average Build Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">99%</div>
              <div className="text-slate-400">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-slate-400">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your AI Plan</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From startups to enterprises, we have the perfect AI solution for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative bg-white/10 backdrop-blur-xl border-white/20 ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-purple-400 mb-2">{plan.price}</div>
                  <div className="text-slate-400">per website</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                        : 'bg-white/10 hover:bg-white/20 border-white/20'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={handleGenerateWebsite}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How AI Builder Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From idea to live website in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Your Vision",
                description: "Tell our AI what kind of website you need. Be as detailed as you want - our AI understands natural language.",
                icon: Sparkles
              },
              {
                step: "02", 
                title: "AI Generates Design",
                description: "Our advanced AI analyzes your requirements and creates a unique, professional website tailored to your needs.",
                icon: Zap
              },
              {
                step: "03",
                title: "Launch & Customize",
                description: "Review your AI-generated website, make any final tweaks, and launch it to the world in minutes.",
                icon: Rocket
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-purple-400 font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}