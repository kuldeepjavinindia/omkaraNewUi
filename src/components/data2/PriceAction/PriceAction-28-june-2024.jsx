import FilterItemChips from "../../components/data2/FilterItemChips";
import FilterSidebarPriceAction from "./../../components/data2/PriceAction/FilterSidebarPriceAction";
import PriceActionTable from "./../../components/data2/PriceAction/PriceActionTable";
import { PriceActionApi } from "../../store/slice/Data2Slice";
import { priceActionFilters } from "../../constants/helper";

const PriceAction = () => {
  return (
    <>
      <div className="pt-2 FilterSidebar-Content-Layout">
        <FilterSidebarPriceAction />


        <div className="sc-container ">
        <FilterItemChips  dispatchName = {PriceActionApi} finalRquest =  {priceActionFilters} />
          <PriceActionTable />
        </div>
      </div>
    </>
  );
};

export default PriceAction;
