import { useEffect } from "react";
import { GraduationCap, HeartPulse, Briefcase, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const industries = [
  {
    icon: <GraduationCap size={32} />,
    title: "Higher Education",
    description:
      "Supporting universities and colleges in student recruitment and program development.",
    stats: {
      students: "50,000+",
      universities: "200+",
      countries: "50+",
    },
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80",
    features: [
      "International student recruitment",
      "Program development consulting",
      "Campus internationalization",
      "Student support services",
      "Academic partnerships",
    ],
  },
  {
    icon: <HeartPulse size={32} />,
    title: "Medical Education",
    description:
      "Specialized guidance for medical, dental, and healthcare education abroad.",
    stats: {
      placements: "5,000+",
      hospitals: "100+",
      specialties: "30+",
    },
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
    features: [
      "Medical school admissions",
      "Clinical rotations placement",
      "Licensing exam preparation",
      "Residency applications",
      "Healthcare career planning",
    ],
  },
  {
    icon: <Briefcase size={32} />,
    title: "Business Schools",
    description:
      "Expert consulting for MBA and business education programs worldwide.",
    stats: {
      graduates: "10,000+",
      schools: "150+",
      programs: "75+",
    },
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
    features: [
      "MBA program selection",
      "Business school applications",
      "GMAT/GRE preparation",
      "Career development",
      "Corporate partnerships",
    ],
  },
];

export default function IndustriesPage() {
  useScrollAnimation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="pt-16">
      {/* Hero Section with Parallax */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80")',
            transform: "translateZ(-1px) scale(2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/80" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Industries We Serve
            </h1>
            <p className="text-xl text-white/90 max-w-3xl animate-fade-in delay-100">
              Specialized educational consulting solutions across diverse
              sectors, helping institutions and students achieve their global
              education goals.
            </p>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-32">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } scroll-fade-in`}
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-100 text-blue-600">
                  {industry.icon}
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  {industry.title}
                </h2>
                <p className="text-lg text-gray-600">{industry.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 py-6">
                  {Object.entries(industry.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {value}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {industry.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <ArrowRight className="text-blue-600 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all transform hover:scale-105">
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>

              <div className="lg:w-1/2 group">
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-[500px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Educational Institution?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with us to enhance your global education initiatives and
            create meaningful impact in your sector.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-md hover:bg-blue-50 transition-all transform hover:scale-105">
            Schedule a Consultation
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
