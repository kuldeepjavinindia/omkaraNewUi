import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import EmojiPicker from 'emoji-picker-react';
import { Button, Typography } from "@material-tailwind/react";
import { FaSmile } from "react-icons/fa";

export const AddComment = () => {
  
  const [commentInput, setCommentInput] = useState("");
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const submitComment = () => {
   
  };

  // const onEmojiClick = (event, emojiObject) => {
  //   setCommentInput(commentInput + emojiObject.emoji);
  // };

  return (
    <div className="  addcooment-Media">
      <div className="relative mb-5 ">
        <ReactQuill
          value={commentInput}
          onChange={setCommentInput}
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
          <Button
            variant="contained"
            onClick={submitComment}
            className="flex items-center bg-[#BDBDBD] text-[#fff] rounded px-3 py-2 text-[12px] shadow-none"
          >
            Send
          </Button>
        </div>
      </div>
      
    </div>
  );
};
export default AddComment;
