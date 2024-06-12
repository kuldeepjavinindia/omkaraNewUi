import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/helper";

const initialState = {
  sectorMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  industryMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  companyMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  allCompanyMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  turnAroundMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  FIISDateMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  vdrLevel: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  EmployeeMaster: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
  RatioMaster: {
    loading: true,
    data: [],
    other_companies: [],
    selected_companies: [],
    isSelected: [],
    msg: null,
    error: null,
  },
  DefaultMasters: {
    loading: true,
    data: [],
    msg: null,
    error: null,
  },
};

// eslint-disable-next-line no-unused-vars
const slice_base_url = API_BASE_URL();
const MAIN_SITE_BASE_URL = import.meta.env.MAIN_SITE_BASE_URL+'/api';

//  VDR REQUESTs
let vdrLevelReq = `${slice_base_url}/VDRlevelmaster`;
let EmployeeMasterReq = `${slice_base_url}/EmployeeMaster`;
let RatioMasterReq = `${slice_base_url}/RatioMaster`;


//  USER REQUESTs
let sectorMasterReq = `${slice_base_url}/sectormaster`;
let industryMasterReq = `${slice_base_url}/industrymaster`;
let companyMasterReq = `${slice_base_url}/SymbolMaster_New`; //POST and { "search": "" }   //SymbolMaster added search key for filter data by server 


let allCompanyMasterReq = `${slice_base_url}/SymbolMaster`; //POST 


let turnAroundMasterReq = `${slice_base_url}/turnaroundfilter`;
let FIISDateMasterReq = `${slice_base_url}/FIISDateMaster`;



// OMKARA CAPITAL API
let DefaultMastersReq = `${MAIN_SITE_BASE_URL}/default-masters`;


export const sectorMasterAPI = createAsyncThunk(
  "sectorMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.get(
      `${sectorMasterReq}`
    );
    return response?.data;
  }
);


export const industryMasterAPI = createAsyncThunk(
  "industryMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.get(
      `${industryMasterReq}`
    );
    return response?.data;
  }
);


export const companyMasterAPI = createAsyncThunk(
  "companyMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${companyMasterReq}`,
      all_params
    );
    return response?.data;
  }
);


export const allCompanyMasterAPI = createAsyncThunk(
  "allCompanyMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.get(
      `${allCompanyMasterReq}`
    );
    return response?.data;
  }
);

export const turnAroundMasterAPI = createAsyncThunk(
  "turnAroundMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.get(
      `${turnAroundMasterReq}`
    );
    return response?.data;
  }
);

export const FIISDateMasterAPI = createAsyncThunk(
  "FIISDateMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.get(
      `${FIISDateMasterReq}`
    );
    return response?.data;
  }
);

export const vdrLevelAPI = createAsyncThunk(
  "vdrLevel",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${vdrLevelReq}`
    );
    return response?.data;
  }
);

export const EmployeeMasterAPI = createAsyncThunk(
  "EmployeeMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${EmployeeMasterReq}`
    );
    return response?.data;
  }
);

export const RatioMasterAPI = createAsyncThunk(
  "RatioMaster",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.post(
      `${RatioMasterReq}`
    );
    return response?.data;
  }
);

export const DefaultMastersAPI = createAsyncThunk(
  "DefaultMasters",
  // eslint-disable-next-line no-unused-vars
  async (all_params = {}) => {
    const response = await axios.get(
      `${DefaultMastersReq}`
    );
    return response?.data;
  }
);



