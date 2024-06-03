import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function DeleteDataModal(props) {

    const {
        ModalTitle,
        OpenModal,
        setOpenModal,
        onClick,
        children
    } = props
//   const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => {
    setOpenModal(null)
  }
  
  useEffect(() => {
    console.log('====================================');
    console.log('props > ', props);
    console.log('====================================');
  }, [])
  
 
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog size="sm" open={OpenModal?.ID} handler={()=>handleOpen()}>
        <DialogHeader className=" text-red-400 border-b border-gray-300" >{ModalTitle || ""}</DialogHeader>
        <DialogBody>
          {children}    
        </DialogBody>
        <DialogFooter className="border-t border-gray-300">
          <Button
            variant="text"
            color="green"
            onClick={()=>handleOpen()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={onClick}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}