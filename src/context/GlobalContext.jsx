import { createContext, useRef, useState } from "react";
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [DIR_Model, setDIR_Model] = useState(null);
  const [SelectedDIR, setSelectedDIR] = useState(null);
  const [AddNote, setAddNote] = useState(false);

  const [UploadDocument, setUploadDocument] = useState(false);
  const [SendNotification, setSendNotification] = useState(null); //SendNotificationModal
  const [AddVideo, setAddVideo] = useState(null); //SendNotificationModal
  const [ThemeDrawer, setThemeDrawer] = useState(null); //SendNotificationModal
  const [ReportBankDrawer, setReportBankDrawer] = useState(null); //SendNotificationModal
  const [PeersModal, setPeersModal] = useState(null); //SendNotificationModal
  const [BulkDealInsiderModalBtn, setBulkDealInsiderModalBtn] = useState(null); //SendNotificationModal
  const [RepoListParams, setRepoListParams] = useState({
    "page": 1,
    "order": "asc",
    "order_column": "CompanyName",
    "search": "",
    "numPerPage": "100"
  }); 


  

  const PeersBtnRef1 = useRef(null); //SendNotificationModal
  const PeersBtnRef2 = useRef(null); //SendNotificationModal

  return (
    <GlobalContext.Provider
      value={{
        RepoListParams, setRepoListParams,
        BulkDealInsiderModalBtn, setBulkDealInsiderModalBtn,
        ReportBankDrawer,
        setReportBankDrawer,
        PeersBtnRef1,
        PeersBtnRef2,
        // setPeersAnalyticsCancel,
        PeersModal,
        setPeersModal,
        ThemeDrawer,
        setThemeDrawer,
        AddVideo,
        setAddVideo,
        SendNotification,
        setSendNotification,
        UploadDocument,
        setUploadDocument,
        DIR_Model,
        setDIR_Model,
        SelectedDIR,
        setSelectedDIR,
        AddNote,
        setAddNote,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
