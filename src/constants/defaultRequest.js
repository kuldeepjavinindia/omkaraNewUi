export const watchListReq = {
  ID: "",
  UserID: "",
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
  "sector_id":[],
  "industry_id":[],
  "company_id":[]
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

// export const RepositoryListReq = {
//   Date: [],
//   sectorId: "",
//   IndustryId: "",
//   CompanyId: [],
//   BrokerId: "",
//   ReportType: "",
//   page: 1,
//   order: "asc",
//   order_column: "CompanyName",
//   numPerPage: 1000,
//   search: "",
// };

export const UploadDocumentNoteReq = {
  CompanyID: "",
  UserID: "22",
  CommentType: "",
};

// ADD array
// export const UploadDocumentNoteReq = {
//   CompanyID: "",
//   UserID: "",
//   SectorID: "",
//   IndustryID: [],
//   DocumentType: "",
//   FileName: "",
//   FileContent: "",
// }; // ADD array

// export const mediaRoomReq = {
//   CompanyID: "",
//   userid: "",
//   videoCode: "",
//   videoId: "",
//   videoType: "",
//   videoTitle: "",
//   videoDescription: "",
//   DocumentType: "",
//   SectorID: "",
//   IndustryID: [],
//   Type: "SC_Media",
// }; // ADD array

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

// ResultDocument_New_ACEAPI
export const Result_Document_Req = {
  CompanyID: "",
  UserId: "",
  month: "",
  year: "",
  Type: "con",
};

export const Forensic_Comments_Req = {
  type: "1",
  userid: "1",
  CompanyID: "",
  SectorID: "",
  IndustryID: "",
  TableType: "",
  description: "",
};

export const BoardOfDirectorDetail_Req = {
  Type: "",
  DirName: "",
  companyId: "",
};

export const videoLikeDiskLike_Req = {
  type: "",
  webuserId: "",
  inputType: "0",
};

export const MediaComment_Req = {
  parentId: 0,
  videoId: "",
  comment: "",
  commentId: "",
  webUserName: "",
  webUserImage: import.meta.env.VITE_BASE_URL + "/images/Ellipse 2.png", //"https://omkaracapital.in/image/default_user.png",
  webuserId: "",
  inputType: "3", //0:insert 1:edit 2:Delete 3:list
};

// START DATA 2 Requests

export const RepositoryListReq = {
  Date: ["", ""],
  sectorId: "",
  WatchListID: "0",
  IndustryId: "",
  CompanyId: "",
  BrokerId: "",
  ReportType: "",
  page: 1,
  order: "asc",
  order_column: "CompanyName",
  numPerPage: "1000",
  search: "",
};




// END DATA 2 Requests
