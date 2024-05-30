import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/helper";

const initialState = {
  companyNotes: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
};

// eslint-disable-next-line no-unused-vars
const slice_base_url = API_BASE_URL();

//  USER REQUESTs
// {"UserId":"demo","password":"123"}
// https://omkaradata.com/api/SignIn



export const singInReq = `${slice_base_url}/SignIn`;


export const singInAPI = createAsyncThunk(
  "singIn",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    console.log('all_params <<>> ', all_params)
    const response = await axios.post(
      `${singInReq}`,
      all_params
    );
    console.log('object')
    return response?.data;
  }
);




const AuthSlice = createSlice({
  name: "Trendlyne",
  initialState: initialState,
  reducers: {},
  // eslint-disable-next-line no-empty-pattern
    extraReducers: (builder) => {

    // // START companyNotes DATA
    builder.addCase(singInAPI.pending, (state) => {
      state.companyNotes.loading = true;
      state.companyNotes.error = false;
      state.companyNotes.msgType = null;
    });
    builder.addCase(singInAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.companyNotes.data = action.payload;
      state.companyNotes.loading = false;
      state.companyNotes.msg = "success";
      state.companyNotes.msgType = "success";
    });
    builder.addCase(singInAPI.rejected, (state, action) => {
      state.companyNotes.loading = false;
      state.companyNotes.error = true;
      state.companyNotes.msgType = "error";
      state.companyNotes.msg = action.payload?.msg;
      state.companyNotes.data = action.payload;
    });
    // // END companyNotes DATA
    

  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
