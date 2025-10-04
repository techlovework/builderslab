import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Live HTML Editor',
    category: 'Real-time Code Editor',
    description: 'An elegant, real-time HTML, CSS, and JavaScript editor that provides a seamless development experience. It features a split-screen interface with a dark-themed code editor on one side and a live preview on the other, updating instantly as you type.',
    imageUrl: 'images/project-of-the-month/html-editor.png',
    liveUrl: '#',
  },
  {
    title: 'Iglare Optics',
    category: 'E-commerce glasses Store',
    description: 'Iglare Optics is an e-commerce platform specializing in premium eyewear. It allows customers to browse and purchase a wide range of glasses, including prescription glasses, sunglasses, and specialty eyewear. The platform offers features to manage prescriptions, virtually try on glasses, track orders, and interact with the brand.',
    imageUrl: 'images/project-of-the-month/iglare-optics.png',
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