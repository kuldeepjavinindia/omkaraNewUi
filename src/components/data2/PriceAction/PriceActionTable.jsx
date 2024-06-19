import {
  Typography,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { priceAction_Req } from "../../../constants/defaultRequest";
import { PriceActionApi } from "../../../store/slice/Data2Slice";
import PriceTableComponent from "./PriceTableComponent";

const PriceActionTable = () => {
  

  const [ShowCheckboxButton, setShowCheckboxButton] = useState(false);
  const [FilterData, setFilterData] = useState(null)
  const [tableColumns, setTableColumns] = useState(null);
  const [tableBodyData, setTableBodyData] = useState(null);
  const [StickyColumns, setStickyColumns] = useState(0);
  const [ShowColumns, setShowColumns] = useState(null);
  const [ShowAllButton, setShowAllButton] = useState(false);




    const {
      PriceAction:{
        loading: PAloading,
        data: PAData,
      }
    } = useSelector(state=>state.Data2)
    const rr_dispatch = useDispatch()

  useEffect(() => {
    let params = priceAction_Req
    rr_dispatch(PriceActionApi(params))
  }, [])
  
  useEffect(() => {
      // if(!PAloading){
        // console.log(' ??? ' , PAData)


        if (!PAloading) {
          let a1 = 0;
          const tableHead = PAData?.header;
          let mColArr = [];
          tableHead.map((resHeads) => {
    
            let hideCheck = false;
            if (a1 !== 1) {
                hideCheck = true;
            }
            let stickyLeft = 0;
    
            let stuff = {};
            Object.keys(resHeads).forEach((key, i0) => {
    
              let label = resHeads[key];
              // let show_status = resHeads[key];
              if (label != null) {
                let width = 120;
                let sticky = false;
                if (key == 'Company_Name' || key == 'Sector' || key == 'Industry') {
                  width = 150;
                  sticky = true;
                  setStickyColumns(a1);
                  hideCheck = false;
                } else {
                  hideCheck = true;
                }
    
                if (key != '$id' && key != 'AccordCode') {
                  stuff[key] = true;
                  let mCol = {
                    key: key,
                    label: label,
                    stickyLeft: stickyLeft,
                    minWidth: width,
                    maxWidth: width,
                    align: 'canter',
                    hideCheck: hideCheck,
                    isCheckbox: true,
                    isVisible: true,
                    sticky: sticky,
                  }
                  mColArr.push(mCol);
                }
              }
              a1++;
            })
            setShowColumns(stuff);
          });
    
          setTableColumns(mColArr);
          const tableBody = PAData?.Data;
          let allRowsData = [];
          tableBody.map((resBody) => {
    
            let singleRow = {};
            Object.keys(resBody).forEach(key => {
    
              let col_val = resBody[key] ? resBody[key].trim() : "";
              if (key == 'Company_Name' || key == 'Sector' || key == 'Industry' || key == 'Index') {
                // col_val = '';
              } else
                if (key == 'PriceDate') {
                  // col_val = moment(col_val, 'DD-MM-YYYY HH:mm:ss', true).format('YYYY MMM DD');
                  // col_val = moment(col_val, 'DD-MM-YYYY HH:mm:ss', true).format('YYYY MMM DD');
                } else {
                  col_val = parseFloat(col_val);
                }
    
    
              singleRow[key] = col_val;
            })
    
            allRowsData.push(singleRow);
    
          });
          setTableBodyData(allRowsData);
          setFilterData(tableBodyData);
        // }



      }
  }, [rr_dispatch, PAloading])
  
  
  const expBtn = useRef(null);
  const ShowAllColsButton = () => {

    // var sc = ShowColumns;

    // Object.keys(ShowColumns).map((key) => {
    // delete ShowColumns[key];
    setShowColumns({
      ...ShowColumns,
      AllTimeHigh: true,
      ChangeAllTimeHigh: true,
      Chg_from_week52_highPer: true,
      Chg_from_week52_lowPer: true,
      Company_Name: true,
      Index: true,
      Industry: true,
      LTP: true,
      MarketCap: true,
      Sector: true,
      TTM_P_B: true,
      TTM_P_E: true,
      week52_high: true,
      week52_low: true
    });
    // });
    setShowAllButton(false);
  }


  useEffect(() => {
    if (ShowColumns) {
      Object.keys(ShowColumns).map((key) => {
        if (!ShowColumns[key]) {
          setShowAllButton(true)
        }
      })
    }
  }, [ShowColumns])


  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Price Action
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
{/* <Button className='btn-cst-primary' onClick={() => {
                setShowCheckboxButton(true);
                setTimeout(() => {
                  // expBtn.current.children[0].click();
                }
                , 2000);
                setTimeout(() => {
                  setShowCheckboxButton(false);
                }
                , 3000);
              }} size="small" variant="contained">Export Excel</Button> */}


              <PriceTableComponent
                  ShowCheckboxButton={ShowCheckboxButton} 
                  setShowCheckboxButton={setShowCheckboxButton} 
                  FilterData={FilterData} 
                  setFilterData={setFilterData}
                  StickyColumns={StickyColumns}
                  ShowColumns={ShowColumns}
                  setShowColumns={setShowColumns}
                  tableColumns={tableColumns}
                  setTableColumns={setTableColumns}
                  tableRows={tableBodyData}
                  setResultData={setTableBodyData}
                />

                {/* <table className="forensicTable w-full border border-collapse border-[#B3B3B3] h-full">
                  <thead className="bg-[#1E233A]">
                    <tr className="!bg-[#1E233A] ">
                      <th className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10  ">
                        COMPANY NAME
                      </th>
                      <th className="sticky  left-[133px] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10 ">
                        SECTOR
                      </th>
                      <th className="sticky  left-[190px]  border-r border-[#B3B3B3] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10 ">
                        INDUSTRY
                      </th>

                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        Index
                      </th>

                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />
                        LTP
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        52wk High
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        Chg frm 52wk High(%)
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        52wk Low
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        Chg frm 52wk Low(%)
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        PAT Growth QoQ (%)
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        PAT Growth YoY (%)
                      </th>
                      <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <Checkbox
                          className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                        />{" "}
                        D/E
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="sticky  left-[133px] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        Agri
                      </td>
                      <td className="sticky  left-[190px]  border-r border-[#B3B3B3] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                    </tr>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="sticky  left-[133px] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        Agri
                      </td>
                      <td className="sticky  left-[190px]  border-r border-[#B3B3B3] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                      <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        10204
                      </td>
                    </tr>
                  </tbody>
                </table> */}
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

export default PriceActionTable;
