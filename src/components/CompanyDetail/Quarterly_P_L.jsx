import { Button, ButtonGroup } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Quarterly_P_L_Chart from "./Quarterly_P_L_Chart";
import Quarterly_P_L_Segment from "./Quarterly_P_L_Segment";
import Quarterly_P_L_Result from "./Quarterly_P_L_Result";
import Quarterly_P_L_LastQuarter from "./Quarterly_P_L_LastQuarter";
import { ConStdArray } from "../../constants/helper";
import { useDispatch, useSelector } from "react-redux";
import { SC_Data20_Req, SC_QResult_Req } from "../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { QuarterlyResultApi, SCData20YearsApi } from "../../store/slice/SingleCompnaySlice";
import { GlobalContext } from "../../context/GlobalContext";

const Quarterly_P_L = () => {
  const rr_dispatch = useDispatch()
  const rrd_params = useParams();
    

  const {
    QuarterBtn, setQuarterBtn
  } =  useContext(GlobalContext);


  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }



  const RightSideTabs = {
    tab_1: {
      activeType: "con",
      button_status: {
        con: false,
        std: false,
      },
      func: () => {}
    },
    tab_2: {
      activeType: "con",
      button_status: {
        con: false,
        std: false,
      },
      func: () => {}
    },
    tab_3: {
      activeType: "con",
      button_status: {
        con: false,
        std: false,
      },
      func: () => {}
    },
    tab_4: {
      activeType: "con",
      button_status: {
        con: false,
        std: false,
      },
      func: () => {}
    },
  };


  const {
    DateACE:{
      data: DateACEData,
      // loading: DateACELoading
    },
    SCQtrSegment: { data: SCQtrSegmentData },
  } = useSelector(state=>state.SingleCompany)
  
  const primaryButton = ConStdArray;

  const [PrimaryBtn, setPrimaryBtn] = useState(primaryButton[0]);
  const [UpdatedOnDate, setUpdatedOnDate] = useState(DateACEData?.intrim_result);

  const [UpdateRightSideTabs, setUpdateRightSideTabs] = useState(RightSideTabs);

  const secondaryButton = [
    {
      label: "Result",
      component: (
        <>
          <Quarterly_P_L_Result
            UpdateRightSideTabs={UpdateRightSideTabs} setUpdateRightSideTabs={setUpdateRightSideTabs}
          />
        </>
      ),
      value: "con",
      id: 1,
    },
    {
      label: "Segments",
      isConStd: true,
      component: (
        <>
          <Quarterly_P_L_Segment
            UpdateRightSideTabs={UpdateRightSideTabs} setUpdateRightSideTabs={setUpdateRightSideTabs}
          />
        </>
      ),
      value: "std",
      id: 2,
    },
    {
      label: "Latest Quarter",
      isConStd: true,
      component: (
        <>
          <Quarterly_P_L_LastQuarter
            UpdateRightSideTabs={UpdateRightSideTabs} setUpdateRightSideTabs={setUpdateRightSideTabs}
          />
        </>
      ),
      value: "std",
      id: 3,
    },
    {
      label: "Chart ",
      isConStd: true,
      component: (
        <>
          <Quarterly_P_L_Chart
            UpdateRightSideTabs={UpdateRightSideTabs} setUpdateRightSideTabs={setUpdateRightSideTabs}
          />
        </>
      ),
      value: "std",
      id: 4,
    },
  ];

  const [SecondaryBtn, setSecondaryBtn] = useState(secondaryButton[0]);


  const updatedOn = () => {
    let data = "132";
    if(SecondaryBtn.id === 2){
      data = "456";

    }
    return data
  }
  let a = [
    {
      id:"1",
      label:"Quarterly",
      months: '3',
      rightTabShow:[1,2,3,4]
    },
    {
      id:"2",
      label:"Half Yearly",
      months: '6',
      rightTabShow:[1,4]
    },
    {
      id:"3",
      label:"Annually",
      months: '12',
      rightTabShow:[1,4]
    }
  ]
  // const [QuarterBtn, setQuarterBtn] = useState(a[0])

  const tab_1 = UpdateRightSideTabs.tab_1;
  const qtrClick = (item) => {
    
    setQuarterBtn(item)
    let type = tab_1?.activeType
    let params = SC_QResult_Req;
    params = {
      ...params,
      CompanyId: cmpId,
      type: type,
      Qtr: item.months
    }
    rr_dispatch(QuarterlyResultApi(params))

    let params_2 = SC_Data20_Req;
    params_2 = {
        ...params_2,
        CompanyId: cmpId,
        type: type,
        Qtr: item.months
    }
    rr_dispatch(SCData20YearsApi([params_2]))



  }


  useEffect(() => {
    setQuarterBtn(a[0])
  }, [])
  

  return (
    <>



    
    <div className="">
    <ButtonGroup
            ripple={false}
            size="sm"
            className=" border-[1px] rounded-lg shadow-none"
          >
            {a.map((item, i) => {
              
                return (
                  <Button
                    key={i}
                    className={`border-none  shadow-none hover:shadow-none ${
                      QuarterBtn.id == item?.id
                        ? "bg-theme text-white"
                        : "bg-white text-[#606F7B]"
                    }  `}
                    onClick={()=>qtrClick(item)}
                  >
                    {item.label}
                  </Button>
                );
              
            })}
          </ButtonGroup>

      {/* {
        a.map((item, i) => {
          return (
            <Button className={`${
              QuarterBtn.id == item?.id
                ? "bg-theme"
                : "text-theme border-theme"
            }`} variant={`${QuarterBtn.id == item?.id ? "" : "outlined"}`} onClick={()=>qtrClick(item)}  key={i} size="sm"> {item.label}</Button>
          )
        })
      } */}
    </div>

      <div className="flex justify-between items-end mb-2">
        <div>
          {
            secondaryButton.map((itm, i)=>{
              if(itm.id == SecondaryBtn.id){
                let keyName = `tab_${i+1}`;
                let tabBtnData = UpdateRightSideTabs[keyName];
                
                return (
                  <div className="flex gap-x-2" key={i}>
                    {primaryButton.map((item, i) => (
                      <>
                        <Button
                          disabled={tabBtnData?.button_status[item?.value] ? false : true}
                          onClick={() => {
                            setPrimaryBtn(item);
                            let nTab_1 = tabBtnData;
                                nTab_1 = {
                                  ...nTab_1,
                                  activeType: item?.value
                                }
                            setUpdateRightSideTabs(prev=>({...prev, [keyName]: nTab_1}));
                            tabBtnData.func(item?.value);
                          }}
                          size="sm"
                          variant={`${tabBtnData.activeType == item?.value ? "" : "outlined"}`}
                          className={`${
                            tabBtnData.activeType == item?.value
                              ? "bg-theme"
                              : "text-theme border-theme"
                          }`}
                          key={i}
                        >
                          {item.label}
                        </Button>
                      </>
                      
                    ))}
                  </div>
                )
              }
            })
          }
          
          <>
            {
              SecondaryBtn.id == 2 && (
                <div className="text-black font-medium mb-2 text-[13px]">
                  Quarterly Segment {`"${PrimaryBtn?.label}"`} { SCQtrSegmentData._Headers && SCQtrSegmentData._Headers.length > 0 && (
                    <>
                      (showing data from last {SCQtrSegmentData._Headers && SCQtrSegmentData._Headers.length-1} quarters)
                    </>
                  )}
                </div>
              )
            }
          </>
        </div>
        <div>
          
        <div className="flex text-[12px] justify-between text-black">
            <div className=" font-medium">
              {
                (SecondaryBtn.id == 1) && (
                  <>
                  Updated On {DateACEData?.intrim_result}
                  </>
                )
              }
              {
                (SecondaryBtn.id == 2) && (
                  <>
                  Updated On {DateACEData?.QtrSeg}
                  </>
                )
              }
              {
                (SecondaryBtn.id == 3) && (
                  <>
                  Updated On {DateACEData?.QtrSeg}
                  </>
                )
              }
              
              </div>
              {
                (SecondaryBtn.id != 4) && (
                  <div className=" font-bold">(In Cr.)</div>
                )
              }
          </div>

          <ButtonGroup
            ripple={false}
            size="sm"
            className=" border-[1px] rounded-lg shadow-none"
          >
            {secondaryButton.map((item, i) => {
              if(QuarterBtn?.rightTabShow && QuarterBtn?.rightTabShow.includes(item.id)){
                return (
                  <Button
                    key={i}
                    className={`border-none  shadow-none hover:shadow-none ${
                      SecondaryBtn.id == item.id
                        ? "bg-[#22242F] text-white"
                        : "bg-white text-[#606F7B]"
                    }  `}
                    onClick={() => {
                      setSecondaryBtn(item);
                      
                    }}
                  >
                    {item.label}
                  </Button>
                );
              }
            })}
          </ButtonGroup>

        </div>
      </div>
      {
        (
          (UpdateRightSideTabs.tab_1.button_status.con === false && UpdateRightSideTabs.tab_1.button_status.std === false && SecondaryBtn.id == 1)
        ) && (
          <div className="text-lg font-semibold text-black">N.A.</div>
        )
      }
      {
        (
          (UpdateRightSideTabs.tab_2.button_status.con === false && UpdateRightSideTabs.tab_2.button_status.std === false && SecondaryBtn.id == 2)
        ) && (
          <div className="text-lg font-semibold text-black">N.A.</div>
        )
      }
      {
        (
          (UpdateRightSideTabs.tab_3.button_status.con === false && UpdateRightSideTabs.tab_3.button_status.std === false && SecondaryBtn.id == 3)
        ) && (
          <div className="text-lg font-semibold text-black">N.A.</div>
        )
      }
      {
        (
          (UpdateRightSideTabs.tab_4.button_status.con === false && UpdateRightSideTabs.tab_4.button_status.std === false && SecondaryBtn.id == 4)
        ) && (
          <div className="text-lg font-semibold text-black">N.A.</div>
        )
      }
      <div>{SecondaryBtn.component}</div>
      
    </>
  );
};

export default Quarterly_P_L;
