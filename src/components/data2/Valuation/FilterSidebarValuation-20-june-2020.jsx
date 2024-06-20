import { Typography, Button, Input } from "@material-tailwind/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  allCompanyMasterAPI,
  industryMasterAPI,
  sectorMasterAPI,
} from "../../../store/slice/MasterSlice";
import {
  industryMasterFun,
  selectCompany,
  selectSectors,
  valuation_Req,
} from "../../../constants/helper";
import { ValuationApi } from "../../../store/slice/Data2Slice";

const FilterSidebarValuation = () => {
  const rr_dispatch = useDispatch();

  const {
    sectorMaster: { loading: sectorMasterLoading, data: sectorMasterData },
    industryMaster: {
      loading: industryMasterLoading,
      data: industryMasterData,
    },
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
  } = useSelector((state) => state.Masters);

  const [Inputs, setInputs] = useState({});
  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [IndustryMasterArr, setIndustryMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr] = useState([]);
  const [Sectors, setSectors] = useState([]);
  const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let prev = Inputs;
    prev = {
      ...prev,
      [name]: value,
    };
    setInputs(prev);
  };

  useEffect(() => {
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(industryMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
  }, []);
  useEffect(() => {
    if (!sectorMasterLoading) {
      selectSectors(sectorMasterData, setSectorMasterArr);
    }
  }, [sectorMasterLoading]);

  useEffect(() => {
    if (!industryMasterLoading) {
      industryMasterFun(industryMasterData, setIndustryMasterArr);
    }
  }, [industryMasterLoading]);

  useEffect(() => {
    if (!allCompanyLoading) {
      selectCompany(allCompanyData, setCompanyMasterArr);
    }
  }, [allCompanyLoading]);


  const topLabels0 = (inputs) => {


    return {
      
      // "WatchListID": {
      //   "label": "WatchListID",
      //   "value1": (CurrentSelectedWishListData?.ID || ''),
      //   "value2": ""
      // },
      "Market_Cap": {
        "label": "Market Cap (Cr.)",
        "value1": (inputs.MarketCapFrom || ''),
        "value2": (inputs.MarketCapTo || '')
      },
      "LTP": {
        "label": "LTP",
        "value1": (inputs.LTP || ''),
        "value2": ""
      },
      "Away52wkHigh": {
        "label": "Away 52wk High",
        "value1": (inputs.Away52wkHigh || ""),
        "value2": ""
      },
      "Away52wkLow": {
        "label": "Away 52wk Low",
        "value1": (inputs.Away52wkLow || ""),
        "value2": ""
      },
      "AllTimeHigh": {
        "label": "All Time High (%)",
        "value1": (inputs?.AllTimeHigh || ""),
        "value2": "",
      },
      "TTM_PE": {
        "label": "TTM PE (x)",
        "value1": (inputs?.TTM_PEFrom || ""),
        "value2": (inputs?.TTM_PETo || ""),
      },
      "TTM_Sales_Abs": {
        "label": "TTM_Sales_Abs",
        "value2": (inputs.TTM_Sales_Abs || ""),
      },
      "TTM_PBV": {
        "label": "TTM PBV (x)",
        "value1": (inputs?.TTM_PBVFrom || ""),
        "value2": (inputs?.TTM_PBVTo || "")
      },
      "Diff_Bw_5yrsAvg_PBV": {
        "label": "Diff B/w 5yrs Avg P/BV (x)",
        "value1": (inputs.Diff_Bw_5yrsAvg_PBV || ""),
        "value2": ""
      },
      "Diff_Bw_10yrsAvg_PBV": {
        "label": "Diff B/w 10yrs Avg P/BV (x)",
        "value1": (inputs.Diff_Bw_10yrsAvg_PBV || ""),
        "value2": ""
      },
      "Diff_Bw_5yrsAvg_PE": {
        "label": "Diff B/w 5yrs Avg P/E (x)",
        "value1": (inputs.Diff_Bw_5yrsAvg_PE || ""),
        "value2": ""
      },
      "Diff_Bw_10yrsAvg_PE": {
        "label": "Diff B/w 10yrs Avg P/E (x)",
        "value1": (inputs.Diff_Bw_10yrsAvg_PE || ""),
        "value2": ""
      },
      "Avg_Sales_3yrs": {
        "label": "Avg Sales 3yrs (cr.)",
        "value1": (inputs.Avg_Sales_3yrs || ""),
        "value2": ""
      },
      "Avg_Sales_5yrs": {
        "label": "Avg Sales 5yrs (cr.)",
        "value1": (inputs.Avg_Sales_5yrs || ""),
        "value2": ""
      },
      "Avg_Sales_10yrs": {
        "label": "Avg Sales 10yrs (cr.)",
        "value1": (inputs.Avg_Sales_10yrs || ""),
        "value2": ""
      },
      "Avg_PAT_3yrs": {
        "label": "Avg_PAT_3yrs (cr.)",
        "value1": (inputs.Avg_PAT_3yrs || ""),
        "value2": ""
      },
      "Avg_PAT_5yrs": {
        "label": "Avg PAT 5yrs (cr.)",
        "value1": (inputs.Avg_PAT_5yrs || ""),
        "value2": ""
      },
      "Avg_PAT_10yrs": {
        "label": "Avg PAT 10yrs (cr.)",
        "value1": (inputs.Avg_PAT_10yrs || ""),
        "value2": ""
      },
      "Total_DebtEquity": {
        "label": "Total Debt Equity",
        "value1": (inputs.Total_DebtEquity || ""),
        "value2": ""
      },
      "GrossBlockAdditionin_5yrs": {
        "label": "Gross Block Addition in 5yrs (cr.)",
        "value1": (inputs.GrossBlockAdditionin_5yrs || ""),
        "value2": ""
      },
      "TotalDebtIncreasein_5yrs": {
        "label": "Total Debt Increase in 5yrs (cr.)",
        "value1": (inputs.TotalDebtIncreasein_5yrs || ""),
        "value2": ""
      },
      "ROCE": {
        "label": "ROCE (%)",
        "value1": (inputs?.ROCEFrom || ""),
        "value2": (inputs?.ROCETo || ""),
      },
      "NetCash": {
        "label": "Net Cash/(Net Debt) (cr.)",
        "value1": (inputs.NetCash || ""),
        "value2": ""
      },
      "CFO_EBIDTA": {
        "label": "CFO EBIDTA (x)",
        "value1": (inputs.CFO_EBIDTA || ""),
        "value2": ""
      },
      "Net_Cash_Mcap": {
        "label": "Net Cash/ Mcap (x)",
        "value1": (inputs.Net_Cash_Mcap || ""),
        "value2": ""
      },
      "Promoter_Holding": {
        "label": "Promoter Holding (%)",
        "value1": (inputs.Promoter_Holding || ""),
        "value2": ""
      },
      "Pledge": {
        "label": "Pledge (%)",
        "value1": (inputs.Pledge || ""),
        "value2": ""
      },
      "sectors": {
        "label": "Sector",
        "value1": (inputs.Sector || ""),
        "value2": ""
      },
      "industry": {
        "label": "Industry",
        "value1": (inputs.Industry || ""),
        "value2": ""
      },
      "company": {
        "label": "Company",
        "value1": (inputs.Company || ""),
        "value2": ""
      },
      "portfolio": {
        "label": "Portfolio",
        "value1": inputs?.Portfolio,
        "value2": ""
      },
      "ROCE3yrs": {
        "label": "Avg. ROCE (%) 3yrs",
        "value1": (inputs.ROCE3yrsFrom || ''),
        "value2": (inputs.ROCE3yrsTo || '')
      },
      "ROCE5yrs": {
        "label": "Avg. ROCE (%) 5yrs",
        "value1": (inputs.ROCE5yrsFrom || ''),
        "value2": (inputs.ROCE5yrsTo || '')
      },
      "ROCE10yrs": {
        "label": "Avg. ROCE (%) 10yrs",
        "value1": (inputs.ROCE10yrsFrom || ''),
        "value2": (inputs.ROCE10yrsTo || '')
      },
      "GrossProfit": {
        "label": "Gross Profit (Cr.)",
        "value1": (inputs.GrossProfitFrom || ''),
        "value2": (inputs.GrossProfitTo || '')
      },
      "GrossProfit3y": {
        "label": "Avg. Gross Profit 3yrs (cr.)",
        "value1": (inputs.GrossProfit3yFrom || ''),
        "value2": (inputs.GrossProfit3yTo || '')
      },
      "GrossProfit5y": {
        "label": "Avg. Gross Profit 5yrs (cr.)",
        "value1": (inputs.GrossProfit5yFrom || ''),
        "value2": (inputs.GrossProfit5yTo || '')
      },
      "GrossProfit10y": {
        "label": "Avg. Gross Profit 10rs (cr.)",
        "value1": (inputs.GrossProfit10yFrom || ''),
        "value2": (inputs.GrossProfit10yTo || '')
      },
      "GrossProfitMargin": {
        "label": "Gross Profit Margin(%)",
        "value1": (inputs.GrossProfitMarginFrom || ''),
        "value2": (inputs.GrossProfitMarginTo || '')
      },
      "GrossProfitMargin3y": {
        "label": "Avg. Gross Profit Margin(%) 3yrs",
        "value1": (inputs.GrossProfitMargin3yFrom || ''),
        "value2": (inputs.GrossProfitMargin3yTo || '')
      },
      "GrossProfitMargin5y": {
        "label": "Avg. Gross Profit Margin(%) 5yrs",
        "value1": (inputs.GrossProfitMargin5yFrom || ''),
        "value2": (inputs.GrossProfitMargin5yTo || '')
      },
      "GrossProfitMargin10y": {
        "label": "Avg. Gross Profit Margin(%) 10yrs",
        "value1": (inputs.GrossProfitMargin10yFrom || ''),
        "value2": (inputs.GrossProfitMargin10yTo || '')
      },
  
  
    };

  }

  const applyFun = () => {
    let topLabels = topLabels0(Inputs)
    let finalValuation_Req = valuation_Req(topLabels);
    rr_dispatch(ValuationApi(finalValuation_Req));
  };

  useEffect(() => {
    let finalValuation_Req = valuation_Req();
    rr_dispatch(ValuationApi(finalValuation_Req));
  }, [])
  

  

  return (
    <>
      <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
          <Typography className="text-[15px] text-[#000] font-semibold">
            Filter
          </Typography>
          <div>
            <Button
              className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none"
              onClick={() => applyFun()}
            >
              APPLY
            </Button>
            <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">
              RESET{" "}
            </Button>
          </div>
        </div>
        <div className="overflow-hidden">
          {/* Start Card Form */}

          <Accordion
            className="my-2 shadow-none bg-white rounded-md"
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{
              //   fontSize:'10px'
              //  }}
              className=" text-[15px] font-semibold"
            >
              Classification
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="grid grid-cols-1">
                  <label className="text-[12px] text-[#000] font-medium ">
                    Sectors ({SectorMasterArr.length})
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={SectorMasterArr}
                    values={Sectors}
                    multiple
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Sector"]: val1 });
                      setSectors(newInputValue);
                    }}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Select"
                        size="small"
                        className=""
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <label className="text-[12px] text-[#000] font-medium ">
                    Industry ({IndustryMasterArr.length})
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={IndustryMasterArr}
                    values={Industry}
                    multiple
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Industry"]: val1 });
                      setIndustry(newInputValue);
                      // console.log('Company >> ',company)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          allCompanyLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <label className="text-[12px] text-[#000] font-medium ">
                    Company ({CompanyMasterArr.length})
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={CompanyMasterArr}
                    values={Company}
                    multiple
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Company"]: val1 });
                      setCompany(newInputValue);
                      // console.log('Company >> ',company)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          allCompanyLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />
                </div>

                <div className=" flex items-center mt-2">
                  <Checkbox
                    checked={Inputs.Portfolio}
                    onChange={(e) => {
                      setInputs({ ...Inputs, Portfolio: e.target.checked });
                    }}
                    id="portfolio"
                    sx={{
                      padding: "0",
                      // paddingRight:".05rem",
                      "&.Mui-checked": {
                        color: "var(--theme-color)",
                      },
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <label htmlFor="portfolio" className=" cursor-pointer">
                    Portfolio
                  </label>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion className="my-2 shadow-none bg-white rounded-md">
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{
              //   fontSize:'10px'
              //  }}
              className=" text-[15px] font-semibold"
            >
              Share Price (TTM)
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Market Cap{" "}
                </label>

                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="MarketCapFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="MarketCapTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  LTP{" "}
                </label>
                <Input
                  type="text"
                  name="LTP"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Away 52wk High (%)
                </label>
                <Input
                  type="text"
                  name="Away52wkHigh"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">15"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Away 52wk Low (%)
                </label>
                <Input
                  type="text"
                  name="Away52wkLow"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">15"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  All Time High (%)
                </label>
                <Input
                  type="text"
                  name="AllTimeHigh"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">15"
                />
              </div>
              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  TTM PE (x)
                </label>

                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="TTM_PEFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="TTM_PETo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  TTM PBV (x)
                </label>

                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="TTM_PBVFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="TTM_PBVTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion className="my-2 shadow-none bg-white rounded-md">
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{
              //   fontSize:'10px'
              //  }}
              className=" text-[15px] font-semibold"
            >
              Historical
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Diff B/w 5yrs Avg P/BV(x)
                </label>
                <Input
                  type="text"
                  name="Diff_Bw_5yrsAvg_PBV"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Diff B/w 10yrs Avg P/BV(x)
                </label>
                <Input
                  type="text"
                  name="Diff_Bw_10yrsAvg_PBV"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Diff B/w 5yrs Avg P/E(x)
                </label>
                <Input
                  type="text"
                  name="Diff_Bw_5yrsAvg_PE"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Diff B/w 10yrs Avg P/E(x)
                </label>
                <Input
                  type="text"
                  name="Diff_Bw_10yrsAvg_PE"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Sales 3yrs (cr.)
                </label>
                <Input
                  type="text"
                  name="Avg_Sales_3yrs"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Sales 5yrs (cr.)
                </label>
                <Input
                  type="text"
                  name="Avg_Sales_5yrs"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Sales 10yrs (cr.)
                </label>
                <Input
                  type="text"
                  name="Avg_Sales_10yrs"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. PAT 3yrs (cr.)
                </label>
                <Input
                  type="text"
                  name="Avg_PAT_3yrs"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. PAT 5yrs (cr.)
                </label>
                <Input
                  type="text"
                  name="Avg_PAT_5yrs"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. PAT 10yrs (cr.)
                </label>
                <Input
                  type="text"
                  name="Avg_PAT_10yrs"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>handleChangeInput(e)}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Gross Profit (Cr.)
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>

                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Gross Profit 3yrs (cr.)
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfit3yFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfit3yTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>

                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Gross Profit 5yrs (cr.)
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfit5yFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfit5yTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Gross Profit 10yrs (cr.)
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfit10yFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfit10yTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Gross Profit Margin(%)
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMarginFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMarginTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Gross Profit Margin(%) 3yrs
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMargin3yFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMargin3yTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Gross Profit Margin(%) 5yrs
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMargin5yFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">1"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMargin5yTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<20"
                    />
                  </div>
                </div>
                {/* End Two input in row */}
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Avg. Gross Profit Margin(%) 10yrs
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMargin10yFrom"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="GrossProfitMargin10yTo"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e)=>handleChangeInput(e)}
                      placeholder="<5000"
                    />
                  </div>
                </div>
                {/* End Two input in row */}
              </div>
            </AccordionDetails>
          </Accordion>


          <Accordion className="my-2 shadow-none bg-white rounded-md">
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{
              //   fontSize:'10px'
              //  }}
              className=" text-[15px] font-semibold"
            >
              Balance Sheet
            </AccordionSummary>
            <AccordionDetails>

            <div>
              <label className="text-[12px] text-[#000] font-medium">
                Total Debt/ Equity (x)
              </label>
              <Input
                type="text"
                name="Total_DebtEquity"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e)=>handleChangeInput(e)}
                placeholder=">10"
              />

              </div>

            <div>
            <label className="text-[12px] text-[#000] font-medium">
                Gross Block Addition in 5yrs(Cr.)
              </label>
              <Input
                type="text"
                name="GrossBlockAdditionin_5yrs"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e)=>handleChangeInput(e)}
                placeholder=">10"
              />


            </div>
             <div>
             <label className="text-[12px] text-[#000] font-medium">
                Total Debt Increase in 5yrs(Cr.)
              </label>
              <Input
                type="text"
                name="TotalDebtIncreasein_5yrs"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e)=>handleChangeInput(e)}
                placeholder=">10"
              />
             </div>

           <div>

           <label className="text-[12px] text-[#000] font-medium">
           ROCE (%)
              </label>
              <div className="flex gap-2">
                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCEFrom"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
                </div>

                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCETo"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder="<5000"
                  />
                </div>
              </div>
              {/* End Two input in row */}
           </div>

           <div>

           <label className="text-[12px] text-[#000] font-medium">
                Avg. ROCE (%) 3yrs{" "}
              </label>
              <div className="flex gap-2">
                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCE3yrsFrom"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
                </div>

                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCE3yrsTo"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder="<5000"
                  />
                </div>
              </div>
              {/* End Two input in row */}
           </div>

