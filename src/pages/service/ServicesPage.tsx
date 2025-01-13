import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  Globe,
  GraduationCap,
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const detailedServices = [
  {
    id: 1,
    icon: <GraduationCap size={32} />,
    title: "Academic Counseling",
    description:
      "We provide expert guidance for students aiming to study in top universities worldwide. Our team helps with:",
    features: [
      "Personalized university selection based on your goals and preferences.",
      "Crafting effective application strategies.",
      "Aligning course selection with career aspirations.",
      "Academic profile evaluation and enhancement.",
      "Guidance on meeting university admission requirements.",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    icon: <Globe size={32} />,
    title: "Visa Assistance",
    description:
      "Navigating the complexities of visa applications can be daunting. We're here to simplify the process with:",
    features: [
      "Comprehensive visa application processing.",
      "Document verification and legal compliance checks.",
      "Preparation for visa interviews.",
      "Travel guidance and itinerary planning.",
      "Support for post-visa formalities.",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    icon: <FileCheck size={32} />,
    title: "Document Processing",
    description:
      "Efficiently handling your documents is key to a stress-free journey abroad. Our services include:",
    features: [
      "Authentication and legalization of academic and professional documents.",
      "Translation services to meet global standards.",
      "Assistance with notarization.",
      "Digital document management for easy access.",
      "Application tracking for timely updates.",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
  },
];

export default function ServicesPage() {
  useScrollAnimation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in">
            Welcome to Facilitat Expat Services
          </h1>
          <p className="text-xl text-white/90 animate-fade-in">
            At Facilitat Expat, we specialize in providing comprehensive support
            for students and job seekers looking to achieve their dreams abroad.
            From academic counseling to visa assistance and document processing,
            we ensure your journey is smooth and successful.
          </p>
        </div>
      </div>

      {/* Detailed Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-24">
          {detailedServices.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2">
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/details/${service.id}`}
                  className="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Facilitat Expat is dedicated to making your overseas journey a
            success. With personalized support, industry expertise, and a
            client-focused approach, we strive to exceed your expectations.
          </p>
          <Link
            to={"/contact"}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
