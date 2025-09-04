import { useEffect } from "react";
import Hero from "../../components/home/Hero";
import Services from "../../components/home/Services";
import CountryList from "../../components/home/CountryList";
import Testimonials from "../../components/home/Testimonials";
import ContactForm from "../../components/home/ContactForm";
import GetInTouch from "../../components/global/GetInTouch";

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
      <CountryList />
      <Testimonials />
      <ContactForm />
      <GetInTouch />
    </main>
  );
}
