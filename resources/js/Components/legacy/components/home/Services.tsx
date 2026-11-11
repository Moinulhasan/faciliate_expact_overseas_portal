import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  FileCheck,
  Globe,
  MapPin,
  Plane,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <FileCheck size={32} />,
    title: "Visa Consultancy",
    description:
      "Professional guidance for all types of visas including student, work, business, tourist, and family visas. Expert document preparation and application support.",
    features: [
      "Document Verification",
      "Application Filing",
      "Interview Preparation",
      "Status Tracking",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Plane size={32} />,
    title: "Flight Booking",
    description:
      "Best deals on international flights with major airlines. Round-trip, one-way, and multi-city bookings with flexible cancellation options.",
    features: [
      "Best Price Guarantee",
      "24/7 Booking Support",
      "Flexible Cancellation",
      "Multi-Airline Options",
    ],
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Globe size={32} />,
    title: "Travel Planning",
    description:
      "Comprehensive travel planning including accommodation, local transportation, travel insurance, and itinerary customization.",
    features: [
      "Hotel Bookings",
      "Travel Insurance",
      "Local Transport",
      "Custom Itineraries",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Shield size={32} />,
    title: "Document Processing",
    description:
      "End-to-end document processing including passport renewal, birth certificates, police clearance, and all required legal documents.",
    features: [
      "Document Collection",
      "Legal Attestation",
      "Translation Services",
      "Express Processing",
    ],
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: <Users size={32} />,
    title: "Immigration Services",
    description:
      "Specialized immigration consulting for permanent residency, citizenship applications, and settlement services worldwide.",
    features: [
      "PR Applications",
      "Citizenship Services",
      "Settlement Support",
      "Legal Consultation",
    ],
    color: "from-red-500 to-red-600",
  },
  {
    icon: <Clock size={32} />,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support for all your travel and visa-related queries. Emergency assistance and real-time updates.",
    features: [
      "Live Chat Support",
      "Emergency Assistance",
      "Real-time Updates",
      "WhatsApp Support",
    ],
    color: "from-indigo-500 to-indigo-600",
  },
];

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(services.length / getCardsPerSlide())
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0
        ? Math.ceil(services.length / getCardsPerSlide()) - 1
        : prev - 1
    );
  };

  // Responsive cards per slide
  const getCardsPerSlide = () => {
    if (window.innerWidth < 768) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const startIndex = currentSlide * getCardsPerSlide();
  const visibleServices = services.slice(
    startIndex,
    startIndex + getCardsPerSlide()
  );

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 md:mb-6">
            <CheckCircle size={16} className="mr-2" />
            Trusted by 10,000+ Clients
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Comprehensive Travel & Visa Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            From visa applications to complete travel arrangements, we provide
            end-to-end solutions that make your international journey seamless
            and successful.
          </p>
        </div>

        {/* Services Slider */}
        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          {/* Services Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-16">
            {visibleServices.map((service, index) => (
              <div
                key={startIndex + index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Service Header with Icon and Title */}
                <div
                  className={`p-4 md:p-6 bg-gradient-to-r ${service.color} text-white`}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-4 md:p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-4 md:mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-xs md:text-sm text-gray-600"
                      >
                        <CheckCircle
                          size={14}
                          className="text-green-500 mr-2 flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/services"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:underline text-sm md:text-base"
                  >
                    Learn More
                    <svg
                      className="ml-2 w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8">
            {Array.from({
              length: Math.ceil(services.length / getCardsPerSlide()),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-1 transition-all ${
                  index === currentSlide
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100 mt-12 md:mt-20">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              We combine expertise, technology, and personalized service to
              deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield size={24} className="text-blue-600 md:w-8 md:h-8" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                98% Success Rate
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Proven track record in visa approvals
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock size={24} className="text-green-600 md:w-8 md:h-8" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Fast Processing
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Quick turnaround times for all services
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CreditCard
                  size={24}
                  className="text-purple-600 md:w-8 md:h-8"
                />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Best Prices
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Competitive rates and no hidden fees
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <MapPin size={24} className="text-orange-600 md:w-8 md:h-8" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Global Network
              </h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Partners in 50+ countries worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
