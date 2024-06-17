 
import { Button, ButtonGroup, Dialog, DialogBody, DialogHeader, DialogFooter, Typography, Input, Select, Option } from '@material-tailwind/react';
import { useContext, useState } from 'react';
// import BulkDealTableModal from '../../data2/BulkBlock/BulkDealTableModal';
// import InsiderTableModal from '../../data2/Insider/InsiderTableModal';
import BulkDealTableModal from '../../data2/BulkBlock/BulkDealTableModal';
import InsiderTableModal from '../../data2/Insider/InsiderTableModal';
import { GlobalContext } from '../../../context/GlobalContext';


const BulkDealInsiderModal = (
  
)=> {

  

      const {
        BulkDealInsiderModalBtn, setBulkDealInsiderModalBtn
      } = useContext(GlobalContext)
  
    const handleClose = () => {setBulkDealInsiderModalBtn(!BulkDealInsiderModalBtn)};

    const Buttons = [
        {
            id: 1,
            name: "INSIDER TRADERS",
            value: 1 ,
            component: (
              <>
                <InsiderTableModal />
              </>
            )
        },
        {
            id: 2,
            name: "BULK DEAL",
            value: 2,
            component: (
              <>
                <BulkDealTableModal />
              </>
            )
        },
        {
            id: 3,
            name: "BLOCK DEALS",
            value: 3,
            component: (
              <>
                <BulkDealTableModal />
              </>
            )
        }
    ]

    const[active, setActive] =  useState(Buttons[0])


const handleButton = (item) => {
    setActive(item)
}


    return (
        <>
      <div >
      <Dialog
        open={BulkDealInsiderModalBtn?.type}
        // handler={handleClose}
        size="xl"
      >

        {/* {
          JSON.stringify(BulkDealInsiderModalBtn)
        } */}
        <DialogHeader className='w-[95%] mx-auto justify-between items-start font-semibold'> 
        <div>
        <Typography className='text-[20px] text-[#000] font-bold mb-4'>{BulkDealInsiderModalBtn?.companyName}</Typography>
        <ButtonGroup className=" border-[1px] border-gray-400 rounded-lg mb-3 w-fit">
            {Buttons.map((item, i) => {
              return (
                <Button
                  key={i}
                  className={`py-2 border-none ${
                    item.value == active.value
                      ? "bg-[#22242F] text-white"
                      : "bg-white text-[#606F7B]"
                  }  `}
                  onClick={() => {
                    handleButton(item);
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
            onClick={handleClose}
            className="mr-1 bg-theme text-[#fff] py-2  rounded"> GO BACK </Button>
            </div>
         </DialogHeader>

        <DialogBody className='w-[95%] mx-auto pt-0'>
      
          {active?.component}

          
      {/* {
        active === 1 ? <InsiderTableModal/>  : active === 2 ? <BulkDealTableModal/> : (
            <div className='flex justify-center'>
                <Typography className='text-[#818186] text-[20px] font-semibold'>
                  Data Not available!
                </Typography>
            </div>
        )
      } */}
         

        </DialogBody>

      </Dialog>
      </div>
        </>
    )
}

export default BulkDealInsiderModal;



