import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);
  const { user } = useSelector((state) => state.user);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);

    dispatch(postCommissionProof(formData)).then(() => {
      // Reset form fields after submission
      setProof("");
      setAmount("");
      setComment("");
      e.target.reset(); // Reset file input
    });
  };

  return (
    <>
      <section className="max-w-2xl mx-auto text-center mt-25 ">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Why Upload Payment Proof?</h1>
        <p className="text-lg text-gray-700 mt-4 hover:text-red-600 transition-colors duration-300">
          Uploading your payment proof helps us verify your transaction and process your request efficiently. Ensure your screenshot is clear, includes the transaction details, and matches the provided amount. If any issues arise, our team will review your submission and get back to you.
        </p>
        <p className="text-lg text-gray-700 mt-4 hover:text-red-600 transition-colors duration-300">
          If you encounter any difficulties, feel free to contact our support team. We appreciate your cooperation in making transactions smooth and secure!
        </p>
      </section>
      
      {/* User Details */}
      <section className="flex flex-col items-center text-center mt-10">
        <img
          src={user?.profileImage?.url}
          alt="Profile"
          className="w-80 h-100 object-cover rounded-lg hover:scale-105 transition-transform duration-300 border-green-500 shadow-md
"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">{user?.userName}</h2>
        <p className="text-lg text-gray-600">📧 {user?.email}</p>
        <p className="text-lg text-red-600 font-semibold">💰 Unpaid Commission: ${user?.unpaidCommission}</p>
      </section>
      
      <section className="bg-white w-full flex justify-center items-center px-5 mt-15 mb-16">
        <div className="bg-white w-full max-w-2xl p-12 flex flex-col gap-8 items-center shadow-2xl rounded-2xl">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-3xl font-bold text-center">
            Upload Payment Proof
          </h3>
          <form className="flex flex-col gap-6 w-full" onSubmit={handlePaymentProof}>
            <div className="flex flex-col gap-3">
              <label className="text-lg font-medium text-stone-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg py-3 px-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-lg font-medium text-stone-700">Payment Proof (Screenshot)</label>
              <input
                type="file"
                onChange={proofHandler}
                className="text-lg py-3 px-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-lg font-medium text-stone-700">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                className="text-lg py-3 px-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
            <button
              className="bg-gradient-to-r from-orange-500 to-red-600 w-full text-white font-bold text-xl py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
              type="submit"
            >
              {loading ? "Uploading..." : "Upload Payment Proof"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SubmitCommission;