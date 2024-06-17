import { useDispatch, useSelector } from "react-redux";
import { Bulk_BlockDetail_Req } from "../../../constants/defaultRequest";
import { useContext, useEffect } from "react";
import { Bulk_BlockDetailApi } from "../../../store/slice/Data2Slice";
import { GlobalContext } from "../../../context/GlobalContext";

const BulkDealTableModal = () => {
  
  const {
    Bulk_BlockDetail:{
      data: Bulk_BlockDetailData,
      loading: Bulk_BlockDetailLoading,
    }
  } = useSelector(state=> state.Data2)
  const rr_dispatch = useDispatch();



  
  const {
    BulkDealInsiderModalBtn,
    // setBulkDealInsiderModalBtn
  } = useContext(GlobalContext)




  const callAPi = () => {
      let params = Bulk_BlockDetail_Req
      params = {
        ...params,
        SymbolID: BulkDealInsiderModalBtn?.companyId
      }
      rr_dispatch(Bulk_BlockDetailApi(params))
  }

  useEffect(() => {
    if(Bulk_BlockDetailLoading){
      callAPi();
    }
  }, [])

  useEffect(() => {
      if(!Bulk_BlockDetailLoading){
        console.log('Bulk_BlockDetailData >>> ', Bulk_BlockDetailData)
      }
  }, [rr_dispatch, Bulk_BlockDetailLoading])



    return (
        <>


        
    {/* <table className="forensicTable w-full  h-full">
    <thead>
      <tr className="!bg-[#1E233A]">
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> COMPANY NAME </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Date </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Action </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Quantity </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Avg Price </th>
        <th className="!text-white p-2 text-[12px] xl:text-[13px] font-semibold "> Net Value (in Cr) </th>
     
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
       
      </tr>

      <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-left cursor-pointer"
        >Bharat Dynamics Ltd.</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Category Name</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">Net</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">10204</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#000] font-semibold text-right">28 Dec 2023</td>
        <td className="p-2 text-[12px] xl:text-[13px] text-[#23A356] font-semibold text-right">1,03,85</td>

      </tr>
     
    </tbody>
   
     </table> */}
        </>
    )
}
export default BulkDealTableModal