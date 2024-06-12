import FilterReportBankSearch from "../../components/data2/ReportBank/FilterReportBankSearch";
import ReportBankSearchTable from "../../components/data2/ReportBank/ReportBankSearchTable";

const ReportBankSearch = () => {
  return (
    <>
      <div className="pt-2 FilterSidebar-Content-Layout">
        <FilterReportBankSearch />

        <div className="sc-container ">
          <ReportBankSearchTable />
        </div>
      </div>
    </>
  );
};

export default ReportBankSearch;
