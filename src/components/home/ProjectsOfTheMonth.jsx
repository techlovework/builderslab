import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'QuantumLeap E-commerce',
    category: 'E-commerce Platform',
    description: 'A cutting-edge online store for a futuristic fashion brand, featuring a seamless user experience and advanced product filtering.',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9e?q=80&w=2070&auto=format&fit=crop',
    liveUrl: '#',
  },
  {
    title: 'Stellar Solutions Corporate',
    category: 'Corporate Website',
    description: 'A professional and sleek corporate website for a B2B tech firm, designed to build trust and showcase their services effectively.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop',
    liveUrl: '#',
  },
  {
    title: 'Nexus SaaS Dashboard',
    category: 'SaaS Analytics',
    description: 'An intuitive and powerful analytics dashboard for a SaaS platform, providing users with actionable insights through data visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    liveUrl: '#',
  }
];

export default function ProjectsOfTheMonth() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Projects of the Month
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A glimpse into some of our favorite custom projects, showcasing the quality and creativity we bring to every build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group modern-card overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-slate-800 border-0 font-medium">{project.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                <Button variant="outline" className="w-full group-hover:bg-slate-900 group-hover:text-white transition-colors" onClick={() => window.open(project.liveUrl, '_blank')}>
                  View Project <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}