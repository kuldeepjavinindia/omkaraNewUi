import { Typography, Input, Select, Option, Checkbox, Button } from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AbsResult = () => {
  const [resultDataTable, setResultDataTable] = useState([]);
  const [tableBodyCreate, setTableBodyCreate] = useState([]);
  const dispatch = useDispatch();

  const { data: ResultDataTable, loading: ResultDataLoading } = useSelector((state) => state.Data2.ResultData);

  useEffect(() => {
    if (!ResultDataLoading && ResultDataTable) {
      const tableHead = ResultDataTable._Headers; // Table Headers
      if (tableHead) {
        let uniqueId = 0; // To keep unique IDs for each header and subheader
        let createTableHead = [];

        tableHead.forEach((theadItem, index) => {
          let mainHeader = {
            id: uniqueId++,
            mainHeaderName: theadItem.ColumnName.replace("&nbsp;", " "),
            checkbox: index >= 3, // Set checkbox true for main headers starting from index 3
            subHeaders: [],
          };

          if (theadItem.SubColumn) {
            Object.entries(theadItem.SubColumn).forEach(([key, value]) => {
              if (key !== "$id" && value !== null) {
                mainHeader.subHeaders.push({
                  id: uniqueId++,
                  subHeaderName: value,
                  checkbox: true, // Always set checkbox true for subheaders
                });
              }
            });
          }

          createTableHead.push(mainHeader);
        });

        setResultDataTable(createTableHead);
      }

      const tableBodyData = ResultDataTable.Data;
      let allRowsData = [];

      // Add total row as the first row in tableBodyCreate
      const totalData = ResultDataTable?.Total[0];
      if (totalData) {
        let totalRow = {
          CompanyName: totalData.Total,
          Sector: totalData.Sector,
          MarketCap: parseFloat(totalData.MarketCap),
          Sales: [
            parseFloat(totalData.Sales1Q),
            parseFloat(totalData.Sales2Q),
            parseFloat(totalData.Sales3Q),
            parseFloat(totalData.Sales4Q),
            parseFloat(totalData.Sales5Q),
          ],
          GrossProfit: [
            parseFloat(totalData.Gross_Profit_1Q),
            parseFloat(totalData.Gross_Profit_2Q),
            parseFloat(totalData.Gross_Profit_3Q),
            parseFloat(totalData.Gross_Profit_4Q),
            parseFloat(totalData.Gross_Profit_5Q),
          ],
          GrossMargin: [
            totalData.GrossProfit_Margin1Q,
            totalData.GrossProfit_Margin2Q,
            totalData.GrossProfit_Margin3Q,
            totalData.GrossProfit_Margin4Q,
            totalData.GrossProfit_Margin5Q,
          ],
          EBIDTA: [
            totalData.EBDITA1Q,
            totalData.EBDITA2Q,
            totalData.EBDITA3Q,
            totalData.EBDITA4Q,
            totalData.EBDITA5Q,
          ],
          EBIDTAMargin: [
            totalData.EBDITAMargin1Q,
            totalData.EBDITAMargin2Q,
            totalData.EBDITAMargin3Q,
            totalData.EBDITAMargin4Q,
            totalData.EBDITAMargin5Q,
          ],
          PAT: [
            totalData.PAT1Q,
            totalData.PAT2Q,
            totalData.PAT3Q,
            totalData.PAT4Q,
            totalData.PAT5Q,
          ],
        };

        allRowsData.push(totalRow);
      }

      // Add remaining rows from tableBodyData
      tableBodyData.forEach((resBody) => {
        let singleRow = {
          CompanyName: resBody._MainHeaders._CompanyDetail.Company_Name,
          Sector: resBody._MainHeaders.Sector,
          MarketCap: parseFloat(resBody._MainHeaders.MarketCap),
          Sales: [
            parseFloat(resBody._sales.S5Q),
            parseFloat(resBody._sales.S4Q),
            parseFloat(resBody._sales.S3Q),
            parseFloat(resBody._sales.S2Q),
            parseFloat(resBody._sales.S1Q),
          ],
          GrossProfit: [
            parseFloat(resBody._GP.Gross_Profit_Cr5Q),
            parseFloat(resBody._GP.Gross_Profit_Cr4Q),
            parseFloat(resBody._GP.Gross_Profit_Cr3Q),
            parseFloat(resBody._GP.Gross_Profit_Cr2Q),
            parseFloat(resBody._GP.Gross_Profit_Cr1Q),
          ],
          GrossMargin: [
            parseFloat(resBody._GM.Gross_Profit_Margin5Q),
            parseFloat(resBody._GM.Gross_Profit_Margin4Q),
            parseFloat(resBody._GM.Gross_Profit_Margin3Q),
            parseFloat(resBody._GM.Gross_Profit_Margin2Q),
            parseFloat(resBody._GM.Gross_Profit_Margin1Q),
          ],
          EBIDTA: [
            parseFloat(resBody._Ebidta.EBDITA_Cr5Q),
            parseFloat(resBody._Ebidta.EBDITA_Cr4Q),
            parseFloat(resBody._Ebidta.EBDITA_Cr3Q),
            parseFloat(resBody._Ebidta.EBDITA_Cr2Q),
            parseFloat(resBody._Ebidta.EBDITA_Cr1Q),
          ],
          EBIDTAMargin: [
            parseFloat(resBody._EM.EBDITA_Margin_Per5Q),
            parseFloat(resBody._EM.EBDITA_Margin_Per4Q),
            parseFloat(resBody._EM.EBDITA_Margin_Per3Q),
            parseFloat(resBody._EM.EBDITA_Margin_Per2Q),
            parseFloat(resBody._EM.EBDITA_Margin_Per1Q),
          ],
          PAT: [
            parseFloat(resBody._pat.PAT_Cr5Q),
            parseFloat(resBody._pat.PAT_Cr4Q),
            parseFloat(resBody._pat.PAT_Cr3Q),
            parseFloat(resBody._pat.PAT_Cr2Q),
            parseFloat(resBody._pat.PAT_Cr1Q),
          ],
        };

        allRowsData.push(singleRow);
      });

      setTableBodyCreate(allRowsData);
    }
  }, [ResultDataLoading, ResultDataTable]);


  // console.log( "table >>>>>>>", tableBodyCreate);

  return (
    <div>
      {/* Header Section */}
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
      {/* End Header Section */}

{/* Table Section */}
<div className="mt-8 relative overflow-x-auto quarterlyResultTable">
  <table className="w-full border border-collapse border-[#B3B3B3] h-full min-w-[1200px]">
    <thead>
      <tr className="bg-[#1E233A]">
        {resultDataTable.map((item, index) => {

let sticky;
if(index === 0) {
  sticky = "sticky-cst first"
}
if(index === 1) {
  sticky = "sticky-cst second"
}
if(index === 2) {
  sticky = "sticky-cst third"
}

          return (
            <>
            
          <th
            key={item.id}
            colSpan={item.subHeaders.length > 0 ? item.subHeaders.length : 1}
            className={`${sticky} text-white p-2 text-[13px] xl:text-[14px] font-semibold`}
          >
            <div className="flex items-center justify-center">
              <span>{item.mainHeaderName}</span>
              {item.checkbox && (
                <Checkbox className="!bg-transparent h-4 w-4 rounded bg-transparent" />
              )}
            </div>
          </th>
        
            </>
          )
        })}
      </tr>
      <tr className="bg-[#1E233A]">
        {resultDataTable.flatMap((item) =>
          item.subHeaders.length > 0 ? (
            item.subHeaders.map((subItem) => (
              <th key={subItem.id} className="text-white p-2 text-[12px] xl:text-[13px] font-semibold">
                <div className="flex items-center justify-between">
                  <span>{subItem.subHeaderName}</span>
                  {subItem.checkbox && (
                    <Checkbox className="border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]" />
                  )}
                </div>
              </th>
            ))
          ) : (
            <th key={item.id} className="text-white p-2 text-[12px] xl:text-[13px] font-semibold"></th>
          )
        )}
      </tr>
    </thead>

    <tbody>
      {tableBodyCreate.map((item, rowIndex) => (
        <tr key={rowIndex} className="h-10">
          <td className=" text-[12px] xl:text-[13px] text-[#000] font-semibold sticky-cst first-col" style={{ position: 'sticky', left: 0, zIndex: 20, backgroundColor: '#fff' }}>
            {item.CompanyName}
          </td>
          <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold sticky-cst second-col" style={{ position: 'sticky', left: '130px', zIndex: 20, backgroundColor: '#fff' }}>
            {item.Sector}
          </td>
          <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold sticky-cst third-col" style={{ position: 'sticky', left: '215px', zIndex: 20, backgroundColor: '#fff' }}>
            {item.MarketCap !== null && !Number.isNaN(item.MarketCap) ? item.MarketCap.toFixed(2) : ' '}
          </td>

          {/* Render Sales (Cr) */}
          {item.Sales.map((sale, colIndex) => (
            <td key={`sales_${rowIndex}_${colIndex}`} className="text-right text-[12px] xl:text-[13px] text-[#000] font-semibold">
              {sale !== null && !Number.isNaN(sale) ? sale.toFixed(2) : ' '}
            </td>
          ))}

          {/* Render Gross Profit (Cr) */}
          {item.GrossProfit.map((gp, colIndex) => (
            <td key={`gross_profit_${rowIndex}_${colIndex}`} className="text-right text-[12px] xl:text-[13px] text-[#000] font-semibold">
              {gp !== null && !Number.isNaN(gp) ? gp.toFixed(2) : ' '}
            </td>
          ))}

            {/* Render Gross Margin */}
            {item.GrossMargin.map((gm, colIndex) => (
            <td key={`gross_margin_${rowIndex}_${colIndex}`} className="text-right text-[12px] xl:text-[13px] text-[#000] font-semibold">
              {/* {gm !== null && !Number.isNaN(gm) ? gm.toFixed(2) : ' '} */}
              {gm}
            </td>
          ))}

          {/* Render EBIDTA */}
          {item.EBIDTA.map((ebidta, colIndex) => (
            <td key={`ebidta_${rowIndex}_${colIndex}`} className="text-right text-[12px] xl:text-[13px] text-[#000] font-semibold">
              {/* {ebidta !== null && !Number.isNaN(ebidta) ? ebidta.toFixed(2) : ' '} */}
              {ebidta}
            </td>
          ))}

          {/* Render EBIDTAMargin */}
          {item.EBIDTAMargin.map((ebidtaMargin, colIndex) => (
            <td key={`ebidta_margin_${rowIndex}_${colIndex}`} className="text-right text-[12px] xl:text-[13px] text-[#000] font-semibold">
              {/* {ebidtaMargin !== null && !Number.isNaN(ebidtaMargin) ? ebidtaMargin.toFixed(2) : ' '} */}
              {ebidtaMargin}
            </td>
          ))}

          {/* Render PAT */}
          {item.PAT.map((pat, colIndex) => (
            <td key={`pat_${rowIndex}_${colIndex}`} className="text-right text-[12px] xl:text-[13px] text-[#000] font-semibold">
              {/* {pat !== null && !Number.isNaN(pat) ? pat.toFixed(2) : ' '} */}
              {pat}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
{/* End Table Section */}




    </div>
  );
};

export default AbsResult;
