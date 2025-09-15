import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { templateData } from "../data/templates";

export default function SearchDialog({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templateData.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6); // Limit to 6 results

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search Templates
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search for templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
          
          {searchTerm && (
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <div key={template.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-slate-50 cursor-pointer">
                    <img 
                      src={template.preview_image} 
                      alt={template.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{template.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-1">{template.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {template.category.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm font-semibold text-slate-800">
                          {template.is_free ? 'FREE' : `$${template.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No templates found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
          
          {!searchTerm && (
            <div className="text-center py-8 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Start typing to search for templates</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}