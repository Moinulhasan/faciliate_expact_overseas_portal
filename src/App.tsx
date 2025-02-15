import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/service/ServicesPage";
import ServicesDetailsPage from "./pages/service/Details";
import IndustriesPage from "./pages/industry/IndustriesPage";
import IndustriesDetailsPage from "./pages/industry/Details";
import AboutUs from "./pages/aboutus/AboutUs";
// import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/Details";
import Contact from "./pages/contact/Contact";
import ContryDetails from "./pages/country/DetailsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route
            path="/industries/details/:id"
            element={<IndustriesDetailsPage />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <Route path="/blog" element={<Blog />} />*/}
          <Route path="/details/:id" element={<BlogDetails />} />
          <Route
            path="/services/details/:id"
            element={<ServicesDetailsPage />}
          />
          <Route path="/country/:slug" element={<ContryDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
