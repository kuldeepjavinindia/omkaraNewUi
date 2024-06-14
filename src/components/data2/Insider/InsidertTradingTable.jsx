import {
  Typography,
  Input,
  Select,
  Option,
  // Checkbox,
  Button,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// import { IoMdInformationCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import BulkDealInsiderModal from "./../../CompanyDetail/ModalComment/BulkDealInsiderModal";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InsiderApi } from "../../../store/slice/Data2Slice";
import { Insider_Req } from "../../../constants/defaultRequest";
import CommonMUITable from "../MUITable/CommonMUITable";

const InsiderTradingTable = () => {
  const [open, setOpen] = useState(false);

  const divRef = useRef();
  const rr_dispatch = useDispatch();
  const [TableHeader, setTableHeader] = useState([]);
  const [TableRows, setTableRows] = useState([]);
  const [FilterData, setFilterData] = useState(null);
  const [ShowCheckboxButton, setShowCheckboxButton] = useState(false);



  const {
    Insider:{
      loading: InsiderLoading,
      data: InsiderData
    }
  } = useSelector(state=>state.Data2);

  const callApi = () => {
    let params = Insider_Req;
    rr_dispatch(InsiderApi(params))
  }



  

  useEffect(() => {
    if(InsiderLoading){
      callApi()
    }
  }, [])


  useEffect(() => {
       
    if(!InsiderLoading){
        let Arr = [];
        InsiderData?.Header && InsiderData?.Header.map((item)=>{
          let formatType = 'Float';
            if(item?.value !== "StockID"){
              console.log(item)
              if(item?.column === "column_1" || item?.column === "column_3"){
                formatType = 'String';
              }
              var dd = {
                  id: item?.column,
                  label: item?.value,
                  sticky: false,
                  format: formatType, 
                  minWidth: 150
              }
              Arr.push(dd)
            }
        });
        setTableHeader(Arr);
        
        let bodyArr0 = [];
        InsiderData?.Data.map((item)=>{
            let dd = item.TableData;
            let a10 = [];
            dd.map((a0)=>{
              // let a000 = {[a0.column]:a0};
              let c_all = a0.column + '_all';
              let valueItem = a0.value;
              let Arr1 = ["column_2", "column_4", "column_1"];
              let Arr2 = ["column_3", "column_5"];
              if(!Arr1.includes(a0?.column)){
                valueItem = parseFloat(valueItem)
                let minimumFractionDigits = 2;
                if(Arr2.includes(a0?.column)){
                  minimumFractionDigits = 0;
                }
                valueItem =  valueItem.toLocaleString('en-IN', {minimumFractionDigits: minimumFractionDigits})
              }
              a10 = { ...a10, [a0.column]:valueItem, [c_all]:a0 }
            })
            bodyArr0.push(a10);
        });
        setTableRows(bodyArr0);
    }

}, [rr_dispatch, InsiderLoading])
  


  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  return (
    <>
      {/* ============ Start Modal =========== */}
      <BulkDealInsiderModal open={open} setOpen={setOpen} />
      {/* ============ End Modal =========== */}

      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Insider Trading
        </Typography>
        <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
          <SiMicrosoftexcel size={15} fill="#2E7A80" />
        </span>
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
                    SHOWING <span className="text-theme">1 to 10 of 10</span>
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
            {/* ========= End Header Page =========== */}

            <div className="">
              {/* Start Table */}
              <div className="mt-8 data2Tabels relative overflow-x-auto">





                {/* <table className="forensicTable w-full  h-full">
                  <thead>
                    <tr className="!bg-[#1E233A]">
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        COMPANY NAME
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        Market Cap (Cr )
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        Action
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        Net Quantity
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        Net Price
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        Net Value (Cr)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td
                        className="text-[12px] xl:text-[13px] text-[#4448F5] font-semibold text-left cursor-pointer"
                        onClick={handleOpen}
                      >
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        Net
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#23A356] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                    </tr>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td
                        className="text-[12px] xl:text-[13px] text-[#4448F5] font-semibold text-left"
                        onClick={handleOpen}
                      >
                        Godfrey Phillips India 
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        Net
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#DD2025] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px]  text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#23A356]  font-semibold text-right">
                        10204
                      </td>
                    </tr>
                  </tbody>
                </table> */}

<CommonMUITable
                          tableColumns={TableHeader}
                          tableRows={TableRows}
                          FilterData={FilterData}
                          setFilterData={setFilterData}
                          ShowCheckboxButton={ShowCheckboxButton} 
                          setShowCheckboxButton={setShowCheckboxButton} 
                          divRef={divRef}
                        />
                        
              </div>
              {/* End Table */}
            </div>
          </div>

          {/* start Bottom Pagination Button */}
          {/* <div className="mt-4">
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
          </div> */}
          {/* End Bottom Pagination Button */}
        </div>
      </div>
    </>
  );
};

export default InsiderTradingTable;
