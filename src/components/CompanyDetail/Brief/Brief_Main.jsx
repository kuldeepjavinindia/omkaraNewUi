import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Brief_Table from "./Brief_Table";
import Brief_Chart from "./Brief_Chart";
import {
    Alert,
  Button,
  ButtonGroup,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { RatioMasterAPI } from "../../../store/slice/MasterSlice";
import { SCData20YearsApi } from "../../../store/slice/SingleCompnaySlice";
import { SC_Data20_Req } from "../../../constants/defaultRequest";

const Brief_Main = () => {
  const rr_dispatch = useDispatch();
  const rrd_params = useParams();
  const [RatiosCategory, setRatiosCategory] = useState(false);
  const [DisabledItem, setDisabledItem] = useState(false);
  const [Checked, setChecked] = useState(false);
  const [ShowError, setShowError] = useState(false);

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const {
    RatioMaster: { data: RMData, loading: RMLoading },
  } = useSelector((state) => state.Masters);

//   const {
//     SCData20Years:{
//         // data: Year20Data,
//         loading: Year20Loading
//     }
//   } = useSelector(state=>state.SingleCompany);

  const secondaryButton = [
    {
      label: "Table",
      component: (
        <>
          <Brief_Table />
        </>
      ),
      id: "1",
    },
    {
      label: "Chart",
      isConStd: true,
      component: (
        <>
          <Brief_Chart />
        </>
      ),
      id: "2",
    },
  ];

  const [SecondaryBtn, setSecondaryBtn] = useState(secondaryButton[0]);
  const [ShowFilter, setShowFilter] = useState(false);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    
    if (Checked.length < 6 || Checked.includes(value)) {
        const newChecked = [...Checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // console.log('newChecked >>> ', newChecked)
        if(newChecked.length === 0){
            setShowError(true)
        }else{
            setShowError(false)
        }
        setChecked(newChecked);
        setDisabledItem(false);
    } else {
        setDisabledItem(true);
    }
};
const applyChart = (chartType) => {
    if (!chartType.length) {
        chartType = RMData.map(item=>item.Name);
    }

    let params = SC_Data20_Req;
        params = {
            ...params,
            CompanyId: cmpId,
            Param: chartType,
            "ChartType": "Annually"
        }
        rr_dispatch(SCData20YearsApi([params]))


    // dispatch(vdrData20YearsAction([
    //     {
    //         "CompanyID": companyId,
    //         "userid": 1,
    //         "Param": chartType,
    //         "ChartType": "Annually"
    //     }
    // ]))


    // rr_dispatch()


    

}


  useEffect(() => {
    if (RMLoading) {
      rr_dispatch(RatioMasterAPI());
    }
    if (!RMLoading) {
      const uniquePeerRatioData = [
        ...new Set(RMData.map((item) => item?.category)),
      ];
      setRatiosCategory(uniquePeerRatioData);
      let aaa = RMData.filter((item) => item?.is_selected === true);
      setChecked(aaa.map((item) => item?.Name));


    //   if (Year20Loading) {
    //     let params = SC_Data20_Req;
    //     params = {
    //         ...params,
    //         CompanyId: cmpId,
    //         Param: RMData.filter(itm=>itm.is_selected === true).map(item=>item.Name),
    //         "ChartType": "Annually"
    //     }
    //     rr_dispatch(SCData20YearsApi([params]))
    // }
    
    }
  }, [rr_dispatch, RMLoading]);

  return (
    <>
   
      <div className="flex justify-between mb-2">
        <div>
            {
                SecondaryBtn.id == 2 && (
                    <>
                    <div className="flex gap-1">
                      {ShowFilter ? (
                        <>
                          <Button className={``} color="green" size="sm"
                              onClick={() => { applyChart(Checked); setShowFilter(!ShowFilter); }}
                              disabled={Checked.length === 0 ? true : false}
                          >
                            Apply
                          </Button>
                          <Button className={``} color="purple" size="sm"
                          onClick={() => { setDisabledItem(false); setChecked([]); setShowError(false) }}
                          disabled={Checked.length === 0 ? true : false}
                          >
                            Uncheck All
                          </Button>
                          <Button
                            onClick={() => setShowFilter(!ShowFilter)}
                            className={``}
                            color="red"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setShowFilter(!ShowFilter)}
                          className={`bg-theme`}
                          size="sm"
                        >
                          Choose Chart
                        </Button>
                      )}
                    </div>
                    
                    </>
                )
            }

        </div>
        <div>
        <Typography className="text-[13px] text-[#000] font-medium">
      Cons Priority  (In Cr.)
    </Typography>
          <ButtonGroup
            ripple={false}
            size="sm"
            className=" border-[1px] rounded-lg shadow-none"
          >
            {secondaryButton.map((item, i) => {
              return (
                <Button
                  key={i}
                  className={`border-none  shadow-none hover:shadow-none ${
                    SecondaryBtn.id == item.id
                      ? "bg-[#22242F] text-white"
                      : "bg-white text-[#606F7B]"
                  }  `}
                  onClick={() => {
                    setSecondaryBtn(item);
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
      </div>

{
    ShowFilter ? 
        <>
        
      <div className=" bg-white p-5 mb-3 rounded-lg">
      {
                                DisabledItem ?
                                    <>
                                        <Alert
                                            className=" bg-red-300 mb-2"
                                            size="sm"
                                        >
                                            You can select upto {Checked.length} chart type.
                                        </Alert>
                                    </>
                                    :
                                    null
                            }
                             {
                                ShowError ?
                                    <>
                                        <Alert
                                           className=" bg-red-300 mb-2"
                                           size="sm"
                                        >
                                            Please select minimum 1 chart.
                                        </Alert>
                                    </>
                                    :
                                    null
                            }


        <div className=" grid grid-cols-5">
          {RatiosCategory.length > 0 &&
            RatiosCategory.map((c_item, i00) => {
              return (
                <>
                  <div key={i00} >
                    <Typography className=" font-semibold text-md text-black">
                      {c_item}
                    </Typography>
                  
                    <div>
                    {RMData &&
                      RMData.length > 0 &&
                      RMData.filter((fItm) => fItm.category === c_item).map(
                        (value, i1) => {
                          return (
                            <div key={i1}>
                              <Checkbox
                                checked={Checked.indexOf(value.Name) !== -1}
                                onClick={() => {
                                    handleToggle(value.Name)
                                }} 
                                label={
                                  <Typography
                                    color="blue-gray"
                                    className="flex font-medium"
                                  >
                                    {value.Name}
                                  </Typography>
                                }
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>

        </>
    :
        <>
        </>

}

      <div>{SecondaryBtn.component}</div>
    </>
  );
};

export default Brief_Main;
