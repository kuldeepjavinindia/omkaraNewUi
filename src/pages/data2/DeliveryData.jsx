
import FilterSidebarDeliveryData from "./../../components/data2/DeliveryData/FilterSidebarDeliveryData"
import DeliveryDataTable from "./../../components/data2/DeliveryData/DeliveryDataTable";

const DeliveryData = ()=> {
    return (
        <>
        <div className="pt-2 FilterSidebar-Content-Layout">
          <FilterSidebarDeliveryData />

            <div className="sc-container ">
            <DeliveryDataTable />
            </div>

        </div>
        </>
    )
}

export default DeliveryData