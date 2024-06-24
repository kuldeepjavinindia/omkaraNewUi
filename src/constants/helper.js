import moment from "moment";
export const API_BASE_URL = () => {
  let baseUrl1 = "https://omkaradata.com/api";

  if (
    window.location.href.includes("omkaradata.com") ||
    window.location.href.includes("omkaracapital.in")
  ) {
    baseUrl1 = "https://omkaradata.com/api"; // FOR https://vdr.omkaracapital.in/ OR omkaradata.com
  }

  if (
    (window.location.host != "omkaradata.in" &&
      window.location.host != "omkaradata.com") ||
    import.meta.env.VITE_ENABLE_CORS_SERVER == "true"
  ) {
    baseUrl1 = "https://vasudeep.com:8084/" + baseUrl1;
  }
  return baseUrl1;
};

export const debounceFun = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const openCompany = (item, value = "", cmpBlank = false) => {
  if (value == "") {
    let url =
      import.meta.env.VITE_BASE_URL +
      "/company-detail/" +
      window.btoa(item?.CompanyID) +
      "/";
    if (cmpBlank) {
      window.open(url, "_blank");
    } else {
      window.open(url, "_self");
    }
  }
  if (value == "other") {
    window.open(item, "_blank");
  }
};

export const rangeArray = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

export const openPdfWithWaterMark = (link, file_type = "") => {
  let openUrl = import.meta.env.VITE_BASE_URL + "/MyPdfViewer";
  let enLink = window.btoa(link);
  localStorage.setItem("PDFViewed", enLink);
  localStorage.setItem("file_type", file_type);
  openCompany(openUrl, "other");
};

export const ConStdArray = [
  {
    label: "Consolidate",
    isConStd: true,
    value: "con",
    id: "1",
  },
  {
    label: "Standalone ",
    value: "std",
    id: "2",
  },
];

export const capStructured_Menu = [
  {
    id: 0,
    title: "Fund Flow",
    value: "Fund_Flow",
    short_name: "ff",
    type: "CAP",
  },
  {
    id: 1,
    title: "Working Capital Flow",
    value: "Working_Capital",
    short_name: "cap",
    type: "CAP",
  },
];

export const getForensicUpdateTitle = (title = "", type = "") => {
  let CTitle = "";
  let n_title = "";
  let c_type = "";

  if (type == "DH") {
    CTitle = "Dividend History";
  }
  if (type == "AH") {
    CTitle = "Auditor History";
  }
  if (type == "SH") {
    CTitle = "Shareholding Pattern";
  }
  if (type == "ESOP") {
    CTitle = "ESOP";
  }
  if (type == "CH") {
    CTitle = "Capital History";
  }

  if (type == "ratios") {
    CTitle = "Ratios";
  }

  if (type == "CF") {
    CTitle = "Capital Allocation";
  }

  if (title && type != "SH") {
    n_title = title;
    c_type = n_title;
  } else {
    n_title = CTitle;
    c_type = type;
  }

  // if(type == 'CF'){
  //     c_type = 'Capital Allocation';
  // }
  let res = {
    title: n_title,
    type: c_type,
  };

  return res;
};

export const DocumentNotes = [
  { title: "None", value: "0" },
  { title: "Concall Summary", value: "Concall Summary" },
  { title: "Important Source", value: "Important Source" },
  { title: "Management Meeting", value: "Management Meeting" },
  { title: "One Pager", value: "One Pager" },
  { title: "Quarter Update", value: "Quarter Update" },
  { title: "Rough", value: "Rough" },
];

export const DocumentType = [
  { title: "None", value: "0" },
  { title: "Annual Reports", value: "Annual Reports" },
  { title: "Concall Transcripts", value: "Concall Transcripts" },
  // { title: 'Forensic', value: 'Forensic' },
  { title: "Initial Coverage", value: "Initial Coverage" },
  { title: "Investor Presentation", value: "Investor Presentation" },
  // { title: 'Brief Notes', value: 'Brief Notes' },
  { title: "Quarterly Update", value: "Quarterly Update" },
  { title: "Others", value: "Others" },
];

// export const DocumentType = [
//   { title: 'None', value: '0' },
//   { title: 'Research Report', value: 'Research Report' },
//   { title: 'Sector Report', value: 'Sector Report' },
//   { title: 'Quarterly Updates', value: 'Quarterly Updates' },
//   { title: 'Running Notes (WIP)', value: 'Running Notes (WIP)' },
//   { title: 'Stock Exchange Announcements', value: 'Stock Exchange Announcements' },
// ];

