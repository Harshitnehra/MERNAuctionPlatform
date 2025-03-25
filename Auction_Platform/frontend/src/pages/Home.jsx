import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";

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

  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(user);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between text-center py-20 px-10 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="md:w-1/2 flex flex-col items-center relative">
          {user?.role == "Bidder" ||
          user?.role == "Auctioneer" ||
          user?.role == "Super Admin" ? (
            <img
              src={user?.profileImage?.url}
              alt="Profile"
              className="w-48 h-48 hover:scale-105 transition-transform duration-300 object-cover rounded-full shadow-lg border-4 border-white"
            />
          ) : (
            <div className="bg-red text-white-600 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold">Welcome, Guest!</h2>
              <p className="text-lg mb-4">
                Join us to participate in exciting auctions and win amazing
                deals.
              </p>
              <Link
                to="/sign-up"
                className="mt-8 bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
              >
                Sign Up Now
              </Link>
            </div>
          )}
        </div>
        <div className="md:w-1/2 text-left">
          <h1 className="text-5xl font-bold mb-4">Welcome to AuctionHub</h1>
          <p className="text-lg mb-6">
            {isAuthenticated
              ? `Glad to see you, ${user?.userName}! Ready to bid on your next item?`
              : "Bid, Win, and Sell Items in a Fair Auction Marketplace"}
          </p>
          <Link
            to={isAuthenticated ? "/auctions" : "/login"}
            className="mt-6 bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          >
            {isAuthenticated ? "Explore Auctions" : "Login / Register"}
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-5xl py-16 px-6 ">
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
      <FeaturedAuctions></FeaturedAuctions>
      <Leaderboard></Leaderboard>
      <UpcomingAuctions></UpcomingAuctions>

      {/* Call to Action */}
      <section className="w-full flex flex-col items-center text-center py-20 bg-gradient-to-r from-blue-500 to-red-600 text-white">
        <h2 className="text-3xl font-bold">Ready to Start Bidding?</h2>
        <p className="text-lg mt-2">
          Join thousands of users buying and selling today!
        </p>
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
