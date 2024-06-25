import React, { useEffect, useState } from "react";
import {Typography,Spinner } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import ValuationTableData from "./ValuationTableData";
import { useDispatch, useSelector } from "react-redux";

const ValuationTable = () => {


  // const rr_dispatch = useDispatch()
  const {
    Valuation:{
      loading: ValuationLoading,
      data: ValuationData,
    }
  } = useSelector(state=>state.Data2)

  const [TableHeader, setTableHeader] = useState([])
  const [TableRows, setTableRows] = useState([])
  const [FilterData, setFilterData] = useState(null)
  const [closeLable, setCloseLable] = useState(false);



  useEffect(() => {
    
    if(!ValuationLoading){

      let headers = ValuationData.Headers
      let bodyData = ValuationData.Data

      let a1 = 0;
      let mColArr = [];

      headers.map((resHeads)=>{

        let sticky = null;
        let isCheckbox = true;

        Object.keys(resHeads).forEach(key => {
            let label = resHeads[key].label;
            let show_status = resHeads[key].show_status;
            if(show_status){
                let width = 80;
                if(key == 'CompanyName' || key == 'Sector' || key == 'Industry'){
                    width = 200;
                }

                if(key != '$id'){
                    let mCol = {
                        label:(label || ""),
                        key: key,
                        sticky:sticky,
                        isCheckbox: isCheckbox,
                        isVisible: true,
                        accessor:key,
                        width:width,
                    }
                    mColArr.push(mCol);
                }
                console.log( ">>>>>>>>", mColArr);
            }
            a1++;
          })
    });
    let allRowsData = [];
    bodyData.map((resBody)=>{
        
        // allRowsData.push(singleRow);
        var singleRow = {};

        Object.keys(resBody).forEach(key => {
                singleRow[key] = resBody[key];
            })
            
        allRowsData.push(singleRow);
        
    });

    setTableHeader(mColArr)
    setTableRows(allRowsData);
    // const NEW_COLUMN = mColArr;

    }

  }, [ValuationLoading])


  console.log("table header", TableHeader);
  

 const requestSearch = (searchedVal) => {
    const filteredRows = TableRows.filter((row) => {
      
        return Object.keys(row).some((key) => {
          return String(row[key]).toLowerCase().includes(searchedVal.toLowerCase());
        });
    });
    
    if (searchedVal.length < 1) {
      setFilterData(TableRows)
    }
    else {
      setFilterData(filteredRows)
    }
  };







    

const handleLabelClose = ()=> {

}

    
  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Valuation
        </Typography>
        <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
          <SiMicrosoftexcel size={15} fill="#2E7A80" />
        </span>
      </div>

      <div className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded" style={{ height: `calc(100vh - 7.5rem)` }} >
      
      <div className="flex flex-col justify-between">
        {/* Start Selected label  */}
          {/* <div className="flex  ">
        <div className="bg-[#fff] p-3 relative">
        <span className="absolute top-[-6px] right-[-6px] cursor-pointer" 
        onClick={handleLabelClose}
        ><MdCancel fill="#4448f5" size={18} /> </span>
          <Typography className="text-[12px] text-[#000] font-semibold mb-1"> Market Cap (Cr.) </Typography>
           <div className="bg-[#e9edef] px-1 border border-theme rounded w-fit"> 
            <Typography className="text-[12px] text-[#000] font-semibold"> 63 </Typography> </div>
         </div>
          </div> */}
        {/* End Selected label  */}

         {/*============= Start Table =========== */}
         {
         ValuationLoading ? <Spinner /> :  (
           <div className=" data2Tabels relative overflow-x-auto">
          <ValuationTableData
            tableColumns={TableHeader}
            setTableColumns={setTableHeader}
            tableRows={TableRows}
            // tableRows={currentRows}
            FilterData={FilterData}
            setFilterData={setFilterData}
            // divRef={divRef}
           />
  </div>
        )
      }
{/*=============== End Table ================*/}


      </div>
     

       
      </div>
    </>
  );
};

export default ValuationTable;