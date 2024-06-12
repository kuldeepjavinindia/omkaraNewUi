import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import AllSector from "../../components/data2/FiiSector/AllSector";
import SingleSector from "../../components/data2/FiiSector/SingleSector";


const FiiSector = ()=> {

     const[activeButton, setActiveButton] =  useState(1)

   const PageButton = [
    {
        "id": 1,
        "name": "All SECTORS",
        "value": 1
    },
    {
        "id": 2,
        "name": "SINGLE SECTOR",
        "value": 2
    },
    {
        "id": 3,
        "name": "TOP/BOTTOM 5 SECTOR",
        "value": 3
    },
    
   ]


const handlebutton = (value)=> {
   setActiveButton(value)
}

    return (
        <>




    <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
        <div className="rounded-md bg-[#fff] p-4">
    <Typography className="text-[15px] text-[#000] font-semibold mb-3">FII Sector Flow</Typography>

    <div className="flex gap-2">
           {
               PageButton.map((item, index)=> (
                <Button key={item.id} onClick={()=> handlebutton(item.value)} 
                className= {`text-[14px] shadow-none rounded py-1 px-4 ${activeButton === item.value ? "bg-theme text-[#fff] border border-theme" : "bg-[#fff] text-[#606F7B] border border-[#CCCCCC]"}  `} 
                >
                {item.name}
                </Button>
             ))
           }
           </div>
           {/* End  */}

                {/* Start Report Upload Components */}
                { 
                  activeButton === 1 ? <AllSector/> :  activeButton === 2 ? <SingleSector/>:  activeButton === 3 ? "TOP/BOTTOM 5 SECTOR" : "Data Not found"
               }
           {/* End Report Upload Components */}

        </div>

    </div>




      
        </>
    )
}
export default FiiSector;
