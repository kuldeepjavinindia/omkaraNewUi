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
            // "accessor_2": parseFloat(resBody._MainHeaders.MarketCap),
            "accessor_2": resBody._MainHeaders.MarketCap ? parseFloat(resBody._MainHeaders.MarketCap) : "",
            "accessor_3": resBody._sales.S1Q ? parseFloat(resBody._sales.S1Q) : "",
            "accessor_4": resBody._sales.S2Q ? parseFloat(resBody._sales.S2Q) : "",
            "accessor_5": resBody._sales.S3Q ? parseFloat(resBody._sales.S3Q) : "",
            "accessor_6": resBody._sales.S4Q ? parseFloat(resBody._sales.S4Q) : "",
            "accessor_7": resBody._sales.S5Q ? parseFloat(resBody._sales.S5Q) : "",
            "accessor_8": resBody._GP.Gross_Profit_Cr1Q ? parseFloat(resBody._GP.Gross_Profit_Cr1Q) : "",
            "accessor_9": resBody._GP.Gross_Profit_Cr2Q ? parseFloat(resBody._GP.Gross_Profit_Cr2Q) : "",
            "accessor_10": resBody._GP.Gross_Profit_Cr3Q ? parseFloat(resBody._GP.Gross_Profit_Cr3Q) : "",
            "accessor_11": resBody._GP.Gross_Profit_Cr4Q ? parseFloat(resBody._GP.Gross_Profit_Cr4Q) : "",
            "accessor_12": resBody._GP.Gross_Profit_Cr5Q ? parseFloat(resBody._GP.Gross_Profit_Cr5Q) : "",
            "accessor_13": resBody._GM.Gross_Profit_Margin1Q ? parseFloat(resBody._GM.Gross_Profit_Margin1Q) : "",
            "accessor_14": resBody._GM.Gross_Profit_Margin2Q ? parseFloat(resBody._GM.Gross_Profit_Margin2Q) : "",
            "accessor_15": resBody._GM.Gross_Profit_Margin3Q ? parseFloat(resBody._GM.Gross_Profit_Margin3Q) : "",
            "accessor_16": resBody._GM.Gross_Profit_Margin4Q ? parseFloat(resBody._GM.Gross_Profit_Margin4Q) : "",
            "accessor_17": resBody._GM.Gross_Profit_Margin5Q ? parseFloat(resBody._GM.Gross_Profit_Margin5Q) : "",
            "accessor_18": resBody._Ebidta.EBDITA_Cr1Q ? parseFloat(resBody._Ebidta.EBDITA_Cr1Q) : "",
            "accessor_19": resBody._Ebidta.EBDITA_Cr2Q ? parseFloat(resBody._Ebidta.EBDITA_Cr2Q) : "",
            "accessor_20": resBody._Ebidta.EBDITA_Cr3Q ? parseFloat(resBody._Ebidta.EBDITA_Cr3Q) : "",
            "accessor_21": resBody._Ebidta.EBDITA_Cr4Q ? parseFloat(resBody._Ebidta.EBDITA_Cr4Q) : "",
            "accessor_22": resBody._Ebidta.EBDITA_Cr5Q ? parseFloat(resBody._Ebidta.EBDITA_Cr5Q) : "",
            "accessor_23": resBody._EM.EBDITA_Margin_Per1Q ? parseFloat(resBody._EM.EBDITA_Margin_Per1Q) : "",
            "accessor_24": resBody._EM.EBDITA_Margin_Per2Q ? parseFloat(resBody._EM.EBDITA_Margin_Per2Q) : "",
            "accessor_25": resBody._EM.EBDITA_Margin_Per3Q ? parseFloat(resBody._EM.EBDITA_Margin_Per3Q) : "",
            "accessor_26": resBody._EM.EBDITA_Margin_Per4Q ? parseFloat(resBody._EM.EBDITA_Margin_Per4Q) : "",
            "accessor_27": resBody._EM.EBDITA_Margin_Per5Q ? parseFloat(resBody._EM.EBDITA_Margin_Per5Q) : "",
            "accessor_28": resBody._pat.PAT_Cr1Q ? parseFloat(resBody._pat.PAT_Cr1Q) : "",
            "accessor_29": resBody._pat.PAT_Cr2Q ? parseFloat(resBody._pat.PAT_Cr2Q) : "",
            "accessor_30": resBody._pat.PAT_Cr3Q ? parseFloat(resBody._pat.PAT_Cr3Q) : "",
            "accessor_31": resBody._pat.PAT_Cr4Q ? parseFloat(resBody._pat.PAT_Cr4Q) : "",
            "accessor_32": resBody._pat.PAT_Cr5Q ? parseFloat(resBody._pat.PAT_Cr5Q) : "",
        }
        allRowsData.push(singleRow);
    });


    Headers.map((resHeads) => {
      let isCheckbox = true;
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
            width: width,
            isCheckbox: false,
            isVisible: true,
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
              if (key !== '$id') {
                  const element = subCol[key];
                  let cols = {
                      label: element,
                      accessor: 'accessor_' + a1,
                      hideCheck: true,
                      width: width,
                      isCheckbox: isCheckbox,
                      isVisible: true,
                  }
                  subColArr.push(cols);
                  a1++;
              }

          }
      }

    }

      var bgClass = 'th';
      let hideCheck = false;
      if (a1 !== 1) {
          hideCheck = true;
      }
      var mCol = {
          label: mTitle,
          sticky: sticky,
          width: width,
          hideCheck: hideCheck,
          headerClassName: bgClass,
          columns: subColArr,
          isCheckbox: (resHeads?.type === "0" ? false : isCheckbox),
          isVisible: true,
      }
      mColArr.push(mCol);
    })

    Total = Total?.[0];
    let TotalData = {
            "accessor_0": Total?.Total,
            "accessor_1": "",
            "accessor_2": "",
            "accessor_3": Total?.Sales1Q ? parseFloat(Total?.Sales1Q) : "",
            "accessor_4": Total?.Sales2Q ? parseFloat(Total?.Sales2Q) : "",
            "accessor_5": Total?.Sales3Q ? parseFloat(Total?.Sales3Q) : "",
            "accessor_6": Total?.Sales4Q ? parseFloat(Total?.Sales4Q) : "",
            "accessor_7": Total?.Sales5Q ? parseFloat(Total?.Sales5Q) : "",

            "accessor_8": Total?.Gross_Profit_1Q ? parseFloat(Total?.Gross_Profit_1Q) : "",
            "accessor_9": Total?.Gross_Profit_2Q ? parseFloat(Total?.Gross_Profit_2Q) : "",
            "accessor_10": Total?.Gross_Profit_3Q ? parseFloat(Total?.Gross_Profit_3Q) : "",
            "accessor_11": Total?.Gross_Profit_4Q ? parseFloat(Total?.Gross_Profit_4Q) : "",
            "accessor_12": Total?.Gross_Profit_5Q ? parseFloat(Total?.Gross_Profit_5Q) : "",

            "accessor_13": Total?.GrossProfit_Margin1Q ? parseFloat(Total?.GrossProfit_Margin1Q) : "",
            "accessor_14": Total?.GrossProfit_Margin2Q ? parseFloat(Total?.GrossProfit_Margin2Q) : "",
            "accessor_15": Total?.GrossProfit_Margin3Q ? parseFloat(Total?.GrossProfit_Margin3Q) : "",
            "accessor_16": Total?.GrossProfit_Margin4Q ? parseFloat(Total?.GrossProfit_Margin4Q) : "",
            "accessor_17": Total?.GrossProfit_Margin5Q ? parseFloat(Total?.GrossProfit_Margin5Q) : "",

            "accessor_18": Total?.EBDITA1Q ? parseFloat(Total?.EBDITA1Q) : "",
            "accessor_19": Total?.EBDITA2Q ? parseFloat(Total?.EBDITA2Q) : "",
            "accessor_20": Total?.EBDITA3Q ? parseFloat(Total?.EBDITA3Q) : "",
            "accessor_21": Total?.EBDITA4Q ? parseFloat(Total?.EBDITA4Q) : "",
            "accessor_22": Total?.EBDITA5Q ? parseFloat(Total?.EBDITA5Q) : "",

            "accessor_23": Total?.EBDITAMargin1Q ? parseFloat(Total?.EBDITAMargin1Q) : "",
            "accessor_24": Total?.EBDITAMargin2Q ? parseFloat(Total?.EBDITAMargin2Q) : "",
            "accessor_25": Total?.EBDITAMargin3Q ? parseFloat(Total?.EBDITAMargin3Q) : "",
            "accessor_26": Total?.EBDITAMargin4Q ? parseFloat(Total?.EBDITAMargin4Q) : "",
            "accessor_27": Total?.EBDITAMargin5Q ? parseFloat(Total?.EBDITAMargin5Q) : "",

            "accessor_28": Total?.PAT1Q ? parseFloat(Total?.PAT1Q) : "",
            "accessor_29": Total?.PAT2Q ? parseFloat(Total?.PAT2Q) : "",
            "accessor_30": Total?.PAT3Q ? parseFloat(Total?.PAT3Q) : "",
            "accessor_31": Total?.PAT4Q ? parseFloat(Total?.PAT4Q) : "",
            "accessor_32": Total?.PAT5Q ? parseFloat(Total?.PAT5Q) : "",

    };
    
    setNewColumns(mColArr)
    setTableData(allRowsData)
    setTotalData(TotalData)

    console.log('Total Total Total >>>>>>> ', TotalData)
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
 

<div className="">
  {/* Start Table */}
  <div className=" data2Tabels relative overflow-x-auto">

    <AbsResultMUI 
      NewColumns={NewColumns}
      setNewColumns ={setNewColumns }
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