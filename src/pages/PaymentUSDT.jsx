import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { User } from '@/api/entities';
import { Purchase } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, CircleDollarSign } from 'lucide-react';

export default function USDTPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const usdtWalletAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Using Vitalik's address as a placeholder
  const usdtAmount = totalAmount.toFixed(2);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const handleConfirmation = async () => {
    setError('');
    setIsProcessing(true);

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      setIsProcessing(false);
      return;
    }

    try {
      const user = await User.me();
      
      const purchasePromises = cartItems.map(item => 
        Purchase.create({
          template_id: item.id,
          user_email: user.email,
          amount: item.price,
          payment_method: 'usdt',
          transaction_id: `usdt_${Date.now()}`,
          status: 'pending'
        })
      );
      
      await Promise.all(purchasePromises);
      
      clearCart();
      
      navigate(createPageUrl('PaymentSuccess'), { state: { purchasedItems: cartItems, totalAmount, paymentMethod: 'USDT', pending: true } });

    } catch (err) {
      setError('An error occurred. Please ensure you are logged in and try again.');
      setIsProcessing(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(createPageUrl('Checkout'))} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payment Options
        </Button>

        <Card className="shadow-2xl border-0 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CircleDollarSign className="w-6 h-6 mr-3 text-teal-500" />
              Pay with USDT (ERC-20)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-slate-600">Scan the QR code or copy the address below to send your payment. Please use the ERC-20 Network.</p>
            
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${usdtWalletAddress}`} 
              alt="USDT QR Code"
              className="mx-auto rounded-lg shadow-md"
            />

            <div className="space-y-3 rounded-lg bg-slate-50 p-4 border border-slate-200">
              <div className="text-sm">
                <span className="text-slate-500">Send Exactly</span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-semibold text-lg text-slate-800">{usdtAmount} USDT</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(usdtAmount)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-slate-500">To Address (ERC-20)</span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-semibold text-slate-800 truncate">{usdtWalletAddress}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(usdtWalletAddress)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleConfirmation} size="lg" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'I Have Sent The Payment'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}