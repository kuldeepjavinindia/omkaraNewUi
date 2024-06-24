
import { Select, Option , Input, Radio, Typography, Checkbox, Button} from '@material-tailwind/react'
import { useState } from 'react';
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";






const ReportOfReportTags = () => {


  return (
   <>
   
    <div className='pr-[20%] mt-5'>
    <label className="text-[13px] text-[#000] font-semibold">CREATE NEW TAG </label>
   <div className='flex gap-4'>
   <div className='basis-3/12'>
       <Select  className='border !border-gray-200 bg-[#E9EDEF] !h-8' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
    </div>

    <div className='basis-6/12'>
     <div className="flex gap-4">
      <div className='basis-9/12'>
      <Input
        type="text"
        placeholder="Enter Title"
        className="!border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",               
        }}

      />
      </div>
      <div className='basis-3/12'>
      <Button className='bg-[#23A356] text-[#fff] text-[13px] font-semibold  h-8 py-0 rounded'>CREATE</Button>
      </div>
     </div>
    </div>
   </div>
    </div>
   {/* End second box*/}
   <div className='pr-[20%] mt-5 border border-[#DAE9F7] p-5'>
      <div className='flex  self-end gap-5'>
      <div className=" basis-6/12 items-center flex gap-5">
        <div className='basis-2/12' ><Typography className='text-[13px] text-[#000] font-semibold'>ALL TAGS</Typography> </div>
        <div className='basis-10/12'>
        <Input
        type="text"
        placeholder="Enter Title"
        className="!border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",               
        }}
        icon={<CgSearch size={19} className="text-gray-400 top-[-2px] absolute" />}
      />
        </div>
      </div>
      <div className='basis-6/12  flex gap-5 mt-[-18px]'>
              {/* start Bottom Pagination Button */}
      <div className="mt-4">
      <div className="flex justify-end">
      <div className="flex-grow-0 flex justify-center mx-[14px] ">
    <Select className="smallInput bg-[#fff] mt-0 !h-8 rounded border border-[#C7C7C7] " value="Show 15"
     labelProps={{
      className: "hidden",
    }}
    >
      <Option>Option 1</Option>
    </Select>
  </div>

  <div className="flex-grow-1 ">
    <div className="flex gap-1">
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowBack size={16} />
    </Button>
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowBack size={16} />
      <IoIosArrowBack size={16} />
    </Button>
    <div className="w-[100px]">
      <Input
        type="text"
        defaultValue="1"
        size="md"
        className="smallInput two  !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100   !border !border-[#C7C7C7]"
        labelProps={{
          className: "hidden",
        }}
      />
    </div>
    <Button className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowForward />
    </Button>
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowForward />
      <IoIosArrowForward />
    </Button>
    </div>
    
  </div>
      </div>
  
    </div>
{/* End Bottom Pagination Button */}
      </div>
      </div>
    
    <div className='mt-4'>
    <table className='w-[60%] border-collapse'>
      <thead>
        <tr>
          <th className='text-[13px] text-[#000] font-semibold text-left px-2'>CATEGORY</th>
          <th className='text-[13px] text-[#000] font-semibold text-left px-2'>TITLE</th>
          <th className='text-[13px] text-[#000] font-semibold text-right px-2'>ACTION</th>
        </tr>
      </thead>
      <tbody className=''>
        <tr className='bg-[#F8F8F8] h-8 '>
          <td className='text-[13px] text-[#323232] font-semibold text-left px-2 border border-[#CACACA]'>Others</td>
          <td className='text-[13px] text-[#323232] font-semibold text-left px-2 border border-[#CACACA]'>Agri</td>
          <td className='text-right px-2 border border-[#CACACA]'>
            <div className="flex justify-end">
            <BiEdit fill='#2E7A80' size={20}/>
            <MdOutlineDelete fill='#DD2025' size={20} />
            </div>
          </td>
        </tr>
        <tr className='bg-[#F8F8F8] h-8 '>
          <td className='text-[13px] text-[#323232] font-semibold text-left px-2 border border-[#CACACA]'>Others</td>
          <td className='text-[13px] text-[#323232] font-semibold text-left px-2 border border-[#CACACA]'>Agri</td>
          <td className='text-right px-2 border border-[#CACACA]'>
            <div className="flex justify-end">
            <BiEdit fill='#2E7A80' size={20}/>
            <MdOutlineDelete fill='#DD2025' size={20} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    </div>

   </div>
   {/* End second box*/}
  

   </>
  )
}

export default ReportOfReportTags