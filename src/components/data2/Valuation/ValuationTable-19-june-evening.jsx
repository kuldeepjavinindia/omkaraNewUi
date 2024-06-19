import React, { useEffect, useState } from "react";
import {
  Typography,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import ValuationTableData from "./ValuationTableData";
import { useSelector } from "react-redux";

const ValuationTable = () => {
  const {
    Valuation: {
      loading: ValuationLoading,
      data: ValuationData,
    }
  } = useSelector(state => state.Data2);

  const [TableHeader, setTableHeader] = useState([]);
  const [TableRows, setTableRows] = useState([]);
  const [FilterData, setFilterData] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  useEffect(() => {
    if (!ValuationLoading) {
      const headers = ValuationData.Headers;
      const bodyData = ValuationData.Data;

      const mColArr = headers.reduce((acc, resHeads) => {
        Object.keys(resHeads).forEach(key => {
          if (resHeads[key].show_status && key !== '$id') {
            const width = ['CompanyName', 'Sector', 'Industry'].includes(key) ? 200 : 80;
            acc.push({
              label: resHeads[key].label || "",
              key: key,
              isCheckbox: true,
              isVisible: true,
              accessor: key,
              width: width,
            });
          }
        });
        return acc;
      }, []);

      const allRowsData = bodyData.map(resBody => {
        const singleRow = {};
        Object.keys(resBody).forEach(key => {
          singleRow[key] = resBody[key];
        });
        return singleRow;
      });



      setTableHeader(mColArr);
      setTableRows(allRowsData);
      
    }
  }, [ValuationLoading]);




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
  const totalPages = Math.ceil(TableRows.length / rowsPerPage);



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
                    SHOWING <span className="text-theme">{indexOfFirstRow + 1} to {Math.min(indexOfLastRow, TableRows.length)} of {TableRows.length}</span> ENTRIES
                  </Typography>
                </div>
                <div className="flex-grow">
                  <Input
                    type="text"
                    placeholder="Search Company"
                    onChange={(e) => requestSearch(e.target.value)}
                    className="!border !border-gray-200 !h-8 !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{ className: "hidden" }}
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

              <div className="flex-grow-1 ">
                <div className="flex gap-1">
                  <Button
                    className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
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
                  {/* <div className="w-[100px] flex items-center justify-center">
                    <Typography className="text-[12px] text-[#000] font-semibold">
                      
                      Page {currentPage} of {totalPages}
                    </Typography>
                  </div> */}

<div className="w-[100px] ">
  <Input
    type="number"
    value={currentPage}
    onChange={(e) => {
      const page = parseInt(e.target.value);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    }}
   className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
    style={{ textAlign: 'center' }}

    labelProps={{
      className: "hidden",
    }}

  />

</div>
                  <Button
                    className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <IoIosArrowForward />
                  </Button>

                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                onClick={() => setCurrentPage(totalPages)} // Go to last page
               >
             <IoIosArrowForward size={16} />
             <IoIosArrowForward size={16} />
             </Button>




                </div>
              </div>
            </div>
            {/* ========= End Header Page =========== */}

            <div className="mt-8 data2Tabels relative overflow-x-auto">
              <ValuationTableData
                tableColumns={TableHeader}
                setTableColumns={setTableHeader}
                tableRows={currentRows}  // Display current page rows
                FilterData={FilterData}
                setFilterData={setFilterData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValuationTable;
