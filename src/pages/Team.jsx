import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const teamMembers = [
  {
    id: 1,
    name: "Tega Emmanuel",
    role: "Founder & CEO <br /> Head Web Developer",
    department: "Leadership",
    image: "images/t.png",
    bio: "Drives the vision, ensuring BuildersLab stays at the forefront of web design innovation.",
    social: {
      instagram: "https://instagram.com/tega",
      email: "mailto:tega@builderslab.net",
      phone: "tel:+1234567890",
    },
  },
  {
    id: 2,
    name: "Kosisochukwu Mbanugo",
    role: "Marketer <br /> Web Developer",
    department: "Engineering",
    image: "images/kosi.png",
    bio: "Leads our marketing efforts and crafts seamless web experiences that captivate users.",
    social: {
      instagram: "https://instagram.com/kosi",
      email: "mailto:kosi@builderslab.net",
      phone: "tel:+1234567891",
    },
  }
  
];

const SocialIcon = ({ type, href }) => {
  const iconClasses = {
    instagram: "fab fa-instagram",
    email: "fas fa-envelope",
    phone: "fas fa-phone",
  };
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-110"
    >
      <i className={`${iconClasses[type]} text-lg`}></i>
    </a>
  );
};

const MemberCard = ({ member }) => (
  <div className="text-center bg-white border border-slate-200/80 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:border-slate-300 hover:-translate-y-1">
    <img
      src={member.image}
      alt={member.name}
      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover object-center shadow-lg ring-4 ring-white"
    />
    <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
<p
  className="text-blue-600 font-medium text-sm mb-4"
  dangerouslySetInnerHTML={{ __html: member.role }}
/>
    <p className="text-slate-600 text-sm leading-relaxed mb-6 min-h-[4rem]">{member.bio}</p>
    <div className="flex items-center justify-center space-x-3">
      {Object.entries(member.social).map(([type, href]) => (
        <SocialIcon key={type} type={type} href={href} />
      ))}
    </div>
  </div>
);

export default function Team() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            The People Behind the Pixels
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are a collective of designers, developers, and product thinkers passionate about building high-quality, beautiful web experiences.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Interested in Joining Us?
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto">
            We're always looking for passionate people to join our mission.
            Explore our open roles and find your fit.
          </p>
          <Link to={createPageUrl("Careers")}>
            <Button size="lg" className="bg-slate-900 hover:bg-slate-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              View Open Positions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}