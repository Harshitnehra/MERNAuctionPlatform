import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Auctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const navigate = useNavigate();
  
  // Filter only live auctions
  const liveAuctions = allAuctions?.filter(
    (auction) =>
      moment(auction.startTime).isBefore(moment()) && // Auction has started
      moment(auction.endTime).isAfter(moment()) // Auction is not ended
  );

  return (
    <div className="p-20 bg-gradient-to-r from-orange-200 to-red-400 text-white">
      <h1 className="text-[#D6482B] text-7xl font-bold text-center mb-7">
        Live Auctions
      </h1>

      {liveAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveAuctions.map((auction) => (
            <div
              key={auction._id}
              className="border rounded-lg shadow-lg overflow-hidden cursor-pointer bg-white hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
              onClick={() => navigate(`/auction/item/${auction._id}`)}
            >
              <img
                src={auction.image.url}
                alt={auction.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <h2 className="text-xl font-bold">{auction.title}</h2>
                <p className="text-sm">
                  Category:{" "}
                  <span className="font-semibold">{auction.category}</span>
                </p>
                <p className="text-sm">
                  Condition:{" "}
                  <span className="font-semibold">{auction.condition}</span>
                </p>
                <p className="text-sm">{auction.description}</p>
                <p className="text-lg font-bold mt-2">
                  Starting Bid: ${auction.startingBid}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-semibold mt-10">
          ❌ No live auctions available at the moment. Check back later!
        </div>
      )}

      <div className="mt-10 text-center text-gray-700">
        <p className="text-lg font-semibold">
          Explore and bid on a variety of auctions. Find unique products and get
          the best deals in real-time!
        </p>
        <p className="text-sm">
          Stay updated with the latest auctions and never miss out on an
          opportunity.
        </p>
      </div>
    </div>
  );
};

export default Auctions;
