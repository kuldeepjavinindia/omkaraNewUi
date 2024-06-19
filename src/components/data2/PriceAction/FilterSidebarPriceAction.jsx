import { Accordion, Typography, Button, Input } from "@material-tailwind/react";
import {
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Select from "react-select";
import {
  allCompanyMasterAPI,
  industryMasterAPI,
  sectorMasterAPI,
} from "../../../store/slice/MasterSlice";
import {
  industryMasterFun,
  selectCompany,
  selectSectors,
} from "../../../constants/helper";
import { useDispatch, useSelector } from "react-redux";

const FilterSidebarPriceAction = () => {
  // const [open, setOpen] = useState(1);

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


  const  applyNow = () => {

  }





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

  return (
    <>
      <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
          <Typography className="text-[15px] text-[#000] font-semibold">
            Filter price
          </Typography>
          <div>
            <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none" onClick={() => applyNow()}>
              APPLY
            </Button>
            <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">
              RESET{" "}
            </Button>
          </div>
        </div>
        <div className=" overflow-hidden">
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
                      name="marketcap100"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      // onChange={handleChangeInput}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="marketcap5000"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      // onChange={handleChangeInput}
                      placeholder="<5000"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-[#000] font-medium">
                Change from 52wk High (%)
                </label>
                <Input
                  type="text"
                  name="ltp"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  // onChange={handleChangeInput}
                  placeholder=">10"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                Change from 52wk Low (%)
                </label>
                <Input
                  type="text"
                  name="TTM"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  // onChange={handleChangeInput}
                  placeholder=">15"
                />
              </div>
              <div>
                <label className="text-[12px] text-[#000] font-medium">
                Change All Time High(%)

                </label>
                <Input
                  type="text"
                  name="rice"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  // onChange={handleChangeInput}
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
                      name="marketcap100"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      // onChange={handleChangeInput}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="marketcap5000"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      // onChange={handleChangeInput}
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
                      name="marketcap100"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      // onChange={handleChangeInput}
                      placeholder=">100"
                    />
                  </div>

                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="marketcap5000"
                      className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                      // onChange={handleChangeInput}
                      placeholder="<5000"
                    />
                  </div>
                </div>
              </div>

            </AccordionDetails>
          </Accordion>

          {/* Start Card Form */}
          {/* <Accordion open={ActiveAccordion.accordion_2}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={3} open={ActiveAccordion.accordion_2} />}>
    <AccordionHeader onClick={() => handleOpen(2)} className="flex border-none py-0 pt-0">
    <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Share Price (TTM)</Typography>
    
    </AccordionHeader>
    <AccordionBody>
    <label className="text-[12px] text-[#000] font-medium">Market Cap </label>
    <div className="flex gap-2">
        <div className="min-w[48%] w-[48%]">
        <Input
            type="text"
            name="marketcap100"
            className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // onChange={handleChangeInput}
            placeholder=">100"
          />
        </div>

<div className="min-w[48%] w-[48%]">
<Input
            type="text"
            name="marketcap5000"
            className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // onChange={handleChangeInput}
            placeholder="<5000"
          />
</div>
        </div>

    <label className="text-[12px] text-[#000] font-medium">LTP </label>
    <Input
        type="text"
        name="ltp"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
        // onChange={handleChangeInput}
        placeholder=">10"
      />


<label className="text-[12px] text-[#000] font-medium">TTM (P/E) </label>
    <Input
        type="text"
        name="TTM"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
        // onChange={handleChangeInput}
        placeholder=">15"
      />


<label className="text-[12px] text-[#000] font-medium">ROCE </label>
    <Input
        type="text"
        name="rice"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
        // onChange={handleChangeInput}
        placeholder=">15"
      />


<label className="text-[12px] text-[#000] font-medium">TTM SALES ABS </label>
    <Input
        type="text"
        name="TTM Sale"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
        // onChange={handleChangeInput}
        placeholder=">15"
      />


<label className="text-[12px] text-[#000] font-medium">TTM PAT ABS </label>
    <Input
        type="text"
        name="TTM Pat Abs"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
        // onChange={handleChangeInput}
        placeholder=">50"
      />

  
     
 
    </AccordionBody>
  </Accordion> */}
          {/* End Card Form */}
        </div>
      </div>
      {/* End Filter SideBar */}
    </>
  );
};

export default FilterSidebarPriceAction;
