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


const FilterSidebarPriceAction = ()=> {
 // const [open, setOpen] = useState(1);

 const [ActiveAccordion, setActiveAccordion] = useState({
    accordion_1: true,
    accordion_2: true,
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


console.log('prev >>> ', ActiveAccordion);

const options = [
    { value: 'Oliver Hansen', label: 'Oliver Hansen' },
    { value: 'Van Henry', label: 'Van Henry' },
    { value: 'April Tucker', label: 'April Tucker' },
    { value: 'Ralph Hubbard', label: 'Ralph Hubbard' },
    { value: 'Omar Alexander', label: 'Omar Alexander' },
    { value: 'Carlos Abbott', label: 'Carlos Abbott' },
    { value: 'Miriam Wagner', label: 'Miriam Wagner' },
    { value: 'Bradley Wilkerson', label: 'Bradley Wilkerson' },
    { value: 'Virginia Andrews', label: 'Virginia Andrews' },
    { value: 'Kelly Snyder', label: 'Kelly Snyder' },
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
    <div className="filterSidebar w-full rounded py-2 px-2 bg-[#E9EDEF] col-span-3 overflow-y-scroll relative"
    
    style={{ height: `calc(100vh - 5rem)` }}>
    <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
                <Typography className="text-[15px] text-[#000] font-semibold">Filter price</Typography>
                <div>
                <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none">APPLY</Button>
                <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">RESET </Button>
                </div>
            </div>
        <div className=""> 



   {/* Start Card Form */}
   <Accordion open={ActiveAccordion.accordion_1} className="mt-2 rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={2} open={ActiveAccordion.accordion_1} />}>
    <AccordionHeader onClick={() => handleOpen(1)} className="flex border-none py-0 pt-0">
    <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Classification</Typography>
        <Typography className="text-[13px] text-[#FF2026] font-semibold">RESET</Typography>
    </AccordionHeader>
    <AccordionBody>
    <div className="flex justify-between">


    <label className="text-[12px] text-[#000] font-medium">Sectors (58)  </label>
    <Typography className="text-[#7B70FF] text-[12px] font-semibold">Refresh</Typography>
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

<Checkbox label="Portfolio" onChange={handleChangeChecked}  />

    </AccordionBody>
  </Accordion>
  {/* End Card Form */}


     {/* Start Card Form */}
     <Accordion open={ActiveAccordion.accordion_2}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={3} open={ActiveAccordion.accordion_2} />}>
    <AccordionHeader onClick={() => handleOpen(2)} className="flex border-none py-0 pt-0">
    <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Share Price (TTM)</Typography>
    
    </AccordionHeader>
    <AccordionBody>
    <label className="text-[12px] text-[#000] font-medium">Market Cap </label>
    <div className="flex gap-2">
    <Input
        type="text"
        name="marketcap100"
        className="smallInput  !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder=">100"
      />

<Input
        type="text"
        name="marketcap5000"
        className=" smallInput !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder="<5000"
      />
    </div>

    <label className="text-[12px] text-[#000] font-medium">LTP </label>
    <Input
        type="text"
        name="ltp"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder=">10"
      />


<label className="text-[12px] text-[#000] font-medium">TTM (P/E) </label>
    <Input
        type="text"
        name="TTM"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder=">15"
      />


<label className="text-[12px] text-[#000] font-medium">ROCE </label>
    <Input
        type="text"
        name="rice"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder=">15"
      />


<label className="text-[12px] text-[#000] font-medium">TTM SALES ABS </label>
    <Input
        type="text"
        name="TTM Sale"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder=">15"
      />


<label className="text-[12px] text-[#000] font-medium">TTM PAT ABS </label>
    <Input
        type="text"
        name="TTM Pat Abs"
        className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        // onChange={handleChangeInput}
        placeholder=">50"
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


export default FilterSidebarPriceAction