import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SC_SCAnnualP_L_Req } from '../../../constants/defaultRequest';
import { useParams } from 'react-router-dom';
import { BarChartData_Columns_Rows, SCAnnualP_LApi } from '../../../store/slice/SingleCompnaySlice';
import { IconButton } from '@material-tailwind/react';
import { BsFillBarChartFill } from 'react-icons/bs';

const P_L_Statement = ({
  UpdateRightSideTabs,
  setUpdateRightSideTabs,
}) => {
    const rrd_params = useParams();
    
    let cmpId = rrd_params?.company_id;
    if(cmpId){
      cmpId = window.atob(cmpId);
    }
  
    const [QuarterlySegmentType, setQuarterlySegmentType] = useState([]);
    const [TableColumns, setTableColumns] = useState([]);
    const [TableBody, setTableBody] = useState([]);
    const [ActivePrimaryBtn, setActivePrimaryBtn] = useState(1);
  
    const tab_1 = UpdateRightSideTabs.tab_1;
    
    const {
        SCAnnualP_L:{
            data: SCAnnualP_LData,
            loading: SCAnnualP_Loading,
        }
      } = useSelector(state=>state.SingleCompany)

      const rr_dispatch = useDispatch();

      const callApi = (type=tab_1?.activeType) => {
        let params = SC_SCAnnualP_L_Req
        params ={ 
            ...params,
            CompanyId:cmpId,
            type: type
        }
        rr_dispatch(SCAnnualP_LApi(params))
      }


      useEffect(() => {
        callApi()
      }, [])

      useEffect(() => {
        if(!SCAnnualP_Loading){
            
            
            if(SCAnnualP_LData?.header && SCAnnualP_LData?.header.length > 0){
                let cols = []
                let firstObj = SCAnnualP_LData?.header?.[0];
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
              if(SCAnnualP_LData?.Data && SCAnnualP_LData?.Data.length){
                let dataA = []
                let a00 = SCAnnualP_LData?.Data;
                a00.map((item )=>{
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
                // console.log(dataA)
                setTableBody(dataA)
              }


              
        let button_status = SCAnnualP_LData.button_status;
        let nTab_1 = tab_1;
        console.log('button_status >> ', button_status)
        nTab_1 = {
          ...nTab_1,
          button_status: button_status,
          activeType: SCAnnualP_LData?.activeType,
          func: callApi
        }
        setUpdateRightSideTabs(prev=>({...prev, tab_1: nTab_1}));

        }
        // console.log('SCAnnualP_Loading >>> ', SCAnnualP_Loading)
      }, [rr_dispatch, SCAnnualP_Loading])


      const showChart = (row) => {
        // rr_dispatch({
        //   type:"Columns_Rows",
        //   payload:{columns:TableColumns, rows:row}
        // })
        rr_dispatch(BarChartData_Columns_Rows({columns:TableColumns, rows:row}))
      }


  return (
    <>
      


      <div className="pl_segment-container">
        <table className="forensicTable w-full table-auto text-left">
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

export default P_L_Statement
