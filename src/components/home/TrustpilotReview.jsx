import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    name: 'Sarah L.',
    company: 'CEO of Tech-Innovate',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: '"The templates are not just beautiful but incredibly well-structured. The AI builder is a game-changer, helping us create a professional site in minutes."'
  },
  {
    name: 'Michael B.',
    company: 'Founder of DesignWave',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: '"An absolute lifesaver for our agency. The quality and variety of templates have cut our development time in half. Highly recommended for any creative professional."'
  },
  {
    name: 'Jessica Chen',
    company: 'E-commerce Manager, ModaStyle',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    quote: '"Our new e-commerce site is performing brilliantly. The template was SEO-friendly out of the box and the design is top-notch. Sales are up 30%!"'
  },
  {
    name: 'David R.',
    company: 'Lead Developer, FinTech Solutions',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    quote: '"As a developer, I appreciate clean code. These templates are exceptionally well-written, easy to customize, and follow best practices. Fantastic work."'
  },
  {
    name: 'Emily Carter',
    company: 'Freelance Blogger',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: '"I launched my new blog using a template from here and the feedback has been amazing. It looks professional, is super fast, and was easy to set up."'
  }
];

export default function TrustpilotReview() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };
  
  const currentReview = reviews[index];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Loved by innovators worldwide
          </h2>
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="flex items-center space-x-1">
              {Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-gray-600">Based on <span className="font-semibold text-gray-900">1,247 reviews</span> on</p>
            <div className="flex items-center space-x-1 font-semibold text-gray-900">
              <Star className="w-5 h-5 text-green-500 fill-green-500"/>
              <span>Trustpilot</span>
            </div>
          </div>
        </div>

        <div className="relative modern-card p-8 md:p-12 min-h-[350px] flex items-center">
          <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 transition-all shadow-lg hover:shadow-xl">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 transition-all shadow-lg hover:shadow-xl">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <img 
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  className="w-16 h-16 rounded-full mb-6 shadow-lg"
                />
                <blockquote className="max-w-2xl mx-auto text-xl font-medium text-gray-700 mb-6 leading-relaxed">
                  {currentReview.quote}
                </blockquote>
                <div>
                  <p className="font-semibold text-lg text-gray-900">{currentReview.name}</p>
                  <p className="text-gray-600">{currentReview.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {reviews.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === index ? 'bg-gray-900 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}