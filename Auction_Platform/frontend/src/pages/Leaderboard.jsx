import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);
  console.log(leaderboard);
  

  return (
    <section className="w-full py-25 px-6 bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[#D6482B] text-5xl font-bold text-center mb-8">
          Bidders Leaderboard
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#D6482B] rounded-full animate-spin"></div>
          </div>
        ) : leaderboard?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leaderboard.slice(0, 100).map((user, index) => (
              <div
                key={user._id}
                className="bg-white shadow-lg rounded-xl p-6 transition transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-100 to-red-200 text-white hover:text-white"
              >
                {/* Ranking */}
                <span className="text-lg font-bold text-gray-500 group-hover:text-white">
                  #{index + 1}
                </span>

                {/* Profile Image & Name */}
                <div className="flex flex-col items-center mt-3">
                  <img
                    src={user.profileImage?.url}
                    alt={user.userName}
                    className="h-20 w-20 object-cover rounded-full border-4 border-[#D6482B] group-hover:border-white"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mt-3 transition-all group-hover:text-white">
                    {user.userName}
                  </h3>
                  <p className="text-sm text-gray-600 transition-all group-hover:text-gray-200">
                    {user.email}
                  </p>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2 text-gray-700 text-center transition-all">
                  <p className="text-sm group-hover:text-gray-200">
                    <strong>Address:</strong> {user.address}
                  </p>
                  <p className="text-sm group-hover:text-gray-200">
                    <strong>Bid Expenditure:</strong> ${user.moneySpent}
                  </p>
                  <p className="text-sm group-hover:text-gray-200">
                    <strong>Auctions Won:</strong> {user.auctionsWon}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg mt-8">No bidders found.</p>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
