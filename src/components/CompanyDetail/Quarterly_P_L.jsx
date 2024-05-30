import { Button, ButtonGroup } from "@material-tailwind/react";
import { useRef, useState } from "react";
import Quarterly_P_L_Chart from "./Quarterly_P_L_Chart";
import Quarterly_P_L_Segment from "./Quarterly_P_L_Segment";
import Quarterly_P_L_Result from "./Quarterly_P_L_Result";
import Quarterly_P_L_LastQuarter from "./Quarterly_P_L_LastQuarter";

const Quarterly_P_L = () => {

  const childRef = useRef(null);

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
  const primaryButton = [
    {
      label: "Consolidate",
      isConStd: true,
      value: "con",
      id: "1",
    },
    {
      label: "Standalone ",
      value: "std",
      id: "2",
    },
  ];

  const [PrimaryBtn, setPrimaryBtn] = useState(primaryButton[0]);

  const [UpdateRightSideTabs, setUpdateRightSideTabs] = useState(RightSideTabs);

  const secondaryButton = [
    {
      label: "Result",
      component: (
        <>
          <Quarterly_P_L_Result ref={childRef}
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

  return (
    <>
      <div className="flex justify-between mb-2">
        <div>
          {
            secondaryButton.map((itm, i)=>{
              if(itm.id == SecondaryBtn.id){
                let keyName = `tab_${i+1}`;
                let tabBtnData = UpdateRightSideTabs[keyName];
                // console.log('tabBtnData >> ', tabBtnData)
                
                return (
                  <div className="flex gap-2 mb-4" key={i}>
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
            Quarterly Segment {`"${PrimaryBtn?.label}"`} (showing data from last
            12 quarters)
          </div>
        </div>
        <div>
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

          <div className="flex text-[12px] justify-between text-black">
            <div className=" font-medium">Updated On 25-04-2024 23:55</div>
            <div className=" font-bold">(In Cr.)</div>
          </div>
        </div>
      </div>
      <div>{SecondaryBtn.component}</div>
    </>
  );
};

export default Quarterly_P_L;
