import { Typography, Spinner , Checkbox, ButtonGroup , Button, Tooltip} from "@material-tailwind/react";
import { useEffect, useState } from "react"
import { ForensicDataReq } from "../../../constants/defaultRequest";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaLongArrowAltUp  } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { ForensicApi, ForensiTooltipApi } from "../../../store/slice/SingleCompnaySlice";
import PieChart from "./PieChart";
import { LuHelpCircle } from "react-icons/lu";
import EditCommentModal from "../ModalComment/EditCommentModal";

const ForensicData = ({ActiveSHTab}) => {


  const rr_dispatch = useDispatch()
  const rrd_params = useParams()
  const [activeBtn, setActiveBtn] =  useState("Fund_Flow");
  const [activeTwoBtn, setActiveTwoBtn] =  useState("Consolidated");
  const [capData, setCapData] =  useState([]);
  const [open, setOpen] = useState(false)



  const [checked, setChecked] = useState(false);
  const showHide = (event) => {
    setChecked(event.target.checked);
  };


  const { Forensic :
    {data: ForensicData, loading: ForensicLoading}
   }  = useSelector(state=> state.SingleCompany);


   const { ForensiTooltip :
    {data: ForensiTooltipData, loading: ForensiTooltipLoading}
   }  = useSelector(state=> state.SingleCompany);
   
   const {
    companyNotes:{
      loading: cmpNotesLoading,
      data: cmpNotesData
    }
  } = useSelector(state=>state.SingleCompany);


  const companyData = cmpNotesData?.Data?.[0] || [];
   

   let cmpId = rrd_params?.company_id;
   if(cmpId){
     cmpId = window.atob(cmpId);
   }
 
  const compId = cmpId;
  
  const capStucture_Menu = [
    {
      id: 0,
      title: "Fund Flow",
      value: "Fund_Flow",
      short_name: "ff",
      type:"CAP",
    },
    {
      id: 1,
      title: "Working Capital Flow",
      value: "Working_Capital",
      short_name: "cap",
      type:"CAP",
    },
  ];

  const handleType = (item, value)=> {
    setActiveBtn(value)
    setCapData(item)

}



const handleConStdBtn = (item, label)=> {
  setActiveTwoBtn(label)

}


const typeData = ActiveSHTab?.type;

  const consolidateStandalone_Btn = [
    {
        id: 1,
        label: "Consolidated",
        value: "Consolidated",
        short_name: "con",
      },
      {
        id: 2,
        label: "Standalone",
        value: "Standalone",
        short_name: "std",
      },
  ]

  const callAPI = () => {
    let param =  ForensicDataReq
      param = {
         ...param,
        "companyID": compId,
        "Type": ActiveSHTab.type,
        "dataFor": capData?.short_name,
        "childType":capData?.childfor
      }
 
   rr_dispatch(ForensicApi(param))
  }


 useEffect(()=> {
  callAPI()
 }, [ActiveSHTab]);


  useEffect(() => {
  
  }, [ActiveSHTab])
   
  useEffect(() => {

    if(typeData == 'ratios'){
      rr_dispatch(ForensiTooltipApi({"Type": "ratios"}))
    }
  
  }, [ForensicLoading])


  // console.log(ForensiTooltipData, ">>>>>>>>>>>>>>>>>");

  
  const filterTooltip = (type="") => {
    
    const tooltipData = ForensiTooltipData?.Data && ForensiTooltipData?.Data[0].ToolTip.filter((item)=> item.key == type)
    
     return (tooltipData && tooltipData[0].toolTip)

}


const handleOpen = () => setOpen(!open);


  if(ForensicLoading){
    return <Spinner className="w-12 h-12" />
  }
  

  return (
    <>
    
    <div>
      {
         ForensicData && ForensicData.length > 0 && ForensicData.map((res, i) => {
          // if (i != 1 && typeData == "CF" || typeData != "CF") {
              const itemDetails = res.details.length > 0 ? res.details[0] : {};
              let highlights = res.details.length > 0 ? res.details[0].highlight : {};

             const details = res.details.length > 0 ? res.details[0] : {}

              let a1 = 0;
              const tableHead = res.header;
              var mColArr = [];
              tableHead.map((resHeads) => {

                var hideCheck = false;
                if (a1 !== 1) {
                  var hideCheck = true;
                }
                var stickyLeft = 0;

                var stuff = {};
                Object.keys(resHeads).forEach((key, i0) => {

                  var label = resHeads[key];
                  var show_status = resHeads[key];
                  if (label != null && label != "") {
                    var width = 120;
                    var sticky = false;
                    if (key == 'Company_Name' || key == 'Sector' || key == 'Industry') {
                      width = 150;
                      sticky = true;

                      hideCheck = false;
                    } else {
                      hideCheck = true;
                    }

                    if (key != '$id' && key != 'AccordCode') {
                      stuff[key] = true;
                      var mCol = {
                        id: key,
                        label: label,
                        stickyLeft: stickyLeft,
                        minWidth: width,
                        maxWidth: width,
                        align: 'canter',
                        hideCheck: hideCheck,
                        sticky: sticky,
                      }
                      mColArr.push(mCol);
                    }
                  }
                  a1++;
                })
              });

              const tableBody = res?.TableData;
              
              var allRowsData = [];
              tableBody.map((resBody) => {

                var singleRow = {};
                Object.keys(resBody).forEach(key => {
                  let col_val = resBody[key] ? resBody[key].trim() : " ";
                  singleRow[key] = col_val;
                })
                allRowsData.push(singleRow);
              });

              
              if (i == 0 && typeData == "CF") {
                  const data3 = ForensicData[1]?.TableData;
                if(data3){

                  data3.map((resBody) => {
                  var singleRow = {};
                  Object.keys(resBody).forEach(key => {
                    let col_val = resBody[key] ? resBody[key].trim() : " ";
                    singleRow[key] = col_val;
                  })
                  allRowsData.push(singleRow);
                  });
                }
              }

            
            return (
              <>
              {/* <div style={{ display: !checked && i == 2 && typeData == "CF" ? 'none': 'unset' }} ></div> */}
                <div className=
                 {`mb-3 px-5 py-5 mt-2  rounded
                  ${typeData == "ratios"  ? "bg-transparent px-0 !py-0 mt-0" : "bg-[#fff]"} 
                  ${(!checked && i == 2 && typeData == "CF") ? "hidden " : "block"}  
                  ${typeData == "CF"  ? "bg-transparent px-0 !py-0 mt-0" : "bg-[#fff]"} 
                  `}
                  >
  {/* {
   typeData === "CAP" ? (
    <div className="col-span-5 mt-5 bg-white py-4 rounded-md p-4">
      <ButtonGroup className="border-[1px] border-gray-400 rounded-lg mb-3 w-fit">
        { capStucture_Menu.map((item, i) => (
          <Button
            key={i}
            className={`py-2 border-none ${activeBtn === item.value ? "bg-[#22242F] text-white" : "bg-white text-[#606F7B]"}`}
            onClick={() => handleType(item, item.value)}
          >
            {item.title}
          </Button>
        ))}
      </ButtonGroup>
      {consolidateStandalone_Btn.map((item) => (
        <Button
          key={item.label}
          className={`mr-2 text-[12px] py-2 ${activeTwoBtn === item.label ? "bg-theme border-theme text-white border" : "text-[#606F7B] border border-gray-400 bg-white hover:bg-theme-c2 hover:text-theme hover:border-theme"}`}
          onClick={() => handleConStdBtn(item, item.label)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  ) : (
    "No CAP"
  )
} */}


                <Typography className="text-[15px] my-4 w-[50%]">
                  {details.description}
                </Typography>
               <div className=  {`${
                (res.sourcePie.length > 0 && res.ApplicationPie.length > 0)
                  ? "grid grid-cols-2 gap-2"
                  : "grid grid-cols-1 gap-0"
              }  `}
               >
                <div>
              <table className=  " forensicTable w-full h-full overflow-scroll border-[1px] border-[#E5E5E5] rounded bg-clip-border ">
                <thead>
                    <tr>
                        {
                          mColArr.map((column, clm) => {
                            var cStyle = {}; 
                            if(column.id !== 'column_1' && clm !== 0){
                              cStyle['textAlign'] = 'center';
                            }

                            return (
                              <th className="border-b border-blue-gray-100 bg-[#1E233A] text-white p-2 text-[13px]  font-medium text-left px-4">{column.label}</th>
                            )
                          })
                        }
                      
                    </tr>
                </thead>
                <tbody>
                  {
                    allRowsData.map((row, is) => {
                      let lastR = false;
                      return (

                        <tr className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                          {
                            mColArr.map((column, c1)=>{
                              let crtCellData = row[column?.id];      
                              let value = row[column?.id];
                              
                              if(typeof(crtCellData) == 'object'){
                                value = row[column?.id].name;
                               
                            }
                            var cStyle = {};
                                      if (i < 2 && typeData == "CF" && value == "Total") {
                                        cStyle['backgroundColor'] = "#c7dbb0"
                                      }



                                      if(c1 > 0){
                                        cStyle['textAlign'] = "center"
                                        {/* cStyle['height'] = 40 */}
                                      }
                                      
                                      if(allRowsData[allRowsData.length-1]){
                                        var l1 = allRowsData.length-1;
                                        {/* cStyle['fontWeight'] = "bold" */}
                                        var lastRow = allRowsData[l1];
                                        var firstRow = allRowsData[0];
                                        if(
                                          value == ("I. Capital Allocation Trends") ||
                                          value == ("II.Survival Probability/ Balance Sheet Health") ||
                                          value == ("III. Forensic Evaluation") ||
                                          
                                          typeData == "ratios" && row['column_1'] == "II .Survival Probability" ||
                                          typeData == "ratios" && row['column_1'] == "III .Balance Sheet Health" ||
                                          
                                          typeData == "CF" && row['column_1'] == "Total"
                                         
                                        ){
                                         
                                          cStyle['backgroundColor'] = "#1E233A";
                                          cStyle['color'] = "#fff";
                                        }


                                        if(
                                           typeData == "CF" && row['column_1'] == "Application" ||
                                           typeData == "CF" && row['column_1'] == "Sources" ||
                                           typeData == "ratios" && row['column_1'] == "I. Return Ratios" || 
                                           typeData == "ratios" && row['column_1'] == "II.Survival Probability" ||
                                          typeData == "ratios" && row['column_1'] == "III.Balance Sheet Health" ||
                                          typeData == "ratios" && row['column_1'] == "IV. Financial Ratio" ||
                                          typeData == "ratios" && row['column_1'] == "V. Profit & Loss Statement"  ||
                                          typeData == "ratios" && row['column_1'] == "Vi. Cash Flow" 
                                        ){
                                          cStyle['fontWeight'] = "bold";
                                        }


                                      
                                        if(i == 2 && typeData == "CF"){
                                          

                                          if(is == 0){
                                            // cStyle['backgroundColor'] = "#fff";
                                          }else{
                                            if(column?.id == 'column_2'){
                                              // cStyle['backgroundColor'] = "#b6e8ff";
                                            }else{
                                              //  cStyle['backgroundColor'] = "#fff"; 
                                            }
                                          }
                                          
                                        if(row['column_1'] == "Net Sales" && column?.id != 'column_1'){
                                            {/* console.log(row['column_1']); */}
                                            // cStyle['backgroundColor'] = "#b6e8ff";
                                          }
                                          
                                        }
                                        
                                        {/* if(
                                          typeData == "ratios" && row['column_1'] == "Dividend Payout Ratio (%)"
                                        ){
                                          cStyle['fontWeight'] = "normal";
                                        } */}

                                        Object.keys(lastRow).map((lastRowItem)=>{
                                          if(l1 == is && lastRow[lastRowItem] == value){
                                             
                                            if(typeData != "ratios" && typeData != "CH" && typeData != "DH" && typeData != "ESOP" && typeData != "SH" && typeData != "AH"){
                                              cStyle['fontWeight'] = "bold";
                                            }
                                            {/* console.log(lastRowItem); */}
                                            if(i == 2 ){
                                              // cStyle['backgroundColor'] = "#fff";
                                            }

                                            
                                            if(i == 3 && l1 == is && typeData == "BS" && lastRowItem != "column_1"){
                                                
                                                lastR = true;

                                                var newVal = value.trim() != "" ? parseFloat(value) : 0;
                                                if(newVal < 10){
                                                  // cStyle['backgroundColor'] = "#9beb8d";
                                                }else{
                                                  // cStyle['backgroundColor'] = "#ffa3a3";
                                                }
                                            }
                                          }
                                        })
                                      }

                              return (
                                <td  style={cStyle} className="text-[#000] text-[13px] px-4 py-1 relative">
                                  <div className=" flex  items-center gap-1">

                                    
{
                                            value === " "
                                              ?
                                              <>
                                                <div className="blankCell h-4"></div>
                                              </>
                                              :
                                              <>
                                                {
                                                  (column?.id === "column_2" && ['DIR', "AH"].includes(typeData)) ?
                                                  <>
                                                    <span style={{ cursor: "pointer" }} onClick={()=>{
                                                      // dispatch({type:"BoardOfDirectorDetailRequest"});
                                                      // setDIR_Model(true);
                                                      // setSelectedDIR(row);
                                                    }}>
                                                      {column.format && typeof value === 'number'
                                                      ? column.format(value)
                                                      : value}
                                                    </span>
                                                  </>
                                                  :
                                                  <>
                                                  {column.format && typeof value === 'number'
                                                  ? column.format(value)
                                                  : value}
                                                 
                                                  </>
                                                }

                                                {
                                                  column.id == "column_1" ? 
                                                  <>
                                                  
                                                  {
                                                    value.trim() === "ROE (%)" || 
                                                    value.trim() === "ROCE (%)" || 
                                                    value.trim() === "Net Debt / Total Equity (x)" || 
                                                    value.trim() === "Asset Turnover (x)" || 
                                                    value.trim() === "Cash Conversion Cycle (Days)" || 
                                                    value.trim() === "Dividend Payout Ratio (%)" || 
                                                    value.trim() === "Interest Coverage (x)" || 
                                                    value.trim() === "Free Cash Flow (Rs)" ?
                                                    
<Tooltip  className = "text-[11px] " content= {
  
  <div className="w-80">

  <Typography
    variant="small"
    color="white"
    className="font-normal opacity-80"
  >
    {filterTooltip(value)}
  </Typography>
</div>
} >
      <span className=" cursor-pointer"><LuHelpCircle  size={13} /></span>
    </Tooltip>
                                                    :
                                                    null
                                                  }
                                                  
                                                  </>
                                                  :
                                                  null
                                                 }
                                                

                                              </>
                                          }
                                  {/* {value} */}
                                  </div>
                                </td>
                              )
                            })
                          }
                        </tr>
                      )

                    })
                  }
                   
                </tbody>
              </table>


{
      typeData == "CF" && i == 0 
        ?
                   <>
                 <Checkbox checked={checked} onChange={showHide} name="gilad" label="Show Detailed Data" />
                   </>
                   : null
 }

</div>

<div>
  {/*Start  Charts */}
{
       res.sourcePie.length > 0 && res.ApplicationPie.length > 0 ?
                <div className="grid grid-cols-2 gap-2">
                  {
                              res.sourcePie.length > 0
                                ?
                                <>
                                    <PieChart ChartTitle="Sources" chartData={res.sourcePie} />
                               </>
                                :
                                null
                            }
                            {
                              res.ApplicationPie.length > 0
                                ?

                                <>
                                <PieChart ChartTitle="Application" chartData={res.ApplicationPie} />
                                 
                                </>
                                :
                                null
                            }

                </div>
                        :
                        null
}
{/*End  Charts */}
</div>

{/* ---- Start PL Box ----- */}
<div className="grid grid-cols-4 gap-2 mt-5">

{
                                highlights && highlights.length > 0 && highlights.map((highlight, i00) => {
                                  {/* console.log('highlight >> ', highlight) */}
                                  return (
                                    <div className="bg-[#E8F0F4] text-center rounded pt-3" 
                                    sx={{
                                      backgroundColor: '#c7dbb0',
                                      borderRadius: '4px',
                                      border: '1px solid #ddd',
                                      margin: '0.5rem',
                                      textAlign: 'center',
                                    }}
                                    >
                                      <div >
                                        <Typography className="text-[15px] text-[#000] font-bold" >
                                          {highlight?.title}
                                        </Typography>
                                        <Typography className="text-[15px] text-[#000] font-bold mb-2"  >
                                          {highlight?.subtitle}
                                        </Typography>
                                      </div>
                                      <div className="flex  p-4 items-center justify-center text-[#000] font-bold rounded-b"  style={{
                                        backgroundColor: (highlight?.arrow == 'Up' && highlight?.value > 50 ? '#3ED179' : highlight?.arrow == '' ? '#F43F3F' : '#F43F3F')}} >
                                        <Typography className="text-[#000] font-bold text-[15px]" sx={{ marginTop:.5 }} variant="subtitle2" fontWeight='bold' >
                                          {highlight?.value}
                                        </Typography>
                                        {
                                          highlight?.arrow == 'Up' && highlight?.value > 50 ?
                                         
                                            <FaLongArrowAltUp  className="text-[#000]" />
                                          :
                                            <>
                                            {
                                              highlight?.arrow == "" 
                                              ?
                                              <></>
                                              :
                                          
                                              <FaLongArrowAltDown  className="text-[#000]"/>

                                            }
                                            </>
                                      }

                                      </div>
                                    </div>
                                  )
                                })
                              }

</div>
{/* ---- End PL Box ----- */}


{/* ========== Start Comment Box============ */}
 <EditCommentModal open = {open} setOpen = {setOpen}   cancelButton = "CANCEL" updatButton= "UPDATE" 
 modalTitle = {companyData?.CompanyName}
 />
<div className="flex justify-between bg-[#fff] border-[1px] border-[#DAE9F7] pt-4 pl-4 pb-7 pr-4 mt-3 rounded">
  <Typography className="text-[#000] text-[16px] font-bold">
  Comment
  </Typography>
  <Button onClick={handleOpen} className="cursor-pointer py-1 px-3 shadow-none text-[12px] text-[#4448F5] bg-[#ECEDFE]">
Edit
  </Button>

</div>
{/* ========== End Comment Box============ */}



               </div>
               {/* end Main div */}
                </div>
              </>
            )
   
         })
      }


    </div>








    </>
  )
}

export default ForensicData