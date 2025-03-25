import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-[#FF5A09] transition-all duration-300">
        Payment Proofs
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Manage user payment proofs, update their statuses, or remove invalid records.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-4 px-6">{element.userId}</td>
                  <td className="py-4 px-6">{element.amount}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        element.status === "Approved" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {element.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleFetchPaymentDetail(element._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-semibold transition duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handlePaymentProofDelete(element._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-xs font-semibold transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </div>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector((state) => state.superAdmin);
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");
  const dispatch = useDispatch();

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed ${openDrawer ? "bottom-0" : "-bottom-full"} left-0 w-full h-full bg-[#00000087] flex items-end transition-all duration-300`}
    >
      <div className="bg-white w-full max-w-lg mx-auto rounded-t-lg shadow-lg p-6">
        <h3 className="text-[#D6482B] text-2xl font-semibold text-center mb-4">Update Payment Proof</h3>
        <p className="text-gray-600 text-sm mb-6">You can update payment status and amount.</p>
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600">User ID</label>
            <input type="text" value={singlePaymentProof.userId || ""} disabled className="w-full p-2 border rounded-md bg-gray-100 text-gray-600" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded-md">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Settled">Settled</option>
            </select>
          </div>
          <div>
            <Link to={singlePaymentProof.proof?.url || "#"} target="_blank" className="block text-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              View Payment Proof
            </Link>
          </div>
          <button type="button" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" onClick={handlePaymentProofUpdate}>
            {loading ? "Updating..." : "Update Payment Proof"}
          </button>
          <button type="button" className="bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600" onClick={() => setOpenDrawer(false)}>
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
