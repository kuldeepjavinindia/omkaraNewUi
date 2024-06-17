import BulkDealInsiderModal from "../../components/CompanyDetail/Modals/BulkDealInsiderModal";
import BulkBlockTable from "./../../components/data2/BulkBlock/BulkBlockTable";
import FilterSidebarBulkBlock from "./../../components/data2/BulkBlock/FilterSidebarBulkBlock";


const BulkBlock = ()=> {
    return (
        <>
        <BulkDealInsiderModal />
        <div className="FilterSidebar-Content-Layout pt-2">
       <FilterSidebarBulkBlock/>
       
            <div className="sc-container ">
          <BulkBlockTable/>
            </div>

        </div>
        </>
    )
}

export default BulkBlock;