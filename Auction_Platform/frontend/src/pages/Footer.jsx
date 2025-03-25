import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#393939] text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center md:flex-row md:justify-between md:text-left px-6 space-y-6 md:space-y-0">
        
        {/* Logo & Tagline */}
        <div>
          <Link
            to="/"
            className="text-4xl font-bold text-[#FF5A09] hover:text-[#ec7f37] transition-all"
          >
            WinWave
          </Link>
          <p className="text-gray-400 mt-2 text-sm">The Future of Auctions</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-[#FF5A09] transition-all">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#FF5A09] transition-all">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#FF5A09] transition-all">
            Contact
          </Link>
          <Link
            to="/how-it-works"
            className="hover:text-[#FF5A09] transition-all"
          >
            How It Works
          </Link>
        </nav>

        {/* Social Media & Credit */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <p className="text-gray-400 text-sm">
            Designed by{" "}
            <span className="text-[#FF5A09] font-semibold">Harshit Nehra</span>
          </p>

          <Link
            to="/dashboard"
            className="flex text-lg font-semibold gap-2 items-center text-gray-300 hover:text-[#FF5A09] transition-all"
          >
            <MdDashboard className="text-xl" /> Dashboard
          </Link>

          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF5A09] hover:text-[#ec7f37] transition duration-300 transform hover:scale-110"
          >
            <FaInstagram className="text-3xl" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-6 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} WinWave. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
