import FilterSidebarPriceAction from "./../../components/data2/PriceAction/FilterSidebarPriceAction"
import PriceActionTable from "./../../components/data2/PriceAction/PriceActionTable"

const PriceAction = ()=> {
    return (
        <>
        <div className="pt-2 FilterSidebar-Content-Layout">
          <FilterSidebarPriceAction/>

            <div className="sc-container ">
            <PriceActionTable/>
            </div>

        </div>
        </>
    )
}

export default PriceAction