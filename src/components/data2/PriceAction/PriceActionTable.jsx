import { Typography, Input, Select, Option , Checkbox, Button} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";


const PriceActionTable = ()=> {
    return (
        <>
        <div className="flex justify-between pb-2">
      <Typography className="text-[15px] text-[#000] font-semibold">
      Price Action
      </Typography>
      <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
      <SiMicrosoftexcel size={15} fill="#2E7A80"/>
      </span>
     </div>

      <div className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded" style={{ height: `calc(100vh - 7.5rem)` }}>

   <div className="flex flex-col h-full justify-between">
    <div>
       {/* ========= Start Header Page =========== */}
<div className="flex justify-between items-center">
  <div className="flex-grow-2 flex items-center gap-2 w-[60%]">
    <div>
      <Typography className="text-[11px] lg:text-[12px] font-semibold text-[#000]">
        SHOWING <span className="text-theme">1 to 10 of 10</span> ENTRIES
      </Typography>
    </div>
    <div className="flex-grow">
      <Input
        type="text"
        placeholder="Search Company"
        className="!border !border-gray-200 !h-8 !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
        icon={<CgSearch size={19} className="text-gray-400 top-[-2px] absolute" />}
      />
    </div>
  </div>

  <div className="flex-grow-0 flex justify-center mx-[14px] mt-[-4px]">
    <Select className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none"
     labelProps={{
          className: "hidden",
        }} value="Show 15">
      <Option>Option 1</Option>
    </Select>
  </div>

  <div className="flex-grow-1 ">

    <div className="flex gap-1">
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowBack size={16} />
    </Button>
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowBack size={16} />
      <IoIosArrowBack size={16} />
    </Button>
    <div className="w-[100px]">
      <Input
        type="text"
        defaultValue="1"
        size="md"
        className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
      />
    </div>
    <Button className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowForward />
    </Button>
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowForward />
      <IoIosArrowForward />
    </Button>
    </div>
    
  </div>
</div>
{/* ========= End Header Page =========== */}

<div className="">
  {/* Start Table */}
  <div className="mt-8 data2Tabels relative overflow-x-auto">
  <table className="forensicTable w-full border border-collapse border-[#B3B3B3] h-full">
    <thead className="bg-[#1E233A]">

      <tr className="!bg-[#1E233A] ">
        <th className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10  ">COMPANY NAME</th>
        <th className="sticky  left-[133px] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10 ">SECTOR</th>
        <th className="sticky  left-[190px]  border-r border-[#B3B3B3] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10 ">INDUSTRY</th>

        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
        <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Index
        </th>

        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
        <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  />LTP
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
        <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 52wk High
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Chg frm 52wk High(%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 52wk Low
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Chg frm 52wk Low(%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> PAT Growth QoQ (%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> PAT Growth YoY (%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> D/E
        </th>
       
      
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">Bharat Dynamics Ltd.</td>
        <td className="sticky  left-[133px] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Agri</td>
        <td className="sticky  left-[190px]  border-r border-[#B3B3B3] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">Bharat Dynamics Ltd.</td>
        <td className="sticky  left-[133px] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Agri</td>
        <td className="sticky  left-[190px]  border-r border-[#B3B3B3] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
       
      </tr>
    </tbody>

  </table>
</div>
  {/* End Table */}
</div>
    </div>
    
    {/* start Bottom Pagination Button */}
<div className="mt-4">
      <div className="flex justify-end">
      <div className="flex-grow-0 flex justify-center mx-[14px] ">
    <Select className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none" value="Show 15"
     labelProps={{
      className: "hidden",
    }}
    >
      <Option>Option 1</Option>
    </Select>
  </div>

  <div className="flex-grow-1 ">
    <div className="flex gap-1">
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowBack size={16} />
    </Button>
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowBack size={16} />
      <IoIosArrowBack size={16} />
    </Button>
    <div className="w-[100px]">
      <Input
        type="text"
        defaultValue="1"
        size="md"
        className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
        labelProps={{
          className: "hidden",
        }}
      />
    </div>
    <Button className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowForward />
    </Button>
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
      <IoIosArrowForward />
      <IoIosArrowForward />
    </Button>
    </div>
    
  </div>
      </div>
  
    </div>
{/* End Bottom Pagination Button */}

   </div>


      </div>
        </>
    )
}

export default PriceActionTable