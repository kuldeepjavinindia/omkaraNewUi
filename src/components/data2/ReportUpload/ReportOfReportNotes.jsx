import React, { useState, useEffect } from 'react';
import { Select, Option, Input, Button, Typography } from '@material-tailwind/react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CompanySearchSelectSingle from '../../CompanySearchSelectSingle';
import { UploadDocumentAnalysNoteApi } from '../../../store/slice/SingleCompnaySlice';
import { ReportBankUploadNoteReq } from '../../../constants/defaultRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../../../context/AuthContext';

// Quill editor configuration
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

const ReportOfReportNotes = () => {


  const {
    allCompanyMaster: { data: allCmpData, loading: allCmpLoading }
  } = useSelector((state) => state.Masters);

  const [selectedCompanyID, setSelectedCompanyID] = useState(null);
  const [inputValues, setInputValues] = useState({
    commentType: "", 
    title: "",      
    notes: ""      
  });

  const dispatch = useDispatch();

  const authState = useAuthState(); //userID get

  const [noteMessage, setnoteMessage] = useState(false);


  const totalCompanyCount = allCmpData.length;

  const {
    UploadDocumentAnalysNote: { data: UploadNoteData, loading: UploadNoteDataLoading2 },
  } = useSelector((state) => state.SingleCompany);

  useEffect(() => {
    // dispatch(UploadDocumentAnalysNoteApi(ReportBankUploadNoteReq));
  }, [dispatch]);

  const commentTypes = [
    { title: "Quarter Update", value: "Quarter Update" },
    { title: "Management Meeting", value: "Management Meeting" },
    { title: "One Pager", value: "One Pager" },
    { title: "Important Source", value: "Important Source" },
    { title: "Rough", value: "Rough" }
  ];

  // console.log("Current inputValues:", inputValues);
  // console.log("Selected Company ID:", selectedCompanyID);

  const handleSelectedCompanyID = (Companyid) => {
    setSelectedCompanyID(Companyid);
    console.log("Selected Company ID set to:", Companyid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
    // console.log(`Updated ${name} to:`, value);
  };

  const handleQuillChange = (value) => {
    setInputValues({
      ...inputValues,
      notes: value
    });
    // console.log("Updated notes to:", value);
  };

  const handleSubmit = () => {

    const {commentType, notes, title} = inputValues

    console.log(inputValues);

    if (!selectedCompanyID) {
      alert("Please select a company!");
      return;
    }

    if (!title) {
      alert("Heading is required!");
      return;
    }

    if (!commentType) {
      alert("Comment Type is required!");
      return;
    }

  
    if (!notes) {
      alert("Notes is required!");
      return;
    }





    const param = [
      {
        CompanyID: selectedCompanyID,
        description: inputValues.notes, 
        UserID: authState?.user?.UserID, 
        CommentType: inputValues.commentType,
        Heading: inputValues.title, 
        Type: "RR_Comments"
      }
    ]
    // console.log("Submission Parameters: ", param);
    // dispatch(UploadDocumentAnalysNoteApi(param));

    dispatch(UploadDocumentAnalysNoteApi(param)).then(() => {
      // Update videoState to true
      setnoteMessage(true);


      setTimeout(() => {
        setnoteMessage(false);
      }, 5000);
    }).catch((error) => {
      console.error("Failed to add video:", error);
  
    });

  };

  const handleReset = () => {
      setInputValues(
    {
      commentType: "", 
      title: "",      
      notes: ""      
    }
  )
    setSelectedCompanyID(null); 
 
  };


console.log(inputValues);
 
  return (
    <>


{
      noteMessage ? ( 
        <div className='bg-[#3ed179] p-4 rounded mt-4'>
 <Typography className='text-[#e8f0f4]'>
  Note Added! 
  {/* Refresh the page to add new video. Please wait we are redirecting */}
 </Typography>
        </div>

      ) :  null
      
    }

      <div className="flex gap-4 mt-5 pr-[20%]">
        <div className="basis-6/12">
          <label className="text-[12px] text-[#000] font-medium">Sectors ({totalCompanyCount}) </label>
          <CompanySearchSelectSingle onSelectCompanyID={handleSelectedCompanyID} />
        </div>
      </div>
      {/* End first box */}
      <div className='flex gap-4 pr-[20%] mt-5'>
        <div className='basis-6/12'>
          <label className="text-[12px] text-[#000] font-medium">Title</label>
          <Input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            value={inputValues.title} // Controlled component
            onChange={handleChange} // Update state on change
          />
        </div>

        <div className='basis-6/12'>
          <label className="text-[12px] text-[#000] font-medium">Comment Type </label>
          <Select
            className='border !border-gray-200 bg-[#E9EDEF]'
            value={inputValues.commentType}
            onChange={(e) =>
              setInputValues({
                ...inputValues,
                commentType: e
              })
            }
     


            labelProps={{
              className: "hidden",
            }}
          >
            {commentTypes.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {/* End second box */}

      <div className='pr-[20%] mt-5'>
        <label className="text-[12px] text-[#000] font-medium">Notes</label>
        <div className="h-[300px]">
          <ReactQuill
            value={inputValues.notes} // Controlled component for ReactQuill
            onChange={handleQuillChange} // Update state on change
            placeholder="Type your comment here"
            modules={modules}
            formats={formats}
            className="w-full h-11 bg-[#fff] border rounded EditorComment text-[#000]"
          />
        </div>
      </div>
      {/* End notes box */}

      <div className='mt-5'>
        <Button className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"  
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
        <Button className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md"
          onClick= {handleReset} // Reset form values
        >
          RESET
        </Button>
      </div>
      {/* End Button box */}
    </>
  );
}

export default ReportOfReportNotes;
