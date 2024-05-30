import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BarChartData_Columns_Rows, SCShareHoldingApi } from '../../../store/slice/SingleCompnaySlice';
import { SC_ShareHolding_Req } from '../../../constants/defaultRequest';
import { IconButton } from '@material-tailwind/react';
import { BsFillBarChartFill } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ShareholdingComponent = () => {



  const [TableColumns, setTableColumns] = useState([]);
  const [TableBody, setTableBody] = useState([]);
  const [PlusIcons, setPlusIcons] = useState({});

  const { SCShareHolding:{
      data: ShareHoldingData,
      loading: ShareHoldingLoading
  } } = useSelector((state) => state.SingleCompany);
  const rrd_params = useParams();
  const rr_dispatch = useDispatch();
  
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }
  

  
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

    useEffect(() => {

      if(ShareHoldingLoading){

        let params = SC_ShareHolding_Req;
        params = {
          ...params,
          companyID: cmpId
        }

        rr_dispatch(SCShareHoldingApi(params))
      }

      if(!ShareHoldingLoading){

        if(ShareHoldingData.header && ShareHoldingData.header.length > 0){
          let cols = []
          let firstObj = ShareHoldingData.header[0];
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
        
        if(ShareHoldingData.Data && ShareHoldingData.Data.length){
          let dataA = []
          let plusIcon = {};
          let a00 = ShareHoldingData.Data;
          a00.map((item, i)=>{
            let cData = item?.row;
            let childObj = {}
            Object.keys(cData).map((item0, i0)=>{
              if(i0 > 0){
                let data = {
                  "label":cData[item0],
                  "bg_color":item['bg_color'],
                  "isItalic":item['isItalic'],
                  "isHeader":item['isHeader'],
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
          setPlusIcons(plusIcon);
          setTableBody(dataA)
        }


      }

    }, [rr_dispatch, ShareHoldingLoading])
    


  return (
    <>
      
<div className="pl_segment-container">
        <table className="w-full min-w-max table-auto text-left">
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
                                  (rowData?.isHeader === false && i === 0) &&
                                  <IconButton className={` bg-transparent text-black shadow-none hover:shadow-none`} size='sm' onClick={()=>showChart(row)} sx={{ padding:0 }}>
                                    <BsFillBarChartFill size={12} />
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
                                        backgroundColor:backgroundColor,
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
                                                    <BsFillBarChartFill size={12} />
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

export default ShareholdingComponent
