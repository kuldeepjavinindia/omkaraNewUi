import FilterSidebarValuation from "../../components/data2/Valuation/FilterSidebarValuation";
import ValuationTable from "../../components/data2/Valuation/ValuationTable";


const Valuation = () => {
  return (
    <>
      <div className=" pt-2 FilterSidebar-Content-Layout">
       <FilterSidebarValuation/>

        <div className="sc-container ">
          <ValuationTable/>
        </div>
      </div>
    </>
  );
};

export default Valuation;
