import {
  ArrowRight,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <Globe size={20} className="text-white md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">
                  Facilitate Expat
                </h3>
                <p className="text-blue-200 text-xs md:text-sm">
                  Overseas Limited
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed max-w-md text-sm md:text-base">
              Your trusted partner in international visa services, job
              placement, and overseas opportunities. With 15+ years of
              experience, we've helped thousands of individuals achieve their
              global dreams.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex items-center space-x-3 text-gray-300 text-sm md:text-base">
                <Phone size={14} className="text-blue-400 md:w-4 md:h-4" />
                <span>+880 17 1970 6041</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm md:text-base">
                <Mail size={14} className="text-blue-400 md:w-4 md:h-4" />
                <span>rafik@facilitatexpat.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm md:text-base">
                <MapPin size={14} className="text-blue-400 md:w-4 md:h-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <Facebook size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <Twitter size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <Instagram size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <Linkedin size={16} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white">
              Our Services
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Visa Assistance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Job Placement
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Document Processing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Manpower Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm md:text-base"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:w-3 md:h-3"
                  />
                  Travel Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/10">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
              Stay Updated
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Subscribe to our newsletter for the latest visa updates, job
              opportunities, and travel insights.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/20 placeholder-gray-400 text-sm md:text-base"
            />
            <button
              type="submit"
              className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 font-semibold shadow-lg text-sm md:text-base"
            >
              <Mail size={18} className="md:w-5 md:h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400">
              <span>
                © {new Date().getFullYear()} Facilitate Expat Overseas Limited
              </span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Star size={12} className="text-yellow-400 md:w-3 md:h-3" />
                <span>98% Success Rate</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Globe size={12} className="text-blue-400 md:w-3 md:h-3" />
                <span>50+ Countries Served</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
