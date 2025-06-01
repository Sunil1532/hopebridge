import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";
import logo from "../assets/logo.png";

// Import DonateSection here
import DonateSection from "../components/DonateSection";

function Landingpage() {
  const footerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    gsap.from(".hero-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".hero-text", { y: 30, opacity: 0, delay: 0.3, duration: 1 });
    gsap.from(".hero-button", { scale: 0.8, opacity: 0, delay: 0.6, duration: 1 });
  }, []);

  return (
    <div className="bg-[#E6F0FA] text-[#1F2937] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 bg-[#E6F0FA] shadow-md z-10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="HopeBridge Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-[#2563EB]">HopeBridge</h1>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              ☰
            </button>
          </div>
          <div
            className={`space-x-6 text-sm flex-col md:flex-row md:flex items-center ${
              menuOpen ? "flex" : "hidden"
            } md:!flex absolute md:static top-full left-0 w-full md:w-auto bg-[#E6F0FA] md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}
          >
            <button
              onClick={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-[#2563EB]"
            >
              About Us
            </button>
            <button
              onClick={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-[#2563EB]"
            >
              Contact Us
            </button>
            <button
              onClick={redirectToLogin}
              className="px-4 py-1 rounded-full bg-[#3B82F6] text-white hover:bg-[#2563EB] font-semibold transition"
            >
              Login
            </button>
          </div>
        </nav>
      </header>

      {/* Replace Hero Section with DonateSection */}
      <DonateSection />

      {/* Testimonial Carousel */}
      <section className="bg-white py-10">
        <h3 className="text-2xl font-bold text-center text-[#2563EB] mb-6">
          What People Say
        </h3>
        <div className="max-w-4xl mx-auto overflow-hidden relative px-4">
          <div className="flex gap-6 animate-slide">
            <div className="min-w-full p-6 bg-[#EFF6FF] rounded-xl shadow-md" data-aos="fade-up">
              <p className="text-gray-700 italic">
                “HopeBridge changed my life by helping me reach someone truly in need.”
              </p>
              <p className="mt-2 font-semibold text-[#1F2937]">— Priya Nair, Donor</p>
            </div>
            <div className="min-w-full p-6 bg-[#EFF6FF] rounded-xl shadow-md" data-aos="fade-up">
              <p className="text-gray-700 italic">“Volunteering here gave me purpose and connection.”</p>
              <p className="mt-2 font-semibold text-[#1F2937]">— Ramesh Kumar, Volunteer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Info Section */}
      <section className="bg-[#F0F9FF] py-12 px-4">
        <div className="max-w-5xl mx-auto text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-[#2563EB] mb-4">Your Support Matters</h3>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            Every donation you make helps us provide food, shelter, education, and healthcare to children in need.
            Together, we can build a better future.
          </p>
         
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#F3F4F6] py-10 mt-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 items-start text-center md:text-left">
          <div className="flex-1" data-aos="fade-right">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-700">
              HopeBridge is a non-profit organization dedicated to bringing hope to orphaned and underprivileged children by
              providing them with education, care, and opportunities to thrive.
            </p>
          </div>
          <div className="md:block h-full border-l-2 border-[#2563EB] mx-6"></div>
          <div className="flex-1" data-aos="fade-left">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700">Email: contact@hopebridge.org</p>
            <p className="text-gray-700">Phone: +91 9876543210</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landingpage;
