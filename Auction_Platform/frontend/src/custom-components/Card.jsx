import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Card = ({
  imgSrc,
  title,
  startingBid,
  startTime,
  endTime,
  id,
  description,
  currentBid, // Include current bid as prop
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const endMoment = moment(endTime);
  const now = moment();
  const timeRemaining = endMoment.diff(now, "minutes");
  const auctionEnded = timeRemaining <= 0;
  const showCurrentBid = auctionEnded || timeRemaining > 1440; // Only affects this card

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (now < start) {
      return { label: "Auction Starts In:", time: start - now };
    } else if (now >= start && now < end) {
      return { label: "Auction Ends In:", time: end - now };
    } else {
      return { label: "Auction Ended", time: 0 };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  function formatTime(ms) {
    if (ms <= 0) return "00:00:00";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
      />
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-900 group-hover:text-[#d6482b] mb-2">
          {title}
        </h5>
        <h6 className="text-gray-900 group-hover:text-[#ca9186] mb-2">
          {description}
        </h6>
        <p className="text-gray-700 font-medium text-lg">
        startingBid : ${startingBid}
        </p>
        {/* Show or Hide Current Bid */}
        {showCurrentBid ? (
          <p className="text-red-500 font-medium text-lg">
            Highest Bid: ${currentBid}
          </p>
        ) : (
          <p className="text-lg font-medium text-red-500">
            ⚠ Current bid is hidden
          </p>
        )}
        {/* Countdown Timer */}
        <div className="mt-3 p-2 bg-gray-100 rounded-lg text-center">
          <p className="text-sm font-semibold text-gray-800">
            {timeLeft.label}
          </p>
          <p className="text-xl font-bold text-red-600">
            {timeLeft.time > 0 ? formatTime(timeLeft.time) : "Auction Ended"}
          </p>
        </div>
        <button className="w-full mt-4 bg-[#d6482b] text-white py-2 rounded-md font-semibold hover:bg-[#b8381e] transition-all">
          View Auction
        </button>
      </div>
    </Link>
  );
};

export default Card;
