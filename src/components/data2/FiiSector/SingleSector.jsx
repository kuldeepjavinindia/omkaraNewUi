import React from 'react'
import { Input , Button} from '@material-tailwind/react'
import LineChart from '../../data2/LineChart'





const SingleSector = () => {


 // Chart data
 

  return (
    <>
     <div className="flex items-center gap-2 mt-3">
     <div className= "mb-2 basis-4/12">
      <label className="text-[12px] text-[#000] font-medium ">Choose Single Sector
      </label>
        <Input
            type="text"
            name="chooseSector"
            placeholder='Choose Single Sector'
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 !h-8 rounded"
            labelProps={{
              className: "hidden",
            }}
            
            // onChange={handleChangeInput}
          />
</div>
    <div className= "mb-2">
      <label className="text-[12px] text-[#000] font-medium ">From </label>
        <Input
            type="date"
            name="formDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 !h-8 rounded"
            labelProps={{
              className: "hidden",
            }}
            
            // onChange={handleChangeInput}
          />
</div>
<div className= "mb-2">
      <label className="text-[12px] text-[#000] font-medium ">From </label>
        <Input
            type="date"
            name="toDate"
            className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 !h-8 rounded"
            labelProps={{
              className: "hidden",
            }}
            
            // onChange={handleChangeInput}
          />
</div>
              <div className='mt-[6px]'>
                <Button className="mr-1 bg-theme text-[#fff] py-2 px-3 rounded shadow-none ">APPLY</Button>
                <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-3 rounded shadow-none">RESET </Button>
                </div>
    </div>



 <div className="flex">
 <div className='overflow-auto basis-[220px]	'  style={{ height: `calc(100vh - 14rem)` }}>
    <table className="forensicTable min-w-full border border-collapse border-[#B3B3B3]"  >
    <thead>
      <tr className="!bg-[#1E233A] ">
        <th className="!text-white py-3 px-3 text-[12px] xl:text-[13px] font-semibold  whitespace-nowrap"> DATE </th>
        <th className="!text-white py-3 px-3 text-[12px] xl:text-[13px] font-semibold  whitespace-nowrap"> VALUES(In Cr)</th>
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-left ">1-15 Apr 22</td>
        <td className=" py-3 px-3 py-3 px-3 whitespace-nowrap text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
      </tr>
   
    </tbody>
   
  </table>
    </div>
    {/* End table */}

{/* ========== Start Chart ============= */}
    <div>
     <LineChart/>
    </div>
    {/* ========== End Chart ============= */}

 </div>
 {/* End main */}
    </>
  )
}

export default SingleSector