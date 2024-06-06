import DeliveryDataTable from "../../components/data2/filter/DeliveryData/DeliveryDataTable"
import FilterSidebarDeliveryData from "../../components/data2/filter/DeliveryData/FilterSidebarDeliveryData"

const DeliveryData = ()=> {
    return (
        <>
        <div className="grid grid-cols-12 gap-1 pt-2">
            <FilterSidebarDeliveryData/>

            <div className="sc-container col-span-9">
             <DeliveryDataTable/>
            </div>

        </div>
        </>
    )
}

export default DeliveryData