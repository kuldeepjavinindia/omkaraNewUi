import { Typography, Input, Select, Option , Checkbox, Button} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import QuarterlyResultModal from "../CompanyDetail/ModalComment/QuarterlyResultModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";




const Results= ()=> {

   const [open, setOpen] =  useState(false);
   const [resultDataTable, setResultDataTable] = useState([]);
   const [tableBodyData, setTableBodyData ] = useState([])

 const handleOpen = ()=> {
   setOpen(!open)
 }




 const { data: ResultDataTable2, loading: ResultDataLoading2 } = useSelector((state) => state.Data2.ResultDataSheet2);



 useEffect(() => {
  if (!ResultDataLoading2 && ResultDataTable2) {
    const tableHead = ResultDataTable2._Headers;
    console.log( "table Head", tableHead);
    if (tableHead) {
      let uniqueId = 0; 
      let createTableHead = [];

      tableHead.forEach((theadItem, index) => {
          Object.entries(theadItem).forEach(([key, value]) => {
            if (key !== "$id" && value !== null) {
              createTableHead.push({
                id: uniqueId++,
                HeaderName: value.replace("&nbsp;", " "),
                checkbox: true ,
              });
            }
          });
    
        
      });

      setResultDataTable(createTableHead);
    }

 
    const tableBody = ResultDataTable2?.Data; 
    let allRowsData = [];
    let resDataArr = tableBody.map((resBody) => {

      let singleRow = {
        "Company_Name": resBody?._CompanyDetail?.Company_Name || '',
        "Sector": resBody.Sector || '',
        "MarketCap": resBody.MarketCap || '',
        "LTP": resBody.LTP || '',
        "week52_high": resBody.week52_high || '',
        "Chg_from_week52_highPer": resBody.Chg_from_week52_highPer || '',
        "week52_low": resBody.week52_low || '',
        "Chng_from_week52_lowPer": resBody.Chng_from_week52_lowPer || '',
        "TTM_P_E": resBody.TTM_P_E || '',
        "TTM_P_B": resBody.TTM_P_B || '',
        "TTM_End": resBody.TTM_End || '',
        "Sales_YoY_Per": resBody.Sales_YoY_Per?.value || resBody.Sales_YoY_Per || '',
        "Sales_QoQ_Per": resBody.Sales_QoQ_Per?.value || resBody.Sales_QoQ_Per || '',
        "GP_YoY_Per": resBody.GP_YoY_Per?.value || resBody.GP_YoY_Per || '',
        "GP_QoQ_Per": resBody.GP_QoQ_Per?.value || resBody.GP_QoQ_Per || '',
        "EBIDTA_Growth_YoY": resBody.EBIDTA_Growth_YoY?.value || resBody.EBIDTA_Growth_YoY || '',
        "EBIDTA_Growth_QoQ": resBody.EBIDTA_Growth_QoQ?.value || resBody.EBIDTA_Growth_QoQ || '',
        "PAT_Growth_YoY_Per": resBody.PAT_Growth_YoY_Per?.value || resBody.PAT_Growth_YoY_Per || '',
        "PAT_Growth_QoQ_Per": resBody.PAT_Growth_QoQ_Per?.value || resBody.PAT_Growth_QoQ_Per || '',
        "D_E": resBody.D_E || '',
        "RoCE_per": resBody.RoCE_per || '',
        "Info_div": "", // You can add a suitable value if needed
      };
      allRowsData.push(singleRow);

      // console.log(singleRow, "single row");
  });


  setTableBodyData(allRowsData)

   
    // console.log( "table body", tableBody);

  
  }
}, [ResultDataLoading2, ResultDataTable2]);



// console.log("data", ResultDataTable2);
console.log("data body", tableBodyData);


    return (
        <>

         <QuarterlyResultModal  open={open} setOpen={setOpen} />

  {/* ========= Start Header Page =========== */}
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
{/* ========= End Header Page =========== */}




<div className="">
  {/* Start Table */}
  <div className="mt-8 data2Tabels relative overflow-x-auto">
  <table className="forensicTable w-[1320px] border border-collapse border-[#B3B3B3] h-full">
    <thead className="bg-[#1E233A]">

      

    <tr className="bg-[#1E233A]">
        {resultDataTable.map((item, index) => {

        let sticky;
        
        if(index === 0) {
          sticky = "sticky-cst first",
          item.checkbox = false
        }
        if(index === 1) {
          sticky = "sticky-cst second",
          item.checkbox = false
        }
        if(index === 2) {
          sticky = "sticky-cst third",
          item.checkbox = false
        }
        
        // console.log("header key",  item.HeaderName);

          return (
            <>
            
          <th className= {` ${sticky} !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]`}
            key={item.id}
          >
            <div className="flex items-center justify-center">
              <span>{item.HeaderName}</span>
              {item.checkbox && (
                <Checkbox className="!bg-transparent h-4 w-4 rounded bg-transparent" />
              )}
            </div>
          </th>
    
            </>
          )
        } )}
      </tr>

    </thead>

    




    <tbody>
            {tableBodyData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "even:bg-[#fff]" : "odd:bg-[#E8F0F4]"} h-10`}>
                {resultDataTable.map((column, colIndex) => {
                  const headerName = column.HeaderName.trim();

                  if (row.hasOwnProperty(headerName)) {
                    return (
                      <td key={colIndex} className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        {row[headerName]}
                      </td>
                    );
                  } else {
                    return (
                      <td key={colIndex} className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                        {/* Empty cell */}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>







    
    <tfoot>
      <tr className="bg-[#1E233A] h-[63px]">
        <td className="sticky left-0 text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">Company Name</td>
        <td className="sticky  left-[133px] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">Sector</td>
        <td className="sticky  left-[195px]  border-r border-[#B3B3B3] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">MCap (Cr)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">3Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">2Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">1Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">3Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">2Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">1Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
      </tr>
    
    </tfoot>
  </table>
</div>
  {/* End Table */}
</div>

        </>
    )
}

export default Results;