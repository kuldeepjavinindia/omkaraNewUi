import { useDispatch } from "react-redux";
import FilterReportBankSearch from "../../components/data2/ReportBank/FilterReportBankSearch";
import ReportBankSearchTable from "../../components/data2/ReportBank/ReportBankSearchTable";
import { RepositoryListReq } from "../../constants/defaultRequest";
import { RepositoryListAPI } from "../../store/slice/SingleCompnaySlice";
import moment from "moment";
import { useEffect } from "react";

const ReportBankSearch = () => {
  // const rr_dispatch = useDispatch();



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
