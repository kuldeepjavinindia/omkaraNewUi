import React from 'react'

import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,

} from "@material-tailwind/react";

const ResultBankVideoModal = ({open, setOpen}) => {



    const closeDrawer = () => setOpen(!open);

  return (
   <>
     <Drawer open={open} onClose={closeDrawer} className="p-4"  placement="right"  >
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
   
     
        
     <div className="flex">
      <div className=''>
      <Input
        type="text"
        placeholder="Enter Title"
        className="!border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",               
        }}

      />
      </div>
      <div className=''>
      <Button className='bg-theme text-[#fff] text-[13px] font-semibold  h-8 py-0 rounded whitespace-nowrap'>ADD NEW</Button>
      </div>
     </div>
  
     
      </Drawer>
   </>
  )
}

export default ResultBankVideoModal