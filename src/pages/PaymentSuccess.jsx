import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Download, Clock, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const { purchasedItems, totalAmount, paymentMethod, pending } = location.state || { purchasedItems: [], totalAmount: 0, paymentMethod: 'Unknown' };

  const handleDownload = (template) => {
    if (template.download_url) {
      const link = document.createElement('a');
      link.href = template.download_url;
      link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Download not available.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <Card className="shadow-2xl border-0 rounded-3xl p-8">
          <CardContent>
            {pending ? (
              <Clock className="mx-auto h-16 w-16 text-amber-500 mb-6" />
            ) : (
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-6" />
            )}
            
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {pending ? "Payment Received" : "Payment Successful!"}
            </h2>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {pending
                ? "Thank you for your submission. Your order is pending confirmation. You can download your templates once the payment is verified."
                : "Thank you for your purchase! You can now download your templates below."
              }
            </p>

            <Card className="text-left mb-8 bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {purchasedItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">{item.title}</span>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-slate-800">${item.price.toFixed(2)}</span>
                      {!pending && (
                        <Button size="sm" onClick={() => handleDownload(item)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Payment Method:</span>
                  <span className="font-medium text-slate-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Total:</span>
                  <span className="font-bold text-xl text-slate-900">${totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={createPageUrl("Dashboard")}>
                  Go to My Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link to={createPageUrl("Templates")}>
                  Explore More Templates <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}