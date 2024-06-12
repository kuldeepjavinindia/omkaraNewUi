import { Button } from "@material-tailwind/react"
import CustomChart from "./CustomChart"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SCData20YearsApi } from "../../store/slice/SingleCompnaySlice";
import { SC_Data20_Req } from "../../constants/defaultRequest";
import { useParams } from 'react-router-dom';
import LoginComponent from "../LoginComponent";

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

const Quarterly_P_L_Chart = (props) => {

    const {
        UpdateRightSideTabs,
        setUpdateRightSideTabs
      } = props
    
    
      const tab_1 = UpdateRightSideTabs.tab_4;

const [QButtonActive, setQButtonActive] = useState(quarterButton[0]);
const [QuarterlyAllData, setQuarterlyAllData] = useState(null);

const rrd_params = useParams();
    
let cmpId = rrd_params?.company_id;
if(cmpId){
  cmpId = window.atob(cmpId);
}





const quarterlySelect = (quarter=5, data=Year20Data?.Data) => {


    let qData = data;
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
                Object.keys(itemQData).map((subItem) => {
                    if (quarter === 20 || a <= quarter) {
                        if (subItem !== '$id') {

                            if (subItem === '_chartName') {
                                demo1.title = title = itemQData[subItem]?.Name;
                            } else {
                                if(itemQData[subItem]?.Value !== null && itemQData[subItem]?.Value !== undefined){
                                    let val = itemQData[subItem]?.Value;
                                        val = Number(val);
                                    demo1.cat = [...demo1.cat, itemQData[subItem]?.Name]
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
                // setQuarterlyAllDataTotal(a1);
                demo0[item] = demo1;
            }
        })
        setQuarterlyAllData(demo0)

    }
}




const {
    SCData20Years:{
        data: Year20Data,
        loading: Year20Loading
    }
} = useSelector(state=>state.SingleCompany);
const rr_dispatch = useDispatch();

const callApi = (type=tab_1?.activeType) => {

    let params = SC_Data20_Req;
    params = {
        ...params,
        CompanyId: cmpId,
        type: type
    }
    rr_dispatch(SCData20YearsApi([params]))

}

useEffect(() => {

  callApi()

}, [])


useEffect(() => {

    // if(Year20Loading){
       
    // }

    if(!Year20Loading){
        // console.log('Year20Data >>> ', Year20Data)
        setQButtonActive(quarterButton[0])
        quarterlySelect(5)

        let button_status = Year20Data.button_status;
        let nTab_1 = tab_1;
        nTab_1 = {
          ...nTab_1,
          button_status: button_status,
          activeType: Year20Data?.activeType,
          func: callApi
        }
        setUpdateRightSideTabs(prev=>({...prev, tab_4: nTab_1}));
    }
    
}, [Year20Loading])

if(Year20Loading){
    return <LoginComponent />
}

  return (
    <>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                
            {
                QuarterlyAllData && Object.keys(QuarterlyAllData).map((item, i)=>{
                    let obj = QuarterlyAllData[item];
                    return (
                        <div key={i} className={`${QButtonActive.len== 5 && "h-[150px]"} ${QButtonActive.len == 10 && "h-[250px]"} ${QButtonActive.len== 13 && "h-[330px]"}`}>

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
        

        <div className="flex gap-2 mt-16 items-center w-full justify-center">
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

export default Quarterly_P_L_Chart
