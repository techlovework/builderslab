
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden h-[80vh] min-h-[600px] flex items-center justify-center text-white">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://techimages.vercel.app/world-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900/60 z-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-slate-100 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Premium ReactJS Templates</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Beautiful Templates
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your vision into reality with our collection of premium, 
            professionally crafted website templates. From e-commerce to portfolios, 
            we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to={createPageUrl("Templates")}>
              <Button size="lg" className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Browse Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("AIBuilder")}>
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-black hover:bg-white/10 px-8 py-4 rounded-xl font-medium transition-all duration-200">
                <Zap className="w-5 h-5 mr-2" />
                Try AI Builder
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-300">
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>500+ Templates</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Lifetime Updates</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
