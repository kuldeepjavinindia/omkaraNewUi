
const BulkDealTableModal = () => {
    return (
        <>
    <table className="forensicTable w-full  h-full">
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
   
     </table>
        </>
    )
}
export default BulkDealTableModal