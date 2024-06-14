import { Spinner } from '@material-tailwind/react';
import {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SCPeersApi } from '../../../store/slice/SingleCompnaySlice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
// import { GlobalContext } from '../../../context/GlobalContext';

const PeerRatiosNdCmp = () => {
  const rrd_params = useParams();
  const rr_dispatch = useDispatch();




  const {
    SCPeers: { data: SCPeersData, loading: SCPeersLoading },
  } = useSelector((state) => state.SingleCompany);

  const {
    RatioMaster: { data: RMData, loading: RMLoading,  isSelected, other_companies },
  } = useSelector((state) => state.Masters);



  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }


  const [TableColumns, setTableColumns] = useState([]);
  const [TableBody, setTableBody] = useState([]);
  const [PlusIcons, setPlusIcons] = useState({});

  const callApi = () => {
    let pType = 'con';
    let params =  {
      "CompanyId": cmpId,
      "type": pType,
      "ratios": isSelected,
      "other_companies": other_companies,
    }
    rr_dispatch(SCPeersApi(params))
  }

  const showDiv = (e, index) => {
    let a0 = PlusIcons;
    a0 = {
      ...a0,
      [`childTable_${index}`]: (!PlusIcons[`childTable_${index}`])
    }
    setPlusIcons(a0);
  }

  useEffect(() => {
    if(!RMLoading){
      callApi()
    }
  }, [rr_dispatch, RMLoading])
  

useEffect(() => {
  if(!SCPeersLoading){
    let col_id = 'column_'
    if(SCPeersData?.header && SCPeersData?.header.length > 0){
      let cols = []
      let firstObj = SCPeersData?.header[0];
      let a0 = firstObj.row;
      
      a0.map((item, i)=>{
          let dd = {
              "id": col_id+i,
              "width": "",
              "align": "",
              "bg_color": firstObj?.bg_color,
              "isItalic": firstObj?.isItalic,
              "isBold": firstObj?.isBold,
              "text_color": firstObj?.text_color,
              "label": item?.col
            }
          cols.push(dd);
      })
      
      setTableColumns(cols)
    }
    
    if(SCPeersData?.Data && SCPeersData?.Data.length){
      let dataA = []
      let plusIcon = {};
      let a00 = SCPeersData?.Data;
      a00.map((item)=>{
        let cData = item?.row;
        let childObj = {}
        cData.map((item0, i0)=>{
          let data = {
                "label":item0?.col,
                "bg_color":item['bg_color'],
                "isItalic":item['isItalic'],
                "isBold":item['isBold'],
                "text_color":item['text_color']
            }
            
            childObj = {...childObj, [`${col_id}${i0}`]: data} 
      })
        dataA.push(childObj)
      })

      // console.log('dataA >>>>>>>> ', dataA)
      setPlusIcons(plusIcon);

      setTableBody(dataA)
    }
  }
}, [rr_dispatch, SCPeersLoading])




  return (
    <>
          
<div className="box-body-sec">
            {
              SCPeersLoading ? <Spinner />
              :

              <>


<table className="forensicTable w-full table-auto text-left">
          <thead>
          <tr  className={`!bg-[#22242F]`}>
              {
                TableColumns.map((item,i)=>{
                  let cStyle = {
                    
                        backgroundColor:item?.bg_color,
                        fontStyle:item?.isItalic ? "italic" : "",
                        fontWeight:item?.isBold ? "500" : "",
                        color:item?.text_color,
                      }

                      


                  return (
                    <td className={`!text-white p-2 text-[13px] font-semibold !bg-[#22242F]"`}  style={cStyle} key={i}>
                      <div style={{
                        display:'flex',
                        justifyContent: i !==0 ? 'end' : "start",
                        paddingRight: (i == (TableColumns.length-1)) ? '.5rem' : "0"
                      }}>
                      {item.label}
                      </div>
                    </td>
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
  
                  return (
                    <>
                      <tr  className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                        {
                          TableColumns.map((item,i)=>{
                            let rowData = row[item.id]
                            let value = rowData?.label
                            let cStyle = {
                              backgroundColor:rowData?.bg_color,
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
                            return (
                              <td style={cStyle} key={i} className={`text-[13px] px-2 font-medium `}>
                                <div style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent: i !==0 ? 'end' : "start",
                                columnGap:'.5rem',
                                paddingRight: (i == (TableColumns.length-1)) ? '.5rem' : "0"
                              }}>
                                {/* {TableColumns.length} */}
                                <div>{value || ""}</div>
                                {
                                  i===0 && row?.childTable && row?.childTable.length > 0 && (
                                    PlusIcons[`childTable_${r_i}`] ?  <AiOutlineMinus onClick={(e)=>showDiv(e, r_i)} className="td-icon"/> : <AiOutlinePlus onClick={(e)=>showDiv(e, r_i)} className="td-icon"/> 
                                  )
                                }
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
                                  <tr key={c} className={r_i%2 !== 0 ? "tr-even" : "tr-odd"}>
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
                                            <td key={i0} style={cStyle}>{c_value}</td>
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


              </>
            }
          
          </div>


    </>
  )
}

export default PeerRatiosNdCmp
