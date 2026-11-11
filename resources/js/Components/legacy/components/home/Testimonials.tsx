import {
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Globe,
  Plane,
  Star,
} from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Ahmed Rahman",
    role: "Business Visa Client",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    content:
      "Outstanding visa processing service! They handled my business visa application for Saudi Arabia perfectly. The team was professional, responsive, and got my visa approved in just 8 days.",
    rating: 5,
    service: "Business Visa",
    country: "Saudi Arabia",
    icon: <FileCheck size={20} className="text-blue-600" />,
  },
  {
    name: "Fatima Khan",
    role: "Student Visa Client",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    content:
      "I was worried about my student visa application, but their expert guidance made everything smooth. From document preparation to interview coaching, they covered every detail perfectly.",
    rating: 5,
    service: "Student Visa",
    country: "Canada",
    icon: <Globe size={20} className="text-green-600" />,
  },
  {
    name: "Mohammed Ali",
    role: "Work Visa Client",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    content:
      "Excellent flight booking service along with visa assistance. They found me the best deals and handled all the travel arrangements professionally. Highly recommended!",
    rating: 5,
    service: "Work Visa + Travel",
    country: "UAE",
    icon: <Plane size={20} className="text-purple-600" />,
  },
  {
    name: "Aisha Patel",
    role: "Family Visa Client",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    content:
      "They helped reunite our family by processing our family visa applications efficiently. The team was compassionate and understood our urgency. Thank you for making it possible!",
    rating: 5,
    service: "Family Visa",
    country: "Australia",
    icon: <FileCheck size={20} className="text-orange-600" />,
  },
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
      prevIndex === 0 ? testimonials.length - 1 : prevIndex + 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 md:mb-6">
            <Star size={16} className="mr-2" />
            Trusted by Thousands
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Success Stories from Our Clients
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Real experiences from clients who have successfully obtained visas
            and traveled abroad with our expert guidance and support.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={prev}
              className="absolute left-0 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>

            <div className="max-w-4xl mx-auto px-4 md:px-8">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-100">
                {/* Service Badge */}
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-medium">
                    {testimonials[currentIndex].icon}
                    <span className="ml-2">
                      {testimonials[currentIndex].service}
                    </span>
                  </div>
                </div>

                {/* Client Image and Rating */}
                <div className="text-center mb-6 md:mb-8">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 object-cover border-4 border-blue-100"
                  />
                  <div className="flex justify-center mb-2 md:mb-3">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-yellow-400 fill-current md:w-6 md:h-6"
                        />
                      )
                    )}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 mb-2">
                    Destination: {testimonials[currentIndex].country}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="text-center mb-6 md:mb-8">
                  <p className="text-base md:text-xl text-gray-700 leading-relaxed italic px-2">
                    "{testimonials[currentIndex].content}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={next}
              className="absolute right-0 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-1 transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                98%
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Visa Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                10,000+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                50+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Countries Served
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
