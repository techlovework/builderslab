import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Zap, Rocket } from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="modern-card p-12 lg:p-16 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Want a Customized Template?
            <br />
            <span className="gradient-text">Build it with AI.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Describe your ideal website, and our AI will generate a stunning,
            fully-functional design in minutes. No coding required.
          </p>
          <Link to={createPageUrl("AIBuilder")}>
            <Button size="lg" className="btn-primary text-white px-8 py-4 rounded-xl font-medium shadow-lg">
              <Rocket className="w-5 h-5 mr-2" />
              Try AI Builder Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}