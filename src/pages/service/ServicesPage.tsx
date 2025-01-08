import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  Globe,
  GraduationCap,
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const detailedServices = [
  {
    icon: <GraduationCap size={32} />,
    title: "Job Counseling",
    description:
      "Expert guidance on course selection and university admissions worldwide.",
    features: [
      // "Personalized university selection",
      "Oil & GAS",
      "Course alignment with career goals",
      "Application strategy planning",
      "Academic profile evaluation",
      "Admission requirement guidance",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
  },
  {
    icon: <Globe size={32} />,
    title: "Visa Assistance",
    description:
      "Complete support for student visa applications and documentation.",
    features: [
      "Visa application processing",
      "Document verification",
      "Interview preparation",
      "Travel guidance",
      "Post-visa support",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
  },
  {
    icon: <FileCheck size={32} />,
    title: "Document Processing",
    description:
      "Efficient handling of all necessary academic and legal documents.",
    features: [
      "Document authentication",
      "Translation services",
      "Notarization assistance",
      "Digital document management",
      "Application tracking",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
  },
  // ... other services
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
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl animate-fade-in">
            {/* Comprehensive educational consulting services to help you achieve
            your academic goals and build a successful future. */}
            We are providing manpower services all over the world. Our
            recruiting team provides human resource solutions for all major job
            sectors and industries
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
                <button className="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </button>
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
            Ready to Start Your Educational Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation and learn how we can
            help you achieve your academic goals.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Contact Us
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
