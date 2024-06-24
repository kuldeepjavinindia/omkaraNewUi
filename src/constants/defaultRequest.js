import moment from "moment";

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
  sector_id: [],
  industry_id: [],
  company_id: [],
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
  Qtr: "3",
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

export const Insider_Req = {
  // date: [
  //   moment().add("-1", "days").format("YYYY-MM-DD"),
  //   moment().format("YYYY-MM-DD"),
  // ],
  date: ["2024-06-13", "2024-06-17"],
  mcap: ["", ""],
  watchlistid: "0",
  netvalue: ["", ""],
  Sector: "",
  Industry: "",
  CompanyName: "",
  portfolio: false,
};

export const BulkDeal_Req = {
  date: [
    moment().add("-2", "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
  mcap: ["", ""],
  netvalue: ["", ""],
  Exchange: "",
  watchlistid: "0",
  Sector: [],
  Industry: [],
  CompanyName: [null],
};

export const InsiderDetail_Req = {
  SymbolID: "",
  type: "Insider",
  date: [
    moment().add("-2", "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
  mcap: ["", ""],
};

export const Bulk_BlockDetail_Req = {
  SymbolID: "",
  type: "BULK_deal",
  date: [
    moment().add("-2", "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ],
  mcap: ["", ""],
};

export const ResultDataReq = [
  {
    $id: "",
    type: "Share Price (TTM)",
    sub_type: [
      {
        Market_Cap: ["", ""],
        LTP: "",
        TTM_P_B: "",
        TTM_P_E: "",
        ROCE: "",
        TTMSalesAbs: "",
        TTMPATAbs: "",
      },
    ],
  },
  {
    type: "Result Data",
    sub_type: [
      {
        $id: "5",
        Sales_YOY: "",
        Sales_QOQ: "",
        EBDITA_YOY: "",
        EBDITA_QOQ: "",
        PAT_YOY: "",
        PAT_QOQ: "",
        GP_YOY: "",
        GP_QOQ: "",
      },
    ],
  },
  {
    type: "Turn Around",
    sub_type: [
      {
        EBDITA_TO: "",
        PAT_TO: "",
        Gross_Margin: "",
        Gross_Profit: "",
      },
    ],
  },
  {
    type: "More Filters",
    sub_type: [
      {
        Sector: [],
        Industry: [],
        Company: [],
      },
    ],
  },
  {
    type: "Date",
    sub_type: [
      {
        FromDate: moment().add("-1", "days").format("MM/DD/YYYY"),
        ToDate: moment().format("MM/DD/YYYY"),
      },
    ],
  },
  {
    type: "Color",
    sub_type: [
      {
        ColorCode: "",
      },
    ],
  },
];

// END DATA 2 Requests

export const add_to_importantReq = {
  item_id: "",
  user_id: "",
  item_type: "",
  action: 0,
};

export const priceAction_Req = {
  Index: [],
  Sector: [],
  Industry: [],
  Portfolio: false,
  Company: [],
  Market_Cap: ["", ""],
  TTM_P_E: ["", ""],
  TTM_P_B: ["", ""],
  Chg_from_week52_highPer: "",
  Chg_from_week52_lowPer: "",
  ChangeAllTimeHigh: "",
};

//21-june-2024
export const ReportBankUploadNoteReq = {
  CompanyID: "",
  description: "",
  UserID: "",
  CommentType: "",
  Heading: "",
  Type: "RR_Comments",
};

export const RR_TagMasterReq = {
  TagID: "",
  RR_Tag: "",
  Tag_Title: "",
  optionType: 3,
};
//21-june-2024

export const calendar_Req = {
  UserId: 22,
  FromDate: moment().format('MM/DD/YYYY'),
  ToDate: moment().add(1, 'week').format('MM/DD/YYYY'),
  Sector: [],
  Industry: [],
  Market_Cap: ["", ""],
  Portfolio: false,
};



// export const calendar_Req = {
//     From_Date: moment().format('MM/DD/YYYY'),
//     To_Date: moment().add(1, 'week').format('MM/DD/YYYY'),
//     Market_Cap: ["", ""],
//     UserId: "1",
//     Portfolio: false,
//     Sector: [],
//     Industry: [],
// }
