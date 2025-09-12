import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Trash2, ExternalLink, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDialog({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping Cart ({cartItems.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-6">Add some templates to get started</p>
              <Button asChild onClick={onClose}>
                <Link to={createPageUrl("Templates")}>Browse Templates</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-auto space-y-4 p-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-xl">
                    <img 
                      src={item.preview_image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{item.title}</h4>
                      <p className="text-sm text-slate-600 line-clamp-1">{item.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {item.category?.replace('_', ' ')}
                        </Badge>
                        <span className="text-lg font-bold text-slate-800">${item.price}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="outline" asChild>
                        <a href={item.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-slate-800">Total:</span>
                  <span className="text-2xl font-bold text-slate-800">${totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg" onClick={onClose}>
                    Continue Shopping
                  </Button>
                  <Button size="lg" asChild className="bg-slate-800 hover:bg-amber-600" onClick={onClose}>
                    <Link to={createPageUrl("Checkout")}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-500">
                    💳 Credit Card • 🏦 Bank Transfer • ₿ Bitcoin • 💰 USDT
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}