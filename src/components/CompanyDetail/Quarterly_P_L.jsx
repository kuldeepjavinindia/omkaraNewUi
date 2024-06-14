import { Button, ButtonGroup } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Quarterly_P_L_Chart from "./Quarterly_P_L_Chart";
import Quarterly_P_L_Segment from "./Quarterly_P_L_Segment";
import Quarterly_P_L_Result from "./Quarterly_P_L_Result";
import Quarterly_P_L_LastQuarter from "./Quarterly_P_L_LastQuarter";
import { ConStdArray } from "../../constants/helper";
import { useSelector } from "react-redux";

const Quarterly_P_L = () => {


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
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
  

  return (
    <>
      <div className="flex justify-between mb-2">
        <div>
          {
            secondaryButton.map((itm, i)=>{
              if(itm.id == SecondaryBtn.id){
                let keyName = `tab_${i+1}`;
                let tabBtnData = UpdateRightSideTabs[keyName];
                
                return (
                  <div className="flex gap-2 mb-2" key={i}>
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
          
          <div className="text-black font-medium mb-2 text-[13px]">
            {
              SecondaryBtn.id == 2 && (
                <>
                  Quarterly Segment {`"${PrimaryBtn?.label}"`} { SCQtrSegmentData._Headers && SCQtrSegmentData._Headers.length > 0 && (
                    <>
                      (showing data from last {SCQtrSegmentData._Headers && SCQtrSegmentData._Headers.length-1} quarters)
                    </>
                  )}
                </>
              )
            }
          </div>
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
            className=" border-[1px] rounded-lg mb-4 shadow-none"
          >
            {secondaryButton.map((item, i) => {
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
