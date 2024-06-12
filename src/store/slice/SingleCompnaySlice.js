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
  UploadDocument: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  MultipleFileUploader: {
    loading: false,
    data: [],
    msg: null,
    error: null,
  },
  RepositoryList: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  UploadDocumentAnalysNote: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  QuarterlyResult: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCData20Years: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCQtrSegment: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCQuarterlyResultSnapShot: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCAnnualP_L: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCAnnualP_LChart: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCBalanceSheet: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCCashFlow: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCRatios: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCPeers: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  PeerAnalysis: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SCShareHolding: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  // SCMediaRoom: {
  //   loading: true,
  //   data: [],
  //   msg: null,
  //   error: null,
  // },
  SCValuationData: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  BarChartData: {
    Columns_Rows: {
      Columns: [],
      Rows: {},
    },
    Open: false,
    isPercentage: false,
  },

  ForensicTabShowHide: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  Forensic: {
    loading: true,
    data: [],
    button_status: null,
    msg: null,
    error: null,
  },
  ForensicComment: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },

  ForensiTooltip: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },

  MediaRoom: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  MediaComment: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  VideoLikeDislike: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  MediaCommentLikeDislike: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  ResultDocument: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  BoardOfDirectorDetail: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  DateACE: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  UserNotification: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  SentNotification: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
};

// eslint-disable-next-line no-unused-vars
const slice_base_url = API_BASE_URL();
const capitalUrl = import.meta.env.VITE_MAIN_SITE_BASE_URL;


//  USER REQUESTs
let companyNotesReq = `${slice_base_url}/companynote`;
let UploadDocumentReq = `${slice_base_url}/UploadDocument`;
let MultipleFileUploaderReq = `${slice_base_url}/MultipleFileUploader`;
let RepositoryListReq = `${slice_base_url}/RepositoryListTesting`;
// let UploadDocumentAnalysNotesReq = `${slice_base_url}/UploadDocumentAnalystNotes`;
let UploadDocumentAnalysNotesReq = `${slice_base_url}/SingleCompanyComments`;

// let QuarterlyResultReq = `${slice_base_url}/QuarterlyResultsConsolidated_ACEAPI`;
let QuarterlyResultReq = `${slice_base_url}/QuarterlyResultsConsolidated_ACEAPI_Web`;
let SCData20YearsReq = `${slice_base_url}/Data20YearsSingleCompany_ACEAPI_Web`;
let SCQtrSegmentReq = `${slice_base_url}/QtrSegment_ACEAPI_Web`;
let SCQuarterlyResultSnapShotReq = `${slice_base_url}/QuaterlyResultSnapShot_ACEAPI_Web`;
let SCAnnualP_LReq = `${slice_base_url}/QuaterlyResult_ProfitAndLoss_ACEAPI_Web`;
let SCAnnualP_LChartReq = `${slice_base_url}/QuaterlyResult_ProfitAndLoss_Charts_Web`;
let SCBalanceSheetReq = `${slice_base_url}/SingleCompanyBalanceSheet_ACEAPI_Web`;
let SCCashFlowReq = `${slice_base_url}/SingleCompanyCashFlow_Web`;
let SCRatiosReq = `${slice_base_url}/SingleCompanyratios_ACEAPI_Web`;
let SCPeersReq = `${slice_base_url}/SingleCompanypeers_Web`;
let PeerAnalysisReq = `${slice_base_url}/PeerToPeer_New`;
let SCShareHoldingReq = `${slice_base_url}/SingleCompanyShareHolding`;
// let SCMediaRoomReq = `${slice_base_url}/media`;
let SCValuationDataReq = `${slice_base_url}/ValuationData_New`; // for Brief_table

let ForensicTabsShowHideReq = `${slice_base_url}/ForensicTabShowHide`;
let ForensicReq = `${slice_base_url}/forensic`;
let ForensicCommentReq = `${slice_base_url}/ForensicModelComments`;
let ForensiTooltipReq = `${slice_base_url}/ForensicTooltip`;
let MediaRoomReq = `${slice_base_url}/media`;
let MediaCommentReq = `${slice_base_url}/VDRMediaCommentWithReply`;
let VideoLikeDislikeReq = `${slice_base_url}/VDRMediaUserLiskeDislike`;
let MediaCommentLikeDislikeReq = `${slice_base_url}/VDRCommentUserLiskeDislike`;
let ResultDocumentReq = `${slice_base_url}/ResultDocument_New_ACEAPI`;

let BoardOfDirectorDetailReq = `${slice_base_url}/BoardOfDirectorDetails`;

let DateACE_Req = `${slice_base_url}/DateAPI_ACEAPI`;
let UserNotification_Req = `${capitalUrl}/api/get-subscription-user`;
let SentNotification_Req = `${capitalUrl}/api/sent_notification`;

export const companyNotesAPI = createAsyncThunk(
  "companyNotes",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(`${companyNotesReq}`, all_params);
    return response?.data;
  }
);



export const UploadDocumentAPI = createAsyncThunk(
  "UploadDocument",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(`${UploadDocumentReq}`, all_params);
    return response?.data;
  }
);

