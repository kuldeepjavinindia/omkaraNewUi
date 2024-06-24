import { Typography, Input, Select, Option, Checkbox, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
// import FilterQuarterlyResult from "../data2/filter/FilterQuarterlyResult";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import AbsResultMUI from "./AbsResultMUI";

const AbsResult= ()=> {

  const {
    ResultData:{
      data: RDData,
      loading: RDLoading,
    }
  } = useSelector(state=> state.Data2)
  
  const [NewColumns, setNewColumns] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [TotalData, setTotalData] = useState([]);
  const [FilterData, setFilterData] = useState(null)

  // const requestSearch = (searchedVal) => {
  //   const filteredRows = TableData.filter((row) => {
      
  //       return Object.keys(row).some((key) => {
  //         return String(row[key]).toLowerCase().includes(searchedVal.toLowerCase());
  //       });
  //   });
    
  //   if (searchedVal.length < 1) {
  //     setFilterData(TableData)
  //   }
  //   else {
  //     setFilterData(filteredRows)
  //   }
  // };


  const callApi = () => {
    let Headers = RDData?._Headers
    let bodyData = RDData?.Data
    let Total = RDData?.Total


    var a1 = 0;
    var mTitle = ' ';
    var width = 75;
    var mColArr = [];


    var allRowsData = [];
    bodyData.map((resBody) => {
        var singleRow = {
            "CompanyID": resBody._MainHeaders.CompanyID,
            "IndustryID": resBody._MainHeaders.IndustryID,
            "SectorID": resBody._MainHeaders.SectorID,
            "CompanyDetail": resBody._MainHeaders._CompanyDetail,
            "accessor_0": resBody._MainHeaders._CompanyDetail.Company_Name,
            "accessor_1": resBody._MainHeaders.Sector,
            "accessor_2": resBody._MainHeaders.MarketCap,
            "accessor_3": resBody._sales.S1Q,
            "accessor_4": resBody._sales.S2Q,
            "accessor_5": resBody._sales.S3Q,
            "accessor_6": resBody._sales.S4Q,
            "accessor_7": resBody._sales.S5Q,
            "accessor_8": resBody._GP.Gross_Profit_Cr1Q,
            "accessor_9": resBody._GP.Gross_Profit_Cr2Q,
            "accessor_10": resBody._GP.Gross_Profit_Cr3Q,
            "accessor_11": resBody._GP.Gross_Profit_Cr4Q,
            "accessor_12": resBody._GP.Gross_Profit_Cr5Q,
            "accessor_13": resBody._GM.Gross_Profit_Margin1Q,
            "accessor_14": resBody._GM.Gross_Profit_Margin2Q,
            "accessor_15": resBody._GM.Gross_Profit_Margin3Q,
            "accessor_16": resBody._GM.Gross_Profit_Margin4Q,
            "accessor_17": resBody._GM.Gross_Profit_Margin5Q,
            "accessor_18": resBody._Ebidta.EBDITA_Cr1Q,
            "accessor_19": resBody._Ebidta.EBDITA_Cr2Q,
            "accessor_20": resBody._Ebidta.EBDITA_Cr3Q,
            "accessor_21": resBody._Ebidta.EBDITA_Cr4Q,
            "accessor_22": resBody._Ebidta.EBDITA_Cr5Q,
            "accessor_23": resBody._EM.EBDITA_Margin_Per1Q,
            "accessor_24": resBody._EM.EBDITA_Margin_Per2Q,
            "accessor_25": resBody._EM.EBDITA_Margin_Per3Q,
            "accessor_26": resBody._EM.EBDITA_Margin_Per4Q,
            "accessor_27": resBody._EM.EBDITA_Margin_Per5Q,
            "accessor_28": resBody._pat.PAT_Cr1Q,
            "accessor_29": resBody._pat.PAT_Cr2Q,
            "accessor_30": resBody._pat.PAT_Cr3Q,
            "accessor_31": resBody._pat.PAT_Cr4Q,
            "accessor_32": resBody._pat.PAT_Cr5Q,
        }
        allRowsData.push(singleRow);
    });



    Headers.map((resHeads) => {
      let subColArr = [];
      let subCol = [];
      let sticky = null;

      if (resHeads?.type === "0") {
        width = 150;
        if (a1 === 2) {
            width = 100;
        }
        let cols = {
            label: ((resHeads.ColumnName).replace('&nbsp;', ' ')),
            // Footer: ((resHeads.ColumnName).replace('&nbsp;', ' ')),
            accessor: 'accessor_' + a1,
            hideCheck: false,
            width: width
        }
        a1++;
        subColArr.push(cols);
        sticky = 'left';

        console.log('object')
      }else{
        width = 75;
        mTitle = resHeads.ColumnName;
        subCol = resHeads.SubColumn;

        for (const key in subCol) {
          if (Object.hasOwnProperty.call(subCol, key)) {
              // var style = '';
              if (key === 'Column5') {
                  // style = {
                  //     'borderRight': '2px solid #ddd !important'
                  // };
              }

              if (key !== '$id') {
                  const element = subCol[key];
                  let cols = {
                      label: element,
                      // Footer: element,
                      accessor: 'accessor_' + a1,
                      hideCheck: true,
                      width: width,
                  }
                  subColArr.push(cols);
                  a1++;
              }

          }
      }

        console.log('object')
      }

      var bgClass = 'th';
      let hideCheck = false;
      if (a1 !== 1) {
          hideCheck = true;
      }
      var mCol = {
          label: mTitle,
          // Footer: mTitle,
          sticky: sticky,
          hideCheck: hideCheck,
          headerClassName: bgClass,
          columns: subColArr,
      }
      mColArr.push(mCol);


    })

    
    setNewColumns(mColArr)
    setTableData(allRowsData)

    // console.log('mColArr mColArr mColArr >>>>>>> ', allRowsData)
    // console.log('RDData >>>>>>> ', RDData)
  }


  useEffect(() => {
    console.log('RDLoading >>> ', RDLoading)
    if(!RDLoading){
      callApi()
    }
  }, [RDLoading])
  


  
    return (
        <>

  <div >
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
  
  
  {/* <table className="forensicTable w-full border border-collapse border-[#B3B3B3] h-full">
    <thead className="bg-[#1E233A]">
      <tr className="!bg-[#1E233A]">
        <th className=""></th>
        <th className=""></th>
        <th className="border-r border-[#B3B3B3]"></th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] !text-center border-r border-[#B3B3B3]" colSpan="5">
          Sales (Cr)  <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  />
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] !text-center" colSpan="5">
          Gross Profit (Cr)  <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  />
        </th>
      </tr>
      <tr className="!bg-[#1E233A] ">
        <th className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10">COMPANY NAME</th>
        <th className="sticky sticky left-[133px] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10">SECTOR</th>
        <th className="sticky  left-[192px] border-r border-[#B3B3B3]  !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10">MCap (Cr)</th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 4Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 3Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] ">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 2Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 1Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] border-r border-[#B3B3B3]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 4Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 4Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 3Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 2Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 1Q
        </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
           <Checkbox  className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"  /> 4Q
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Bharat Dynamics Ltd.</td>
        <td className="sticky sticky left-[133px] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Agri</td>
        <td className="sticky  left-[192px] border-r border-[#B3B3B3]  bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right border-r border-[#B3B3B3]">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
      </tr>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Bharat Dynamics Ltd.</td>
        <td className="sticky sticky left-[133px] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Agri</td>
        <td className="sticky  left-[192px] border-r border-[#B3B3B3]  bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right border-r border-[#B3B3B3]">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
      </tr>
    </tbody>
    <tfoot>
      <tr className="bg-[#1E233A] ">
        <td className="sticky left-0 text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">Company Name</td>
        <td className="sticky sticky left-[133px] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">Sector</td>
        <td className="sticky  left-[192px] border-r border-[#B3B3B3]  text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">MCap (Cr)</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">3Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">2Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">1Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right border-r border-[#B3B3B3]">4Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">3Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">2Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">1Q</td>
        <td className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-right">4Q</td>
      </tr>
      <tr className="bg-[#1E233A]  "> 
        <td className="sticky left-0 text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-center pb-3"></td>
        <td className="sticky sticky left-[133px] text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-center pb-3"></td>
        <td className="sticky  left-[192px] border-r border-[#B3B3B3]  text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-center pb-3"></td>
        <td colSpan="5" className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-center border-r border-[#B3B3B3] pb-3">Sales (Cr)</td>
        <td colSpan="5" className="text-white p-2 text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-center pb-3">Gross Profit (Cr)</td>
      </tr>
    </tfoot>
  </table> */}


    <AbsResultMUI 
      NewColumns={NewColumns}
      TableData={TableData}
      FilterData={FilterData}
      setFilterData={setFilterData}
      TotalData={TotalData}
      setTotalData={setTotalData}

    />

</div>
  {/* End Table */}
</div>




  </div>
  {/* End Content Bar */}


        </>
    )
}

export default AbsResult;