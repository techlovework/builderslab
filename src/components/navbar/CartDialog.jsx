import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, X, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CartDialog({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shopping Cart ({cartItems.length})
            </div>
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img 
                      src={item.preview_image} 
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.category.replace('_', ' ')}
                      </Badge>
                      <p className="font-semibold text-slate-800">${item.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Link to={createPageUrl("Checkout")}>
                    <Button className="w-full" onClick={onClose}>
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}