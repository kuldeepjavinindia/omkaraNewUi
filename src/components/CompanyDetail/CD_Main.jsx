import { BiChevronDown } from "react-icons/bi";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import {
  Button,
  Spinner,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useAuthState } from "../../context/AuthContext";
import { watchListCompanyReq, watchListReq } from "../../constants/defaultRequest";
import { wlAPI, wlCompanyAPI } from "../../store/slice/WatchListSlice";
import { GlobalContext } from "../../context/GlobalContext";

const SideWLButton = () => {
  const rrd_params = useParams();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const [checkedItems, setCheckedItems] = useState({});
  const [FirstLoad, setFirstLoad] = useState(false);

  const {
    wl: {
      loading: wlLoading,
      data: wldata,
    },
    
    wlCompany:{
      // loading: wlCompanyLoading,
      data: {
        Data: wlCompanyData
      },
    }
  } = useSelector((state) => state.WatchList);
  
  const {
    companyNotes: { loading: cmpNotesLoading, data: cmpNotesData },
  } = useSelector((state) => state.SingleCompany);
  
  const companyData = cmpNotesData?.Data?.[0] || {};

  
  const rr_dispatch = useDispatch();
  const authState = useAuthState();

  const handleMenuItemClick = (e, item) => {

    let cItems = checkedItems
        cItems = {
            ...cItems,
            [`item_${item.ID}`]: e.target.checked
        }
    let params = watchListCompanyReq;
    const wcData = wlCompanyData;
    let Filtered_wcData = []
    // console.log('Filtered_wcData >>>> ', Filtered_wcData)
    if(wcData && wcData.length > 0){
      Filtered_wcData = wcData.filter(item=>item.AccordCode == cmpId)
    }
    
    params = {
        ...params,
        AccordCode: cmpId, // Company ID
        CompanyName: companyData?.CompanyName, // Company Name
        WatchListID: item?.ID,
        UserID: item?.UserID,
        input: e.target.checked ? 1 : 3,
    }
    
    console.log("e.target.checked >>> ", params);
    if(params.input === 3){
      
    console.log("e.target.checked >>> ", Filtered_wcData);


      Filtered_wcData.map(item=>{
        params = {
            ...params,
            ID: item?.ID,
        }
        rr_dispatch(wlCompanyAPI(params))
      })
    }else{
      rr_dispatch(wlCompanyAPI(params))
    }
    setCheckedItems(cItems);
  }; 


  useEffect(() => {
    if (FirstLoad) {
      let params = watchListReq;
      params = {
        ...params,
        UserID: authState?.user?.UserID,
        CompanyId: cmpId,
      };
      rr_dispatch(wlAPI(params));
    }
  }, [FirstLoad]);



  useEffect(() => { 
    // console.log('wlLoading ______ ', wlLoading)
    if (!wlLoading) {
      //   console.log('WatchListData.Data >> ', WatchListData.Data)
      // let a_arr = []
      let a00 = {};
      wldata.Data &&
        wldata.Data
          .filter(
            (item) =>
              (item?.isCompany ? item.isCompany.toLowerCase() : "") === "yes"
          )
          .map((item) => {
            a00 = {
              ...a00,
              [`item_${item.ID}`]: true,
            };
          });

      setCheckedItems(a00);
    }
  }, [rr_dispatch, wlLoading]);

  useEffect(() => {
    setFirstLoad(true)
  }, [])
  

  return (
    <>
    
      <Menu>
        <MenuHandler>
          <Button
            size="sm"
            className=" flex items-center gap-1 bg-[#F9FAFA] text-[#000000] text-[12px] shadow-none rounded leading-0"
          >
            <img
              src={
                import.meta.env.VITE_BASE_URL + "/images/icons/addWatchList.svg"
              }
              alt=""
            />
            Add to Watchlist
            <BiChevronDown size={18} />
          </Button>
        </MenuHandler>
        <MenuList>
          {wlLoading && <Spinner />}

          {wlLoading === false &&
            wldata.Data &&
            wldata.Data.length > 0 &&
            wldata.Data.map((item, i) => {
              return (
                <>
                  <MenuItem
                    className="p-0"
                    key={i}
                    onClick={() => {
                      // localStorage.setItem('selectedWL', JSON.stringify(item))
                      // window.location.href = import.meta.env.VITE_BASE_URL+'/bse-news'
                    }}
                  >
                    <label
                      htmlFor={"item-1" + i}
                      className="flex cursor-pointer items-center gap-2 p-2"
                    >
                      <Checkbox
                        ripple={false}
                        size={"sm"}
                        id={"item-1" + i}
                        checked={checkedItems[`item_${item.ID}`]}
                        containerProps={{ className: "p-0" }}
                        onClick={(e) => handleMenuItemClick(e, item)}
                        className="hover:before:content-none"
                      />
                      {/* <Checkbox
                        size="small"
                        sx={{ padding: "0", paddingRight: ".25rem" }}
                        onClick={(e) => handleMenuItemClick(e, item)}
                        checked={checkedItems[`item_${item.ID}`]}
                      /> */}

                      {item?.WatchListNAme}
                    </label>
                  </MenuItem>
                </>
              );
            })}
        </MenuList>
      </Menu>
    </>
  );
};

