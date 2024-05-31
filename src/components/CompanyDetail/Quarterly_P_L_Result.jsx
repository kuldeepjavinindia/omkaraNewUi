import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChartData_Columns_Rows, QuarterlyResultApi, ResultDocumentApi } from '../../store/slice/SingleCompnaySlice';
import { Result_Document_Req, SC_QResult_Req } from '../../constants/defaultRequest';
import { useParams } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import QuarterlyAnalyticsInfoModal from './Modals/QuarterlyAnalyticsInfoModal';



const Quarterly_P_L_Result = (props) => {

  const {
    UpdateRightSideTabs,
    setUpdateRightSideTabs
  } = props


  const tab_1 = UpdateRightSideTabs.tab_1;


  const [TableColumns, setTableColumns] = useState([]);
  const [TableBody, setTableBody] = useState([]);
  const [DialogData, setDialogData] = useState(false);

  const rr_dispatch = useDispatch();
  const rrd_params = useParams();
    
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }


  const {
    QuarterlyResult:{
      data: QRData,
      loading: QRLoading,
    }
  } = useSelector(state=>state.SingleCompany)

  const callApi = (type=tab_1?.activeType) => {
    let params = SC_QResult_Req;
    params = {
      ...params,
      CompanyId: cmpId,
      type: type
    }
    rr_dispatch(QuarterlyResultApi(params))
  }


  const showChart = (row) => {
    rr_dispatch(BarChartData_Columns_Rows({columns:TableColumns, rows:row}))
  }


  const clickInfo = (e, yearMonth) => {
    let yearMonthArr = yearMonth.split('-')
    let params = Result_Document_Req;
        params = {
          ...params,
          CompanyID: cmpId,
          UserId: "",
          month: yearMonthArr[0],
          year: yearMonthArr[1],
          Type: tab_1?.activeType,
        }
        rr_dispatch(ResultDocumentApi(params))
        setDialogData(yearMonth)
  }

  useEffect(() => {
      callApi()
  }, [rr_dispatch])
  

  useEffect(() => {
    console.log('QRLoading >> ', QRLoading)
    if(!QRLoading){
      if(QRData.Header && QRData.Header.length > 0){
        let cols = []
        let firstObj = QRData.Header[0];
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

      let button_status = QRData.button_status;
      let nTab_1 = tab_1;
      nTab_1 = {
        ...nTab_1,
        button_status: button_status,
        activeType: QRData?.activeType,
        func: callApi
      }
      setUpdateRightSideTabs(prev=>({...prev, tab_1: nTab_1}));

    }
}, [rr_dispatch, QRLoading])

  


  
  return (
    <>
    <QuarterlyAnalyticsInfoModal DialogData={DialogData} setDialogData={setDialogData} activeType={tab_1?.activeType} />
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
                                            {/* <BsFillBarChartFill size={12} />  */}
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


<tr className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                      {
                        TableColumns.map((item,i)=>{
                          if(i === 0){
                            return (
                              <td className={`text-[13px] px-2 font-medium `} key={i}>
                                <b>Analysis</b>
                              </td>
                            ) 
                          }else{
                            // let singleData = [];
                            let $key = item.label;
                            if($key){
                              $key = $key.replace(' ', '-');                             
                              // singleData = QuarterlyResultsData[$key]
                              // console.log('singleData >>>> ', singleData)
                            }
                            return (
                              <td key={i} className={`text-[13px] px-2 font-medium `} >
                                {
                                  $key ?
                                  <>
                                  <div style={{ 
                                    display:'flex',
                                    alignItems:'baseline',
                                    justifyContent:'end',
                                    gap:'.5rem'
                                  }}>
                                    <IconButton className={` bg-transparent text-black shadow-none hover:shadow-none`} size='sm' onClick={(e)=>clickInfo(e, $key)}  >
                                      <AiOutlineInfoCircle style={{ fontSize:'1rem' }} />
                                    </IconButton>
                                    
                                  </div>
                                  </>
                                  :
                                  <></>

                                }
                                
                              </td>
                            )
                          }
                          
                        })
                      }
                      </tr>

          </tbody>
        </table>
      </div>
    </>
  )
}

export default Quarterly_P_L_Result
