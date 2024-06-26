import { Typography, Button,  Accordion, AccordionHeader, AccordionBody,Input, Checkbox , Radio,  Select, Option   } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {Autocomplete,TextField,} from "@mui/material";
import Moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {selectCompany} from "../../../constants/helper";
import { allCompanyMasterAPI } from "../../../store/slice/MasterSlice";
import { BulkDeal_Req } from "../../../constants/defaultRequest";
import { BulkDealApi } from "../../../store/slice/Data2Slice";


const FilterSidebarBulkBlock = ()=> {

  const {
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
  } = useSelector((state) => state.Masters);



  const rr_dispatch = useDispatch()
  
  useEffect(() => {
    rr_dispatch(allCompanyMasterAPI());
  }, []);


  // console.log(allCompanyData);


  const[Inputs,setInputs] = useState({
    FromDate: Moment().format("MM/DD/YYYY"), 
    ToDate: Moment().format("MM/DD/YYYY"), 
  });
  const [CompanyMasterArr, setCompanyMasterArr] = useState([]);
  const [Company, setCompany] = useState([]);

 const [ActiveAccordion, setActiveAccordion] = useState({
    accordion_1: true,
});

const handleOpen = (value) => {
  let key = `accordion_${value}`;
  setActiveAccordion(prev => ({
      ...prev,
      [key]: !prev[key]
  }));
};


const exchangeArr = [
  {label: "NSE", value: "NSE"},
  {label: "BSE", value: "BSE"}
]


const dealTypeArr = [
  {label: "Bulk", value: "Bulk"},
  {label: "Block", value: "Block"}
]

const handleChangeInput = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  let prev = Inputs;
  prev = {
    ...prev,
    [name]: value
  }


  if (name === "FromDate" || name === "ToDate") {
    let fromDate = Moment(Inputs?.FromDate).format("MM/DD/YYYY");
    let toDate = Moment(Inputs?.ToDate).format("MM/DD/YYYY");

    if (fromDate != "" && toDate != "") {
      setInputs((prev) => ({
        ...prev,
        ["date"]: [fromDate, toDate],
      }));
    }
  }

  setInputs(prev)

}

const handleSelectChange = (name, value) => {
  setInputs({
    ...Inputs,
    [name]: value
  });
};


  // Log the inputValue whenever it updates
  useEffect(() => {
    console.log('inputValue updated:', Inputs);
  }, [Inputs]);



useEffect(() => {
  if (!allCompanyLoading) {
    selectCompany(allCompanyData, setCompanyMasterArr);
  }
}, [allCompanyLoading]);



useEffect(()=> {
rr_dispatch(BulkDealApi(BulkDeal_Req))
}, [])



const applyNow = ()=> {

 let param = BulkDeal_Req;



 // {
//   "Company": {
//       "title": "21st Century Management Services Ltd.",
//       "value": 126921
//   },
//   "FromDate": "2024-06-12",
//   "ToDate": "2024-06-05",
//   "marketcapTo": "dsaf",
//   "netValueFrom": "as",
//   "netValueTo": "sdaf",
//   "exchangevalue": "NSE",
//   "dealType": "Block"
// }

 param = {
    ...param,
      "date": [ Inputs?.FromDate || "", Inputs?.ToDate ],
      "mcap": [ Inputs?.marketcapFrom || "", Inputs?.marketcapTo ],
      "netvalue": [Inputs?.netValueFrom || "",  Inputs?.netValueTo || ""],
      "Exchange": Inputs?.exchangevalue || "",
      "DealType": Inputs?.dealType || "", 
      "CompanyName": Company || ""
 }
 
console.log(param);
  rr_dispatch(BulkDealApi(param))
}


return (
    
    <>
    <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
    <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
                <Typography className="text-[15px] text-[#000] font-semibold">Filter price</Typography>
                <div>
                <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none" 
                onClick={() => applyNow()}
                >APPLY</Button>
                <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">RESET </Button>
                </div>
            </div>
        <div className=""> 



   {/* Start Card Form */}
   <Accordion open={ActiveAccordion.accordion_1} className="mt-2 rounded bg-[#fff] px-2 py-3 mt-2" >
    <AccordionHeader onClick={() => handleOpen(1)} className="flex border-none py-0 pt-0">
    
    </AccordionHeader>
    <AccordionBody>
    
       <div className="pb-2">
       <label className="text-[12px] text-[#000] font-medium">Company ({CompanyMasterArr.length}) </label>
   
            <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={CompanyMasterArr}
                    values={Company}
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
                      // var val1 = [];
                      // for (var a = 0; a < newInputValue.length; a++) {
                      //   val1.push(newInputValue[a].value);
                      // }
                      setInputs({ ...Inputs, ["Company"]: newInputValue });
                      setCompany(newInputValue.value);
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

      <span className="block h-[1px] w-full bg-[#B7B7B7] mt-2 relative my-3">
        <Typography className="text-[11px] text-[#000] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff]">OR</Typography>
      </span>



    <div className= "mb-2">
      <label className="text-[12px] text-[#000] font-medium ">From </label>
        <Input
            type="date"
               name="FromDate"
                defaultValue={Moment().add("-1", "days").format("YYYY-MM-DD")}
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
            labelProps={{
              className: "hidden",
            }}
            
            onChange={handleChangeInput}
          />
</div>

     <div className="mb-2">
     <label className="text-[12px] text-[#000] font-medium">To </label>
        <Input
            type="date"
            name="ToDate"
                defaultValue={Moment().format("YYYY-MM-DD")}
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
            labelProps={{
              className: "hidden",
            }}
    sss        
            onChange={handleChangeInput}
          />
     </div>

<div className="mb-2">
<label className="text-[12px] text-[#000] font-medium ">Market Cap </label>
      
        <div className="flex gap-2">
        <div className="min-w[48%] w-[48%]">
        <Input
            type="text"
            name="marketcapFrom"
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
            name="marketcapTo"
            className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
            placeholder="<5000"
          />
</div>
        </div>
</div>


<div className="mb-2">
<label className="text-[12px] text-[#000] font-medium ">Net Value (in Cr.) </label>
<div className="flex gap-2">
        <div className="min-w[48%] w-[48%]">
        <Input
            type="text"
            name="netValueFrom"
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
            name="netValueTo"
            className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
            placeholder="<5000"
          />
</div>
        </div>
</div>

       

    <div className="pb-2">
       <label className="text-[12px] text-[#000] font-medium">Exchange</label>
    
      <Select
            className='border !border-gray-200 '
            // value={Inputs?.exchangevalue}
            onChange={(e) => handleSelectChange("exchangevalue", e)}
            labelProps={{
              className: "hidden",
            }}
          >
              {exchangeArr.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>



       </div>

       <div className="">
       <label className="text-[12px] text-[#000] font-medium">Deal Type</label>
       <Select
            className='border !border-gray-200'
            // value={inputValue.siteType}
            onChange={(e) => handleSelectChange("dealType", e)}
            labelProps={{
              className: "hidden",
            }}
          >
              {dealTypeArr.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
       </div>




    </AccordionBody>
  </Accordion>
  {/* End Card Form */}

  
        </div>
    </div>
    {/* End Filter SideBar */}
    </>
)
}


export default FilterSidebarBulkBlock