// PERMISSION USER IDS
export const NotesActionButtons = [1];
export const RepoListingButtons = ["1", "3", "4"];
// PERMISSION USER IDS

// vimeo_parser
// youtube_parser

export const vimeo_parser = (url) => {
  // var url = "http://www.vimeo.com/7058755"; //Or any other Vimeo url format
  var regExp =
    /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  let unlisted_code = "";
  var match = url.match(regExp);
  var ddArr = url.split("/");
  if (ddArr.length == 5) {
    unlisted_code = "/" + ddArr[ddArr.length - 1];
  }
  // console.table(match);
  if (match) {
    return match[5] + unlisted_code;
  } else {
    // alert("not a vimeo url");
    return null;
  }
};

export const youtube_parser = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : null;
};

export const getVidFullUrl = (videoCode, videoType) => {
  let url = `https://vimeo.com/${videoCode}`;
  if (videoType === "youtube") {
    url = `https://www.youtube.com/watch?v=${videoCode}`;
  }
  return url;
};

export const selectSitesArr = [
  { title: "Select Site Type", value: 0 },
  { title: "Youtube", value: "youtube" },
  { title: "Vimeo", value: "vimeo" },
];

export const selectVideoArr = [
  { title: "Select Site Type", value: 0 },
  { title: "Single Company", value: "SINGLE VIDEO" },
  { title: "Sector Video", value: "Sector Video" },
];

// Quterlty Result Input data
// export const FilterInputs =
//   {
//     Market_Cap: {
//       label: "Market Cap",
//       value1: "",
//       value2: ""
//     },
//     Date: {
//       label: "Date Range",
//       value1: moment().add('-1', 'days').format('MM/DD/YYYY'),
//       value2: moment().format('MM/DD/YYYY')
//     },
//     LTP: "",
//     TTM_P_B : "",
//      TTM_P_E : "",
//      ROCE: "",
//      TTM_Sales_Abs: "",
//      TTM_PAT_Abs: "",
//      Sales_YOY : "",
//     Sales_QOQ: "",
//     EBDITA_YOY: "",
//     EBDITA_QOQ: "",
//     PAT_YOY: "",
//     PAT_QOQ:"",
//     GROSS_PROFIT_YOY: "",
//     GROSS_PROFIT_QOQ: "",
//     EBDITA_TO: "",
//      PAT_TO: "",
//     ColorCode : {
//       label: "Color Code",
//       value1: "",
//       value2: ""
//     },
//     sectors: {
//       label: "Sector",
//       value1: "",
//       value2: ""
//     },
//     industry : {
//       label: "Industry",
//       value1: "",
//       value2: ""
//     },
//      company: {
//       label: "Company",
//       value1: "",
//       value2: ""
//     },
//     portfolio : {
//       label: "Portfolio",
//       value1: "",
//       value2: ""
//     }
//   }

// export const QuterltyResultFinalReq = (data) => {
//   return [
//     {
//         $id: "",
//         type: "Share Price (TTM)",
//         sub_type: [
//             {
//                 Market_Cap: [
//                   data?.Market_Cap?.value1 || "",
//                   data?.Market_Cap?.value2 || ""
//                 ],
//                 LTP: data?.LTP?.value1 || "",
//                 TTM_P_B: data?.TTM_P_B?.value1 || "",
//                 TTM_P_E: data?.TTM_P_E?.value1 || "",
//                 ROCE: data?.data?.ROCE?.value1 ||  "",
//                 TTMSalesAbs: data?.TTMSalesAbs?.value1 || "" ,
//                 TTMPATAbs: data?.TTMPATAbs?.value1 || "" ,
//             }
//         ]
//     },
//     {
//         type: "Result Data",
//         sub_type: [
//             {
//                 Sales_YOY: data?.Sales_YOY?.value1 || "",
//                 Sales_QOQ: data?.Sales_QOQ?.value1 || "",
//                 EBDITA_YOY: data?.EBDITA_YOY?.value1 || "",
//                 EBDITA_QOQ: data?.EBDITA_QOQ?.value1 || "",
//                 PAT_YOY: data?.PAT_YOY?.value1 || "",
//                 PAT_QOQ: data?.PAT_QOQ?.value1 || "",
//                 GP_YOY: data?.GP_YOY?.value1 || "",
//                 GP_QOQ: data?.GP_QOQ?.value1 || "",
//             }

