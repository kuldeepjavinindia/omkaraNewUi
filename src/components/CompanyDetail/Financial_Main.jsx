import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Quarterly_P_L from "./Quarterly_P_L";
import { useState } from "react";
import AnnalPL_Main from "./AnnalPL/AnnalPL_Main";
import BalanceSheet_Main from "./BalanceSheet/BalanceSheet_Main";
import CashFlows_Main from "./CashFlows/CashFlows_Main";
import RatioComponent from "./Ratio/Ratio";
import ShareholdingComponent from "./Shareholding/ShareholdingComponent";
   
// QUARTERLY P&L
// ANNAL P&L
// BALLANCE SHEET
// CASH FLOWS
// RATIOS
// PEERS
// SHAREHOLDING %

  export function TabsDefault({
    ActiveTab, setActiveTab
  }) {


    const data = [
      {
        label: "QUARTERLY P&L",
        value: "1",
        desc: (
            <>
                <Quarterly_P_L />
            </>
        ),
      },
      {
        label: "ANNAL P&L",
        value: "2",
        desc: (
          <>
            <AnnalPL_Main />
          </>
        ),
      },
      {
        label: "BALLANCE SHEET",
        value: "3",
        desc: (
          <>
          <BalanceSheet_Main />
          </>
        ),
      },
      {
        label: "CASH FLOWS",
        value: "4",
        desc: (
          <>
            <CashFlows_Main />
          </>
        ),
      },
      {
        label: "RATIOS",
        value: "5",
        desc: (
          <>
            <RatioComponent />
          </>
        ),
      },
      {
        label: "PEERS",
        value: "6",
        desc: `PEERS`,
      },
      {
        label: "SHAREHOLDING %",
        value: "7",
        desc: (
          <>
            <ShareholdingComponent />
          </>
        ),
      },
    ];
   
    return (
      <Tabs value="1">
        <TabsHeader className="" 
            indicatorProps={{
                className: "bg-theme-c2 text-theme shadow-none border-theme border-[1px]",
            }}
          >
          {data.map(({ label, value }) => (
            <Tab
                className={`w-fit text-[13px] font-medium ${ActiveTab === value ? "text-theme font-semibold" : ""}`} key={value} value={value} onClick={() => setActiveTab(value)}
                
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }


const Financial_Main = () => {

  
  const [ActiveTab, setActiveTab] = useState(1)

  return (
    <>
      <TabsDefault ActiveTab={ActiveTab} setActiveTab={setActiveTab} />
    </>
  )
}

export default Financial_Main
