import {
  Building,
  FileCheck,
  Globe,
  GraduationCap,
  Phone,
  Users,
} from "lucide-react";

const services = [
  {
    icon: <GraduationCap size={24} />,
    title: "Job Counseling",
    description:
      "Expert guidance on course selection and university admissions worldwide.",
  },
  {
    icon: <Globe size={24} />,
    title: "Visa Assistance",
    description:
      "Complete support for student visa applications and documentation.",
  },
  {
    icon: <Building size={24} />,
    title: "Recuritment Service",
    description:
      "Help finding suitable student accommodation in your destination country.",
  },
  {
    icon: <FileCheck size={24} />,
    title: "Document Processing",
    description:
      "Efficient handling of all necessary academic and legal documents.",
  },
  {
    icon: <Users size={24} />,
    title: "Career Guidance",
    description:
      "Professional advice on career paths and employment opportunities.",
  },
  {
    icon: <Phone size={24} />,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance for all your queries and concerns.",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive support services to ensure your educational journey is
            smooth and successful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