//         ]
//     },
//     {
//         type: "Turn Around",
//         sub_type: [
//             {
//                 EBDITA_TO: [],
//                 PAT_TO: [],
//                 Gross_Margin: data?.Gross_Margin?.value1 || "",
//                 Gross_Profit: data?.Gross_Profit?.value1 || ""
//             }
//         ]
//     },
//     {
//         type : "More Filters",
//         sub_type: [
//             {
//                 Sector: [data?.Sector] || [],
//                 Industry: [data?.Industry] || [],
//                 Company: [data?.Company] || []
//             }
//         ]
//     },
//     {
//         type: "Date",
//         sub_type: [
//             {
//                 FromDate:  data?.Date?.FromDate   ||  moment().add('-1', 'days').format('MM/DD/YYYY'),
//                 ToDate:  data?.Date?.ToDate || moment().format('MM/DD/YYYY')
//             }
//         ]
//     },
//     {
//         type: "Color",
//         sub_type: [
//             {
//                 ColorCode: ""
//             }
//         ]
//     }
//   ];
// }

export const valuation_Req = (inputsArray) => {
  const filterArray = [
    {
      type: "Classification",
      sub_type: [
        {
          Sector: inputsArray?.sectors?.value1 || null,
          Industry: inputsArray?.industry?.value1 || null,
          Company: inputsArray?.company?.value1 || null,
          Portfolio: inputsArray?.portfolio?.value1 || false,
        },
      ],
    },
    {
      type: "Share Price (TTM)",
      sub_type: [
        {
          Market_Cap: [
            inputsArray?.Market_Cap?.value1 || "",
            inputsArray?.Market_Cap?.value2 || "",
          ],
          LTP: inputsArray?.LTP?.value1 || null,
          Away52wkHigh: inputsArray?.Away52wkHigh?.value1 || null,
          Away52wkLow: inputsArray?.Away52wkLow?.value1 || null,
          AllTimeHigh: inputsArray?.AllTimeHigh?.value1 || null,
          TTM_PE: [
            inputsArray?.TTM_PE?.value1 || "",
            inputsArray?.TTM_PE?.value2 || "",
          ], //(inputsArray?.TTM_PE?.value1 || null),
          TTM_PBV: [
            inputsArray?.TTM_PBV?.value1 || "",
            inputsArray?.TTM_PBV?.value2 || "",
          ], //(inputsArray?.TTM_PBV?.value1 || null)
        },
      ],
    },
    {
      type: "Historical",
      sub_type: [
        {
          Diff_Bw_5yrsAvg_PBV: inputsArray?.Diff_Bw_5yrsAvg_PBV?.value1 || null,
          Diff_Bw_10yrsAvg_PBV:
            inputsArray?.Diff_Bw_10yrsAvg_PBV?.value1 || null,
          Diff_Bw_5yrsAvg_PE: inputsArray?.Diff_Bw_5yrsAvg_PE?.value1 || null,
          Diff_Bw_10yrsAvg_PE: inputsArray?.Diff_Bw_10yrsAvg_PE?.value1 || null,
          Avg_Sales_3yrs: inputsArray?.Avg_Sales_3yrs?.value1 || null,
          Avg_Sales_5yrs: inputsArray?.Avg_Sales_5yrs?.value1 || null,
          Avg_Sales_10yrs: inputsArray?.Avg_Sales_10yrs?.value1 || null,
          Avg_PAT_3yrs: inputsArray?.Avg_PAT_3yrs?.value1 || null,
          Avg_PAT_5yrs: inputsArray?.Avg_PAT_5yrs?.value1 || null,
          Avg_PAT_10yrs: inputsArray?.Avg_PAT_10yrs?.value1 || null,
          GrossProfit3yrs: [
            inputsArray?.GrossProfit3y?.value1 || "",
            inputsArray?.GrossProfit3y?.value2 || "",
          ], //(inputsArray?.GrossProfit?.value1 || null),
          GrossProfit5yrs: [
            inputsArray?.GrossProfit5y?.value1 || "",
            inputsArray?.GrossProfit5y?.value2 || "",
          ], //(inputsArray?.GrossProfit?.value1 || null),
          GrossProfit10yrs: [
            inputsArray?.GrossProfit10y?.value1 || "",
            inputsArray?.GrossProfit10y?.value2 || "",
          ], //(inputsArray?.GrossProfit?.value1 || null),
          GrossProfitMargin3yrs: [
            inputsArray?.GrossProfitMargin3y?.value1 || "",
            inputsArray?.GrossProfitMargin3y?.value2 || "",
          ], //(inputsArray?.GrossProfitMargin?.value1 || null)
          GrossProfitMargin5yrs: [
            inputsArray?.GrossProfitMargin5y?.value1 || "",
            inputsArray?.GrossProfitMargin5y?.value2 || "",
          ], //(inputsArray?.GrossProfitMargin?.value1 || null)
          GrossProfitMargin10yrs: [
            inputsArray?.GrossProfitMargin10y?.value1 || "",
            inputsArray?.GrossProfitMargin10y?.value2 || "",
          ], //(inputsArray?.GrossProfitMargin?.value1 || null)
        },
      ],
    },
    {
      type: "Balance Sheet",
      sub_type: [
        {
          Total_DebtEquity: inputsArray?.Total_DebtEquity?.value1 || null,
          GrossBlockAdditionin_5yrs:
            inputsArray?.GrossBlockAdditionin_5yrs?.value1 || null,
          TotalDebtIncreasein_5yrs:
            inputsArray?.TotalDebtIncreasein_5yrs?.value1 || null,
          ROCE: [
            inputsArray?.ROCE?.value1 || "",
            inputsArray?.ROCE?.value2 || "",
          ], //(inputsArray?.ROCE?.value1 || null),
          NetCash: inputsArray?.NetCash?.value1 || null,
          CFO_EBIDTA: inputsArray?.CFO_EBIDTA?.value1 || null,
          Net_Cash_Mcap: inputsArray?.Net_Cash_Mcap?.value1 || null,
        },
      ],
    },

    {
      type: "ShareHolding Pattern",
      sub_type: [
        {
          Promoter_Holding: inputsArray?.Promoter_Holding?.value1 || null,
          Pledge: inputsArray?.Pledge?.value1 || null,
        },
      ],
    },

    {
      type: "ROCE",
      sub_type: [
        {
          ROCE3yrs: [
            inputsArray?.ROCE3yrs?.value1 || "",
            inputsArray?.ROCE3yrs?.value2 || "",
          ],
          ROCE5yrs: [
            inputsArray?.ROCE5yrs?.value1 || "",
            inputsArray?.ROCE5yrs?.value2 || "",
          ],
          ROCE10yrs: [
            inputsArray?.ROCE10yrs?.value1 || "",
            inputsArray?.ROCE10yrs?.value2 || "",
          ],
          GrossProfit: [
            inputsArray?.GrossProfit?.value1 || "",
            inputsArray?.GrossProfit?.value2 || "",
          ],
          GrossProfitMargin: [
            inputsArray?.GrossProfitMargin?.value1 || "",
            inputsArray?.GrossProfitMargin?.value2 || "",
          ],
        },
      ],
    },
  ];

  // console.log('valuation >> filterArray >> ', JSON.stringify(filterArray))
  return filterArray;
};

