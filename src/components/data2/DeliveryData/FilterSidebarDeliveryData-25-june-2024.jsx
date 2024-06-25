import { Typography, Button,  Accordion, AccordionHeader, AccordionBody,Input, Checkbox , Radio   } from "@material-tailwind/react";
import { useState } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';



function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-4 w-4 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

 
  const animatedComponents = makeAnimated();


const FilterSidebarDeliveryData = ()=> {
 // const [open, setOpen] = useState(1);

 const [ActiveAccordion, setActiveAccordion] = useState({
    accordion_1: true,
    accordion_2: false,
    accordion_3: false,
    accordion_4: false,
});


const [selectedOptions, setSelectedOptions] = useState([]);
const [selectedIndustry, setSelectedIndustry] = useState([]);
const [selectedIndustryTwo, setSelectedIndustryTwo] = useState([]);

const handleOpen = (value) => {
  let key = `accordion_${value}`;
  setActiveAccordion(prev => ({
      ...prev,
      [key]: !prev[key]
  }));
};

const handleReset = (value)=> {
  let key = `accordion_${value}`;
  setActiveAccordion(prev => ({
      ...prev,
      [key]: false
  }));
}


console.log('prev >>> ', ActiveAccordion);

const options = [
    { value: 'Option 1', label: 'Option 2' },
    { value: 'Option 2', label: 'Option 2' },
  ];


  const IndustryOptionsTwo = [
    { value: 'Option 11', label: 'Option 11' },
    { value: 'Option 22', label: 'Option 22' },
  ];

  const IndustryOptions = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
  ];

  const handleChange = (selected) => {
  console.log(selected, ">>>>>>>>>>");

    setSelectedOptions(selected);

    
    
  };
  
  const handleChangeTwo = (selected)=> {
    setSelectedIndustryTwo(selected)
    
  }

  
  const handleChangeThree = (selected)=> {
    setSelectedIndustry(selected)
  
    
  }

  const handleChangeChecked = (event) => {
    let val = event.target.checked;
    let name = event.target.name;
   
  };


return (
    
    <>
    <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
    <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
                <Typography className="text-[15px] text-[#000] font-semibold">Filter price</Typography>
                <div>
                <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none">APPLY</Button>
                <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">RESET </Button>
                </div>
            </div>
        <div className=""> 

   {/* Start Card Form */}
   <Accordion open={ActiveAccordion.accordion_1} className="mt-2 rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={1} open={ActiveAccordion.accordion_1} />}>
    <AccordionHeader onClick={() => handleOpen(1)} className="flex border-none py-0 pt-0">
    <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Classification</Typography>
        <Typography className="text-[13px] text-[#FF2026] font-semibold bg-[#fff] " onClick={()=> handleReset(1)}>RESET</Typography>
    </AccordionHeader>
    <AccordionBody>
    <div className="flex justify-between">


    <label className="text-[12px] text-[#000] font-medium">Sectors (58)  </label>
    <Typography className="text-[#7B70FF] text-[12px] font-semibold cursor-pointer">Refresh</Typography>
    </div>
    <Select
      components={animatedComponents}
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      placeholder="Select Names"
      className="react-select-container"
      classNamePrefix="react-select"
    />
     
<label className="text-[12px] text-[#000] font-medium">Industry (23) </label>
    <Select
      components={animatedComponents}
      isMulti
      options={IndustryOptionsTwo}
      value={selectedIndustryTwo}
      onChange={handleChangeTwo}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      placeholder="Select Names"
      className="react-select-container"
      classNamePrefix="react-select"
    />

<label className="text-[12px] text-[#000] font-medium">Industry (23 222) </label>
    <Select
      components={animatedComponents}
      isMulti
      options={IndustryOptions}
      value={selectedIndustry}
      onChange={handleChangeThree}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      placeholder="Select Names"
      className="react-select-container"
      classNamePrefix="react-select"
    />


  <div className="ml-[-11px]">
        <Radio name="type" label="Portfolio"  className="w-[18px] h-[18px] custom-radio left-custome checked:border-[#4448F5]" />
        <Radio name="type" label="F&O"  className=" custom-radio  checked:border-[#4448F5]" defaultChecked />

  </div>
    
    

    </AccordionBody>
  </Accordion>
  {/* End Card Form */}

     {/* Start Card Form */}
     <Accordion open={ActiveAccordion.accordion_2}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={2} open={ActiveAccordion.accordion_2} />}>
    <AccordionHeader onClick={() => handleOpen(2)} className="flex border-none py-0 pt-0 ">
    <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Daily Moving Average</Typography>
    
    </AccordionHeader>
    <AccordionBody> 
      <div className="ml-[0]">
      <Checkbox label="50 DMA"  
      className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
      />
      <Checkbox label="200 DMA"  className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"/>
      </div>
       
 
    </AccordionBody>  
  </Accordion>
  {/* End Card Form */}


    {/* Start Card Form */}
    <Accordion open={ActiveAccordion.accordion_3}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={3} open={ActiveAccordion.accordion_3} />}>
    <AccordionHeader onClick={() => handleOpen(3)} className="flex border-none py-0 pt-0">
    <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Time Interval</Typography>
    </AccordionHeader>
    <AccordionBody>

    <div className="flex ml-[-11px]">
  <div className="flex flex-col gap-2">
    <Radio name="type" label="Weekly"      className=" custom-radio  checked:border-[#4448F5]"/>
    <Radio name="type" label="Monthly"   className=" custom-radio  checked:border-[#4448F5]"/>
    <Radio name="type" label="Half Yearly"   className=" custom-radio  checked:border-[#4448F5]"/>
  </div>

  <div className="flex flex-col gap-2">
    <Radio name="type" label="15 Days"   className=" custom-radio  checked:border-[#4448F5]" />
    <Radio name="type" label="Quarterly"  className=" custom-radio  checked:border-[#4448F5]" />
    <Radio name="type" label="Yearly"   className=" custom-radio  checked:border-[#4448F5]"/>
  </div>
</div>


    </AccordionBody>  
  </Accordion>
  {/* End Card Form */}


 {/* Start Card Form */}
 <Accordion open={ActiveAccordion.accordion_4}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={4} open={ActiveAccordion.accordion_3} />}>
        <AccordionHeader onClick={() => handleOpen(4)} className="flex border-none py-0 pt-0">
        <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Deliverable Volume</Typography>
        
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

        <label className="text-[12px] text-[#000] font-medium">LTP vs 200DMA (%) </label>
        <Input
            type="text"
            name="ltp"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // onChange={handleChangeInput}
            placeholder="2"
          />


<label className="text-[12px] text-[#000] font-medium">Yesterday Deliverable Volume ('000)
 </label>
        <Input
            type="text"
            name="TTM"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // onChange={handleChangeInput}
            placeholder=">100"
          />


<label className="text-[12px] text-[#000] font-medium">Deliverable Times (x)
 </label>
        <Input
            type="text"
            name="rice"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // onChange={handleChangeInput}
            placeholder=">0.5"
          />


<label className="text-[12px] text-[#000] font-medium">Deliverable Value(Cr.)
 </label>
        <Input
            type="text"
            name="TTM Sale"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // onChange={handleChangeInput}
            placeholder=">100"
          />

        </AccordionBody>
      </Accordion>
      {/* End Card Form */} 
  


        </div>
    </div>
    {/* End Filter SideBar */}
    </>
)
}


export default FilterSidebarDeliveryData