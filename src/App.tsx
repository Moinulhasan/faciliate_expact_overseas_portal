import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/home/Home";
import ServicesPage from "./pages/service/ServicesPage";
import IndustriesPage from "./pages/industry/IndustriesPage";
import AboutUs from "./pages/aboutus/AboutUs";
// import Blog from "./pages/blog/Blog";
// import BlogDetails from "./pages/blog/Details";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} /> */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
