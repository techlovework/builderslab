
import React from 'react';
import { useCart } from '../components/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Landmark, CircleDollarSign, ArrowLeft, ShoppingBag } from 'lucide-react';

const BitcoinIcon = ({ className }) => (
  <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Bitcoin</title>
    <path d="M11.31 4.237a1.325 1.325 0 011.318-.002l1.64 1.012c.182.112.39.17.602.17h1.926a1.325 1.325 0 011.23.78l.81 2.21a1.325 1.325 0 01-.17 1.318l-1.011 1.639a1.324 1.324 0 01-.17.243l-1.012 1.64c-.4.646.002 1.503.78 1.714l2.21.603a1.325 1.325 0 01.78 1.23v1.926c0 .213-.058.42-.17.603l-1.012 1.64a1.325 1.325 0 01-1.318.17l-1.639-1.011a1.324 1.324 0 01-.603-.17H9.414a1.325 1.325 0 01-1.23-.78l-.81-2.21a1.325 1.325 0 01.17-1.318l1.011-1.639c.112-.182.17-.39.17-.602V9.414a1.325 1.325 0 01.78-1.23l2.21-.81a1.325 1.325 0 011.318-.17l1.639 1.011c.182.112.39.17.602.17h.213m-6.44 2.898H8.503v2.898h-1.4v-2.898H5.03v-1.4h2.073V7.102h1.4v1.633h1.4v1.4zm3.504 1.4v1.4h2.073v1.4h-2.073v1.633h-1.4V11.27h-2.073v-1.4h2.073V8.237h1.4v1.633h2.073z" />
  </svg>
);

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <Card className="shadow-2xl border-0 rounded-3xl p-4 sm:p-8">
            <CardContent>
              <ShoppingBag className="mx-auto h-12 w-12 text-slate-400 mb-6" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Your cart is empty</h2>
              <p className="text-slate-600 mb-6">
                Please add some templates to your cart before proceeding to checkout.
              </p>
              <Button onClick={() => navigate(createPageUrl('Templates'))} size="lg" className="w-full">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const paymentOptions = [
    { name: 'Credit Card', icon: CreditCard, page: 'PaymentCreditCard' },
    { name: 'Bank Transfer', icon: Landmark, page: 'PaymentBankTransfer' },
    { name: 'Bitcoin', icon: BitcoinIcon, page: 'PaymentBitcoin' },
    { name: 'USDT', icon: CircleDollarSign, page: 'PaymentUSDT' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Checkout</h1>
          <p className="text-xl text-slate-600">Review your order and select a payment method.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Order Summary</h2>
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardContent className="p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.preview_image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-500">
                        <Badge variant="outline" className="capitalize">{item.category.replace('_', ' ')}</Badge>
                      </p>
                    </div>
                    <div className="font-bold text-slate-800">${item.price.toFixed(2)}</div>
                  </div>
                ))}
                <div className="border-t border-slate-200 my-4"></div>
                <div className="flex justify-between items-center text-xl font-bold text-slate-800">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" className="mt-6 w-full" onClick={() => navigate(createPageUrl('Templates'))}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Payment Method</h2>
            <div className="space-y-4">
              {paymentOptions.map(option => (
                <Link key={option.name} to={createPageUrl(option.page)} state={{ cartItems, totalAmount }}>
                  <Card className="hover:shadow-xl hover:border-slate-400 transition-all duration-200 cursor-pointer rounded-2xl">
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <option.icon className="w-6 h-6 text-slate-600" />
                      </div>
                      <span className="text-lg font-semibold text-slate-800">{option.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
