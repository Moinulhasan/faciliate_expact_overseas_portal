import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'International Student',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    content: 'The guidance I received was invaluable. They helped me secure admission to my dream university in Canada.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Graduate Student',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    content: 'Outstanding support throughout my visa application process. Highly professional and efficient service.',
    rating: 5
  },
  {
    name: 'Emma Williams',
    role: 'Undergraduate Student',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    content: 'Their personalized approach and attention to detail made my university application process stress-free.',
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-600">Real experiences from our successful students</p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={prev}
              className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="max-w-3xl mx-auto px-8">
              <div className="text-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-600 mb-6">"{testimonials[currentIndex].content}"</p>
                <h3 className="text-lg font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>

            <button
              onClick={next}
              className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}