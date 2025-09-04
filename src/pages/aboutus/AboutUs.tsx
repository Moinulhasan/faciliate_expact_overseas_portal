import {
  ArrowRight,
  Award,
  CheckCircle,
  Eye,
  Globe,
  Heart,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import GetInTouch from "../../components/global/GetInTouch";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function AboutUs() {
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
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-indigo-900/95" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
              <Star size={16} className="mr-2" />
              About Our Company
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Facilitate Expat
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-100">
              Transforming global opportunities through expert visa consultancy
              and innovative travel solutions. We bridge the gap between dreams
              and reality, making international success accessible to all.
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Partner for Global Success
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Facilitate Expat, we are more than just a consultancy firm. We
            are your dedicated partners in achieving international success,
            providing comprehensive visa and travel services that open doors to
            global opportunities.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="scroll-fade-in">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 h-full">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-8">
                <Target size={40} className="text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower individuals worldwide by providing expert visa
                consultancy and travel services that bridge international
                boundaries. We are committed to making global opportunities
                accessible through professional guidance, innovative solutions,
                and unwavering support.
              </p>
            </div>
          </div>
          <div className="scroll-fade-in">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 h-full">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-8">
                <Eye size={40} className="text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the global leader in visa consultancy and international
                travel services, fostering cross-border opportunities while
                maintaining the highest standards of professionalism, integrity,
                and client satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our every action and decision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={32} />,
                title: "Client-Centric",
                description:
                  "Your success is our priority. We put your needs first in everything we do.",
                color: "from-red-100 to-red-200",
                iconColor: "text-red-600",
              },
              {
                icon: <Shield size={32} />,
                title: "Integrity",
                description:
                  "We maintain the highest ethical standards and transparency in all our services.",
                color: "from-blue-100 to-blue-200",
                iconColor: "text-blue-600",
              },
              {
                icon: <Zap size={32} />,
                title: "Excellence",
                description:
                  "We strive for excellence in every service, ensuring the best possible outcomes.",
                color: "from-yellow-100 to-yellow-200",
                iconColor: "text-yellow-600",
              },
              {
                icon: <Globe size={32} />,
                title: "Global Reach",
                description:
                  "Our extensive network spans across continents, connecting you to opportunities worldwide.",
                color: "from-green-100 to-green-200",
                iconColor: "text-green-600",
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Innovation",
                description:
                  "We continuously evolve our services to meet the changing needs of our global clients.",
                color: "from-purple-100 to-purple-200",
                iconColor: "text-purple-600",
              },
              {
                icon: <Users size={32} />,
                title: "Collaboration",
                description:
                  "We believe in the power of partnerships and work closely with clients to achieve success.",
                color: "from-indigo-100 to-indigo-200",
                iconColor: "text-indigo-600",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <div className={value.iconColor}>{value.icon}</div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Impact in Numbers
            </h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Trusted by thousands of clients worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                number: "15+",
                label: "Years Experience",
                icon: <Award size={40} />,
              },
              {
                number: "10,000+",
                label: "Happy Clients",
                icon: <Users size={40} />,
              },
              {
                number: "50+",
                label: "Countries Served",
                icon: <Globe size={40} />,
              },
              {
                number: "98%",
                label: "Success Rate",
                icon: <CheckCircle size={40} />,
              },
            ].map((stat, index) => (
              <div key={index} className="scroll-fade-in">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Facilitate Expat?
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We stand out from the competition with our unique approach and
            proven track record
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield size={32} />,
              title: "Proven Track Record",
              description:
                "15+ years of successful visa processing with a 98% success rate across all services.",
            },
            {
              icon: <Globe size={32} />,
              title: "Global Network",
              description:
                "Extensive partnerships and connections in over 50 countries worldwide.",
            },
            {
              icon: <Users size={32} />,
              title: "Expert Team",
              description:
                "Certified professionals with deep knowledge of international visa requirements.",
            },
            {
              icon: <Zap size={32} />,
              title: "Fast Processing",
              description:
                "Efficient service delivery with most applications processed within 5-15 days.",
            },
            {
              icon: <Heart size={32} />,
              title: "Personalized Service",
              description:
                "Tailored solutions and dedicated support for each client's unique needs.",
            },
            {
              icon: <Star size={32} />,
              title: "24/7 Support",
              description:
                "Round-the-clock assistance and support for all your queries and concerns.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-blue-600">{feature.icon}</div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Global Journey?
          </h3>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful clients who have achieved their
            international dreams with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
              <ArrowRight size={22} className="mr-3" />
              Get Started Today
            </button>
            <button className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold">
              <Users size={22} className="mr-3" />
              Contact Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Get In Touch Section */}
      <GetInTouch />
    </div>
  );
}