const TrendlyneSlice = createSlice({
  name: "Trendlyne",
  initialState: initialState,
  reducers: {
    ratioMaterSelectedCompanies: (state, action) => {
      let other_companies = action.payload.map((item) => item?.value);
      state.RatioMaster.selected_companies = action.payload;
      state.RatioMaster.other_companies = other_companies;
    },
    ratioMaterSelected: (state, action) => {
      state.RatioMaster.isSelected = action.payload;
    }

  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {
    // // START sectorMaster DATA
    builder.addCase(sectorMasterAPI.pending, (state) => {
      state.sectorMaster.loading = true;
      state.sectorMaster.error = false;
      state.sectorMaster.msgType = null;
    });
    builder.addCase(sectorMasterAPI.fulfilled, (state, action) => {
      //   let allData = current(state);

      state.sectorMaster.data = action.payload;
      state.sectorMaster.loading = false;
      state.sectorMaster.msg = "success";
      state.sectorMaster.msgType = "success";
    });
    builder.addCase(sectorMasterAPI.rejected, (state, action) => {
      state.sectorMaster.loading = false;
      state.sectorMaster.error = true;
      state.sectorMaster.msgType = "error";
      state.sectorMaster.msg = action.payload?.msg;
      state.sectorMaster.data = action.payload;
    });
    // // END sectorMaster DATA
    

    // // START industryMaster DATA
    builder.addCase(industryMasterAPI.pending, (state) => {
      state.industryMaster.loading = true;
      state.industryMaster.error = false;
      state.industryMaster.msgType = null;
    });
    builder.addCase(industryMasterAPI.fulfilled, (state, action) => {
      state.industryMaster.data = action.payload;
      state.industryMaster.loading = false;
      state.industryMaster.msg = "success";
      state.industryMaster.msgType = "success";
    });
    builder.addCase(industryMasterAPI.rejected, (state, action) => {
      state.industryMaster.loading = false;
      state.industryMaster.error = true;
      state.industryMaster.msgType = "error";
      state.industryMaster.msg = action.payload?.msg;
      state.industryMaster.data = action.payload;
    });
    // // END industryMaster DATA


    // // START companyMaster DATA
    builder.addCase(companyMasterAPI.pending, (state) => {
      state.companyMaster.loading = true;
      state.companyMaster.error = false;
      state.companyMaster.msgType = null;
    });
    builder.addCase(companyMasterAPI.fulfilled, (state, action) => {
      state.companyMaster.data = action.payload;
      state.companyMaster.loading = false;
      state.companyMaster.msg = "success";
      state.companyMaster.msgType = "success";
    });
    builder.addCase(companyMasterAPI.rejected, (state, action) => {
      state.companyMaster.loading = false;
      state.companyMaster.error = true;
      state.companyMaster.msgType = "error";
      state.companyMaster.msg = action.payload?.msg;
      state.companyMaster.data = action.payload;
    });
    // // END companyMaster DATA


    // // START allCompanyMaster DATA
    builder.addCase(allCompanyMasterAPI.pending, (state) => {
      state.allCompanyMaster.loading = true;
      state.allCompanyMaster.error = false;
      state.allCompanyMaster.msgType = null;
    });
    builder.addCase(allCompanyMasterAPI.fulfilled, (state, action) => {
      state.allCompanyMaster.data = action.payload;
      state.allCompanyMaster.loading = false;
      state.allCompanyMaster.msg = "success";
      state.allCompanyMaster.msgType = "success";
    });
    builder.addCase(allCompanyMasterAPI.rejected, (state, action) => {
      state.allCompanyMaster.loading = false;
      state.allCompanyMaster.error = true;
      state.allCompanyMaster.msgType = "error";
      state.allCompanyMaster.msg = action.payload?.msg;
      state.allCompanyMaster.data = action.payload;
    });
    // // END allCompanyMaster DATA

    // // START turnAroundMaster DATA
    builder.addCase(turnAroundMasterAPI.pending, (state) => {
      state.turnAroundMaster.loading = true;
      state.turnAroundMaster.error = false;
      state.turnAroundMaster.msgType = null;
    });
    builder.addCase(turnAroundMasterAPI.fulfilled, (state, action) => {
      state.turnAroundMaster.data = action.payload;
      state.turnAroundMaster.loading = false;
      state.turnAroundMaster.msg = "success";
      state.turnAroundMaster.msgType = "success";
    });
    builder.addCase(turnAroundMasterAPI.rejected, (state, action) => {
      state.turnAroundMaster.loading = false;
      state.turnAroundMaster.error = true;
      state.turnAroundMaster.msgType = "error";
      state.turnAroundMaster.msg = action.payload?.msg;
      state.turnAroundMaster.data = action.payload;
    });
    // // END turnAroundMaster DATA


    // // START FIISDateMaster DATA
    builder.addCase(FIISDateMasterAPI.pending, (state) => {
      state.FIISDateMaster.loading = true;
      state.FIISDateMaster.error = false;
      state.FIISDateMaster.msgType = null;
    });
    builder.addCase(FIISDateMasterAPI.fulfilled, (state, action) => {
      state.FIISDateMaster.data = action.payload;
      state.FIISDateMaster.loading = false;
      state.FIISDateMaster.msg = "success";
      state.FIISDateMaster.msgType = "success";
    });
    builder.addCase(FIISDateMasterAPI.rejected, (state, action) => {
      state.FIISDateMaster.loading = false;
      state.FIISDateMaster.error = true;
      state.FIISDateMaster.msgType = "error";
      state.FIISDateMaster.msg = action.payload?.msg;
      state.FIISDateMaster.data = action.payload;
    });
    // // END FIISDateMaster DATA


    // // START vdrLevel DATA
    builder.addCase(vdrLevelAPI.pending, (state) => {
      state.vdrLevel.loading = true;
      state.vdrLevel.error = false;
      state.vdrLevel.msgType = null;
    });
    builder.addCase(vdrLevelAPI.fulfilled, (state, action) => {
      state.vdrLevel.data = action.payload;
      state.vdrLevel.loading = false;
      state.vdrLevel.msg = "success";
      state.vdrLevel.msgType = "success";
    });
    builder.addCase(vdrLevelAPI.rejected, (state, action) => {
      state.vdrLevel.loading = false;
      state.vdrLevel.error = true;
      state.vdrLevel.msgType = "error";
      state.vdrLevel.msg = action.payload?.msg;
      state.vdrLevel.data = action.payload;
    });
    // // END vdrLevel DATA


    // // START EmployeeMaster DATA
    builder.addCase(EmployeeMasterAPI.pending, (state) => {
      state.EmployeeMaster.loading = true;
      state.EmployeeMaster.error = false;
      state.EmployeeMaster.msgType = null;
    });
    builder.addCase(EmployeeMasterAPI.fulfilled, (state, action) => {
      state.EmployeeMaster.data = action.payload;
      state.EmployeeMaster.loading = false;
      state.EmployeeMaster.msg = "success";
      state.EmployeeMaster.msgType = "success";
    });
    builder.addCase(EmployeeMasterAPI.rejected, (state, action) => {
      state.EmployeeMaster.loading = false;
      state.EmployeeMaster.error = true;
      state.EmployeeMaster.msgType = "error";
      state.EmployeeMaster.msg = action.payload?.msg;
      state.EmployeeMaster.data = action.payload;
    });
    // // END EmployeeMaster DATA


    // // START RatioMaster DATA
    builder.addCase(RatioMasterAPI.pending, (state) => {
      state.RatioMaster.loading = true;
      state.RatioMaster.error = false;
      state.RatioMaster.msgType = null;
    });
    builder.addCase(RatioMasterAPI.fulfilled, (state, action) => {
      let a0 = action.payload;
      // let isSelected = a0.filter(item=>item.is_selected === true);
      let isSelected = a0.filter((item) => item.is_selected === true);
      let isSelectedIds = isSelected.map((item) => item.ID);



      state.RatioMaster.data = action.payload;
      state.RatioMaster.isSelected = isSelectedIds,
      
      state.RatioMaster.loading = false;
      state.RatioMaster.msg = "success";
      state.RatioMaster.msgType = "success";
    });
    builder.addCase(RatioMasterAPI.rejected, (state, action) => {
      state.RatioMaster.loading = false;
      state.RatioMaster.error = true;
      state.RatioMaster.msgType = "error";
      state.RatioMaster.msg = action.payload?.msg;
      state.RatioMaster.data = action.payload;
    });
    // // END RatioMaster DATA


    // // START DefaultMasters DATA
    builder.addCase(DefaultMastersAPI.pending, (state) => {
      state.DefaultMasters.loading = true;
      state.DefaultMasters.error = false;
      state.DefaultMasters.msgType = null;
    });
    builder.addCase(DefaultMastersAPI.fulfilled, (state, action) => {
      state.DefaultMasters.data = action.payload;
      state.DefaultMasters.loading = false;
      state.DefaultMasters.msg = "success";
      state.DefaultMasters.msgType = "success";
    });
    builder.addCase(DefaultMastersAPI.rejected, (state, action) => {
      state.DefaultMasters.loading = false;
      state.DefaultMasters.error = true;
      state.DefaultMasters.msgType = "error";
      state.DefaultMasters.msg = action.payload?.msg;
      state.DefaultMasters.data = action.payload;
    });
    // // END DefaultMasters DATA


  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = TrendlyneSlice.actions;

export default TrendlyneSlice.reducer;
