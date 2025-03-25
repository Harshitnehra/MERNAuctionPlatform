import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdSearchOff } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  
  const today = moment().startOf("day");
  
  // Filter auctions uploaded today
  const todayAuctions = allAuctions?.filter((auction) =>
    moment(auction.createdAt).isSame(today, "day")
  );

  return (
    <section className="min-h-screen py-12 px-6 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-[#D6482B] mb-6 flex items-center gap-2">
        <RiAuctionFill /> Today's Auctions
      </h2>

      {todayAuctions?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {todayAuctions.map((auction) => (
            <Link
              to={`/auction/item/${auction._id}`}
              key={auction._id}
              className="bg-white p-5 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={auction.image?.url}
                alt={auction.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-3 text-gray-800">{auction.title}</h3>
              <p className="text-sm text-gray-600">Starting Bid: ${auction.startingBid}</p>
              <p className="text-sm text-gray-600">Starts: {moment(auction.startTime).format("LLL")}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <MdSearchOff className="text-gray-500 text-6xl mx-auto mb-4" />
          <p className="text-2xl font-semibold text-gray-700">No auctions uploaded today.</p>
          <p className="text-lg text-gray-600 mt-2">
            Don't worry! You can still browse our ongoing auctions.
          </p>
          <Link
            to="/auctions"
            className="mt-5 inline-block bg-[#D6482B] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#b93824] transition-all"
          >
            Browse Auctions
          </Link>
        </div>
      )}
    </section>
  );
};

export default UpcomingAuctions;
