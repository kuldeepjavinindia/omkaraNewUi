import { Typography, Button,  Accordion, AccordionHeader, AccordionBody,Input, Checkbox , Radio,  Select, Option   } from "@material-tailwind/react";
import { useState } from "react";




 
  

const FilterSidebarBulkBlock = ()=> {

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




return (
    
    <>
    <div className="filterSidebar w-full rounded py-2 px-2 bg-[#E9EDEF] col-span-3 overflow-y-scroll relative"
    
    style={{ height: `calc(100vh - 5rem)` }}
    >
    <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
                <Typography className="text-[15px] text-[#000] font-semibold">Filter price</Typography>
                <div>
                <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none">APPLY</Button>
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
       <label className="text-[12px] text-[#000] font-medium">Company (23) </label>
    <Select >
        <Option>Cyient LTD.</Option>
        <Option>3 M India  Ltd.</Option>
      </Select>
       </div>

      <span className="block h-[1px] w-full bg-[#B7B7B7] mt-2 relative my-3">
        <Typography className="text-[11px] text-[#000] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff]">OR</Typography>
      </span>



<div className= "mb-2">
      <label className="text-[12px] text-[#000] font-medium ">From </label>
        <Input
            type="date"
            name="formDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
            // onChange={handleChangeInput}
          />
</div>

     <div className="mb-2">
     <label className="text-[12px] text-[#000] font-medium">To </label>
        <Input
            type="date"
            name="tpDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
            // onChange={handleChangeInput}
          />
     </div>

<div className="mb-2">
<label className="text-[12px] text-[#000] font-medium ">Market Cap </label>
        <div className="flex gap-2">
        <Input
            type="text"
            name="marketcap100"
            className="smallInput  !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">1"
          />

 <Input
            type="text"
            name="marketcap5000"
            className=" smallInput !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder="<50000"
          />
        </div>
</div>


<div className="mb-2">
<label className="text-[12px] text-[#000] font-medium ">Net Value (in Cr.) </label>
        <div className="flex gap-2">
        <Input
            type="text"
            name="marketcap100"
            className="smallInput  !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">1"
          />

 <Input
            type="text"
            name="marketcap5000"
            className=" smallInput !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder="<50000"
          />
        </div>
</div>

       

    <div className="pb-2">
       <label className="text-[12px] text-[#000] font-medium">Exchange</label>
    <Select >
        <Option>BSE 1</Option>
        <Option>BSE 2</Option>
        <Option>BSE 3</Option>

      </Select>
       </div>

       <div className="">
       <label className="text-[12px] text-[#000] font-medium">Deal Type</label>
    <Select >
        <Option>Bulk 1</Option>
        <Option>Bulk 2</Option>
        <Option>Bulk 3</Option>
    
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