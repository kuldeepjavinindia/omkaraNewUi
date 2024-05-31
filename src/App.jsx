// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BSENewsPage, CompanyDetailPage, HomePage, LoginPage, MyPDFViewerPage ,  WatchlistCreate, WatchlistCompany,} from "./pages";
import ErrorPage from "./error-page";
import { MainLayout } from "./components";
import './assets/sass/main.scss'

function App() {


  let router = createBrowserRouter([
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
        element: <WatchlistCreate/> ,
        },
        {
          path: "/watchlist/add-company",
          element: <WatchlistCompany/> ,
        },
      ]
    },
    
    {
      path: "/MyPdfViewer",
      element: <MyPDFViewerPage />,
    },
    
    {
      path: "/login",
      element: <LoginPage />,
    },
  ], {
    basename: "/new-data-site",
  });
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;