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
import { DocumentNotes, vimeo_parser, youtube_parser } from "../../../constants/helper";
import { MediaRoomDataReq, UploadDocumentNoteReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { MediaRoomApi, UploadDocumentAnalysNoteApi } from "../../../store/slice/SingleCompnaySlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "../../../context/AuthContext";

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

const selectSitesArr = [
  { title: "Select Site Type", value: 0 },
  { title: "Youtube", value: "youtube" },
  { title: "Vimeo", value: "vimeo" },
];

const selectVideoArr = [
  { title: "Select Site Type", value: 0 },
  { title: "Single Company", value: "SINGLE VIDEO" },
  { title: "Sector Video", value: "Sector Video" },
];

const AddVideosModal = (props) => {
  const { modalTitle, cancelButton, updateButton } = props;
  const [commentInput, setCommentInput] = useState("");

  const authState = useAuthState();
  const crtUserId = authState.user.UserID;

  // const handleAddComment = () => {
  //   if (commentInput.trim()) {
  //     // setComments([...comments, commentInput]);
  //     // setCommentInput("");
  //   }
  // };

  const [NoteType, setNoteType] = useState("");
  const [Inputs, setInputs] = useState({});
  const { AddVideo, setAddVideo } = useContext(GlobalContext);

  const rrd_params = useParams();
  const rr_dispatch = useDispatch();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const {
    MediaRoom: {
      // data: UploadDocumentAnalysData,
      loading: MediaRoomLoading,
    },
  } = useSelector((state) => state.SingleCompany);

  const handleOpen = () => {
    setAddVideo(!AddVideo);
  };

  const submitForm = () => {
    // let params =  Inputs;

    // let params = UploadDocumentNoteReq;
    // params = {
    //   ...params,
    //   CompanyID: cmpId,
    //   UserID: authState?.user?.UserID,
    //   description: commentInput,
    //   CommentType: NoteType,
    //   Type: "SC_Comments",
    //   Heading: Inputs?.title,
    // };

    // if (AddVideo?.CommentID) {
    //   params = {
    //     ...params,
    //     CommentID: AddVideo?.CommentID,
    //     DateTime: AddVideo?.DateTime,
    //     UserName: AddVideo?.UserName,
    //   };
    // }
    // // console.log('params >>> ', {params, AddVideo})
    // rr_dispatch(UploadDocumentAnalysNoteApi([params]));


    let data = Inputs;

    // data = { ...data };
    let videoCode = "none";
    if(data.videoType){
        if (data.videoType == 'vimeo') {
            videoCode = vimeo_parser(data.videoCode);
        } else {
            // console.log(data.videoCode);
            videoCode = youtube_parser(data.videoCode);
        }
    }

    var IndustryIDArr = [];
    var SectorID = "";
    
    let param = MediaRoomDataReq;
    param = {
      ...param,
      "CompanyID": cmpId,
      "userid": crtUserId,
      "videoCode": videoCode,
      "videoType": data?.videoType,
      "videoTitle": data?.videoTitle,
      "DocumentType": data?.DocumentType,
      "SectorID": SectorID,
      "IndustryID": IndustryIDArr
    };

    console.log('videoParams >>> ', param)

    rr_dispatch(MediaRoomApi([param]))


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
    setInputs({});
    setCommentInput("");
    setNoteType("");

    let data = Inputs;
    data = {
      ...data,
      videoType: selectSitesArr?.[0].value,
      DocumentType: selectVideoArr?.[1].value
      // title: AddVideo?.Heading,
      // CommentType: AddVideo?.CommentType,
      // Discription: AddVideo?.Discription,
    };
    // setNoteType(AddVideo?.CommentType);
    // setCommentInput(AddVideo?.Discription);

    setInputs(data);
  }, [props]);

  useEffect(() => {
    if (!MediaRoomLoading && AddVideo) {
      setAddVideo(!AddVideo);
    }
  }, [MediaRoomLoading]);

  return (
    <>
      <div>
        <Dialog
          open={AddVideo}
          // handler={handleOpen}
          size="xxl"
        >
          <DialogHeader className="w-[50%] mx-auto justify-center text-[15px] pb-0">
            {AddVideo?.CommentType ? `Update Video` : "Add Video"}
          </DialogHeader>

          <DialogBody className="w-[50%] mx-auto pt-0">
            {MediaRoomLoading ? (
              <>
                <div className=" flex gap-1">
                  <Spinner /> Please wait...
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-[#000] text-[12px] font-medium ">
                    Select Site Type
                  </label>
                  <Select
                    value={Inputs.videoType}
                    
                    onChange={(val) => {
                      setInputs(prev=> { return { ...prev, videoType: val } })
                    }}
                    className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 bg-[#E9EDEF]"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    {selectSitesArr &&
                      selectSitesArr.map((item, i) => {
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
                    Select Video Type
                  </label>
                  <Select
                  disabled
                    value={Inputs.DocumentType}
                    onChange={(val) => {
                      setInputs(prev=> { return { ...prev, DocumentType: val } })
                    }}
                    className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 bg-[#E9EDEF]"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    {selectVideoArr &&
                      selectVideoArr.map((item, i) => {
                        return (
                          <Option key={i} value={item.value}>
                            {item.title}
                          </Option>
                        );
                      })}
                  </Select>
                </div>

                <div className="mb-1">
                  <label className="text-[#000] text-[12px] font-medium ">
                    Video Title
                  </label>
                  <Input
                    // className="  border-[#E9EDEF] !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-3 rounded"
                    className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 !bg-[#E9EDEF]"
                    placeholder="Enter Video Title"
                    onChange={(e) => handleChange(e)}
                    value={Inputs?.videoTitle}
                    name="videoTitle"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                <div className="mb-1">
                  <label className="text-[#000] text-[12px] font-medium ">
                    Video Link
                  </label>
                  <Input
                    // className="  border-[#E9EDEF] !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-3 rounded"
                    className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 !bg-[#E9EDEF]"
                    placeholder="Enter Video Link"
                    onChange={(e) => handleChange(e)}
                    value={Inputs?.videoCode}
                    name="videoCode"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                
              </>
            )}
          </DialogBody>

          {!MediaRoomLoading && (
            <>
              <DialogFooter className="justify-start w-[50%] mx-auto pt-0 flex gap-2">
                <Button
                  onClick={() => submitForm()}
                  className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"
                >
                  <span>{updateButton || "Submit"}</span>
                </Button>
                <Button
                  onClick={() => handleOpen()}
                  className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md"
                >
                  <span>{cancelButton || "Cancel and go back"} </span>
                </Button>
              </DialogFooter>
            </>
          )}
        </Dialog>
      </div>
    </>
  );
};

export default AddVideosModal;
