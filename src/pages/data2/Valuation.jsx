import { useEffect } from "react";
import FilterSidebarValuation from "../../components/data2/Valuation/FilterSidebarValuation";
import ValuationTable from "../../components/data2/Valuation/ValuationTable";
import { useDispatch, useSelector } from "react-redux";
import FilterItemChips from "../../components/data2/FilterItemChips";
// import { ValuationApi } from "../../store/slice/Data2Slice";

const Valuation = () => {


  // const rr_dispatch = useDispatch()

  const {
    Valuation:{
      loading: ValuationLoading,
      data: ValuationData,
    }
  } = useSelector(state=>state.Data2)


  // const callApi = () => {

  //   let params = []

  //   rr_dispatch(ValuationApi(params))
  // }
  
  
  // useEffect(() => {
  //   // callApi()
  // }, [])
  







  useEffect(() => {
    if(!ValuationLoading){
      // console.log('ValuationData >>> ', ValuationData)
    }
  }, [ValuationLoading])
  






  
  const removeItem = (itemKey) => {


    // const topLabels = filterInputMaster;
    // let topLabels1 = null;
    // // let topLabels2 = null;
    // Object.keys(topLabels).map((key)=>{
    //   if(itemKey == key){
    //       topLabels1 = topLabels[itemKey];
    //       topLabels1 = {...topLabels1, value1:'', value2:''};
    //       topLabels[itemKey] = topLabels1;
    //   }
    // })
    // console.log('topLabels >'+topLabels)
    
    // const filterArray = valuationFilters(topLabels);
    // dispatch(valuationFilterInputAction(topLabels));
    // dispatch(valuationDataAction(filterArray));

    
}





  return (
    <>
      <div className=" pt-2 FilterSidebar-Content-Layout">
        <FilterSidebarValuation />

        <div className="sc-container ">
          <FilterItemChips />
          <ValuationTable bodyData={ValuationData?.Data} headers={ValuationData?.Headers} />
        </div>
      </div>
    </>
  );
};

export default Valuation;
