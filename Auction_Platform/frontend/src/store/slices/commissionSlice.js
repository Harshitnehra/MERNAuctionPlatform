import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
    user: {},
  },
  reducers: {
    postCommissionProofRequest(state, action) {
      state.loading = true;
      state.user = {};
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
      state.user = {};
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/commission/proof",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess(response.data));
    console.log(response.data);
    
    toast.success(response.data.message);
    console.log(response.data.message);
    
  } catch (error) {
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};

export default commissionSlice.reducer;