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

    Valuation : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },

    DeliveryVolume : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },

    PriceAction : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },

    FIIsModel : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },

    FIIsTopBottom : {
        loading: true,
        data: [],
        msg: null,
        error: null,
    },

    ResultCalender : {
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



const Valuation_Req = (`${slice_base_url}/ValuationData`);
const DeliveryVolume_Req = (`${slice_base_url}/DeliveryVolume`);
const PriceAction_Req = (`${slice_base_url}/PriceAction`);
const FIIsModel_Req = (`${slice_base_url}/FIIsModel`);
const FIIsTopBottom_Req = (`${slice_base_url}/FIIsTopBottom`);
const ResultCalender_Req = (`${slice_base_url}/ResultCalender`);




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

//Valuation
export const ValuationApi = createAsyncThunk(
    "Valuation",
    async(all_params) => {
        const response = await axios.post(`${Valuation_Req}`, all_params)
        return response?.data
    }
)

//DeliveryVolume
export const DeliveryVolumeApi = createAsyncThunk(
    "DeliveryVolume",
    async(all_params) => {
        const response = await axios.post(`${DeliveryVolume_Req}`, all_params)
        return response?.data
    }
)

//PriceAction
export const PriceActionApi = createAsyncThunk(
    "PriceAction",
    async(all_params) => {
        const response = await axios.post(`${PriceAction_Req}`, all_params)
        return response?.data
    }
)

//FIIsModel
export const FIIsModelApi = createAsyncThunk(
    "FIIsModel",
    async(all_params) => {
        const response = await axios.post(`${FIIsModel_Req}`, all_params)
        return response?.data
    }
)

// FIIsTopBottom
export const FIIsTopBottomApi = createAsyncThunk(
    "FIIsTopBottom",
    async(all_params) => {
        const response = await axios.post(`${FIIsTopBottom_Req}`, all_params)
        return response?.data
    }
)

// ResultCalender
export const ResultCalenderApi = createAsyncThunk(
    "ResultCalender",
    async(all_params) => {
        const response = await axios.post(`${ResultCalender_Req}`, all_params)
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

         
         
        //START Valuation Reducers
         
        builder.addCase(ValuationApi.pending, (state)=> {
            state.Valuation.loading = true;
            state.Valuation.error = false;
            state.Valuation.msg = null
        });
        builder.addCase(ValuationApi.fulfilled, (state, action)=> {
            state.Valuation.loading = false;
            state.Valuation.data = action.payload
            state.Valuation.msg = "success"
        });
         builder.addCase(ValuationApi.rejected, (state, action)=> {
            state.Valuation.loading = false;
            state.Valuation.data = action.payload;
            state.Valuation.msg = action.payload?.msg;
            state.Valuation.error = true;
         });
         //End Valuation
         
         
        //START DeliveryVolume Reducers
         
        builder.addCase(DeliveryVolumeApi.pending, (state)=> {
            state.DeliveryVolume.loading = true;
            state.DeliveryVolume.error = false;
            state.DeliveryVolume.msg = null
        });
        builder.addCase(DeliveryVolumeApi.fulfilled, (state, action)=> {
            state.DeliveryVolume.loading = false;
            state.DeliveryVolume.data = action.payload
            state.DeliveryVolume.msg = "success"
        });
         builder.addCase(DeliveryVolumeApi.rejected, (state, action)=> {
            state.DeliveryVolume.loading = false;
            state.DeliveryVolume.data = action.payload;
            state.DeliveryVolume.msg = action.payload?.msg;
            state.DeliveryVolume.error = true;
         });
         //End DeliveryVolume

         
        //START PriceAction Reducers
         
        builder.addCase(PriceActionApi.pending, (state)=> {
            state.PriceAction.loading = true;
            state.PriceAction.error = false;
            state.PriceAction.msg = null
        });
        builder.addCase(PriceActionApi.fulfilled, (state, action)=> {
            state.PriceAction.loading = false;
            state.PriceAction.data = action.payload
            state.PriceAction.msg = "success"
        });
         builder.addCase(PriceActionApi.rejected, (state, action)=> {
            state.PriceAction.loading = false;
            state.PriceAction.data = action.payload;
            state.PriceAction.msg = action.payload?.msg;
            state.PriceAction.error = true;
         });
         //End PriceAction


         
        //START FIIsModel Reducers
        builder.addCase(FIIsModelApi.pending, (state)=> {
            state.FIIsModel.loading = true;
            state.FIIsModel.error = false;
            state.FIIsModel.msg = null
        });
        builder.addCase(FIIsModelApi.fulfilled, (state, action)=> {
            state.FIIsModel.loading = false;
            state.FIIsModel.data = action.payload
            state.FIIsModel.msg = "success"
        });
         builder.addCase(FIIsModelApi.rejected, (state, action)=> {
            state.FIIsModel.loading = false;
            state.FIIsModel.data = action.payload;
            state.FIIsModel.msg = action.payload?.msg;
            state.FIIsModel.error = true;
         });
         //End FIIsModel

         
        //START FIIsTopBottom Reducers
        builder.addCase(FIIsTopBottomApi.pending, (state)=> {
            state.FIIsTopBottom.loading = true;
            state.FIIsTopBottom.error = false;
            state.FIIsTopBottom.msg = null
        });
        builder.addCase(FIIsTopBottomApi.fulfilled, (state, action)=> {
            state.FIIsTopBottom.loading = false;
            state.FIIsTopBottom.data = action.payload
            state.FIIsTopBottom.msg = "success"
        });
         builder.addCase(FIIsTopBottomApi.rejected, (state, action)=> {
            state.FIIsTopBottom.loading = false;
            state.FIIsTopBottom.data = action.payload;
            state.FIIsTopBottom.msg = action.payload?.msg;
            state.FIIsTopBottom.error = true;
         });
         //End FIIsTopBottom


         
        //START ResultCalender Reducers
        builder.addCase(ResultCalenderApi.pending, (state)=> {
            state.ResultCalender.loading = true;
            state.ResultCalender.error = false;
            state.ResultCalender.msg = null
        });
        builder.addCase(ResultCalenderApi.fulfilled, (state, action)=> {
            state.ResultCalender.loading = false;
            state.ResultCalender.data = action.payload
            state.ResultCalender.msg = "success"
        });
         builder.addCase(ResultCalenderApi.rejected, (state, action)=> {
            state.ResultCalender.loading = false;
            state.ResultCalender.data = action.payload;
            state.ResultCalender.msg = action.payload?.msg;
            state.ResultCalender.error = true;
         });
         //End ResultCalender




         
         
    }
})


export const {

} = Data2slice.actions
export default Data2slice.reducer