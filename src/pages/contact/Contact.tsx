import {
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { useEffect } from "react";
import ContactForm from "../../components/global/ContactForm";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Contact() {
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
              'url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
              <MessageCircle size={16} className="mr-2" />
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
              Let's Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Journey Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-100">
              Ready to take the next step? Our expert team is here to guide you
              through every aspect of your international journey. Get in touch
              today for personalized assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're here to help you navigate your international journey.
                Reach out to us through any of these channels for expert
                guidance and support.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600 mb-1">rafik@facilitatexpat.com</p>
                  <p className="text-sm text-gray-500">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-600 mb-1">+880 17 1970 6041</p>
                  <p className="text-sm text-gray-500">
                    Available Mon-Fri, 9AM-6PM
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 mb-1">
                    18/3 Naya Paltan, Level-04/B,
                    <br />
                    Mashjid Goli, Dhaka-1000
                  </p>
                  <p className="text-sm text-gray-500">Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-2xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-sm text-gray-500">
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star size={24} className="mr-3" />
                Why Choose Us?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>98% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>50+ Countries Served</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Find Us on the Map
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our office in the heart of Dhaka for face-to-face
              consultation
            </p>
          </div>

          <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center">
              <Globe size={64} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Interactive Map Coming Soon
              </p>
              <p className="text-gray-500 text-sm">
                We're working on integrating a live map
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
