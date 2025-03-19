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
      <section className="bg-white w-full flex justify-center items-center px-5 mt-24 mb-16">
        <div className="bg-white w-full max-w-2xl p-12 flex flex-col gap-8 items-center shadow-2xl rounded-2xl">
          <h3 className="text-[#D6482B] text-3xl font-bold text-center">
            Upload Payment Proof
          </h3>
          <form className="flex flex-col gap-6 w-full" onSubmit={handlePaymentProof}>
            <div className="flex flex-col gap-3">
              <label className="text-lg font-medium text-stone-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg py-3 px-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6482B] transition-all"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-lg font-medium text-stone-700">Payment Proof (Screenshot)</label>
              <input
                type="file"
                onChange={proofHandler}
                className="text-lg py-3 px-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6482B] transition-all"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-lg font-medium text-stone-700">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                className="text-lg py-3 px-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6482B] transition-all"
              />
            </div>
            <button
              className="bg-[#D6482B] w-full text-white font-bold text-xl py-3 rounded-lg transition-all duration-300 hover:bg-[#b8381e] hover:shadow-lg"
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
