import React, { useEffect, useState } from 'react'
import { SC_SCAnnualP_L_ChartReq } from '../../../constants/defaultRequest';
import { useDispatch, useSelector } from 'react-redux';
import { SCAnnualP_LChartApi } from '../../../store/slice/SingleCompnaySlice';
import CustomChart from '../CustomChart';
import { Button } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';

const quarterButton = [
    {
      id:1,
      label:"5 Quarterly",
      len:5
    },
    {
      id:2,
      label:"10 Quarterly",
      len:10
    },
    {
      id:3,
      label:"13 Quarterly",
      len:13
    }
  ]
const P_L_Chart = (props) => {


    const {
        UpdateRightSideTabs,
        setUpdateRightSideTabs
    } = props


const rrd_params = useParams();
let cmpId = rrd_params?.company_id;
if(cmpId){
  cmpId = window.atob(cmpId);
}

const [QuarterlyAllData, setQuarterlyAllData] = useState(null);
const [QButtonActive, setQButtonActive] = useState(quarterButton[0]);
const {
    SCAnnualP_LChart:{
        data: SCP_LChart,
        loading: SCP_LLoading,
    }
} = useSelector(state=>state.SingleCompany)



const rr_dispatch = useDispatch();
    
  const quarterlySelect = (quarter=5) => {
    // setQButtonActive(quarter)
  
        let qData = SCP_LChart.Data;
        let demo0 = [];
        let title = null;
        if (qData && qData.length > 0) {
            qData = qData[0];
            Object.keys(qData).map((item) => {
                var demo1 = { cat: [], value: [], title: title, typeFor: quarter, YoYQoQ: {} };
                if (item !== '$id' && item !== '_MainHeader') {
                    var itemQData = qData[item];
                    var a = 0;
                    // var a1 = 0;
                    Object.keys(itemQData).map((subItem, i1) => {
                        if (quarter === 20 || a <= quarter) {
                            if (subItem !== '$id') {

                                if (subItem === '_chartName') {
                                    demo1.title = title = itemQData[subItem]?.Name;
                                } else {
                                    if(itemQData[subItem]?.Value !== null && itemQData[subItem]?.Value !== undefined){
                                        demo1.cat = [...demo1.cat, itemQData[subItem]?.Name]
                                        let val = Number(itemQData[subItem]?.Value);
                                        demo1.value = [...demo1.value, val]
                                    }
                                }
                            }
                        }
                        // if(itemQData[subItem]?.Value !== null && itemQData[subItem]?.Value !== undefined){
                        //     a1++
                        // }
                        a++;
                        if (subItem === '_chartName') {
                            demo1.title = title = itemQData[subItem]?.Name;
                        }

                        if (quarter === 5 && subItem === 'YoYQoQ') {
                            demo1.YoYQoQ = { YoY: (itemQData[subItem]?.YoY || null), QoQ: (itemQData[subItem]?.QoQ || null) }
                        }


                    });
                    demo0[item] = demo1;
                }
            })
            console.log('demo0 >>> ', demo0)
            setQuarterlyAllData(demo0)
    }

}


const tab_1 = UpdateRightSideTabs.tab_2;

const callApi = (type=tab_1?.activeType) => {
    let params = SC_SCAnnualP_L_ChartReq;
        params =  {
            ...params,
            CompanyID: cmpId,
            type: type
        }
    rr_dispatch(SCAnnualP_LChartApi(params))
}

useEffect(() => {
  callApi()
}, [])

useEffect(() => {
  if(!SCP_LLoading){
    quarterlySelect()


    let button_status = SCP_LChart.button_status;
    let nTab_1 = tab_1;
    // console.log('button_status >> ', button_status)
    nTab_1 = {
      ...nTab_1,
      button_status: button_status,
      activeType: SCP_LChart?.activeType,
      func: callApi
    }
    setUpdateRightSideTabs(prev=>({...prev, tab_1: nTab_1}));


  }
}, [SCP_LLoading])



  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                
                {
                    QuarterlyAllData && Object.keys(QuarterlyAllData).map((item, i)=>{
                        let obj = QuarterlyAllData[item];
                        return (
                            <div key={i} className={`${QButtonActive.len== 5 && "h-[150px]"} ${QButtonActive.len == 10 && "h-[300px]"} ${QButtonActive.len== 13 && "h-[420px]"}`}>
                                
                            <div className="h-14">
                                <div className="text-center">
                                    <h4 className=" font-semibold text-[15px] text-black">
                                    {obj?.title}
                                    </h4>
                                    <p className="text-[12px]" dangerouslySetInnerHTML={{ 
                                    __html: `${obj.YoYQoQ.YoY ? "YOY: "+obj.YoYQoQ.YoY+" <br />" : ""} ${obj.YoYQoQ.QoQ ? "QOQ: " + obj.YoYQoQ.QoQ : ""}`
                                    }}>
                                    
                                    </p>
                                </div>
                            </div>

                                <CustomChart detail={{
                                    title: obj.title,
                                    yoy:obj.YoYQoQ?.YoY,
                                    qoq:obj.YoYQoQ?.QoQ,
                                }} values={obj.value} categories={obj.cat}/>
                            </div>
                        )
                    })
                }
            </div>
            
    
            <div className="flex gap-2 mt-4 items-center w-full justify-center">
                {
                    quarterButton.map((item, i)=>{
                        return (
                            <Button size="sm" onClick={()=>{ 
                                setQButtonActive(item)
                                quarterlySelect(item.len)
                             }} variant="outlined" className={` rounded ${QButtonActive.id == item.id ? "bg-[#fff] text-[#7B70FF] border-[#7B70FF]" : "text-[#666666] bg-white border-[#D9DDF0]"}`}  key={i}>{item.label}</Button>
                        )
                    })
                }
            </div>
    </>
  )
}

export default P_L_Chart
