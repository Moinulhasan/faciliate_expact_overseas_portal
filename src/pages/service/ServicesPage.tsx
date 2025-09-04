import {
  CheckCircle,
  ChevronRight,
  FileCheck,
  Globe,
  Plane,
  Shield,
  Star,
  UserRoundSearch,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GetInTouch from "../../components/global/GetInTouch";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const detailedServices = [
  {
    id: 1,
    icon: <UserRoundSearch size={40} />,
    title: "Job Placement Assistance",
    description:
      "Comprehensive career guidance and job placement services for individuals seeking international opportunities. We connect skilled professionals with leading employers worldwide.",
    features: [
      "Personalized career assessment and skill mapping",
      "Professional resume and cover letter optimization",
      "Industry-specific career counseling and market insights",
      "Comprehensive interview preparation and coaching",
      "Direct employer connections and networking opportunities",
      "Post-placement support and career development guidance",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
    color: "from-blue-500 to-blue-600",
    stats: {
      successRate: "95%",
      placements: "5000+",
      countries: "25+",
    },
  },
  {
    id: 2,
    icon: <Globe size={40} />,
    title: "Visa Assistance",
    description:
      "Expert visa consultation and processing services for all types of international travel. From application to approval, we handle every detail with precision.",
    features: [
      "Comprehensive visa application processing and documentation",
      "Legal compliance verification and risk assessment",
      "Interview preparation and mock sessions",
      "Travel planning and itinerary coordination",
      "Post-visa support and compliance monitoring",
      "Emergency assistance and 24/7 consultation",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    color: "from-green-500 to-green-600",
    stats: {
      successRate: "98%",
      applications: "3000+",
      countries: "30+",
    },
  },
  {
    id: 3,
    icon: <FileCheck size={40} />,
    title: "Document Processing",
    description:
      "End-to-end document management services ensuring your paperwork meets international standards. Fast, reliable, and legally compliant processing.",
    features: [
      "Document authentication and legalization services",
      "Professional translation in 15+ languages",
      "Notarization and apostille services",
      "Digital document management and secure storage",
      "Express processing and priority handling",
      "Compliance verification and quality assurance",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
    color: "from-purple-500 to-purple-600",
    stats: {
      successRate: "99%",
      documents: "10000+",
      languages: "15+",
    },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/98 via-blue-800/95 to-indigo-900/98" />
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 opacity-30"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
              <Star size={16} className="mr-2" />
              Premium Services
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
              Our Comprehensive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Service Portfolio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-100">
              At Facilitate Expat, we specialize in providing comprehensive
              support for individuals seeking opportunities abroad. From job
              placement to visa services and document processing, we ensure your
              international journey is smooth and successful.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white -mt-20 relative z-20 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={40} className="text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={40} className="text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide end-to-end solutions that make your international journey
            seamless and successful.
          </p>
        </div>

        <div className="space-y-32">
          {detailedServices.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } scroll-fade-in`}
            >
              <div className="lg:w-1/2 space-y-8">
                {/* Service Header */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg flex-shrink-0`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Service Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  {Object.entries(service.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {value}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to={`/services/details/${service.id}`}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  Learn More
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              </div>

              <div className="lg:w-1/2 group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Professional service with {service.stats.successRate}{" "}
                        success rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 text-white">
            <h3 className="text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get professional assistance for your international career goals.
              Our expert team is here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                <Plane size={22} className="mr-3" />
                Get Started Today
              </button>
              <button className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold">
                <UserRoundSearch size={22} className="mr-3" />
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <GetInTouch />
    </div>
  );
}
