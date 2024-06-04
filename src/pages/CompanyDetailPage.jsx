import { HiOutlineDocumentAdd } from "react-icons/hi";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
  Button,
} from "@material-tailwind/react";
import {
  CD_Main,
  Client_Docs,
  ExchangeReports,
  Financial_Main,
  StockChart_Main,
  Notes_Main,
  Brief_Main,
  Forensic_Main,
  MediaRoom_Main,
  AddNotesModal,
} from "../components/CompanyDetail";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { DateACEApi, companyNotesAPI } from "../store/slice/SingleCompnaySlice";
import { TrendlyneReq, companyNotesReq } from "../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { OverviewAPI } from "../store/slice/TrendlyneSlice";
import moment from "moment";
import BarChartModal from "../components/CompanyDetail/CustomChart/BarChartModal";
import { GlobalContext } from "../context/GlobalContext";

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

const CompanyDetailPage = () => {
  const [ActiveTab, setActiveTab] = useState("1");

  const rr_dispatch = useDispatch();
  const rrd_params = useParams();

  const { AddNote, setAddNote } = useContext(GlobalContext);

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const {
    companyNotes: { loading: cmpNotesLoading, data: cmpNotesData },
  } = useSelector((state) => state.SingleCompany);

  let intervalFun = () => {
    setInterval(() => {
      let compSlug =
        cmpNotesData.Data?.[0]?.NSEcode || cmpNotesData.Data?.[0]?.BSEcode;
      let params = TrendlyneReq;
      params = {
        ...params,
        compSlug: compSlug,
      };
      // console.log('10s >>> hello')
      if (compSlug) {
        rr_dispatch(OverviewAPI(params));
      }
    }, 10000);
  };

  useEffect(() => {
    // console.log('rrd_params >>> ', rrd_params)
    if (cmpNotesLoading) {
      let params = companyNotesReq;
      params = {
        ...params,
        CompanyID: cmpId,
      };
      rr_dispatch(companyNotesAPI(params));
    }
    if (!cmpNotesLoading) {
      let compSlug =
        cmpNotesData.Data?.[0]?.NSEcode || cmpNotesData.Data?.[0]?.BSEcode;
      let params = TrendlyneReq;
      params = {
        ...params,
        compSlug: compSlug,
      };
      if (compSlug) {
        console.log("params >>> ", params);
        rr_dispatch(OverviewAPI(params));
      }
    }
  }, [cmpNotesLoading]);


  useEffect(() => {
    const format = "HH:mm:ss";

    if (window.location.hostname === "omkaradata.com") {
      const time_0 = moment().format(format);
      const time = moment(time_0, format);
      const beforeTime = moment("09:14:59", format);
      const afterTime = moment("15:59:59", format);
      if (time.isBetween(beforeTime, afterTime)) {
        if (
          cmpNotesData.Data?.[0] &&
          Object.keys(cmpNotesData.Data?.[0]).length > 0
        ) {
          intervalFun();
        }
      }
    }
  }, [cmpNotesData.Data?.[0]]);



  useEffect(() => {
      rr_dispatch(DateACEApi())
  }, [])
  

  
  const TypeTabs = [
    {
      value: "1",
      label: cmpNotesData.Data?.[0]?.CompanyName,
      desc: (
        <>
          <CD_Main />
        </>
      ),
    },
    {
      value: "9",
      label: "Financial",
      desc: (
        <>
          <Financial_Main />
        </>
      ),
    },
    {
      value: "2",
      label: "Chart",
      desc: (
        <>
          <StockChart_Main />
        </>
      ),
    },
    {
      value: "3",
      label: "Brief",
      desc: (
        <>
          <Brief_Main />
        </>
      ),
    },
    {
      value: "4",
      label: "Client Docs",
      desc: (
        <>
          <Client_Docs />
        </>
      ),
    },
    {
      value: "5",
      label: "Exchange & Reports",
      desc: (
        <>
          <ExchangeReports />
        </>
      ),
    },
    {
      value: "6",
      label: "Forensic",
      desc: (
        <>
          {" "}
          <Forensic_Main />{" "}
        </>
      ),
    },
    {
      value: "7",
      label: "Notes",
      desc: (
        <>
          <Notes_Main />
        </>
      ),
    },
    {
      value: "8",
      label: "Media Room",
      desc: (
        <>
          {" "}
          <MediaRoom_Main />{" "}
        </>
      ),
    },
  ];

  if (cmpNotesLoading) {
    return <Spinner className="w-12 h-12" />;
  }

  return (
    <>
      <BarChartModal />
      <AddNotesModal />
      
      <div className="sc-container relative">
        <div className=" absolute right-2 top-1 z-[2]">
          <Button
            size="sm"
            variant="outlined"
            className="p-0 px-2 py-1 border-theme text-theme shadow-none rounded-md text-[10px] flex gap-0.5"
            onClick={()=>{
              setAddNote(!AddNote)
            }}
          >
            <HiOutlineDocumentAdd size={13} />
            Add Note
          </Button>
        </div>
        <TabsDefault
          TabsData={TypeTabs}
          ActiveTab={ActiveTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
};

export default CompanyDetailPage;
