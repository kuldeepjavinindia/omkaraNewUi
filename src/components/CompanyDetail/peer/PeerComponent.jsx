import { Button } from "@material-tailwind/react";
import { useState } from "react";
import PeerRatiosNdCmp from "./PeerRatiosNdCmp";
import PeerAnalysis from "./PeerAnalysis";

const PeerComponent = () => {
  const primaryButton = [
    {
      id: "1",
      label: "Manage Ratios & Companies",
      value: "ratios_cmp",
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
      component: (
        <>
          <PeerAnalysis />
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
                onClick={() => {
                  setPrimaryBtn(item);
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
    </>
  );
};

export default PeerComponent;
