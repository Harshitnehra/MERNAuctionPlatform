import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);
  return (
    <>
    <section className="my-8 lg:px-5 w-[80%] mx-auto">
      {/* Leaderboard Heading */}
      <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2 items-center justify-center">
        <h3 className="bg-gradient-to-r from-[#D6482B] to-[#111] text-transparent bg-clip-text text-5xl font-bold text-center">
          Top 10 Bidders Leaderboard
        </h3>
      </div>
  
      {/* Table */}
      <div className="overflow-x-auto mt-5 rounded-lg shadow-lg bg-white">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-lg">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Profile Pic</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Bid Expenditure</th>
              <th className="py-3 px-4 text-left">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leaderboard.slice(0, 10).map((element, index) => (
              <tr
                key={element._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4 text-center font-semibold text-gray-500">
                  {index + 1}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={element.profileImage?.url}
                    alt={element.username}
                    className="h-12 w-12 object-cover rounded-full border border-gray-300 shadow-sm"
                  />
                </td>
                <td className="py-3 px-4">{element.userName}</td>
                <td className="py-3 px-4 font-semibold text-[#D6482B]">
                  ${element.moneySpent}
                </td>
                <td className="py-3 px-4 font-semibold text-green-600">
                  {element.auctionsWon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Leaderboard Button */}
      <div className="flex justify-center mt-6">
        <Link
          to="/leaderboard"
          className="bg-[#D6482B] text-white font-bold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-[#b93824] transition-all"
        >
          View Full Leaderboard
        </Link>
      </div>
    </section>
  </>
  
  );
};

export default Leaderboard;