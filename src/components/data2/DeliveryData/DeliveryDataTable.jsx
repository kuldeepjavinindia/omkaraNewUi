import { Typography, Input, Select, Option , Checkbox, Button, Spinner} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import DeliveryDataMUI from "./DeliveryDataMUI";





const DeliveryDataTable= ()=> {

  const rr_dispatch = useDispatch();

  const {
    DeliveryVolume:{
      data: DVData,
      loading: DVLoading,
    }
  } = useSelector(state=>state.Data2)

  
  const [NewColumns, setNewColumns] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  // const [Totaldata, setTotalData] = useState([]);


  // const callAPI = () => {
    
  //   // rr_dispatch()
  // }

  // useEffect(() => {
  //   callAPI();
  // }, [])
  
  

  useEffect(() => {
    if(!DVLoading){
      
let bodyData = DVData?.Data
let headers = DVData?.Header
      
      var cols = [];
      var allRowsData = [];
      bodyData.map((resBody)=>{
          var singleRow = {};
          Object.keys(resBody).forEach(key => {
              singleRow[key] = resBody[key];
          })
          allRowsData.push(singleRow);
          
      });

      

      var a1 = 0;
      var mColArr = [];

      
      headers.map((resHeads)=>{
        
          let width = 75;
          var sticky = null;
         
          let hideCheck = false;
          if(a1 !== 1){
              hideCheck = true;
          }

          Object.keys(resHeads).forEach(key => {
              var label = resHeads[key].label;
              let isCheckbox = true;

              var show_status = resHeads[key].show_status;
              if(show_status){
                   width = 80;
                  // var bgColor = 'th';

                  if(key == 'CompName' || key == 'Industry'){
                      width = 200;
                      isCheckbox = false
                  }

                  // if(key == 'YesDelVol' || key == 'DelTimes' || key == 'DelValue'){
                  //         bgColor = bgColor+' customHeaderColor';
                  // }

                  if(key !== '$id'){
                      var mCol = {
                          label:(label || ""),
                          // Footer:(label || ""), 
                          sticky:sticky,
                          hideCheck:hideCheck,
                          isCheckbox: isCheckbox,
                          isVisible: true,
                          accessor:key,
                          key:key,
                          width:width,
                      }
                      mColArr.push(mCol);
                  }
              }
              a1++;
            })
      });

      const NEW_COLUMN = mColArr;
      console.log('NEW_COLUMN >>> ', NEW_COLUMN)
      setTableData(allRowsData);
      setNewColumns(NEW_COLUMN);


    }
  }, [rr_dispatch, DVLoading])
  
  
  








    return (
        <>
<div className="pr-2">
<div className="flex justify-between pb-2">
      <Typography className="text-[15px] text-[#000] font-semibold">
      Delivery Data
      </Typography>
      <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
      <SiMicrosoftexcel size={15} fill="#2E7A80"/>
      </span>
     </div>

<div className=" border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded" style={{ height: `calc(100vh - 7.1rem)` }}>

<div className="flex flex-col h-full justify-between ">
  <div>
   
   

<div className="">
{/* Start Table */}
<div className="mt-8 data2Tabels relative overflow-x-auto">


{
  DVLoading ?
  <>
    <Spinner />
  </>
  :
  <>
   <DeliveryDataMUI 

      FilterData={FilterData}
      setFilterData={setFilterData}
      tableRows={TableData}
      setTableRows={setTableData}
      tableColumns={NewColumns}
      setTableColumns={setNewColumns}

    />

  </>

}

   

  {/* <table className="forensicTable   h-full wordBreakThead">
    <thead className="bg-[#1E233A] ">
      <tr className="!bg-[#1E233A]">
        <th className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10" style={{ width: '150px' }}>COMPANY NAME</th>
        <th className="sticky left-[150px] border-r border-[#B3B3B3] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10" >MCap (Cr)</th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
        <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  />  LTP
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 52wk High
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Chg frm 52wk High(%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 52wk Low
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Chg frm 52wk Low(%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> PAT Growth QoQ (%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> PAT Growth YoY (%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> D/E
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" >
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> ROCE
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left" style={{ width: '150px' }}>Bharat Dynamics Ltd.</td>
        <td className="sticky left-[150px] border-r border-[#B3B3B3] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '0px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left" style={{ width: '150px' }}>Bharat Dynamics Ltd.</td>
        <td className="sticky left-[150px] border-r border-[#B3B3B3] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '0px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" >10204</td>
      </tr>
    </tbody>
    <tfoot>
      <tr className="bg-[#1E233A] h-[63px]">
        <td className="sticky left-0 text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left" style={{ width: '150px' }}>Company Name</td>
        <td className="sticky left-[150px] border-r border-[#B3B3B3] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left" >MCap (Cr)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >LTP</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >52wk High</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >Chg frm 52wk High(%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >52wk Low</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >Chg frm 52wk Low(%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >PAT Growth QoQ (%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >PAT Growth YoY (%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >D/E</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" >ROCE</td>
      </tr>
    </tfoot>
  </table> */}
</div>
{/* End Table */}
  </div>

  <div></div>

</div>


</div>
        </div>

</div>
     
        </>
    )
}

export default DeliveryDataTable;