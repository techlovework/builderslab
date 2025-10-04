import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiry_type: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey = 'YOUR_WEB3FORMS_ACCESS_KEY'; // IMPORTANT: Replace with your Web3Forms Access Key

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New Contact Message from BuildersLab',
          from_name: formData.name,
          ...formData
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Submission Error:', result);
        alert(result.message || 'There was an error submitting your message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "How do I download purchased templates?",
      answer: "After purchase, you can download your templates from your dashboard. You'll also receive an email with download links."
    },
    {
      question: "Can I use templates for commercial projects?",
      answer: "Yes! All our templates come with a commercial license, allowing you to use them for client work and commercial projects."
    },
    {
      question: "Do you offer custom development services?",
      answer: "Absolutely! We offer custom website development tailored to your specific needs. Contact us for a personalized quote."
    },
    {
      question: "What's included with lifetime updates?",
      answer: "Lifetime updates include bug fixes, security patches, new features, and compatibility updates for modern browsers."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Thank You!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "", email: "", company: "", subject: "", message: "", inquiry_type: ""
                });
              }}
              className="bg-slate-900 hover:bg-slate-800"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about our templates or need custom development?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
                    <p className="text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <Input
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-slate-200 focus:border-slate-400 focus:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-slate-200 focus:border-slate-400 focus:ring-0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Company
                        </label>
                        <Input
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="border-slate-200 focus:border-slate-400 focus:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Inquiry Type
                        </label>
                        <Select value={formData.inquiry_type} onValueChange={(value) => handleInputChange('inquiry_type', value)}>
                          <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-0">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="custom">Custom Development</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subject
                      </label>
                      <Input
                        required
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="border-slate-200 focus:border-slate-400 focus:ring-0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        required
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="min-h-32 border-slate-200 focus:border-slate-400 focus:ring-0 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-8">

              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-blue-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                      <p className="text-slate-600">info@builderslab.net</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-emerald-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                      <p className="text-slate-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-purple-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
                      <p className="text-slate-600">123 Tech Street<br />San Francisco, CA 94105</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-orange-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Business Hours</h4>
                      <p className="text-slate-600">Mon-Fri: 9am-6pm PST<br />Weekend: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <i className="fab fa-x-twitter text-slate-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">X</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <i className="fab fa-linkedin text-blue-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <i className="fab fa-github text-slate-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">GitHub</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <i className="fab fa-instagram text-pink-500 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8 text-white">
                <i className="fas fa-comments text-slate-300 text-2xl mb-4"></i>
                <h3 className="text-lg font-bold mb-2">Quick Response</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Quick answers to common questions
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl shadow-sm border border-slate-200/80">
                <AccordionTrigger className="text-left font-semibold text-slate-800 p-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}