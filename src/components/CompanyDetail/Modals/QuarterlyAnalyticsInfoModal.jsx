import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  IconButton,
  Tooltip,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ConStdArray } from "../../../constants/helper";

const QuarterlyAnalyticsInfoModal = (props) => {
  const { DialogData, setDialogData, activeType } = props;

  const {
    ResultDocument: { data, loading },
  } = useSelector((state) => state.SingleCompany);

  const [NewData, setNewData] = useState({});

  const Ref = useRef(null);
  const [Copied, setCopied] = useState(false);
  const onCopy = (props) => {
    navigator.clipboard.writeText(Ref.current.innerText);
    setCopied(true);
  };

  const getColorStatus = (val = "", type = "", isHide = true) => {
    if (!val) return "N/A";
    let withStatus = val <= 0 ? "Down" : "Up";
    return (
      <>
        {type === "withStatus" && withStatus}{" "}
        <span style={{ color: val <= 0 ? "#DD2025" : "#34A853" }}>
          {val}
          {isHide === true ? "%" : ""}
        </span>
      </>
    );
  };

  const SelectedQType = ConStdArray.find((item) => item.value == activeType);

  useEffect(() => {
    if (!loading) {
      setCopied(false)
      setNewData(data[0]);
    }
  }, [loading]);

  return (
    <>
      {/* <Button onClick={()=>setDialog(!Dialog)}>Long Dialog</Button> */}
      <Dialog open={DialogData} handler={() => setDialogData(null)}>
        {/* <DialogHeader>
         
        </DialogHeader> */}
        <DialogBody className="max-h-[42rem] overflow-auto">


          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner className=" w-12 h-12" />
            </div>
          ) : (
            <>
              <div id="dataToCopy">
                {Copied && (
                  <Alert className=" bg-green-400">
                    Analytics Report Copied!
                  </Alert>
                )}

                {data && data?.length === 0 && (
                  <>
                    N/A
                  </>
                )}

                <div ref={Ref} className=" font-medium text-[15px] text-black">
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <h4 className="text-black">
                        <strong className=" font-bold text-[24px]">
                          {NewData?.company_name}
                        </strong>

                        {
                          (DialogData && typeof DialogData != "boolean") &&  
                          <span className=" font-medium"> {DialogData}</span>
                        }
                      </h4>
                      <h6 className=" text-[13px] text-gray-400">
                        Omkara Results Review{" "}
                        {SelectedQType?.label
                          ? " - " + SelectedQType?.label
                          : ""}
                      </h6>
                    </div>
                    <div className="flex gap-0.5">
                      <IconButton
                        onMouseEnter={() => setCopied(false)}
                        size="sm"
                        className=" bg-transparent shadow-none"
                        onClick={() => onCopy()}
                      >
                        <img
                          className="h-5"
                          src={`${
                            import.meta.env.VITE_BASE_URL
                          }/images/icons/copy_icon.svg`}
                          alt=""
                        />
                      </IconButton>

                      <IconButton
                        size="sm"
                        className=" bg-transparent shadow-none"
                      >
                        <img
                          className="h-5"
                          src={`${
                            import.meta.env.VITE_BASE_URL
                          }/images/icons/wp_icon.svg`}
                          alt=""
                        />
                      </IconButton>
                    </div>
                  </div>
                  <br />

                  <div>
                    M-cap Rs {NewData?.m_cap} Cr, CMP Rs {NewData?.ltp} (52W
                    High Rs {NewData?.week52_high}, 52W Low at Rs{" "}
                    {NewData?.week52_low}){" "}
                  </div>
                  <div>
                    Sales at Rs {NewData?.sales_S1Q} Cr vs {NewData?.sales_S2Q}{" "}
                    Cr QoQ vs Rs {NewData?.sales_S5Q} Cr YoY (
                    {getColorStatus(NewData?.Sales_QOQ_Per, "withStatus")} QoQ,{" "}
                    {getColorStatus(NewData?.Sales_YoY_Per, "withStatus")} YoY){" "}
                  </div>
                  <div>
                    Gross Profit at Rs {NewData?.GrossProfit} Cr vs{" "}
                    {NewData?.GrossProfit_QOQ} Cr QoQ vs Rs{" "}
                    {NewData?.GrossProfit_YoY} Cr YoY (
                    {getColorStatus(NewData?.GrossProfit_QOQ_Per, "withStatus")}{" "}
                    QoQ,{" "}
                    {getColorStatus(NewData?.GrossProfit_YoY_Per, "withStatus")}{" "}
                    YoY)
                  </div>
                  <div>
                    Gross Profit Margin at{" "}
                    {getColorStatus(NewData?.GrossProfitMargin, "")} vs{" "}
                    {getColorStatus(NewData?.GrossProfitMargin_QOQ_Per, "")} QoQ
                    vs {getColorStatus(NewData?.GrossProfitMargin_YoY_Per, "")}{" "}
                    YoY
                  </div>
                  <div>
                    EBIDTA at Rs {NewData?.EBDITA_Cr1Q} Cr vs Rs{" "}
                    {NewData?.EBDITA_Cr2Q} Cr QoQ vs Rs {NewData?.EBDITA_Cr5Q}{" "}
                    Cr YoY (
                    {getColorStatus(NewData?.EBIDTA_Growth_QoQ, "withStatus")}{" "}
                    QoQ,{" "}
                    {getColorStatus(NewData?.EBIDTA_Growth_YoY, "withStatus")}{" "}
                    YoY){" "}
                  </div>
                  <div>
                    EBIDTA Margin at{" "}
                    <span
                      style={{
                        color:
                          NewData?.EBDITA_Margin_Per1Q <= 0 ? "red" : "green",
                      }}
                    >
                      {NewData?.EBDITA_Margin_Per1Q}%
                    </span>{" "}
                    vs{" "}
                    <span
                      style={{
                        color:
                          NewData?.EBDITA_Margin_Per2Q <= 0 ? "red" : "green",
                      }}
                    >
                      {NewData?.EBDITA_Margin_Per2Q}%
                    </span>{" "}
                    QoQ vs{" "}
                    <span
                      style={{
                        color:
                          NewData?.EBDITA_Margin_Per5Q <= 0 ? "red" : "green",
                      }}
                    >
                      {NewData?.EBDITA_Margin_Per5Q}%
                    </span>{" "}
                    YoY{" "}
                  </div>
                  <div>
                    PAT at Rs {NewData?.PAT_Cr1Q} Cr vs Rs {NewData?.PAT_Cr2Q}{" "}
                    Cr QoQ vs Rs {NewData?.PAT_Cr5Q} Cr YoY (
                    {NewData?.PAT_Growth_QoQ_Per <= 0 ? "Down" : "Up"}{" "}
                    <span
                      style={{
                        color:
                          NewData?.PAT_Growth_QoQ_Per <= 0 ? "red" : "green",
                      }}
                    >
                      {" "}
                      {NewData?.PAT_Growth_QoQ_Per}%
                    </span>{" "}
                    QoQ, {NewData?.PAT_Growth_YoY_Per <= 0 ? "Down" : "Up"}{" "}
                    <span
                      style={{
                        color:
                          NewData?.PAT_Growth_YoY_Per <= 0 ? "red" : "green",
                      }}
                    >
                      {NewData?.PAT_Growth_YoY_Per}%
                    </span>{" "}
                    YoY){" "}
                  </div>
                  <div>Stock is trading at TTM P/E of {NewData?.TTM_P_E} </div>
                  {
                    NewData?.EPS && 
                    <div>EPS Rs. {NewData?.EPS}. </div>
                  }
                  <br />
                  <br />

                      {
                        NewData?.Segment &&
                        NewData?.Segment.length > 0 && (
                          <>
                            <div className="text-black text-xl mb-6">
                              <strong>Segmental Performance:-</strong>
                            </div>
                          </>
                        )
                      }
                  

                  {NewData?.Segment &&
                    NewData?.Segment.length > 0 &&
                    NewData?.Segment.map((item, i) => {
                      if (item?.rData && item?.rData.length > 0) {
                        return (
                          <Fragment key={i}>
                            <div className="text-theme">{item?.title}</div>
                            {item?.rData.map((c_item, c_i) => {
                              return (
                                <Fragment key={c_i}>
                                  {c_item.name === "EBIT Margin" ? (
                                    <>
                                      <div>
                                        Segment {c_item.name}{" "}
                                        {getColorStatus(
                                          c_item?.value,
                                          "",
                                          false
                                        )}{" "}
                                        Vs {getColorStatus(c_item.YoY)} YoY, Vs{" "}
                                        {getColorStatus(c_item.QoQ)} QoQ
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        Segment {c_item.name}{" "}
                                        {getColorStatus(
                                          c_item.YoY,
                                          "withStatus"
                                        )}{" "}
                                        YoY,{" "}
                                        {getColorStatus(
                                          c_item.QoQ,
                                          "withStatus"
                                        )}{" "}
                                        QoQ at Rs.{c_item.value} Cr.
                                      </div>
                                    </>
                                  )}
                                </Fragment>
                              );
                            })}
                            <br />
                          </Fragment>
                        );
                      }
                    })}
                </div>
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            className="bg-theme"
            fullWidth
            onClick={() => setDialogData(null)}
          >
            Go Back
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default QuarterlyAnalyticsInfoModal;
