import React, { useContext, useState } from 'react'

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
import { GlobalContext } from '../../../context/GlobalContext';


const ResultBankModal = (props) => {

  
  const {
    ReportBankDrawer,
    setReportBankDrawer
  } = useContext(GlobalContext)


  const closeDrawer = () => setReportBankDrawer(null);



  return (
   <>
     <Drawer open={ReportBankDrawer?.type} onClose={closeDrawer} className="py-10 px-9 overflow-scroll"  placement="right"  size={400}
    
     >
        
{
  props?.children
}
      
  
     
      </Drawer>
   </>
  )
}

export default ResultBankModal