import {
  Typography,
  Spinner,
  Checkbox,
  ButtonGroup,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { ForensicDataReq } from "../../../constants/defaultRequest";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  ForensicApi,
  ForensiTooltipApi,
} from "../../../store/slice/SingleCompnaySlice";
import PieChart from "./PieChart";
import { LuHelpCircle } from "react-icons/lu";
import EditCommentModal from "../ModalComment/EditCommentModal";
import { ConStdArray, capStructured_Menu } from "../../../constants/helper";
import { GlobalContext } from "../../../context/GlobalContext";
import ForensicModal from "../Modals/ForensicModal";

const ForensicData = ({ ActiveSHTab, TableWidth, setTableWidth }) => {
  const rr_dispatch = useDispatch();
  const rrd_params = useParams();
  // const [capData, setCapData] = useState([]);
  const [open, setOpen] = useState(false);


  


  const [checked, setChecked] = useState(false);
  const showHide = (event) => {
    setChecked(event.target.checked);
  };

  const {
    Forensic: { data: ForensicData, loading: ForensicLoading },
  } = useSelector((state) => state.SingleCompany);

  const {
    ForensiTooltip: {
      data: ForensiTooltipData,
      // loading: ForensiTooltipLoading,
      button_status,
    },
  } = useSelector((state) => state.SingleCompany);

  const {
    companyNotes: { loading: cmpNotesLoading, data: cmpNotesData },
    ForensicComment:{
      loading: ForensicCommentLoading
    },
    DateACE:{
      data: DateACEData,
      // loading: DateACELoading
    },
  } = useSelector((state) => state.SingleCompany);

  const companyData = cmpNotesData?.Data?.[0] || [];

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const compId = cmpId;


  
  const [CapStructuredBtn, setCapStructuredBtn] = useState(capStructured_Menu?.[0]);
  const [ConStdBtn, setConStdBtn] = useState(ConStdArray?.[0]);

  const [ModalDetail, setModalDetail] = useState({
    title:""
  });

  const typeData = ActiveSHTab?.type;


  const callAPI = (childType='', dataFor='') => {
    console.log({dataFor, childType})
    let param = ForensicDataReq;
        param = {
          ...param,
          companyID: compId,
          Type: ActiveSHTab.type
        };
        
        param = {
          ...param,
          childType: childType != "" ? childType : (ActiveSHTab.type === "CAP") ? CapStructuredBtn?.value : "",
          dataFor: dataFor != "" ? dataFor : (ActiveSHTab.type === "CAP") ? ConStdBtn?.value : ""
        };
          
    rr_dispatch(ForensicApi(param));
  };

  useEffect(() => {
    callAPI();
  }, [ActiveSHTab]);

  useEffect(() => {
    if(!ForensicLoading && !ForensicCommentLoading){
      callAPI();
    }
  }, [ForensicCommentLoading]);

  useEffect(() => {}, [ActiveSHTab]);

  useEffect(() => {
    if (typeData == "ratios") {
      rr_dispatch(ForensiTooltipApi({ Type: "ratios" }));
    }
  }, [ForensicLoading]);

  // console.log(ForensiTooltipData, ">>>>>>>>>>>>>>>>>");

  const filterTooltip = (type = "") => {
    const tooltipData =
      ForensiTooltipData?.Data &&
      ForensiTooltipData?.Data[0].ToolTip.filter((item) => item.key == type);

    return tooltipData && tooltipData[0].toolTip;
  };

  const handleOpen = (details, commentData) => {
      console.log('details <>', details, commentData)

      let mData = commentData?.length > 0 ? commentData?.[0] : {};
      mData = {
        ...mData,
        Type: details.title,
        companyId: cmpId,
        typeData,
        title: ActiveSHTab?.title
      }
      console.log('mData >>> ', mData)
    setModalDetail(mData)
    
    setOpen(!open)
  };
  
  const {
    DIR_Model,
    setDIR_Model,
    SelectedDIR,
    setSelectedDIR,
  } = useContext(GlobalContext);


  if (ForensicLoading) {
    return <Spinner className="w-12 h-12" />;
  }

  return (
    <>
      <ForensicModal />
      <div>
       
        {
          ActiveSHTab.type === "CAP" && (
            <>
            <div>
              <ButtonGroup
                  ripple={false}
                  size="sm"
                  className=" border-[1px] rounded-lg mb-4 shadow-none"
                >
                  {capStructured_Menu.map((item, i) => {
                    return (
                      <Button
                        key={i}
                        className={`border-none  shadow-none hover:shadow-none ${
                          CapStructuredBtn.id == item.id
                            ? "bg-[#22242F] text-white"
                            : "bg-white text-[#606F7B]"
                        }  `}
                        onClick={() => {
                          setCapStructuredBtn(item);
                          callAPI(item.value)
                        }}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
                </ButtonGroup>
    
            </div>
    
            <div>
              <div className="flex gap-2 mb-4">
                  {ConStdArray.map((item, i) => (
                    <>
                      <Button
                        disabled={(button_status && button_status[item?.value]) ? true : false}
                        onClick={() => {
                          setConStdBtn(item);
                          callAPI('', item.value)
                        }}
                        size="sm"
                        variant={`${ConStdBtn.value == item?.value ? "" : "outlined"}`}
                        className={`${
                          ConStdBtn.value == item?.value
                            ? "bg-theme"
                            : "text-theme border-theme"
                        }`}
                        key={i}
                      >
                        {item.label}
                      </Button>
                    </>
                    
                  ))}
                </div>
              </div>
            
            </>
          )
        }




        {ForensicData &&
          ForensicData.length > 0 &&
          ForensicData.map((res, i) => {
            
            // if (i != 1 && typeData == "CF" || typeData != "CF") {
            // const itemDetails = res.details.length > 0 ? res.details[0] : {};
            let highlights =
              res.details.length > 0 ? res.details[0].highlight : {};

            const details = res.details.length > 0 ? res.details[0] : {};

            let a1 = 0;
            let tableHead = res.header;
            // console.log('tableHead <<>>><><><><> ', tableHead)
            if(ActiveSHTab.type === 'CAP'){
              tableHead = res.mheader;
            }

            var mColArr = [];
            tableHead.map((resHeads) => {
              var hideCheck = false;
              if (a1 !== 1) {
                // var hideCheck = true;
              }
              var stickyLeft = 0;

              var stuff = {};
              if(ActiveSHTab.type === 'CAP'){ resHeads= resHeads?.Column }
              Object.keys(resHeads).forEach((key) => {
                var label = resHeads[key];
                // var show_status = resHeads[key];
                if (label != null && label != "") {
                  var width = 120;
                  var sticky = false;
                  if (
                    key == "Company_Name" ||
                    key == "Sector" ||
                    key == "Industry"
                  ) {
                    width = 150;
                    sticky = true;

                    hideCheck = false;
                  } else {
                    hideCheck = true;
                  }

                  if (key != "$id" && key != "AccordCode") {
                    stuff[key] = true;
                    let mCol = {
                      id: key,
                      label: label,
                      stickyLeft: stickyLeft,
                      minWidth: width,
                      maxWidth: width,
                      align: "canter",
                      hideCheck: hideCheck,
                      sticky: sticky,
                    };
                    if(ActiveSHTab.type === 'CAP'){
                      mCol = {
                        ...mCol,
                        label: label.name,
                        bgcolor:label.bgcolor,
                        isBold:label.isBold,
                        isItalic:label.isItalic,
                        isLine:label.isLine,
                        textcolor:label.textcolor,
                      }
                    }
                    mColArr.push(mCol);
                  }
                }
                a1++;
              });
            });

            
            // console.log('tableHead <<>>><><><><> ', mColArr)




            
            
            let allRowsData = [];
            if(ActiveSHTab.type === 'CAP'){
              let tableBody = res?.row;
              tableBody.map((resBody) => {
                allRowsData.push(resBody);
              });
            }else{
              let tableBody = res?.TableData;
              tableBody.map((resBody) => {
                var singleRow = {};
                Object.keys(resBody).forEach((key) => {
                  let col_val = resBody[key] ? resBody[key].trim() : " ";
                  singleRow[key] = col_val;
                });
                allRowsData.push(singleRow);
              });

              // console.log('tableBody -- allRowsData <<>>><><><><> ', allRowsData)
  
              if (i == 0 && typeData == "CF") {
                const data3 = ForensicData[1]?.TableData;
                if (data3) {
                  data3.map((resBody) => {
                    var singleRow = {};
                    Object.keys(resBody).forEach((key) => {
                      let col_val = resBody[key] ? resBody[key].trim() : " ";
                      singleRow[key] = col_val;
                    });
                    allRowsData.push(singleRow);
                  });
                }
              }

            }

            

            return (
              <>
                {/* <div style={{ display: !checked && i == 2 && typeData == "CF" ? 'none': 'unset' }} ></div> */}
                
                <div
                  className={`mb-3 
                px-5 py-5 mt-3
                ${
                  typeData == "ratios"
                    ? "bg-transparent px-0 !py-0 mt-0"
                    : "bg-[#fff]"
                } 
                  ${
                    !checked && i == 2 && typeData == "CF" ? "hidden " : "block"
                  }  
                  ${
                    typeData == "CF"
                      ? "bg-transparent px-0 !py-0 mt-0"
                      : "bg-[#fff]"
                  } 
                
                `}
                >
                  
                  <Typography className="text-[15px] mt-4 text-black font-semibold ">
                    {details.title}
                  </Typography>
                  <Typography className="text-[15px] mb-4 ">
                    {details.description}
                  </Typography>

                  <div
                    className={`${
                      res.sourcePie.length > 0 && res.ApplicationPie.length > 0
                        ? "grid grid-cols-2 gap-2"
                        : "grid grid-cols-1 gap-0"
                    }  `}
                  >
                    <div>
                      {
                        ["DIR", "AH"].includes(typeData) && (
<div className={`flex justify-between items-center ${TableWidth[typeData]}`}>
                        <div></div>
                        <div className="flex text-[12px] justify-between text-black">
                          <div className=" font-medium">
                            {
                              (ActiveSHTab.type === "DIR") && (
                                <>
                                Updated On {DateACEData?.Board}&nbsp; &nbsp;<small>Rs. in Cr.</small>
                                </>
                              )
                            }
                            {
                              (ActiveSHTab.type === "AH") && (
                                <>
                                Updated On {DateACEData?.AuditorHistory}
                                </>
                              )
                            } 
                            </div>
                            
                        </div>
                        
                      </div>
                        )
                      }
                      
                      <table
                        className={`  h-full overflow-scroll border-[1px] border-[#E5E5E5] rounded bg-clip-border
               ${TableWidth[typeData]}
               
               
               `}
                      >
                        <thead>
                          <tr>
                            {mColArr.map((column, clm) => {
                              var cStyle = {};
                              if (column.id !== "column_1" && clm !== 0) {
                                cStyle["textAlign"] = "center";
                              }

                              return (
                                <th
                                  key={clm}
                                  className="border-b border-blue-gray-100 bg-[#1E233A] text-white p-2 text-[13px]  font-medium text-left px-4"
                                >
                                  {column.label}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {allRowsData.map((row, is) => {
                            // let lastR = false;
                            if(typeData === 'CAP'){
                              row = row?.Column;
                            }

                            // console.log('value >>>> row', row)

                            return (
                              <tr
                                key={is}
                                className="odd:bg-[#E8F0F4] even:bg-[#fff]"
                              >
                                {mColArr.map((column, c1) => {
                                  let crtCellData = "";
                                  if(typeData === 'CAP'){
                                    crtCellData = row[column?.id]
                                  }
                                  let value = row[column?.id];

                                  if (typeof crtCellData == "object") {
                                    value = row[column?.id].name;
                                  }

                                  var cStyle = {};
                                  if (
                                    i < 2 &&
                                    typeData == "CF" &&
                                    value == "Total"
                                  ) {
                                    cStyle["backgroundColor"] = "#c7dbb0";
                                  }

                                  if (c1 > 0) {
                                    cStyle["textAlign"] = "center";
                                    {
                                      /* cStyle['height'] = 40 */
                                    }
                                  }

                                  if (allRowsData[allRowsData.length - 1]) {
                                    var l1 = allRowsData.length - 1;
                                    {
                                      /* cStyle['fontWeight'] = "bold" */
                                    }
                                    var lastRow = allRowsData[l1];
                                    // var firstRow = allRowsData[0];
                                    if (
                                      value == "I. Capital Allocation Trends" ||
                                      value ==
                                        "II.Survival Probability/ Balance Sheet Health" ||
                                      value == "III. Forensic Evaluation" ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "II .Survival Probability") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "III .Balance Sheet Health") ||
                                      (typeData == "CF" &&
                                        row["column_1"] == "Total")
                                    ) {
                                      cStyle["backgroundColor"] = "#1E233A";
                                      cStyle["color"] = "#fff";
                                    }

                                    if (
                                      (typeData == "CF" &&
                                        row["column_1"] == "Application") ||
                                      (typeData == "CF" &&
                                        row["column_1"] == "Sources") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "I. Return Ratios") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "II.Survival Probability") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "III.Balance Sheet Health") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "IV. Financial Ratio") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] ==
                                          "V. Profit & Loss Statement") ||
                                      (typeData == "ratios" &&
                                        row["column_1"] == "Vi. Cash Flow")
                                    ) {
                                      cStyle["fontWeight"] = "bold";
                                    }

                                    if (i == 2 && typeData == "CF") {
                                      if (is == 0) {
                                        // cStyle['backgroundColor'] = "#fff";
                                      } else {
                                        if (column?.id == "column_2") {
                                          // cStyle['backgroundColor'] = "#b6e8ff";
                                        } else {
                                          //  cStyle['backgroundColor'] = "#fff";
                                        }
                                      }

                                      if (
                                        row["column_1"] == "Net Sales" &&
                                        column?.id != "column_1"
                                      ) {
                                        {
                                          /* console.log(row['column_1']); */
                                        }
                                        // cStyle['backgroundColor'] = "#b6e8ff";
                                      }
                                    }

                                    {
                                      /* if(
                                          typeData == "ratios" && row['column_1'] == "Dividend Payout Ratio (%)"
                                        ){
                                          cStyle['fontWeight'] = "normal";
                                        } */
                                    }

                                    Object.keys(lastRow).map((lastRowItem) => {
                                      if (
                                        l1 == is &&
                                        lastRow[lastRowItem] == value
                                      ) {
                                        if (
                                          typeData != "ratios" &&
                                          typeData != "CH" &&
                                          typeData != "DH" &&
                                          typeData != "ESOP" &&
                                          typeData != "SH" &&
                                          typeData != "AH"
                                        ) {
                                          cStyle["fontWeight"] = "bold";
                                        }
                                        {
                                          /* console.log(lastRowItem); */
                                        }
                                        if (i == 2) {
                                          // cStyle['backgroundColor'] = "#fff";
                                        }

                                        if (
                                          i == 3 &&
                                          l1 == is &&
                                          typeData == "BS" &&
                                          lastRowItem != "column_1"
                                        ) {
                                          // lastR = true;

                                          var newVal =
                                            value.trim() != ""
                                              ? parseFloat(value)
                                              : 0;
                                          if (newVal < 10) {
                                            // cStyle['backgroundColor'] = "#9beb8d";
                                          } else {
                                            // cStyle['backgroundColor'] = "#ffa3a3";
                                          }
                                        }
                                      }
                                    });
                                  }


                                  if(typeData == 'CAP'){
                                    cStyle = {
                                      ...cStyle,
                                      fontWeight: (crtCellData?.isBold ? "500" : "400"),
                                      fontStyle:crtCellData?.isItalic ? "italic" : "",
                                      color: crtCellData?.textcolor != "" ? crtCellData?.textcolor : '#22222F',
                                      backgroundColor: crtCellData?.bgcolor  && "",
                                    }
                                  }
                                  // console.log('crtCellData >>>> ', crtCellData)

                                  return (
                                    <td
                                      key={c1}
                                      style={cStyle}
                                      className="text-[#000] text-[13px]  px-4 py-1 relative"
                                    >
                                      <div className=" flex  items-center gap-1">
                                        {value === " " ? (
                                          <>
                                            <div className="blankCell h-4"></div>
                                          </>
                                        ) : (
                                          <>
                                          
                                            {column?.id === "column_2" &&
                                            ["DIR", "AH"].includes(typeData) ? (
                                              <>
                                                <span
                                                  className="cursor-pointer"
                                                  onClick={() => {
                                                    // dispatch({type:"BoardOfDirectorDetailRequest"});
                                                    setDIR_Model({
                                                      typeData,
                                                      cmpId
                                                    });
                                                    setSelectedDIR(row);
                                                  }}
                                                >
                                                  {column.format &&
                                                  typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                                </span>
                                              </>
                                            ) : (
                                              <>
                                                {column.format &&
                                                typeof value === "number"
                                                  ? column.format(value)
                                                  : value}
                                              </>
                                            )}

                                            {column.id == "column_1" ? (
                                              <>
                                                {value.trim() === "ROE (%)" ||
                                                value.trim() === "ROCE (%)" ||
                                                value.trim() ===
                                                  "Net Debt / Total Equity (x)" ||
                                                value.trim() ===
                                                  "Asset Turnover (x)" ||
                                                value.trim() ===
                                                  "Cash Conversion Cycle (Days)" ||
                                                value.trim() ===
                                                  "Dividend Payout Ratio (%)" ||
                                                value.trim() ===
                                                  "Interest Coverage (x)" ||
                                                value.trim() ===
                                                  "Free Cash Flow (Rs)" ? (
                                                  <Tooltip
                                                    className="text-[11px] "
                                                    content={
                                                      <div className="w-80">
                                                        <Typography
                                                          variant="small"
                                                          color="white"
                                                          className="font-normal opacity-80 capitalize"
                                                        >
                                                          {filterTooltip(value)}
                                                        </Typography>
                                                      </div>
                                                    }
                                                  >
                                                    <span className=" cursor-pointer">
                                                      <LuHelpCircle size={13} />
                                                    </span>
                                                  </Tooltip>
                                                ) : null}
                                              </>
                                            ) : null}
                                          </>
                                        )}
                                        {/* {value} */}
                                      </div>
                                    </td>
                                  );
                                })}



                                
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {typeData == "CF" && i == 0 ? (
                        <>
                          <Checkbox
                            checked={checked}
                            onChange={showHide}
                            name="gilad"
                            label="Show Detailed Data"
                          />
                        </>
                      ) : null}
                    </div>

                    <div>
                      {/*Start  Charts */}
                      {res.sourcePie.length > 0 &&
                      res.ApplicationPie.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {res.sourcePie.length > 0 ? (
                            <>
                              <PieChart
                                ChartTitle="Sources"
                                chartData={res.sourcePie}
                              />
                            </>
                          ) : null}
                          {res.ApplicationPie.length > 0 ? (
                            <>
                              <PieChart
                                ChartTitle="Application"
                                chartData={res.ApplicationPie}
                              />
                            </>
                          ) : null}
                        </div>
                      ) : null}
                      {/*End  Charts */}
                    </div>

                    {/* ---- Start PL Box ----- */}
                    <div className="grid grid-cols-8 gap-2 mt-5">
                      {highlights &&
                        highlights.length > 0 &&
                        highlights.map((highlight, i00) => {
                          {
                            /* console.log('highlight >> ', highlight) */
                          }
                          return (
                            <div
                              key={i00}
                              className="bg-[#E8F0F4] text-center rounded-md pt-3"
                            >
                              <div>
                                <Typography className="text-[15px] text-[#000] font-bold">
                                  {highlight?.title}
                                </Typography>
                                <Typography className="text-[15px] text-[#000] font-bold mb-2">
                                  {highlight?.subtitle}
                                </Typography>
                              </div>
                              <div
                                className="flex  p-4 items-center justify-center text-[#000] font-bold rounded-b border border-[#DAE9F7]"
                                style={{
                                  backgroundColor:
                                    typeData == "BS"
                                      ? "#fff"
                                      : highlight?.arrow == "Up" &&
                                        highlight?.value > 50
                                      ? "#3ED179"
                                      : highlight?.arrow == ""
                                      ? "#F43F3F"
                                      : "#F43F3F",
                                }}
                              >
                                <Typography
                                  className="text-[#000] font-bold text-[15px]"
                                  sx={{ marginTop: 0.5 }}
                                  variant="subtitle2"
                                  fontWeight="bold"
                                >
                                  {highlight?.value}
                                </Typography>
                                {highlight?.arrow == "Up" &&
                                highlight?.value > 50 ? (
                                  <FaLongArrowAltUp className="text-[#000]" />
                                ) : (
                                  <>
                                    {highlight?.arrow == "" ? (
                                      <></>
                                    ) : (
                                      <FaLongArrowAltDown className="text-[#000]" />
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* ---- End PL Box ----- */}

             
                        {
                          ((typeData == 'CF' && i > 1) || (typeData != 'CF')) && (
                              <>  
                               {/* ========== Start Comment Box============ */}
                                  <div></div>
                                  <div className="bg-[#fff] pt-4 pl-4 pb-7 pr-4 mt-3 rounded border border-[#DAE9F7]">
                                    <div className="flex justify-between ">
                                      <Typography className="text-[#000] text-[16px] font-bold">
                                        Comment
                                      </Typography>
                                      <Button
                                        onClick={()=>handleOpen(details, res.Comment)}
                                        className="cursor-pointer py-1 px-3 shadow-none text-[12px] text-[#4448F5] bg-[#ECEDFE]"
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                    <div
                                      className="text-[#606F7B] text-[15px] font-bold"
                                      dangerouslySetInnerHTML={{
                                        __html: res.Comment[0] ? res.Comment[0].description : "",
                                      }}
                                    ></div>
                                  </div>
                                  {/* ========== End Comment Box============ */}
                              </>
                          )
                        }
                        
                    
                  </div>
                  {/* end Main div */}
                </div>
              </>
            );
          })}



          <EditCommentModal
            open={open}
            setOpen={setOpen}
            cancelButton="CANCEL"
            updatButton="UPDATE"
            modalTitle={ModalDetail}
          />
                    



      </div>
    </>
  );
};

export default ForensicData;
