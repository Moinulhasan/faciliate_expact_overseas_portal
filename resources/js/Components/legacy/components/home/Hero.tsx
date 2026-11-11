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

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 animate-fade-in leading-tight px-4">
            Your Trusted Partner for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Global Opportunities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed px-4">
            Expert visa consultancy and international travel services. We
            simplify your journey abroad with professional guidance,
            comprehensive documentation support, and seamless ticket booking
            solutions.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6 max-w-3xl mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 md:mb-2 backdrop-blur-sm">
                <FileCheck className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-white/90 text-xs md:text-sm font-medium">
                Visa Processing
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 md:mb-2 backdrop-blur-sm">
                <Plane className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-white/90 text-xs md:text-sm font-medium">
                Flight Booking
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 md:mb-2 backdrop-blur-sm">
                <Shield className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-white/90 text-xs md:text-sm font-medium">
                100% Success Rate
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center mb-4 md:mb-6 px-4">
            <button className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base font-medium">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm text-sm md:text-base font-medium">
              Free Consultation
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 text-white/80 text-xs md:text-sm px-4 mb-4 md:mb-6">
            <div className="flex items-center gap-1.5">
              <Users size={12} className="md:w-3 md:h-3" />
              <span>10,000+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe size={12} className="md:w-3 md:h-3" />
              <span>50+ Countries Served</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="md:w-3 md:h-3" />
              <span>24/7 Support</span>
            </div>
          </div>

          {/* Stats Cards - Compact version */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center max-w-3xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 md:p-3 text-center text-white border border-white/20 flex-1 max-w-xs">
              <div className="text-base md:text-xl font-bold">98%</div>
              <div className="text-xs opacity-80">Visa Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 md:p-3 text-center text-white border border-white/20 flex-1 max-w-xs">
              <div className="text-base md:text-xl font-bold">15+</div>
              <div className="text-xs opacity-80">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 md:p-3 text-center text-white border border-white/20 flex-1 max-w-xs">
              <div className="text-base md:text-xl font-bold">24/7</div>
              <div className="text-xs opacity-80">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