export const MultipleFileUploaderAPI = createAsyncThunk(
  "MultipleFileUploader",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(`${MultipleFileUploaderReq}`, all_params);
    return response?.data;
  }
);

export const RepositoryListAPI = createAsyncThunk(
  "RepositoryList",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(`${RepositoryListReq}`, all_params);
    return response?.data;
  }
);

// ForensicTabsApi Thunk
export const ForensicTabsShowHideApi = createAsyncThunk(
  "ForensicTabShowHide",
  async (param) => {
    const response = await axios.post(`${ForensicTabsShowHideReq}`, param);
    return response?.data;
  }
);

// UploadDocumentAnalysNoteApi Thunk
export const UploadDocumentAnalysNoteApi = createAsyncThunk(
  "UploadDocumentAnalysNote",
  async (all_params = {}) => {
    const response = await axios.post(
      `${UploadDocumentAnalysNotesReq}`,
      all_params
    );
    return response?.data;
  }
);

export const QuarterlyResultApi = createAsyncThunk(
  "QuarterlyResult",
  async (all_params = {}) => {
    const response = await axios.post(`${QuarterlyResultReq}`, all_params);
    return response?.data;
  }
);

export const SCData20YearsApi = createAsyncThunk(
  "SCData20Years",
  async (all_params = {}) => {
    const response = await axios.post(`${SCData20YearsReq}`, all_params);
    return response?.data;
  }
);

export const SCQtrSegmentApi = createAsyncThunk(
  "SCQtrSegment",
  async (all_params = {}) => {
    const response = await axios.post(`${SCQtrSegmentReq}`, all_params);
    return response?.data;
  }
);

export const SCQuarterlyResultSnapShotApi = createAsyncThunk(
  "SCQuarterlyResultSnapShot",
  async (all_params = {}) => {
    const response = await axios.post(
      `${SCQuarterlyResultSnapShotReq}`,
      all_params
    );
    return response?.data;
  }
);

export const SCAnnualP_LApi = createAsyncThunk(
  "SCAnnualP_L",
  async (all_params = {}) => {
    const response = await axios.post(`${SCAnnualP_LReq}`, all_params);
    return response?.data;
  }
);

export const SCAnnualP_LChartApi = createAsyncThunk(
  "SCAnnualP_LChart",
  async (all_params = {}) => {
    const response = await axios.post(`${SCAnnualP_LChartReq}`, all_params);
    return response?.data;
  }
);

export const SCBalanceSheetApi = createAsyncThunk(
  "SCBalanceSheet",
  async (all_params = {}) => {
    const response = await axios.post(`${SCBalanceSheetReq}`, all_params);
    return response?.data;
  }
);

export const SCCashFlowApi = createAsyncThunk(
  "SCCashFlow",
  async (all_params = {}) => {
    const response = await axios.post(`${SCCashFlowReq}`, all_params);
    return response?.data;
  }
);

export const SCRatiosApi = createAsyncThunk(
  "SCRatios",
  async (all_params = {}) => {
    const response = await axios.post(`${SCRatiosReq}`, all_params);
    return response?.data;
  }
);

export const SCPeersApi = createAsyncThunk(
  "SCPeers",
  async (all_params = {}) => {
    const response = await axios.post(`${SCPeersReq}`, all_params);
    return response?.data;
  }
);

export const PeerAnalysisApi = createAsyncThunk(
  "PeerAnalysis",
  async (all_params = {}) => {
    const response = await axios.post(`${PeerAnalysisReq}`, all_params);
    return response?.data;
  }
);

export const SCShareHoldingApi = createAsyncThunk(
  "SCShareHolding",
  async (all_params = {}) => {
    const response = await axios.post(`${SCShareHoldingReq}`, all_params);
    return response?.data;
  }
);

// export const SCMediaRoomApi = createAsyncThunk(
//   "SCMediaRoom",
//   async (all_params = {}) => {
//     const response = await axios.post(`${SCMediaRoomReq}`, all_params);
//     return response?.data;
//   }
// );

export const SCValuationDataApi = createAsyncThunk(
  "SCValuationData",
  async (all_params = {}) => {
    const response = await axios.post(`${SCValuationDataReq}`, all_params);
    return response?.data;
  }
);

// ForensicsApi Thunk
export const ForensicApi = createAsyncThunk(
  "Forensic",
  async (all_param = {}) => {
    const response = await axios.post(`${ForensicReq}`, all_param);
    return response?.data;
  }
);

// ForensicCommentApi Thunk
export const ForensicCommentApi = createAsyncThunk(
  "ForensicComment",
  async (all_param = {}) => {
    const response = await axios.post(`${ForensicCommentReq}`, all_param);
    return response?.data;
  }
);

// ForensiTooltipApi Thunk
export const ForensiTooltipApi = createAsyncThunk(
  "ForensiTooltip",
  async (all_param = {}) => {
    const response = await axios.post(`${ForensiTooltipReq}`, all_param);
    return response?.data;
  }
);

