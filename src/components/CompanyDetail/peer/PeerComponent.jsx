import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import PeerRatiosNdCmp from "./PeerRatiosNdCmp";
import PeerAnalysis from "./PeerAnalysis";
import { useDispatch } from "react-redux";
import { RatioMasterAPI } from "../../../store/slice/MasterSlice";
import { GlobalContext } from "../../../context/GlobalContext";

const PeerComponent = () => {

  const rr_dispatch = useDispatch();

  const [ShowRatioObj, setShowRatioObj] = useState(null);

  const ref1 = useRef()
  const ref2 = useRef()

  useEffect(() => {
    rr_dispatch(RatioMasterAPI())
  }, [rr_dispatch])
  

  const {
    // PeersAnalyticsCancelRef,
    PeersBtnRef1,
    PeersBtnRef2,
    setPeersModal
  } = useContext(GlobalContext)




  const primaryButton = [
    {
      id: "1",
      label: "Manage Ratios & Companies",
      value: "ratios_cmp",
      ref_d:PeersBtnRef1,
      component: (
        <>
          <PeerRatiosNdCmp />
        </>
      ),
    },
    {
      id: "2",
      label: "Peer Analysis",
      value: "peer",
      ref_d:PeersBtnRef2,
      component: (
        <>
          <PeerAnalysis ShowRatioObj={ShowRatioObj} setShowRatioObj={setShowRatioObj} />
        </>
      ),
    },
  ];
  const [PrimaryBtn, setPrimaryBtn] = useState(primaryButton[0]);


  return (
    <>
      <div>
        <div className="flex gap-2 mb-4">
          {primaryButton.map((item, i) => (
            <>
              <Button
                //   disabled={tabBtnData?.button_status[item?.value] ? false : true}
                ref={item?.ref_d}
                onClick={() => {
                  setPrimaryBtn(item);
                  if(i == 0){
                    setPeersModal(true)
                  }
                }}
                size="sm"
                variant={`${PrimaryBtn.value == item?.value ? "" : "outlined"}`}
                className={`${
                  PrimaryBtn.value == item?.value
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
      <div>
        {PrimaryBtn.component}
      </div>
    </>
  );
};

export default PeerComponent;
