import React from 'react'
import { Input , Button} from '@material-tailwind/react'

const AllSector = () => {
  return (
    <>

    <div className="flex items-center gap-2 mt-3">
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

 



  {/* Start Table */}
  <div className="mt-8 w-full data2Tabels  overflow-x-auto  ">
  <table className=" w-full border-collapse">
    <thead>
      <tr className="!bg-[#1E233A]">
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold text-left "> PARTICULARS </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold  "> 1-15 Apr 22 </th>
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className=" text-[12px] xl:text-[13px] text-[#606F7B] font-semibold text-left ">Automobile and Auto Components</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        
      </tr>

      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className=" text-[12px] xl:text-[13px] text-[#606F7B] font-semibold text-left ">Automobile and Auto Components</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        
      </tr>

      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className=" text-[12px] xl:text-[13px] text-[#606F7B] font-semibold text-left ">Automobile and Auto Components</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">Net</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        <td className=" text-[12px] xl:text-[13px] text-[#2D2D35] font-semibold text-right">10204</td>
        
      </tr>
   
    </tbody>
   
  </table>
</div>
  {/* End Table */}




    </>
  )
}

export default AllSector