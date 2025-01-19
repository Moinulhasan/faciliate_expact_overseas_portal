import { useEffect } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: <GraduationCap size={32} />,
    title: "Oil and Gas Recruitment for Saudi Arabia in Bangladesh",
    description:
      "The oil and gas industry is one of the most dynamic and high-demand sectors globally, offering diverse job opportunities. We connect skilled professionals in Bangladesh with leading companies in Saudi Arabia. Our recruitment services cater to various roles, including:",
    // stats: {
    //   students: "0",
    //   universities: "0",
    //   countries: "0",
    // },
    image: "/images/service_oil.png",
    features: [
      "<strong>Welders:</strong> Experts in joining metals to ensure the structural integrity of pipelines and equipment.",
      "<strong>Fabricators:</strong> Professionals specializing in creating essential components for the oil and gas industry.",
      "<strong>Riggers:</strong> Skilled workers responsible for assembling and maintaining drilling equipment.",
      "<strong>Mud-Loggers:</strong> Specialists in monitoring drilling processes and analyzing geological data.",
      "<strong>Petroleum Engineers:</strong> Experts in optimizing oil extraction and production.",
      "<strong>Laborers:</strong> Dedicated workers supporting field operations.",
    ],
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Construction Industry Recruitment for Saudi Arabia in Bangladesh",
    description:
      "The construction industry is fundamental to infrastructure development, and Saudi Arabia has an ever-growing demand for experienced professionals. We help Bangladeshi workers secure top positions, including:",
    // stats: {
    //   students: "50,000+",
    //   universities: "200+",
    //   countries: "50+",
    // },
    image: "/images/service_construction.png",
    features: [
      "<strong>Construction Managers:</strong> Leaders managing projects from concept to completion.",
      "<strong>Construction Laborers:</strong> Essential workers for on-site operations.",
      "<strong>Mechanical Foremen:</strong> Supervisors ensuring smooth operations of mechanical systems.",
      "<strong>Civil Foremen:</strong> Leaders specializing in overseeing civil construction projects.",
      "<strong>Building Site Foremen:</strong> Experts in managing site activities efficiently.",
    ],
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Healthcare Recruitment for Saudi Arabia in Bangladesh",
    description:
      "Healthcare is a critical sector offering immense opportunities for skilled professionals. Our recruitment services match Bangladeshi experts with reputable healthcare facilities in Saudi Arabia. Positions include:",
    // stats: {
    //   students: "50,000+",
    //   universities: "200+",
    //   countries: "50+",
    // },
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
    features: [
      "<strong>Doctors and Physicians:</strong> Specialists across various disciplines ensuring quality patient care.",
      "<strong>Nurses:</strong> Compassionate caregivers dedicated to health and recovery.",
      "<strong>Dentists:</strong> Professionals providing dental care and oral health services.",
      "<strong>Pharmacists:</strong> Experts in dispensing medication and advising on health management.",
      "<strong>Lab Technicians:</strong> Specialists in diagnostic testing and analysis.",
    ],
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Banking and Finance Recruitment for Saudi Arabia in Bangladesh",
    description:
      "The banking and finance sector plays a pivotal role in economic growth. We help Bangladeshi professionals find rewarding careers in Saudi Arabia. Available positions include:",
    // stats: {
    //   students: "50,000+",
    //   universities: "200+",
    //   countries: "50+",
    // },
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
    features: [
      "<strong>Relationship Managers:</strong> Building and maintaining client relationships.",
      "<strong>Chief Financial Officers:</strong> Strategizing financial plans and overseeing operations.",
      "<strong>Human Resource Officers:</strong> Managing organizational workforce needs.",
      "<strong>Accountants:</strong> Ensuring financial accuracy and regulatory compliance.",
    ],
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Security Jobs Recruitment for Saudi Arabia in Bangladesh",
    description:
      "Safety and security are priorities in every organization, leading to a growing demand for skilled professionals. We recruit Bangladeshi candidates for roles such as:",
    // stats: {
    //   students: "50,000+",
    //   universities: "200+",
    //   countries: "50+",
    // },
    image: "/images/service_secuirity.png",
    features: [
      "<strong>Security Officers:</strong> Ensuring safety and order in various establishments.",
      "<strong>Security Managers:</strong> Overseeing security operations and staff.",
      "<strong>Security Site Supervisors:</strong> Leading on-site security teams.",
      "<strong>Front Desk Officers:</strong> Offering security and administrative support.",
      "<strong>Assistant/Deputy Security Managers:</strong> Supporting and managing security strategies.",
    ],
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Education and Training Recruitment for Saudi Arabia in Bangladesh",
    description:
      "Education and training are cornerstones of societal growth. We connect Bangladeshi educators and trainers with Saudi institutions. Roles include:",
    stats: {
      students: "50,000+",
      universities: "200+",
      countries: "50+",
    },
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80",
    features: [
      "<strong>Training Executives:</strong> Developing and delivering training programs.",
      "<strong>English Language Instructors:</strong> Teaching English to non-native speakers.",
      "<strong>Subject Specialists:</strong> Educators with expertise in specific fields.",
      "<strong>Front Desk Officers:</strong> Offering administrative and training support.",
      "<strong>Assistant/Deputy Managers:</strong> Supporting educational program development.",
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
    <div className="">
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
                {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-100 text-blue-600">
                  {industry.icon}
                </div> */}

                <h2 className="text-3xl font-bold text-gray-900">
                  {industry.title}
                </h2>
                <p className="text-lg text-gray-600">{industry.description}</p>

                {/* Stats Grid */}
                {/* <div className="grid grid-cols-3 gap-4 py-6">
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
                </div> */}

                {/* Features List */}
                <ul className="space-y-3">
                  {industry.features.map((feature, idx) => (
                    <li
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: feature.trim() }}
                      className="text-gray-700"
                    >
                      {/* <ArrowRight className="text-blue-600 mr-2" size={16} /> */}
                    </li>
                  ))}
                </ul>

                {/* <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all transform hover:scale-105">
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </button> */}
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
            If you need more customization or additional industries,
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            let me know!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-md hover:bg-blue-50 transition-all transform hover:scale-105"
          >
            Contact
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
