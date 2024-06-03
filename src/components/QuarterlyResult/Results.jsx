import { Typography, Input, Select, Option } from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";

const Results= ()=> {
    return (
        <>
        <div className="flex items-center justify-between ">

        <div className="flex w-[70%]">
          <div>
            <Typography className="text-[12px] font-medium text-[#000]">SHOWING <span className="text-theme">1 to 10 of 10</span>  ENTRIES</Typography>
          </div>
        
          <Input
            type="text"
            placeholder="Search Company"
            className="mt-1 !border !border-gray-200 !h-8 !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            icon={
              <CgSearch
                size={19}
                className=" text-gray-400 top-0 absolute"
              />
            }
          />
<div className="smallInput">
<Select className="bg-[#fff] !h-8">
        <Option>Option 1</Option>
      </Select>
</div>


        </div>

        <div className="w-[30%]">
          pagination
       </div>

        </div>
        {/* End Header */}


        {/*Start  Table  */}
<div className="mt-8">
 <table className=" w-full ">
 <thead >
 <tr className="!bg-[#22242F]">
    <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">COMPANY NAME</th>
    <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">SECTOR</th>
    <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">MCap (Cr )</th>
    
  </tr>
 </thead>

 <tbody>
  <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
    <td> Bharat Dynamics Ltd.</td>
    <td className=""> Agri</td>
    <td className=""> 10204</td>
  </tr>

 </tbody>

 </table>
</div>
{/*Start  Table  */}
        



        </>
    )
}

export default Results;