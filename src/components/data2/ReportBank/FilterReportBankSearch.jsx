import { Typography, Button, Input } from "@material-tailwind/react";
import { BiChevronDown } from "react-icons/bi";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RR_BrokerMasterAPI, RR_BrokerageAPI, RR_CompanyReportAPI, RR_OtherReportsAPI, allCompanyMasterAPI, sectorMasterAPI } from "../../../store/slice/MasterSlice";
import { RepositoryListAPI } from "../../../store/slice/SingleCompnaySlice";
import { RepositoryListReq } from "../../../constants/defaultRequest";
import { GlobalContext } from "../../../context/GlobalContext";

const DateF = [
  {
    label: "1 Month",
    value: 1,
  },
  {
    label: "2 Months",
    value: 2,
  },
  {
    label: "3 Months",
    value: 3,
  },
  {
    label: "6 Months",
    value: 6,
  },
  {
    label: "12 Months",
    value: 12,
  },
  {
    label: "Custom",
    value: "custom",
  },
];


const RadioUISec = (props) => {
  const {
    checked,
    onClick,
    Inputs, // FOR VALUE,
    value, // 
    label //
  } = props

  return (
    <>


     <div  className="flex text-[13px] items-center mb-1">
        <Radio
          size="small"
          value={value}
          name="date_range"
          checked={checked}
          id={label}
          onClick={onClick}
          sx={{
            padding:"0",
            paddingRight:".25rem",
            "&.Mui-checked": {
              color: "var(--theme-color)",
            },
          }}
        />
        <label htmlFor={label} className=" cursor-pointer">{label}</label>
      </div>
    
    </>
  )
}





const sortSelectArr = (ArrayData) => {
  return ArrayData.sort(function(a, b){
    if ( a.title < b.title ){
      return -1;
    }
    if ( a.title > b.title ){
      return 1;
    }
    return 0;
  })
}


const FilterReportBankSearch = () => {

  const {
    // RepoListParams,
    setRepoListParams
  } = useContext(GlobalContext)
  const [Inputs, setInputs] = useState({
    dateRangeRadio: DateF[DateF.length - 1],
  });
  const [DateInput, setDateInput] = useState({});
  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr,] = useState([]);
  const [BrokerMasterArr, setBrokerMasterArr] = useState([]);


  

  const [Sectors, setSectors] = useState([]);
  const [BrokerMaster, setBrokerMaster] = useState([]);
  // const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);



  const selectDateRadio = (item) => {
    let month = item.value;
    let FromDate = moment().subtract(month, "M").format("YYYY-MM-DD");
    let ToDate = moment().format("YYYY-MM-DD");

    if (month !== "custom") {
      setDateInput(false);
    } else {
      FromDate = moment().subtract(1, "day").format("YYYY-MM-DD");
      setDateInput(true);
    }
    setInputs({ ...Inputs, formDate: FromDate, toDate: ToDate, dateRangeRadio: item });
  };
  const rr_dispatch = useDispatch();


const {
RR_CompanyReport:{
  // loading:RR_CompanyReportLoading,
  data:RR_CompanyReportData,
},
RR_OtherReports:{
  // loading:RR_OtherReportsLoading,
  data:RR_OtherReportsData,
},
RR_Brokerage:{
  loading:RR_BrokerageLoading,
  data:RR_BrokerageData,
},
RR_BrokerMaster:{
  loading:RR_BrokerMasterLoading,
  data:RR_BrokerMasterData,
},
sectorMaster:{
  loading: sectorMasterLoading,
  data: sectorMasterData,
},
allCompanyMaster:{
  loading: allCompanyLoading,
  data: allCompanyData,
},
} = useSelector(state=>state.Masters)


const selectSectors = () => {

  if (sectorMasterData.length > 0) {
    var data1 = [];
    sectorMasterData.map((item) => {
      var d1 = { title: item.Sector, value: item.sectorID };
      data1.push(d1);
    })
    setSectorMasterArr(data1);
  }
  
}
const selectBrokerMaster = () => {
  if (RR_BrokerMasterData.length > 0) {
    var data1 = [];

    RR_BrokerMasterData.map((item) => {
      var d1 = { title: item?.BrokerName, value: item?.ID };
      data1.push(d1);
    })
    setBrokerMasterArr(sortSelectArr(data1));
  }
}

