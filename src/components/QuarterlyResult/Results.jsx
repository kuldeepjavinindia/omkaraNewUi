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
import QuarterlyResultModal from "../CompanyDetail/ModalComment/QuarterlyResultModal";
import { useEffect, useState } from "react";
import ResultMUI from "./ResultMUI";
import { useSelector } from "react-redux";
import QuarterlyAnalyticsInfoModal from "../CompanyDetail/Modals/QuarterlyAnalyticsInfoModal";

const Results = () => {
  const [open, setOpen] = useState(false);


  const [NewColumns, setNewColumns] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [FilterData, setFilterData] = useState(null)


  const { 
    ResultDataSheet2:{
      data: ResultData,
      loading: ResultLoading,
    }
  } = useSelector(state=>state.Data2)

  const handleOpen = () => {
    setOpen(!open);
  };



  const callApi = () => {

    var allRowsData = [];
    let bodyData = ResultData.Data;
    let Header = ResultData._Headers[0];


    const NEW_COLUMN = [ 
    ]


    Object.keys(Header).map((key, i)=>{
      if(i > 0){
        let element = Header[key];
        let obj = {
          label: element,
          sticky: 'left',
          hideCheck: false,
          accessor: key,
          id: key,
        }
        
        NEW_COLUMN.push(obj);
      }
    })

    

    // {
    //   Header: "Company name",
    //   Footer: "Company name",
    //   sticky: 'left',
    //   hideCheck: false,
    //   accessor: 'Company_Name',
    //   columns: null,
    // } 


    



    bodyData.map((resBody) => {

      var singleRow = {
          "CompanyDetail": resBody._CompanyDetail,
          "CompanyID": resBody.CompanyID,
          "IndustryID": resBody.IndustryID,
          "SectorID": resBody.SectorID,
          "Company_Name": resBody?._CompanyDetail?.Company_Name,
          "Sector": resBody.Sector,
          "MarketCap": resBody.MarketCap,
          "LTP": resBody.LTP,
          "week52_high": resBody.week52_high,
          "Chg_from_week52_highPer": resBody.Chg_from_week52_highPer,
          "week52_low": resBody.week52_low,
          "Chng_from_week52_lowPer": resBody.Chng_from_week52_lowPer,
          "TTM_P_E": resBody.TTM_P_E,
          "TTM_P_B": resBody.TTM_P_B,
          "TTM_End": resBody.TTM_End,
          "Sales_YoY_Per": resBody.Sales_YoY_Per,
          "Sales_YoY_Per_value": resBody.Sales_YoY_Per.value,
          "Sales_QoQ_Per": resBody.Sales_QoQ_Per,
          "Sales_QoQ_Per_value": resBody.Sales_QoQ_Per.value,
          "GP_YoY_Per": resBody.GP_YoY_Per,
          "GP_YoY_Per_value": resBody.GP_YoY_Per.value,
          "GP_QoQ_Per": resBody.GP_QoQ_Per,
          "GP_QoQ_Per_value": resBody.GP_QoQ_Per.value, 
          "EBIDTA_Growth_YoY": resBody.EBIDTA_Growth_YoY,
          "EBIDTA_Growth_YoY_value": resBody.EBIDTA_Growth_YoY.value,
          "EBIDTA_Growth_QoQ": resBody.EBIDTA_Growth_QoQ,
          "EBIDTA_Growth_QoQ_value": resBody.EBIDTA_Growth_QoQ.value,
          "PAT_Growth_YoY_Per": resBody.PAT_Growth_YoY_Per,
          "PAT_Growth_YoY_Per_value": resBody.PAT_Growth_YoY_Per.value,
          "PAT_Growth_QoQ_Per": resBody.PAT_Growth_QoQ_Per,
          "PAT_Growth_QoQ_Per_value": resBody.PAT_Growth_QoQ_Per.value, 
          "D_E": resBody.D_E,
          "RoCE_per": resBody.RoCE_per,
          "Info_div": "", 
      }
      allRowsData.push(singleRow);
  });



  

  console.log('NEW_COLUMN >>>> ', {NEW_COLUMN, Header})


    setNewColumns(NEW_COLUMN)
    setTableData(allRowsData)
  }


  useEffect(() => {
    if(!ResultLoading){
      callApi()
    }
  }, [ResultLoading])
  





  return (
    <>
      {/* <QuarterlyResultModal open={open} setOpen={setOpen} /> */}

      <QuarterlyAnalyticsInfoModal DialogData={open} setDialogData={setOpen} />


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
      {/* ========= End Header Page =========== */}

      <div className="">
        {/* Start Table */}
        <div className="mt-8 data2Tabels relative overflow-x-auto">
   
                <ResultMUI 
                  NewColumns={NewColumns}
                  TableData={TableData}
                  FilterData={FilterData}
                  setFilterData={setFilterData}
                  DialogData={open}
                  setDialogData={setOpen}
                  
      />


          {/* <table className="forensicTable w-[1320px] border border-collapse border-[#B3B3B3] h-full">
            <thead className="bg-[#1E233A]">
              <tr className="!bg-[#1E233A] ">
                <th className="sticky left-0 !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10  ">
                  COMPANY NAME
                </th>
                <th className="sticky  left-[133px] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10 ">
                  SECTOR
                </th>
                <th className="sticky  left-[195px]  border-r border-[#B3B3B3] !text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] z-10 ">
                  MCap (Cr)
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
                  />
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
                <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                  <Checkbox
                    className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                  />{" "}
                  ROCE
                </th>
                <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                  <Checkbox
                    className="border !border-[#fff]
           !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]"
                  />{" "}
                  Info
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                  Bharat Dynamics Ltd.
                </td>
                <td className="sticky  left-[133px] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                  Agri
                </td>
                <td className="sticky  left-[195px]  border-r border-[#B3B3B3] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
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
                <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold flex justify-end">
                  <span onClick={handleOpen} className="cursor-pointer">
                    <IoMdInformationCircleOutline size={22} color="#34A853" />
                  </span>
                </td>
              </tr>
              <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                  Bharat Dynamics Ltd.
                </td>
                <td className="sticky  left-[133px] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
                  Agri
                </td>
                <td className="sticky  left-[195px]  border-r border-[#B3B3B3] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">
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
                <td className="text-[12px] xl:text-[13px] text-[#000] font-semibold flex justify-end">
                  <span onClick={handleOpen} className="cursor-pointer">
                    <IoMdInformationCircleOutline size={22} color="#34A853" />
                  </span>
                </td>
              </tr>
            </tbody>
            
          </table> */}
        </div>
        {/* End Table */}
      </div>
    </>
  );
};

export default Results;
