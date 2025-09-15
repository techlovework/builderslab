import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { User } from '@/api/entities';
import { Purchase } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, ArrowLeft, Copy } from 'lucide-react';

export default function BankTransferPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const bankDetails = {
    "Bank Name": "BuildersLab Global Bank",
    "Account Number": "1234567890",
    "SWIFT/BIC": "THGBUS33",
    "Reference": `TH-Ref-${Date.now()}`
  };

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
          payment_method: 'bank_transfer',
          transaction_id: `bank_${Date.now()}`,
          status: 'pending'
        })
      );
      
      await Promise.all(purchasePromises);
      
      clearCart();
      
      navigate(createPageUrl('PaymentSuccess'), { state: { purchasedItems: cartItems, totalAmount, paymentMethod: 'Bank Transfer', pending: true } });

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
              <Landmark className="w-6 h-6 mr-3 text-green-500" />
              Bank Transfer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-slate-600">Please transfer ${totalAmount.toFixed(2)} to the following bank account. Your purchase will be marked as pending until the payment is confirmed.</p>
            
            <div className="space-y-3 rounded-lg bg-slate-50 p-4 border border-slate-200">
              {Object.entries(bankDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{key}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800">{value}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(value)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleConfirmation} size="lg" className="w-full bg-green-600 hover:bg-green-700" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'I Have Made The Transfer'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}