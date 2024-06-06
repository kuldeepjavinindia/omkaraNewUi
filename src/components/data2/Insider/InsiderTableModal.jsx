
const InsiderTableModal = () => {
    return (
        <>
    <table className="forensicTable w-full  h-full">
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
   
     </table>
        </>
    )
}
export default InsiderTableModal