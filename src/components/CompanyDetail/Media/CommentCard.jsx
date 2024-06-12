import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import moment from "moment";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MediaComment_Req } from "../../../constants/defaultRequest";
import AddComment from "./AddComment";
import { useAuthState } from "../../../context/AuthContext";
import { MdFavoriteBorder } from "react-icons/md";
import {
  MediaCommentApi,
  MediaCommentLikeDislikeApi,
} from "../../../store/slice/SingleCompnaySlice";

const CommentCard = (props) => {
  const { item, replies, ActiveComment, setActiveComment } = props;

  const authState = useAuthState();

  const likeRef = useRef();

  let currentUserId = authState?.user?.UserID; //crtUserId();
  const fiveMinutes = 300000;
  const canReply = Boolean(currentUserId || false);
  // const canReply = false;
  // const canEdit = currentUserId == item.webuserId;
  const canEdit = false;
  const canDelete = currentUserId == item.webuserId; //&& (replies.length === 0);
  // const timePassed = new Date() - new Date(item?.commentDateTime) > fiveMinutes;
  // const canDelete = currentUserId === item.webuserId;
  // const canDelete = currentUserId === item.webuserId && !timePassed;
  const created_at = moment(item?.commentDateTime).format("DD MMM, YYYY");
  const isReplying =
    ActiveComment &&
    ActiveComment.type === "replying" &&
    ActiveComment.id === item.commentId;
  const isEditing =
    ActiveComment &&
    ActiveComment.type == "editing" &&
    ActiveComment.id == item.commentId;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked, setChecked] = useState(item?.is_user_like);

  const rr_dispatch = useDispatch();
  const {
    MediaComment: {
      data: VideoCommentData,
      // loading: VideoCommentLoading
    },
    MediaCommentLikeDislike: { data: CommentLikeDislikeData },
  } = useSelector((state) => state.SingleCompany);

  const handleChange = (c1) => {
    // console.log(crt_check)
    let crt_check = !c1;

    // setChecked(crt_check);

    let like_type = "like";
    if (!crt_check) {
      like_type = "unlike";
    }
    setChecked(crt_check);
    let params = {
      type: like_type, //  Blank , like or  unlike
      comment_id: item.commentId,
      video_id: item.videoId,
      webuserId: currentUserId,
      inputType: "0", //0:edit 1:get
    };
    let vid_params = { ...params };
    rr_dispatch(MediaCommentLikeDislikeApi(vid_params));

    // let params0 = {
    //   ...MediaComment_Req,
    //   videoId: item.videoId,
    //   comment: "",
    //   inputType: "3",
    //   webuserId: currentUserId,
    // };
    // // console.log({vid_params, params0})
    // rr_dispatch(MediaCommentApi(params0));
  };

  return (
    <>
      <div className="main-comment mb-3">
        <div className="px-5 py-3 bg-[#fff] rounded mb-2">
          <div className=" flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <img
                src={item?.webUserImage}
                alt={item?.webUserName}
                className="w-[22px]"
              />
              <Typography className=" text-[14px] text-lg-[16px] text-black font-semibold">
                {item?.webUserName}
              </Typography>
            </div>
            <div>
              <Typography className="text-[12px] font-normal text-[#495057] ">
                {created_at}
              </Typography>
            </div>
          </div>
          <div>
            <Typography
              className="text-[12px] mt-3"
              dangerouslySetInnerHTML={{
                __html: item?.comment,
              }}
            />
            {/* {JSON.stringify(CommentLikeDislikeData)} */}
          </div>
          <div className="flex gap-1 items-center">
            <span
              className="cursor-pointer"
              onClick={() => {
                handleChange(checked);
              }}
            >
              {checked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            </span>
            <div style={{ fontSize: "12px" }}>
              {CommentLikeDislikeData.total_comment_like || item?.total_comment_like} Like
            </div>
          </div>
          <div>
            <div className="commentAction flex gap-1 mt-2">
              {canReply && (
                <Button
                  variant="outlined"
                  size="sm"
                  className="p-0 px-2 capitalize text-[12px] rounded"
                  onClick={() => {
                    setActiveComment({
                      item: item,
                      id: item.commentId,
                      type: "replying",
                    });
                  }}
                >
                  Reply
                </Button>
              )}

              {canEdit && (
                <Button
                  variant="outlined"
                  size="small"
                  className="p-0 px-2 capitalize text-[12px] rounded"
                  color="green"
                  onClick={() => {
                    setActiveComment({
                      item: item,
                      id: item.commentId,
                      type: "editing",
                    });
                  }}
                >
                  Edit
                </Button>
              )}

              {/* {timePassed} */}
              {/* { canDelete && <Button variant='outlined' color="error" size="small" onClick={()=>deleteComment(item?.commentId)}>Delete</Button> } */}
              {/* <Button variant='outlined' color="error" size="small" onClick={()=>deleteComment(item?.commentId)}>Delete</Button> */}
            </div>
          </div>
        </div>
        <div className="replies ml-6">
          {/* {JSON.stringify(isEditing)} */}
          {isReplying && (
            <AddComment
              videoId={item?.videoId}
              submitLabel="Reply"
              replyId={item?.commentId}
              isCancel={true}
              ActiveComment={ActiveComment}
              setActiveComment={setActiveComment}
            />
          )}

          {isEditing && (
            <AddComment
              videoId={item?.videoId}
              submitLabel="Update"
              replyId={item?.commentId}
              isCancel={true}
              ActiveComment={ActiveComment}
              setActiveComment={setActiveComment}
            />
          )}

          {replies?.length > 0 && (
            <div className="replies">
              {replies.map((reply) => {
                let child = VideoCommentData?.Data.filter(
                  (item) => item.parentId === reply.commentId
                );
                return (
                  <>
                    <CommentCard
                      key={reply.commentId}
                      item={reply}
                      replies={child}
                      ActiveComment={ActiveComment}
                      setActiveComment={setActiveComment}
                    />
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
