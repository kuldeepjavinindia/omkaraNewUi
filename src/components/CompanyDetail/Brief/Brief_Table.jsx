import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  BarChartData_Columns_Rows,
  SCValuationDataApi,
} from "../../../store/slice/SingleCompnaySlice";
import { SC_BriefTable_Req } from "../../../constants/defaultRequest";
import { IconButton } from "@material-tailwind/react";
import { BsFillBarChartFill } from "react-icons/bs";

const Brief_Table = () => {
  const [TableColumns, setTableColumns] = useState([]);
  const [TableBody, setTableBody] = useState([]);

  const rr_dispatch = useDispatch();
  const rrd_params = useParams();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const {
    SCValuationData: { data: BriefData, loading: BriefLoading },
  } = useSelector((state) => state.SingleCompany);

  const showChart = (row) => {
    let newRow = {};
    Object.keys(row).map((item) => {
      let a0 = {
        bg_color: "#ccdbf5",
        isBold: true,
        isItalic: false,
        label: row[item],
        text_color: "#000",
      };
      newRow = { ...newRow, [item]: a0 };
    });

    rr_dispatch(
      BarChartData_Columns_Rows({ columns: TableColumns, rows: newRow })
    );
  };

  useEffect(() => {
    if (BriefLoading) {
      let params = SC_BriefTable_Req;
      params = {
        ...params,
        CompanyID: cmpId,
      };
      rr_dispatch(SCValuationDataApi(params));
    }
    if (!BriefLoading) {
      // console.log('BriefData >>> ', BriefData)

      const { Data, Header } = BriefData;

      if (Header && Header.length) {
        let cols = [];
        let a0 = Header[0];
        Object.keys(a0).map((item, i) => {
          if (i > 0) {
            let dd = {
              id: item,
              width: "",
              align: "",
              label: a0[item],
            };
            cols.push(dd);
          }
        });
        setTableColumns(cols);
      }
      if (Data && Data.length) {
        let dataA = [];
        let a00 = Data[0]?.Valuations || Data[0]?.ValuationValues;

        Object.keys(a00).length > 0 &&
          Object.keys(a00).map((item, i) => {
            if (i > 0) {
              let cData = a00[item];
              let childObj = {};
              Object.keys(cData).map((item0, i0) => {
                if (i0 > 0) {
                  childObj = { ...childObj, [`Column${i0}`]: cData[item0] };
                }
              });
              dataA.push(childObj);
            }
          });
        // console.log(dataA);
        setTableBody(dataA);
      }
    }
  }, [rr_dispatch, BriefLoading]);

  return (
    <>
      <div className="pl_segment-container">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className={`!bg-[#22242F]`}>
              {TableColumns.map((item, i) => {
                return (
                  <td
                    className={`!text-white p-2 text-[13px] font-semibold !bg-[#22242F] ${i!=0 ? "text-center" : ""}`}
                    key={i}
                  >
                    {item.label}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TableBody.map((row, i) => {
              return (
                <tr className="odd:bg-[#E8F0F4] even:bg-[#fff]" key={i}>
                  {TableColumns.map((item, i) => {
                    let value = row[item.id];
                    return (
                      <td key={i} className={`text-[13px] px-2 font-medium `}>
                        {/* {value} */}
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent:
                              i === 0 ? "space-between" : "center",
                            alignItems: "center",
                          }}
                        >
                          {value || ""}
                          <span>
                            {i === 0 && (
                              <IconButton
                                className={` bg-transparent text-black shadow-none hover:shadow-none`}
                                size="sm"
                                onClick={() => showChart(row)}
                              >
                                <img src= {import.meta.env.VITE_BASE_URL  + "/images/icons/resultChartIcon.svg"} alt=""  className="w-[20px]" />
                              </IconButton>
                            )}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Brief_Table;
