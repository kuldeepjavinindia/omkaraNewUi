 
import { Button, ButtonGroup, Dialog, DialogBody, DialogHeader, DialogFooter, Typography, Input, Select, Option } from '@material-tailwind/react';
import { useState } from 'react';
// import BulkDealTableModal from '../../data2/BulkBlock/BulkDealTableModal';
// import InsiderTableModal from '../../data2/Insider/InsiderTableModal';
import BulkDealTableModal from './../../data2/BulkBlock/BulkDealTableModal';
import InsiderTableModal from './../../data2/Insider/InsiderTableModal';


const BulkDealInsiderModal = ({open, setOpen})=> {

      const[active, setActive] =  useState(1)

  
    const handleOpen = () => setOpen(!open);

    const Buttons = [
        {
            id: 1,
            name: "INSIDER TRADERS",
            value: 1
        },
        {
            id: 2,
            name: "BULK DEAL",
            value: 2
        },
        {
            id: 3,
            name: "BLOCK DEALS",
            value: 3
        }
    ]


const handleButton = (vlaue) => {
    setActive(vlaue)
}


    return (
        <>
      <div >
      <Dialog
        open={open}
        // handler={handleOpen}
        size="xl"
      >
        <DialogHeader className='w-[95%] mx-auto justify-between items-start font-semibold'> 
        <div>
        <Typography className='text-[20px] text-[#000] font-bold mb-4'> Company Name </Typography>
        <ButtonGroup className=" border-[1px] border-gray-400 rounded-lg mb-3 w-fit">
            {Buttons.map((item, i) => {
              return (
                <Button
                  key={i}
                  className={`py-2 border-none ${
                    item.value == active
                      ? "bg-[#22242F] text-white"
                      : "bg-white text-[#606F7B]"
                  }  `}
                  onClick={() => {
                    handleButton(item.value);
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>

          <div>
            <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 bg-theme text-[#fff] py-2  rounded"> GO BACK </Button>
            </div>
         </DialogHeader>

        <DialogBody className='w-[95%] mx-auto pt-0'>
      
      {
        active === 1 ? <InsiderTableModal/>  : active === 2 ? <BulkDealTableModal/> : (
            <div className='flex justify-center'>
                <Typography className='text-[#818186] text-[20px] font-semibold'>
                Data Not available!
                </Typography>
            </div>
        )
      }
         

        </DialogBody>

      </Dialog>
      </div>
        </>
    )
}

export default BulkDealInsiderModal;



