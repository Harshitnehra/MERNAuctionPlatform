import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuction } from "@/store/slices/auctionSlice";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { loading } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const startTimeUTC = new Date(startTime).toISOString();
    const endTimeUTC = new Date(endTime).toISOString();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTimeUTC); // Store in UTC
    formData.append("endTime", endTimeUTC); // Store in UTC
    formData.append("image", image);

    dispatch(createAuction(formData));
    navigate("/auctions");
  };

  return (
    <>
      <section className="max-w-2xl mx-auto text-center mt-1 px-4 py-20">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
          Why Create an Auction?
        </h2>
        <p className="text-lg text-gray-700 mt-4 hover:text-red-600 transition-colors duration-300">
          Creating an auction allows you to reach a broad audience of potential
          buyers. It ensures fair competition and maximizes the value of your
          item. Simply fill in the details, upload a photo, and watch as bidders
          compete for your product!
        </p>
      </section>
      <section className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-3xl shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-center mb-4">
            Create Your Auction
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Auctions are an exciting way to sell and buy items. List your
            product, set a starting bid, and let buyers compete to win!
          </p>
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
            Auction Details
          </h2>
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <label className="font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <label className="font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Art & Antiques">Art & Antiques</option>
              <option value="Jewelry & Watches">Jewelry & Watches</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Fashion & Accessories">
                Fashion & Accessories
              </option>
              <option value="Sports Memorabilia">Sports Memorabilia</option>
              <option value="Books & Manuscripts">Books & Manuscripts</option>
            </select>

            <label className="font-medium text-gray-700">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>

            <label className="font-medium text-gray-700">Starting Bid</label>
            <input
              type="number"
              placeholder="Starting Bid"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <label className="font-medium text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <label className="font-medium text-gray-700">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <label className="font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              required
              className="border p-2 rounded"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded hover:shadow-lg transition-all"
            >
              {loading ? "Creating..." : "Create Auction"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateAuction;
