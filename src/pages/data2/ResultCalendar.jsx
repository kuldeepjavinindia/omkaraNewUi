
import { Typography, Button, Input, Select, Option, Checkbox , Switch,  Menu,MenuHandler, MenuList , MenuItem } from "@material-tailwind/react";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi"; 
import { FaPlus } from "react-icons/fa6";
import ResultModal from "../../components/CompanyDetail/ModalComment/ResultModal";


const ResultCalendar = () => {

  const [isToggled, setIsToggled] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [open, setOpen] = useState(false);


 const handleAccIn = ()=> {
  setAccordion(true)
 }


 const handleAccOut = ()=> {
  setAccordion(false)
 }

const handleOpen = ()=> {
 setOpen(!open)
}


  // const [inputs, setInputs] = useState({"FromDate":Moment().format('MM/DD/YYYY'), "ToDate":Moment().add(1, 'week').format('MM/DD/YYYY')});


  // const applyFilter = ()=> {
  //   const newFilterArray = [{ "UserId":UserId, "FromDate":Moment(inputs.FromDate).format('MM/DD/YYYY'), "ToDate":Moment(inputs.ToDate).format('MM/DD/YYYY'), "Sector":(inputs.Sectors || []),"Industry":(inputs.Industry || []), "Market_Cap": [(inputs.MarketCapFrom || ''), (inputs.MarketCapTo || '')], "Portfolio":inputs?.Portfolio }];
  // }




  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    // setInputs(values => ({ ...values, [name]: value }))
    // cols = inputs;
    // console.log('inputs >> '+JSON.stringify(inputs));
  }


  const handleChangeChecked = (event) => {
    let val = event.target.checked;
    let name = event.target.name;
   
  };


  const handleToggle = () => {
    setIsToggled(!isToggled);
  };



  return (
   <>
  <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
 <div className="py-7 px-4">
 {/* rounded-md bg-[#fff] py-7 px-7 */}


<div className="flex  flex-wrap justify-between">
   {/* Start Header Result Calender Left Side*/}
   <div className=" flex gap-2  items-center resultCalenderheader">
  <div>
  <label className="text-[12px] text-[#000] font-medium">Company Search </label>
  <Input
            type="text"
            placeholder="Search Company"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            // onChange={(e)=>filterData(e, 'search')}
            icon={
              <CgSearch
                size={19}
                className=" text-gray-400 top-[1px] absolute"
              />
            }
          />
  </div>

  <div>
  <label className="text-[12px]  text-[#000] font-medium">Sectors </label>
  <Select className="bg-[#fff] border-none " value="" 
    labelProps={{
      className: "hidden",
    }}
  >
        <Option>Option 1</Option>
      </Select>
  </div>

  <div>
  <label className="text-[12px] text-[#000] font-medium">From </label>
  <Input
            type="date"
            name="FromDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
          />
  </div>

  <div>
  <label className="text-[12px] text-[#000] font-medium">To </label>
  <Input
            type="date"
            name="ToDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
          />
  </div>

  <div className="smallInput">
  <label className="text-[12px] text-[#000] font-medium">Market Cap </label>
  <div className="flex gap-2 w-[50%]">
  
    <Input 
            type="text"
            name="MarketCapFrom"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
            placeholder=">1"
          />

    <Input
            type="text"
            name="MarketCapTo"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
            labelProps={{
              className: "hidden",
            }}
            onChange={handleChangeInput}
            placeholder="<100"
          />
    </div>

  </div>

 
  </div>
    {/* End Header Result Calender Left Side*/}

       {/* Start Header Result Calender Right Side*/}
    <div>
    <Typography className="text-[13px] text-[#000] font-medium">
    Data Updated 29-05-2024
    </Typography>

   <div className="flex gap-2 items-center ">

   <div> 
  <Checkbox label="Portfolio" onChange={handleChangeChecked}   />
  </div>

   <div >
      <label >
        <Switch
          color="blue"
          checked={isToggled}
          onChange={handleToggle}
        />
        <span className="ml-2">
          {/* {isToggled ? 'On' : 'Off'} */}
          </span>
      </label>
    </div>

   <div>
   <Button variant="text" className="mr-1 bg-theme text-[#fff] py-2 px-3 rounded text-[12px] " >SUBMIT  </Button>
   </div>

    <div>
    <Menu>
      <MenuHandler>
        <Button size="sm" className=" flex items-center gap-1 bg-[#D9DDF0] text-[#4448F5] text-[12px] shadow-none rounded leading-0">
        Export as
          <BiChevronDown  size={18}/> 
          </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  
  </div>


   </div>
    </div>
    {/*  End Header Result Calender Right Side*/}

    

</div>
{/* End Result Header  */}




{/*Start  Table  */}
<div className="mt-8">
 <table className=" w-full ">
 <thead >
 <tr className="!bg-[#22242F]">
    <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">31-May-2024 (Friday)</th>
    <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">03-Jun-2024 (Monday)</th>
    <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">04-Jun-2024 (Tuesday)</th>
  </tr>
 </thead>

 <tbody>
  <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
    <td className="cursor-pointer"  > 
      <div className="flex justify-between px-2" onMouseEnter={handleAccIn} onMouseOut={handleAccOut} 
      onClick={handleOpen}
      >
        <span>Bharat Dynamics Ltd. </span>

        <div className="flex gap-2 ">
         
    
       <span className= {`bg-theme text-[#fff] border border-theme w-5 h-5 text-[12px] flex  justify-center items-center rounded-full  ${accordion ? "visible" : "invisible "} `}><FaPlus /></span>

        <span className= {` w-5 h-5 text-[12px] flex  justify-center items-center rounded-full bg-[#E8E8F9] text-theme border border-theme`} >
        <Typography className="text-[12px]">A</Typography>
          </span>

        </div>

      </div>
    </td>

    <td className=""> 
      <div className="flex justify-between px-2" onMouseEnter={handleAccIn} onMouseOut={handleAccOut}>
        <span>Bharat Dynamics Ltd. </span>
     
      </div>
    </td>

    <td className=""> 
      <div className="flex justify-between px-2"  onMouseEnter={handleAccIn} onMouseOut={handleAccOut}>
        <span>Bharat Dynamics Ltd. </span>
        
      </div>
    </td>


  </tr>


 </tbody>

 </table>
</div>
{/*Start  Table  */}




<ResultModal open= {open} setOpen = {setOpen} />

 
  <div>
  </div>
  </div>



 </div>
 {/* End Card */}

   </>
  );
};

export default ResultCalendar;
