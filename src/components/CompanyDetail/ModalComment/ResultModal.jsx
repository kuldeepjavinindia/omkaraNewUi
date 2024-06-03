
import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography, Input, Select, Option } from '@material-tailwind/react';


const ResultModal = ({open, setOpen})=> {
  
    const handleOpen = () => setOpen(!open);


    return (
        <>
      <div >
      <Dialog
        open={open}
        // handler={handleOpen}
        size="xxl"
      >
        <DialogHeader className='w-[50%] mx-auto justify-center text-[15px] font-semibold'> ASSIGN COMPANY </DialogHeader>

        <DialogBody className='w-[50%] mx-auto pt-0'>
        <label className="text-[12px] text-[#000] font-medium">Company </label>
        <Input
            type="text"
            placeholder="Company"
            className=" !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
          />

     <label className="text-[12px]  text-[#000] font-medium">Sectors </label>
  <Select className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 "  >
        <Option>Option 1</Option>
      </Select>


        </DialogBody>
        <DialogFooter className='justify-start w-[50%] mx-auto pt-0'>
        <Button
            variant="text"
            className="mr-1 bg-theme text-[#fff] py-2 rounded"
          >
            <span>SUBMIT</span>
          </Button>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 rounded"
          >
            <span>CANCEL AND GO BACK </span>
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
        </>
    )
}

export default ResultModal;