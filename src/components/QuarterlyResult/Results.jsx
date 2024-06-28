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


    const NEW_COLUMN = []

    Object.keys(Header).map((key, i)=>{
      let isCheckbox = true;
      let width = 80;
      if(i > 0){
        let element = Header[key];
        if(i < 3){
          width = 150
          isCheckbox = false
        }
        if(i == 3){
          width = 100
          isCheckbox = false
        }
        let obj = {
          label: element.replaceAll("&nbsp;", " "),
          width: width,
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
          "MarketCap": resBody.MarketCap ? parseFloat(resBody.MarketCap) : "",
          "LTP": resBody.LTP ? parseFloat(resBody.LTP) : "",
          "week52_high": resBody.week52_high ? parseFloat(resBody.week52_high) : "",
          "Chg_from_week52_highPer": resBody.Chg_from_week52_highPer ? parseFloat(resBody.Chg_from_week52_highPer) : "",
          "week52_low": resBody.week52_low ? parseFloat(resBody.week52_low) : "",
          "Chng_from_week52_lowPer": resBody.Chng_from_week52_lowPer ? parseFloat(resBody.Chng_from_week52_lowPer) : "",
          "TTM_P_E": resBody.TTM_P_E ? parseFloat(resBody.TTM_P_E) : "",
          "TTM_P_B": resBody.TTM_P_B ? parseFloat(resBody.TTM_P_B) : "",
          "TTM_End": resBody.TTM_End ? parseFloat(resBody.TTM_End) : "",


          "Sales_YoY_Per_obj": resBody.Sales_YoY_Per,
          "Sales_QoQ_Per_obj": resBody.Sales_QoQ_Per,
          "GP_YoY_Per_obj": resBody.GP_YoY_Per,
          "GP_QoQ_Per_obj": resBody.GP_QoQ_Per,
          "EBIDTA_Growth_YoY_obj": resBody.EBIDTA_Growth_YoY,
          "EBIDTA_Growth_QoQ_obj": resBody.EBIDTA_Growth_QoQ,
          "PAT_Growth_YoY_Per_obj": resBody.PAT_Growth_YoY_Per,
          "PAT_Growth_QoQ_Per_obj": resBody.PAT_Growth_QoQ_Per,
          

          "Sales_YoY_Per": resBody.Sales_YoY_Per?.value ? parseFloat(resBody.Sales_YoY_Per?.value) : "",
          "Sales_QoQ_Per": resBody.Sales_QoQ_Per?.value ? parseFloat(resBody.Sales_QoQ_Per?.value) : "",
          "GP_YoY_Per": resBody.GP_YoY_Per?.value ? parseFloat(resBody.GP_YoY_Per?.value) : "",
          "GP_QoQ_Per": resBody.GP_QoQ_Per?.value ? parseFloat(resBody.GP_QoQ_Per?.value) : "",
          "EBIDTA_Growth_YoY": resBody.EBIDTA_Growth_YoY?.value ? parseFloat(resBody.EBIDTA_Growth_YoY?.value) : "",
          "EBIDTA_Growth_QoQ": resBody.EBIDTA_Growth_QoQ?.value ? parseFloat(resBody.EBIDTA_Growth_QoQ?.value) : "",
          "PAT_Growth_YoY_Per": resBody.PAT_Growth_YoY_Per?.value ? parseFloat(resBody.PAT_Growth_YoY_Per?.value) : "",
          "PAT_Growth_QoQ_Per": resBody.PAT_Growth_QoQ_Per?.value ? parseFloat(resBody.PAT_Growth_QoQ_Per?.value) : "",


          "D_E": resBody.D_E ? parseFloat(resBody.D_E) : "",
          "RoCE_per": resBody.RoCE_per ? parseFloat(resBody.RoCE_per) : "",
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


    {/* {JSON.stringify(NewColumns)} */}

      <QuarterlyAnalyticsInfoModal DialogData={open} setDialogData={setOpen} />

      <div className="">
        {/* Start Table */}
        <div className=" data2Tabels relative overflow-x-auto">
   
                <ResultMUI 
                  NewColumns={NewColumns}
                  setNewColumns={setNewColumns}
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
