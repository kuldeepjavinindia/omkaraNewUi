import { createContext, useState } from "react";
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {


  const [DIR_Model, setDIR_Model] = useState(null)
  const [SelectedDIR, setSelectedDIR] = useState(null)
  const [AddNote, setAddNote] = useState(false)

  const [UploadDocument, setUploadDocument] = useState(false)
  const [SendNotification, setSendNotification] = useState(null) //SendNotificationModal


  return (
    <GlobalContext.Provider value={{ 
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
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
