
import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedTemplates from "../components/home/FeaturedTemplates";
import CategoryGrid from "../components/home/CategoryGrid";
import TrustpilotReview from "../components/home/TrustpilotReview";
import CustomWebsiteForm from "../components/home/CustomWebsiteForm";
import ProjectsOfTheMonth from "../components/home/ProjectsOfTheMonth";

const CompanyLogos = () => {
  const logos = [
    { 
      name: 'Google', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png'
    },
    { 
      name: 'Apple',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png'
    },
    { 
      name: 'Microsoft',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png'
    },
    { 
      name: 'Tesla',
      logo: 'https://logos-world.net/wp-content/uploads/2020/08/Tesla-Logo.png'
    },
    { 
      name: 'GitHub',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-16 tracking-tight">
          Trusted by 10,000+ Developers Worldwide
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center max-w-5xl mx-auto">
          {logos.map((company) => (
            <div key={company.name} className="flex justify-center" title={company.name}>
              <img 
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />

      {/* Light themed sections start here */}
      <div className="bg-gradient-to-b from-white to-slate-50">
        <FeaturedTemplates />
        
        {/* Trust Section */}
        <CompanyLogos />

        <ProjectsOfTheMonth />

        <CategoryGrid />
        <TrustpilotReview />
        <CustomWebsiteForm />
      </div>
    </div>
  );
}
