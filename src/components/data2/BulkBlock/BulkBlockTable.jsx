import {
  Typography,
  Input,
  Select,
  Option,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BulkDealMUITable from "../MUITable/BulkDealMUITable";
import { BulkDeal_Req } from "../../../constants/defaultRequest";
import { BulkDealApi } from "../../../store/slice/Data2Slice";
import BulkDealInsiderModal from "../../CompanyDetail/Modals/BulkDealInsiderModal";
import { GlobalContext } from "../../../context/GlobalContext";

const BulkBlockTable = () => {
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  const divRef = useRef();
  // const expBtn = useRef(null);
  const {
    BulkDeal:{
      data: BulkDealData,
      loading: BulkDealLoading,
    }
  } = useSelector(state=>state.Data2)

  
  const rr_dispatch = useDispatch();
  const [TableHeader, setTableHeader] = useState([])
  const [TableRows, setTableRows] = useState([])
  const [FilterData, setFilterData] = useState(null)


  const {
    BulkDealInsiderModalBtn
  } = useContext(GlobalContext)




  const callApi = () => {
      let params = BulkDeal_Req;

      rr_dispatch(BulkDealApi(params))
  }

  
  useEffect(() => {
    if(BulkDealLoading){
      callApi()
    }
  }, [])
  

  useEffect(() => {
    if(!BulkDealLoading){
      
      let Arr = [];
      BulkDealData?.Header && BulkDealData?.Header.map((item, a0)=>{
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
                // format: formatType, 
                format: (value) => value.toLocaleString('en-IN'),
                minWidth: 150
            }
            Arr.push(dd)
          }
      });
      setTableHeader(Arr);
      // let bodyArr = [];
      // BulkDealData?.Data.map((item, i0)=>{
      //     let dd = item.TableData;
      //     // dd[dd['column']] = dd['value'];
      //     bodyArr.push(dd);
      // });
      let bodyArr0 = [];
      
      let isFloatCol = ["column_3", "column_7", "column_8", "column_9"];
      // let isFloatCol = ["column_5","column_6", "column_7", "column_9"];
      let minDigits_ZERO = ["column_7"];

      BulkDealData?.Data.map((item, i0)=>{
          let dd = item.TableData;
          let a10 = [];
          dd.map((a0, i00)=>{
            let a000 = {[a0.column]:a0};
            let c_all = a0.column + '_all';
            let valueItem = a0.value;
            
            if(isFloatCol.includes(a0?.column) && valueItem !== ''){
              valueItem = parseFloat(valueItem);
              let minimumFractionDigits = 2;
              if(minDigits_ZERO.includes(a0?.column)){
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
  }, [BulkDealLoading])

  






  return (
    <>
    {
      BulkDealInsiderModalBtn != null && (
        <>
          {/* ============ Start Modal =========== */}
          <BulkDealInsiderModal />
          {/* ============ End Modal =========== */}
        </>
      )
    }
      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Bulk Block
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

              <BulkDealMUITable
                  tableColumns={TableHeader}
                  tableRows={TableRows}
                  FilterData={FilterData}
                  setFilterData={setFilterData}
                  divRef={divRef}
                />

              {/* <div className="mt-8 data2Tabels relative overflow-x-auto">
                <table className="forensicTable w-full  h-full">
                  <thead>
                    <tr className="!bg-[#1E233A]">
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        {" "}
                        COMPANY NAME{" "}
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        {" "}
                        Market Cap (Cr ){" "}
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        {" "}
                        Action{" "}
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        {" "}
                        Net Quantity{" "}
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        {" "}
                        Net Price{" "}
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold ">
                        {" "}
                        Net Value (Cr){" "}
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
                </table>
              </div> */}
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

export default BulkBlockTable;
