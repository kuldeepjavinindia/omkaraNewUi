import { useDispatch } from "react-redux";
import FilterReportBankSearch from "../../components/data2/ReportBank/FilterReportBankSearch";
import ReportBankSearchTable from "../../components/data2/ReportBank/ReportBankSearchTable";
import { RepositoryListReq } from "../../constants/defaultRequest";
import { RepositoryListAPI } from "../../store/slice/SingleCompnaySlice";
import moment from "moment";
import { useEffect } from "react";

const ReportBankSearch = () => {
  const rr_dispatch = useDispatch();

  const callApi = (duration, sector = "") => {
    let params = RepositoryListReq;
    duration = parseInt(duration);
    let FromDate = moment().subtract(duration, "d").format("YYYY-MM-DD");
    let ToDate = moment().format("YYYY-MM-DD");
    params = {
      ...params,
      Date: [FromDate, ToDate],
      numPerPage: "100",
    };

    params = {
      ...params,
    };

    rr_dispatch(RepositoryListAPI(params));
  };

  useEffect(() => {
    callApi(1);
  }, []);

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
