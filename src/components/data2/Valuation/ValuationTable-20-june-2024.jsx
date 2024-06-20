import React, { useEffect, useState } from "react";
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
import { SiMicrosoftexcel } from "react-icons/si";
import ValuationTableData from "./ValuationTableData";
import { useDispatch, useSelector } from "react-redux";

const ValuationTable = () => {


  // const rr_dispatch = useDispatch()
  const {
    Valuation:{
      loading: ValuationLoading,
      data: ValuationData,
    }
  } = useSelector(state=>state.Data2)

  const [TableHeader, setTableHeader] = useState([])
  const [TableRows, setTableRows] = useState([])
  const [FilterData, setFilterData] = useState(null)

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(30);

  useEffect(() => {
    
    if(!ValuationLoading){

      let headers = ValuationData?.Headers
      let bodyData = ValuationData?.Data

      let a1 = 0;
      let mColArr = [];

      headers.map((resHeads)=>{

        let sticky = null;
        let isCheckbox = true;

        Object.keys(resHeads).forEach(key => {
            let label = resHeads[key].label;
            // console.log({key, resHeads: resHeads[key], label, a1});
            let show_status = resHeads[key].show_status;
            if(show_status){
                let width = 80;
                if(key == 'CompanyName' || key == 'Sector' || key == 'Industry'){
                    width = 200;
                }

                if(key != '$id'){
                    let mCol = {
                        label:(label || ""),
                        key: key,
                        sticky:sticky,
                        isCheckbox: isCheckbox,
                        isVisible: true,
                        accessor:key,
                        width:width,
                    }
                    mColArr.push(mCol);
                }
            }
            a1++;
          })
    });
    let allRowsData = [];
    bodyData.map((resBody)=>{
        
        // allRowsData.push(singleRow);
        var singleRow = {};

        Object.keys(resBody).forEach(key => {
                singleRow[key] = resBody[key];
            })
            
        allRowsData.push(singleRow);
        
    });

    console.log('allRowsData >>> ', allRowsData)
    setTableHeader(mColArr)
    setTableRows(allRowsData);
    // const NEW_COLUMN = mColArr;





      
    }

  }, [ValuationLoading])
  

 const requestSearch = (searchedVal) => {
    const filteredRows = TableRows.filter((row) => {
      
        return Object.keys(row).some((key) => {
          return String(row[key]).toLowerCase().includes(searchedVal.toLowerCase());
        });
    });
    
    if (searchedVal.length < 1) {
      setFilterData(TableRows)
    }
    else {
      setFilterData(filteredRows)
    }
  };




    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = TableRows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(TableRows.length / rowsPerPage)

    const handlePreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
  
    const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1);
    };
    

  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Valuation
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
                    SHOWING <span className="text-theme">
                    {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, TableRows.length)} of {TableRows.length}
                      </span>
                    ENTRIES
                  </Typography>
                </div>
                <div className="flex-grow">
                  <Input
                    type="text"
                    onChange={(e)=> requestSearch(e.target.value)}
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

              <div className="flex-grow-0 flex justify-center mx-[14px] mt-[-4px] hidden">
              <Select
                  className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none"
                  labelProps={{ className: "hidden" }}
                  value={rowsPerPage}
                  onChange={(e) => handleRowsPerPageChange(Number(e))}
                >
                  <Option value={10}>Show 10</Option>
                  <Option value={20}>Show 20</Option>
                  <Option value={30}>Show 30</Option>
                  <Option value={50}>Show 50</Option>
                </Select>
              </div>

              <div className="flex-grow-1 hidden">
                <div className="flex gap-1">
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                   onClick={handlePreviousPage}
                   disabled={currentPage === 1}
                  
                  >
                    <IoIosArrowBack size={16} />
                  </Button>
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                   onClick={() => setCurrentPage(1)}
                  >
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
                  <Button className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  >
                    <IoIosArrowForward />
                  </Button>
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                  onClick={() => setCurrentPage(totalPages)}
                  >
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


                      <ValuationTableData
                        
                        tableColumns={TableHeader}
                        setTableColumns={setTableHeader}
                        // tableRows={TableRows}
                        tableRows={currentRows}
                        FilterData={FilterData}
                        setFilterData={setFilterData}
                        // divRef={divRef}
                       />



                {/* <table className="forensicTable w-[40%] border border-collapse border-[#B3B3B3] h-full">
                  <thead className="bg-[#1E233A]">
                    <tr className="!bg-[#1E233A] ">
                      <th className="!text-white  text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <div className="flex item-center gap-1">
                          <div>COMPANY NAME</div>
                          <div>
                            <Checkbox
                              className=" border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]
                checked:border-[#fff]
                "
                            />
                          </div>
                        </div>
                      </th>
                      <th className="!text-white  text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] ">
                        <div className="flex item-center gap-1">
                          <div>SECTOR</div>
                          <div>
                            <Checkbox
                              className="border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]
                checked:border-[#fff]"
                            />
                          </div>
                        </div>
                      </th>
                      <th className="!text-white  text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <div className="flex item-center gap-1">
                          <div>INDUSTRY</div>
                          <div>
                            <Checkbox
                              className="border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]
                checked:border-[#fff]"
                            />
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="sticky sticky left-[133px] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Agri
                      </td>
                      <td className="sticky  left-[192px] border-r border-[#B3B3B3]  bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        10204
                      </td>
                    </tr>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="sticky sticky left-[133px] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Agri
                      </td>
                      <td className="sticky  left-[192px] border-r border-[#B3B3B3]  bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        10204
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td className="text-white  text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left">
                        COMPANY NAME
                      </td>
                      <td className="text-white  text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left">
                        SECTOR
                      </td>
                      <td className="text-white  text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left">
                        INDUSTRY
                      </td>
                    </tr>
                  </tfoot>
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

export default ValuationTable;