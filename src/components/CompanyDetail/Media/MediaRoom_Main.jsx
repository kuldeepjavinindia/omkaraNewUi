import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import { Typography, Button, Input } from "@material-tailwind/react";
import {
  MediaRoomApi,
  VideoLikeDislikeApi,
} from "../../../store/slice/SingleCompnaySlice";
import { MediaRoomDataReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAuthState } from "../../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import AddComment from "./AddComment";
import ReactPlayer from "react-player";
import moment from "moment";
import RightComponent from "./RightComponent";

export const MediaRoom_Main = () => {
  const rrd_params = useParams();
  const rr_dispatch = useDispatch();
  const authState = useAuthState();

  const [videoUrl, setVideoUrl] = useState();
  const [likeDislike, setLikeDislike] = useState();

  let user_id = authState?.user?.UserID;
  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const company_id = cmpId;

  const {
    MediaRoom: { data: MediaRoomData, loading: MediaRoomLoading },
  } = useSelector((state) => state.SingleCompany);

  const {
    VideoLikeDislike: {
      data: VideoLikeDislikeData,
      loading: VideoLikeDislikeLoading,
    },
  } = useSelector((state) => state.SingleCompany);

  const [allMediaData, setAllMediaData] = useState(MediaRoomData?.Data);
  const [filterMediaData, setFilterMediaData] = useState(MediaRoomData?.Data);

  const [ActiveVideoItem, setActiveVideoItem] = useState(null);

  const getVidFullUrl = (videoCode, videoType) => {
    let url = `https://vimeo.com/${videoCode}`;
    if (videoType === "youtube") {
      url = `https://www.youtube.com/watch?v=${videoCode}`;
    }
    return url;
  };

  useEffect(() => {
    if (MediaRoomLoading) {
      let param = MediaRoomDataReq;
      param = {
        ...param,
        CompanyID: company_id,
        userid: user_id,
      };

      rr_dispatch(MediaRoomApi([param]));
    }

    if (!MediaRoomLoading) {
      setAllMediaData(MediaRoomData.Data);
      setFilterMediaData(MediaRoomData.Data);
    }
  }, [rr_dispatch, MediaRoomLoading]);

  useEffect(() => {
    if (MediaRoomData?.Data?.[0]) {
      let firstVid = MediaRoomData.Data?.[0];
      const videoCode = firstVid.videoCode;
      const videoType = firstVid.videoType;
      const videoLikeDiskLike = firstVid;
      const videoId = firstVid.videoId;

      setActiveVideoItem(firstVid);

      let param = { ...videoLikeDiskLike, video_id: videoId };

      if (VideoLikeDislikeLoading) {
        rr_dispatch(VideoLikeDislikeApi(param));
      }

      if (!VideoLikeDislikeLoading) {
        let totalLike = VideoLikeDislikeData?.Data[0].total_video_like;
        setLikeDislike(totalLike);
      }

      let n_getVidFullUrl = getVidFullUrl(videoCode, videoType);

      setVideoUrl(n_getVidFullUrl);
    }
  }, [MediaRoomData, VideoLikeDislikeLoading]);

  const handleVideoSet = (mediaData) => {
    let url = `https://vimeo.com/${mediaData?.videoCode}`;
    if (mediaData?.videoType === "youtube") {
      url = `https://www.youtube.com/watch?v=${mediaData?.videoCode}`;
    }
    setVideoUrl(url);

    let totalLike = VideoLikeDislikeData?.Data[0].total_video_like;
    setLikeDislike(totalLike);
  };

  // const handlePlay = () => {
  //   setPlaying(true);
  // };

  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleSearch = (e) => {
    let searchTitle = e.target.value.trim();

    // let videoAll = allMediaData.map((item)=>  item.videoCode);
    // let videoFilterData = filterMediaData.map((item)=> item.videoCode);

    // console.log(videoFilterData);

    // console.log(videoAll, "video videocode");

    //  let url = `https://vimeo.com/${videoAll?.videoCode}`

    //      if(allMediaData?.videoType === "youtube"){
    //       url = `https://www.youtube.com/watch?v=${videoAll?.videoCode}`;
    //     }

    let mediaTitleData = [];
    if (searchTitle === "") {
      mediaTitleData = allMediaData;
    } else {
      mediaTitleData = allMediaData.filter((item) => {
        return item.videoTitle
          .trim()
          .toLowerCase()
          .includes(searchTitle.toLowerCase());
      });
    }

    if (mediaTitleData.length > 0) {
      let videoCode = mediaTitleData?.[0].videoCode;
      let videoType = mediaTitleData?.[0].videoType;

      let n_getVidFullUrl = getVidFullUrl(videoCode, videoType);
      setVideoUrl(n_getVidFullUrl);
    }

    setFilterMediaData(mediaTitleData);
  };

  // console.log(allMediaData.forEach((item)=> console.log(item.videoCode)), ">>>>>>>");

  return (
    <>
      <div className="w-full  rounded bg-[#fff] px-6 py-4">
        {/* ==========Start Top Search and Add Button Section ========*/}
        <div className="flex items-center justify-between mb-6">
          <Typography className="text-xl font-semibold text-[18px] text-[#000]">
            Media Room
          </Typography>
          <div className="flex gap-2 items-center">
            <div className=" relative">
              <Input
                onChange={(e) => handleSearch(e)}
                type="text"
                placeholder="Search Video"
                className="w-[400px]  !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                icon={
                  <CgSearch
                    size={19}
                    className=" text-gray-400 top-[1px] absolute"
                  />
                }
              />
            </div>
            <Button
              className="bg-theme text-white rounded w-100 whitespace-nowrap h-10"
              size="sm"
            >
              ADD VIDEO
            </Button>
          </div>
        </div>
        {/* ========== Start Top Search and Add Button Section =======*/}

        <div className="grid grid-cols-2 gap-2">
          {/* =========== Start Media List Left Side Section ========= */}
          <div className="bg-[#E9EDEF] px-9 py-9 rounded">
            {filterMediaData &&
              filterMediaData.length > 0 &&
              filterMediaData.map((item, index) => (
                <div key={index} className="MediaList w-full mb-3 ">
                  <div className=" flex items-center gap-3">
                    <div className="pb-3">
                      <div
                        onClick={() => handleToggle()}
                        className=" cursor-pointer"
                      >
                        {checked ? (
                          <AiFillStar size={20} className="text-theme" />
                        ) : (
                          <AiOutlineStar size={20} className="text-theme" />
                        )}
                      </div>
                    </div>
                    <div
                      className="flex justify-between border-[#B9C6E7] border-b cursor-pointer w-full pb-3 "
                      onClick={() => handleVideoSet(item)}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 ">
                          <img
                            src={
                              import.meta.env.VITE_BASE_URL +
                              "/images/icons/play.svg"
                            }
                            alt=""
                            className="w-[22px]"
                          />
                        </span>
                        <Typography className=" text-[16px] text-lg-[18px] text-[#000] font-medium">
                          {item.videoTitle}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="text-[13px] font-normal">
                          {item.dateTime
                            ? moment(item.dateTime).format("DD MMM, YYYY")
                            : ""}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/*End media item list */}
          </div>
          {/* =========== Start Media List Left Side Section ========= */}

          {/* =========== Start Media Video Right Side Section ========= */}
          <RightComponent
            setActiveVideoItem={setActiveVideoItem}
            ActiveVideoItem={ActiveVideoItem}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            likeDislike={likeDislike}
            setLikeDislike={setLikeDislike}
          />
          {/* =========== Start Media Video Right Side Section ========= */}
        </div>
      </div>
    </>
  );
};
export default MediaRoom_Main;
