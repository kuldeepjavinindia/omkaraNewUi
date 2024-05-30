
import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import {  Input} from "@material-tailwind/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import CustomSearchableSelect from '../../CustomSearchableSelect';



const modules = {
    toolbar: [
      [ { 'size': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, {'list': 'bullet'}, { 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']                                         
    ],
  };
  
  const formats = [
    'font', 'size', 'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'color', 'background',
    'list', 'bullet', 'align',
    'link', 'image', 'video'
  ];


const AddCommentModal = ({setOpen, open, modalTitle, cancelButton, updatButton, input, label })=> {
  
    const [commentInput, setCommentInput] = useState("");






    const handleAddComment = () => {
        if (commentInput.trim()) {
          // setComments([...comments, commentInput]);
          // setCommentInput("");
        }
      };

      
    const handleOpen = () => setOpen(!open);

    return (
        <>
      <div >
      <Dialog
        open={open}
        // handler={handleOpen}
        size="xxl"
    
      >
        <DialogHeader className='w-[50%] mx-auto justify-center text-[15px] pb-0'> {modalTitle} </DialogHeader>
        <DialogBody className='w-[50%] mx-auto pt-0'>

       <div className='mb-1'>
       <label  className='text-[#000] text-[12px] font-medium ' >{label}</label>
        <Input  className='  border-[#E9EDEF] !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-3 rounded'  placeholder='Enter Title'/>
       </div>

      <div>
        <label className='text-[#000] text-[12px] font-medium '>Note Type</label>
      <CustomSearchableSelect />
    </div>

        <label  className='text-[#000] text-[12px] font-medium '>Description </label>
        <ReactQuill
          value={commentInput}
          onChange={setCommentInput}
          placeholder="Type your comment here"
          modules={modules}
          formats={formats}
          className="w-full h-auto min-h-30 bg-[#fff] border rounded EditorComment text-[#000]"
        />

        </DialogBody>
        <DialogFooter className='justify-start w-[50%] mx-auto pt-0'>
        <Button
            onClick={handleOpen}
            className="mr-1 bg-theme text-[#fff] py-2 rounded"
          >
            <span>{updatButton}</span>
          </Button>
          <Button
           
            onClick={handleOpen}
            className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 rounded"
          >
            <span>{cancelButton} </span>
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
        </>
    )
}

export default AddCommentModal;