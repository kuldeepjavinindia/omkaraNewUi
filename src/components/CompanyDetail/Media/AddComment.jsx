import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import EmojiPicker from 'emoji-picker-react';
import { Button , Typography} from '@material-tailwind/react';
import { FaSmile } from 'react-icons/fa';



export const AddComment = () => {

  
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      // setComments([...comments, commentInput]);
      // setCommentInput("");
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setCommentInput(commentInput + emojiObject.emoji);
    // setShowEmojiPicker(false);
  };



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
          onClick={handleAddComment}
          className="flex items-center bg-[#BDBDBD] text-[#fff] rounded px-3 py-2 text-[12px] shadow-none"
        >
          Send
        </Button>
      </div>
    </div>
    {/* {showEmojiPicker && (
      <div className="absolute bottom-20 left-0 z-10">
        <EmojiPicker onEmojiClick={onEmojiClick} />
      </div>
    )} */}
    {/* <div>
      {comments.map((comment, index) => (
        <div key={index} className="px-4 py-3  bg-[#fff] rounded mb-3">
          <div className='text-[16px]  text-[#000] font-semibold' dangerouslySetInnerHTML={{ __html: comment }} />
        </div>
      ))}
    </div> */}
      
      <div className='  px-5 py-3 mb-3 bg-[#fff] rounded'>
        
      <div className=" flex items-center justify-between ">
        <div className="flex items-center">
       <span className="mr-2 ">
        <img src= {import.meta.env.VITE_BASE_URL  + "/images/Ellipse 2.png"} alt=""  className="w-[22px]" />
       </span>
        <Typography className=" text-[14px] text-lg-[16px] text-[#000] font-semibold">
        Mirilium Pianik
        </Typography>
        </div>
        <div>
      <Typography className="text-[12px] font-normal text-[#495057] ">
      22 MAY, 2023
      </Typography>
        </div>
      </div>

       <div>
        
        <Typography className='text-[12px] mt-3'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, sunt commodi! Inventore vitae nulla id.
        </Typography>
       </div>



      </div>



  </div>
  )
}
export default AddComment;