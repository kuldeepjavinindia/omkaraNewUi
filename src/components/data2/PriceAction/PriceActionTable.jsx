import {
  Typography,
  Input,
  Select,
  Option,
  Button,
  Spinner
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { priceAction_Req } from "../../../constants/defaultRequest";
import { PriceActionApi } from "../../../store/slice/Data2Slice";
import PriceTableComponent from "./PriceTableComponent";

const PriceActionTable = () => {
  

  const [ShowCheckboxButton, setShowCheckboxButton] = useState(false);
  const [FilterData, setFilterData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null);
  const [tableBodyData, setTableBodyData] = useState(null);
  const [StickyColumns, setStickyColumns] = useState(0);
  const [ShowColumns, setShowColumns] = useState(null);
  const [ShowAllButton, setShowAllButton] = useState(false);




    const {
      PriceAction:{
        loading: PAloading,
        data: PAData,
      }
    } = useSelector(state=>state.Data2)
    const rr_dispatch = useDispatch()

  useEffect(() => {
    let params = priceAction_Req
    rr_dispatch(PriceActionApi(params))
  }, [])
  
  useEffect(() => {
      // if(!PAloading){
        // console.log(' ??? ' , PAData)


        if (!PAloading) {
          let a1 = 0;
          const tableHead = PAData?.header;
          let mColArr = [];
          tableHead.map((resHeads) => {
    
            let hideCheck = false;
            if (a1 !== 1) {
                hideCheck = true;
            }
            let stickyLeft = 0;
    
            let stuff = {};
            Object.keys(resHeads).forEach((key, i0) => {
    
              let label = resHeads[key];
              // let show_status = resHeads[key];
              if (label != null) {
                let width = 120;
                let sticky = false;
                if (key == 'Company_Name' || key == 'Sector' || key == 'Industry') {
                  width = 150;
                  sticky = true;
                  setStickyColumns(a1);
                  hideCheck = false;
                } else {
                  hideCheck = true;
                }
    
                if (key != '$id' && key != 'AccordCode') {
                  stuff[key] = true;
                  let mCol = {
                    key: key,
                    label: label,
                    stickyLeft: stickyLeft,
                    minWidth: width,
                    maxWidth: width,
                    align: 'canter',
                    hideCheck: hideCheck,
                    isCheckbox: true,
                    isVisible: true,
                    sticky: sticky,
                  }
                  mColArr.push(mCol);
                }
              }
              a1++;
            })
            setShowColumns(stuff);
          });
    
          setTableColumns(mColArr);
          const tableBody = PAData?.Data;
          let allRowsData = [];
          tableBody.map((resBody) => {
    
            let singleRow = {};
            Object.keys(resBody).forEach(key => {
    
              let col_val = resBody[key] ? resBody[key].trim() : "";
              if (key == 'Company_Name' || key == 'Sector' || key == 'Industry' || key == 'Index') {
                // col_val = '';
              } else
                if (key == 'PriceDate') {
                  // col_val = moment(col_val, 'DD-MM-YYYY HH:mm:ss', true).format('YYYY MMM DD');
                  // col_val = moment(col_val, 'DD-MM-YYYY HH:mm:ss', true).format('YYYY MMM DD');
                } else {
                  col_val = parseFloat(col_val);
                }
    
    
              singleRow[key] = col_val;
            })
    
            allRowsData.push(singleRow);
    
          });
          setTableBodyData(allRowsData);
          setFilterData(tableBodyData);
        // }



      }
  }, [rr_dispatch, PAloading])
  
  
  const expBtn = useRef(null);
  const ShowAllColsButton = () => {

    // var sc = ShowColumns;

    // Object.keys(ShowColumns).map((key) => {
    // delete ShowColumns[key];
    setShowColumns({
      ...ShowColumns,
      AllTimeHigh: true,
      ChangeAllTimeHigh: true,
      Chg_from_week52_highPer: true,
      Chg_from_week52_lowPer: true,
      Company_Name: true,
      Index: true,
      Industry: true,
      LTP: true,
      MarketCap: true,
      Sector: true,
      TTM_P_B: true,
      TTM_P_E: true,
      week52_high: true,
      week52_low: true
    });
    // });
    setShowAllButton(false);
  }


  useEffect(() => {
    if (ShowColumns) {
      Object.keys(ShowColumns).map((key) => {
        if (!ShowColumns[key]) {
          setShowAllButton(true)
        }
      })
    }
  }, [ShowColumns])


  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Price Action
        </Typography>
        <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
          <SiMicrosoftexcel size={15} fill="#2E7A80" />
        </span>
      </div>

      <div
        className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded"
        style={{ height: `calc(100vh - 7.5rem)` }}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
       

            <div className="">

              {
                PAloading ? <Spinner /> : (
                  <div className=" data2Tabels tdStickyCell-evenOdd relative overflow-x-auto">
              <PriceTableComponent
                  ShowCheckboxButton={ShowCheckboxButton} 
                  setShowCheckboxButton={setShowCheckboxButton} 
                  FilterData={FilterData} 
                  setFilterData={setFilterData}
                  StickyColumns={StickyColumns}
                  ShowColumns={ShowColumns}
                  setShowColumns={setShowColumns}
                  tableColumns={tableColumns}
                  setTableColumns={setTableColumns}
                  tableRows={tableBodyData}
                  setResultData={setTableBodyData}
                />

              </div>
                )
              }
          
  
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
};

export default PriceActionTable;
