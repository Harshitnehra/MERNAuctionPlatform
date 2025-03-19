import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
      formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("bankName", bankName),
      formData.append("AccountNumber", AccountNumber));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
  <section className="w-full min-h-screen flex flex-col items-center justify-center bg-[#da5e21] px-4 py-12">
    <div className="bg-white w-full max-w-3xl lg:max-w-4xl shadow-lg rounded-lg p-8 lg:p-10">
      <h1 className="text-[#00246B] text-center text-3xl font-bold md:text-5xl">
        Register
      </h1>

      <form className="mt-6 flex flex-col gap-6" onSubmit={handleRegister}>
        {/* Personal Details */}
        <p className="font-semibold text-xl md:text-2xl text-[#00246B]">
          Personal Details
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[#00246B] font-medium">Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00246B] font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[#00246B] font-medium">Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00246B] font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[#00246B] font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
            >
              <option value="">Select Role</option>
              <option value="Auctioneer">Auctioneer</option>
              <option value="Bidder">Bidder</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00246B] font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col">
          <label className="text-[#00246B] font-medium">Profile Image</label>
          <div className="flex items-center gap-4">
            <img
              src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
              alt="profileImagePreview"
              className="w-16 h-16 rounded-full border-2 border-[#8AB6F9]"
            />
            <input type="file" onChange={imageHandler} />
          </div>
        </div>

        {/* Payment Method */}
        {role === "Auctioneer" && (
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-xl text-[#00246B]">Payment Method</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
              >
                <option value="">Select Your Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="Union Bank of India">Union Bank of India</option>
                <option value="Indian Bank">Indian Bank</option>
              </select>
              <input
                type="text"
                value={bankAccountNumber}
                placeholder="IFSC Code"
                onChange={(e) => setBankAccountNumber(e.target.value)}
                className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
              />
              <input
                type="text"
                value={bankAccountName}
                placeholder="Account Holder Name"
                onChange={(e) => setBankAccountName(e.target.value)}
                className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#00246B] font-medium">Account Number</label>
              <input
                type="number"
                value={AccountNumber}
                placeholder="Enter Account Number"
                onChange={(e) => setAccountNumber(e.target.value)}
                className="border-2 border-[#8AB6F9] p-2 rounded-md focus:ring-2 focus:ring-[#00246B] outline-none"
              />
            </div>
          </div>
        )}

        {/* Register Button */}
        <button
          className="bg-[#00246B] text-white font-semibold text-lg py-3 px-6 rounded-lg hover:bg-[#8AB6F9] transition duration-300 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  </section>
</>

  );
};

export default SignUp;
