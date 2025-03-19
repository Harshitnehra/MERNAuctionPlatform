import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to AuctionHub</h1>
        <p className="text-lg mb-6">
          Bid, Win, and Sell Items in a Fair Auction Marketplace
        </p>
        <Link
          to={isAuthenticated ? "/auctions" : "/login"}
          className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
        >
          {isAuthenticated ? "Explore Auctions" : "Login / Register"}
        </Link>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-5xl py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {howItWorks.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-red-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Ready to Start Bidding?</h2>
        <p className="text-lg mt-2">Join thousands of users buying and selling today!</p>
        <Link
          to={isAuthenticated ? "/auctions" : "/sign-up"}
          className="mt-6 inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
        >
          {isAuthenticated ? "Browse Auctions" : "Sign Up Now"}
        </Link>
      </section>
    </div>
  );
};

export default Home;
