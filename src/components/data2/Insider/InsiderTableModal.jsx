import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { InsiderDetail_Req } from "../../../constants/defaultRequest";
import InsiderPopupMUITable from "../MUITable/InsiderPopupMUITable";
import { InsiderDetailApi } from "../../../store/slice/Data2Slice";
import { GlobalContext } from "../../../context/GlobalContext";

const InsiderTableModal = () => {

  // const [first, setfirst] = useState(second)


  const [TableHeader, setTableHeader] = useState([]);
  const [TableRows, setTableRows] = useState([]);

  
  const {
    BulkDealInsiderModalBtn,
    // setBulkDealInsiderModalBtn
  } = useContext(GlobalContext)

  const {
    InsiderDetail:{
      data: InsiderDetailData,
      loading: InsiderDetailLoading,
    }
  } = useSelector(state=> state.Data2)
  const rr_dispatch = useDispatch();

  const callAPi = () => {
      let params = InsiderDetail_Req
      params = {
        ...params,
        SymbolID: BulkDealInsiderModalBtn?.companyId
      }
    rr_dispatch(InsiderDetailApi(params))
  }

  useEffect(() => {
    if(InsiderDetailLoading){
      callAPi();
    }
  }, [])

  useEffect(() => {
      if(!InsiderDetailLoading){
        // console.log('')

        let Arr = [];
        InsiderDetailData?.Header && InsiderDetailData?.Header.map((item)=>{
            var dd = {
                id: item?.column,
                label: item?.value,
                sticky: false, 
                minWidth: 150
            }
            Arr.push(dd)
        });
        setTableHeader(Arr);

        let bodyArr0 = [];
        let isFloatCol = ["column_5","column_6", "column_8", "column_9", "column_10", "column_11"];
        let minDigits_ZERO = ["column_5", "column_8", "column_10"];
        InsiderDetailData?.Data.map((item)=>{
            let dd = item.TableData;
            let a10 = [];
            dd.map((a0 )=>{
              // let a000 = {[a0.column]:a0};
              let c_all = a0.column + '_all';
              let valueItem = a0.value;
              if(isFloatCol.includes(a0?.column) && valueItem !== ''){
                valueItem = parseFloat(valueItem);
                let minimumFractionDigits = 2;
                if(minDigits_ZERO.includes(a0?.column)){
                  minimumFractionDigits = 0;
                }
                valueItem =  valueItem.toLocaleString('en-IN', {minimumFractionDigits: minimumFractionDigits})
              }
              a10 = { ...a10, [a0.column]:valueItem, [c_all]:a0 }
            })
            bodyArr0.push(a10);
        });
        setTableRows(bodyArr0);


      }
  }, [rr_dispatch, InsiderDetailLoading])
  


    return (
        <>
      
      {/* {JSON.stringify(InsiderDetailLoading)}
      {JSON.stringify(TableHeader)} */}
      {/* {JSON.stringify(BulkDealInsiderModalBtn)} */}
      <InsiderPopupMUITable tableColumns={TableHeader} tableRows={TableRows}  />

    {/* <table className="forensicTable w-full  h-full">
    <thead>
      <tr className="!bg-[#1E233A]">
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> COMPANY NAME </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Client Category </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Action </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Reported To Exchange </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Quantity </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Avg Price </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Net Value (in Cr) </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Post Transaction Holding </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Traded % </th>
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-left cursor-pointer"
        >Bharat Dynamics Ltd.</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Category Name</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Net</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">28 Dec 2023</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#23A356] font-semibold text-right">1,03,85</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">32.5</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">0/33</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">0</td>
      </tr>

    </tbody>
   
     </table> */}
        </>
    )
}
export default InsiderTableModal