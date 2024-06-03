import {} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

const WatchListBulkUploadModal = (props) => {

  const { StatusOpen, setStatusOpen } = props;
  const {
    WLBulkUpload: { loading: WL_Loading, data: WLData },
  } = useSelector((state) => state.WatchList);

  const handleOpen = () => setStatusOpen(!StatusOpen);

  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={StatusOpen} handler={handleOpen}>
        <DialogHeader>{!WL_Loading ? "Output" : "Loading..."}</DialogHeader>
        <DialogBody>
          {!WL_Loading && (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <b>CodeAlreadyExist</b>:{" "}
                {WLData?.CodeAlreadyExist &&
                  WLData?.CodeAlreadyExist.join(", ")}
              </Typography>
              {WLData?.CodeNotInList && WLData?.CodeNotInList.length > 0 && (
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  <b>CodeNotInList</b>:{" "}
                  {WLData?.CodeNotInList && WLData?.CodeNotInList.join(", ")}
                </Typography>
              )}

              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <b>CompanyInserted</b>:{" "}
                {WLData?.CompanyInserted && WLData?.CompanyInserted}
              </Typography>

              {/* <Button sx={{ 
                    mt: 1.5
                 }} onClick={()=>{
                    window.location.reload()
                }} variant="contained" color='success'>Close</Button> */}

            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              window.location.reload();
            }}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default WatchListBulkUploadModal;
