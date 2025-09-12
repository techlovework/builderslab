import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { User } from '@/api/entities';
import { Purchase } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard as CreditCardIcon, User as UserIcon, Calendar, Lock, ArrowLeft } from 'lucide-react';

export default function CreditCardPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
  const { clearCart } = useCart();

  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    if (name === 'expiry') {
      formattedValue = value.replace(/\//g, '').replace(/(\d{2})/, '$1/').slice(0, 5);
    }
    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          payment_method: 'credit_card',
          transaction_id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'completed'
        })
      );
      
      await Promise.all(purchasePromises);
      
      clearCart();

      // Simulate payment processing time
      setTimeout(() => {
        setIsProcessing(false);
        navigate(createPageUrl('PaymentSuccess'), { state: { purchasedItems: cartItems, totalAmount, paymentMethod: 'Credit Card' } });
      }, 1500);

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
              <CreditCardIcon className="w-6 h-6 mr-3 text-blue-500" />
              Pay with Credit Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input name="number" placeholder="Card Number" value={cardDetails.number} onChange={handleInputChange} className="pl-10" maxLength="19" required />
              </div>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input name="name" placeholder="Name on Card" value={cardDetails.name} onChange={handleInputChange} className="pl-10" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input name="expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleInputChange} className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input name="cvc" placeholder="CVC" value={cardDetails.cvc} onChange={handleInputChange} className="pl-10" maxLength="4" required />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}