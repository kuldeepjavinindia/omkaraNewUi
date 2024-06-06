import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';

const QuarterlyResultModal = ({setOpen, open}) => {

  
    const handleOpen = () => setOpen(!open);


  return (
    <>
       <Dialog
        open={open}
        // handler={handleOpen}
        size="sm"
      >
        <DialogHeader className='pb-0 block'> 
         <Typography className='text-[13px] text-[#666666] font-bold block'>Omkara Results Review</Typography>
         <Typography className='text-[24px] text-theme font-bold'>Godfrey Phillips India Ltd.</Typography>
        </DialogHeader>
        <DialogBody className=" overflow-auto">

       <Typography className='text-[15px] text-[#000] font-medium'>
       M-cap Rs 28,165 Cr, CMP Rs 1,106 (52W High Rs 1350, 52W Low at Rs 933) Sales at Rs 2978.0 Cr vs 2636.2 Cr QoQ vs Rs 2348.2 Cr YoY (Up <span className='text-[#34A853]'>13.0%</span> QoQ, Up <span className='text-[#34A853]'>26.68%</span> YoY) Gross Profit at Rs 2327 Cr vs 2081.9 Cr QoQ vs Rs 1757.4 Cr YoY (Up <span className='text-[#34A853]'>11.8%</span> QoQ, Up <span className='text-[#34A853]'>32.4%</span> YoY) Gross Profit Margin at <span className='text-[#34A853]'>78.1%</span> vs <span className='text-[#34A853]'>79.0%</span> QoQ vs <span className='text-[#34A853]'>74.0%</span> YoY EBIDTA at Rs 601 Cr vs Rs 283 Cr QoQ vs Rs 360 Cr YoY (Up <span className='text-[#34A853]'>112.6%</span> QoQ, Up <span className='text-[#34A853]'>67.0%</span> YoY) EBIDTA Margin at 20.2% vs 10.7% QoQ vs 15.3% YoY PAT at Rs 288 Cr vs Rs 12 Cr QoQ vs Rs 13 Cr YoY (Up 2346.9% QoQ, Up 2068.7% YoY) Stock is trading at TTM P/E of 105.09 x EPS Rs. 11.29.
       </Typography>
        
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
          
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default QuarterlyResultModal
