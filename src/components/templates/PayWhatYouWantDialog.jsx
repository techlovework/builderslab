import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Download } from "lucide-react";

export default function PayWhatYouWantDialog({ template, isOpen, onClose, onDownload }) {
  const [amount, setAmount] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  if (!template) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate a brief delay for the download process
    setTimeout(() => {
      onDownload(template);
      setIsDownloading(false);
      onClose();
      setAmount("");
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Support Our Work
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <img 
              src={template.preview_image} 
              alt={template.title}
              className="w-16 h-16 object-cover rounded-lg mx-auto mb-3"
            />
            <h3 className="font-semibold text-slate-800">{template.title}</h3>
            <p className="text-sm text-slate-500">This template is free to download</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-3">
              Love our work? Consider supporting us with a contribution. Every bit helps us create more amazing templates!
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contribution Amount (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                {[5, 10, 25].map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(preset.toString())}
                    className="flex-1"
                  >
                    ${preset}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600 mr-2"></div>
                  Preparing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Free
                </>
              )}
            </Button>
            
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleDownload}
              disabled={isDownloading || !amount || parseFloat(amount) <= 0}
            >
              {isDownloading ? (
                "Processing..."
              ) : amount && parseFloat(amount) > 0 ? (
                `Support & Download $${amount}`
              ) : (
                "Support & Download"
              )}
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            By downloading, you agree to our terms of service and license agreement.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}