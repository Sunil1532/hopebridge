import { useState } from "react";
import Qr from "../assets/upi.png"
export default function DonateSection() {
  const [showQR, setShowQR] = useState(false);

  const handleDonate = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href =
        "upi://pay?pa=8340010778-2@ybl&pn=Thati%20Sunil&tn=Donation%20for%20Children&cu=INR";
    } else {
      setShowQR(true);
    }
  };

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-center px-6"
      style={{
        background: "linear-gradient(135deg, #E6F0FF 0%, #CCE4FF 100%)",
      }}
    >
      <div className="max-w-2xl px-8">
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900"
          style={{ textShadow: "1px 1px 3px rgba(75, 85, 99, 0.3)" }}
        >
          Empower a Child’s Future
        </h2>
        <p
          className="text-lg md:text-xl mb-6 text-indigo-800"
          style={{ textShadow: "1px 1px 2px rgba(75, 85, 99, 0.2)" }}
        >
          Join us in lighting up lives. Your contribution can provide education,
          care, and hope to children in need.
        </p>

        <button
          onClick={handleDonate}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          Donate Now
        </button>

        {showQR && (
          <div className="mt-8 flex flex-col items-center">
            <p className="mb-2 text-lg font-semibold text-gray-700">
              Scan to Donate:
            </p>
            <img
              src={Qr}
              alt="UPI QR Code"
              className="w-64 h-64 rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
