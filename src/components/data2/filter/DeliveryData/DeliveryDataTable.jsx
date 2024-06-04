import {
  Typography,
  Input,
  Select,
  Option,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";

const DeliveryDataTable = () => {
  return (
    <>
      <div className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded">
        {/* Start page Header */}
        <div className="flex items-start justify-between ">
          <div className="flex gap-2 w-[68%] inputs-custom items-center">
            <div>
              <Typography className="text-[12px] font-medium text-[#000]">
                SHOWING 
              </Typography>
            </div>

            <Input
              type="text"
              placeholder="Search Company"
              className="  !border !border-gray-200 !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
              icon={
                <CgSearch
                  size={19}
                  className=" text-gray-400 top-[-2px] absolute"
                />
              }
            />
            <div className="smallInput ">
              <Select
                className="bg-[#fff] mt-0 rounded border-none"
                label="Show 15"
                size="sm"
              >
                <Option>Option 1</Option>
              </Select>
            </div>
          </div>

          <div className="w-[30%]">
            <div className="flex gap-2 items-center justify-between">
              <Button                size="sm" variant="outlined" className="border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none">
                <IoIosArrowBack size={15} />
              </Button>

              <Button                size="sm" variant="outlined" className="border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none ">
                <IoIosArrowBack size={15} />
              </Button>

              <Input
                size="sm"
                type="text"
                defaultValue="1"
                className=" smallInput two !border !border-gray-200 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
              />

              <Button                size="sm" variant="outlined" className="border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none  ">
                <IoIosArrowForward size={15} />
              </Button>

              <Button                size="sm" variant="outlined" className="border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none  ">
                <IoIosArrowForward size={15} />
              </Button>
            </div>
          </div>
        </div>
        {/* End page Header */}

        <div className="">
          {/* Start Table */}
          <div className="mt-8 data2Tabels relative overflow-x-auto">
            <table className="forensicTable w-full  h-full">
              <thead className="bg-[#1E233A]">
                <tr className="!bg-[#1E233A]">
                  <th
                    className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10"
                    style={{ width: "200px" }}
                  >
                    COMPANY NAME
                  </th>
                  <th
                    className="sticky left-[133px] border-r border-[#B3B3B3] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10"
                    style={{ width: "100px" }}
                  >
                    MCap (Cr)
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    LTP
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    52wk High
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    Chg frm 52wk High(%)
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    52wk Low
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    Chg frm 52wk Low(%)
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    PAT Growth QoQ (%)
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    PAT Growth YoY (%)
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    D/E
                  </th>
                  <th
                    className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]"
                    style={{ width: "100px" }}
                  >
                    <Checkbox
                      color="blue"
                      className="h-4 w-4 rounded bg-transparent border border-[#fff]"
                      defaultChecked
                    />
                    ROCE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                  <td
                    className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left"
                    style={{ width: "200px" }}
                  >
                    Bharat Dynamics Ltd.
                  </td>
                  <td
                    className="sticky left-[133px] border-r border-[#B3B3B3] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                </tr>
                <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                  <td
                    className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left"
                    style={{ width: "200px" }}
                  >
                    Bharat Dynamics Ltd.
                  </td>
                  <td
                    className="sticky left-[133px] border-r border-[#B3B3B3] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                  <td
                    className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right"
                    style={{ width: "100px" }}
                  >
                    10204
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-[#1E233A] h-[63px]">
                  <td
                    className="sticky left-0 text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left"
                    style={{ width: "200px" }}
                  >
                    Company Name
                  </td>
                  <td
                    className="sticky left-[133px] border-r border-[#B3B3B3] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left"
                    style={{ width: "100px" }}
                  >
                    MCap (Cr)
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    LTP
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    52wk High
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    Chg frm 52wk High(%)
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    52wk Low
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    Chg frm 52wk Low(%)
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    PAT Growth QoQ (%)
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    PAT Growth YoY (%)
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    D/E
                  </td>
                  <td
                    className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right"
                    style={{ width: "100px" }}
                  >
                    ROCE
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {/* End Table */}
        </div>
      </div>
    </>
  );
};

export default DeliveryDataTable;
