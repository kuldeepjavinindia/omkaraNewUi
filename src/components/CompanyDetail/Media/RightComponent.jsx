import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

const RightComponent = (props) => {


    const {
        videoUrl, setVideoUrl, likeDislike, setLikeDislike, setActiveVideoItem, ActiveVideoItem
    } = props

    const [playing, setPlaying] = useState(false);
    const [like, setLike] = useState(false);
    
  const handleLikeChange = () => {
    setLike(!like);
    let userLike = "like";
    let userDislike;
    if (!like) {
      userDislike = "unlike";
    }
    console.log(like, "user like or dislike", userDislike, userLike);
  };



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
            onClick={handleLikeChange}
          />
          <span className="text-[14px] font-medium text-[#272727]">
            {likeDislike} Likes
          </span>
        </div>
        <div className="commentSection">
          <Typography className="text-[#1C3994] font-bold mb-2">
            Comments
          </Typography>
          <AddComment ActiveVideoItem={ActiveVideoItem} />
          <CommentList ActiveVideoItem={ActiveVideoItem} />
        </div>
      </div>
    </>
  );
};

export default RightComponent;
