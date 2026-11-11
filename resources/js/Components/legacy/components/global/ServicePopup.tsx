import { CheckCircle, Shield, Star, X, Zap } from "lucide-react";

interface ServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceData: {
    overview: string;
    categories?: string[];
    expertise?: string[];
    keyFeatures: string[];
    whyChooseUs: string[];
  };
}

const ServicePopup = ({
  isOpen,
  onClose,
  serviceName,
  serviceData,
}: ServicePopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-6">
          <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{serviceName}</h2>
                <p className="text-blue-100 text-xs mt-1">
                  Premium Service Details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-8">
            {/* Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Overview</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {serviceData.overview}
              </p>
            </div>

            {/* Categories or Expertise */}
            {(serviceData.categories || serviceData.expertise) && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {serviceData.categories
                      ? "Service Categories"
                      : "Our Expertise"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(serviceData.categories || serviceData.expertise)?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 bg-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Key Features
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceData.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-white rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Why Choose Us
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceData.whyChooseUs.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-white rounded-xl border border-orange-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Ready to get started? Contact our experts today!
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Close
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                Contact Us Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePopup;
