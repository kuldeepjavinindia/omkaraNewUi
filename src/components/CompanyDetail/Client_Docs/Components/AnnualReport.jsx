import { Typography, Input, Menu, MenuHandler, IconButton, MenuList, MenuItem } from "@material-tailwind/react";
import { FaSortAlphaDown } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnnualReportAPI } from "../../../../store/slice/TrendlyneSlice";
import { TrendlyneReq } from "../../../../constants/defaultRequest";
import moment from "moment";
import { openCompany, openPdfWithWaterMark } from "../../../../constants/helper";
import { BiSortAZ, BiSortZA } from "react-icons/bi";

const AnnualReport = () => {
  const {
    AnnualReport: { data: AnnualReportData, loading: AnnualReportLoading },
  } = useSelector((state) => state?.Trendlyne);

  const {
    companyNotes: {
      // loading: cmpNotesLoading,
      data: cmpNotesData,
    },
  } = useSelector((state) => state.SingleCompany);

  const [AllApiData, setAllApiData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);


  const [ToggleData, setToggleData] = useState(false);

  const rr_dispatch = useDispatch();

  const handleChange = (event, itemData) => {
    // console.log(itemData);
    let arrNew = [];
    itemData.forEach(function (a) {
      var fName = a.n_title.toLowerCase();
      var nVal = event.target.value.toLowerCase();
      // console.log(fName, "<=>", nVal);
      if (fName.indexOf(nVal) > -1) {
        arrNew.push(a);
      }
    });
    setFilteredData(arrNew);
  };


  
  const sortData = (itemData, type) => {
    // let sData;
    
    // let a0 = FilteredData;
    // if(isActive?.search_label !== "All"){
    //   a0 = itemData;
    // }

    // // return false
    // if (type === "name") {
    //   if (ToggleData) {
    //     sData = a0.slice().sort((a, b) =>
    //       a.fileName.localeCompare(b.fileName)
    //     );
    //   } else {
    //     sData = a0.slice().sort((a, b) =>
    //       b.fileName.localeCompare(a.fileName)
    //     );
    //   }
    // } else if (type === "date") {
    //   if (ToggleData) {
    //     sData = a0.slice().sort((a, b) => {
    //       var a1 = moment(
    //         a.Date,
    //         "DD-MM-YYYY HH:mm:ss",
    //         true
    //       ).format("DD-MMM-YYYY HH:mm:ss"); //a.Date
    //       var b1 = moment(
    //         b.Date,
    //         "DD-MM-YYYY HH:mm:ss",
    //         true
    //       ).format("DD-MMM-YYYY HH:mm:ss"); //b.Date
    //       var dd = new Date(a1) - new Date(b1);
    //       return dd;
    //     });
    //   } else {
    //     sData = a0.slice().sort((a, b) => {
    //       var a1 = moment(
    //         a.Date,
    //         "DD-MM-YYYY HH:mm:ss",
    //         true
    //       ).format("DD-MMM-YYYY HH:mm:ss"); //a.Date
    //       var b1 = moment(
    //         b.Date,
    //         "DD-MM-YYYY HH:mm:ss",
    //         true
    //       ).format("DD-MMM-YYYY HH:mm:ss"); //b.Date
    //       var dd = new Date(b1) - new Date(a1);
    //       return dd;
    //     });
    //   }
    // }
    // setToggleData(!ToggleData);
    // setFilteredData(sData);
  };



  useEffect(() => {
    if (AnnualReportLoading) {
      let compSlug = cmpNotesData.Data?.[0]?.BSEcode;
      let params = TrendlyneReq;
      params = {
        ...params,
        compSlug: compSlug,
      };
      rr_dispatch(AnnualReportAPI(params));
    }
    if (!AnnualReportLoading) {
      let newArr = [];

      AnnualReportData.map((item) => {
        let item0 = item;
        let nTitle = "Financial Year " + moment(item0?.pubDate).format("YYYY");
        item0 = { ...item0, n_title: nTitle };
        newArr.push(item0);
      });
      setAllApiData(newArr);
      setFilteredData(newArr);
      // console.log('AnnualReportLoading >>>>> ', newArr)
    }
  }, [rr_dispatch, AnnualReportLoading]);

  return (
    <>
      <div className="col-span-3 mt-5 bg-white py-4 rounded-md">
        <div className="pb-2 border-gray-200 border-b border-0 px-4">
          <div className="flex gap-4 items-center justify-between mb-2">
            <Typography className="text-[15px] text-[#000000] font-semibold">
              Annual Reports
            </Typography>
            <div>
            <Menu className=" w-fit">
                <MenuHandler>
                  <IconButton className=" bg-transparent shadow-none hover:shadow-none">
                    {ToggleData ? (
                      <BiSortAZ className="text-theme" size={18} />
                    ) : (
                      <BiSortZA className="text-theme" size={18} />
                    )}
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      sortData(AllApiData, "date");
                    }}
                  >
                    Sort by Date
                  </MenuItem>
                  
                </MenuList>
              </Menu>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Search Company"
            className="mt-1 !border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            onChange={(e) => handleChange(e, AllApiData)}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            icon={
              <CgSearch size={19} className=" text-gray-400 top-0 absolute" />
            }
          />
        </div>

        <div className="clientDocs_horizontalCardsList px-4">
          <ul>
            {FilteredData &&
              FilteredData.length > 0 &&
              FilteredData.map((item, i) => {
                let fileLink = "";
                fileLink = item.pdfUrl;

                return (
                  <li
                    key={i}
                    className="flex items-center gap-2 py-3 border-gray-200 border-b border-0 cursor-pointer"
                    onClick={() => {
                      openCompany(fileLink, "other");
                    }}
                    // onClick={()=>{
                    //   openPdfWithWaterMark(item.link, '')
                    // }}
                  >
                    <Fragment>
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL +
                          "/images/icons/pdfIcon.svg"
                        }
                        alt=""
                      />
                    </Fragment>
                    <div>
                      <Typography className="text-theme-c7 font-semibold text-[14px]">
                        {item?.n_title}
                      </Typography>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {/* End Component Annual Reports */}
    </>
  );
};

export default AnnualReport;
