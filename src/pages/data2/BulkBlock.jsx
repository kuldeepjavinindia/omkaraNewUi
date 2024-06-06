import BulkBlockTable from "./../../components/data2/BulkBlock/BulkBlockTable";
import FilterSidebarBulkBlock from "./../../components/data2/BulkBlock/FilterSidebarBulkBlock";


const BulkBlock = ()=> {
    return (
        <>
        <div className="grid grid-cols-12 gap-1 pt-2">
       <FilterSidebarBulkBlock/>
       
            <div className="sc-container col-span-9">
          <BulkBlockTable/>
            </div>

        </div>
        </>
    )
}

export default BulkBlock;