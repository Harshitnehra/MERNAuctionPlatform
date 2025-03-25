import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-[#FF5A09] transition-all duration-300">
        Auction Items
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Manage auction items by viewing details or deleting items if necessary.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {allAuctions.length > 0 ? (
              allAuctions.map((element) => (
                <tr
                  key={element._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-4 px-6">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 object-cover rounded-md shadow-md"
                    />
                  </td>
                  <td className="py-4 px-6 font-semibold">{element.title}</td>
                  <td className="py-4 px-6 flex items-center justify-center gap-3">
                    <Link
                      to={`/auction/details/${element._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-semibold transition-all duration-300"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAuctionDelete(element._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-xs font-semibold transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No Auctions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionItemDelete;


// service service_twt6uvi