export const priceActionFilters = (inputsArray) => {
  // console.log(inputsArray);
  const filterArray = {
    Index: inputsArray.index?.value1,
    Sector: inputsArray.sectors?.value1,
    Industry: inputsArray.industry?.value1,
    Portfolio: inputsArray.portfolio.value1,
    Company: inputsArray.company?.value1,
    Market_Cap: [
      inputsArray.Market_Cap?.value1,
      inputsArray.Market_Cap?.value2,
    ],
    TTM_P_E: [inputsArray.TTM_PE?.value1, inputsArray.TTM_PE?.value2],
    TTM_P_B: [inputsArray.TTM_PBV?.value1, inputsArray.TTM_PBV?.value2],
    Chg_from_week52_highPer: inputsArray.Chg_from_week52_highPer?.value1,
    Chg_from_week52_lowPer: inputsArray.Chg_from_week52_lowPer?.value1,
    ChangeAllTimeHigh: inputsArray.ChangeAllTimeHigh?.value1,
  };
  return filterArray;
};

export const add_to_importantReq = {
  item_id: "",
  user_id: "",
  item_type: "",
  action: 0,
};

export const selectSectors = (sectorMasterData, setSectorMasterArr) => {
  if (sectorMasterData && sectorMasterData.length > 0) {
    var data1 = [];
    sectorMasterData.map((item) => {
      var d1 = { title: item.Sector, value: item.sectorID };
      data1.push(d1);
    });
    setSectorMasterArr(data1);
  }
};

export const industryMasterFun = (industryMasterData, setIndustryMasterArr) => {
  if (industryMasterData && industryMasterData.length > 0) {
    var data1 = [];
    industryMasterData.map((item) => {
      var d1 = { title: item.Industry, value: item.sectorID };
      data1.push(d1);
    });
    setIndustryMasterArr(data1);
  }
};

export const selectCompany = (allCompanyData, setCompanyMasterArr) => {
  if (allCompanyData && allCompanyData.length > 0) {
    var data1 = [];
    allCompanyData.map((item) => {
      var d1 = { title: item.CompanyName, value: item.CompanyID };
      data1.push(d1);
    });
    data1.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setCompanyMasterArr(data1);
  }
};

