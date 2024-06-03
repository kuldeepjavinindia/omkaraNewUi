import { createContext, useState } from "react";
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {


  const [DIR_Model, setDIR_Model] = useState(null)
  const [SelectedDIR, setSelectedDIR] = useState(null)
  const [AddNote, setAddNote] = useState(false)


  return (
    <GlobalContext.Provider value={{ 
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
