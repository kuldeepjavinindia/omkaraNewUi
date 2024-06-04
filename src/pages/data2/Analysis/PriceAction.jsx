import FilterSidebarPriceAction from "../../../components/data2/filter/Analysis/FilterSidebarPriceAction"
import PriceActionTable from "../../../components/data2/filter/Analysis/PriceActionTable"

const PriceAction = ()=> {
    return (
        <>
        <div className="grid grid-cols-12 gap-1 pt-2">
            <FilterSidebarPriceAction/>

            <div className="sc-container col-span-9">
             <PriceActionTable/>
            </div>

        </div>
        </>
    )
}

export default PriceAction