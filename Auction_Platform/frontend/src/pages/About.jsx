import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-[#f9f9f9] text-[#393939] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#FF5A09]">About Us</h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Welcome to <span className="font-semibold">WinWave</span>, where innovation meets bidding. 
            Our platform connects buyers and sellers through a seamless auction experience.
          </p>
        </div>

        {/* About Sections */}
        <div className="grid gap-12 md:grid-cols-3">
          
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#FF5A09]">Our Mission</h2>
            <p className="text-gray-700 mt-3">
              To create a trusted, transparent, and competitive marketplace for 
              buyers and sellers globally.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#FF5A09]">Our Vision</h2>
            <p className="text-gray-700 mt-3">
              To be the leading online auction platform, setting the benchmark for efficiency and reliability.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-[#FF5A09]">Our Values</h2>
            <p className="text-gray-700 mt-3">
              Integrity, transparency, and customer-centricity drive everything we do.
            </p>
          </div>

        </div>

        {/* Call-To-Action Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-[#393939]">Join Us Today!</h3>
          <p className="text-lg text-gray-600 mt-3">
            Experience the thrill of real-time auctions with WinWave.
          </p>
          <Link 
            to="/sign-up" 
            className="mt-6 inline-block bg-[#FF5A09] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#ec7f37] transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </section>
  );
};

export default About;
