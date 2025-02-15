import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CountryListData } from "../../lib/data/DemoData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
              className={`${
                path === ""
                  ? "text-blue-400"
                  : isScrolled
                  ? "text-gray-700"
                  : "text-white"
              } hover:text-blue-400 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`${
                path === "services"
                  ? "text-blue-400"
                  : isScrolled
                  ? "text-gray-700"
                  : "text-white"
              } hover:text-blue-400 transition-colors`}
            >
              Services
            </Link>
            <Link
              to="/industries"
              className={`${
                path === "industries"
                  ? "text-blue-400"
                  : isScrolled
                  ? "text-gray-700"
                  : "text-white"
              } hover:text-blue-400 transition-colors`}
            >
              Industries
            </Link>

            <div className="relative">
              {/* Dropdown Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`${
                  path === "country"
                    ? "text-blue-400"
                    : isScrolled
                    ? "text-gray-700"
                    : "text-white"
                } hover:text-blue-400 transition-colors flex items-center`}
              >
                Serves
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 z-10 mt-2 w-44 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  {CountryListData.map((country, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={`/country/${country.slug}`}
                          onClick={() => setIsOpen(!isOpen)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {country.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <Link
              to="/about-us"
              className={`${
                path === "about-us"
                  ? "text-blue-400"
                  : isScrolled
                  ? "text-gray-700"
                  : "text-white"
              } hover:text-blue-400 transition-colors`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`${
                path === "contact"
                  ? "text-blue-400"
                  : isScrolled
                  ? "text-gray-700"
                  : "text-white"
              } hover:text-blue-400 transition-colors`}
            >
              Contact
            </Link>
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
