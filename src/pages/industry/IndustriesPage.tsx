import {
  BookOpen,
  Building2,
  Car,
  CheckCircle,
  ChevronRight,
  Factory,
  Globe,
  GraduationCap,
  Heart,
  Lock,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import GetInTouch from "../../components/global/GetInTouch";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

// Group industries by categories for better organization
const industryCategories = [
  {
    category: "Construction & Infrastructure",
    icon: <Building2 size={40} />,
    color: "from-blue-500 to-blue-600",
    industries: [
      {
        title: "Construction & Infrastructure",
        icon: <Building2 size={20} />,
        description:
          "Comprehensive manpower solutions for construction and infrastructure projects worldwide. We provide skilled, trained, and industry-certified personnel for all types of development projects.",
        image: "/images/service_construction.png",
        features: [
          "<strong>Civil Engineers & Site Supervisors:</strong> Experienced professionals with international project experience",
          "<strong>Skilled Workers:</strong> Certified masons, carpenters, electricians, and welders",
          "<strong>Modern Technologies:</strong> Training in latest construction methods and safety standards",
          "<strong>Project Support:</strong> End-to-end manpower solutions for all development types",
        ],
        stats: { experience: "15+ Years", projects: "500+", countries: "25+" },
      },
      {
        title: "MEP (Mechanical, Electrical & Plumbing)",
        icon: <Wrench size={20} />,
        description:
          "Specialized MEP professionals for construction and maintenance projects. Our certified technicians ensure quality installations and system integration.",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80",
        features: [
          "<strong>Certified Professionals:</strong> Licensed electricians, plumbers, and HVAC technicians",
          "<strong>Technical Expertise:</strong> Mechanical engineers and system integration specialists",
          "<strong>Installation & Maintenance:</strong> Complete MEP system support and ongoing services",
          "<strong>Quality Assurance:</strong> Compliance with international building codes and standards",
        ],
        stats: { experience: "12+ Years", projects: "300+", countries: "20+" },
      },
    ],
  },
  {
    category: "Industrial & Manufacturing",
    icon: <Factory size={40} />,
    color: "from-green-500 to-green-600",
    industries: [
      {
        title: "Oil & Gas",
        icon: <Zap size={20} />,
        description:
          "Critical sector manpower solutions with certified professionals for oil & gas operations. Our personnel meet the highest safety and compliance standards.",
        image: "/images/service_oil.png",
        features: [
          "<strong>Petroleum Engineers:</strong> Qualified professionals with offshore and onshore experience",
          "<strong>Skilled Technicians:</strong> Certified field operators and maintenance specialists",
          "<strong>Safety Compliance:</strong> Training in international safety protocols and standards",
          "<strong>Risk Management:</strong> Experienced personnel for critical operations",
        ],
        stats: { experience: "18+ Years", projects: "200+", countries: "15+" },
      },
      {
        title: "Manufacturing & Production",
        icon: <Factory size={20} />,
        description:
          "Qualified manufacturing personnel trained in modern industrial processes. We provide skilled workers for production, quality control, and operational excellence.",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
        features: [
          "<strong>Production Specialists:</strong> Skilled assembly workers and production supervisors",
          "<strong>Quality Control:</strong> Certified inspectors and compliance personnel",
          "<strong>Industrial Technicians:</strong> Machine operators and maintenance specialists",
          "<strong>Process Optimization:</strong> Experts in lean manufacturing and efficiency",
        ],
        stats: { experience: "14+ Years", projects: "400+", countries: "22+" },
      },
    ],
  },
  {
    category: "Services & Hospitality",
    icon: <Heart size={40} />,
    color: "from-purple-500 to-purple-600",
    industries: [
      {
        title: "Hospitality & Catering",
        icon: <Heart size={20} />,
        description:
          "Professional hospitality staff trained in international service standards. We provide personnel for hotels, restaurants, and catering services worldwide.",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
        features: [
          "<strong>Service Professionals:</strong> Trained waitstaff and customer service representatives",
          "<strong>Culinary Experts:</strong> Certified chefs and kitchen staff",
          "<strong>Management Staff:</strong> Hotel managers and hospitality supervisors",
          "<strong>Quality Standards:</strong> International service excellence training",
        ],
        stats: { experience: "10+ Years", projects: "150+", countries: "18+" },
      },
      {
        title: "Healthcare & Medical Services",
        icon: <Stethoscope size={20} />,
        description:
          "Qualified professionals compliant with international medical standards and regulations.",
        image:
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
        features: [
          "Medical Professionals & Nurses",
          "Caregivers & Healthcare Support Staff",
          "International Medical Standards",
          "Patient Care & Regulatory Compliance",
        ],
        stats: { experience: "16+ Years", projects: "350+", countries: "28+" },
      },
      {
        title: "Beauty, Spa & Wellness",
        icon: <Sparkles size={20} />,
        description:
          "Professionals trained in modern treatments and exceptional customer care services.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80",
        features: [
          "Beauty Therapists & Hairdressers",
          "Spa Attendants & Wellness Specialists",
          "Modern Treatments & Customer Care",
          "Hygiene Standards & Safety Protocols",
        ],
        stats: { experience: "8+ Years", projects: "250+", countries: "18+" },
      },
    ],
  },
  {
    category: "Security & Support",
    icon: <Shield size={40} />,
    color: "from-red-500 to-red-600",
    industries: [
      {
        title: "Security Services",
        icon: <Lock size={20} />,
        description:
          "Trained and licensed security personnel ensuring safety with modern security systems.",
        image: "/images/service_secuirity.png",
        features: [
          "Security Officers & Managers",
          "Site Supervisors & Front Desk Officers",
          "Modern Security Systems",
          "International Security Protocols",
        ],
        stats: { experience: "13+ Years", projects: "450+", countries: "24+" },
      },
      {
        title: "Facility Management & Maintenance",
        icon: <Settings size={20} />,
        description:
          "Trained manpower for commercial, residential, and industrial facility upkeep.",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
        features: [
          "Maintenance Specialists & Cleaners",
          "HVAC Experts & Building Supervisors",
          "Preventive Maintenance",
          "Compliance & Safety Standards",
        ],
        stats: { experience: "11+ Years", projects: "380+", countries: "21+" },
      },
    ],
  },
  {
    category: "Education & Transportation",
    icon: <BookOpen size={40} />,
    color: "from-orange-500 to-orange-600",
    industries: [
      {
        title: "Education & Training",
        icon: <GraduationCap size={20} />,
        description:
          "Specialized professionals delivering international curricula with language proficiency.",
        image:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80",
        features: [
          "Teaching Professionals & Lecturers",
          "Curriculum Specialists & Education Assistants",
          "Language Proficiency & Multilingual Education",
          "Professional Development & Continuous Learning",
        ],
        stats: { experience: "17+ Years", projects: "320+", countries: "26+" },
      },
      {
        title: "Transportation & Logistics",
        icon: <Truck size={20} />,
        description:
          "Professionals ensuring timely delivery and operational efficiency in supply chain operations.",
        image:
          "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80",
        features: [
          "Transportation Specialists & Drivers",
          "Logistics Coordinators & Warehouse Workers",
          "Fleet Operations & Supply Chain Support",
          "Operational Excellence & Customer Satisfaction",
        ],
        stats: { experience: "15+ Years", projects: "420+", countries: "23+" },
      },
      {
        title: "Taxi, Limousine & Chauffeur Services",
        icon: <Car size={20} />,
        description:
          "Trained and licensed drivers with local and international road knowledge.",
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80",
        features: [
          "Licensed Drivers & Chauffeurs",
          "Luxury Transport & VIP Services",
          "Local & International Road Knowledge",
          "Safety Awareness & Flexible Deployment",
        ],
        stats: { experience: "9+ Years", projects: "280+", countries: "19+" },
      },
    ],
  },
  {
    category: "Retail & Trading",
    icon: <ShoppingCart size={40} />,
    color: "from-indigo-500 to-indigo-600",
    industries: [
      {
        title: "Retail & Trading",
        icon: <Store size={20} />,
        description:
          "Professionals trained in modern retail systems and customer service excellence.",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80",
        features: [
          "Sales Professionals & Representatives",
          "Retail Operations & POS Systems",
          "Inventory Management & Stock Control",
          "Customer Excellence & Business Support",
        ],
        stats: { experience: "12+ Years", projects: "340+", countries: "20+" },
      },
    ],
  },
];

export default function IndustriesPage() {
  useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState(0);

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
              Global Industries
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
              Comprehensive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Industry Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-100">
              We provide skilled, trained, and industry-certified personnel
              across 16 major industries worldwide. Our workforce is carefully
              selected to minimize risk, enhance productivity, and ensure
              seamless integration.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white -mt-20 relative z-20 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={40} className="text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">16</div>
              <div className="text-gray-600">Industries</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={40} className="text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Categories Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industry Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive solutions across major industry sectors
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industryCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className="w-5 h-5 flex items-center justify-center">
                  {category.icon}
                </span>
                <span>{category.category}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active Category Industries */}
        <div className="space-y-8">
          {industryCategories[activeCategory].industries.map(
            (industry, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } scroll-fade-in`}
              >
                <div className="lg:w-1/2 space-y-6">
                  {/* Industry Header */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${industryCategories[activeCategory].color} text-white shadow-lg flex-shrink-0`}
                      >
                        {industry.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                        {industry.title}
                      </h3>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {industry.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <span
                          className="text-sm text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: feature }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Industry Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {Object.entries(industry.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-blue-600 mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-sm">
                    Get Manpower Quote
                    <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>

                <div className="lg:w-1/2 group">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Overlay Content */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {industry.title}
                        </h4>
                        <p className="text-gray-700 text-xs">
                          Professional manpower with proven track record
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Scale Your Operations?
          </h3>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Get access to skilled, trained, and industry-certified personnel
            across all major sectors. Our comprehensive solutions ensure your
            success in any industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
              <Users size={22} className="mr-3" />
              Get Manpower Quote
            </button>
            <button className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold">
              <Globe size={22} className="mr-3" />
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <GetInTouch />
    </div>
  );
}
