import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { User } from '@/api/entities';
import { Purchase } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy } from 'lucide-react';

const BitcoinIcon = ({ className }) => (
  <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <title>Bitcoin</title>
    <path d="M11.31 4.237a1.325 1.325 0 011.318-.002l1.64 1.012c.182.112.39.17.602.17h1.926a1.325 1.325 0 011.23.78l.81 2.21a1.325 1.325 0 01-.17 1.318l-1.011 1.639a1.324 1.324 0 01-.17.243l-1.012 1.64c-.4.646.002 1.503.78 1.714l2.21.603a1.325 1.325 0 01.78 1.23v1.926c0 .213-.058.42-.17.603l-1.012 1.64a1.325 1.325 0 01-1.318.17l-1.639-1.011a1.324 1.324 0 01-.603-.17H9.414a1.325 1.325 0 01-1.23-.78l-.81-2.21a1.325 1.325 0 01.17-1.318l1.011-1.639c.112-.182.17-.39.17-.602V9.414a1.325 1.325 0 01.78-1.23l2.21-.81a1.325 1.325 0 011.318-.17l1.639 1.011c.182.112.39.17.602.17h.213m-6.44 2.898H8.503v2.898h-1.4v-2.898H5.03v-1.4h2.073V7.102h1.4v1.633h1.4v1.4zm3.504 1.4v1.4h2.073v1.4h-2.073v1.633h-1.4V11.27h-2.073v-1.4h2.073V8.237h1.4v1.633h2.073z" />
  </svg>
);

export default function BitcoinPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const btcWalletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const btcAmount = (totalAmount / 40000).toFixed(6); // Mock conversion rate

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
          payment_method: 'bitcoin',
          transaction_id: `btc_${Date.now()}`,
          status: 'pending'
        })
      );
      
      await Promise.all(purchasePromises);
      
      clearCart();
      
      navigate(createPageUrl('PaymentSuccess'), { state: { purchasedItems: cartItems, totalAmount, paymentMethod: 'Bitcoin', pending: true } });

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
              <BitcoinIcon className="w-6 h-6 mr-3 text-orange-500" />
              Pay with Bitcoin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-slate-600">Scan the QR code or copy the address below to send your payment.</p>
            
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${btcWalletAddress}`} 
              alt="Bitcoin QR Code"
              className="mx-auto rounded-lg shadow-md"
            />

            <div className="space-y-3 rounded-lg bg-slate-50 p-4 border border-slate-200">
              <div className="text-sm">
                <span className="text-slate-500">Send Exactly</span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-semibold text-lg text-slate-800">{btcAmount} BTC</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(btcAmount)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-slate-500">To Address</span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-semibold text-slate-800 truncate">{btcWalletAddress}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(btcWalletAddress)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleConfirmation} size="lg" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'I Have Sent The Payment'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}