import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Heart, DollarSign, Gift } from "lucide-react";

export default function PayWhatYouWantDialog({ template, isOpen, onClose, onDownload }) {
  const [customPrice, setCustomPrice] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleFreeDownload = () => {
    onDownload(template);
    onClose();
  };

  const handleCustomPayment = async () => {
    const price = parseFloat(customPrice);
    if (isNaN(price) || price < 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onDownload(template);
      setIsProcessingPayment(false);
      setCustomPrice("");
      onClose();
      
      // Show thank you message
      alert(`Thank you for your generous support of $${price.toFixed(2)}! Your download will begin now.`);
    }, 1500);
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center">
            <Gift className="w-6 h-6 mr-2 text-green-500" />
            Choose Your Price
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Info */}
          <div className="text-center">
            <img 
              src={template.preview_image} 
              alt={template.title}
              className="w-20 h-20 object-cover rounded-xl mx-auto mb-3 shadow-md"
            />
            <h3 className="font-semibold text-lg text-slate-800">{template.title}</h3>
            <p className="text-sm text-slate-600">High-quality template • Lifetime updates</p>
          </div>

          {/* Encouraging Message */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center border border-blue-100">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Support our creators!</strong> This template is free, but if you find it valuable, 
              consider showing your appreciation. Every contribution helps us create better templates.
            </p>
          </div>

          {/* Option 1: Free Download */}
          <div className="space-y-4">
            <Button 
              onClick={handleFreeDownload}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Download for Free ($0)
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-500 font-medium">or pay what you want</span>
              </div>
            </div>

            {/* Option 2: Custom Price */}
            <div className="space-y-3">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="number"
                  placeholder="5.00"
                  min="0"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="pl-10 text-lg py-3 rounded-xl border-2 focus:border-blue-500"
                />
              </div>
              
              <Button 
                onClick={handleCustomPayment}
                disabled={!customPrice || parseFloat(customPrice) <= 0 || isProcessingPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Pay ${customPrice ? parseFloat(customPrice).toFixed(2) : "0.00"} & Download
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center text-xs text-slate-500">
            <p>🔒 Secure payment • 📧 Instant download • 💝 Support creators</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}