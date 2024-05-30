import ExchangeAnnouncements from "./ExchangeAnnouncements";
import ReportsBank from "./ReportsBank";

const ExchangeReports = () => {
    return (
        <>
      <div className="grid  grid-cols-2 gap-2">
       <ExchangeAnnouncements/>
       <ReportsBank/>
      </div>
        </>
    )
}

export default ExchangeReports;