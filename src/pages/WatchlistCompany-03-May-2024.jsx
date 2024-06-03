import {
  Typography,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
} from "@material-tailwind/react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import CompanySearch from "../components/CompanySearch";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { watchListCompanyReq } from "../constants/defaultRequest";
import { wlCompanyAPI } from "../store/slice/WatchListSlice";
import { Link } from "react-router-dom";

const WatchlistCompany = () => {
  const [addCompanyWatchListData, setAddCompanyWatchListData] = useState();
  const rr_dispatch = useDispatch();

  const {
    wlCompany: {
      loading: wlCompanyLoading,
      data: { Data: wlCompanydata },
    },
  } = useSelector((state) => state.WatchList);

  const [ImportBtn, setImportBtn] = useState(false);

  const hangleWlCompDelete = (watchlistData) => {
    console.log(watchlistData, ">>>>>>>>>>>");

    let datawl = addCompanyWatchListData.filter(
      (item) => item.ID != watchlistData.ID
    );

    let param = watchListCompanyReq;

    param = {
      ...param,
      WatchListID: datawl,
      status: false,
      input: 3,
    };
    console.log("param >>> ", param);
    // rr_dispatch(wlCompanyAPI(param));

    // setAddCompanyWatchListData(datawl);
  };

  useEffect(() => {
    if (!wlCompanyLoading) {
      setAddCompanyWatchListData(wlCompanydata);
    }
  }, [wlCompanyLoading, rr_dispatch]);

  // if(wlCompanyLoading) {
  //   return <Spinner />
  // }

  return (
    <>
      <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
        <div className="rounded-md bg-[#fff] py-7 px-7">
          <Typography className="text-[15px]  font-semibold mb-5 text-[#000]">
            ADD COMPANIES TO {" "}
            <span className="text-[#4448F5]">{"WDWDWDW"}</span>{" "}
             WATCHLIST (SELECT UPTO 100 COMPANIES)
          </Typography>

          {ImportBtn && (
            <>
              <div className="p-4 mb-5 border border-[#C7C8FC] rounded w-[35%]">
                <Typography className="text-[15px]  font-semibold mb-3 text-[#000]">
                  Multiple Companies Upload
                </Typography>

                <Menu>
                  <MenuHandler>
                    <Button
                      className=" mb-1 h-8 flex items-center justify-between gap-1 bg-[#F9FAFA] text-[#000000] text-[12px] shadow-none rounded leading-0
        !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 w-full"
                    >
                      NSE
                      <BiChevronDown size={18} />
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>NSE 1</MenuItem>
                    <MenuItem>NSE 2</MenuItem>
                    <MenuItem>NSE 3</MenuItem>
                  </MenuList>
                </Menu>

                <Input
                  type="file"
                  placeholder="Enter Name"
                  className="mt-1 !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-8"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  // onChange={(e)=>filterData(e, 'search')}
                />

                <Button className="mr-5 mt-5 bg-theme text-[#fff] py-2 rounded">
                  <span>SUBMIT</span>
                </Button>
                <Button
                  onClick={() => {
                    setImportBtn(!ImportBtn);
                  }}
                  className="mr-1 mt-5 bg-[#FAE0E0] text-[#DD2025] py-2 rounded"
                >
                  <span>CLOSE</span>
                </Button>
              </div>
            </>
          )}

          <div className="w-[50%]">
            <div className="flex items-end justify-between mb-3">
              <label className="text-[11px] text-[#000] font-medium">
                Selected : <span className="font-semibold">2</span>
              </label>
              {!ImportBtn && (
                <Button
                  onClick={() => {
                    setImportBtn(!ImportBtn);
                  }}
                  className=" bg-[#ECEDFE] text-theme text-[12px] font-bold px-2 py-2 rounded shadow-none"
                >
                  IMPORT COMPANIES{" "}
                </Button>
              )}
            </div>

            <CompanySearch />
          </div>
          <div className="flex flex-wrap gap-7 mt-8  w-[100%]">
            {addCompanyWatchListData &&
              addCompanyWatchListData.length > 0 &&
              addCompanyWatchListData.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="border-0 border-b-[1px] border-[#D1D1D1] pb-3 flex-none basis-[31%] flex items-center justify-between"
                  >
                    <Typography className="text-[13px] text-[#000] font-semibold">
                      {item.CompanyName}{" "}
                    </Typography>
                    <span
                      className="bg-[#FAE0E0] text-[#DD2025] py-1 px-1 rounded cursor-pointer"
                      onClick={() => hangleWlCompDelete(item)}
                    >
                      <AiOutlineDelete size={16} />
                    </span>
                  </div>
                </>
              ))}
          </div>
          <Link to={`/bse-news`}>
            <Button className="mr-5 mt-8 bg-theme text-[#fff] py-2 rounded">
              {" "}
              BACK{" "}
            </Button>
          </Link> 
        </div>
        {/* End Card */}
      </div>
    </>
  );
};

export default WatchlistCompany;
