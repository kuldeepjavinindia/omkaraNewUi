// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  BSENewsPage,
  CompanyDetailPage,
  HomePage,
  LoginPage,
  MyPDFViewerPage,
  WatchlistCreate,
  WatchlistCompany,
  ResultCalendar,
  WatchlistEdit,
  DeliveryData,
  PriceAction,
  InsiderTrading,
  BulkBlock,
  QuarterlyResult,
  ReportBankUpload,
  ReportBankSearch,
  FiiSector,
  Valuation,
} from "./pages";
import ErrorPage from "./error-page";
import { MainLayout } from "./components";
import "./assets/sass/main.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  let router = createBrowserRouter(
    [
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/bse-news",
            element: <BSENewsPage />,
          },
          {
            path: "/company-detail/:company_id",
            element: <CompanyDetailPage />,
          },
          {
            path: "/watchlist/create",
            element: <WatchlistCreate />,
          },
          {
            path: "/watchlist/edit/:watchlist_id",
            element: <WatchlistEdit />,
          },
          {
            path: "/watchlist/add-company",
            element: <WatchlistCompany />,
          },
          {
            path: "/quarterly-result",
            element: <QuarterlyResult />,
          },
          
          {
            path: "/result-calendar",
            element: <ResultCalendar />,
          },
          {
            path: "/delivery-data",
            element: <DeliveryData />,
          },
          {
            path: "/bulk-block",
            element: <BulkBlock />,
          },
          {
            path: "/insider-trading",
            element: <InsiderTrading />,
          },
          {
            path: "/price-action",
            element: <PriceAction />,
          },
          {
            path: "/report-upload",
            element: <ReportBankUpload />,
          },
          {
            path: "/report-search",
            element: <ReportBankSearch />,
          },
          {
            path: "/valuation",
            element: <Valuation />,
          },
          {
            path: "/fii-sector",
            element: <FiiSector />,
          },
        ],
      },

      {
        path: "/MyPdfViewer",
        element: <MyPDFViewerPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
    {
      basename: "/new-data-site",
    }
  );
  


  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
