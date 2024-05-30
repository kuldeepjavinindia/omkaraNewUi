import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from 'qs'

const initialState = { 
    AnnualReport:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    EarningsCall:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    InvestorPresentation:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    Announcements:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    EOD_OHLC:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    PB:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    PE:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    EPS:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    Overview:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
    QuarterlyResults:{
      loading:true,
      data:[],
      msg:null,
      error:null
    },
   };



// eslint-disable-next-line no-unused-vars
const TL_BaseUrl = import.meta.env.VITE_TRENDLYNE_BASE_URL;

let TLAnnualReportRequest = `${TL_BaseUrl}/stock/annual-reports`;
let TLEarningsCallRequest = `${TL_BaseUrl}/stock/earnings-call`;
let TLInvestorPresentationRequest = `${TL_BaseUrl}/stock/investor-presentation`;
let TLAnnouncementsRequest = `${TL_BaseUrl}/newsfeed/corporate/announcements`;
let TLEOD_OHLCRequest = `${TL_BaseUrl}/stock/EOD-OHLC`;
let TLEPSRequest = `${TL_BaseUrl}/stock/chart-data/EPS`;
let TLPBRequest = `${TL_BaseUrl}/stock/chart-data/PBV`;
let TLPERequest = `${TL_BaseUrl}/stock/chart-data/PE`;
let TLOverviewRequest = `${TL_BaseUrl}/stock/overview`;
let TLQuarterlyResultsRequest = `${TL_BaseUrl}/stock/quarterly-results`;



// eslint-disable-next-line no-unused-vars
let TL_options1 = {
  headers: {
    userId: import.meta.env.VITE_TRENDLYNE_USERID,
    password: import.meta.env.VITE_TRENDLYNE_PASSWORD,
    key: import.meta.env.VITE_TRENDLYNE_KEY,
    requestCode: import.meta.env.VITE_TRENDLYNE_REQUESTCODE,
  },
};