<div>
  
<label className="text-[12px] text-[#000] font-medium">
                Avg. ROCE (%) 5yrs{" "}
              </label>
              <div className="flex gap-2">
                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCE5yrsFrom"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
                </div>

                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCE5yrsTo"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder="<5000"
                  />
                </div>
              </div>
              {/* End Two input in row */}
</div>

             <div>
             <label className="text-[12px] text-[#000] font-medium">
                Avg. ROCE (%) 10yrs{" "}
              </label>
              <div className="flex gap-2">
                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCE10yrsFrom"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
                </div>

                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="ROCE10yrsTo"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder="<5000"
                  />
                </div>
              </div>
              {/* End Two input in row */}
             </div>

             <div>
             <label className="text-[12px] text-[#000] font-medium">
                Net Cash/(Net Debt) (cr.)
              </label>
              
              <Input
                    type="text"
                    name="NetCash"
                    className="!border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
                  
             </div>

             <div>
             <label className="text-[12px] text-[#000] font-medium">
                Net Cash/ Mcap (x)
              </label>
              <Input
                    type="text"
                    name="Net_Cash_Mcap"
                    className="!border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
             </div>

              <div>
              <label className="text-[12px] text-[#000] font-medium">
                CFO/EBIDTA (x)
              </label>
              <Input
                    type="text"
                    name="CFO_EBIDTA"
                    className="!border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e)=>handleChangeInput(e)}
                    placeholder=">100"
                  />
                  
              
              </div>
            </AccordionDetails>
          </Accordion>


          <Accordion className="my-2 shadow-none bg-white rounded-md">
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{
              //   fontSize:'10px'
              //  }}
              className=" text-[15px] font-semibold"
            >
              Share Holding Pattern
            </AccordionSummary>
            <AccordionDetails>

            <div>
             <label className="text-[12px] text-[#000] font-medium">
                Promoter Holding (%)
              </label>
              <Input
                type="text"
                name="Promoter_Holding"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e)=>handleChangeInput(e)}
              />

             </div>

            <div>
            <label className="text-[12px] text-[#000] font-medium">
                Pledge (%)
              </label>
              <Input
                type="text"
                name="Pledge"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e)=>handleChangeInput(e)}
              />
              
            </div>
            

            </AccordionDetails>
          </Accordion>

          {/* End Card Form */}
        </div>
      </div>
      {/* End Filter SideBar */}
    </>
  );
};
export default FilterSidebarValuation;
