import { useState } from "react";
import {
  Typography,
  Input,
  Select,
  Option,
  Button,
  Switch,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// import { SiMicrosoftexcel } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import ResultBankModal from "../../CompanyDetail/Modals/ResultBankModal";
import { CgPlayButtonR } from "react-icons/cg";
import { PiTagBold } from "react-icons/pi";

const ReportBankSearchTable = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(!open);

  return (
    <>
      {/* Video Modal */}
      <ResultBankModal open={open} setOpen={setOpen} />
      {/* Video Modal */}

      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Repository List
        </Typography>
      </div>

      <div
        className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded"
        style={{ height: `calc(100vh - 7.5rem)` }}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* ========= Start Header Page =========== */}
            <div className="flex justify-between items-center">
              <div className="flex-grow-2 flex items-center gap-2 w-[60%]">
                <div>
                  <Typography className="text-[11px] lg:text-[12px] font-semibold text-[#000]">
                    SHOWING <span className="text-theme">1 to 10 of 10</span>{" "}
                    ENTRIES
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
                    icon={
                      <CgSearch
                        size={19}
                        className="text-gray-400 top-[-2px] absolute"
                      />
                    }
                  />
                </div>
              </div>

              <div className="flex-grow-0 flex justify-center mx-[14px] mt-[-4px]">
                <Select
                  className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none top-0"
                  labelProps={{
                    className: "hidden",
                  }}
                  value="Show 15"
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
            {/* ========= End Header Page =========== */}

            <div className="">
              {/* Start Table */}
              <div className="mt-8 data2Tabels relative overflow-x-auto">
                <table className="forensicTable w-full border border-collapse border-[#B3B3B3] h-full">
                  <thead className="bg-[#1E233A]">
                    <tr className="!bg-[#1E233A] ">
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Switch
                          id="custom-switch-component"
                          ripple={false}
                          className="h-full w-full bg-gray-500 checked:bg-theme"
                          containerProps={{
                            className: "w-9 h-5 ",
                          }}
                          circleProps={{
                            className: "before:hidden left-0.5 border-none w-4 h-4",
                          }}
                        />
                      </th>

                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        REPORT DATE
                      </th>

                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        PERIOD
                      </th>
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        COMPANY NAME
                      </th>
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        SECTOR
                      </th>
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        REPORT TYPE
                      </th>
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        BROKER NAME
                      </th>
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        AUTHOR
                      </th>
                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        TITLE
                      </th>

                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        REPORT
                      </th>

                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        VIDEOS/TAGS
                      </th>

                      <th className=" !text-left !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-12">
                      <td className="text-[12px] xl:text-[13px] text-[#333333] font-semibold text-left">
                        <span className="cursor-pointer">
                          <FaStar fill="#4448F5" size={14} />
                        </span>
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#333333] font-semibold text-left">
                      04-Jun-2024
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#333333] font-semibold text-left">
                        2023
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Trent Ltd.
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Retailing
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Annual Report
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        IIFL Securities
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        asha
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        A near perfect year
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        <img
                          src={
                            import.meta.env.VITE_BASE_URL +
                            "/images/icons/pdfIcon.svg"
                          }
                          alt=""
                        />
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        <Button
                          size="sm"
                          className={` text-[#1E1E1E] py-1 px-2 border-gray-900 border-2 bg-white rounded`}
                          onClick={openDrawer}
                        >
                          {/* <img src={ import.meta.env.VITE_BASE_URL + "/images/icons/playEnable.svg"} alt="" className="w-2.5"/> */}
                          <CgPlayButtonR fill="#000" size={12} />
                        </Button>
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        <div className="flex justify-start">
                          <BiEdit fill="#2E7A80" size={20} />
                          <MdOutlineDelete fill="#DD2025" size={20} />
                        </div>
                      </td>
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
                <Select
                  className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none"
                  value="Show 15"
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
  );
};

export default ReportBankSearchTable;
