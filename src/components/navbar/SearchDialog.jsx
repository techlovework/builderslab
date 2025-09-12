
import React, { useState, useEffect } from "react";
import { templateData } from "../data/templates"; // Fix file path as per outline
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function SearchDialog({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const filtered = templateData.filter(template =>
        (template.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (template.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (template.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 8));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search Templates
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search for templates, categories, features..."
              className="pl-10 text-lg py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {searchTerm.length >= 2 && (
            <div className="max-h-96 overflow-auto">
              {loading ? (
                <div className="space-y-3">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                      <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((template) => (
                    <div key={template.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                      <img 
                        src={template.preview_image} 
                        alt={template.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{template.title}</h4>
                        <p className="text-sm text-slate-600 line-clamp-1">{template.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {template.category?.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm font-bold text-slate-800">${template.price}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" onClick={() => addToCart(template)}>
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No templates found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}

          {searchTerm.length < 2 && (
            <div className="text-center py-8 text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Type at least 2 characters to search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
