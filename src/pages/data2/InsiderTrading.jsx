import FilterSidebarInsideTrading from "./../../components/data2/Insider/FilterSidebarInsideTrading";
import InsidertTradingTable from "./../../components/data2/Insider/InsidertTradingTable";

const InsiderTrading = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-1 pt-2">
        <FilterSidebarInsideTrading />

        <div className="sc-container col-span-9">
          <InsidertTradingTable />
        </div>
      </div>
    </>
  );
};

export default InsiderTrading;