export const filterSelectIndustryBySector = (
  sectors,
  industryMaster,
  setIndustryMasterArr
) => {
  let industryMasterFilter = [];
  for (var i = 0; i < sectors.length; i++) {
    let sectors_val = sectors[i].value;
    var industryMasterFilter1 = industryMaster.filter(
      (industry) => sectors_val == industry.sectorID
    );
    Array.prototype.push.apply(industryMasterFilter, industryMasterFilter1);
  }
  var data1 = [];
  if (industryMasterFilter.length > 0) {
    industryMasterFilter.map((item) => {
      var d1 = { title: item.Industry, value: item.IndustryID };
      data1.push(d1);
    });
  }
  setIndustryMasterArr(data1);
};

// Data 2
// Quterlty Result Input data
export const FilterInputs = {
  Market_Cap: {
    label: "Market Cap",
    value1: "",
    value2: "",
  },
  Date: {
    label: "Date Range",
    value1: moment().add("-1", "days").format("MM/DD/YYYY"),
    value2: moment().format("MM/DD/YYYY"),
  },
  LTP: "",
  TTM_P_B: "",
  TTM_P_E: "",
  ROCE: "",
  TTM_Sales_Abs: "",
  TTM_PAT_Abs: "",
  Sales_YOY: "",
  Sales_QOQ: "",
  EBDITA_YOY: "",
  EBDITA_QOQ: "",
  PAT_YOY: "",
  PAT_QOQ: "",
  GROSS_PROFIT_YOY: "",
  GROSS_PROFIT_QOQ: "",
  EBDITA_TO: "",
  PAT_TO: "",
  ColorCode: {
    label: "Color Code",
    value1: "",
    value2: "",
  },
  sectors: {
    label: "Sector",
    value: [],
  },
  industry: {
    label: "Industry",
    value: [],
  },
  company: {
    label: "Company",
    value: [],
  },
  portfolio: {
    label: "Portfolio",
    value: [],
  },
};

export const QuterltyResultFinalReq = (data) => {
  return [
    {
      $id: "",
      type: "Share Price (TTM)",
      sub_type: [
        {
          Market_Cap: [
            data?.Market_Cap?.value1 || "",
            data?.Market_Cap?.value2 || "",
          ],
          LTP: data?.LTP?.value1 || "",
          TTM_P_B: data?.TTM_P_B?.value1 || "",
          TTM_P_E: data?.TTM_P_E?.value1 || "",
          ROCE: data?.ROCE?.value1 || "",
          TTMSalesAbs: data?.TTMSalesAbs?.value1 || "",
          TTMPATAbs: data?.TTMPATAbs?.value1 || "",
        },
      ],
    },
    {
      type: "Result Data",
      sub_type: [
        {
          Sales_YOY: data?.Sales_YOY?.value1 || "",
          Sales_QOQ: data?.Sales_QOQ?.value1 || "",
          EBDITA_YOY: data?.EBDITA_YOY?.value1 || "",
          EBDITA_QOQ: data?.EBDITA_QOQ?.value1 || "",
          PAT_YOY: data?.PAT_YOY?.value1 || "",
          PAT_QOQ: data?.PAT_QOQ?.value1 || "",
          GP_YOY: data?.GP_YOY?.value1 || "",
          GP_QOQ: data?.GP_QOQ?.value1 || "",
        },
      ],
    },
    {
      type: "Turn Around",
      sub_type: [
        {
          EBDITA_TO: [data?.EBDITA_TO?.value1] || [],
          PAT_TO: [data?.PAT_TO?.value1] || [],
          Gross_Margin: data?.Gross_Margin?.value1 || "",
          Gross_Profit: data?.Gross_Profit?.value1 || "",
        },
      ],
    },
    {
      type: "More Filters",
      sub_type: [
        {
          Sector: [data?.Sector] || [],
          Industry: [data?.Industry] || [],
          Company: [data?.Company] || [],
        },
      ],
    },
    {
      type: "Date",
      sub_type: [
        {
          FromDate:
            data?.Date?.value1 ||
            moment().add("-1", "days").format("MM/DD/YYYY"),
          ToDate: data?.Date?.value2 || moment().format("MM/DD/YYYY"),
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
};




export const showCalendarActionBtn = (UserID) => {
  var usersArr = [1, 3, 17, 4, 22];
    if(usersArr.includes(Number(UserID))){
        return true
    } else {
        return false
    }
} 