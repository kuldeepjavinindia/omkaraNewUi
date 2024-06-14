import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../constants/helper";
import axios from "axios";




const initialState = {
    ResultData : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },
    ResultDataSheet2 : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },
    ResultInputAction : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },
    Insider : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },
    // START REPORT_BANK

    

    // END REPORT_BANK

}

const slice_base_url = API_BASE_URL();

// result data req
const ResultDataReq = (`${slice_base_url}/resultdata`);
const ResultDataSheet2Req = (`${slice_base_url}/resultdatasheet2`);

const InsiderReq = (`${slice_base_url}/Insider`);

// ResultDataApi Thunk
export const ResultDataApi = createAsyncThunk(
    "ResultData",
     async(all_params)=> {
        const response = await axios.post(`${ResultDataReq}`, all_params)
        return response?.data
     }
)

//ResultDataSheet2Api
export const ResultDataSheet2Api = createAsyncThunk(
    "ResultDataSheet2",
    async(all_params) => {
        const response = await axios.post(`${ResultDataSheet2Req}`, all_params)
        return response?.data
    }
)

//InsiderApi
export const InsiderApi = createAsyncThunk(
    "Insider",
    async(all_params) => {
        const response = await axios.post(`${InsiderReq}`, all_params)
        return response?.data
    }
)


const Data2slice = createSlice({
    name: "ResultData",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(ResultDataApi.pending, (state)=> {
            state.ResultData.loading = true;
            state.ResultData.error = false;
            state.ResultData.msg = null
        });
        builder.addCase(ResultDataApi.fulfilled, (state, action)=> {
            state.ResultData.loading = false;
            state.ResultData.data = action.payload
            state.ResultData.msg = "success"
        });
         builder.addCase(ResultDataApi.rejected, (state, action)=> {
            state.ResultData.loading = false;
            state.ResultData.data = action.payload;
            state.ResultData.msg = action.payload?.msg;
            state.ResultData.error = true;
         });
         //End ResultData Reducers

         //START ResultData Reducers



         builder.addCase(ResultDataSheet2Api.pending, (state)=> {
            state.ResultDataSheet2.loading = true;
            state.ResultDataSheet2.error = false;
            state.ResultDataSheet2.msg = null
        });
        builder.addCase(ResultDataSheet2Api.fulfilled, (state, action)=> {
            state.ResultDataSheet2.loading = false;
            state.ResultDataSheet2.data = action.payload
            state.ResultDataSheet2.msg = "success"
        });
         builder.addCase(ResultDataSheet2Api.rejected, (state, action)=> {
            state.ResultDataSheet2.loading = false;
            state.ResultDataSheet2.data = action.payload;
            state.ResultDataSheet2.msg = action.payload?.msg;
            state.ResultDataSheet2.error = true;
         });
         //End ResultDataSheet2 Reducers



         
         
         
        //START Insider Reducers
         
        builder.addCase(InsiderApi.pending, (state)=> {
            state.Insider.loading = true;
            state.Insider.error = false;
            state.Insider.msg = null
        });
        builder.addCase(InsiderApi.fulfilled, (state, action)=> {
            state.Insider.loading = false;
            state.Insider.data = action.payload
            state.Insider.msg = "success"
        });
         builder.addCase(InsiderApi.rejected, (state, action)=> {
            state.Insider.loading = false;
            state.Insider.data = action.payload;
            state.Insider.msg = action.payload?.msg;
            state.Insider.error = true;
         });
         //End Insider Reducers




         
         
    }
})


export const {

} = Data2slice.actions
export default Data2slice.reducer