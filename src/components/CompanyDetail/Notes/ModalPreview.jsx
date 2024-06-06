import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const ModalPreview = ({setOpen, open, setSelectedItem, selectedItem}) => {

    // const {
    //     BarChartData: {
    //         Columns_Rows,
    //         Open: BarOpen,
    //         isPercentage: isPercentageBar
    //     }
    // } = useSelector((state) => state.SingleCompany);

    
    const [Option, setOption] = useState(null);
    const [IsChart, setIsChart] = useState(false);

    const rr_dispatch = useDispatch();


      
    const handleOpen = () => setOpen(!open);
useEffect(() => {
  console.log('selectedItem >> ', selectedItem);
}, [selectedItem])


  return (
    <>
       <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        // animate={{
        //   mount: { scale: 1, y: 0 },
        //   unmount: { scale: 0.9, y: -100 },
        // }}
      >
        <DialogHeader className='pb-2 border-b border-gray-300'>{selectedItem?.Heading} </DialogHeader>
        <DialogBody className="max-h-[42rem] overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: selectedItem?.Discription }}></div>
        {/* {
                    IsChart ? (
                        <HighchartsReact
                            containerProps={{ style: { height: "100%" } }}
                            highcharts={Highcharts}
                            // constructorType={"stockChart"}
                            options={Option}
                        />

                    )
                    :
                    <Typography>Loading...</Typography>
                } */}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
                fullWidth
            onClick={handleOpen}
            className="bg-theme text-white"
          >
            <span>Go Back</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default ModalPreview
