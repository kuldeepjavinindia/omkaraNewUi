import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ReportOfReportUpload from "../../components/data2/ReportUpload/ReportOfReportUpload";
import ReportOfReportNotes from "../../components/data2/ReportUpload/ReportOfReportNotes";
import ReportOfReportVideos from "../../components/data2/ReportUpload/ReportOfReportVideos";
import ReportOfReportTags from "../../components/data2/ReportUpload/ReportOfReportTags";


const ReportBankUpload = ()=> {

     const[activeButton, setActiveButton] =  useState(1)

   const PageButton = [
    {
        "id": 1,
        "name": "REPORT",
        "value": 1
    },
    {
        "id": 2,
        "name": "NOTES",
        "value": 2
    },
    {
        "id": 3,
        "name": "VIDEOS",
        "value": 3
    },
    {
        "id": 4,
        "name": "TAGS",
        "value": 4
    },
   ]


const handlebutton = (value)=> {
   setActiveButton(value)
}

    return (
        <>
        <div className="overflow-y-scroll w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]"
        style={{ height: `calc(100vh - 4.5rem)` }}
        >
            <div className="rounded-md bg-[#fff] p-4">
              <Typography className="text-[15px] text-[#000] font-semibold mb-3">Repository Upload</Typography>

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
            activeButton === 1 ? <ReportOfReportUpload/> :  activeButton === 2 ? <ReportOfReportNotes/> :  activeButton === 3 ? <ReportOfReportVideos/> :  activeButton === 4 ? <ReportOfReportTags/>  : "Data Not found"
           }
           {/* End Report Upload Components */}

            </div>
            {/* end white box */}
        </div>
        {/* end Main div */}
        </>
    )
}
export default ReportBankUpload;
