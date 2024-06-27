import { ImLoop2 } from "react-icons/im"; 
import {
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Checkbox,
  Radio,
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
import { Autocomplete, TextField } from "@mui/material";
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
    FromDate: Moment().format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
    ToDate: Moment().format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
    Date:[
      Moment().format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
      Moment().format("MM/DD/YYYY"), // Initial value in MM-DD-YY format
    ]
  });


  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [IndustryMasterArr, setIndustryMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr] = useState([]);
  const [Sectors, setSectors] = useState([]);
  const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);

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






  

  const handleChange = (selected) => {
    // selected
    let prevPrams = inputValue;
    prevPrams = {
      ...prevPrams,
      Sector: selected.map((item) => item.value),
    };
    setInputValue(prevPrams);
    setSectorData(selected);
    // console.log( "Sector Data", selected);
  };

  const handleChangeTwo = (selected) => {
    let prevPrams = inputValue;
    prevPrams = {
      ...prevPrams,
      Industry: selected.map((item) => item.value),
    };
    setInputValue(prevPrams);

    setIndustryData(selected);
    // console.log( "Industry Data", selected);
  };

  const handleChangeThree = (selected) => {
    let prevPrams = inputValue;
    prevPrams = {
      ...prevPrams,
      Company: selected.map((item) => item.value),
    };
    setInputValue(prevPrams);

    setAllCompanyData(selected);
    // console.log( "Company  Data", selected);
  };

  const Options_EBDITA_TO = [
    { label: "QoQ", value: "QoQ" },
    { label: "YoY", value: "YoY" },
  ];

  const handleChangeFour = (selected) => {
    let elkey = Object.keys(selected);

    let getSelectBoxValue = elkey.map((item) => {
      return selected[item];
    });

    let prevPrams = inputValue;
    prevPrams = {
      ...prevPrams,
      EBDITA_TO: getSelectBoxValue[0],
    };

    setInputValue(prevPrams);
    setEBDITA_TO(selected);
  };

  const Options_PAT_TO = [
    { label: "QoQ", value: "QoQ" },
    { label: "YoY", value: "YoY" },
  ];

  const handleChangeFive = (selected) => {
    let elkey = Object.keys(selected);

    let getSelectBoxValue = elkey.map((item) => {
      return selected[item];
    });

    let prevPrams = inputValue;
    prevPrams = {
      ...prevPrams,
      PAT_TO: getSelectBoxValue[0],
    };

    setInputValue(prevPrams);
    setPAT_TO(selected);
  };

  const handleChangeChecked = (event) => {
    let val = event.target.checked;
    let name = event.target.name;
    setInputValue((prev) => ({
      ...prev,
      [name]: val
    }));

    // console.log(name, val);
  };

 


  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   // Temporarily store the new state values
  //   let newFromDate = name === "FromDate" ? value : inputValue.FromDate;
  //   let newToDate = name === "ToDate" ? value : inputValue.ToDate;
  //   let newMarketCapFrom = name === "MarketCapFrom" ? value : inputValue.MarketCapFrom;
  //   let newMarketCapTo = name === "MarketCapTo" ? value : inputValue.MarketCapTo;


  //   // Handle Date updates separately
  //   if (name === "FromDate" || name === "ToDate") {
  //     let formattedFromDate = Moment(newFromDate).format("MM/DD/YYYY");
  //     let formattedToDate = Moment(newToDate).format("MM/DD/YYYY");

  //     console.log('Updated FromDate:', formattedFromDate);
  //     console.log('Updated ToDate:', formattedToDate);

  //     if (formattedFromDate || formattedToDate) {
  //       setInputValue((prev) => ({
  //         ...prev,
  //         Date: [formattedFromDate, formattedToDate]
  //       }));
  //     }
  //   }

  //   // Handle Market Cap updates separately
  //   if (name === "MarketCapFrom" || name === "MarketCapTo") {
  //     console.log('Updated MarketCapFrom:', newMarketCapFrom);
  //     console.log('Updated MarketCapTo:', newMarketCapTo);

  //     if (newMarketCapFrom || newMarketCapTo) {
  //       setInputValue((prev) => ({
  //         ...prev,
  //         Market_Cap: [newMarketCapFrom, newMarketCapTo]
  //       }));
  //     }
  //   }

  //   // Update the state based on input change
  //   setInputValue((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));


  // };



  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  
  //   setInputValue((prev) => {
  //     let updatedState = { ...prev };
  
  //     // Handle Date updates
  //     if (name === "FromDate" || name === "ToDate") {
  //       let newFromDate = name === "FromDate" ? value : prev.Date?.[0] || "";
  //       let newToDate = name === "ToDate" ? value : prev.Date?.[1] || "";
  
  //       let formattedFromDate = Moment(newFromDate).format("MM/DD/YYYY");
  //       let formattedToDate = Moment(newToDate).format("MM/DD/YYYY");
  
  //       console.log('Updated FromDate:', formattedFromDate);
  //       console.log('Updated ToDate:', formattedToDate);
  
  //       // Update the Date array in the state
  //       updatedState.Date = [formattedFromDate, formattedToDate];
  //     }
  
  //     // Handle Market Cap updates
  //     if (name === "MarketCapFrom" || name === "MarketCapTo") {
  //       let newMarketCapFrom = name === "MarketCapFrom" ? value : prev.Market_Cap?.[0] || "";
  //       let newMarketCapTo = name === "MarketCapTo" ? value : prev.Market_Cap?.[1] || "";
  
  
  //       // Update the Market Cap array in the state
  //       updatedState.Market_Cap = [newMarketCapFrom, newMarketCapTo];
  //     }
  
  //     // Update other fields directly
  //     if (name !== "FromDate" && name !== "ToDate" && name !== "MarketCapFrom" && name !== "MarketCapTo") {
  //       updatedState[name] = value;
  //     }
  
  //     // Ensure FromDate, ToDate, MarketCapFrom, and MarketCapTo are not separate keys
  //     delete updatedState.FromDate;
  //     delete updatedState.ToDate;
  //     delete updatedState.MarketCapFrom;
  //     delete updatedState.MarketCapTo;
  
  //     return updatedState;
  //   });
  // };
  
  

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

  const inputBothVal = ["Date", "Market_Cap"];







  // const applyBtn = () => {
  //   // console.log(inputValue);
  //   let fromDate = inputValue.FromDate;
  //   let toDate = inputValue.ToDate;
  //   if (Moment(fromDate, "MM/DD/YYYY").isAfter(toDate)) {
  //     alert('"From date" should be less than "To date"');
  //     return;
  //   } else {
      
  //     let params1 = FilterInputs;

  //     // console.log("inputValue >>>>>>>>>", inputValue);
      
  //     Object.keys(inputValue).map((key) => {
  //       if (inputBothVal.includes(key)) {
  //         params1 = {
  //           ...params1,
  //           [key]: {
  //             ...FilterInputs[key],
  //             value1: inputValue[key][0] || "",
  //             value2: inputValue[key][1] || "",
  //           },
  //         }; 
  //       } else {
  //         params1 = {
  //           ...params1,
  //           [key]: {
  //             ...FilterInputs[key],
  //             value1: inputValue[key] || "",
  //           },
  //         };
  //       }
  //     });

  //     console.log("inputValue >>>>>>>>>", params1);

  //     // setFilterChipsData(params1);
  //     setFilterDataChip(params1);

  //     let finalParams = QuterltyResultFinalReq(params1);
  //     callBothAPIs(finalParams)

  //   }
  // };


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
  
    console.log("inputValue >>>>>>>>>", params1);
  
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
            <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">
              RESET{" "}
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
                onClick={() => handleReset(1)}
              >
                RESET
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <label className="text-[12px] text-[#000] font-medium">
                From{" "}
              </label>
              <Input
                type="date"
                max={inputValue.ToDate}
                name="FromDate"
                defaultValue={Moment().add("-1", "days").format("YYYY-MM-DD")}
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
                onClick={() => handleReset(2)}
              >
                RESET
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="flex justify-between">
                <label className="text-[12px] text-[#000] font-medium">
                  Sectors (58){" "}
                </label>
                <Typography
                  className="text-[#7B70FF] text-[12px] font-semibold cursor-pointer"
                  // onClick={handleRefreshClassification}
                >
                  Refresh
                </Typography>
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
                    values={Sectors}
                    multiple
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputValue({ ...inputValue, ["Sector"]: val1 });
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

              <label className="text-[12px] text-[#000] font-medium">
                Industry (23){" "}
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
                      setInputValue({ ...inputValue, ["Industry"]: val1 });
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

              <label className="text-[12px] text-[#000] font-medium">
                Compnay
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
                      setInputValue({ ...inputValue, ["Company"]: val1 });
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
                    onChange={handleChangeInput}
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
              <div className="flex flex-col">
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
              </div>
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
