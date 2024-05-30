export const watchListReq = {
  ID: "",
  // UserID: localUser?.UserID,
  WatchListNAme: "",
  status: false,
  input: 4, //1 insert --- 2 update --- 3 delete --- 4 list
};

export const watchListCompanyReq = {
  ID: "",
  // UserID: localUser?.UserID,
  WatchListID: "",
  AccordCode: "",
  CompanyName: "",
  status: false,
  input: 4, //1 insert// 2 update// 3 delete // 4 list
};

export const TrendlyneReq = {
  params: {},
  compSlug: "",
};

export const SignInReq = {
  UserId: "",
  password: "",
};

export const companyMasterReq = {
  Search: "",
  Type: "",
};

export const UploadDocumentReq = {
  CompanyID: "",
  UserID: "",
  SectorID: "",
  IndustryID: [],
  DocumentType: "",
  FileName: "",
  FileContent: "",
}; // ADD array

export const RepositoryListReq = {
  Date: [],
  sectorId: "",
  IndustryId: "",
  CompanyId: [],
  BrokerId: "",
  ReportType: "",
  page: 1,
  order: "asc",
  order_column: "CompanyName",
  numPerPage: 1000,
  search: "",
};

export const UploadDocumentNoteReq = {
  CompanyID: "",
  UserID: "22",
  CommentType: "",
}; // ADD array
// export const UploadDocumentNoteReq = {
//   CompanyID: "",
//   UserID: "",
//   SectorID: "",
//   IndustryID: [],
//   DocumentType: "",
//   FileName: "",
//   FileContent: "",
// }; // ADD array

export const mediaRoomReq = {
  CompanyID: "",
  userid: "",
  videoCode: "",
  videoId: "",
  videoType: "",
  videoTitle: "",
  videoDescription: "",
  DocumentType: "",
  SectorID: "",
  IndustryID: [],
  Type: "SC_Media",
}; // ADD array

export const companyNotesReq = { CompanyID: "" };

export const SC_QResult_Req = {
  CompanyId: "",
  type: "con",
};

export const SC_SCAnnualP_L_Req = {
  CompanyId: "",
  type: "con",
};

export const SC_SCAnnualP_L_ChartReq = {
  CompanyID: "",
  UserId: "admin",
  Param: [],
  ChartType: "con", // std
  Qtr: 13, // 10 // 13
};

export const SC_BS_Req = {
  CompanyId: "",
  type: "con",
};

export const SC_CF_Req = {
  CompanyId: "",
  type: "con",
};

export const SC_BriefTable_Req = {
  CompanyID: "",
  userid: "",
};

export const SC_Segment_Req = { companyID: "", Type: "CON" };

export const SC_Ratios_Req = { CompanyId: "", type: "con" };
export const SC_ShareHolding_Req = { companyID: "", type: "con" };

export const SC_Data20_Req = {
  CompanyId: "",
  Param: [
    "Market Cap (cr.)",
    "Net Sales (cr.)",
    "Cons PAT (cr.)",
    "Gross Profit (cr.)",
    "Gross Profit Margin (%)",
    "EBIDTA (cr.)",
  ],
  ChartType: "Quarterly",
  Type: "con",
};

export const ForensicDataReq = {
  Type: "",
  CompanyID: "",
  childType: "",
  dataFor: "",
}; // ADD array

export const MediaRoomDataReq = {
  CompanyID: "",
  userid: "",
  videoCode: "",
  videoId: "",
  videoType: "",
  videoTitle: "",
  videoDescription: "",
  DocumentType: "",
  SectorID: "",
  IndustryID: [],
  Type: "SC_Media",
};