const CD_Main = () => {
  const OpenExternalLinks = (link, value = "_self") => {
    var prefix = "http";
    if (link.substr(0, prefix.length) !== prefix) {
      link = "http://" + link;
    }
    window.open(link, value);
  };

  
  const {
    // ThemeDrawer,
    setThemeDrawer
} = useContext(GlobalContext)


  const {
    companyNotes: { loading: cmpNotesLoading, data: cmpNotesData },
  } = useSelector((state) => state.SingleCompany);

  const {
    Overview: {
      data: { body: OverviewData },
      // loading: OverviewLoading,
    },
  } = useSelector((state) => state?.Trendlyne);

  const companyData = cmpNotesData?.Data?.[0] || {};
  const companyFooter = cmpNotesData?.footer || [];

  if (cmpNotesLoading) {
    return <Spinner className="w-12 h-12" />;
  }

  return (
    <div className=" text-black ">
      <div>
        <div className="flex gap-4 relative">
          <div>
            <Typography className="text-[40px] leading-[46px] font-semibold mt-[-5px]">
              {companyData?.CompanyName}
            </Typography>
            <div className="mt-1 mb-4">
              <ul className="flex gap-3">
                <li>
                  <span
                    onClick={() =>
                      OpenExternalLinks(companyData.WebSiteLink, "_blank")
                    }
                    size="sm"
                    className="bg-theme-c2 font-medium text-[12px] xl:text-[16px] text-theme  flex items-center gap-1 shadow-none rounded py-1 px-2 cursor-pointer"
                  >
                    <AiOutlineLink />
                    <span>{companyData?.WebSiteLink}</span>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() =>
                      OpenExternalLinks(companyData.BSELink, "_blank")
                    }
                    size="sm"
                    className="bg-theme-c2 font-medium text-theme text-[12px] xl:text-[16px] flex items-center gap-1 shadow-none rounded py-1 px-2 cursor-pointer"
                  >
                    <BiLinkExternal />
                    <span>BSE: {companyData?.BSEcode}</span>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() =>
                      OpenExternalLinks(companyData.NSELink, "_blank")
                    }
                    size="sm"
                    className="bg-theme-c2 font-medium text-theme text-[12px] xl:text-[16px] flex items-center gap-1 shadow-none rounded py-1 px-2 cursor-pointer"
                  >
                    <BiLinkExternal />
                    <span>NSE: {companyData?.NSEcode}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul className="flex items-center justify-center gap-4">
              <li className="  border-x border-[#C0C5CB] px-2 pt-2">
                <div className="flex gap-1 ">
                  <Typography className="text-[20px] font-bold relative leading-[21px]">
                    {/* ₹ {companyData?.CompanyPrice} */}₹{" "}
                    {OverviewData && OverviewData?.BSEOHLCData?.ltp}
                  </Typography>

                  <div
                    className={`text-[13px] font-bold flex items-baseline mt-[-8px] ${
                      OverviewData && OverviewData?.BSEOHLCData?.day_changeP > 0
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                  >
                    {OverviewData &&
                    OverviewData?.BSEOHLCData?.day_changeP > 0 ? (
                      <AiOutlineCaretUp />
                    ) : (
                      <AiOutlineCaretDown />
                    )}
                    {OverviewData &&
                      OverviewData?.BSEOHLCData?.day_changeP &&
                      OverviewData?.BSEOHLCData?.day_changeP.toFixed(2)}
                    %
                  </div>
                </div>

                <Typography className="text-[#909090] text-[12px]">
                  {OverviewData?.BSEOHLCData?.date &&
                    moment(OverviewData?.BSEOHLCData?.date).format(
                      "DD-MMM-YYYY hh:mm:ss"
                    )}
                </Typography>
              </li>
              <li className=" font-medium text-[15px]">
                52wk H/L :{" "}
                <span className="font-semibold">
                  {companyData?.WH52}/{companyData?.WL52}
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-2 absolute right-0 ">
            <SideWLButton />
            <div>
              <Button
                size="sm"
                className="!h-9 bg-[#F9FAFA] text-[#000000] text-[12px]  flex items-center gap-1 shadow-none rounded leading-0"
                onClick={()=>{
                  setThemeDrawer(true)
                }}
              >
                <img
                  src={
                    import.meta.env.VITE_BASE_URL +
                    "/images/icons/customize.svg"
                  }
                  alt=""
                />
                CUSTOMIZE COLOR
              </Button>
            </div>
          </div>
        </div>
        <div>{/* RIGHT BUTTONS */}</div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {companyFooter.map((f_item, i) => {
          let a0 = 0;

          return (
            <div
              className="bg-[#F9FAFA] rounded-sm p-4 font-medium text-[13px] Single-overviewtableData
"
              key={i}
            >
              <table className="w-full">
                {Object.keys(f_item).map((child_item, cf) => {
                  a0++;
                  let row_item = f_item[`row${a0}`];
                  return (
                    <Fragment key={cf}>
                      <tr>
                        {row_item &&
                          row_item.length > 0 &&
                          row_item.map((rItem, rIndex) => {
                            return (
                              <td key={rIndex} className="text-start">
                                {rItem?.column}
                              </td>
                            );
                          })}
                      </tr>
                    </Fragment>
                  );
                })}
              </table>
            </div>
          );
        })}
      </div>
      <div className="mt-5 bg-[#F9FAFA] p-4 rounded-sm">
        <Typography className="text-xl font-semibold">About</Typography>
        <Typography className="text-[13px] font-normal text[#22242F]">
          <div
            dangerouslySetInnerHTML={{
              __html: companyData?.companyNotes,
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default CD_Main;
