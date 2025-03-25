import React from "react";
import { useSelector } from "react-redux";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, Legend 
} from "recharts";

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);
  console.log(monthlyRevenue);

  // Generate data for the chart
  const chartData = [
    { month: "Jan", earnings: monthlyRevenue?.January || 0 },
    { month: "Feb", earnings: monthlyRevenue?.February || 0 },
    { month: "Mar", earnings: monthlyRevenue?.March || 0 },
    { month: "Apr", earnings: monthlyRevenue?.April || 0 },
    { month: "May", earnings: monthlyRevenue?.May || 0 },
    { month: "Jun", earnings: monthlyRevenue?.June || 0 },
    { month: "Jul", earnings: monthlyRevenue?.July || 0 },
    { month: "Aug", earnings: monthlyRevenue?.August || 0 },
    { month: "Sep", earnings: monthlyRevenue?.September || 0 },
    { month: "Oct", earnings: monthlyRevenue?.October || 0 },
    { month: "Nov", earnings: monthlyRevenue?.November || 0 },
    { month: "Dec", earnings: monthlyRevenue?.December || 0 },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Title with Hover Effect */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 transition-all duration-300 hover:text-[#FF5A09] cursor-pointer">
        Monthly Earnings Overview
      </h3>

      {/* Short Description */}
      <p className="text-gray-600 text-sm mb-4">
        This chart provides an overview of total earnings collected each month. 
        Hover over the bars to see exact earnings.
      </p>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-gray-700" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill="#FF5A09" className="hover:opacity-80 transition-opacity duration-300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentGraph;
