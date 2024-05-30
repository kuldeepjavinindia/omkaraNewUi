import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
  } from "@material-tailwind/react";
  import { ForensicTabsShowHideApi } from "../../../store/slice/SingleCompnaySlice";
  import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForensicData from "./ForensicData";


function TabsDefault () {

    const rrd_params = useParams();
    const dispatch  = useDispatch();
    const [forensicDataType, setForensicDataType] = useState()

    let cmpId = rrd_params?.company_id;
    if(cmpId){
       cmpId = window.atob(cmpId);
    }

const companyId = cmpId;

const {
    ForensicTabShowHide:{ data: ForensicTabShowHideData, loading: ForensicTabShowHideLoading},
    ForensicTabShowHide: ssss
  } = useSelector(state=>state.SingleCompany)


useEffect(()=> {
    if(ForensicTabShowHideLoading){
      dispatch(ForensicTabsShowHideApi({companyID: cmpId}))
    }
    if(!ForensicTabShowHideLoading){
      console.log("ddfs 555", ForensicTabShowHideLoading);
    }
    
    
  }, [dispatch, ForensicTabShowHideLoading])

const handleTab = (type)=> {
    setForensicDataType(type)
}


return (
    <>
   
     <Tabs value="1" className="">
        <TabsHeader
          className="p-0 font-semibold tabs-header gap-2 "
          indicatorProps={{
            className: "  bg-transpare shadow-none !text-gray-900 !font-bold rounded ",
          }}
        >

          {ForensicTabShowHideData?.Data && ForensicTabShowHideData?.Data.length &&  ForensicTabShowHideData?.Data.map((item, index) => (
            <Tab key={item.id} value={item.type} className=" bg-[#D9DDF0] border-0 text-sm whitespace-nowrap text-[12px] font-semibold !border !border-[1px] border-theme rounded"  
            onClick={()=> handleTab(item.type)}
            >
               {item.title}
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody>
          {ForensicTabShowHideData?.Data && ForensicTabShowHideData?.Data &&  ForensicTabShowHideData?.Data.map((item, index) => (
            <TabPanel key={item.id} value={item.type} className=" bg-theme-c5">
                <ForensicData  type = {item.type} title = {item.title} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
);

}


const Forensic_Main = ()=> {

  const rrd_params = useParams();
  const dispatch  = useDispatch();
  const [forensicDataType, setForensicDataType] = useState()

  let cmpId = rrd_params?.company_id;
  if(cmpId){
     cmpId = window.atob(cmpId);
  }


  const [ActiveSHTab, setActiveSHTab] = useState({});
  const [activeButton, setActiveButton] = useState()

const companyId = cmpId;

const {
  ForensicTabShowHide:{ 
    data: TabsData, 
    loading: ForensicTabShowHideLoading
  }
} = useSelector(state=>state.SingleCompany)


useEffect(()=> {
  if(ForensicTabShowHideLoading){
    dispatch(ForensicTabsShowHideApi({companyID: cmpId}))
  }
  if(!ForensicTabShowHideLoading){
    setActiveSHTab(TabsData?.[0]); 
    
let activebtn = ActiveSHTab.title;
  }
  
  
}, [dispatch, ForensicTabShowHideLoading])




    return (
        <>
        {
          TabsData && TabsData.length > 0 && TabsData.map(item=>{
            return (
              <>
                <Button size="sm" onClick={()=>setActiveSHTab(item)}  
                 className=   { item.title == ActiveSHTab.title ? "text-[#4448F5] bg-[#D9DDF0] border border-[#4448F5] rounded-[4px] font-bold" : "text-[#5D5F60] bg-transparent shadow-none font-semibold"}
                 >
                  {item.title}
                </Button>
              </>
            )
          })
        }

            <div> 
            <ForensicData ActiveSHTab={ActiveSHTab} />
           </div>

          
           
        </>
    )
}


export default Forensic_Main