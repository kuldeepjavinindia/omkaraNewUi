import { Button, Typography } from "@material-tailwind/react";
import FinalOutPut from "./Components/FinalOutPut";
import AnnualReport from "./Components/AnnualReport";
import ConcallTranscripts from "./Components/ConcallTranscripts";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

const Cilent_Docs = () => {
  const {
    // UploadDocument, 
    setUploadDocument
  } = useContext(GlobalContext)
  return (
    <div className=" text-black">
      <div className="flex items-center justify-between">
        <Typography className="text-xl font-semibold">Documents</Typography>
        <Button className="bg-theme text-white py-2 rounded" onClick={()=>{
          setUploadDocument(true)
        }}>
          UPLOAD DOCUMENT
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <FinalOutPut />
        <AnnualReport />
        <ConcallTranscripts />
      </div>
    </div>
  );
};

export default Cilent_Docs;
