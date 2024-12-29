import { useEffect } from "react";
import Hero from "../../components/home/Hero";
import Services from "../../components/home/Services";
import Testimonials from "../../components/home/Testimonials";
import ContactForm from "../../components/home/ContactForm";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main>
      <Hero />
      <Services />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
