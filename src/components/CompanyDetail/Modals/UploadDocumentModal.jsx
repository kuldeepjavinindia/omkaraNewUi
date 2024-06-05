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
// import { Input } from "@material-tailwind/react";

import { useContext, useEffect, useState } from "react";
// import CustomSearchableSelect from "../../CustomSearchableSelect";
import { GlobalContext } from "../../../context/GlobalContext";
import { DocumentType } from "../../../constants/helper";
import { UploadDocumentReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { MultipleFileUploaderAPI } from "../../../store/slice/SingleCompnaySlice";
import { useDispatch, useSelector } from "react-redux";
// import { FaUpload } from 'react-icons/fa';
import { useDropzone } from "react-dropzone";
import { useAuthState } from "../../../context/AuthContext";

const UploadDocumentModal = (props) => {
  const { modalTitle, cancelButton, updateButton } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleAddComment = () => {
  //   if (commentInput.trim()) {
  //     // setComments([...comments, commentInput]);
  //     // setCommentInput("");
  //   }
  // };

  const { UploadDocument, setUploadDocument } = useContext(GlobalContext);
  const authState = useAuthState();

  const rrd_params = useParams();
  const rr_dispatch = useDispatch();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }

  const [NoteType, setNoteType] = useState(DocumentType?.[0].value);
  const {
    MultipleFileUploader: {
      // data: UploadDocumentAnalysData,
      loading: MultipleFileUploaderLoading,
    },
    companyNotes:{
      // loading: cmpNotesLoading,
      data: cmpNotesData
    }

  } = useSelector((state) => state.SingleCompany);



  const handleOpen = () => {
    setUploadDocument(!UploadDocument);
  };

  // ======Start upload file
  const { getRootProps, getInputProps } = useDropzone({
    // accept: [".pdf", ".xlsx", ".xls", ".doc", ".docx", ".ppt", ".pptx"],
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles);
    },
  });


  const handleUpload = () => {
    // Logic to handle file upload (e.g., send the file to the server)
    console.log("File uploaded:", selectedFile);
  };
  // ======End upload file
  const getBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
    })
  }

  
  const submitForm = async () => {

    // var File = event.target;
    let File = selectedFile;
      console.log('File >>>>> ', File)

    let fileDoc = [];
    let fileName = [];

    for (let l0 = 0; l0 < File.length; l0++) {
        var fileData = File[l0];
        fileName.push(fileData.name);
        await getBase64(fileData)
        .then(res => {
          console.log(res)
          fileDoc.push(res)
        }) // `res` base64 of img file
        .catch(err => console.log(err))
    }


    // let params =  Inputs;
    let singleCompanyData = cmpNotesData.Data[0];
    let params = UploadDocumentReq;
    params = {
      ...params,
      "CompanyID": cmpId,
      "SectorID": singleCompanyData?.sectorID,
      "IndustryID": (singleCompanyData?.industryID || []),
      "UserID": authState.user.UserID ,
      "DocumentType": NoteType,
      "FileName": fileName,
      "FileContent": fileDoc
    };
// console.log('params >>>> ', {params, authState, singleCompanyData})

rr_dispatch(MultipleFileUploaderAPI([params]));

  };
  

  useEffect(() => {
    setSelectedFile(null) 
    setNoteType(null)
  }, [props]);

  useEffect(() => {
    if (!MultipleFileUploaderLoading && UploadDocument) {
      setUploadDocument(!UploadDocument);
    }
  }, [MultipleFileUploaderLoading]);

  // console.log('UploadDocument >>> ', UploadDocument)
  
  return (
    <>
      <div>
        <Dialog
          open={UploadDocument}
          // handler={handleOpen}
          size="xxl"
        >
          <DialogHeader className="w-[50%] mx-auto justify-center text-[15px] pb-0">
            {modalTitle || `Upload Note in "Tata Chemicals Ltd."`}
          </DialogHeader>

          <DialogBody className="w-[50%] mx-auto pt-0">
            {MultipleFileUploaderLoading ? (
              <>
                <div className=" flex gap-1">
                  <Spinner />
                  Please wait...
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-[#000] text-[12px] font-medium ">
                    Document Type
                  </label>
                  <Select
                    label={'Select Document Type'}
                    value={NoteType}
                    onChange={(val) => {
                      setNoteType(val);
                    }}
                    className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 bg-[#E9EDEF]"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    {DocumentType &&
                      DocumentType.map((item, i) => {
                        return (
                          <Option key={i} value={item.value}>
                            {item.title}
                          </Option>
                        );
                      })}
                  </Select>
                </div>

                {/*Start  Upload file */}
                <div className="mt-4">
                  <div
                    className="relative border border-dashed border-theme bg-[#EDEDFE] rounded 
      flex items-center justify-center h-[186px] text-center"
                    {...getRootProps()}
                    // style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '5px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}
                  >
                    {selectedFile ? (
                      <div>
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_BASE_URL +
                              "/images/icons/uploadIcon.svg"
                            }
                            alt=""
                            className="w-[35px] pb-3 mx-auto"
                          />
                        </div>
                        <div className="pb-4 ">
                          <Typography className="text-theme text-[13px] font-semibold uppercase">
                            File selected 
                          </Typography>
                          <ul>
                          {selectedFile.length > 0 && (
                            <>
                              {
                                selectedFile.map((item, i) => {
                                  return (
                                    <li className=" font-medium" key={i}>{item?.name}</li>
                                  )
                                })
                              }
                            </>
                          )}
                          </ul>
                        </div>
                        <Button
                          className="bg-theme py-2 px-5 rounded text-[13px]"
                          onClick={handleUpload}
                        >
                          Upload
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_BASE_URL +
                              "/images/icons/uploadIcon.svg"
                            }
                            alt=""
                            className="w-[35px] pb-3 mx-auto"
                          />
                        </div>
                        <Typography className="text-theme text-[13px] font-semibold pb-4 uppercase">
                          Drag {`'n'`} drop file here, or click to select file
                        </Typography>
                        <label htmlFor="fileInput">
                          <Button
                            className="bg-theme py-2 px-5 rounded"
                            onClick={handleUpload}
                          >
                            Upload
                          </Button>
                        </label>
                        <input
                          multiple
                          {...getInputProps()}
                          // id="fileInput"
                          // type="file"
                          accept=".pdf, .xlsx, .xls, .doc, .docx, .ppt, .pptx"
                          // onChange={handleFileChange}
                          // style={{ display: "none" }} // hide the file input
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* End Upload file */}
              </>
            )}
          </DialogBody>

          {!MultipleFileUploaderLoading && (
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

export default UploadDocumentModal;
