import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import EmojiPicker from 'emoji-picker-react';
import { Button, Typography } from "@material-tailwind/react";
import { FaSmile } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { MediaCommentApi } from "../../../store/slice/SingleCompnaySlice";
import { toast } from "react-toastify";
import { MediaComment_Req } from "../../../constants/defaultRequest";
import { useAuthState } from "../../../context/AuthContext";

export const AddComment = (props) => {

  const {
    videoId,
    isCancel,
    submitLabel,
    ActiveComment,
    setActiveComment
  } = props

  const rr_dispatch = useDispatch();
  const authState = useAuthState()


  useEffect(() => {
    console.log('props >> ', props)
  }, [props])
  
  const [TextData, setTextData] = useState("");

  const submitComment = () => {
    
    let message = 'Comment Added Successfully!'
    if(TextData == ""){
      alert('This field in required!')
      return ''
    }

    setTextData("");

    let params = {
        ...MediaComment_Req,
        videoId: ActiveComment?.item.videoId || videoId,
        comment: TextData,
        inputType: "0"
      }
      params = {
        ...params,
        webuserId: authState?.user?.UserID,
        webUserName: authState?.user?.UserNAme,
      }
      if(ActiveComment && ActiveComment?.type === 'replying'){
        params = {
          ...params,
          parentId:ActiveComment?.item.commentId
        }
      }
      if(ActiveComment && ActiveComment?.type === 'editing'){
        params = {
          ...params,
          commentId:ActiveComment?.item.commentId,
          inputType: "1"
        }
        message = 'Comment Updated Successfully!'
      }
      
      rr_dispatch(MediaCommentApi(params));
      setActiveComment(null);
      toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTextData("");
      
  };

  // const onEmojiClick = (event, emojiObject) => {
  //   setCommentInput(commentInput + emojiObject.emoji);
  // };

  return (
    <div className="  addcooment-Media">
      <div className="relative mb-5 ">
        <ReactQuill
          value={TextData}
          onChange={setTextData}
          placeholder="Type your comment here"
          className="w-full h-auto min-h-30 bg-[#fff] "
        />
        <div className="absolute bottom-3 left-3">
          {/* <button 
          // onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="flex items-center justify-center"
        >
          
        </button> */}
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex gap-2 items-center">
            <Button
              variant="contained"
              onClick={()=>submitComment()}
              size="sm"
              className=" bg-[#BDBDBD] text-[#fff] rounded text-[12px] shadow-none hover:bg-theme"
            >
              {submitLabel || "Submit"}
            </Button>
            {
              isCancel && (
                <Button
                  color="red"
                  onClick={()=>setActiveComment(null)}
                  variant='outlined'
                  size="sm"
                  className=" rounded text-[12px] shadow-none"
                >
                  Cancel  
                </Button>
              )
            }
            
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default AddComment;
