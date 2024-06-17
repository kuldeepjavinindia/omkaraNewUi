import { BiTrashAlt } from "react-icons/bi"; 
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import { Typography, Button, Input } from "@material-tailwind/react";
import {
  MediaRoomApi,
  VideoLikeDislikeApi,
} from "../../../store/slice/SingleCompnaySlice";
import { MediaRoomDataReq, videoLikeDiskLike_Req } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "../../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import AddComment from "./AddComment";
import ReactPlayer from "react-player";
import moment from "moment";
import RightComponent from "./RightComponent";
import AddVideosModal from "../Modals/AddVideosModal";
import { GlobalContext } from "../../../context/GlobalContext";
import { IconButton } from "@mui/material";
import DeleteDataModal from "../Modals/DeleteDataModal";
import { getVidFullUrl } from "../../../constants/helper";

export const MediaRoom_Main = () => {
  const rrd_params = useParams();
  const rr_dispatch = useDispatch();
  const authState = useAuthState();

  const [VidSortStatus, setVidSortStatus] = useState(false);
  const [videoUrl, setVideoUrl] = useState();
  const [likeDislike, setLikeDislike] = useState();
  const { setAddVideo } = useContext(GlobalContext);
  const [OpenModal, setOpenModal] = useState(false);

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
      // const videoLikeDiskLike = firstVid;
      const videoId = firstVid.videoId;

      setActiveVideoItem(firstVid);

      let param = { 
        ...videoLikeDiskLike_Req,
        video_id: videoId,
        inputType: "1",
        webuserId:user_id
      };
          

      if (VideoLikeDislikeLoading) {
        rr_dispatch(VideoLikeDislikeApi(param));
      }

      let n_getVidFullUrl = getVidFullUrl(videoCode, videoType);

      setVideoUrl(n_getVidFullUrl);
    }
  }, [MediaRoomData]);

  
  useEffect(() => {
    if (!VideoLikeDislikeLoading) {
      let totalLike = VideoLikeDislikeData?.Data[0].total_video_like;
      setLikeDislike(totalLike);
    }
  }, [VideoLikeDislikeLoading]);

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


  const deleteVideo = (item)=> {
    
       let params = MediaRoomDataReq
       params = {
        ...params,
        "CompanyID": item.CompanyID,
        "userid": item.UserID,
        "videoId": item.videoId,
    }

    console.log('item >>> ', params, item);
    rr_dispatch(MediaRoomApi([params]));
    setOpenModal(null)

  }

  return (
    <>
      <DeleteDataModal 
        ModalTitle={'Alert!'}
        OpenModal={OpenModal}
        setOpenModal={setOpenModal}
        onClick={()=>{
          // console.log('OpenModal >>> ', OpenModal)
          deleteVideo(OpenModal)
        }}
      > 
        <Typography className=" font-medium">
            are you sure you want to delete <span className=" font-semibold text-theme uppercase">{`"${OpenModal?.videoTitle}"`}</span> video?
        </Typography>
      </DeleteDataModal>




      <AddVideosModal />
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
                className="!w-[450px] !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
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
              onClick={() => setAddVideo(true)}
            >
              ADD VIDEO
            </Button>
          </div>
        </div>
        {/* ========== Start Top Search and Add Button Section =======*/}

        {filterMediaData && filterMediaData.length == 0 ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <Typography className=" text-lg  font-semibold">
                Data not found!
              </Typography>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {/* =========== Start Media List Left Side Section ========= */}
              <div className="bg-[#E9EDEF] px-9 py-9 rounded">

              {/* <div
        style={{
          width: "100%",
          textAlign: "right",
        }}
      >
        
        {VidSortStatus ? (
          <IconButton
            onClick={() => {
              sortVideosTypeFun(true, true);
            }}
          >
            <FaSortAmountUp style={{ 
              fontSize: '1rem'
              }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              sortVideosTypeFun(true, true);
            }}
          >
            <FaSortAmountDown style={{ 
              fontSize: '1rem'
              }} />
          </IconButton>
        )}
      </div> */}



                {filterMediaData &&
                  filterMediaData.length > 0 &&
                  filterMediaData.map((item, index) => (
                    <div key={index} className="MediaList w-full mb-3 ">
                      <div className=" flex items-center gap-1">

                        <div className="pb-3  w-[1.75rem]" >
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

                        <div className="flex items-center justify-between border-[#B9C6E7] border-b cursor-pointer w-[calc(100%-1.75rem)] pb-3  "
                          onClick={() => handleVideoSet(item)}>

                          <div className="flex items-center " >
                            <span className="w-[1.85rem]">
                              <img
                                src={
                                  import.meta.env.VITE_BASE_URL +
                                  "/images/icons/play.svg"
                                }
                                alt=""
                                className="w-6"
                              />
                            </span>
                            <Typography className=" w-[calc(100%-1.85rem)] text-[16px] text-lg-[18px] text-[#000] font-medium">
                              {item.videoTitle}
                            </Typography>
                          </div>

                          <div className=" text-right pr-1 grow-2">
                            <Typography className="text-[13px] font-normal">
                              {item.dateTime
                                ? moment(item.dateTime).format("DD MMM YYYY")
                                : ""} <br />
                              {item.dateTime
                                ? moment(item.dateTime).format("hh:mm:ss A")
                                : ""}
                            </Typography>
                           
                          </div>

                        </div>


                        <div className=" pb-3 w-[5%]">
                        <IconButton className="!p-0 " onClick={()=> setOpenModal(item)}><BiTrashAlt  color="red"  size={20}/></IconButton>
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
          </>
        )}
      </div>
    </>
  );
};
export default MediaRoom_Main;
