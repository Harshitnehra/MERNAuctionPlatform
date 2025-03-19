import { Link } from "react-router-dom";
import { FaUserPlus, FaSearch, FaGavel, FaTrophy } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-[#f9f9f9] text-[#393939] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#FF5A09]">How It Works</h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Follow these simple steps to start bidding and winning auctions on 
            <span className="font-semibold"> WinWave</span>.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          
          {/* Step 1 - Register */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaUserPlus className="text-5xl text-[#FF5A09] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">1. Sign Up</h3>
            <p className="text-gray-600 mt-2">
              Create an account in minutes and verify your email.
            </p>
          </div>

          {/* Step 2 - Browse Auctions */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaSearch className="text-5xl text-[#ec7f37] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">2. Explore Auctions</h3>
            <p className="text-gray-600 mt-2">
              Browse various auctions and find what interests you.
            </p>
          </div>

          {/* Step 3 - Place a Bid */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaGavel className="text-5xl text-[#be4f0c] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">3. Place Your Bid</h3>
            <p className="text-gray-600 mt-2">
              Enter your bid and compete with others in real-time.
            </p>
          </div>

          {/* Step 4 - Win & Pay */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaTrophy className="text-5xl text-[#393939] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">4. Win & Pay</h3>
            <p className="text-gray-600 mt-2">
              If you win, complete your payment and get your item!
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            to="/sign-up"
            className="bg-[#FF5A09] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#ec7f37] transition"
          >
            Get Started Now
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
