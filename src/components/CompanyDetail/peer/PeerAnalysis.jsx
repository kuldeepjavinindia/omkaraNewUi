import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PeerAnalysisApi } from "../../../store/slice/SingleCompnaySlice";
import CustomChart from "../CustomChart";
import PeerToPeerTrendChooseField from "./PeerToPeerTrendChooseField";

const PeerAnalysis = () => {
  const [PeerToPeerDataChartType, setPeerToPeerDataChartType] = useState(null);
  const [PeerToPeerData, setPeerToPeerData] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const [RatioObj, setRatioObj] = useState(null);
  const [ShowRatioObj, setShowRatioObj] = useState(null);




  const rr_dispatch = useDispatch();
  const rrd_params = useParams();
  const {
    PeerAnalysis: { data: PeerAnalysisData, loading: PeerAnalysisLoading },
  } = useSelector((state) => state.SingleCompany);

  const {
    RatioMaster: { data: RMData, loading: RMLoading },
  } = useSelector((state) => state.Masters);


    

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const applyAction = (chartType, companies) => {
    let companies1 = companies;
    setShowRatioObj(RatioObj)
    // var companies0 = companies1.unshift(cmpId);
    rr_dispatch(
      PeerAnalysisApi({
        CompanyId: cmpId,
        userid: 1,
        param: [chartType],
        CompanyParam: companies1,
      })
    );
    let pData = RMData.find((itm) => itm.ID === chartType);
    setPeerToPeerDataChartType(pData);
  };




  
  useEffect(() => {
    if (!PeerAnalysisLoading) {
        let qData = PeerAnalysisData.Data;
        let demo0 = [];
        let title = null;
        if (qData && qData.length > 0) {
            qData = qData[0];
            Object.keys(qData).map((item, i) => {
                var demo1 = { cat: [], value: [], title: title, typeFor: 20 };
                if (item !== '$id' && item !== '_MainHeader') {
                    var itemQData = qData[item];
                    // var a = 0;
                    Object.keys(itemQData).map((subItem) => {

                        if (subItem !== '$id') {
                            if (subItem === '_chartName') {
                                demo1.title = title = itemQData[subItem]?.Name;
                            } else {
                                    demo1.cat = [...demo1.cat, itemQData[subItem]?.Name]
                                    var value1 = itemQData[subItem]?.Value?parseFloat(itemQData[subItem]?.Value):null;
                                    demo1.value = [...demo1.value, value1]
                            }
                        }
                    });
                    demo0[item] = demo1;
                }
            })
            setPeerToPeerData(demo0)
        }
    }
}, [rr_dispatch, PeerAnalysisLoading])





  return <>
  

<PeerToPeerTrendChooseField
// setTypeActivePrimaryBtn={setTypeActivePrimaryBtn} TypeActivePrimaryBtn={TypeActivePrimaryBtn} 
  selectedValue={selectedValue}
  setSelectedValue={setSelectedValue}
  RatioObj={RatioObj}
  setRatioObj={setRatioObj}
  applyAction={applyAction}
/>

{/* 
  {
    JSON.stringify(selectedValue)
  }
*/}
{
  ShowRatioObj && (
    <div className="text-center mt-4 mb-2 text-[1.2rem] text-black">
        <h3 className=" font-medium">Selected Chart Type: <span className=" font-bold"><b>{ShowRatioObj?.Name}</b></span></h3>
    </div>
  )
}
  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                
                {
                    PeerToPeerData && Object.keys(PeerToPeerData).map((item, i)=>{
                        let obj = PeerToPeerData[item];
                        return (
                            <div key={i} className={`h-[330px]`}>
                                
                            <div className="h-8">
                                <div className="text-center">
                                    <h4 className=" font-semibold text-[15px] text-black">
                                    {obj?.title}
                                    </h4>
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


  
  
  
  </>;
};

export default PeerAnalysis;
