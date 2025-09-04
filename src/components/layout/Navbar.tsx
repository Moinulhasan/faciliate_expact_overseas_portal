import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CountryListData } from "../../lib/data/DemoData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const path = location.pathname.split("/")[1] ?? "";

  const isActive = (pathName: string) => path === pathName;

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-indigo-900/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.svg"
                alt="Facilitate Expat Logo"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive("")
                  ? "bg-blue-500 text-white shadow-lg"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive("services")
                  ? "bg-blue-500 text-white shadow-lg"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              Services
            </Link>

            <Link
              to="/industries"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive("industries")
                  ? "bg-blue-500 text-white shadow-lg"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              Industries
            </Link>

            {/* Countries Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                  isActive("country")
                    ? "bg-blue-500 text-white shadow-lg"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    : "text-white hover:text-blue-200 hover:bg-white/10"
                }`}
              >
                <span>Countries</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className={`absolute right-0 z-20 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="p-6">
                  <div className="text-base font-semibold text-gray-900 mb-4">
                    All Countries ({CountryListData.length})
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 gap-1">
                      {CountryListData.map((country, index) => (
                        <Link
                          key={index}
                          to={`/country/${country.slug}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <img
                              src={country.image}
                              alt={country.name}
                              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                            />
                            <span className="font-medium truncate">
                              {country.name}
                            </span>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/about-us"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive("about-us")
                  ? "bg-blue-500 text-white shadow-lg"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive("contact")
                  ? "bg-blue-500 text-white shadow-lg"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Contact CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Phone size={16} className="mr-2" />
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    : "text-white hover:text-blue-200 hover:bg-white/10"
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive("")
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive("services")
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Services
            </Link>

            <Link
              to="/industries"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive("industries")
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Industries
            </Link>

            {/* Mobile Countries Section */}
            <div className="px-4 py-3">
              <div className="text-sm font-semibold text-gray-900 mb-3">
                Popular Countries
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CountryListData.slice(0, 6).map((country, index) => (
                  <Link
                    key={index}
                    to={`/country/${country.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  >
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="truncate">{country.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/about-us"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive("about-us")
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive("contact")
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>

            {/* Mobile CTA Button */}
            <div className="pt-3 border-t border-gray-100">
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Phone size={18} className="mr-2" />
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
