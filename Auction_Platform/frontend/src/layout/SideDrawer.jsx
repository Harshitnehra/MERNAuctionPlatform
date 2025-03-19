import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(user);
  

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-[#f1d6d6] border-b-2 border-[#FF5A09] fixed top-0 w-full z-50 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#FF5A09]">
        WinWave
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-6">
        <Link to="/auctions" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
          Auctions
        </Link>
        <Link to="/leaderboard" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
          Leaderboard
        </Link>

        {isAuthenticated && user?.role === "Auctioneer" && (
          <>
            <Link to="/submit-commission" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
              Submit Commission
            </Link>
            <Link to="/create-auction" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
              Create Auction
            </Link>
            <Link to="/view-my-auctions" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
              View My Auctions
            </Link>
          </>
        )}
        {isAuthenticated && user?.role === "Super Admin" && (
          <Link to="/dashboard" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
            Dashboard
          </Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link to="/sign-up" className="bg-[#be4f0c] text-white px-4 py-2 rounded-md hover:bg-[#ec7f37] transition">
              Sign Up
            </Link>
            <Link to="/login" className="text-[#FF5A09] border-2 border-[#FF5A09] px-4 py-2 rounded-md hover:bg-[#ec7f37] hover:border-[#ec7f37] hover:text-white transition">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-[#be4f0c] text-white px-4 py-2 rounded-md hover:bg-[#ec7f37] transition">
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setShow(!show)} className="text-[#FF5A09] text-3xl">
          <GiHamburgerMenu />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {show && (
    <div className="lg:hidden bg-[#393939] fixed top-16 left-0 w-full border-t border-[#FF5A09] p-4 flex flex-col gap-4 shadow-lg">
      <Link to="/auctions" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
        Auctions
      </Link>
      <Link to="/leaderboard" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
        Leaderboard
      </Link>

      {isAuthenticated && user?.role === "Auctioneer" && (
        <>
          <Link to="/submit-commission" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
            Submit Commission
          </Link>
          <Link to="/create-auction" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
            Create Auction
          </Link>
          <Link to="/view-my-auctions" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
            View My Auctions
          </Link>
        </>
      )}
      {isAuthenticated && user?.role === "Super Admin" && (
        <Link to="/dashboard" className="text-lg text-[#FF5A09] hover:text-[#ec7f37] transition-all">
          Dashboard
        </Link>
      )}

      {!isAuthenticated ? (
        <>
          <Link to="/sign-up" className="bg-[#be4f0c] text-white px-4 py-2 rounded-md hover:bg-[#ec7f37] transition">
            Sign Up
          </Link>
          <Link to="/login" className="text-[#FF5A09] border-2 border-[#FF5A09] px-4 py-2 rounded-md hover:bg-[#ec7f37] hover:border-[#ec7f37] hover:text-white transition">
            Login
          </Link>
        </>
      ) : (
        <button onClick={handleLogout} className="bg-[#be4f0c] text-white px-4 py-2 rounded-md hover:bg-[#ec7f37] transition">
          Logout
        </button>
      )}
    </div>
  )}
</nav>

  

  );
};

export default SideDrawer;