
import { Select, Option , Input, Radio, Typography, Checkbox, Button} from '@material-tailwind/react'
import { useState } from 'react';




const ReportOfReportVideos = () => {


  return (
   <>
   <div className="flex gap-4 mt-5 pr-[20%]">
   <div className="basis-6/12">
       <label className="text-[12px] text-[#000] font-medium">Company (58) </label>
       <Select  className='border border-[#C7C7C7]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
       </div>
   </div>
   {/* End first box*/}
   <div className='flex gap-4 pr-[20%] mt-5'>
    <div className='basis-6/12'>
    <label className="text-[12px] text-[#000] font-medium">Site Type </label>
       <Select  className='border !border-gray-200 bg-[#E9EDEF]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Youtube</Option>
        <Option>Bank</Option>
      </Select>
    </div>

    <div className='basis-6/12'>
    <label className="text-[12px] text-[#000] font-medium">Video  Type </label>
       <Select  className='border !border-gray-200 bg-[#E9EDEF]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
    </div>
   </div>
   {/* End second box*/}

   <div className='flex gap-4 pr-[20%] mt-5'>
    <div className='basis-6/12'>
    <label className="text-[12px] text-[#000] font-medium">Title</label>
   <Input
        type="text"
        placeholder="Enter Title"
        className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}

      />
    </div>

    <div className='basis-6/12'>
    <label className="text-[12px] text-[#000] font-medium">Youtube Link </label>
       <Select  className='border !border-gray-200 bg-[#E9EDEF]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
    </div>
   </div>
   {/* End second box*/}



   <div className='mt-5'>
           <Button className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"> SUBMIT </Button>
                  <Button className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md">
                  RESET </Button>
    </div>
   {/* End Button  box*/}
    
   </>
  )
}

export default ReportOfReportVideos