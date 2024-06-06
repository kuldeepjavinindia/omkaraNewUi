import { Typography, Input, Select, Option , Checkbox, Button} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";





const DeliveryDataTable= ()=> {
    return (
        <>

     <div className="flex justify-between pb-2">
      <Typography className="text-[15px] text-[#000] font-semibold">
      Delivery Data
      </Typography>
      <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
      <SiMicrosoftexcel size={15} fill="#2E7A80"/>
      </span>
     </div>

        <div className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded">
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
        icon={<CgSearch size={19} className="text-gray-400 top-[-2px] absolute" />}
      />
    </div>
  </div>

  <div className="flex-grow-0 flex justify-center mx-[14px]">
    <Select className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none" label="Show 15">
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
  <table className="forensicTable w-full  h-full">
    <thead className="bg-[#1E233A]">
      <tr className="!bg-[#1E233A]">
        <th className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10" style={{ width: '200px' }}>COMPANY NAME</th>
        <th className="sticky left-[133px] border-r border-[#B3B3B3] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10" style={{ width: '100px' }}>MCap (Cr)</th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff] !bg-transparent  h-4 w-4 rounded bg-transparent  "  /> LTP
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 52wk High
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Chg frm 52wk High(%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 52wk Low
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> Chg frm 52wk Low(%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> PAT Growth QoQ (%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> PAT Growth YoY (%)
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> D/E
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]" style={{ width: '100px' }}>
          <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> ROCE
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '200px' }}>Bharat Dynamics Ltd.</td>
        <td className="sticky left-[133px] border-r border-[#B3B3B3] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '200px' }}>Bharat Dynamics Ltd.</td>
        <td className="sticky left-[133px] border-r border-[#B3B3B3] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right" style={{ width: '100px' }}>10204</td>
      </tr>
    </tbody>
    <tfoot>
      <tr className="bg-[#1E233A] h-[63px]">
        <td className="sticky left-0 text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left" style={{ width: '200px' }}>Company Name</td>
        <td className="sticky left-[133px] border-r border-[#B3B3B3] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left" style={{ width: '100px' }}>MCap (Cr)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>LTP</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>52wk High</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>Chg frm 52wk High(%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>52wk Low</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>Chg frm 52wk Low(%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>PAT Growth QoQ (%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>PAT Growth YoY (%)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>D/E</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right" style={{ width: '100px' }}>ROCE</td>
      </tr>
    </tfoot>
  </table>
</div>
{/* End Table */}


</div>




        </div>
        </>
    )
}

export default DeliveryDataTable;