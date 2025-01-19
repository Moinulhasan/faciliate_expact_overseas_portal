import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const path = location.pathname.split("/")[1] ?? "";

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-r from-[#0f172a]/95 via-[#1e293b]/90 to-[#1f51d0c2]/95 backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* <span className="text-2xl font-bold text-blue-600">EduConsult</span> */}
            <Link to="/">
              <img
                src={"/images/logo.svg"}
                alt="EduConsult Logo"
                className="w-20 h-20"
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isScrolled ? "text-gray-700" : "text-white"} ${
                path === "" ? "text-blue-400 transition-colors" : ""
              } hover:text-blue-400 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`${isScrolled ? "text-gray-700" : "text-white"} ${
                path === "services" ? "text-blue-400 transition-colors" : ""
              } hover:text-blue-400 transition-colors`}
            >
              Services
            </Link>
            <Link
              to="/industries"
              className={`${isScrolled ? "text-gray-700" : "text-white"} ${
                path === "industries" ? "text-blue-400 transition-colors" : ""
              } hover:text-blue-400 transition-colors`}
            >
              Industries
            </Link>
            <Link
              to="/about-us"
              className={`${isScrolled ? "text-gray-700" : "text-white"} ${
                path === "about-us" ? "text-blue-400 transition-colors" : ""
              } hover:text-blue-400 transition-colors`}
            >
              About Us
            </Link>
            {/* <Link
              to="/blog"
              className={`${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-blue-400 transition-colors`}
            >
              Blog
            </Link> */}
            <Link
              to="/contact"
              className={`${isScrolled ? "text-gray-700" : "text-white"} ${
                path === "contact" ? "text-blue-400 transition-colors" : ""
              } hover:text-blue-400 transition-colors`}
            >
              Contact
            </Link>

            {/* <button className="text-gray-700 hover:text-blue-600">
              <Search size={20} />
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          {/* Update the mobile menu button color */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-blue-400`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              to="/industries"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Industries
            </Link>
            <Link
              to="/about-us"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>
            {/* <Link
              to="/blog"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Blog
            </Link> */}
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
