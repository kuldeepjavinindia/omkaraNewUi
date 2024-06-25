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

    let isCheckbox = true;
    Object.keys(Header).map((key, i)=>{
      if(i > 0){
        let element = Header[key];
        let obj = {
          label: element,
          sticky: 'left',
          hideCheck: false,
          accessor: key,
          id: key,
          isCheckbox: isCheckbox,
          isVisible: true,
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

      <div className="">
        {/* Start Table */}
        <div className=" data2Tabels relative overflow-x-auto">
   
                <ResultMUI 
                  NewColumns={NewColumns}
                  TableData={TableData}
                  FilterData={FilterData}
                  setFilterData={setFilterData}
                  DialogData={open}
                  setDialogData={setOpen}
                  
      />


       
        </div>
        {/* End Table */}
      </div>
    </>
  );
};

export default Results;
