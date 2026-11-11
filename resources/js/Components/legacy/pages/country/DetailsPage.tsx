import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileCheck,
  Plane,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ServicePopup from "../../components/global/ServicePopup";
import { CountryListData } from "../../lib/data/DemoData";

const DetailsPage = () => {
  const { slug } = useParams();
  const [country, setCountry] = useState<{
    id: number;
    name: string;
    image: string;
    details: string[];
    list: string[];
    services?: any;
  } | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setCountry(CountryListData.find((item) => item.slug === slug) || null);
  }, [slug]);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Country Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The country you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{
            backgroundImage: `url('${country.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-black/80" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {country.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Professional visa and travel services for {country.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white -mt-20 relative z-10 mx-4 sm:mx-8 lg:mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                5-15 Days
              </div>
              <div className="text-gray-600">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About {country.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-6 md:p-8 border border-gray-100">
            <div className="space-y-4">
              {country.details.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services in {country.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {country.list.map((service: string, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Professional visa and travel services tailored for{" "}
                      {country.name}. Our expert team ensures smooth processing
                      and high success rates.
                    </p>
                    <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700">
                      Click to learn more →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey to {country.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get professional visa assistance and travel planning services. Our
            experts are here to make your international journey seamless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold">
              <FileCheck size={20} className="mr-2" />
              Get Visa Quote
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold">
              <Plane size={20} className="mr-2" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Service Popup */}
      {selectedService && country?.services?.[selectedService] && (
        <ServicePopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          serviceName={selectedService}
          serviceData={country.services[selectedService]}
        />
      )}
    </div>
  );
};

export default DetailsPage;
