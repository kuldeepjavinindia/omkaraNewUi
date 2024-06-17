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
    BulkDeal : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },
    InsiderDetail : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },
    Bulk_BlockDetail : {
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
const BulkDealReq = (`${slice_base_url}/BulkDeal`);

const InsiderDetailReq = (`${slice_base_url}/InsiderDetail`);
const Bulk_BlockDetailReq = (`${slice_base_url}/Bulk_BlockDetail`);

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

//BulkDealApi
export const BulkDealApi = createAsyncThunk(
    "BulkDeal",
    async(all_params) => {
        const response = await axios.post(`${BulkDealReq}`, all_params)
        return response?.data
    }
)

//InsiderDetailReqAPI
export const InsiderDetailApi = createAsyncThunk(
    "InsiderDetail",
    async(all_params) => {
        const response = await axios.post(`${InsiderDetailReq}`, all_params)
        return response?.data
    }
)

//Bulk_BlockDetailReqAPI
export const Bulk_BlockDetailApi = createAsyncThunk(
    "Bulk_BlockDetail",
    async(all_params) => {
        const response = await axios.post(`${Bulk_BlockDetailReq}`, all_params)
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

         
         
         
        //START BulkDeal Reducers
         
        builder.addCase(BulkDealApi.pending, (state)=> {
            state.BulkDeal.loading = true;
            state.BulkDeal.error = false;
            state.BulkDeal.msg = null
        });
        builder.addCase(BulkDealApi.fulfilled, (state, action)=> {
            state.BulkDeal.loading = false;
            state.BulkDeal.data = action.payload
            state.BulkDeal.msg = "success"
        });
         builder.addCase(BulkDealApi.rejected, (state, action)=> {
            state.BulkDeal.loading = false;
            state.BulkDeal.data = action.payload;
            state.BulkDeal.msg = action.payload?.msg;
            state.BulkDeal.error = true;
         });
         //End Insider Reducers


         
         
        //START InsiderDetail Reducers
         
        builder.addCase(InsiderDetailApi.pending, (state)=> {
            state.InsiderDetail.loading = true;
            state.InsiderDetail.error = false;
            state.InsiderDetail.msg = null
        });
        builder.addCase(InsiderDetailApi.fulfilled, (state, action)=> {
            state.InsiderDetail.loading = false;
            state.InsiderDetail.data = action.payload
            state.InsiderDetail.msg = "success"
        });
         builder.addCase(InsiderDetailApi.rejected, (state, action)=> {
            state.InsiderDetail.loading = false;
            state.InsiderDetail.data = action.payload;
            state.InsiderDetail.msg = action.payload?.msg;
            state.InsiderDetail.error = true;
         });
         //End InsiderDetail

         
         
        //START Bulk_BlockDetail Reducers
         
        builder.addCase(Bulk_BlockDetailApi.pending, (state)=> {
            state.Bulk_BlockDetail.loading = true;
            state.Bulk_BlockDetail.error = false;
            state.Bulk_BlockDetail.msg = null
        });
        builder.addCase(Bulk_BlockDetailApi.fulfilled, (state, action)=> {
            state.Bulk_BlockDetail.loading = false;
            state.Bulk_BlockDetail.data = action.payload
            state.Bulk_BlockDetail.msg = "success"
        });
         builder.addCase(Bulk_BlockDetailApi.rejected, (state, action)=> {
            state.Bulk_BlockDetail.loading = false;
            state.Bulk_BlockDetail.data = action.payload;
            state.Bulk_BlockDetail.msg = action.payload?.msg;
            state.Bulk_BlockDetail.error = true;
         });
         //End Bulk_BlockDetail




         
         
    }
})


export const {

} = Data2slice.actions
export default Data2slice.reducer