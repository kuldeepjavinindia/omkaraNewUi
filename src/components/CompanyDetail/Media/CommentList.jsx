import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { MediaComment_Req } from "../../../constants/defaultRequest";
import { useDispatch, useSelector } from "react-redux";
import { MediaCommentApi } from "../../../store/slice/SingleCompnaySlice";
import { useAuthState } from "../../../context/AuthContext";
import CommentCard from "./CommentCard";

const CommentList = (props) => {

    const rr_dispatch = useDispatch();
    const authState = useAuthState()
    const [ActiveComment, setActiveComment] = useState(null)

    const { 
        MediaComment:{
            data: VideoCommentData,
            loading: VideoCommentLoading
        }
     } = useSelector((state) => state.SingleCompany);


    const rootComments = VideoCommentData?.Data && VideoCommentData?.Data.filter(item=> item.parentId === Number(0));


    const {
        ActiveVideoItem
    } = props

    const callApi = () => {
        let params = MediaComment_Req
            params = {
                ...params,
                videoId: ActiveVideoItem?.videoId,
                comment: '',
                webuserId: authState?.user?.UserID,
                webUserName: authState?.user?.UserNAme,
                inputType: "3"
            }
            rr_dispatch(MediaCommentApi(params))
    }
    useEffect(() => {
        callApi()
    }, [ActiveVideoItem])

    useEffect(() => {
        if(!VideoCommentLoading){
            console.log('====================================');
            // console.log('VideoCommentData >>> ', VideoCommentData)
            // console.log();
            console.log('====================================');
        }
    }, [rr_dispatch, VideoCommentLoading])

    const getRepliesFilter = (commentId) => {
        return VideoCommentData?.Data.filter(item=> item.parentId === commentId);
    }

    

  return (
    <>


    {
        rootComments && rootComments.length > 0 && rootComments.map((item, i)=>{
            return (
                <Fragment key={i}>
                    <CommentCard item={item} replies={getRepliesFilter(item?.commentId)} ActiveComment={ActiveComment} setActiveComment={setActiveComment} />
                </Fragment>
            )
        })
    }

      

    </>
  );
};

export default CommentList;
