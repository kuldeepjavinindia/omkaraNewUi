import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BarChartData_Columns_Rows, SCRatiosApi } from '../../../store/slice/SingleCompnaySlice';
import { SC_Ratios_Req } from '../../../constants/defaultRequest';
import { useParams } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Button, IconButton } from '@material-tailwind/react';
import { BsFillBarChartFill } from 'react-icons/bs';
import { ConStdArray } from '../../../constants/helper';

const RatioComponent = () => {


    const [TableColumns, setTableColumns] = useState([]);
    const [TableBody, setTableBody] = useState([]);
    const [PlusIcons, setPlusIcons] = useState({});

    const { SCRatios:{
        data:RatiosData,
        loading:RatiosLoading
    }, DateACE:{
      data: DateACEData,
      // loading: DateACELoading
    }, } = useSelector((state) => state.SingleCompany);
    const rrd_params = useParams();
    const rr_dispatch = useDispatch();
    
    let cmpId = rrd_params?.company_id;
    if(cmpId){
      cmpId = window.atob(cmpId);
    }
    
    const RightSideTabs = {
      tab_1: {
        activeType: "con",
        button_status: {
          con: false,
          std: false,
        },
        func: () => {}
      }
    };  
    const [UpdateRightSideTabs, setUpdateRightSideTabs] = useState(RightSideTabs);

    const [PrimaryBtn, setPrimaryBtn] = useState(ConStdArray[0]);
    const tab_1 = UpdateRightSideTabs.tab_1;


    
  const showDiv = (e, index) => {
    
    let a0 = PlusIcons;
    a0 = {
      ...a0,
      [`childTable_${index}`]: (!PlusIcons[`childTable_${index}`])
    }
    setPlusIcons(a0);
  }

  



const showChart = (row, level=1)=>{

    let newRow = {};
    if(level == 1){
      // let a00 = row
      // delete a00['childTable'];
      newRow = row
    }else{
      Object.keys(row).map((item)=>{
          let a0 = {
              bg_color: "#ccdbf5",
              isBold: true,
              isItalic: false,
              label: row[item],
              text_color: "#000",
            
          }
          newRow = {...newRow, [item]: a0}
          
      })
      
    }
    rr_dispatch(BarChartData_Columns_Rows({columns:TableColumns, rows:newRow}))
      
    }


    const callAPI = (type=tab_1?.activeType) => {
      let params = SC_Ratios_Req;
      params = {
          ...params,
          CompanyId: cmpId,
          type: type
      }
      rr_dispatch(SCRatiosApi(params))
    }


    useEffect(() => {
      callAPI()
    }, [])
    

    useEffect(() => {

      // if(RatiosLoading){
     
      // }
      if(!RatiosLoading){

        if(RatiosData.header && RatiosData.header.length > 0){
            let cols = []
            let firstObj = RatiosData.header[0];
            let a0 = firstObj.row;
            Object.keys(a0).map((item, i)=>{
              if(i > 0){
                let dd = {
                    "id": item,
                    "width": "",
                    "align": "",
                    "bg_color": firstObj?.bg_color,
                    "isItalic": firstObj?.isItalic,
                    "isBold": firstObj?.isBold,
                    "text_color": firstObj?.text_color,
                    "label": a0[item]
                  }
                cols.push(dd);
              }
            })
            setTableColumns(cols)
          }

          if(RatiosData.Data && RatiosData.Data.length){
            let dataA = []
            let plusIcon = {};
            let a00 = RatiosData.Data;
            a00.map((item, i)=>{
              let cData = item?.row;
              let childObj = {}
              Object.keys(cData).map((item0, i0)=>{
                if(i0 > 0){
                  let data = {
                    "label":cData[item0],
                    "bg_color":item['bg_color'],
                    "isItalic":item['isItalic'],
                    "isBold":item['isBold'],
                    "text_color":item['text_color'],
                  };
                  childObj = {...childObj, [`Column${i0}`]: data} 
                }
              })
              if(item?.childTable.length > 0){
                plusIcon = {...plusIcon, [`childTable_${i}`]: false}
              }
              childObj = {...childObj, [`childTable`]: (item?.childTable || [])}
              dataA.push(childObj)
            })
            // console.log('dataA >>>>>>>> ', dataA)
            setPlusIcons(plusIcon);
            setTableBody(dataA)
          }
          
          let button_status = RatiosData.button_status;
          let nTab_1 = tab_1;
          
          nTab_1 = {
            ...nTab_1,
            button_status: button_status,
            activeType: RatiosData?.activeType,
            func: callAPI
          }
          setUpdateRightSideTabs(prev=>({...prev, tab_1: nTab_1}));
              





      }
    }, [RatiosLoading])
    
  return (
    <>
      
    
    
<div className="flex justify-between mb-2">
        <div>
          <div className="flex gap-2 mb-4">
            
            {ConStdArray.map((item, i) => {

              let keyName = `tab_1`;
              let tabBtnData = UpdateRightSideTabs[keyName];
              
              return (
                <>
                  <Button
                    disabled={tabBtnData?.button_status[item?.value] ? false : true}
                    onClick={() => {
                      setPrimaryBtn(item)
                      let nTab_1 = tabBtnData;
                      nTab_1 = {
                        ...nTab_1,
                        activeType: item?.value
                      }
                      setUpdateRightSideTabs(prev=>({...prev, [keyName]: nTab_1}));
                      tabBtnData.func(item?.value);
                    }}
                    size="sm"
                    variant={`${PrimaryBtn?.id == item?.id ? "" : "outlined"}`}
                    className={`${
                      PrimaryBtn?.id == item?.id
                        ? "bg-theme"
                        : "text-theme border-theme"
                    }`}
                    key={i}
                  >
                    {item.label}
                  </Button>
                </>
            )})}
          </div>
        </div>
        <div>
        <div className="flex text-[12px] justify-between text-black gap-3">
            <div className=" font-medium">
              Updated On {DateACEData?.Ratio}
            </div>
            <div className=" font-bold">(In Cr.)</div>
          </div>
        </div>
      </div>




<div className="pl_segment-container">
        <table className="forensicTable w-full table-auto text-left">
            <thead>
            <tr  className={`!bg-[#22242F]`}>
                {
                TableColumns.map((item,i)=>{
                    let cStyle = {
                    
                        // backgroundColor:item?.bg_color,
                        fontStyle:item?.isItalic ? "italic" : "",
                        fontWeight:item?.isBold ? "500" : "",
                        color:item?.text_color,
                        }
                    return (
                    <th className={`!text-white p-2 text-[13px] font-semibold !bg-[#22242F]"`} style={cStyle} key={i}>{item.label}</th>
                    )
                })
                }
            </tr>
            </thead>

            <tbody>
          {
              TableBody.map((row,r_i)=>{
                let backgroundColor = "";
                let fontStyle = "";
                let fontWeight = "";
                let color = "";
                // console.log('row >>> ', row)

                return (
                  <>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                      {
                        TableColumns.map((item,i)=>{
                          let rowData = row[item.id]
                          let value = rowData?.label
                          let cStyle = {
                            // backgroundColor:rowData?.bg_color,
                            fontStyle:rowData?.isItalic ? "italic" : "",
                            fontWeight:rowData?.isBold ? "500" : "",
                            color:rowData?.text_color,
                          }
                          if(backgroundColor === "" &&
                            fontStyle === "" &&
                            fontWeight === "" &&
                            color === ""){
                              backgroundColor = rowData?.bg_color;
                              fontStyle = rowData?.isItalic ? "italic" : "";
                              fontWeight = rowData?.isBold ? "500" : "";
                              color = rowData?.text_color;
                          }
                          // console.log('row >>>> ', row)
                          return (
                            <td style={cStyle} key={i} className={`text-[13px] px-2 font-medium `}>
                              <div style={{
                              display:'flex',
                              alignItems:'center',
                              justifyContent: i !==0 ? 'end' : "space-between",
                              columnGap:'.5rem'
                            }}>
                              <div style={{  display:'flex', alignItems:'center', columnGap:'.5rem' }}>
                                <div>{value || ""}</div>
                                  {/* {Number(i)}
                                  {row?.childTable && row?.childTable.length} */}

                                  {
                                    (i===0 && row?.childTable && row?.childTable.length > 0) && (
                                      <span className=' cursor-pointer'>
                                            {
                                                PlusIcons[`childTable_${r_i}`] ?  <AiOutlineMinus onClick={(e)=>showDiv(e, r_i, row)} className="td-icon"/> : <AiOutlinePlus onClick={(e)=>showDiv(e, r_i, row)} className="td-icon"/> 
                                            }
                                      </span>
                                    )
                                  } 
                              </div>
                              
                              <span>
                                {
                                  ( i === 0) &&
                                  <IconButton className={` bg-transparent text-black shadow-none hover:shadow-none`} size='sm' onClick={()=>showChart(row)} sx={{ padding:0 }}>
                                    <img src= {import.meta.env.VITE_BASE_URL  + "/images/icons/resultChartIcon.svg"} alt=""  className="w-[20px]" />
                                  </IconButton>
                                }
                              </span>

                            </div>
                            </td>
                          )
                        })
                      }
                    </tr>
                    { 
                       PlusIcons[`childTable_${r_i}`] &&
                      row?.childTable && row?.childTable.length > 0 && (
                        <>
                          {
                            row.childTable.map((child, c)=>{
                              return (
                                <tr key={c} className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                                  {
                                    TableColumns.map((item0,i0)=>{
                                      let c_value = child[item0.id];
                                      let cStyle = {};
                                      if(i0 === 0){
                                        cStyle = {
                                          ...cStyle,
                                          paddingLeft:'2rem'
                                        }
                                      }
                                      cStyle = {
                                        ...cStyle,
                                        // backgroundColor:backgroundColor,
                                        fontStyle:fontStyle,
                                        fontWeight:fontWeight,
                                        color:color
                                      }
                                      return (
                                        <>
                                          <td key={i0} style={cStyle} className={`text-[13px] px-2 font-medium `}>
                                          <div style={{ 
                                              display:'flex',
                                              width:'100%',
                                              justifyContent: (i0 === 0 ? 'space-between' : 'flex-end'),
                                              alignItems:'center'
                                            }}>
                                              {c_value || ""}
                                              <span>
                                                {
                                                  i0 === 0 && 
                                                  <IconButton className={` bg-transparent text-black shadow-none hover:shadow-none`} size='sm' onClick={()=>showChart(child, 2)}>
                                                    <img src= {import.meta.env.VITE_BASE_URL  + "/images/icons/resultChartIcon.svg"} alt=""  className="w-[20px]" />
                                                  </IconButton>
                                                }
                                              </span>
                                            </div>
                                            
                                          </td>
                                        </>
                                      )
                                    })
                                  }
                                </tr>
                              )
                            })
                          }
                        </>
                      )
                    }
                  </>
                )
              })
            }
            
        </tbody>


        </table>
      </div>
      
    </>
  )
}

export default RatioComponent
