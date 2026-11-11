import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const GetInTouch = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 md:mb-6 border border-white/30">
            <MessageCircle size={16} className="mr-2" />
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
            Our expert team is here to guide you through every step of your
            international journey. Get in touch today for personalized
            assistance and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Mail size={24} className="text-white md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Email Us
            </h3>
            <p className="text-blue-100 mb-2 md:mb-3 text-sm md:text-base">
              rafik@facilitatexpat.com
            </p>
            <p className="text-blue-200 text-xs md:text-sm">
              24-hour response time
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Phone size={24} className="text-white md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Call Us
            </h3>
            <p className="text-blue-100 mb-2 md:mb-3 text-sm md:text-base">
              +880 17 1970 6041
            </p>
            <p className="text-blue-200 text-xs md:text-sm">Mon-Fri, 9AM-6PM</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <MapPin size={24} className="text-white md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Visit Us
            </h3>
            <p className="text-blue-100 mb-2 md:mb-3 text-sm md:text-base">
              Dhaka, Bangladesh
            </p>
            <p className="text-blue-200 text-xs md:text-sm">
              Face-to-face consultation
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 md:px-10 md:py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-sm md:text-base"
          >
            <MessageCircle size={18} className="mr-2 md:mr-3 md:w-5 md:h-5" />
            Contact Us Now
            <ArrowRight size={18} className="ml-2 md:ml-3 md:w-5 md:h-5" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 md:px-10 md:py-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-semibold text-sm md:text-base"
          >
            Explore Our Services
            <ArrowRight size={18} className="ml-2 md:ml-3 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
