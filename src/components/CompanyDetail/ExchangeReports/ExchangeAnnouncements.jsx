import { TbArrowsSort } from "react-icons/tb";
import { Spinner, Typography, Input } from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnnouncementsAPI } from "../../../store/slice/TrendlyneSlice";
import { TrendlyneReq } from "../../../constants/defaultRequest";
import moment from "moment";

const ExchangeAnnouncements = () => {
  const {
    Announcements: { data: announcementData, loading: announcementLoading },
  } = useSelector((state) => state?.Trendlyne);
  
  const [AllApiData, setAllApiData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);

  // AnnouncementsAPI
  const rr_dispatch = useDispatch();



  const handleChange = (event, itemData=AllApiData) => {
    
    let arrNew = [];
    itemData.forEach(function (a) {
      var fName = a.n_title.toLowerCase();
      var nVal = event.target.value.toLowerCase();
      
      if (fName.indexOf(nVal) > -1) {
        arrNew.push(a);
      }
    });
    setFilteredData(arrNew);
    
  };


  useEffect(() => {
    if (announcementLoading) {
      let compSlug = "";
      let params = TrendlyneReq;
      params = {
        ...params,
        compSlug: compSlug,
      };
      rr_dispatch(AnnouncementsAPI(params));
    }
    if (!announcementLoading) {

      let newArr = [];

      announcementData.map((item)=>{
        let item0 = item;
        
        let nTitle = item?.title
        if(nTitle && nTitle.includes(" - ")){
          nTitle = nTitle.split(" - ");
          if(nTitle.length > 2){
            nTitle = nTitle.slice(2);
          }
          nTitle = nTitle.toString();
          nTitle = nTitle.replaceAll(',',  ' - ')
          nTitle = nTitle.trim();
        }
        item0 = {...item0, n_title: nTitle};
        
        newArr.push(item0);
      })


      setAllApiData(newArr);
      setFilteredData(newArr);
    }
  }, [rr_dispatch, announcementLoading]);

  return (
    <>
      <div className="  bg-white py-4 rounded-sm">
        <div className="pb-2 px-4 border-gray-200 border-b border-0">
          <div className="flex gap-4 items-center justify-between ">
            <Typography className="text-[15px] text-[#000000] font-semibold mb-2">
              Exchange Announcements
            </Typography>
            <TbArrowsSort className="text-theme" />
          </div>

          <Input
            type="text"
            placeholder="Search Company"
            className="flex mt-1 !border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={(e)=>handleChange(e)}
            containerProps={{ className: "min-w-[100px]" }}
            icon={
              <CgSearch
                size={17}
                className=" text-gray-400 top-[0px] absolute"
              />
            }
          />
        </div>

        <div className="clientDocs_horizontalCardsList px-4">
          {
            announcementLoading && (
              <Spinner />
            )
          }
          {
            FilteredData && FilteredData.length == 0 && (
              <Typography>Data not found!</Typography>
            )
          }
          
          <ul>
            {
              FilteredData && FilteredData.length > 0 && FilteredData.map((item, i)=>{
                return (
                  <li key={i} className="flex items-center gap-2 py-3 border-gray-200 border-b border-0 ">
                    <Fragment>
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL + "/images/icons/pdfIcon.svg"
                        }
                        alt=""
                      />
                    </Fragment>
                    <div>
                      <Typography className="text-theme-c7 font-semibold text-[14px]">
                        {item?.n_title}
                      </Typography>
                      <Typography className="text-[13px] text-[#909090]">
                        <span>{moment(item?.pubDate).format('DD-MMM-YYYY HH:mm:ss')}</span>
                      </Typography>
                    </div>
                  </li>
                )
              })
            }
           
          </ul>
        </div>
      </div>
      {/* End Component Final Output */}
    </>
  );
};

export default ExchangeAnnouncements;
