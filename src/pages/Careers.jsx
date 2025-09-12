import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Briefcase, Heart, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const openPositions = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    experience: "5+ years",
    description: "We're looking for a passionate frontend developer to help build beautiful, responsive web applications using React and modern web technologies.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong knowledge of modern CSS and responsive design",
      "Experience with state management libraries (Redux, Zustand)",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
      "Understanding of web performance optimization"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "$2000 annual learning budget"
    ]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Austin, TX / Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    experience: "3+ years",
    description: "Join our design team to create stunning user interfaces and seamless user experiences for our template marketplace and AI builder.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Strong portfolio showcasing web and mobile designs",
      "Understanding of design systems and component libraries",
      "Experience with user research and usability testing"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Latest design tools and software"
    ]
  },
  {
    id: 3,
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY / Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    experience: "4+ years",
    description: "Drive product marketing strategy and go-to-market initiatives for our growing template marketplace and AI-powered tools.",
    requirements: [
      "4+ years of product marketing experience",
      "Experience in SaaS or developer tools marketing",
      "Strong analytical and communication skills",
      "Experience with marketing automation tools",
      "Understanding of developer and designer audiences"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Conference and networking budget"
    ]
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Denver, CO / Remote",
    type: "Full-time",
    salary: "$70k - $95k",
    experience: "2+ years",
    description: "Help our customers succeed with our platform by providing exceptional support, onboarding, and relationship management.",
    requirements: [
      "2+ years of customer success or support experience",
      "Excellent communication and problem-solving skills",
      "Experience with CRM and support tools",
      "Technical aptitude and ability to learn quickly",
      "Passion for helping customers achieve their goals"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Professional development opportunities"
    ]
  }
];

const companyBenefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipend."
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Unlimited PTO, flexible working hours, and remote work options to help you thrive."
  },
  {
    icon: Star,
    title: "Growth & Learning",
    description: "$2000 annual learning budget, conference attendance, and mentorship programs."
  },
  {
    icon: Users,
    title: "Amazing Team",
    description: "Work with passionate, talented people who care about building great products together."
  }
];

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = ["all", "Engineering", "Design", "Marketing", "Customer Success"];
  const filteredPositions = selectedDepartment === "all" 
    ? openPositions 
    : openPositions.filter(pos => pos.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 bg-white/10 rounded-full px-5 py-2 text-sm font-semibold border border-white/20 mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Join Our Team</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
            Build the Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Web Templates
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Join our passionate team of designers, developers, and innovators who are 
            revolutionizing how people build beautiful websites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl">
              View Open Positions
            </Button>
            <Link to={createPageUrl("Apply")}>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-white/10 px-8 py-3 rounded-xl">
                Send Us Your Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We believe in creating an environment where great people can do their best work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Find your perfect role and help us build amazing products.
            </p>
            
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map(dept => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(dept)}
                  className="capitalize"
                >
                  {dept === "all" ? "All Departments" : dept}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPositions.map((position) => (
              <Card key={position.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800 mb-2">
                        {position.title}
                      </CardTitle>
                      <Badge className="bg-blue-100 text-blue-800 mb-3">
                        {position.department}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-slate-800">{position.salary}</div>
                      <div className="text-sm text-slate-500">{position.type}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {position.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {position.experience}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">{position.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="flex items-start text-slate-600 text-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <Link to={createPageUrl("Apply")} className="flex-1 mr-3">
                        <Button className="w-full bg-slate-800 hover:bg-blue-600 transition-colors">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
            Don't See Your Role?
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            We're always looking for talented people. Send us your resume and tell us 
            how you'd like to contribute to our mission.
          </p>
          <Link to={createPageUrl("Apply")}>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-xl shadow-lg">
              Send Your Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}