
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

const FilterQuarterlyResult = ()=> {

    // const [open, setOpen] = useState(1);

    const [ActiveAccordion, setActiveAccordion] = useState({
        accordion_1: true,
        accordion_2: true,
        accordion_3: false,
        accordion_4: false,
        accordion_5: false,
        accordion_6: false,
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
        { value: 'Option 1', label: 'Option 1' },
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
        <div className="filterSidebar w-full rounded py-2 px-2 bg-[#E9EDEF] col-span-3 overflow-y-scroll relative"
    
    style={{ height: `calc(100vh - 5rem)` }}
         
         >
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
                    <Typography className="text-[15px] text-[#000] font-semibold">Filter</Typography>
                    <div>
                    <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none">APPLY</Button>
                    <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">RESET </Button>
                    </div>
                </div>
            <div className=""> 

     {/* Start Card Form */}
      <Accordion open={ActiveAccordion.accordion_1}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={1} open={ActiveAccordion.accordion_1} />}>
        <AccordionHeader onClick={() => handleOpen(1)  } className="flex border-none py-0 pt-0">
        <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Data Range</Typography>
            <Typography className="text-[13px] text-[#FF2026] font-semibold">RESET</Typography>
        </AccordionHeader>
        <AccordionBody>
        <label className="text-[12px] text-[#000] font-medium">From </label>
         <Input
            type="date"
            name="FromDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
          />
         
         <label className="text-[12px] text-[#000] font-medium">To </label>
         <Input
            type="date"
            name="To"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
          />
        </AccordionBody>
      </Accordion>
      {/* End Card Form */}

       {/* Start Card Form */}
       <Accordion open={ActiveAccordion.accordion_2} className="mt-2 rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={2} open={ActiveAccordion.accordion_2} />}>
        <AccordionHeader onClick={() => handleOpen(2)} className="flex border-none py-0 pt-0">
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
         <Accordion open={ActiveAccordion.accordion_3}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={3} open={ActiveAccordion.accordion_3} />}>
        <AccordionHeader onClick={() => handleOpen(3)} className="flex border-none py-0 pt-0">
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


       {/* Start Card Form */}
       <Accordion open={ActiveAccordion.accordion_4}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={4} open={ActiveAccordion.accordion_4} />}>
        <AccordionHeader onClick={() => handleOpen(4)} className="flex border-none py-0 pt-0">
        <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Result Data</Typography>
        
        </AccordionHeader>
        <AccordionBody>
        <label className="text-[12px] text-[#000] font-medium">Market Cap </label>
       
        <label className="text-[12px] text-[#000] font-medium">SALES (YOY%) </label>
        <Input
            type="text"
            name="sale yoy"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />


<label className="text-[12px] text-[#000] font-medium">SALES (QOQ%) </label>
        <Input
            type="text"
            name="sale QOQ"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />


<label className="text-[12px] text-[#000] font-medium">GROSS PROFIT (YOY%) </label>
        <Input
            type="text"
            name="gross profit yoy"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />


<label className="text-[12px] text-[#000] font-medium">GROSS PROFIT (QOQ%) </label>
        <Input
            type="text"
            name="gross profit qoq"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />


<label className="text-[12px] text-[#000] font-medium">EBDITA (YOY%) </label>
        <Input
            type="text"
            name="ebdita yoy"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />


<label className="text-[12px] text-[#000] font-medium">EBDITA (QOQ%) </label>
        <Input
            type="text"
            name="ebdita QOQ"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />

<label className="text-[12px] text-[#000] font-medium">PAT (YOY%)</label>
        <Input
            type="text"
            name="pat yoy"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />


<label className="text-[12px] text-[#000] font-medium">PAT (QOQ%)</label>
        <Input
            type="text"
            name="pat QOQ"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
            placeholder=">10"
          />
      
      
         
     
        </AccordionBody>
      </Accordion>
      {/* End Card Form */}


         {/* Start Card Form */}
         <Accordion open={ActiveAccordion.accordion_5}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={5} open={ActiveAccordion.accordion_5} />}>
        <AccordionHeader onClick={() => handleOpen(5)} className="flex border-none py-0 pt-0">
        <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Turn Around</Typography>
        
        </AccordionHeader>
        <AccordionBody>
        <label className="text-[12px] text-[#000] font-medium">EBIDTA Margin (%) - To + </label>
        <Input
            type="text"
            name="ebidta margin"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
          />


<label className="text-[12px] text-[#000] font-medium">PAT-TO + </label>
        <Input
            type="text"
            name="sale QOQ"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            // onChange={handleChangeInput}
          />
 </AccordionBody>
      </Accordion>
      {/* End Card Form */}


         {/* Start Card Form */}
         <Accordion open={ActiveAccordion.accordion_6}  className="rounded bg-[#fff] px-2 py-3 mt-2" icon={<Icon id={6} open={ActiveAccordion.accordion_6} />}>
        <AccordionHeader onClick={() => handleOpen(6)} className="flex border-none py-0 pt-0">
        <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">Conditiions</Typography>
        
        </AccordionHeader>
        <AccordionBody>

<div className="flex flex-col ">

<Radio
        name="all"
        defaultChecked
        label={
          <div>
            <Typography color="" className="text-[13px]">
            All
            </Typography>
          </div>
        }
       
      />


<Radio
        name="sale 10% yoy & qoq"
        label={
          <div>
            <Typography color="" className="text-[13px]">
            Sales Up 10% (YoY & QoQ), Gross And EBIDTA Margins[YoY/QoQ] Improving.
            </Typography>
          </div>
        }
       
      />


<Radio
        name="sale 20% yoy & qoq"
        label={
          <div>
            <Typography color="" className="text-[13px]">
            Sales Up 20% (YoY & QoQ).
            </Typography>
          </div>
        }
       
      />


<Radio
        name="sale down 20% yoy & qoq"
        label={
          <div>
            <Typography color="" className="text-[13px]">
            Sales Down 10% (YoY & QoQ), Gross And EBIDTA Margins[YoY/QoQ] Declining.
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
    )
}
export default FilterQuarterlyResult;