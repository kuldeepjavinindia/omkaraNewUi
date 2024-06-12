import React, { useState } from 'react'

import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Select,
  Option

} from "@material-tailwind/react";
import { PiTagBold } from "react-icons/pi";
import ReactPlayer from "react-player";
import { CgSearch } from "react-icons/cg";


const ResultBankModal = ({open, setOpen}) => {

  const [addVideo, setAddVideo] = useState(false)

    const closeDrawer = () => setOpen(!open);

const handleAddVideo = ()=> {
       setAddVideo(true)
} 

const handleCancelVideo = ()=> {
  setAddVideo(false)
}


  return (
   <>
     <Drawer open={open} onClose={closeDrawer} className="py-10 px-9 overflow-scroll"  placement="right"  size={400}
    
     >
        <div className="mb-6 flex items-center justify-between">
          <Typography className='text-[21px] text-[#000] font-bold'> Trent Ltd.</Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
   
     
        
     <div className="flex gap-2">
      <div className='basis-10/12'>
      <Input
        type="text"
        placeholder="Search"
        className="!border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",               
        }}
        icon={<CgSearch size={19} className="text-gray-400 top-[-2px] absolute" />}
      />
      </div>
      <div className=''>
     
      <Button className='bg-theme text-[#fff] text-[13px] font-semibold  h-8 py-0 px-3 rounded whitespace-nowrap shadow-none' onClick={handleAddVideo} >ADD NEW</Button> 
      
      </div>
     </div>


     {
      !addVideo ? 
      (
        <>
          <div className="flex gap-2 mt-5">
       <Button className='whitespace-nowrap capitalize 	text-[#5D5F60] bg-[#E9EDEF] py-1 px-2 text-[13px] font-medium shadow-none rounded-full'>
        <div className="flex items-center gap-1">
        <span >Agri </span>
        <img src={ import.meta.env.VITE_BASE_URL + "/images/icons/tagIcon.svg"} alt="" className="w-3"/>
        {/* <PiTagBold />  */}
        </div>
        </Button>

        <Button className='whitespace-nowrap capitalize 	text-[#5D5F60] bg-[#E9EDEF] py-1 px-2 text-[13px] font-medium shadow-none rounded-full'>
        <div className="flex items-center gap-1">
        <span >Agri </span>
        <img src={ import.meta.env.VITE_BASE_URL + "/images/icons/tagIcon.svg"} alt="" className="w-3"/>
        {/* <PiTagBold />  */}
        </div>
        </Button>

       </div>

      <div className='mt-8 '>
      <div className='border border-[#DAE9F7]  p-3 rounded mb-8'>
      <div className=''>
         <ReactPlayer
            url= "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            // playing={playing}
            // setPlaying={setPlaying}
            controls = {true}
            width="300px"
            height= "200px"
           
          />
      </div>
       <div className="flex justify-between mt-2">
        <Typography className='text-[13px] text-[#232323]  font-medium cursor-pointer '> Final Overview</Typography>
        <Typography className='text-[13px] text-[#DD2025]  font-bold  cursor-pointer'> DELETE</Typography>
       </div>
    </div>
    {/* End item */}


    <div className='border border-[#DAE9F7]  p-3 rounded mb-8'>
      <div className=''>
         <ReactPlayer
            url= "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            // playing={playing}
            // setPlaying={setPlaying}
            controls = {true}
            width="300px"
            height= "200px"
           
          />
      </div>
       <div className="flex justify-between mt-2">
        <Typography className='text-[13px] text-[#232323]  font-medium cursor-pointer '> Final Overview</Typography>
        <Typography className='text-[13px] text-[#DD2025]  font-bold cursor-pointer'> DELETE</Typography>
       </div>
    </div>
    {/* End item */}
       
      </div>
        </>
      ) : (
        <>
          <div className="mt-6">
          <div className='mb-3'>
    <label className="text-[12px] text-[#000] font-medium">Site Type </label>
       <Select  className='border !border-gray-200 bg-[#E9EDEF]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Youtube</Option>
        <Option>Bank</Option>
      </Select>
    </div>
    <div className='mb-3'>
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
    <div className='mb-3'>
    <label className="text-[12px] text-[#000] font-medium">Video  Type </label>
       <Select  className='border !border-gray-200 bg-[#E9EDEF]' 
       
       labelProps={{
              className: "hidden",
            }}>
        <Option>Youtube</Option>
        <Option>Bank</Option>
      </Select>
    </div>
    <div className='mb-3'>
    <label className="text-[12px] text-[#000] font-medium">Youtube Link</label>
   <Input
        type="text"
        placeholder="Enter Link"
        className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}

      />
    </div>
        <div className='mt-5'>
              <Button className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"> SUBMIT </Button>
                  <Button className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md" onClick={handleCancelVideo} >
                  CANCEL AND GO BACK </Button>
           </div>
          </div>
        </>
      )
     }
      
      
     


      
  
     
      </Drawer>
   </>
  )
}

export default ResultBankModal