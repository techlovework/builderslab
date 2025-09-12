
import React, { useState, useEffect } from "react";
import { templateData } from "../components/data/templates"; // Updated path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ExternalLink, ShoppingCart, Grid, List, Eye } from "lucide-react";
import { useCart } from "../components/context/CartContext";
import TemplatePreviewDialog from "../components/templates/TemplatePreviewDialog";
import PaginationControls from "../components/templates/PaginationControls";
import PayWhatYouWantDialog from "../components/templates/PayWhatYouWantDialog";

export default function Templates() {
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [payWhatYouWantOpen, setPayWhatYouWantOpen] = useState(false);
  const [payWhatYouWantTemplate, setPayWhatYouWantTemplate] = useState(null);
  const { addToCart } = useCart();

  const TEMPLATES_PER_PAGE = 15;

  const categories = [
    "all", "ecommerce", "business", "portfolio", "shopping", "crypto",
    "entertainment", "social_media", "blog", "landing_page", "dashboard",
    "saas", "restaurant"
  ];

  useEffect(() => {
    loadTemplates();
  }, [selectedCategory, sortBy]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      let filteredData = [...templateData];
      
      // Filter by category
      if (selectedCategory !== "all") {
        filteredData = filteredData.filter(template => template.category === selectedCategory);
      }

      // Sort templates
      if (sortBy === "price_low") {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price_high") {
        filteredData.sort((a, b) => b.price - a.price);
      } else if (sortBy === "popular") {
        filteredData.sort((a, b) => b.sales_count - a.sales_count);
      } else {
        // Default: newest first (reverse order since we want latest first)
        filteredData.reverse();
      }

      // Mark first 4 templates as free and add a mock download_url
      const finalTemplates = filteredData.map((template, index) => {
        if (index < 4) {
          return {
            ...template,
            is_free: true,
            download_url: `/mock_downloads/template_${template.id || index}.zip` // Mock URL for demonstration
          };
        }
        return template;
      });

      setAllTemplates(finalTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (template) => {
    if (template.is_free) {
      setPayWhatYouWantTemplate(template);
      setPayWhatYouWantOpen(true);
    } else if (template.download_url) {
      // This branch is technically not hit by the current UI's "Download" button for non-free items,
      // as it uses addToCart, but kept for logical completeness if handleDownload were generic.
      const link = document.createElement('a');
      link.href = template.download_url;
      link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

  const filteredTemplates = allTemplates.filter(template =>
    (template.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (template.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * TEMPLATES_PER_PAGE,
    currentPage * TEMPLATES_PER_PAGE
  );

  // Reset current page when search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePreviewClick = (template) => {
    setSelectedTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handlePayWhatYouWantFromPreview = (template) => {
    setPreviewDialogOpen(false); // Close the preview dialog first
    setPayWhatYouWantTemplate(template);
    setPayWhatYouWantOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Website Templates</h1>
            <p className="text-xl text-slate-600">
              Professional templates to jumpstart your next project
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              Showing {paginatedTemplates.length} of {filteredTemplates.length} templates found
            </p>
          </div>

          {/* Templates Grid/List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                {paginatedTemplates.map((template) => (
                  <div key={template.id} className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${viewMode === "list" ? "flex" : ""}`}>
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                      <img
                        src={template.preview_image}
                        alt={template.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-slate-800 text-white capitalize">
                          {template.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      {template.is_free && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-green-500 text-white font-semibold">
                            FREE
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" variant="secondary" className="shadow-lg" onClick={() => handlePreviewClick(template)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {template.description}
                        </p>

                        {template.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {template.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-2xl font-bold text-slate-800">
                            {template.is_free ? 'FREE' : `$${template.price}`}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handlePreviewClick(template)}>
                              Preview
                            </Button>
                            {template.is_free ? (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 transition-colors" onClick={() => handleDownload(template)}>
                                Download
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-slate-800 hover:bg-amber-600 transition-colors" onClick={() => addToCart(template)}>
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 text-xs text-slate-500">
                          {template.sales_count || 0} {template.is_free ? 'downloads' : 'sales'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

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
