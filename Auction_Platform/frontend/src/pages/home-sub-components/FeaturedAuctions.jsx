import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  // console.log(allAuctions);

  return (
    <section className="w-full py-12 px-6 bg-gradient-to-r from-blue-200 to-red-200 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Featured Auctions Heading */}
        <h3 className="bg-gradient-to-r from-[#fa2a00] to-[#473c3c] text-transparent bg-clip-text text-5xl font-bold text-center mb-8">
          Featured Auctions
        </h3>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#d6482b] rounded-full animate-spin"></div>
          </div>
        ) : allAuctions?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            {allAuctions.map((auction) => (
              <Card
                key={auction._id}
                title={auction.title}
                imgSrc={auction.image?.url}
                startTime={auction.startTime}
                endTime={auction.endTime}
                startingBid={auction.startingBid}
                description={auction.description}
                currentBid={auction.currentBid}
                id={auction._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg mt-8">No auctions available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedAuctions;
