import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  // Ensure data is structured correctly
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (totalAuctioneers?.length === 12 && totalBidders?.length === 12) {
      const formattedData = [
        { month: "Jan", bidders: totalBidders[0], auctioneers: totalAuctioneers[0] },
        { month: "Feb", bidders: totalBidders[1], auctioneers: totalAuctioneers[1] },
        { month: "Mar", bidders: totalBidders[2], auctioneers: totalAuctioneers[2] },
        { month: "Apr", bidders: totalBidders[3], auctioneers: totalAuctioneers[3] },
        { month: "May", bidders: totalBidders[4], auctioneers: totalAuctioneers[4] },
        { month: "Jun", bidders: totalBidders[5], auctioneers: totalAuctioneers[5] },
        { month: "Jul", bidders: totalBidders[6], auctioneers: totalAuctioneers[6] },
        { month: "Aug", bidders: totalBidders[7], auctioneers: totalAuctioneers[7] },
        { month: "Sep", bidders: totalBidders[8], auctioneers: totalAuctioneers[8] },
        { month: "Oct", bidders: totalBidders[9], auctioneers: totalAuctioneers[9] },
        { month: "Nov", bidders: totalBidders[10], auctioneers: totalAuctioneers[10] },
        { month: "Dec", bidders: totalBidders[11], auctioneers: totalAuctioneers[11] },
      ];
      setChartData(formattedData);
    }
  }, [totalAuctioneers, totalBidders]);

  // Check if data exists
  if (!chartData.length) {
    return <p className="text-gray-600">Loading data...</p>;
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Title with Hover Effect */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 transition-all duration-300 hover:text-[#FF5A09] cursor-pointer">
        Monthly Bidders & Auctioneers Overview
      </h3>

      {/* Short Description */}
      <p className="text-gray-600 text-sm mb-4">
        This graph displays the total number of bidders and auctioneers registered each month.
      </p>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-gray-700" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="bidders" fill="#3498db" name="Bidders" />
          <Bar dataKey="auctioneers" fill="#e74c3c" name="Auctioneers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiddersAuctioneersGraph;
