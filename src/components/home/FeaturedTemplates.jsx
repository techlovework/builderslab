
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { templateData } from "../data/templates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Eye, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import TemplatePreviewDialog from "../templates/TemplatePreviewDialog";
import PayWhatYouWantDialog from "../templates/PayWhatYouWantDialog";

export default function FeaturedTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [payWhatYouWantOpen, setPayWhatYouWantOpen] = useState(false);
  const [payWhatYouWantTemplate, setPayWhatYouWantTemplate] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    loadFeaturedTemplates();
  }, []);

  const handleDownload = (template) => {
    if (template.is_free) {
      setPayWhatYouWantTemplate(template);
      setPayWhatYouWantOpen(true);
    } else if (template.download_url) {
      const link = document.createElement('a');
      link.href = template.download_url;
      link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn("Download URL not available for this template.");
    }
  };

  const handleActualDownload = (template) => {
    if (template.download_url) {
      const link = document.createElement('a');
      link.href = template.download_url;
      link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const loadFeaturedTemplates = async () => {
    try {
      const featuredTemplates = templateData
        .filter(template => template.is_featured)
        .slice(0, 8)
        .map((template, index) => {
          if (index < 4) {
            return {
              ...template,
              is_free: true,
              price: 0,
              download_url: `/downloads/template_${template.id}.zip`
            };
          }
          return template;
        });
      setTemplates(featuredTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewClick = (template) => {
    setSelectedTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handlePayWhatYouWantFromPreview = (template) => {
    setPreviewDialogOpen(false);
    setPayWhatYouWantTemplate(template);
    setPayWhatYouWantOpen(true);
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-6 bg-gray-200 rounded-lg w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="modern-card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 text-sm font-medium text-amber-700 mb-6">
              <Star className="w-4 h-4" />
              <span>Featured Collection</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Handpicked Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most popular and highest-rated templates, carefully selected for quality, 
              design excellence, and cutting-edge functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="group modern-card hover-lift overflow-hidden">
                <div className="relative overflow-hidden cursor-pointer" onClick={() => handlePreviewClick(template)}>
                  <img 
                    src={template.preview_image} 
                    alt={template.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-700 border-0 capitalize font-medium text-xs">
                      {template.category?.replace('_', ' ')}
                    </Badge>
                  </div>
                  {template.is_free && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white font-medium text-xs">
                        FREE
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2 bg-white/90 rounded-full p-2 shadow-lg">
                      <Eye className="w-5 h-5 text-gray-700" />
                      <span className="text-sm font-medium text-gray-800 pr-2">Preview</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      {template.is_free ? 'FREE' : `$${template.price}`}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreviewClick(template)}>
                        Preview
                      </Button>
                      {template.is_free ? (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-medium" onClick={() => handleDownload(template)}>
                          Download
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white font-medium" onClick={() => addToCart(template)}>
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl("Templates")}>
              <Button size="lg" className="btn-primary text-white px-8 py-4 rounded-xl font-medium shadow-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                See All Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TemplatePreviewDialog 
        template={selectedTemplate}
        isOpen={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        onShowPayWhatYouWant={handlePayWhatYouWantFromPreview}
      />

      <PayWhatYouWantDialog
        template={payWhatYouWantTemplate}
        isOpen={payWhatYouWantOpen}
        onClose={() => setPayWhatYouWantOpen(false)}
        onDownload={handleActualDownload}
      />
    </>
  );
}
