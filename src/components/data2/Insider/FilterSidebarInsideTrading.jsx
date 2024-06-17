import {
  Typography,
  Button,
  Input,
  Checkbox,
  Radio,
} from "@material-tailwind/react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { allCompanyMasterAPI, industryMasterAPI, sectorMasterAPI } from "../../../store/slice/MasterSlice";
import { industryMasterFun, selectCompany, selectSectors } from "../../../constants/helper";
import { Insider_Req } from "../../../constants/defaultRequest";
import { InsiderApi } from "../../../store/slice/Data2Slice";

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


const FilterSidebarInsideTrading = () => {
  const rr_dispatch = useDispatch()
  

const {
  sectorMaster:{
    loading: sectorMasterLoading,
    data: sectorMasterData,
  },
  industryMaster:{
    loading: industryMasterLoading,
    data: industryMasterData,
  },
  allCompanyMaster:{
    loading: allCompanyLoading,
    data: allCompanyData,
  },
  } = useSelector(state=>state.Masters)


  const [Inputs, setInputs] = useState({});
  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [IndustryMasterArr, setIndustryMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr,] = useState([]);

  

  const [Sectors, setSectors] = useState([]);
  const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);



  const applyFun = () => {
    
    let params = Insider_Req;
    params = {
      ...params,
      "date":[Inputs.formDate,Inputs.toDate],
      "mcap":[Inputs.mCapFrom,Inputs.mCapTo],
      // "watchlistid":"0",
      "netvalue":[Inputs.nValueFrom,Inputs.nValueTo],
      "Sector":Inputs.Sector,
      "Industry":Inputs.Industry,
      "CompanyName":Inputs.CompanyName,
      "portfolio":false
    }
    rr_dispatch(InsiderApi(params))

  };


  const handleChangeInput = (e) => {
      // console.log('object')
      let name = e.target.name;
      let value = e.target.value;
      let prev = Inputs;
      prev = {
        ...prev,
        [name]: value
      }
      setInputs(prev)

  }


  


  useEffect(() => {
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(industryMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
  }, [])

  useEffect(() => {
    if(!sectorMasterLoading){
      selectSectors(sectorMasterData, setSectorMasterArr)
    }
  }, [sectorMasterLoading])

  useEffect(() => {
    if(!industryMasterLoading){
      industryMasterFun(industryMasterData, setIndustryMasterArr)
    }
  }, [industryMasterLoading])

  useEffect(() => {
    if(!allCompanyLoading){
      selectCompany(allCompanyData, setCompanyMasterArr)
    }
  }, [allCompanyLoading])

  





  return (
    <>
      <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
          <Typography className="text-[15px] text-[#000] font-semibold">
            Filter price
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
              Data Range
            </AccordionSummary>
            <AccordionDetails>
              <div className=" grid grid-cols-1">
                <label className="text-[12px] text-[#000] font-medium ">
                  From
                </label>
                <Input
                  type="date"
                  name="formDate"
                  value={Inputs.formDate}
                  onChange={(e)=>handleChangeInput(e)}
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 !px-2 !h-8"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div className=" grid grid-cols-1">
                <label className="text-[12px] text-[#000] font-medium ">
                  To
                </label>
                <Input
                  type="date"
                  name="toDate"
                  value={Inputs.toDate}
                  onChange={(e)=>handleChangeInput(e)}
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 !px-2 !h-8"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="text-[12px] text-[#000] font-medium ">
                  Market Cap{" "}
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="mCapFrom"
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
                      name="mCapTo"
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

              <div className="mb-2">
                <label className="text-[12px] text-[#000] font-medium ">
                  Net Value (in Cr.){" "}
                </label>
                <div className="flex gap-2">
                  <div className="min-w[48%] w-[48%]">
                    <Input
                      type="text"
                      name="nValueFrom"
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
                      name="nValueTo"
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
                    setInputs({ ...Inputs, ['Sector']: val1 });
                    setSectors(newInputValue);
                  }}
  
                  renderOption={(props, option ) => (
                    <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Select" size="small" className="" />}
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
                  renderOption={(props, option ) => (
                    <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                      {option.title}
                    </li>
                  )}
  
                  onChange={(event, newInputValue) => {
                    var val1 = [];
                    for (var a = 0; a < newInputValue.length; a++) {
                      val1.push(newInputValue[a].value);
                    }
                    setInputs({ ...Inputs, ['Industry']: val1 });
                    setIndustry(newInputValue)
                    // console.log('Company >> ',company)
                  }}
  
                  renderInput={(params) => <TextField {...params} label="" placeholder={allCompanyLoading ? "Loading..." : "Select"} size="small" className="" />}
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
                  renderOption={(props, option ) => (
                    <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                      {option.title}
                    </li>
                  )}
                  onChange={(event, newInputValue) => {
                    var val1 = [];
                    for (var a = 0; a < newInputValue.length; a++) {
                      val1.push(newInputValue[a].value);
                    }
                    setInputs({ ...Inputs, ['CompanyName']: val1 });
                    setCompany(newInputValue)
                    // console.log('Company >> ',company)
                  }}
  
                  renderInput={(params) => <TextField {...params} label="" placeholder={allCompanyLoading ? "Loading..." : "Select"} size="small" className="" />}
                />
                </div>
                  
                  <div className=" flex items-center">
                    <Checkbox
                      checked={Inputs.portfolio}
                      onChange={(e)=>{
                        setInputs({...Inputs, portfolio: e.target.checked})
                      }}
                      id="portfolio"
                      sx={{ 
                        padding:"0",
                        // paddingRight:".05rem",
                        "&.Mui-checked": {
                          color: "var(--theme-color)",
                        },
                       }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <label htmlFor="portfolio" className=" cursor-pointer">Portfolio</label>
                  </div>
              </div>


            </AccordionDetails>
          </Accordion>


        </div>
      </div>
      {/* End Filter SideBar */}
    </>
  );
};

export default FilterSidebarInsideTrading;
