import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChartData_Columns_Rows, SCQuarterlyResultSnapShotApi } from '../../store/slice/SingleCompnaySlice';
import { SC_QResult_Req } from '../../constants/defaultRequest';
import { useParams } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { BsFillBarChartFill } from 'react-icons/bs';

const Quarterly_P_L_LastQuarter = () => {


  const [TableColumns, setTableColumns] = useState([]);
  const [TableBody, setTableBody] = useState([]);

  const rr_dispatch = useDispatch();
  const rrd_params = useParams();
    
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }


  const {
    SCQuarterlyResultSnapShot:{
      data: QRData,
      loading: QRLoading,
    }
  } = useSelector(state=>state.SingleCompany)

  const callApi = () => {
    let params = SC_QResult_Req;
    params = {
      ...params,
      CompanyId: cmpId
    }
    rr_dispatch(SCQuarterlyResultSnapShotApi(params))
  }


  const showChart = (row) => {
    // rr_dispatch({
    //   type:"Columns_Rows",
    //   payload:{columns:TableColumns, rows:row}
    // })
    rr_dispatch(BarChartData_Columns_Rows({columns:TableColumns, rows:row}))
  }

  useEffect(() => {
      callApi()
  }, [rr_dispatch])
  

  useEffect(() => {
    if(!QRLoading){
      
      if(QRData.header && QRData.header.length > 0){
        let cols = []
        let firstObj = QRData.header[0];
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

      
      if(QRData.Data && QRData.Data.length ){
        let dataA = []
        let a00 = QRData.Data;
        a00.map((item)=>{
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
          dataA.push(childObj)
        })
        setTableBody(dataA)
      }



    }
}, [rr_dispatch, QRLoading])

  


  
  return (
    <>
      <div className="pl_segment-container">
        <table className="forensicTable w-full min-w-max table-auto text-left">
          <thead>
            <tr className={`!bg-[#22242F]`}>
              {
                TableColumns.map((item,i)=>{
                  // console.log('item >>> ', item)
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
          <tbody className="text-black">
                  {
                        TableBody.map((row,i)=>{
                          return (
                            <tr key={i} className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                              {
                                TableColumns.map((item,i)=>{
                                  let rowData = row[item.id]
                                  let value = rowData?.label
                                  let cStyle = {}
                                  cStyle = {
                                    // backgroundColor:rowData?.bg_color,
                                    fontStyle:rowData?.isItalic ? "italic" : "",
                                    fontWeight:rowData?.isBold ? "500" : "",
                                    color:rowData?.text_color,
                                  }
                                  if(rowData?.isChild === true && i === 0){
                                    cStyle = {...cStyle, paddingLeft:'2rem'}
                                  }
                                  
                                  return (
                                    <td className={`text-[13px] px-2 font-medium `} style={cStyle} key={i}>
                                      <div style={{ 
                                        display:'flex',
                                        width:'100%',
                                        justifyContent: (i === 0 ? 'space-between' : 'flex-end'),
                                        alignItems:'center'
                                       }}>
                                      {value || ""}  
                                      <span>
                                        {
                                          i === 0 && 
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
                          )
                        })
                      }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Quarterly_P_L_LastQuarter
