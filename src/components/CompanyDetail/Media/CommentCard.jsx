import { Typography } from "@material-tailwind/react";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MediaComment_Req } from "../../../constants/defaultRequest";
import AddComment from "./AddComment";

const CommentCard = (props) => {
  const { item, replies, ActiveComment, setActiveComment } = props;

  let currentUserId = ""; //crtUserId();
  const fiveMinutes = 300000;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === item.webuserId;
  const canDelete = currentUserId === item.webuserId; //&& (replies.length === 0);
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
    ActiveComment.type === "editing" &&
    ActiveComment.id === item.commentId;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked, setChecked] = useState(item?.is_user_like);

  const rr_dispatch = useDispatch();
  const {
    MediaComment: { data: VideoCommentData, loading: VideoCommentLoading },
  } = useSelector((state) => state.SingleCompany);

  const handleChange = (event) => {
    let crt_check = event.target.checked;
    let like_type = "like";
    if (!crt_check) {
      like_type = "unlike";
    }
    setChecked(crt_check);
    let params = {
      type: like_type, //  Blank , like or  unlike
      comment_id: item.commentId,
      video_id: item.videoId,
      // webuserId: crtUserId(),
      inputType: "0", //0:edit 1:get
    };
    let vid_params = { ...params };
    // rr_dispatch(VideoCommentLikeAction(vid_params));

    let params0 = {
      ...MediaComment_Req,
      videoId: item.videoId,
      comment: "",
      inputType: "3",
    };
    // rr_dispatch(VideoCommentAction(params0));
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
          </div>
        </div>
        <div className="replies ml-6">
          {isReplying && (
            <AddComment
              videoId={item?.videoId}
              submitLabel="Reply"
              replyId={item?.commentId}
              ActiveComment={ActiveComment}
              setActiveComment={setActiveComment}
            />
          )}

          {isEditing && (
            <AddComment
              videoId={item?.videoId}
              submitLabel="Update"
              replyId={item?.commentId}
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
