// import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";

import { AbsResult, Results } from "../../components/QuarterlyResult/Index";
import { useEffect } from "react";
import { useState } from "react";
import FilterQuarterlyResult from "../../components/data2/FilterQuarterlyResult";
import { FilterChipsMain } from "../../components";
import FilterItemChips from "../../components/data2/FilterItemChips";
import { ResultDataApi , ResultDataSheet2Api} from "../../store/slice/Data2Slice";
import {QuterltyResultFinalReq} from '../../constants/helper'
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function TabsDefault(props) {
  const { TabsData, ActiveTab, setActiveTab } = props;

  const {filterDataChip} = useContext(GlobalContext);
 console.log(filterDataChip, "state get");

 const areAllValuesBlank = (obj) => {
  for (let key in obj) {
    if (obj[key].value1 !== "" || obj[key].value2 !== "") {
      return true; 
    }
  }
  return false; 
};


const dynamicHeight = areAllValuesBlank(filterDataChip) ? "calc(100vh - 12rem)" : "calc(100vh - 7rem)";


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
            style={{ minHeight: `${dynamicHeight}` }}

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
      label: "Abs Results",
      desc: (
        <>
          <AbsResult />
        </>
      ),
    },
    {
      value: "2",
      label: "Results(%)",
      desc: (
        <>
          <Results />
        </>
      ),
    },
  ];

  return (
    <>
      <div className=" pt-2 FilterSidebar-Content-Layout">
        
        <FilterQuarterlyResult />

        <div className="sc-container ">
          {/* <FilterChipsMain /> */}
          <FilterItemChips  dispatchName = {ResultDataApi} dispatchName2 = {ResultDataSheet2Api}    finalRquest = {QuterltyResultFinalReq} />
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
