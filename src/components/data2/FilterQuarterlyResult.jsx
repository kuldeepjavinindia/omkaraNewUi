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
import { useEffect, useState } from "react";
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
} from "../../store/slice/MasterSlice";
import { ResultDataReq } from "../../constants/defaultRequest";
import Moment from "moment";
import { FilterInputs, QuterltyResultFinalReq } from "../../constants/helper";

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
  const [sectorData, setSectorData] = useState();
  const [industryData, setIndustryData] = useState();
  const [allCompanyData, setAllCompanyData] = useState();
  const [eBDITA_TO, setEBDITA_TO] = useState();
  const [PAT_TO, setPAT_TO] = useState();

  const [inputValue, setInputValue] = useState({
    FromDate: Moment().format("MM-DD-YYYY"), // Initial value in MM-DD-YY format
    ToDate: Moment().format("MM-DD-YYYY"), // Initial value in MM-DD-YY format
  });
  name = "EBDITA_TO";
  const [finalUserInputs, setFinalUserInputs] = useState();

  const rr_dispatch = useDispatch();
  // const [open, setOpen] = useState(1);

  const {
    ResultData: { data: ResultDataTable, loading: ResultDataLoading },
  } = useSelector((state) => state.Data2);

  const {
    industryMaster: {
      data: IndustryMasterData,
      loading: IndustryMasterLoading,
    },
    sectorMaster: { data: sectorMasterData, loading: sectorMasterLoading },
    allCompanyMaster: {
      data: allCompanyMasterMasterData,
      loading: allCompanyMasterMasterLoading,
    },
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

  const handleRefreshClassification = () => {
    setSectorData(null);
    setIndustryData(null);
    setAllCompanyData(null);
  };

  const industry = [];
  IndustryMasterData.map((item, index) => {
    let createIndustryOptions = {
      value: item.IndustryID,
      label: item.Industry,
    };
    industry.push(createIndustryOptions);
  });

  const sector = [];
  sectorMasterData.map((item, index) => {
    let createIndustryOptions = {
      value: item.sectorID,
      label: item.Sector,
    };
    sector.push(createIndustryOptions);
  });

  const companies = [];
  allCompanyMasterMasterData.map((item, index) => {
    let createIndustryOptions = {
      value: item.CompanyID,
      label: item.CompanyName,
    };
    companies.push(createIndustryOptions);
  });

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
    // console.log(name, val);
  };

  const handleChangeInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "FromDate" || name === "ToDate") {
      let fromDate = Moment(inputValue.FromDate).format("MM/DD/YYYY");
      let toDate = Moment(inputValue.ToDate).format("MM/DD/YYYY");

      if (fromDate != "" && toDate != "") {
        setInputValue((prev) => ({
          ...prev,
          ["Date"]: [fromDate, toDate],
        }));
      }
    }

    if (name === "MarketCapFrom" || name === "MarketCapTo") {
      let marketCapfrom = inputValue?.MarketCapFrom;
      let marketCapTo = inputValue?.MarketCapTo;

      console.log("marketcap>>>   ", marketCapTo);

      if (marketCapfrom != "" && marketCapTo != "") {
        setInputValue((prev) => ({
          ...prev,
          ["Market_Cap"]: [marketCapfrom, marketCapTo],
        }));
      }
    }
  };



  const callBothAPIs = (finalParams) => {
    rr_dispatch(ResultDataApi(finalParams));
    rr_dispatch(ResultDataSheet2Api(finalParams));

  }


  // Start Calling ResultDataApi and Update with Input change
  const callApi = (params = ResultDataReq) => {
    // rr_dispatch(ResultDataApi(params));
    // // rr_dispatch(ResultDataSheet2Api(ResultDataReq));
    // rr_dispatch(industryMasterAPI());
    // rr_dispatch(sectorMasterAPI());
    // rr_dispatch(allCompanyMasterAPI());
    callBothAPIs(ResultDataReq)
    
  };

  const inputBothVal = ["Date", "Market_Cap"];







  const applyBtn = () => {
    // console.log(inputValue);
    let fromDate = inputValue.FromDate;
    let toDate = inputValue.ToDate;
    if (Moment(fromDate, "MM-DD-YYYY").isAfter(toDate)) {
      alert('"From date" should be less than "To date"');
      return;
    } else {
      
      let params1 = FilterInputs;

      // console.log("filterInputs", params1);

      Object.keys(inputValue).map((key) => {
        if (inputBothVal.includes(key)) {
          params1 = {
            ...params1,
            [key]: {
              ...FilterInputs[key],
              value1: inputValue[key][0],
              value2: inputValue[key][1],
            },
          };
        } else {
          params1 = {
            ...params1,
            [key]: {
              ...FilterInputs[key],
              value1: inputValue[key],
            },
          };
        }
      });
      let finalParams = QuterltyResultFinalReq(params1);
      callBothAPIs(finalParams)

    }
  };



  // console.log(finalUserInputs);
  useEffect(() => {
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(industryMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
    callApi();
  }, [rr_dispatch]);

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
                Data Range
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
                  onClick={handleRefreshClassification}
                >
                  Refresh
                </Typography>
              </div>
              <Select
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
              />

              <label className="text-[12px] text-[#000] font-medium">
                Industry (23){" "}
              </label>
              <Select
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
              />

              <label className="text-[12px] text-[#000] font-medium">
                Compnay{" "}
              </label>
              <Select
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
                EBIDTA Margin (%) - To +{" "}
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

              <Select
                name="EBDITA_TO"
                components={animatedComponents}
                options={Options_EBDITA_TO}
                value={eBDITA_TO}
                onChange={handleChangeFour}
                closeMenuOnSelect={true}
                isClearable={true}
                hideSelectedOptions={false}
                placeholder="Select Name"
                className="react-select-container"
                classNamePrefix="react-select"
                isMulti={false}
              />

              <label
                className="text-[12px] text-[#000] font-medium"
                htmlFor="PAT_TO"
              >
                PAT-TO +{" "}
              </label>
              <Select
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
              />
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
                  name="conditonsOptions"
                  value="all"
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px]"> All </Typography>
                    </div>
                  }
                />

                <Radio
                  name="conditonsOptions"
                  value="saleUpTo10%"
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px]">
                        Sales Up 10% (YoY & QoQ), Gross And EBIDTA
                        Margins[YoY/QoQ] Improving.
                      </Typography>
                    </div>
                  }
                />

                <Radio
                  value="saleUpTo20%"
                  name="conditonsOptions"
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px]">
                        Sales Up 20% (YoY & QoQ).
                      </Typography>
                    </div>
                  }
                />

                <Radio
                  value="saleDownTo10%"
                  name="conditonsOptions"
                  className=" custom-radio  checked:border-[#4448F5]"
                  onChange={handleChangeInput}
                  label={
                    <div>
                      <Typography className="text-[13px]">
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
