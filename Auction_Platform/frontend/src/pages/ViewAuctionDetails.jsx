import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaHome, FaTrophy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  console.log(auctionDetail);

  const { user } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  const endTime = moment(auctionDetail?.endTime);
  const now = moment();
  const timeRemaining = endTime.diff(now, "minutes");
  const auctionEnded = timeRemaining <= 0;
  const showCurrentBid = auctionEnded || timeRemaining > 30;
  console.log(timeRemaining);

  return (
    <section className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-center">
        Auction Details
      </h1>
      <p className="text-lg text-gray-700 text-center mt-2">
        Explore the auction details, view bidders, and place your bid to win the
        auction.
      </p>
      {user?.role === "Bidder" && (
        <div className="mt-8 p-8 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-orange-600">Your Details</h2>
          <div className="flex items-center gap-8 mt-6">
            <img
              src={user.profileImage.url}
              alt={user.userName}
              className=" h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <div className="text-xl">
              <p className="font-semibold text-gray-800">
                Hello  {user.userName}
              </p>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Address: {user.address}</p>
              <p className="text-gray-700">Auctions Won: {user.auctionsWon}</p>
              <p className="text-gray-700">
                Money Spent:{" "}
                <span className="font-bold text-orange-500">
                  ${user.moneySpent}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center my-6">
        <Link
          to="/"
          className="text-white text-lg font-semibold px-6 py-3 bg-blue-600 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 flex items-center gap-2"
        >
          <FaHome className="text-2xl" /> Home
        </Link>
        <Link
          to="/view-my-auctions"
          className="text-white text-lg font-semibold px-6 py-3 bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2"
        >
          <FaTrophy className="text-2xl" /> View My Auctions
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-orange-500">Bidders</h2>
          {auctionBidders?.length > 0 ? (
            <ul className="mt-4">
              {auctionBidders.map((bidder, index) => (
                <li
                  key={bidder._id}
                  className="flex items-center gap-4 mb-2 p-2 border-b"
                >
                  <span className="text-gray-600 font-bold">{index + 1}.</span>
                  <img
                    src={bidder.profileImage}
                    alt={bidder.userName}
                    className="w-14 h-14 rounded-full border-2 border-orange-500"
                  />
                  <div>
                    <p className="font-medium">{bidder.userName}</p>

                    <p className="text-lg font-medium">
                      Current Bid: ${bidder?.amount}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No bids yet.</p>
          )}
        </div>

        <div className="col-span-2 bg-gray-50 p-6 rounded-lg shadow">
          <img
            src={auctionDetail?.image?.url}
            alt={auctionDetail?.title}
            className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-2xl font-bold mt-4 text-orange-500">
            {auctionDetail?.title}
          </h2>
          <p className="text-gray-700 mt-2">{auctionDetail?.description}</p>
          <p className="text-lg font-medium mt-2">
            Starting Bid: ${auctionDetail?.startingBid}
          </p>
          <p className="text-lg font-medium">
            Current Bid: ${auctionDetail?.currentBid}
          </p>

          <p className="text-gray-600 mt-2">
            Condition: {auctionDetail?.condition}
          </p>
          <p className="text-gray-600">Category: {auctionDetail?.category}</p>
          <p className="text-gray-600">End Time: {auctionDetail?.endTime}</p>
        </div>
      </div>

      {
        <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-center text-green-600">
            🎉 Auction Winner 🎉
          </h1>

          {/* Winner Details */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
            {auctionEnded ? (
              auctionBidders?.slice?.(0, 1)?.map((winner, index) => (
                <>
                  <img
                    src={winner.profileImage}
                    alt={winner.userName}
                    className=" h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300 border-green-500 shadow-md"
                  />
                  <h2 className="text-2xl font-semibold mt-4 text-gray-900">
                    {winner.userName}
                  </h2>
                  <p className="text-lg text-gray-700 mt-2">
                    Winning Bid:{" "}
                    <span className="font-bold text-green-600">
                      ${winner.amount}
                    </span>
                  </p>
                </>
              ))
            ) : (
              <p className="text-lg text-gray-700">No winner yet.</p>
            )}
          </div>

          {/* Auction Details */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">
              Auction Item
            </h2>
            <img
              src={auctionDetail?.image?.url}
              alt={auctionDetail?.title}
              className="w-full hover:scale-105 transition-transform duration-300 h-64 object-cover rounded-lg mt-4 shadow-md"
            />
            <h3 className="text-xl font-bold text-orange-500 mt-4">
              {auctionDetail?.title}
            </h3>
            <p className="text-gray-700 mt-2">{auctionDetail?.description}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-6">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-all"
            >
              🔙 Back to Home
            </Link>
            <Link
              to="/auctions"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-700 transition-all"
            >
              🔍 View Other Auctions
            </Link>
          </div>
        </div>
      }
    </section>
  );
};

export default ViewAuctionDetails;
