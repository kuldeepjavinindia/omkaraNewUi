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
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RR_BrokerageAPI, RR_CompanyReportAPI, RR_OtherReportsAPI, allCompanyMasterAPI, sectorMasterAPI } from "../../../store/slice/MasterSlice";

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
          checked={Inputs?.reportType?.value == value}
          onClick={onClick}
          sx={{
            // color: pink[800],
            padding:"0",
            paddingRight:".25rem",
            "&.Mui-checked": {
              color: "var(--theme-color)",
            },
          }}
        />
        <div>{label}</div>
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
  const [Inputs, setInputs] = useState({
    dateRangeRadio: DateF[DateF.length - 1],
  });
  const [DateInput, setDateInput] = useState({});
  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr,] = useState([]);
  const [BrokerMasterArr, setBrokerMasterArr] = useState([]);


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
  loading:RR_CompanyReportLoading,
  data:RR_CompanyReportData,
},
RR_OtherReports:{
  loading:RR_OtherReportsLoading,
  data:RR_OtherReportsData,
},
RR_Brokerage:{
  loading:RR_BrokerageLoading,
  data:RR_BrokerageData,
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
  if (RR_BrokerageData.length > 0) {
    var data1 = [];

    RR_BrokerageData.map((item) => {
      var d1 = { title: item?.Brokerage, value: item?.ID };
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
    let a0 = data1.sort(function(a, b){
      if ( a.title < b.title ){
        return -1;
      }
      if ( a.title > b.title ){
        return 1;
      }
      return 0;
    })
    // console.log(a0);
    setCompanyMasterArr(data1);
  }
}




  useEffect(() => {
    rr_dispatch(RR_CompanyReportAPI());
    rr_dispatch(RR_OtherReportsAPI());
    rr_dispatch(RR_BrokerageAPI());
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
  }, [])

  useEffect(() => {
    if(!sectorMasterLoading){
      selectSectors()
    }
  }, [sectorMasterLoading])

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
    if(!RR_BrokerageLoading){
      console.log('BrokerMasterArr >>> ', BrokerMasterArr)
      selectBrokerMaster()
    }
  }, [RR_BrokerageLoading])

  // useEffect(() => {
  //     console.log('SectorMasterArr >>> ', SectorMasterArr)
  // }, [SectorMasterArr])
  
  

  return (
    <>
      <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
          <Typography className="text-[15px] text-[#000] font-semibold">
            Filter price
          </Typography>
          <div>
            <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none">
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
              {/* 
        <FormControl>
            <FormLabel id="demo-form-control-label-placement">Date Range</FormLabel>
            <RadioGroup
              className='date-range'
              row
              onChange={(e)=>selectDateRadio(e)}
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="custom"
            >
            </RadioGroup>
          </FormControl> */}

              <div className=" grid grid-cols-2">
                {DateF.map((item, i) => {
                  return (
                    <div key={i} className="flex text-[13px] items-center mb-1">
                      <Radio
                        size="small"
                        value={item.value}
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
                      <div>{item?.label}</div>
                    </div>
                  );
                })}
              </div>

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
                  return (
                    <>
                       <RadioUISec onClick={()=>{

}} Inputs={Inputs} value={item?.ID} label={item?.CompanyReportName}/>
                    {/* // <div key={i} className="flex text-[13px] items-center mb-1">
                    //   <Radio
                    //     size="small"
                    //     value={item?.value}
                    //     name="date_range"
                    //     checked={Inputs?.reportType?.value == item?.value}
                    //     // onClick={() => selectDateRadio(item)}
                    //     sx={{
                    //       // color: pink[800],
                    //       padding:"0",
                    //       paddingRight:".25rem",
                    //       "&.Mui-checked": {
                    //         color: "var(--theme-color)",
                    //       },
                    //     }}
                    //   />
                    //   <div>{item?.CompanyReportName}</div>
                    // </div> */}
                    </>
                  );
                })}
                {RR_OtherReportsData.map((item, i) => {
                  return (
                    <>
                    
                    <RadioUISec onClick={()=>{

}} Inputs={Inputs} value={item?.ID} label={item?.OthersReports}/>
                    {/* <div key={i} className="flex text-[13px] items-center mb-1">
                      <Radio
                        size="small"
                        value={item?.ID}
                        name="date_range"
                        checked={Inputs?.reportType?.ID == item?.ID}
                        // onClick={() => selectDateRadio(item)}
                        sx={{
                          // color: pink[800],
                          padding:"0",
                          paddingRight:".25rem",
                          "&.Mui-checked": {
                            color: "var(--theme-color)",
                          },
                        }}
                      />
                      <div>{item?.OthersReports}</div>
                    </div> */}
                    </>
                  );
                })}
                
                {RR_BrokerageData.map((item, i) => {
                  return (
                    <>

                      <RadioUISec onClick={()=>{

                      }} Inputs={Inputs} value={item?.ID} label={item?.Brokerage}/>
                      
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
                multiple
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
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
                multiple
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    {option.title}
                  </li>
                )}
                // sx={{ width: 300 }}
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
                multiple
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
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
