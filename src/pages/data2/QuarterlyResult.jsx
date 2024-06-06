// import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";

import {AbsResult, Results} from '../../components/QuarterlyResult/Index'

import { useEffect } from "react";
import { useState } from "react";
import FilterQuarterlyResult from "../../components/data2/FilterQuarterlyResult";



function TabsDefault(props) {
  const { TabsData, ActiveTab, setActiveTab } = props;
  return (
    <>
      <Tabs value="1" className="cd-tabs">
        <TabsHeader
          className="p-0 bg-white tabs-header"
          indicatorProps={{
            className:
              "bg-theme-c5 shadow-none !text-gray-900  border-theme-c6 border-[1px] border-b-0 rounded-none main-tab-indicator top-[1px]",
          }}
        >
          {TabsData.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`text-sm whitespace-nowrap ${
                ActiveTab === value ? "text-theme font-semibold" : ""
              }`}
            >
              {label}
            </Tab>
        ))}
        </TabsHeader>
        <TabsBody>
          {TabsData.map(({ value, desc }) => (
            <TabPanel
              key={value}
              value={value}
              className="border-[1px] border-theme-c6 bg-theme-c5"
            >
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}

const QuarterlyResult = () => {
  const [ActiveTab, setActiveTab] = useState("1");

  const TypeTabs = [
    {
      value: "1",
      label: "ABS RESULTS",
      desc: (
        <>
        <AbsResult/>
        </>
      ),
    },
    {
      value: "2",
      label: "Results(%)",
      desc: (
        <>
          <Results/>
        </>
      ),
    },
  ];


  return (
    <>
   
          <div className=" pt-2 FilterSidebar-Content-Layout" >
          <FilterQuarterlyResult/>

     <div className="sc-container ">
        <TabsDefault
          TabsData={TypeTabs}
          ActiveTab={ActiveTab}
          setActiveTab={setActiveTab}
        />
      </div>

    </div>
    </>
  );
};

export default QuarterlyResult;
