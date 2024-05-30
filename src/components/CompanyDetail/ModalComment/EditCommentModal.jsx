
import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';



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


const EditCommentModal = ({setOpen, open, modalTitle, cancelButton, updatButton })=> {
  
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
        <DialogHeader className='w-[50%] mx-auto justify-center text-[15px] '> {modalTitle} </DialogHeader>
        <DialogBody className='w-[50%] mx-auto pt-0'>
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
            variant="text"
            onClick={handleOpen}
            className="mr-1 bg-theme text-[#fff] py-2 rounded"
          >
            <span>{updatButton}</span>
          </Button>
          <Button
            variant="text"
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

export default EditCommentModal;