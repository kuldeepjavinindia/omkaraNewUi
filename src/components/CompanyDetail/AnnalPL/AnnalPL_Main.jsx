import { useEffect, useState } from 'react'
import { ButtonGroup, Button } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import P_L_Statement from './P_L_Statement';
import P_L_Chart from './P_L_Chart';
import { useSelector } from 'react-redux';

const AnnalPL_Main = () => {

  

  const RightSideTabs = {
    tab_1: {
      activeType: "con",
      button_status: {
        con: false,
        std: false,
      },
      func: () => {}
    },
    tab_2: {
      activeType: "con",
      button_status: {
        con: false,
        std: false,
      },
      func: () => {}
    }
  };


  
    const rrd_params = useParams();
    
    let cmpId = rrd_params?.company_id;
    if(cmpId){
      cmpId = window.atob(cmpId);
    }
    
  const [UpdateRightSideTabs, setUpdateRightSideTabs] = useState(RightSideTabs);


    const primaryButton = [
        {
          label: "Consolidate",
          isConStd:true,
          value: "con",
          id: "1",
        },
        {
          label: "Standalone ",
          value: "std",
          id: "2",
        },
      ];
    
      const secondaryButton = [
        {
          label: "P&L Statement",
          component:(
            <>
                <P_L_Statement UpdateRightSideTabs={UpdateRightSideTabs} setUpdateRightSideTabs={setUpdateRightSideTabs} />
            </>
          ),
          value: "con",
          id: "1",
        },
        {
          label: "Chart ",
          isConStd:true,
          component:(
            <>
                <P_L_Chart UpdateRightSideTabs={UpdateRightSideTabs} setUpdateRightSideTabs={setUpdateRightSideTabs} />
            </>
          ),
          value: "std",
          id: "2",
        },
      ];

      const {
        DateACE:{
          data: DateACEData,
          // loading: DateACELoading
        },
      } = useSelector(state=>state.SingleCompany)

      
  const [PrimaryBtn, setPrimaryBtn] = useState(primaryButton[0]);
  const [SecondaryBtn, setSecondaryBtn] = useState(secondaryButton[0]);


  return (
    <>

      <div className="flex justify-between mb-2">
        <div>
          <div className="flex gap-2 mb-4">
            
            {primaryButton.map((item, i) => {

              let keyName = `tab_${SecondaryBtn?.id}`;
              let tabBtnData = UpdateRightSideTabs[keyName];
              
              return (
                <>
                  <Button
                    disabled={tabBtnData?.button_status[item?.value] ? false : true}
                    onClick={() => {
                      setPrimaryBtn(item)
                      let nTab_1 = tabBtnData;
                      nTab_1 = {
                        ...nTab_1,
                        activeType: item?.value
                      }
                      setUpdateRightSideTabs(prev=>({...prev, [keyName]: nTab_1}));
                      tabBtnData.func(item?.value);
                    }}
                    size="sm"
                    variant={`${PrimaryBtn?.id == item?.id ? "" : "outlined"}`}
                    className={`${
                      PrimaryBtn?.id == item?.id
                        ? "bg-theme"
                        : "text-theme border-theme"
                    }`}
                    key={i}
                  >
                    {item.label}
                  </Button>
                </>
            )})}
          </div>
        </div>
        <div>
          <ButtonGroup ripple={false} size="sm" className=" border-[1px] rounded-lg mb-4 shadow-none justify-end">
            {secondaryButton.map((item, i) => {
              return (
                <Button
                  key={i} 
                  className={`border-none  shadow-none hover:shadow-none ${SecondaryBtn.id == item.id ? "bg-[#22242F] text-white" : "bg-white text-[#606F7B]"}  `}
                  onClick={() => {
                    setSecondaryBtn(item)
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </ButtonGroup>
          
          <div className="flex text-[12px] justify-between text-black gap-3">
            <div className=" font-medium">
            <>
                  Updated On {DateACEData?.PnL}
            </>
              
              </div>
            <div className=" font-bold">(In Cr.)</div>
          </div>

        </div>
      </div>


      
      <div>
            {SecondaryBtn.component}
        </div>



    </>
  )
}

export default AnnalPL_Main
