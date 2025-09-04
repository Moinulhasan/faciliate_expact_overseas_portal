import {
  ArrowRight,
  Clock,
  FileCheck,
  Globe,
  Plane,
  Shield,
  Users,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-indigo-900/95 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80")',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in leading-tight px-4">
            Your Trusted Partner for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Global Opportunities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Expert visa consultancy and international travel services. We
            simplify your journey abroad with professional guidance,
            comprehensive documentation support, and seamless ticket booking
            solutions.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 backdrop-blur-sm">
                <FileCheck className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-white/90 text-xs md:text-sm font-medium">
                Visa Processing
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 backdrop-blur-sm">
                <Plane className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-white/90 text-xs md:text-sm font-medium">
                Flight Booking
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 md:mb-3 backdrop-blur-sm">
                <Shield className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-white/90 text-xs md:text-sm font-medium">
                100% Success Rate
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-10 px-4">
            <button className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base font-medium">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm text-sm md:text-base font-medium">
              Free Consultation
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 text-white/80 text-xs md:text-sm px-4">
            <div className="flex items-center gap-2">
              <Users size={14} className="md:w-4 md:h-4" />
              <span>10,000+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="md:w-4 md:h-4" />
              <span>50+ Countries Served</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="md:w-4 md:h-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Cards */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full px-4">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-center text-white border border-white/20">
            <div className="text-lg md:text-2xl font-bold">98%</div>
            <div className="text-xs md:text-sm opacity-80">
              Visa Success Rate
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-center text-white border border-white/20">
            <div className="text-lg md:text-2xl font-bold">15+</div>
            <div className="text-xs md:text-sm opacity-80">
              Years Experience
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-center text-white border border-white/20">
            <div className="text-lg md:text-2xl font-bold">24/7</div>
            <div className="text-xs md:text-sm opacity-80">
              Customer Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
