import { Button, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SCQtrSegmentApi } from "../../store/slice/SingleCompnaySlice";
import { SC_Segment_Req } from "../../constants/defaultRequest";
import { useParams } from "react-router-dom";

const Quarterly_P_L_Segment = () => {
  const rr_dispatch = useDispatch();
  const {
    SCQtrSegment: { data: SCQtrSegmentData, loading: SCQtrSegmentLoading },
  } = useSelector((state) => state.SingleCompany);

  const rrd_params = useParams();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const [QuarterlySegmentData, setQuarterlySegmentData] = useState({
    _Headers: [],
    tableBody: [],
  });
  const [QuarterlySegmentActiveFilter, setQuarterlySegmentActiveFilter] =
    useState({});


    
  const selectSegmentButton = (key, val) => {
    let a0 = QuarterlySegmentActiveFilter;
    a0 = {...a0, [key]:val }
    setQuarterlySegmentActiveFilter(a0);
    console.log(QuarterlySegmentActiveFilter)
  }


  useEffect(() => {
    if (SCQtrSegmentLoading) {
      let params = SC_Segment_Req;
      params = {
        ...params,
        companyID: cmpId,
      };
      rr_dispatch(SCQtrSegmentApi(params));
    }
  }, [rr_dispatch]);

  useEffect(() => {
    if (!SCQtrSegmentLoading) {
      if (SCQtrSegmentData._Headers && SCQtrSegmentData._Headers.length > 0) {
        let _Headers = SCQtrSegmentData._Headers;
        let qData = SCQtrSegmentData.Data;

        var mColArr = [];
        var width = 120;
        _Headers.map((head) => {
          var hData = {
            id: head["column"],
            label: head["value"],
            minWidth: width,
            maxWidth: width,
            align: "canter",
            hideCheck: null,
            sticky: null,
            extra: head,
          };
          mColArr.push(hData);
        });

        let sData = {
          _Headers: mColArr,
          tableBody: qData,
        };

        setQuarterlySegmentData(sData);

        // console.log('SC_Segment_Req >>> ', sData);
      }
    }
  }, [rr_dispatch, SCQtrSegmentLoading]);

  return (
    <>
      <div className="pl_segment-container">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {QuarterlySegmentData._Headers.map((column, cKey) => {
                let cStyle = {};
                // let valueRow = column.extra;
                let value = column.label;
                cStyle = { ...cStyle };
                //   cStyle = {...cStyle, backgroundColor:valueRow?.bgColor, color:valueRow?.textColor};
                if (cKey !== 0) {
                  cStyle = { ...cStyle, textAlign: "center" };
                }
                return (
                  <>
                    <th
                      style={cStyle}
                      key={column.id}
                      align={column.align}
                      className="text-ellipsis border-b border-blue-gray-100 bg-[#22242F] text-white p-2 text-[13px] font-medium"
                    >
                      {column?.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </th>
                  </>
                );
              })}

            </tr>
          </thead>
          <tbody className="text-black">
            {QuarterlySegmentData.tableBody.map((row, rKey) => {
              // let cStyle = {};
              // cStyle = { ...cStyle };
              let rowData = row.data_new;

              let nData = {};
              if (rowData.length > 0) {
                rowData = rowData[0];
                let getKey = "amount";
                if (
                  QuarterlySegmentActiveFilter &&
                  Object.keys(QuarterlySegmentActiveFilter).length ===
                    QuarterlySegmentData?.tableBody.length
                ) {
                  getKey = QuarterlySegmentActiveFilter[rKey];
                }
                rowData = rowData[getKey];
                nData = rowData[0]._cell;
              }
              nData = rowData[0]._cell;
              let lastColData = rowData[rowData.length - 1]._cell;

              let lastRowData = [];
              nData.map((lrd, lrd_index) => {
                let lrd_0 = lastColData[lrd_index];

                let n_val = parseFloat(0);

                if (lrd_0?.value != null) {
                  n_val = lrd_0.value.replace(",", "");
                  n_val = n_val.replace("%", "");
                  n_val = parseFloat(n_val);
                }

                lrd_0 = { ...lrd_0, column: lrd.column, new_value: n_val };
                lastRowData.push(lrd_0);
              });
              lastRowData.sort((a, b) => {
                return b.new_value - a.new_value;
              });
              let lastRowNegative = Number(0);
              lastRowData.map((o_l) => {
                if (o_l.value == null) {
                  let a000000000 = lastRowData[lastRowData.length - 1];
                  lastRowNegative = a000000000.new_value;
                  o_l.new_value = lastRowNegative - 1;
                }
              });
              nData = lastRowData;
              nData.sort((a, b) => {
                return b.new_value - a.new_value;
              });

              return (
                <Fragment key={rKey}>
                  <tr
                    className="odd:bg-[#E8F0F4] even:bg-[#fff]"
                    tabIndex={-1}
                    key={"rKey__" + rKey}
                  >
                    <td
                      className="px-2 py-1 text-[13px] font-medium"
                      colSpan={
                        QuarterlySegmentData._Headers &&
                        QuarterlySegmentData._Headers.length
                      }
                    >
                      <div className="flex  justify-between w-full">
                        <Typography className=" font-bold text-[14px]">
                          Sales
                        </Typography>
                        <div className="flex gap-2">
                        {
                            row.filter_data.map((fItem, fKey)=>{ 
                              if(fKey === 0 && !QuarterlySegmentActiveFilter[rKey]){
                                let a0 = QuarterlySegmentActiveFilter;
                                a0 = {...a0, [rKey]:fItem.value }
                                setQuarterlySegmentActiveFilter(a0)
                              }
                              return (
                                <>
                                  <Button
                                    variant="outlined"
                                    size="sm"
                                    className={`py-0 text-[11px] bg-white ${QuarterlySegmentActiveFilter[rKey] === fItem.value ? 'text-theme border-theme' : 'text-gray-600 border-gray-400'} rounded`}
                                    onClick={()=>selectSegmentButton(rKey,fItem.value)}
                                  >
                                    {fItem.label}
                                  </Button>

                                </>
                              )
                            })
                          }

                        </div>
                      </div>
                    </td>
                  </tr>

                  {
                          nData.map((childItem, chKey)=>{
                            
                            return (
                              <>
                              <tr key={chKey} className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                                {
                                  QuarterlySegmentData._Headers.map((column, cKey)=>{
                                    // let valueRow = rowData[cKey]._cell[chKey]
                                    let valueRow = rowData[cKey]._cell.find(ff_item=>ff_item.column == childItem.column)
                                    let cStyle_1 = {};
                                    let value = valueRow?.value;
                                    if(cKey > 0 && value != null && QuarterlySegmentActiveFilter[rKey] === 'amount'){
                                        value = value.substring(0, value.indexOf('.'));
                                    }

                                    cStyle_1 = {...cStyle_1};
                                    if(cKey !== 0){
                                      cStyle_1 = {...cStyle_1, textAlign:'center'};
                                    }
                                    return (
                                      <td className="px-2 py-1 text-[13px] font-medium" style={cStyle_1} key={column.id} align={column.align} >
                                        {
                                          column?.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value
                                        }
                                      </td>
                                    )
                                  })
                                }
                              </tr>
                              </>
                            )
                          })
                        }
                        
                </Fragment>
              );
            })}
            
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Quarterly_P_L_Segment;
