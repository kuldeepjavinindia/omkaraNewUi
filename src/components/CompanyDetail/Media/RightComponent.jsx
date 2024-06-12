import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";
import { VideoLikeDislikeApi } from "../../../store/slice/SingleCompnaySlice";
import { useAuthState } from "../../../context/AuthContext";
import { videoLikeDiskLike_Req } from "../../../constants/defaultRequest";

const RightComponent = (props) => {
  const {
    videoUrl,
    likeDislike,
    ActiveVideoItem,
  } = props;

  const [playing, setPlaying] = useState(false);
  const authState = useAuthState();

  const {
    VideoLikeDislike: {
      data: VideoLikeDislikeData,
      loading: VideoLikeDislikeLoading,
    },
  } = useSelector((state) => state.SingleCompany);


  
  const [like, setLike] = useState(false);



  const rr_dispatch = useDispatch();
  const handleLikeChange = (c1) => {
    let crt_check = !c1;
    let userDislike = "like";
    if (!crt_check) {
      userDislike = "unlike";
    }
    setLike(crt_check);
    let vid_params = { ...videoLikeDiskLike_Req, video_id: ActiveVideoItem?.videoId, type: userDislike, 
      "webuserId": authState.user.UserID,}
      // console.log('vid_params >> ', vid_params)
    rr_dispatch(VideoLikeDislikeApi(vid_params));
  };



  let LikeDislikeData = VideoLikeDislikeData?.Data?.[0];
  useEffect(() => {
    if(!VideoLikeDislikeLoading){
      setLike(LikeDislikeData?.is_user_like)
    }
  }, [VideoLikeDislikeLoading])
  

  return (
    <>
      <div className="bg-[#E9EDEF] px-4 py-3 rounded">
        <div>
          <ReactPlayer
            url={videoUrl}
            playing={playing}
            setPlaying={setPlaying}
            controls
            width="100%"
          />
        </div>
        
        <div className="my-7 flex items-center">
          <FaHeart
            className={`mr-1 cursor-pointer ${
              like ? "text-[red]" : "text-[#000]"
            }`}
            onClick={(e)=>{handleLikeChange(like)}}
          />
          <span className="text-[14px] font-medium text-[#272727]">
            {likeDislike} Likes
          </span>
        </div>

        <div className="commentSection">
          <Typography className="text-[#1C3994] font-bold mb-2">
            Comments
          </Typography>
          
          <AddComment ActiveVideoItem={ActiveVideoItem} videoId={ActiveVideoItem?.videoId} />
          <CommentList ActiveVideoItem={ActiveVideoItem} />
        </div>
      </div>
    </>
  );
};

export default RightComponent;
