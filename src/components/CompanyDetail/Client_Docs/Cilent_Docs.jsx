import { Button, Typography } from "@material-tailwind/react";
import FinalOutPut from "./Components/FinalOutPut";
import AnnualReport from "./Components/AnnualReport";
import ConcallTranscripts from "./Components/ConcallTranscripts";

const Cilent_Docs = () => {
  return (
    <div className=" text-black">
      <div className="flex items-center justify-between">
        <Typography className="text-xl font-semibold">Client Docs</Typography>
        <Button className="bg-theme text-white py-2 rounded">
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
