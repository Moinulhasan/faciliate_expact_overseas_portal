import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  MapPin,
  Plane,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryListData } from "../../lib/data/DemoData";

const CountryList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Responsive cards per slide
  const getCardsPerSlide = () => {
    if (window.innerWidth < 768) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev + 1) % Math.ceil(CountryListData.length / getCardsPerSlide())
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0
        ? Math.ceil(CountryListData.length / getCardsPerSlide()) - 1
        : prev - 1
    );
  };

  const startIndex = currentSlide * getCardsPerSlide();
  const visibleCountries = CountryListData.slice(
    startIndex,
    startIndex + getCardsPerSlide()
  );

  const handleCountryClick = (countrySlug: string) => {
    navigate(`/country/${countrySlug}`);
  };

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30"
      id="countryList"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium mb-4 md:mb-6 border border-blue-200">
            <Globe size={16} className="mr-2" />
            Global Reach
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Popular Destinations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            We specialize in visa and travel services to these top destinations.
            Each country offers unique opportunities and our expert team ensures
            smooth processing with high success rates.
          </p>
        </div>

        {/* Countries Slider */}
        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all items-center justify-center hover:bg-gray-50 border border-gray-100"
          >
            <ChevronLeft size={24} className="text-gray-600 md:w-7 md:h-7" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all items-center justify-center hover:bg-gray-50 border border-gray-100"
          >
            <ChevronRight size={24} className="text-gray-600 md:w-7 md:h-7" />
          </button>

          {/* Countries Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-20">
            {visibleCountries.map((country) => {
              return (
                <div
                  key={country.id}
                  className="group bg-white rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden cursor-pointer relative"
                  onClick={() => handleCountryClick(country.slug)}
                >
                  {/* Premium Badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold shadow-lg">
                      <Star size={10} className="inline mr-1 md:w-3 md:h-3" />
                      Premium
                    </div>
                  </div>

                  {/* Country Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                        {country.name}
                      </h3>
                      <div className="flex items-center text-white/90 text-xs md:text-sm mb-2 md:mb-3">
                        <MapPin size={16} className="mr-2 md:w-4 md:h-4" />
                        <span>Visa Services Available</span>
                      </div>
                      <div className="flex items-center space-x-3 md:space-x-4 text-white/80 text-xs">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1 md:w-3 md:h-3" />
                          <span>5-15 days</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={12} className="mr-1 md:w-3 md:h-3" />
                          <span>98% Success</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Country Details */}
                  <div className="p-4 md:p-6">
                    {/* Services List */}
                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      {country.list.slice(0, 3).map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-xs md:text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                          <span className="font-medium">{service}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl group-hover:shadow-2xl text-sm md:text-base">
                      <span className="flex items-center justify-center">
                        Get Visa Quote
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform md:w-4 md:h-4"
                        />
                      </span>
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 md:mt-12">
            {Array.from({
              length: Math.ceil(CountryListData.length / getCardsPerSlide()),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full mx-1 md:mx-2 transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 md:mt-24 text-center">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl md:rounded-3xl p-8 md:p-16 border border-blue-100 shadow-xl">
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6 md:mb-8">
              <Globe size={16} className="mr-2 md:w-4 md:h-4" />
              Global Network
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
              Need a Different Destination?
            </h3>
            <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              We provide visa and travel services to over 50 countries
              worldwide. Contact us to learn about your specific destination
              requirements and get personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="inline-flex items-center px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-sm md:text-base">
                <Plane size={18} className="mr-2 md:mr-3 md:w-5 md:h-5" />
                Explore More Countries
              </button>
              <button className="inline-flex items-center px-6 py-3 md:px-10 md:py-5 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold shadow-lg hover:shadow-xl text-sm md:text-base">
                <Globe size={18} className="mr-2 md:mr-3 md:w-5 md:h-5" />
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryList;
