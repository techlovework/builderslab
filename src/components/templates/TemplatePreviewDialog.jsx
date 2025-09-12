import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, ShoppingCart, X, Star, Download, Code, Smartphone, Monitor } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function TemplatePreviewDialog({ template, isOpen, onClose, onShowPayWhatYouWant }) {
  const { addToCart } = useCart();

  if (!template) return null;

  const handleFreeDownload = () => {
    if (template.is_free && onShowPayWhatYouWant) {
      onShowPayWhatYouWant(template);
    } else if (template.download_url) {
      const link = document.createElement('a');
      link.href = template.download_url;
      link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const categoryColors = {
    ecommerce: "bg-green-100 text-green-800",
    business: "bg-blue-100 text-blue-800",
    portfolio: "bg-purple-100 text-purple-800",
    crypto: "bg-orange-100 text-orange-800",
    entertainment: "bg-pink-100 text-pink-800",
    social_media: "bg-cyan-100 text-cyan-800",
    blog: "bg-indigo-100 text-indigo-800",
    restaurant: "bg-red-100 text-red-800",
    saas: "bg-teal-100 text-teal-800",
    landing_page: "bg-yellow-100 text-yellow-800",
    dashboard: "bg-emerald-100 text-emerald-800"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader className="pb-4 border-b">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">
                {template.title}
              </DialogTitle>
              <div className="flex items-center space-x-3">
                <Badge className={`${categoryColors[template.category]} border capitalize`}>
                  {template.category?.replace('_', ' ')}
                </Badge>
                {template.is_free && (
                  <Badge className="bg-green-500 text-white font-semibold">
                    FREE
                  </Badge>
                )}
                <div className="flex items-center text-sm text-slate-500">
                  <Star className="w-4 h-4 mr-1 text-amber-400" />
                  <span>{template.sales_count || 0} {template.is_free ? 'downloads' : 'sales'}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-800 mb-1">
                {template.is_free ? 'FREE' : `$${template.price}`}
              </div>
              <div className="text-sm text-slate-500">
                {template.is_free ? 'Free download' : 'One-time purchase'}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Left Column - Image and Preview */}
          <div className="space-y-4">
            <div className="relative group rounded-xl overflow-hidden shadow-lg">
              <img 
                src={template.preview_image} 
                alt={template.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a href={template.demo_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Live Demo
                  </Button>
                </a>
              </div>
            </div>

            {/* Device Preview Icons */}
            <div className="flex justify-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-1 text-xs">
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Features */}
            {template.features && template.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Features Included</h3>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {template.tech_stack && template.tech_stack.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  <Code className="w-5 h-5 inline mr-2" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {template.tech_stack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {template.tags && template.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs capitalize">
                      {tag.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              <span>Instant download</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>Lifetime updates</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <a href={template.demo_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Preview
              </Button>
            </a>
            {template.is_free ? (
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 transition-colors"
                onClick={handleFreeDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-slate-800 hover:bg-amber-600 transition-colors"
                onClick={() => {
                  addToCart(template);
                  onClose();
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - ${template.price}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}