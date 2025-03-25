import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAuction } from "@/store/slices/auctionSlice";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  console.log(myAuctions);
  
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  const handleDeleteAuction = (id) => {
    dispatch(deleteAuction(id));
  };
  return (
    <section className="max-w-6xl mx-auto px-6 py-25">
      <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-15">
        My Auctions
      </h1>
      <p className="text-lg text-gray-700 mt-4 hover:text-red-600 transition-colors duration-300 mb-15 ">
        View and manage your auctions here. Each auction card contains important
        details such as the category, condition, starting bid, and current bid.
        Hover over the image for a closer look!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading your auctions...</p>
        ) : myAuctions.length === 0 ? (
          <p className="text-center text-gray-600">No auctions found.</p>
        ) : (
          myAuctions.map((auction) => (
            <div
              key={auction._id}
              className="bg-gradient-to-r from-orange-200 to-red-500 shadow-lg rounded-lg overflow-hidden p-6 transition-transform hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-lg h-48">
                <img
                  src={auction.image.url}
                  alt={auction.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mt-4">
                {auction.title}
              </h2>
              <p className="text-gray-600 mt-2">{auction.description}</p>
              <p className="text-gray-500 mt-1">Category: {auction.category}</p>
              <p className="text-gray-500">Condition: {auction.condition}</p>
              <p className="text-gray-700 font-medium mt-2">
                Starting Bid: ${auction.startingBid}
              </p>
              <p className="text-red-600 font-semibold">
                Current Bid: ${auction.currentBid}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Start: {new Date(auction.startTime).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                End: {new Date(auction.endTime).toLocaleString()}
              </p>

              {/* afte add */}
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  className="bg-stone-700 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-black"
                  to={`/auction/details/${auction._id}`}
                >
                  View Auction
                </Link>
                <button
                  className="bg-red-400 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleDeleteAuction(auction._id)}
                >
                  Delete Auction
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ViewMyAuctions;