const selectCompany = () => {
  if (allCompanyData.length > 0) {
    var data1 = [];
    allCompanyData.map((item) => {
      var d1 = { title: item.CompanyName, value: item.CompanyID };
      data1.push(d1);
    })
    data1.sort(function(a, b){
      if ( a.title < b.title ){
        return -1;
      }
      if ( a.title > b.title ){
        return 1;
      }
      return 0;
    })
    setCompanyMasterArr(data1);
  }
}




  useEffect(() => {
    rr_dispatch(RR_CompanyReportAPI());
    rr_dispatch(RR_OtherReportsAPI());
    rr_dispatch(RR_BrokerageAPI());
    rr_dispatch(RR_BrokerMasterAPI());
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
  }, [])

  useEffect(() => {
    if(!sectorMasterLoading){
      selectSectors()
    }
  }, [sectorMasterLoading])



  useEffect(() => {
    if(!allCompanyLoading){
      selectCompany()
    }
  }, [allCompanyLoading])

  useEffect(() => {
    if(!RR_BrokerMasterLoading){
      selectBrokerMaster()
    }
  }, [RR_BrokerMasterLoading])



  const [ReportType, setReportType] = useState({});
  const handleChangeReportType = (event, type, id) => {
    let d1 = {value:event.target.value, type, id}
    setReportType(d1);
  };



  const applyFun = () => {
    let params = RepositoryListReq;
    params = {
      ...params,
      Date: [Inputs.formDate, Inputs.toDate],
      sectorId: Inputs.sectorId,
      CompanyId: Inputs.CompanyId,
      BrokerId: Inputs.BrokerId,
      ReportType: [(ReportType?.type || ""), (ReportType?.id || "")],
      numPerPage: "100",
    };
    params = {
      ...params,
    };


    setRepoListParams(params)
    rr_dispatch(RepositoryListAPI(params));
  }


  
  const filterSelectCompany = (type = 'sector') => {

    let companyMasterFilter = [];
    if (type == 'sector') {
      let companyMasterFilter1= [];
      if(Sectors.length === 0){
        companyMasterFilter1 = allCompanyData
      }else{
        for (var i = 0; i < Sectors.length; i++) {
          companyMasterFilter1 = allCompanyData.filter(company => (Sectors[i].value == company.sectorID));
          Array.prototype.push.apply(companyMasterFilter, companyMasterFilter1);
        }
      }
    }
    
    var data1 = [];
    if (companyMasterFilter.length > 0) {
      companyMasterFilter.map((item) => {
        var d1 = { title: item.CompanyName, value: item.CompanyID };
        data1.push(d1);
      })
    }
    setCompanyMasterArr(data1);

  }



  const callApi = (duration, sector = "") => {
    let params = RepositoryListReq;
    duration = parseInt(duration);
    let FromDate = moment().subtract(duration, "d").format("YYYY-MM-DD");
    let ToDate = moment().format("YYYY-MM-DD");

    setInputs({ ...Inputs, formDate: FromDate, toDate: ToDate });
    params = {
      ...params,
      Date: [FromDate, ToDate],
      numPerPage: "100",
    };
    params = {
      ...params,
    };
    setRepoListParams(params);
    rr_dispatch(RepositoryListAPI(params));
  };



  useEffect(() => {
    if(!sectorMasterLoading){
      filterSelectCompany()
    }
  }, [Sectors]);

  useEffect(() => {
    callApi(1);
  }, []);


  
  
  

  return (
    <>
      <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
          <Typography className="text-[15px] text-[#000] font-semibold">
            Filter price
          </Typography>
          <div>
            <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none" onClick={()=>applyFun()}>
              APPLY
            </Button>
            <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">
              RESET{" "}
            </Button>
          </div>
        </div>
        <div className="">
          <Accordion className="my-2 shadow-none" defaultExpanded>
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

              <div className=" grid grid-cols-2">
                {DateF.map((item, i) => {
                  return (
                    <div key={i} className="flex text-[13px] items-center mb-1">
                      <Radio
                        size="small"
                        value={item.value}
                        id={`date_range${i}`}
                        name="date_range"
                        checked={Inputs?.dateRangeRadio.value == item.value}
                        onClick={() => selectDateRadio(item)}
                        sx={{
                          // color: pink[800],
                          padding:"0",
                          paddingRight:".25rem",
                          "&.Mui-checked": {
                            color: "var(--theme-color)",
                          },
                        }}
                      />
                      <label className="cursor-pointer" htmlFor={`date_range${i}`}>{item?.label}</label>
                    </div>
                  );
                })}
              </div>
                {/* {JSON.stringify(Inputs?.dateRangeRadio.value)} */}
                {
                  Inputs?.dateRangeRadio.value == "custom" && (
                    <>
                    
              <div className=" grid grid-cols-1">
                <label className="text-[12px] text-[#000] font-medium ">
                  From
                </label>
                <Input
                  type="date"
                  name="formDate"
                  value={Inputs.formDate}
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
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 !px-2 !h-8"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
                    </>
                  )
                }
                


            </AccordionDetails>
          </Accordion>
          <Accordion className="my-2  shadow-none">
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Report Type
            </AccordionSummary>
            <AccordionDetails>
              <div className=" grid grid-cols-2 gap-1">
                {RR_CompanyReportData.map((item, i) => {
                  let type = 'companyreport';

                  return (
                    <>
                       <RadioUISec checked={(type == ReportType.type && ReportType.id == item?.ID) ? true : false} onClick={(e)=>handleChangeReportType(e, type, item?.ID)} Inputs={Inputs} value={item?.ID} label={item?.CompanyReportName} />
                    </>
                  );
                })}
                {RR_OtherReportsData.map((item, i) => {
                  let type = 'othersReports';

                  return (
                    <>
                      <RadioUISec checked={(type == ReportType.type && ReportType.id == item?.ID) ? true : false} onClick={(e)=>handleChangeReportType(e, type, item?.ID)} Inputs={Inputs} value={item?.ID} label={item?.OthersReports} />
                    </>
                  );
                })}
                
                {RR_BrokerageData.map((item, i) => {
                  let type = 'brokerage';

                  return (
                    <>
                      <RadioUISec checked={(type == ReportType.type && ReportType.id == item?.ID) ? true : false} onClick={(e)=>handleChangeReportType(e, type, item?.ID)} Inputs={Inputs} value={item?.ID} label={item?.Brokerage} />
                    </>
                  );
                })}
                
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className="my-2  shadow-none">
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Classification
            </AccordionSummary>
            <AccordionDetails>
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
                  setInputs({ ...Inputs, ['sectorId']: val1 });
                  setSectors(newInputValue);
                }}

                renderOption={(props, option ) => (
                  <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                    {option.title}
                  </li>
                )}

                
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" placeholder="Select" size="small" className="" />}
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
                  setInputs({ ...Inputs, ['CompanyId']: val1 });
                  setCompany(newInputValue)
                  // console.log('Company >> ',company)
                }}

                renderInput={(params) => <TextField {...params} label="" placeholder={allCompanyLoading ? "Loading..." : "Select"} size="small" className="" />}
              />
              </div>
              <div className="grid grid-cols-1">

              <label className="text-[12px] text-[#000] font-medium ">
                Broker ({BrokerMasterArr.length})
              </label>
              <Autocomplete 
                disablePortal
                id="combo-box-demo"
                options={BrokerMasterArr}
                onChange={(event, newInputValue) => {
                  var val1 = [];
                  for (var a = 0; a < newInputValue.length; a++) {
                    val1.push(newInputValue[a].value);
                  }
                  setInputs({ ...Inputs, ['BrokerId']: val1 });
                  setBrokerMaster(newInputValue);
                }}
                values={BrokerMaster}
                multiple
                getOptionLabel={(option) => option.title}
                renderOption={(props, option ) => (
                  <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                    {option.title}
                  </li>
                )}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" placeholder="Select" size="small" className="" />}
              />
              </div>
            </AccordionDetails>
            {/* <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions> */}
          </Accordion>
        </div>
      </div>
      {/* End Filter SideBar */}
    </>
  );
};

export default FilterReportBankSearch;
