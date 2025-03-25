import {
    clearAllSuperAdminSliceErrors,
    getAllPaymentProofs,
    getAllUsers,
    getMonthlyRevenue,
  } from "@/store/slices/superAdminSlice";
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import AuctionItemDelete from "./sub-components/AuctionItemDelete";
  import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
  import PaymentGraph from "./sub-components/PaymentGraph";
  import PaymentProofs from "./sub-components/PaymentProofs";
  import { useNavigate } from "react-router-dom";
  
  const Dashboard = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.superAdmin);
  
    useEffect(() => {
      dispatch(getMonthlyRevenue());
      dispatch(getAllUsers());
      dispatch(getAllPaymentProofs());
      dispatch(clearAllSuperAdminSliceErrors());
    }, []);
  
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const navigateTo = useNavigate();
  
    useEffect(() => {
      if (user.role !== "Super Admin" || !isAuthenticated) {
        navigateTo("/");
      }
    }, [isAuthenticated]);
  
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-red-400 bg-gray-50 flex flex-col px-6 md:px-12 py-25">
        {/* Dashboard Title */}
        <h1 className="text-7xl font-bold text-[#D6482B] mb-8 text-center md:text-left">
          Dashboard
        </h1>
  
        {/* Dashboard Content */}
        <div className="flex flex-col gap-6">
          {/* Monthly Revenue Section */}
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-5xl font-semibold transition-all duration-300 hover:text-[#FF5A09] cursor-pointer text-gray-800 mb-4">
              Monthly Total Payments Received
            </h3>
            <PaymentGraph />
          </div>
  
          {/* Users Graph Section */}
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Users</h3>
            <BiddersAuctioneersGraph />
          </div>
  
          {/* Payment Proofs Section */}
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Proofs
            </h3>
            <PaymentProofs />
          </div>
  
          {/* Auction Item Delete Section */}
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Delete Items From Auction
            </h3>
            <AuctionItemDelete />
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  