// MediaRoomApi Thunk
export const MediaRoomApi = createAsyncThunk(
  "MediaRoom",
  async (all_param = {}) => {
    const response = await axios.post(`${MediaRoomReq}`, all_param);
    return response?.data;
  }
);
// MediaCommentWithReply Thunk
export const MediaCommentApi = createAsyncThunk(
  "MediaComment",
  async (all_param = {}) => {
    const response = await axios.post(`${MediaCommentReq}`, all_param);
    return response?.data;
  }
);

// VideoLikeDislikeApi Thunk
export const VideoLikeDislikeApi = createAsyncThunk(
  "VideoLikeDislike",
  async (all_param = {}) => {
    const response = await axios.post(`${VideoLikeDislikeReq}`, all_param);
    return response?.data;
  }
);

// MediaCommentLikeDislike Thunk
export const MediaCommentLikeDislikeApi = createAsyncThunk(
  "MediaCommentLikeDislike",
  async (all_param = {}) => {
    const response = await axios.post(`${MediaCommentLikeDislikeReq}`, all_param);
    return response?.data;
  }
);

// ResultDocumentApi Thunk
export const ResultDocumentApi = createAsyncThunk(
  "ResultDocument",
  async (all_param = {}) => {
    const response = await axios.post(`${ResultDocumentReq}`, all_param);
    return response?.data;
  }
);

// BoardOfDirectorDetail Thunk
export const BoardOfDirectorDetailApi = createAsyncThunk(
  "BoardOfDirectorDetail",
  async (all_param = {}) => {
    const response = await axios.post(`${BoardOfDirectorDetailReq}`, all_param);
    return response?.data;
  }
);

// DateACE Thunk
export const DateACEApi = createAsyncThunk(
  "DateACE",
  async (all_param = {}) => {
    const response = await axios.get(`${DateACE_Req}`);
    return response?.data;
  }
);

// UserNotificationApi Thunk
export const UserNotificationApi = createAsyncThunk(
  "UserNotificationApi",
  // eslint-disable-next-line no-unused-vars
  async (all_param = {}) => {
    const response = await axios.post(`${UserNotification_Req}`);
    return response?.data;
  }
);

// SentNotification_Req Thunk
export const SentNotificationApi = createAsyncThunk(
  "SentNotification",
  // eslint-disable-next-line no-unused-vars
  async (all_param = {}) => {
    const response = await axios.post(`${SentNotification_Req}`, all_param);
    return response?.data;
  }
);

