import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80")'
        }}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in">
            Your Gateway to Global Education
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            We help students achieve their dreams of studying abroad with personalized guidance
            and support throughout their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}