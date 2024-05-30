import { CgSearch } from "react-icons/cg";
import { Typography, Button , Input, Checkbox  } from "@material-tailwind/react";
import { MediaRoomApi, VideoLikeDislikeApi } from "../../../store/slice/SingleCompnaySlice";
import { MediaRoomDataReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect , useState} from "react";
import { useAuthState } from "../../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import AddComment from "./AddComment";
import ReactPlayer from 'react-player';


export const MediaRoom_Main = () => {

  const rrd_params = useParams();
  const rr_dispatch = useDispatch();
  const authState =  useAuthState();
  const [playing, setPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState();
  const [likeDislike, setLikeDislike] = useState();
  const [like, setLike] = useState(false);
  

  let user_id = authState?.user?.UserID
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }

const company_id = cmpId

  const { MediaRoom :
    {data: MediaRoomData, loading: MediaRoomLoading}
   }  = useSelector(state=> state.SingleCompany);


   const { VideoLikeDislike :
    {data: VideoLikeDislikeData, loading: VideoLikeDislikeLoading}
   }  = useSelector(state=> state.SingleCompany);




   const [allMediaData, setAllMediaData] = useState(MediaRoomData?.Data);
   const [filterMediaData, setFilterMediaData] = useState(MediaRoomData?.Data);

   const getVidFullUrl = (videoCode, videoType) => {
      let url = `https://vimeo.com/${videoCode}`
      if(videoType === "youtube") {
        url = `https://www.youtube.com/watch?v=${videoCode}`;
      }
      return url
   }


useEffect(()=> {

if(MediaRoomLoading) {
  let param = MediaRoomDataReq;
  
  param = {
    ...param,
    "CompanyID": company_id,
    userid: user_id,
  }
 
  rr_dispatch(MediaRoomApi([param]));

}

 if(!MediaRoomLoading) {
  setAllMediaData(MediaRoomData.Data)
  setFilterMediaData(MediaRoomData.Data)
 }


}, [rr_dispatch, MediaRoomLoading]);


useEffect(()=> {
  if(MediaRoomData?.Data?.[0]) {
    const videoCode = MediaRoomData.Data[0].videoCode;
    const videoType = MediaRoomData.Data[0].videoType;
    
     
    const videoLikeDiskLike = MediaRoomData?.Data?.[0]; 
    const videoId = MediaRoomData.Data[0].videoId;
    let param = {...videoLikeDiskLike, video_id: videoId}

    if(VideoLikeDislikeLoading){
      rr_dispatch(VideoLikeDislikeApi(param));
    }

     if(!VideoLikeDislikeLoading) {
      let totalLike =  VideoLikeDislikeData?.Data[0].total_video_like;
      setLikeDislike(totalLike)
    }

    let n_getVidFullUrl = getVidFullUrl(videoCode, videoType)

     setVideoUrl(n_getVidFullUrl);
  }
},[MediaRoomData, VideoLikeDislikeLoading]);


const handleVideoSet = (mediaData) => {
  let url = `https://vimeo.com/${mediaData?.videoCode}`
  if(mediaData?.videoType === "youtube"){
    url = `https://www.youtube.com/watch?v=${mediaData?.videoCode}`;
  }
  setVideoUrl(url);

 let totalLike = VideoLikeDislikeData?.Data[0].total_video_like;
 setLikeDislike(totalLike)

}

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleLikeChange = ()=> {
    setLike(!like);
    let userLike = "like";
    let userDislike 
    if(!like) {
      userDislike = "unlike"
    }
    console.log(like, "user like or dislike");
  }


const hangleSearch = (e)=> {
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
  if(searchTitle === "") {
    mediaTitleData = allMediaData
  }else{
    mediaTitleData = allMediaData.filter((item, index) => {
      return item.videoTitle.trim().toLowerCase().includes(searchTitle.toLowerCase());
    })
  }
  
  if(mediaTitleData.length > 0){
    let videoCode = mediaTitleData?.[0].videoCode;
    let videoType = mediaTitleData?.[0].videoType;

    let n_getVidFullUrl = getVidFullUrl(videoCode, videoType)
    setVideoUrl(n_getVidFullUrl);
  }
  
  setFilterMediaData(mediaTitleData)
  

}
 
// console.log(allMediaData.forEach((item)=> console.log(item.videoCode)), ">>>>>>>");

  return (
   <>
   <div className="w-full  rounded py-3 px-3 bg-[#fff] px-6 py-4">
 {/* ==========Start Top Search and Add Button Section ========*/}
   <div className="flex items-center justify-between mb-6">
        <Typography className="text-xl font-semibold text-[18px] text-[#000]">Media Room</Typography>
        <div className="flex w-[40%] gap-2">
        <Input
           onChange={(e)=> hangleSearch(e)}
            type="text"
            placeholder="Search Video"
            className="max-w-full  !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
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
          <Button className="bg-theme text-white py-2 rounded w-100 whitespace-nowrap">
        ADD VIDEO
        </Button>
        </div>
        
      </div>
 {/* ========== Start Top Search and Add Button Section =======*/}


    <div className="grid grid-cols-2 gap-2">

{/* =========== Start Media List Left Side Section ========= */}
<div className="bg-[#E9EDEF] px-9 py-9 rounded">
{
 filterMediaData && filterMediaData.length > 0 && filterMediaData.map((item, index)=> (
   <div className="MediaList flex items-center justify-between border-[#B9C6E7] border-b pb-3 mb-3 cursor-pointer"
   onClick={()=> handleVideoSet(item)}
   >
   <div className="flex items-center">
  <span className="mr-2 ">
   <img src= {import.meta.env.VITE_BASE_URL  + "/images/icons/play.svg"} alt=""  className="w-[22px]" />
  </span>
   <Typography className=" text-[16px] text-lg-[18px] text-[#000] font-medium">
     {item.videoTitle}
   </Typography>
   </div>
   <div>
 <Typography className="text-[13px] font-normal">
 {item.dateTime}
 </Typography>
   </div>
 </div>
 )) 
}
 {/*End media item list */}
</div>
{/* =========== Start Media List Left Side Section ========= */}

{/* =========== Start Media Video Right Side Section ========= */}
<div className="bg-[#E9EDEF] px-4 py-3 rounded">
  <div >
  
  <ReactPlayer url={videoUrl} playing={playing} controls  width="100%"  />
</div>
  
  <div className="my-7 flex items-center">
  <FaHeart className= {`mr-1 cursor-pointer ${like ? "text-[red]" : "text-[#000]"}`} onClick={handleLikeChange} />
  <span className="text-[14px] font-medium text-[#272727]">
    {likeDislike} Likes
  </span>
    </div> 
    <div className="commentSection">
        <Typography className="text-[#1C3994] font-bold mb-2">
        Comments
        </Typography>
        <AddComment/>
        </div> 
    </div>
{/* =========== Start Media Video Right Side Section ========= */}   
      </div>

   </div>
   
   </>
  )
}
export default MediaRoom_Main;
