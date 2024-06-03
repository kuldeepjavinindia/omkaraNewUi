import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Typography,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
// import CustomSearchableSelect from "../../CustomSearchableSelect";
import { GlobalContext } from "../../../context/GlobalContext";
import { DocumentNotes } from "../../../constants/helper";
import { UploadDocumentNoteReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { UploadDocumentAnalysNoteApi } from "../../../store/slice/SingleCompnaySlice";
import { useDispatch, useSelector } from "react-redux";

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
];

const AddNotesModal = (props) => {
  const { modalTitle, cancelButton, updateButton } = props;
  const [commentInput, setCommentInput] = useState("");

  // const handleAddComment = () => {
  //   if (commentInput.trim()) {
  //     // setComments([...comments, commentInput]);
  //     // setCommentInput("");
  //   }
  // };

  const [NoteType, setNoteType] = useState("");
  const [Inputs, setInputs] = useState({});
  const { AddNote, setAddNote } = useContext(GlobalContext);

  const rrd_params = useParams();
  const rr_dispatch = useDispatch();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  
  const {
    UploadDocumentAnalysNote: {
      // data: UploadDocumentAnalysData,
      loading: UploadDocumentAnalysLoading,
    },
  } = useSelector((state) => state.SingleCompany);



  const handleOpen = () => {
    setAddNote(!AddNote);
  };

  const submitForm = () => {
    // let params =  Inputs;

    let params = UploadDocumentNoteReq;
    params = {
      ...params,
      CompanyID: cmpId,
      UserID: "2",
      description: commentInput,
      CommentType: NoteType,
      Type: "SC_Comments",
      Heading: Inputs?.title
    };

    rr_dispatch(UploadDocumentAnalysNoteApi([params]));


  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let prevData = Inputs;
    prevData = {
      ...prevData,
      [name]: value,
    };
    setInputs(prevData);

  };


  useEffect(() => {
    setInputs({})
    setCommentInput("")
    setNoteType("")
  }, [props])


  useEffect(() => {
    if(!UploadDocumentAnalysLoading && AddNote){
      setAddNote(!AddNote);
    }
  }, [UploadDocumentAnalysLoading])
  

  return (
    <>
      <div>
        <Dialog
          open={AddNote}
          // handler={handleOpen}
          size="xxl"
        >
          <DialogHeader className="w-[50%] mx-auto justify-center text-[15px] pb-0">
            {modalTitle || `Upload Note in "Tata Chemicals Ltd."`}
          </DialogHeader>

          <DialogBody className="w-[50%] mx-auto pt-0">
            {
              UploadDocumentAnalysLoading ? 
              <>
              <div className=" flex gap-1">
                  <Spinner />
                  Please wait...
              </div>
              </>
              :
              <>
<div className="mb-1">
              <label className="text-[#000] text-[12px] font-medium ">
                Title
              </label>
              <Input
                // className="  border-[#E9EDEF] !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-3 rounded"
                className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 !bg-[#E9EDEF]"
                placeholder="Enter Title"
                onChange={(e) => handleChange(e)}
                value={Inputs?.title}
                name="title"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>

            <div>
              <label className="text-[#000] text-[12px] font-medium ">
                Note Type
              </label>
              <Select
                value={NoteType}
                onChange={(val) => setNoteType(val)}
                className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 bg-[#E9EDEF]"
                labelProps={{
                  className: "hidden",
                }}
              >
                {DocumentNotes &&
                  DocumentNotes.map((item, i) => {
                    return (
                      <Option key={i} value={item.value}>
                        {item.title}
                      </Option>
                    );
                  })}
              </Select>
            </div>

            <div>
              <label className="text-[#000] text-[12px] font-medium ">
                Description
              </label>
              <div className="h-[300px]">
                <ReactQuill
                  value={commentInput}
                  onChange={setCommentInput}
                  placeholder="Type your comment here"
                  modules={modules}
                  formats={formats}
                  className="w-full h-11 bg-[#fff] border rounded EditorComment text-[#000]"
                />
              </div>
            </div>
              </>
            }
            
          </DialogBody>

          {
            !UploadDocumentAnalysLoading && (
              <>
                <DialogFooter className="justify-start w-[50%] mx-auto pt-0 flex gap-2">
                  <Button
                    onClick={()=>submitForm()}
                    className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"
                  >
                    <span>{updateButton || "Submit"}</span>
                  </Button>
                  <Button
                    onClick={ ()=>handleOpen() }
                    className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md"
                  >
                    <span>{cancelButton || "Cancel and go back"} </span>
                  </Button>
                </DialogFooter>
              </>
            )
          }
        </Dialog>
      </div>
    </>
  );
};

export default AddNotesModal;