export const AnnualReportAPI = createAsyncThunk(
    'AnnualReport',
    async (al_params = {}) => {
        const response = await axios.get(`${TLAnnualReportRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)

export const EarningsCallAPI = createAsyncThunk(
    'EarningsCall',
    async (al_params = {}) => {
        const response = await axios.get(`${TLEarningsCallRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const InvestorPresentationAPI = createAsyncThunk(
    'InvestorPresentation',
    async (al_params = {}) => {
        const response = await axios.get(`${TLInvestorPresentationRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const AnnouncementNormalAPI = async (al_params) => {
      TL_options1 = {
        ...TL_options1, 
        params: al_params?.params,
        'paramsSerializer': function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        },
      }
      
    const response = await axios.get(`${TLAnnouncementsRequest}/${al_params?.compSlug}`, TL_options1);
    return response?.data
}

export const AnnouncementsAPI = createAsyncThunk(
    'Announcements',
    async (al_params = {}) => {
      // console.log('al_params?.params < >', al_params?.params)
      //   TL_options1 = {
      //       ...TL_options1, 
      //       params: al_params?.params,
      //       'paramsSerializer': function(params) {
      //           return qs.stringify(params, {arrayFormat: 'repeat'})
      //       },
      //     }
          
      //   const response = await axios.get(`${TLAnnouncementsRequest}/${al_params?.compSlug}`, TL_options1);
      //   return response?.data

      return AnnouncementNormalAPI(al_params);
    }
)


export const EOD_OHLCAPI = createAsyncThunk(
    'EOD_OHLC',
    async (al_params = {}) => {
        const response = await axios.get(`${TLEOD_OHLCRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const PBAPI = createAsyncThunk(
    'PB',
    async (al_params = {}) => {
        const response = await axios.get(`${TLPBRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const PEAPI = createAsyncThunk(
    'PE',
    async (al_params = {}) => {
        const response = await axios.get(`${TLPERequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const EPSAPI = createAsyncThunk(
    'EPS',
    async (al_params = {}) => {
        const response = await axios.get(`${TLEPSRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const OverviewAPI = createAsyncThunk(
    'Overview',
    async (al_params = {}) => {
        const response = await axios.get(`${TLOverviewRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)


export const QuarterlyResultsAPI = createAsyncThunk(
    'QuarterlyResults',
    async (al_params = {}) => {
        const response = await axios.get(`${TLQuarterlyResultsRequest}/${al_params?.compSlug}`, TL_options1);
        return response?.data
    }
)



const TrendlyneSlice = createSlice({
  name: "Trendlyne",
  initialState: initialState,
  reducers: {},
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {

    
    // // START Annual Report DATA
    builder.addCase(AnnualReportAPI.pending, (state) => {
      state.AnnualReport.loading = true;
      state.AnnualReport.error = false;
      state.AnnualReport.msgType = null;
    });
    builder.addCase(AnnualReportAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.AnnualReport.data = action.payload?.body?.newsList || [];
      state.AnnualReport.loading = false;
      state.AnnualReport.msg = "success";
      state.AnnualReport.msgType = "success";
    });
    builder.addCase(AnnualReportAPI.rejected, (state, action) => {
      state.AnnualReport.loading = false;
      state.AnnualReport.error = true;
      state.AnnualReport.msgType = "error";
      state.AnnualReport.msg = action.payload?.msg;
      state.AnnualReport.data = action.payload;
    });
    // // END Annual Report DATA

    
    // // START EarningsCall DATA
    builder.addCase(EarningsCallAPI.pending, (state) => {
      state.EarningsCall.loading = true;
      state.EarningsCall.error = false;
      state.EarningsCall.msgType = null;
    });
    builder.addCase(EarningsCallAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.EarningsCall.data = action.payload?.body?.newsList || [];
      state.EarningsCall.loading = false;
      state.EarningsCall.msg = "success";
      state.EarningsCall.msgType = "success";
    });
    builder.addCase(EarningsCallAPI.rejected, (state, action) => {
      state.EarningsCall.loading = false;
      state.EarningsCall.error = true;
      state.EarningsCall.msgType = "error";
      state.EarningsCall.msg = action.payload?.msg;
      state.EarningsCall.data = action.payload;
    });
    // // END EarningsCall DATA

    
    // // START InvestorPresentation DATA
    builder.addCase(InvestorPresentationAPI.pending, (state) => {
      state.InvestorPresentation.loading = true;
      state.InvestorPresentation.error = false;
      state.InvestorPresentation.msgType = null;
    });
    builder.addCase(InvestorPresentationAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.InvestorPresentation.data = action.payload;
      state.InvestorPresentation.loading = false;
      state.InvestorPresentation.msg = "success";
      state.InvestorPresentation.msgType = "success";
    });
    builder.addCase(InvestorPresentationAPI.rejected, (state, action) => {
      state.InvestorPresentation.loading = false;
      state.InvestorPresentation.error = true;
      state.InvestorPresentation.msgType = "error";
      state.InvestorPresentation.msg = action.payload?.msg;
      state.InvestorPresentation.data = action.payload;
    });
    // // END InvestorPresentation DATA

    
    // // START Announcements DATA
    builder.addCase(AnnouncementsAPI.pending, (state) => {
      state.Announcements.loading = true;
      state.Announcements.error = false;
      state.Announcements.msgType = null;
    });
    builder.addCase(AnnouncementsAPI.fulfilled, (state, action) => {
      state.Announcements.data = action.payload?.body?.newsList || [];
      state.Announcements.loading = false;
      state.Announcements.msg = "success";
      state.Announcements.msgType = "success";
    });
    builder.addCase(AnnouncementsAPI.rejected, (state, action) => {
      state.Announcements.loading = false;
      state.Announcements.error = true;
      state.Announcements.msgType = "error";
      state.Announcements.msg = action.payload?.msg;
      state.Announcements.data = action.payload;
    });
    // // END Announcements DATA

    
    // // START EOD_OHLC DATA
    builder.addCase(EOD_OHLCAPI.pending, (state) => {
      state.EOD_OHLC.loading = true;
      state.EOD_OHLC.error = false;
      state.EOD_OHLC.msgType = null;
    });
    builder.addCase(EOD_OHLCAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.EOD_OHLC.data = action.payload?.body?.EodData || [];
      state.EOD_OHLC.loading = false;
      state.EOD_OHLC.msg = "success";
      state.EOD_OHLC.msgType = "success";
    });
    builder.addCase(EOD_OHLCAPI.rejected, (state, action) => {
      state.EOD_OHLC.loading = false;
      state.EOD_OHLC.error = true;
      state.EOD_OHLC.msgType = "error";
      state.EOD_OHLC.msg = action.payload?.msg;
      state.EOD_OHLC.data = action.payload;
    });
    // // END EOD_OHLC DATA

    
    // // START PB DATA
    builder.addCase(PBAPI.pending, (state) => {
      state.PB.loading = true;
      state.PB.error = false;
      state.PB.msgType = null;
    });
    builder.addCase(PBAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.PB.data = action.payload?.body?.PBVChartData || [];
      state.PB.loading = false;
      state.PB.msg = "success";
      state.PB.msgType = "success";
    });
    builder.addCase(PBAPI.rejected, (state, action) => {
      state.PB.loading = false;
      state.PB.error = true;
      state.PB.msgType = "error";
      state.PB.msg = action.payload?.msg;
      state.PB.data = action.payload;
    });
    // // END PB DATA

    
    // // START PE DATA
    builder.addCase(PEAPI.pending, (state) => {
      state.PE.loading = true;
      state.PE.error = false;
      state.PE.msgType = null;
    });
    builder.addCase(PEAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.PE.data = action.payload?.body?.PEChartData || [];
      state.PE.loading = false;
      state.PE.msg = "success";
      state.PE.msgType = "success";
    });
    builder.addCase(PEAPI.rejected, (state, action) => {
      state.PE.loading = false;
      state.PE.error = true;
      state.PE.msgType = "error";
      state.PE.msg = action.payload?.msg;
      state.PE.data = action.payload;
    });
    // // END PE DATA

    
    // // START EPS DATA
    builder.addCase(EPSAPI.pending, (state) => {
      state.EPS.loading = true;
      state.EPS.error = false;
      state.EPS.msgType = null;
    });
    builder.addCase(EPSAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.EPS.data = action.payload;
      state.EPS.loading = false;
      state.EPS.msg = "success";
      state.EPS.msgType = "success";
    });
    builder.addCase(EPSAPI.rejected, (state, action) => {
      state.EPS.loading = false;
      state.EPS.error = true;
      state.EPS.msgType = "error";
      state.EPS.msg = action.payload?.msg;
      state.EPS.data = action.payload;
    });
    // // END EPS DATA

    
    // // START Overview DATA
    builder.addCase(OverviewAPI.pending, (state) => {
      state.Overview.loading = true;
      state.Overview.error = false;
      state.Overview.msgType = null;
    });
    builder.addCase(OverviewAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.Overview.data = action.payload;
      state.Overview.loading = false;
      state.Overview.msg = "success";
      state.Overview.msgType = "success";
    });
    builder.addCase(OverviewAPI.rejected, (state, action) => {
      state.Overview.loading = false;
      state.Overview.error = true;
      state.Overview.msgType = "error";
      state.Overview.msg = action.payload?.msg;
      state.Overview.data = action.payload;
    });
    // // END Overview DATA

    
    // // START QuarterlyResults DATA
    builder.addCase(QuarterlyResultsAPI.pending, (state) => {
      state.QuarterlyResults.loading = true;
      state.QuarterlyResults.error = false;
      state.QuarterlyResults.msgType = null;
    });
    builder.addCase(QuarterlyResultsAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.QuarterlyResults.data = action.payload;
      state.QuarterlyResults.loading = false;
      state.QuarterlyResults.msg = "success";
      state.QuarterlyResults.msgType = "success";
    });
    builder.addCase(QuarterlyResultsAPI.rejected, (state, action) => {
      state.QuarterlyResults.loading = false;
      state.QuarterlyResults.error = true;
      state.QuarterlyResults.msgType = "error";
      state.QuarterlyResults.msg = action.payload?.msg;
      state.QuarterlyResults.data = action.payload;
    });
    // // END QuarterlyResults DATA


  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = TrendlyneSlice.actions;

export default TrendlyneSlice.reducer;
