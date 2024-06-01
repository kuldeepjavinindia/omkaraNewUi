
import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { getForensicUpdateTitle } from '../../../constants/helper';
import { Forensic_Comments_Req } from '../../../constants/defaultRequest';
import { useDispatch, useSelector } from 'react-redux';
import { ForensicCommentApi } from '../../../store/slice/SingleCompnaySlice';



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


const EditCommentModal = (props)=> {
  

    const {setOpen, open, modalTitle, cancelButton, updatButton } = props

    const [commentInput, setCommentInput] = useState((""));

    const updateTitle = getForensicUpdateTitle(modalTitle?.Type, modalTitle?.typeData);

    const rr_dispatch = useDispatch();

    // const {
    //   ForensicComment:{
    //     data,
    //     loading,
    //   }
    // } = useSelector(state=>state.SingleCompany)



    const handleAddComment = () => {

        let params = Forensic_Comments_Req;
        params = {
          ...params,
          "CompanyID":modalTitle?.companyId,
          "TableType": updateTitle?.type,
          "description": commentInput
      }

      rr_dispatch(ForensicCommentApi([params]));

      setOpen(!open)
      };
    
    const handleOpen = () => setOpen(!open);


    useEffect(() => {
      setCommentInput(modalTitle?.description)
    }, [props])
    

    return (
        <>
      <div >
      <Dialog
        open={open}
        // handler={handleOpen}
        size="xxl"
      >
        <DialogHeader className='w-[50%] mx-auto justify-center text-[15px] '> Comment - {updateTitle?.title || modalTitle?.title} </DialogHeader>

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
            onClick={handleAddComment}
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