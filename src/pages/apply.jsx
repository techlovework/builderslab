
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Send, CheckCircle2, FileText, User, Mail, Briefcase } from "lucide-react";

export default function Apply() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    availability: "",
    coverLetter: "",
    portfolio: "",
    linkedin: ""
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setResumeFile(file);
    } else {
      alert("Please select a file under 5MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const accessKey = 'YOUR_WEB3FORMS_ACCESS_KEY'; // IMPORTANT: Replace with your Web3Forms Access Key

    const submissionData = new FormData();
    submissionData.append("access_key", accessKey);
    submissionData.append("subject", `New Job Application: ${formData.position}`);
    submissionData.append("from_name", `${formData.firstName} ${formData.lastName}`);

    // Append all form data fields
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    
    // Append the file
    if (resumeFile) {
      submissionData.append("resume", resumeFile);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submissionData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Submission Error:', result);
        alert(result.message || 'There was an error submitting your application. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          <Card className="shadow-2xl border-0 rounded-3xl p-8">
            <CardContent>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Application Submitted!</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Thank you for your interest in joining our team! We've received your application and 
                our hiring team will review it carefully.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <p className="text-blue-800 font-medium">
                  📧 We'll be in touch within 1-2 weeks if your background matches what we're looking for.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstName: "", lastName: "", email: "", phone: "", position: "",
                      experience: "", location: "", availability: "", coverLetter: "",
                      portfolio: "", linkedin: ""
                    });
                    setResumeFile(null);
                  }}
                  variant="outline"
                >
                  Submit Another Application
                </Button>
                <Button onClick={() => window.location.href = '/'}>
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 bg-white/10 rounded-full px-5 py-2 text-sm font-semibold border border-white/20 mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Join Our Team</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Apply to BuildersLab
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to make an impact? Submit your application and tell us why you'd be 
            a great addition to our team.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-8">
              <CardTitle className="text-2xl font-bold flex items-center justify-center">
                <User className="w-6 h-6 mr-3" />
                Application Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Position Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Position Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Position of Interest *
                      </label>
                      <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-500">
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="senior-frontend">Senior Frontend Developer</SelectItem>
                          <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                          <SelectItem value="product-marketing">Product Marketing Manager</SelectItem>
                          <SelectItem value="customer-success">Customer Success Manager</SelectItem>
                          <SelectItem value="other">Other / General Application</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Years of Experience *
                      </label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-500">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-3">2-3 years</SelectItem>
                          <SelectItem value="4-6">4-6 years</SelectItem>
                          <SelectItem value="7-10">7-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Preferred Location *
                      </label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-500">
                          <SelectValue placeholder="Select location preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                          <SelectItem value="new-york">New York, NY</SelectItem>
                          <SelectItem value="austin">Austin, TX</SelectItem>
                          <SelectItem value="denver">Denver, CO</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Availability *
                      </label>
                      <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-500">
                          <SelectValue placeholder="When can you start?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediately">Immediately</SelectItem>
                          <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                          <SelectItem value="1-month">1 month</SelectItem>
                          <SelectItem value="2-months">2+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Resume & Documents
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Resume/CV * (PDF, DOC, max 5MB)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                          required
                        />
                        <label
                          htmlFor="resume-upload"
                          className="cursor-pointer"
                        >
                          <div className="text-sm text-slate-600 mb-2">
                            {resumeFile ? `Selected: ${resumeFile.name}` : 'Click to upload your resume'}
                          </div>
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Portfolio URL (Optional)
                        </label>
                        <Input
                          type="url"
                          placeholder="https://yourportfolio.com"
                          value={formData.portfolio}
                          onChange={(e) => handleInputChange('portfolio', e.target.value)}
                          className="border-slate-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          LinkedIn Profile (Optional)
                        </label>
                        <Input
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          className="border-slate-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Cover Letter / Why do you want to work with us? *
                  </label>
                  <Textarea
                    required
                    placeholder="Tell us about yourself, your experience, and why you're interested in joining our team..."
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    className="min-h-32 border-slate-200 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-100">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-500 pt-4">
                  <p>We respect your privacy. Your information will only be used for recruitment purposes.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
