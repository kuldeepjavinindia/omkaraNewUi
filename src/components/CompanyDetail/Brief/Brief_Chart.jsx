import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SC_Data20_Req } from '../../../constants/defaultRequest';
import { SCData20YearsApi } from '../../../store/slice/SingleCompnaySlice';
import CustomChart from '../CustomChart';
import { LoginComponent } from '../..';



const Brief_Chart = () => {

    const rr_dispatch = useDispatch();
    const rrd_params = useParams();
    // const [QButtonActive, setQButtonActive] = useState(quarterButton[0]);
    const [QuarterlyAllData, setQuarterlyAllData] = useState(null);
    
  
    let cmpId = rrd_params?.company_id;
    if (cmpId) {
      cmpId = window.atob(cmpId);
    }

    
const quarterlySelect = (quarter=10, data=Year20Data?.Data) => {


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

const {
  RatioMaster: { data: RMData  },
} = useSelector((state) => state.Masters);



useEffect(() => {
  console.log('SC_Data20_Req >>> ')
  let params = SC_Data20_Req;
      params = {
          ...params,
          CompanyId: cmpId,
          Param: RMData.filter(itm=>itm.is_selected === true).map(item=>item.Name),
          "ChartType": "Annually"
      }
      rr_dispatch(SCData20YearsApi([params]))
}, [])



useEffect(() => {

  if(!Year20Loading){
      quarterlySelect()
  }
  
}, [rr_dispatch, Year20Loading])

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
                            <div key={i} className={`h-[300px]`}>
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
            
    
      
    </>
  )
}

export default Brief_Chart