const SingleCompanySlice = createSlice({
  name: "SingleCompany",
  initialState: initialState,
  reducers: {
    BarChartData_Columns_Rows: (state, action) => {
      state.BarChartData.Columns_Rows.Columns = action.payload.columns;
      state.BarChartData.Columns_Rows.Rows = action.payload.rows;
      state.BarChartData.Open = true;
      state.BarChartData.isPercentage = action.payload.isPercentage
        ? true
        : false;
    },
    BarChartData_Columns_Rows_close: (state) => {
      state.BarChartData.Columns_Rows.Columns = [];
      state.BarChartData.Columns_Rows.Rows = {};
      state.BarChartData.Open = false;
      state.BarChartData.isPercentage = false;
    },
    BarChartData_Open: (state, action) => {
      state.BarChartData.Open = action.payload;
    },
  },
  extraReducers: (builder) => {
    // // START companyNotes DATA
    builder.addCase(companyNotesAPI.pending, (state) => {
      state.companyNotes.loading = true;
      state.companyNotes.error = false;
      state.companyNotes.msgType = null;
    });
    builder.addCase(companyNotesAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.companyNotes.data = action.payload;
      state.companyNotes.loading = false;
      state.companyNotes.msg = "success";
      state.companyNotes.msgType = "success";
    });
    builder.addCase(companyNotesAPI.rejected, (state, action) => {
      state.companyNotes.loading = false;
      state.companyNotes.error = true;
      state.companyNotes.msgType = "error";
      state.companyNotes.msg = action.payload?.msg;
      state.companyNotes.data = action.payload;
    });
    // // END companyNotes DATA

    // // START UploadDocument DATA
    builder.addCase(UploadDocumentAPI.pending, (state) => {
      state.UploadDocument.loading = true;
      state.UploadDocument.error = false;
      state.UploadDocument.msgType = null;
    });
    builder.addCase(UploadDocumentAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.UploadDocument.data = action.payload?.Data || [];
      state.UploadDocument.loading = false;
      state.UploadDocument.msg = "success";
      state.UploadDocument.msgType = "success";
    });
    builder.addCase(UploadDocumentAPI.rejected, (state, action) => {
      state.UploadDocument.loading = false;
      state.UploadDocument.error = true;
      state.UploadDocument.msgType = "error";
      state.UploadDocument.msg = action.payload?.msg;
      state.UploadDocument.data = action.payload;
    });
    // // END UploadDocument DATA

    // // START MultipleFileUploader DATA
    builder.addCase(MultipleFileUploaderAPI.pending, (state) => {
      state.MultipleFileUploader.loading = true;
      state.MultipleFileUploader.error = false;
      state.MultipleFileUploader.msgType = null;
    });
    builder.addCase(MultipleFileUploaderAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.MultipleFileUploader.data = action.payload?.Data || [];
      state.MultipleFileUploader.loading = false;
      state.MultipleFileUploader.msg = "success";
      state.MultipleFileUploader.msgType = "success";
    });
    builder.addCase(MultipleFileUploaderAPI.rejected, (state, action) => {
      state.MultipleFileUploader.loading = false;
      state.MultipleFileUploader.error = true;
      state.MultipleFileUploader.msgType = "error";
      state.MultipleFileUploader.msg = action.payload?.msg;
      state.MultipleFileUploader.data = action.payload;
    });
    // // END MultipleFileUploader DATA

    // // START RepositoryList DATA
    builder.addCase(RepositoryListAPI.pending, (state) => {
      state.RepositoryList.loading = true;
      state.RepositoryList.error = false;
      state.RepositoryList.msgType = null;
    });
    builder.addCase(RepositoryListAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.RepositoryList.data = action.payload || [];
      state.RepositoryList.loading = false;
      state.RepositoryList.msg = "success";
      state.RepositoryList.msgType = "success";
    });
    builder.addCase(RepositoryListAPI.rejected, (state, action) => {
      state.RepositoryList.loading = false;
      state.RepositoryList.error = true;
      state.RepositoryList.msgType = "error";
      state.RepositoryList.msg = action.payload?.msg;
      state.RepositoryList.data = action.payload;
    });
    // // END RepositoryList DATA

    // Start UploadDocumentAnalysNoteData
    builder.addCase(UploadDocumentAnalysNoteApi.pending, (state) => {
      state.UploadDocumentAnalysNote.loading = true;
      state.UploadDocumentAnalysNote.error = false;
      state.UploadDocumentAnalysNote.msg = false;
    });
    builder.addCase(UploadDocumentAnalysNoteApi.fulfilled, (state, action) => {
      state.UploadDocumentAnalysNote.loading = false;
      state.UploadDocumentAnalysNote.data = action.payload;
      state.UploadDocumentAnalysNote.msg = "success";
      // state.UploadDocumentAnalysNote.error = state.UploadDocumentAnalysNote.error
    });
    builder.addCase(UploadDocumentAnalysNoteApi.rejected, (state, action) => {
      state.UploadDocumentAnalysNote.loading = false;
      state.UploadDocumentAnalysNote.data = action.payload;
      state.UploadDocumentAnalysNote.msg = action.payload?.msg;
      state.UploadDocumentAnalysNote.error = true;
    });
    // End UploadDocumentAnalysNoteData

    // Start QuarterlyResult
    builder.addCase(QuarterlyResultApi.pending, (state) => {
      state.QuarterlyResult.loading = true;
      state.QuarterlyResult.error = false;
      state.QuarterlyResult.msg = false;
    });
    builder.addCase(QuarterlyResultApi.fulfilled, (state, action) => {
      state.QuarterlyResult.loading = false;
      state.QuarterlyResult.data = action.payload;
      state.QuarterlyResult.msg = "success";
    });
    builder.addCase(QuarterlyResultApi.rejected, (state, action) => {
      state.QuarterlyResult.loading = false;
      state.QuarterlyResult.data = action.payload;
      state.QuarterlyResult.msg = action.payload?.msg;
      state.QuarterlyResult.error = true;
    });
    // End QuarterlyResult

    // Start SCData20Years
    builder.addCase(SCData20YearsApi.pending, (state) => {
      state.SCData20Years.loading = true;
      state.SCData20Years.error = false;
      state.SCData20Years.msg = false;
    });
    builder.addCase(SCData20YearsApi.fulfilled, (state, action) => {
      state.SCData20Years.loading = false;
      state.SCData20Years.data = action.payload;
      state.SCData20Years.msg = "success";
    });
    builder.addCase(SCData20YearsApi.rejected, (state, action) => {
      state.SCData20Years.loading = false;
      state.SCData20Years.data = action.payload;
      state.SCData20Years.msg = action.payload?.msg;
      state.SCData20Years.error = true;
    });
    // End SCData20Years

    // Start SCQtrSegment
    builder.addCase(SCQtrSegmentApi.pending, (state) => {
      state.SCQtrSegment.loading = true;
      state.SCQtrSegment.error = false;
      state.SCQtrSegment.msg = false;
    });
    builder.addCase(SCQtrSegmentApi.fulfilled, (state, action) => {
      state.SCQtrSegment.loading = false;
      state.SCQtrSegment.data = action.payload;
      state.SCQtrSegment.msg = "success";
    });
    builder.addCase(SCQtrSegmentApi.rejected, (state, action) => {
      state.SCQtrSegment.loading = false;
      state.SCQtrSegment.data = action.payload;
      state.SCQtrSegment.msg = action.payload?.msg;
      state.SCQtrSegment.error = true;
    });
    // End SCQtrSegment

    // Start SCQuarterlyResultSnapShot
    builder.addCase(SCQuarterlyResultSnapShotApi.pending, (state) => {
      state.SCQuarterlyResultSnapShot.loading = true;
      state.SCQuarterlyResultSnapShot.error = false;
      state.SCQuarterlyResultSnapShot.msg = false;
    });
    builder.addCase(SCQuarterlyResultSnapShotApi.fulfilled, (state, action) => {
      state.SCQuarterlyResultSnapShot.loading = false;
      state.SCQuarterlyResultSnapShot.data = action.payload;
      state.SCQuarterlyResultSnapShot.msg = "success";
    });
    builder.addCase(SCQuarterlyResultSnapShotApi.rejected, (state, action) => {
      state.SCQuarterlyResultSnapShot.loading = false;
      state.SCQuarterlyResultSnapShot.data = action.payload;
      state.SCQuarterlyResultSnapShot.msg = action.payload?.msg;
      state.SCQuarterlyResultSnapShot.error = true;
    });
    // End SCQuarterlyResultSnapShot

    // Start SCAnnualP_L
    builder.addCase(SCAnnualP_LApi.pending, (state) => {
      state.SCAnnualP_L.loading = true;
      state.SCAnnualP_L.error = false;
      state.SCAnnualP_L.msg = false;
    });
    builder.addCase(SCAnnualP_LApi.fulfilled, (state, action) => {
      state.SCAnnualP_L.loading = false;
      state.SCAnnualP_L.data = action.payload;
      state.SCAnnualP_L.msg = "success";
    });
    builder.addCase(SCAnnualP_LApi.rejected, (state, action) => {
      state.SCAnnualP_L.loading = false;
      state.SCAnnualP_L.data = action.payload;
      state.SCAnnualP_L.msg = action.payload?.msg;
      state.SCAnnualP_L.error = true;
    });
    // End SCAnnualP_L

    // Start SCAnnualP_LChart
    builder.addCase(SCAnnualP_LChartApi.pending, (state) => {
      state.SCAnnualP_LChart.loading = true;
      state.SCAnnualP_LChart.error = false;
      state.SCAnnualP_LChart.msg = false;
    });
    builder.addCase(SCAnnualP_LChartApi.fulfilled, (state, action) => {
      state.SCAnnualP_LChart.loading = false;
      state.SCAnnualP_LChart.data = action.payload;
      state.SCAnnualP_LChart.msg = "success";
    });
    builder.addCase(SCAnnualP_LChartApi.rejected, (state, action) => {
      state.SCAnnualP_LChart.loading = false;
      state.SCAnnualP_LChart.data = action.payload;
      state.SCAnnualP_LChart.msg = action.payload?.msg;
      state.SCAnnualP_LChart.error = true;
    });
    // End SCAnnualP_LChart

    // Start SCBalanceSheet
    builder.addCase(SCBalanceSheetApi.pending, (state) => {
      state.SCBalanceSheet.loading = true;
      state.SCBalanceSheet.error = false;
      state.SCBalanceSheet.msg = false;
    });
    builder.addCase(SCBalanceSheetApi.fulfilled, (state, action) => {
      state.SCBalanceSheet.loading = false;
      state.SCBalanceSheet.data = action.payload;
      state.SCBalanceSheet.msg = "success";
    });
    builder.addCase(SCBalanceSheetApi.rejected, (state, action) => {
      state.SCBalanceSheet.loading = false;
      state.SCBalanceSheet.data = action.payload;
      state.SCBalanceSheet.msg = action.payload?.msg;
      state.SCBalanceSheet.error = true;
    });
    // End SCBalanceSheet

    // Start SCCashFlow
    builder.addCase(SCCashFlowApi.pending, (state) => {
      state.SCCashFlow.loading = true;
      state.SCCashFlow.error = false;
      state.SCCashFlow.msg = false;
    });
    builder.addCase(SCCashFlowApi.fulfilled, (state, action) => {
      state.SCCashFlow.loading = false;
      state.SCCashFlow.data = action.payload;
      state.SCCashFlow.msg = "success";
    });
    builder.addCase(SCCashFlowApi.rejected, (state, action) => {
      state.SCCashFlow.loading = false;
      state.SCCashFlow.data = action.payload;
      state.SCCashFlow.msg = action.payload?.msg;
      state.SCCashFlow.error = true;
    });
    // End SCCashFlow

    // Start SCRatios
    builder.addCase(SCRatiosApi.pending, (state) => {
      state.SCRatios.loading = true;
      state.SCRatios.error = false;
      state.SCRatios.msg = false;
    });
    builder.addCase(SCRatiosApi.fulfilled, (state, action) => {
      state.SCRatios.loading = false;
      state.SCRatios.data = action.payload;
      state.SCRatios.msg = "success";
    });
    builder.addCase(SCRatiosApi.rejected, (state, action) => {
      state.SCRatios.loading = false;
      state.SCRatios.data = action.payload;
      state.SCRatios.msg = action.payload?.msg;
      state.SCRatios.error = true;
    });
    // End SCRatios

    // Start SCPeers
    builder.addCase(SCPeersApi.pending, (state) => {
      state.SCPeers.loading = true;
      state.SCPeers.error = false;
      state.SCPeers.msg = false;
    });
    builder.addCase(SCPeersApi.fulfilled, (state, action) => {
      state.SCPeers.loading = false;
      state.SCPeers.data = action.payload;
      state.SCPeers.msg = "success";
    });
    builder.addCase(SCPeersApi.rejected, (state, action) => {
      state.SCPeers.loading = false;
      state.SCPeers.data = action.payload;
      state.SCPeers.msg = action.payload?.msg;
      state.SCPeers.error = true;
    });
    // End SCPeers

    // Start Peer Analysis
    builder.addCase(PeerAnalysisApi.pending, (state) => {
      state.PeerAnalysis.loading = true;
      state.PeerAnalysis.error = false;
      state.PeerAnalysis.msg = false;
    });
    builder.addCase(PeerAnalysisApi.fulfilled, (state, action) => {
      state.PeerAnalysis.loading = false;
      state.PeerAnalysis.data = action.payload;
      state.PeerAnalysis.msg = "success";
    });
    builder.addCase(PeerAnalysisApi.rejected, (state, action) => {
      state.PeerAnalysis.loading = false;
      state.PeerAnalysis.data = action.payload;
      state.PeerAnalysis.msg = action.payload?.msg;
      state.PeerAnalysis.error = true;
    });
    // End Peer Analysis

    // Start SCShareHolding
    builder.addCase(SCShareHoldingApi.pending, (state) => {
      state.SCShareHolding.loading = true;
      state.SCShareHolding.error = false;
      state.SCShareHolding.msg = false;
    });
    builder.addCase(SCShareHoldingApi.fulfilled, (state, action) => {
      state.SCShareHolding.loading = false;
      state.SCShareHolding.data = action.payload;
      state.SCShareHolding.msg = "success";
    });
    builder.addCase(SCShareHoldingApi.rejected, (state, action) => {
      state.SCShareHolding.loading = false;
      state.SCShareHolding.data = action.payload;
      state.SCShareHolding.msg = action.payload?.msg;
      state.SCShareHolding.error = true;
    });
    // End SCShareHolding

    // // Start SCMediaRoom
    // builder.addCase(SCMediaRoomApi.pending, (state) => {
    //   state.SCMediaRoom.loading = true;
    //   state.SCMediaRoom.error = false;
    //   state.SCMediaRoom.msg = false;
    // });
    // builder.addCase(SCMediaRoomApi.fulfilled, (state, action) => {
    //   state.SCMediaRoom.loading = false;
    //   state.SCMediaRoom.data = action.payload;
    //   state.SCMediaRoom.msg = "success";
    // });
    // builder.addCase(SCMediaRoomApi.rejected, (state, action) => {
    //   state.SCMediaRoom.loading = false;
    //   state.SCMediaRoom.data = action.payload;
    //   state.SCMediaRoom.msg = action.payload?.msg;
    //   state.SCMediaRoom.error = true;
    // });
    // // End SCShareHolding

    // Start SCValuationData
    builder.addCase(SCValuationDataApi.pending, (state) => {
      state.SCValuationData.loading = true;
      state.SCValuationData.error = false;
      state.SCValuationData.msg = false;
    });
    builder.addCase(SCValuationDataApi.fulfilled, (state, action) => {
      state.SCValuationData.loading = false;
      state.SCValuationData.data = action.payload;
      state.SCValuationData.msg = "success";
    });
    builder.addCase(SCValuationDataApi.rejected, (state, action) => {
      state.SCValuationData.loading = false;
      state.SCValuationData.data = action.payload;
      state.SCValuationData.msg = action.payload?.msg;
      state.SCValuationData.error = true;
    });
    // End SCShareHolding

    // Start ForensicTabData
    builder.addCase(ForensicTabsShowHideApi.pending, (state) => {
      (state.ForensicTabShowHide.loading = true),
        (state.ForensicTabShowHide.error = false),
        (state.ForensicTabShowHide.msg = false);
    });
    builder.addCase(ForensicTabsShowHideApi.fulfilled, (state, action) => {
      (state.ForensicTabShowHide.loading = false),
        (state.ForensicTabShowHide.data = action.payload?.Data || []);
      state.ForensicTabShowHide.msg = "success";
      // state.ForensicTabShowHide.error = state.ForensicTab.error
    });
    builder.addCase(ForensicTabsShowHideApi.rejected, (state, action) => {
      (state.ForensicTabShowHide.loading = false),
        (state.ForensicTabShowHide.data = action.payload);
      state.ForensicTabShowHide.msg = action.payload?.msg;
      state.ForensicTabShowHide.error = true;
    });
    // End ForensicTabData

    // Start ForensicData
    builder.addCase(ForensicApi.pending, (state) => {
      (state.Forensic.loading = true),
        (state.Forensic.error = false),
        (state.Forensic.msg = false);
    });
    builder.addCase(ForensicApi.fulfilled, (state, action) => {
      state.Forensic.loading = false;
      state.Forensic.data = action.payload?.Data || [];
      state.Forensic.button_status = action.payload?.button_status || {};
      state.Forensic.msg = "success";
      // state.Forensic.error = state.ForensicTab.error
    });
    builder.addCase(ForensicApi.rejected, (state, action) => {
      (state.Forensic.loading = false), (state.Forensic.data = action.payload);
      state.Forensic.msg = action.payload?.msg;
      state.Forensic.error = true;
    });
    // End ForensicData

    
    // Start ForensicComment
    builder.addCase(ForensicCommentApi.pending, (state) => {
      (state.ForensicComment.loading = true),
        (state.ForensicComment.error = false),
        (state.ForensicComment.msg = false);
    });
    builder.addCase(ForensicCommentApi.fulfilled, (state, action) => {
      state.ForensicComment.loading = false;
      state.ForensicComment.data = action.payload?.Data || [];
      state.ForensicComment.button_status = action.payload?.button_status || {};
      state.ForensicComment.msg = "success";
    });
    builder.addCase(ForensicCommentApi.rejected, (state, action) => {
      (state.ForensicComment.loading = false), (state.ForensicComment.data = action.payload);
      state.ForensicComment.msg = action.payload?.msg;
      state.ForensicComment.error = true;
    });
    // End ForensicComment


    // // START  ForensiTooltip DATA
    builder.addCase(ForensiTooltipApi.pending, (state) => {
      state.ForensiTooltip.loading = true;
      state.ForensiTooltip.error = false;
      state.ForensiTooltip.msgType = null;
    });
    builder.addCase(ForensiTooltipApi.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.ForensiTooltip.data = action.payload;
      state.ForensiTooltip.loading = false;
      state.ForensiTooltip.msg = "success";
      state.ForensiTooltip.msgType = "success";
    });
    builder.addCase(ForensiTooltipApi.rejected, (state, action) => {
      state.ForensiTooltip.loading = false;
      state.ForensiTooltip.error = true;
      state.ForensiTooltip.msgType = "error";
      state.ForensiTooltip.msg = action.payload?.msg;
      state.ForensiTooltip.data = action.payload;
    });
    // // END ForensiTooltip DATA

    // // START  MediaRoom DATA
    builder.addCase(MediaRoomApi.pending, (state) => {
      state.MediaRoom.loading = true;
      state.MediaRoom.error = false;
      state.MediaRoom.msgType = null;
    });
    builder.addCase(MediaRoomApi.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.MediaRoom.data = action.payload;
      state.MediaRoom.loading = false;
      state.MediaRoom.msg = "success";
      state.MediaRoom.msgType = "success";
    });
    builder.addCase(MediaRoomApi.rejected, (state, action) => {
      state.MediaRoom.loading = false;
      state.MediaRoom.error = true;
      state.MediaRoom.msgType = "error";
      state.MediaRoom.msg = action.payload?.msg;
      state.MediaRoom.data = action.payload;
    });
    // // END MediaRoom DATA

    // // START MediaComment DATA
    builder.addCase(MediaCommentApi.pending, (state) => {
      state.MediaComment.loading = true;
      state.MediaComment.error = false;
      state.MediaComment.msgType = null;
    });
    builder.addCase(MediaCommentApi.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.MediaComment.data = action.payload;
      state.MediaComment.loading = false;
      state.MediaComment.msg = "success";
      state.MediaComment.msgType = "success";
    });
    builder.addCase(MediaCommentApi.rejected, (state, action) => {
      state.MediaComment.loading = false;
      state.MediaComment.error = true;
      state.MediaComment.msgType = "error";
      state.MediaComment.msg = action.payload?.msg;
      state.MediaComment.data = action.payload;
    });
    // // END MediaComment DATA

    // // START  VideoLikeDislike DATA
    builder.addCase(VideoLikeDislikeApi.pending, (state) => {
      state.VideoLikeDislike.loading = true;
      state.VideoLikeDislike.error = false;
      state.VideoLikeDislike.msgType = null;
    });
    builder.addCase(VideoLikeDislikeApi.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.VideoLikeDislike.data = action.payload;
      state.VideoLikeDislike.loading = false;
      state.VideoLikeDislike.msg = "success";
      state.VideoLikeDislike.msgType = "success";
    });
    builder.addCase(VideoLikeDislikeApi.rejected, (state, action) => {
      state.VideoLikeDislike.loading = false;
      state.VideoLikeDislike.error = true;
      state.VideoLikeDislike.msgType = "error";
      state.VideoLikeDislike.msg = action.payload?.msg;
      state.VideoLikeDislike.data = action.payload;
    });
    // // END VideoLikeDislike DATA

    // // START  MediaCommentLikeDislike DATA
    builder.addCase(MediaCommentLikeDislikeApi.pending, (state) => {
      state.MediaCommentLikeDislike.loading = true;
      state.MediaCommentLikeDislike.error = false;
      state.MediaCommentLikeDislike.msgType = null;
    });
    builder.addCase(MediaCommentLikeDislikeApi.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.MediaCommentLikeDislike.data = action.payload.Data?.[0] || {};
      state.MediaCommentLikeDislike.loading = false;
      state.MediaCommentLikeDislike.msg = "success";
      state.MediaCommentLikeDislike.msgType = "success";
    });
    builder.addCase(MediaCommentLikeDislikeApi.rejected, (state, action) => {
      state.MediaCommentLikeDislike.loading = false;
      state.MediaCommentLikeDislike.error = true;
      state.MediaCommentLikeDislike.msgType = "error";
      state.MediaCommentLikeDislike.msg = action.payload?.msg;
      state.MediaCommentLikeDislike.data = action.payload;
    });
    // // END MediaCommentLikeDislike DATA

    // // START  ResultDocument DATA
    builder.addCase(ResultDocumentApi.pending, (state) => {
      state.ResultDocument.loading = true;
      state.ResultDocument.error = false;
      state.ResultDocument.msgType = null;
    });
    builder.addCase(ResultDocumentApi.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.ResultDocument.data = action.payload?.Data || [];
      state.ResultDocument.loading = false;
      state.ResultDocument.msg = "success";
      state.ResultDocument.msgType = "success";
    });
    builder.addCase(ResultDocumentApi.rejected, (state, action) => {
      state.ResultDocument.loading = false;
      state.ResultDocument.error = true;
      state.ResultDocument.msgType = "error";
      state.ResultDocument.msg = action.payload?.msg;
      state.ResultDocument.data = action.payload;
    });
    // // END ResultDocument DATA

    // // START  BoardOfDirectorDetail DATA
    builder.addCase(BoardOfDirectorDetailApi.pending, (state) => {
      state.BoardOfDirectorDetail.loading = true;
      state.BoardOfDirectorDetail.error = false;
      state.BoardOfDirectorDetail.msgType = null;
    });
    builder.addCase(BoardOfDirectorDetailApi.fulfilled, (state, action) => {
      state.BoardOfDirectorDetail.data = action.payload || [];
      state.BoardOfDirectorDetail.loading = false;
      state.BoardOfDirectorDetail.msg = "success";
      state.BoardOfDirectorDetail.msgType = "success";
    });
    builder.addCase(BoardOfDirectorDetailApi.rejected, (state, action) => {
      state.BoardOfDirectorDetail.loading = false;
      state.BoardOfDirectorDetail.error = true;
      state.BoardOfDirectorDetail.msgType = "error";
      state.BoardOfDirectorDetail.msg = action.payload?.msg;
      state.BoardOfDirectorDetail.data = action.payload;
    });
    // // END BoardOfDirectorDetail DATA

    // // START  DateACE DATA
    builder.addCase(DateACEApi.pending, (state) => {
      state.DateACE.loading = true;
      state.DateACE.error = false;
      state.DateACE.msgType = null;
    });
    builder.addCase(DateACEApi.fulfilled, (state, action) => {
      state.DateACE.data = action.payload?.Data?.[0] || {};
      state.DateACE.loading = false;
      state.DateACE.msg = "success";
      state.DateACE.msgType = "success";
    });
    builder.addCase(DateACEApi.rejected, (state, action) => {
      state.DateACE.loading = false;
      state.DateACE.error = true;
      state.DateACE.msgType = "error";
      state.DateACE.msg = action.payload?.msg;
      state.DateACE.data = action.payload;
    });
    // // END DateACE DATA

    // // START  UserNotification DATA
    builder.addCase(UserNotificationApi.pending, (state) => {
      state.UserNotification.loading = true;
      state.UserNotification.error = false;
      state.UserNotification.msgType = null;
    });
    builder.addCase(UserNotificationApi.fulfilled, (state, action) => {
      state.UserNotification.data = action.payload?.data || {};
      state.UserNotification.loading = false;
      state.UserNotification.msg = "success";
      state.UserNotification.msgType = "success";
    });
    builder.addCase(UserNotificationApi.rejected, (state, action) => {
      state.UserNotification.loading = false;
      state.UserNotification.error = true;
      state.UserNotification.msgType = "error";
      state.UserNotification.msg = action.payload?.msg;
      state.UserNotification.data = action.payload;
    });
    // // END UserNotification

    // // START  SentNotification DATA
    builder.addCase(SentNotificationApi.pending, (state) => {
      state.SentNotification.loading = true;
      state.SentNotification.error = false;
      state.SentNotification.msgType = null;
    });
    builder.addCase(SentNotificationApi.fulfilled, (state, action) => {
      state.SentNotification.data = action.payload?.data || {};
      state.SentNotification.loading = false;
      state.SentNotification.msg = "success";
      state.SentNotification.msgType = "success";
    });
    builder.addCase(SentNotificationApi.rejected, (state, action) => {
      state.SentNotification.loading = false;
      state.SentNotification.error = true;
      state.SentNotification.msgType = "error";
      state.SentNotification.msg = action.payload?.msg;
      state.SentNotification.data = action.payload;
    });
    // // END SentNotification


  },
});

// eslint-disable-next-line no-empty-pattern
export const {
  BarChartData_Columns_Rows,
  BarChartData_Columns_Rows_close,
  BarChartData_Open,
} = SingleCompanySlice.actions;

export default SingleCompanySlice.reducer;
