import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaGavel, FaSearch, FaTrophy, FaUserPlus } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_twt6uvi",
        "template_xw5a8we",
        templateParams,
        "xC6CmLtI6nRSQ9Ui4"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/contact");
      })
      .catch(() => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 p-6">
      <section className="text-center py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold">Welcome to WinWave</h1>
        <p className="text-lg mt-4 max-w-3xl mx-auto">
          Experience seamless online auctions with transparency and security.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            {
              icon: FaUserPlus,
              title: "Sign Up",
              text: "Create an account & verify email.",
            },
            {
              icon: FaSearch,
              title: "Explore Auctions",
              text: "Browse various listings.",
            },
            {
              icon: FaGavel,
              title: "Place Your Bid",
              text: "Compete in real-time bidding.",
            },
            {
              icon: FaTrophy,
              title: "Win & Pay",
              text: "Complete payment & receive your item.",
            },
          ].map(({ icon: Icon, title, text }, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <Icon className="text-6xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="text-gray-600 mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 py-10">
        {["Our Mission", "Our Vision", "Our Values"].map((title, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-orange-600">{title}</h2>
            <p className="text-gray-700 mt-3">
              {idx === 0
                ? "To create a trusted, transparent, and competitive marketplace for buyers and sellers globally."
                : idx === 1
                ? "To be the leading online auction platform, setting the benchmark for efficiency and reliability."
                : "Integrity, transparency, and customer-centricity drive everything we do."}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-100 to-purple-200 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">📞 Contact Us</h2>
        <p className="text-gray-600 text-lg mb-6">We would love to hear from you! Reach out to us at:</p>
        <div className="text-gray-700 space-y-4 text-lg">
          <p className="flex items-center justify-center gap-3">
            <span className="text-blue-500 text-2xl">✉️</span>
            <strong>Email:</strong> contact@example.com
          </p>
          <p className="flex items-center justify-center gap-3">
            <span className="text-green-500 text-2xl">📞</span>
            <strong>Phone:</strong> +123 456 7890
          </p>
          <p className="flex items-center justify-center gap-3">
            <span className="text-red-500 text-2xl">📍</span>
            <strong>Address:</strong> 123 Street, City, Country
          </p>
        </div>
      </div>
      {/* Contact Form */}
      <div className="max-w-lg mt-15 mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We'd love to hear from you!
        </p>
        <form onSubmit={handleContactForm} className="space-y-4">
          {[
            {
              type: "text",
              placeholder: "Your Name",
              value: name,
              setValue: setName,
            },
            {
              type: "email",
              placeholder: "Your Email",
              value: email,
              setValue: setEmail,
            },
            {
              type: "text",
              placeholder: "Your Phone",
              value: phone,
              setValue: setPhone,
            },
            {
              type: "text",
              placeholder: "Subject",
              value: subject,
              setValue: setSubject,
            },
          ].map(({ type, placeholder, value, setValue }, idx) => (
            <input
              key={idx}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          ))}
          <textarea
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
