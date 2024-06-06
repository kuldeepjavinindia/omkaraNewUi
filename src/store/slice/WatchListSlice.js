import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/helper";

const initialState = {
  wl: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  wlCompany: {
    loading: true,
    data: {
      Data: [],
    },
    msg: null,
    error: null,
  },
  WLBulkUpload: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
//   wlCompanyBulkUpload: {
//     loading: true,
//     data: [],
//     msg: null,
//     error: null,
//   },
};

// eslint-disable-next-line no-unused-vars
const slice_base_url = API_BASE_URL();

//  USER REQUESTs
let wlReq = `${slice_base_url}/Watch_list_Add`;
export const wlAPI = createAsyncThunk(
  "wl",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${wlReq}`,
      all_params
    );
    return response?.data;
  }
);


let wlCompanyReq = `${slice_base_url}/WatchList_AddCompany`;
export const wlCompanyAPI = createAsyncThunk(
  "wlCompany",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${wlCompanyReq}`,
      all_params
    );
    return response?.data;
  }
);


let BulkUploadReq = `${slice_base_url}/BulkInsertInWatchList`;
export const WLBulkUploadAPI = createAsyncThunk(
  "BulkUpload",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${BulkUploadReq}`,
      all_params
    );
    return response?.data;
  }
);




const WatchListSlice = createSlice({
  name: "WatchList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

    // // START wl DATA
    builder.addCase(wlAPI.pending, (state) => {
      state.wl.loading = true;
      state.wl.error = false;
      state.wl.msgType = null;
    });
    builder.addCase(wlAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.wl.data = action.payload;
      state.wl.loading = false;
      state.wl.msg = "success";
      state.wl.msgType = "success";
    });
    builder.addCase(wlAPI.rejected, (state, action) => {
      state.wl.loading = false;
      state.wl.error = true;
      state.wl.msgType = "error";
      state.wl.msg = action.payload?.msg;
      state.wl.data = action.payload;
    });
    // // END wl DATA
    

    // // START wlCompany DATA
    builder.addCase(wlCompanyAPI.pending, (state) => {
      state.wlCompany.loading = true;
      state.wlCompany.error = false;
      state.wlCompany.msgType = null;
    });
    builder.addCase(wlCompanyAPI.fulfilled, (state, action) => {
      state.wlCompany.data = action.payload;
      state.wlCompany.loading = false;
      state.wlCompany.msg = "success";
      state.wlCompany.msgType = "success";
    });
    builder.addCase(wlCompanyAPI.rejected, (state, action) => {
      state.wlCompany.loading = false;
      state.wlCompany.error = true;
      state.wlCompany.msgType = "error";
      state.wlCompany.msg = action.payload?.msg;
      state.wlCompany.data = action.payload;
    });
    // // END wlCompany DATA
    
    

    // // START WLBulkUpload DATA
    builder.addCase(WLBulkUploadAPI.pending, (state) => {
      state.WLBulkUpload.loading = true;
      state.WLBulkUpload.error = false;
      state.WLBulkUpload.msgType = null;
    });
    builder.addCase(WLBulkUploadAPI.fulfilled, (state, action) => {
      state.WLBulkUpload.data = action.payload?.Data?.[0] || [];
      state.WLBulkUpload.loading = false;
      state.WLBulkUpload.msg = "success";
      state.WLBulkUpload.msgType = "success";
    });
    builder.addCase(WLBulkUploadAPI.rejected, (state, action) => {
      state.WLBulkUpload.loading = false;
      state.WLBulkUpload.error = true;
      state.WLBulkUpload.msgType = "error";
      state.WLBulkUpload.msg = action.payload?.msg;
      state.WLBulkUpload.data = action.payload;
    });
    // // END WLBulkUpload DATA
    

  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = WatchListSlice.actions;

export default WatchListSlice.reducer;
