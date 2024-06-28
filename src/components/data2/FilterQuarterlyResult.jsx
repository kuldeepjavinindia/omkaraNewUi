import { ImLoop2 } from "react-icons/im"; 
import {
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Checkbox,
  // Radio,
} from "@material-tailwind/react";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  ResultDataApi,
  ResultDataSheet2Api,
} from "../../store/slice/Data2Slice";
import {
  industryMasterAPI,
  sectorMasterAPI,
  allCompanyMasterAPI,
  turnAroundMasterAPI,
} from "../../store/slice/MasterSlice";
import { ResultDataReq } from "../../constants/defaultRequest";
import Moment from "moment";
import { FilterInputs, QuterltyResultFinalReq, selectTurnAround } from "../../constants/helper";
import { GlobalContext } from "../../context/GlobalContext";
import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
// import {
//   industryMasterFun,
//   selectCompany,
//   selectSectors,
// } from "../../../constants/helper";
import { selectCompany, selectSectors, industryMasterFun } from "../../constants/helper";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const animatedComponents = makeAnimated();

const FilterQuarterlyResult = () => {
  // const [sectorData, setSectorData] = useState([]);
  // const [industryData, setIndustryData] = useState([]);
  // const [allCompanyData, setAllCompanyData] = useState([]);
  
  const [TurnAroundMasterArr, setTurnAroundMasterArr] = useState([]);

  const [eBDITA_TO, setEBDITA_TO] = useState({});
  const [PAT_TO, setPAT_TO] = useState({});
  const [patToKey, setPatToKey] = useState(false);
  const [ebditaKey, setEbditaKey] = useState(false);

  const [inputValue, setInputValue] = useState({
    FromDate: Moment().add("-1", "days").format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
    ToDate: Moment().format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
    Date:[
      Moment().add("-1", "days").format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
      Moment().format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
    ]
  });


  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [IndustryMasterArr, setIndustryMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr] = useState([]);
  const [Sectors, setSectors] = useState([]);
  const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);
  const [toggleReset, setToggleReset] = useState(false);
  const [dateToggle, setDateToggle] = useState(false)

  name = "EBDITA_TO";
  const [finalUserInputs, setFinalUserInputs] = useState();


  
  const {
    // FilterChipsData,
    setFilterChipsData,
    setFilterDataChip
  } = useContext(GlobalContext)



  const rr_dispatch = useDispatch();
  // const [open, setOpen] = useState(1);

  const {
    ResultData: { data: ResultDataTable, loading: ResultDataLoading },
  } = useSelector((state) => state.Data2);

  const {
    sectorMaster: { loading: sectorMasterLoading, data: sectorMasterData },
    industryMaster: { loading: industryMasterLoading, data: industryMasterData,},
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
    turnAroundMaster: { data: turnAroundData, loading: turnAroundLoading, },

  } = useSelector((state) => state.Masters);


  const sectorsCount = sectorMasterData.length
  const industryCount = industryMasterData.length
  const compnayCount = allCompanyData.length

  // Start Calling ResultDataApi and Update with Input change

  const [ActiveAccordion, setActiveAccordion] = useState({
    accordion_1: true,
    accordion_2: true,
    accordion_3: false,
    accordion_4: false,
    accordion_5: false,
    accordion_6: false,
  });

  useEffect(() => {
      rr_dispatch(turnAroundMasterAPI())
  }, [])
  useEffect(() => {
    if(!turnAroundLoading){
      selectTurnAround(turnAroundData, setTurnAroundMasterArr)
    }  
  }, [turnAroundLoading])
  
  

  const handleOpen = (value) => {
    let key = `accordion_${value}`;
    setActiveAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = (value) => {
    let key = `accordion_${value}`;
    setActiveAccordion((prev) => ({
      ...prev,
      [key]: true ? false : false,
    }));
  };


 
  var initialDates = [ Moment().add(-1, 'days').format('YYYY-MM-DD'), // Yesterday's date
    Moment().format('YYYY-MM-DD'), // Today's date
  ];

  const handleResetDate = (value) => {

    // console.log(inputValue.Date[0]);

    let key = `accordion_${value}`;
    setActiveAccordion((prev) => ({
      ...prev,
      [key]: true ? false : false,
    }));

    // console.log('value ??>>> ', initialDates, Moment(inputValue.Date[0]).format('YYYY-MM-DD'))

    setInputValue({
      ...inputValue,
      Date: initialDates,
      FromDate: initialDates[0],
      ToDate: initialDates[1],
      // value={inputValue.FromDate}
    })
    

  }


const handleRestSIC = (value) => {
  let key = `accordion_${value}`;
  setActiveAccordion((prev) => ({
    ...prev,
    [key]: true ? false : false,
  }));

  setSectors([]);
  setIndustry([]); 
  setCompany([])
  setInputValue({ ...inputValue, Sector: [], Industry: [] , Company: [] });

  setToggleReset((prev) => !prev);


}





const handleResetAll = (value) => {

  window.location.reload();
  console.log("inputValue >>>>>>>>>", inputValue);
}




  const handleChangeChecked = (event) => {
    let val = event.target.checked;
    let name = event.target.name;
    setInputValue((prev) => ({
      ...prev,
      [name]: val
    }));

    // console.log(name, val);
  };

 
  

  const handleChangeInput = (e) => {
    const { name, value } = e.target;


    setInputValue((prev) => {
        let updatedState = { ...prev };

        // Handle Date updates
        if (name === "FromDate" || name === "ToDate") {
            let newFromDate = name === "FromDate" ? value : prev.Date?.[0] || "";
            let newToDate = name === "ToDate" ? value : prev.Date?.[1] || "";

            // Check if the new dates are valid and format them
            let formattedFromDate =  Moment(newFromDate).format("MM/DD/YYYY");
            let formattedToDate =  Moment(newToDate).format("MM/DD/YYYY");

            // Update the Date array in the state
            updatedState.Date = [formattedFromDate, formattedToDate];

            // console.log({formattedFromDate, formattedToDate})
        }

        // Handle Market Cap updates
        if (name === "MarketCapFrom" || name === "MarketCapTo") {
            let newMarketCapFrom = name === "MarketCapFrom" ? value : prev.Market_Cap?.[0] || "";
            let newMarketCapTo = name === "MarketCapTo" ? value : prev.Market_Cap?.[1] || "";

            // Update the Market Cap array in the state
            updatedState.Market_Cap = [newMarketCapFrom, newMarketCapTo];
        }

        // Update other fields directly
        if (name !== "FromDate" && name !== "ToDate" && name !== "MarketCapFrom" && name !== "MarketCapTo") {
            updatedState[name] = value;
        }

        // Ensure FromDate, ToDate, MarketCapFrom, and MarketCapTo are not separate keys
        delete updatedState.FromDate;
        delete updatedState.ToDate;
        delete updatedState.MarketCapFrom;
        delete updatedState.MarketCapTo;

  
        setDateToggle(false);
        return updatedState;
    });
};


// Log the inputValue whenever it updates
  useEffect(() => {
    // console.log('inputValue updated:', inputValue);
  }, [inputValue]);



  const callBothAPIs = (finalParams) => {
    rr_dispatch(ResultDataApi(finalParams));
    rr_dispatch(ResultDataSheet2Api(finalParams));

  }


  // Start Calling ResultDataApi and Update with Input change
  const callApi = (params = ResultDataReq) => {
   //  rr_dispatch(ResultDataApi(params));
    //  rr_dispatch(ResultDataSheet2Api(ResultDataReq));
   // rr_dispatch(industryMasterAPI());
   // rr_dispatch(sectorMasterAPI());
   // r_dispatch(allCompanyMasterAPI());
    callBothAPIs(ResultDataReq)
    
  };

  // let CurrentSelectedWishListData = 

  // const inputBothVal = ["Date", "Market_Cap"];



  // const topLabelReq = (inputs) => {
  //     return {
      
  //       // "WatchListID": {
  //       //   "label": "WatchListID",
  //       //   "value1": (CurrentSelectedWishListData?.ID || 0),
  //       //   "value2": ""
  //       // },
  //       "Market_Cap": {
  //         "label": "Market Cap",
  //         "value1": (inputs.MarketCapFrom || ''),
  //         "value2": (inputs.MarketCapTo || '')
  //       },
  //       "date_range": {
  //         "label": "Date Range",
  //         "value1": (inputs.FromDate ? Moment(inputs.FromDate).format('MM/DD/YYYY') : null),
  //         "value2": (inputs.ToDate ? Moment(inputs.ToDate).format('MM/DD/YYYY') : null)
  //       },
  //       "LTP": {
  //         "label": "LTP",
  //         "value1": (inputs.LTP || ''),
  //         "value2": ""
  //       },
  //       "TTM_P_B": {
  //         "label": "TTM (P/B)",
  //         "value1": (inputs.TTM_P_B || ""),
  //         "value2": ""
  //       },
  //       "TTM_P_E": {
  //         "label": "TTM (P/E)",
  //         "value1": (inputs.TTM_P_E || ""),
  //         "value2": ""
  //       },
  //       "ROCE": {
  //         "label": "ROCE",
  //         "value1": (inputs.ROCE || ""),
  //         "value2": ""
  //       },
  //       "TTM_Sales_Abs": {
  //         "label": "TTM_Sales_Abs",
  //         "value1": (inputs.TTM_Sales_Abs || ""),
  //         "value2": ""
  //       },
  //       "TTM_PAT_Abs": {
  //         "label": "TTM_PAT_Abs",
  //         "value1": (inputs.TTM_PAT_Abs || ""),
  //         "value2": ""
  //       },
  //       "Sales_YOY": {
  //         "label": "Sales_YOY",
  //         "value1": (inputs.Sales_YOY || ""),
  //         "value2": ""
  //       },
  //       "Sales_QOQ": {
  //         "label": "Sales_QOQ",
  //         "value1": (inputs.Sales_QOQ || ""),
  //         "value2": ""
  //       },
  //       "EBDITA_YOY": {
  //         "label": "EBDITA_YOY",
  //         "value1": (inputs.EBDITA_YOY || ""),
  //         "value2": ""
  //       },
  //       "EBDITA_QOQ": {
  //         "label": "EBDITA_QOQ",
  //         "value1": (inputs.EBDITA_QOQ || ""),
  //         "value2": ""
  //       },
  //       "PAT_YOY": {
  //         "label": "PAT_YOY",
  //         "value1": (inputs.PAT_YOY || ""),
  //         "value2": ""
  //       },
  //       "PAT_QOQ": {
  //         "label": "PAT_QOQ",
  //         "value1": (inputs.PAT_QOQ || ""),
  //         "value2": ""
  //       },
  //       "GROSS_PROFIT_YOY": {
  //         "label": "GROSS_PROFIT_YOY",
  //         "value1": (inputs.GROSS_PROFIT_YOY || ""),
  //         "value2": ""
  //       },
  //       "GROSS_PROFIT_QOQ": {
  //         "label": "GROSS_PROFIT_QOQ",
  //         "value1": (inputs.GROSS_PROFIT_QOQ || ""),
  //         "value2": ""
  //       },
  //       "EBDITA_TO": {
  //         "label": "EBIDTA Margin (%) - To +",
  //         "value1": (inputs.EBDITA_TO || ""),
  //         "value2": ""
  //       },
  //       "PAT_TO": {
  //         "label": "PAT-TO +",
  //         "value1": (inputs.PAT_TO || ""),
  //         "value2": ""
  //       },
  //       "ColorCode": {
  //         "label": "Color Code",
  //         "value1": (inputs.ColorCode || ""),
  //         "value2": ""
  //       },
  //       "sectors": {
  //         "label": "Sector",
  //         "value1": (inputs.Sectors || ""),
  //         "value2": ""
  //       },
  //       "industry": {
  //         "label": "Industry",
  //         "value1": (inputs.Industry || ""),
  //         "value2": ""
  //       },
  //       "company": {
  //         "label": "Company",
  //         "value1": (inputs.Company || ""),
  //         "value2": ""
  //       },
  //       "portfolio": {
  //         "label": "Portfolio",
  //         "value1": (inputs.Portfolio || false),
  //         "value2": ""
  //       }
  //     }
  // }



  
  const applyBtn = () => {
    // Extract Date and Market Cap values from inputValue
    // console.log('inputValue ???>>>> ', inputValue)
    let fromDate = inputValue.FromDate || Moment().format("MM/DD/YYYY");
    let toDate = inputValue.ToDate || Moment().format("MM/DD/YYYY");
  
    if (fromDate && toDate && Moment(fromDate, "MM-DD-YYYY").isAfter(toDate)) {
      alert('"From date" should be less than "To date"');
      return;
    }
  
    // Initialize parameters with existing FilterInputs
    let params1 = { ...FilterInputs };
  
    Object.keys(inputValue).forEach((key) => {
      if (key === 'Date') {
        params1[key] = {
          ...FilterInputs[key],
          value1: inputValue.Date?.[0] || "",
          value2: inputValue.Date?.[1] || ""
        };
      } else if (key === 'Market_Cap') {
        params1[key] = {
          ...FilterInputs[key],
          value1: inputValue.Market_Cap?.[0] || "",
          value2: inputValue.Market_Cap?.[1] || ""
        };
      } else if (!['FromDate', 'ToDate', 'MarketCapFrom', 'MarketCapTo'].includes(key)) {
        // For other fields, update the value1 property
           params1[key] = {
          ...FilterInputs[key],
          value1: inputValue[key] || ""
        };
      }
    });

    // let params1 = topLabelReq(FilterInputs)
  
    
  
    // setFilterChipsData(params1); // Uncomment if needed
       setFilterDataChip(params1);
  
    let finalParams = QuterltyResultFinalReq(params1);
    callBothAPIs(finalParams);
  };

  const resetTurnAround = () => {

    setInputValue({ ...inputValue, ['EBDITA_TO']: "", ['PAT_TO']: "" });
    setEBDITA_TO({});
    setPAT_TO({});
    setPatToKey(!patToKey);
    setEbditaKey(!ebditaKey);

  }


  useEffect(()=> {
    let params1 = { ...FilterInputs };
      // console.log("0 check initial ", params1);
     setFilterDataChip(params1)
   },[FilterInputs])




  // console.log(finalUserInputs);
  useEffect(() => {
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(industryMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
    callApi();
  }, [rr_dispatch]);


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
              onClick={() => applyBtn()}
            >
              APPLY
            </Button>
            <Button  className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none" 
            onClick={()=> handleResetAll(1)}
            >
              RESET
            </Button>
          </div>
        </div>
        <div className="">
          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_1}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={1} open={ActiveAccordion.accordion_1} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Date Range
              </Typography>
              <Typography
                className="text-[13px] text-[#FF2026] font-semibold"
                onClick={() => handleResetDate(1)}
              >
                RESET
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <label className="text-[12px] text-[#000] font-medium">
                From 
              </label>
              <Input
                type="date"
                max={inputValue.ToDate}
                value={Moment(inputValue?.Date[0]).format("YYYY-MM-DD")}
                // value = {dateToggle ? Moment(inputValue?.Date[0]).format("YYYY-MM-DD") : Moment().add("-1", "days").format("YYYY-MM-DD") }
                name="FromDate"
                // defaultValue={Moment().add("-1", "days").format("YYYY-MM-DD")}
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
              />

              <label className="text-[12px] text-[#000] font-medium">To </label>
              <Input
                type="date"
                min={inputValue.FromDate}
                // min={inputValue.Date[0]}
                // value = {dateToggle? inputValue?.Date[1] : Moment().format("YYYY-MM-DD") }
                // value={inputValue.ToDate}
                value={Moment(inputValue?.Date[1]).format("YYYY-MM-DD")}
                name="ToDate"
                defaultValue={Moment().format("YYYY-MM-DD")}
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
              />
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_2}
            className="mt-2 rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={2} open={ActiveAccordion.accordion_2} />}
          >
              <AccordionHeader
              onClick={() => handleOpen(2)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Classification
              </Typography>
              <Typography
                className="text-[13px] text-[#FF2026] font-semibold"
                onClick={() => handleRestSIC(2)}
              >
                RESET
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="flex justify-between">
                <label className="text-[12px] text-[#000] font-medium">
                  Sectors ({SectorMasterArr.length})
                </label>
                {/* <Typography
                  className="text-[#7B70FF] text-[12px] font-semibold cursor-pointer"
                  // onClick={handleRefreshClassification}
                >
                  Refresh
                </Typography> */}
              </div>
              {/* <Select
                components={animatedComponents}
                isMulti
                options={sector}
                value={sectorData}
                onChange={handleChange}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                placeholder="Select Names"
                className="react-select-container"
                classNamePrefix="react-select"
              /> */}
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={SectorMasterArr}
                    // values={Sectors}
                    key={toggleReset ? 'sector-reset' : 'sector'}
                    multiple
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputValue({ ...inputValue, ["Sector"]: val1 });
                      setSectors(newInputValue);
                      setToggleReset(false)
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

              <label className="text-[12px] text-[#000] font-medium">
                Industry ({IndustryMasterArr.length})
              </label>
              {/* <Select
                components={animatedComponents}
                isMulti
                options={industry}
                value={industryData}
                onChange={handleChangeTwo}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                placeholder="Select Names"
                className="react-select-container"
                classNamePrefix="react-select"
              /> */}


                   <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={IndustryMasterArr}
                    // values={toggleReset ? Industry : null}
                    key={toggleReset ? 'industry-reset' : 'industry'}
                    
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
                      setInputValue({ ...inputValue, ["Industry"]: val1 });
                      setIndustry(newInputValue);
                      // console.log('Company >> ',company)
                      setToggleReset(false)
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

              <label className="text-[12px] text-[#000] font-medium">
                Company ({CompanyMasterArr.length})
              </label>
              {/* <Select
                components={animatedComponents}
                isMulti
                options={companies}
                value={allCompanyData}
                onChange={handleChangeThree}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                placeholder="Select Names"
                className="react-select-container"
                classNamePrefix="react-select"
              /> */}

                   <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={CompanyMasterArr}
                    // values={Company}
                    key={toggleReset ? 'compnay-reset' : 'company'}
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
                      setInputValue({ ...inputValue, ["Company"]: val1 });
                      setCompany(newInputValue);
                      // console.log('Company >> ',company)
                      setToggleReset(false)
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

              <div className="ml-[-11px]">
                <Checkbox
                  label="Portfolio"
                  name="Portfolio"
                  onChange={handleChangeChecked}
                  className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
                />
              </div>
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

            




 


          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_3}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={3} open={ActiveAccordion.accordion_3} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Share Price (TTM)
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="Market_Cap"
              >
                Market Cap
              </label>
              <div className="flex gap-2">
                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="MarketCapFrom"
                    // defaultValue=  {inputValue?.Market_Cap?.[0]}
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChangeInput}
                    placeholder=">100"
                  />
                </div>

                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="MarketCapTo"
                    // defaultValue={inputValue?.Market_Cap?.[1]}
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChangeInput}
                    placeholder="<5000"
                  />
                </div>
              </div>

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="LTP"
              >
                LTP{" "}
              </label>
              <Input
                type="text"
                name="LTP"
                value={inputValue.LTP}
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="TTM_P_B"
              >
                TTM (P/B){" "}
              </label>
              <Input
                type="text"
                name="TTM_P_B"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">15"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="TTM_P_E"
              >
                TTM (P/E){" "}
              </label>
              <Input
                type="text"
                name="TTM_P_E"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">15"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="ROCE"
              >
                ROCE{" "}
              </label>
              <Input
                type="text"
                name="ROCE"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">15"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="TTMSalesAbs"
              >
                TTM SALES ABS{" "}
              </label>
              <Input
                type="text"
                name="TTMSalesAbs"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">15"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="TTMPATAbs"
              >
                TTM PAT ABS{" "}
              </label>
              <Input
                type="text"
                name="TTMPATAbs"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">50"
              />
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_4}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={4} open={ActiveAccordion.accordion_4} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Result Data
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="Sales_YOY"
              >
                SALES (YOY%){" "}
              </label>
              <Input
                type="text"
                name="Sales_YOY"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="Sales_QOQ"
              >
                SALES (QOQ%){" "}
              </label>
              <Input
                type="text"
                name="Sales_QOQ"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="GP_YOY"
              >
                GROSS PROFIT (YOY%){" "}
              </label>
              <Input
                type="text"
                name="GP_YOY"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="GP_QOQ"
              >
                GROSS PROFIT (QOQ%){" "}
              </label>
              <Input
                type="text"
                name="GP_QOQ"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="EBDITA_YOY"
              >
                EBDITA (YOY%){" "}
              </label>
              <Input
                type="text"
                name="EBDITA_YOY"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="EBDITA_QOQ"
              >
                EBDITA (QOQ%){" "}
              </label>
              <Input
                type="text"
                name="EBDITA_QOQ"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="PAT_YOY"
              >
                PAT (YOY%)
              </label>
              <Input
                type="text"
                name="PAT_YOY"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="PAT_QOQ"
              >
                PAT (QOQ%)
              </label>
              <Input
                type="text"
                name="PAT_QOQ"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChangeInput}
                placeholder=">10"
              />
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_5}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={5} open={ActiveAccordion.accordion_5} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Turn Around
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="EBDITA_TO"
              >
                EBIDTA Margin (%) - To +
              </label>

              {/* <select name="EBDITA_TO" id="" value={eBDITA_TO}   onChange={handleChangeFour}>
           {
            Options_EBDITA_TO.map((item)=> {
             return (
              <>
               <option>
                {item.value}
              </option>
              </>
             )
            })
           }
        </select> */}
               <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={TurnAroundMasterArr}
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
                      setInputValue({ ...inputValue, ["EBDITA_TO"]: newInputValue?.value });
                      setEBDITA_TO(newInputValue);
                      console.log('newInputValue >> ',newInputValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          turnAroundLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="PAT_TO"
              >
                PAT-TO +
              </label>
              <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={TurnAroundMasterArr}
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
                      setInputValue({ ...inputValue, ["PAT_TO"]: newInputValue?.value });
                      setPAT_TO(newInputValue);
                      console.log('newInputValue >> ',newInputValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          turnAroundLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />

              {/* <Autocomplete
                    disablePortal
                    id="PAT_TO"
                    options={TurnAroundMasterArr}
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
                      setInputValue({ ...inputValue, ["PAT_TO"]: newInputValue.value });
                      setPAT_TO(newInputValue);
                      console.log
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          turnAroundLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  /> */}

              {/* <Select
                name="PAT_TO"
                components={animatedComponents}
                options={Options_PAT_TO}
                value={PAT_TO}
                onChange={handleChangeFive}
                closeMenuOnSelect={true}
                isClearable={true}
                hideSelectedOptions={false}
                placeholder="Select Name"
                className="react-select-container"
                classNamePrefix="react-select"
                isMulti={false}
              /> */}
              {/* <Input
            type="text"
            name="PAT_TO"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
          /> */}
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_6}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={6} open={ActiveAccordion.accordion_6} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(6)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Conditiions
              </Typography>
            </AccordionHeader>
            <AccordionBody>

                  <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      defaultValue=""
                      name="ColorCode"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel className="labelItem " value="" control={<Radio />} label="All" />
                      <FormControlLabel className="labelItem label_Green text-green-500 !text-[13px]" value="Green" control={<Radio />} label="Sales Up 10% (YoY & QoQ), Gross And EBIDTA Margins[YoY/QoQ] Improving." />
                      <FormControlLabel className="labelItem label_Orange text-orange-500 !text-[13px]" value="Orange" control={<Radio />} label="Sales Up 20% (YoY & QoQ)." />
                      <FormControlLabel className="labelItem label_Red text-red-500 !text-[13px]" value="Red" control={<Radio />} label="Sales Down 10% (YoY & QoQ), Gross And EBIDTA Margins[YoY/QoQ] Declining." />
                    </RadioGroup>
                    </FormControl>

                  </div>


              {/* <div className="flex flex-col">
                <Radio
                  name="ColorCode"
                  value=""
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px]"> All </Typography>
                    </div>
                  }
                />

                <Radio
                  name="ColorCode"
                  value="Green"
                  
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px] text-green-500">
                        Sales Up 10% (YoY & QoQ), Gross And EBIDTA
                        Margins[YoY/QoQ] Improving.
                      </Typography>
                    </div>
                  }
                />

                <Radio
                  value="Orange"
                  name="ColorCode"
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px]  text-orange-500">
                        Sales Up 20% (YoY & QoQ).
                      </Typography>
                    </div>
                  }
                />

                <Radio
                  value="Red"
                  name="ColorCode"
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px] text-red-500">
                        Sales Down 10% (YoY & QoQ), Gross And EBIDTA
                        Margins[YoY/QoQ] Declining.
                      </Typography>
                    </div>
                  }
                />
              </div> */}
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}
        </div>
      </div>
      {/* End Filter SideBar */}
    </>
  );
};
export default FilterQuarterlyResult;
