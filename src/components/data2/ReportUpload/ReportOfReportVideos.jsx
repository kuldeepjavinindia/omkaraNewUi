import React, { useState } from 'react';
import { Select, Option, Input, Button, Typography } from '@material-tailwind/react';
import CompanySearchSelectSingle from '../../CompanySearchSelectSingle';
import { MediaRoomApi } from '../../../store/slice/SingleCompnaySlice';
import { MediaRoomDataReq } from '../../../constants/defaultRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../../../context/AuthContext';


const ReportOfReportVideos = () => {
  const {
    allCompanyMaster: { data: allCmpData, loading: allCmpLoading }
  } = useSelector((state) => state.Masters);

  const [videoMessage, setVideoMessage] = useState(false);

  const authState = useAuthState(); //userID get

  const totalCompanyCount = allCmpData.length;

   const rr_dispatch =  useDispatch()

  const [selectedCompanyID, setSelectedCompanyID] = useState(null);
  const [inputValue, setInputValue] = useState({
    siteType: "",
    videoType: "",
    videoLink: "",
    title: ""
  });

  const handleSelectedCompanyID = (Companyid) => {
    setSelectedCompanyID(Companyid);
    console.log("Selected Company ID set to:", Companyid);
  };

  const siteTypeOptions = [
    { title: "Youtube", value: "youtube" },
    { title: "Vimeo", value: "vimeo" },
  ];

  const documentTypeArr = [
    {
      title: "Single Company",
      value: "SINGLE VIDEO"
    },
    {
      title: "Sector Video",
      value: "Sector Video"
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
    // console.log(`Updated ${name} to:`, value);
  };

  const handleSelectChange = (name, value) => {
    setInputValue({
      ...inputValue,
      [name]: value
    });
    console.log(`Updated ${name} to:`, value);
  };

  const vimeo_parser = (url) => {
    const myArray = url.split("/");
  let code = myArray[3];
  if(myArray[4]){
    code += '/'+myArray[4];
  }
  return code;
  };

  const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  };

  const handleSubmit = () => {
    const { siteType, videoType, videoLink, title } = inputValue;

  
    if (!selectedCompanyID) {
      alert("Please select a company!");
      return;
    }

    if (!siteType) {
      alert("Site Type is required!");
      return;
    }

    if (!videoType) {
      alert("Video Type is required!");
      return;
    }

    if (!videoLink) {
      alert("Video Link is required!");
      return;
    }

    if (!title) {
      alert("Video Title is required!");
      return;
    }

    let videoCode = videoLink;
    if (siteType === "Vimeo") {
      let checkType = videoCode.search("vimeo");
      if (checkType <= -1) {
        alert("Please check video type and video link");
        return;
      }
      videoCode = vimeo_parser(videoCode);
    } else {
      let checkType = videoCode.search("youtu");
      if (checkType <= -1) {
        alert("Please check video type and video link");
        return;
      }
      videoCode = youtube_parser(videoCode);
    }

    // console.log("Submitted with video code:", videoCode);
    // console.log(">>>input value", inputValue);

 
    let param = MediaRoomDataReq;

       param = [
        {
          ...param,
           CompanyID: selectedCompanyID,
           userid: authState?.user?.UserID,
           videoCode:videoCode,
            videoType: siteType,
            videoTitle: title,
            videoDescription: "",
            DocumentType: videoType,
            Type: "RR_Media",
            SectorID: "",
            IndustryID: [],
        }
       ];
    console.log("param >>>>>", param);


    rr_dispatch(MediaRoomApi(param)).then(() => {
      // Update videoState to true
      setVideoMessage(true);


      setTimeout(() => {
        setVideoMessage(false);
      }, 5000);
    }).catch((error) => {
      console.error("Failed to add video:", error);
  
    });

  };

  const handleReset = () => {
    setInputValue({
      siteType: "",
      videoType: "",
      videoLink: "",
      title: ""
    });
    setSelectedCompanyID(null); // Optionally reset company selection
    console.log("Form values reset");
  };



  return (
    <>

    {
      videoMessage ? ( 
        <div className='bg-[#3ed179] p-4 rounded mt-4'>
 <Typography className='text-[#e8f0f4]'>
  Video Added! 
  {/* Refresh the page to add new video. Please wait we are redirecting */}
 </Typography>
        </div>

      ) :  null
      
    }


        {/* <>
      <div className='bg-[#e8f0f4] p-4 rounded'>
        <Typography className='text-[#f04545]'>
         Video Not Added!! 
       
        </Typography>
               </div>
               </> */}

      <div className="flex gap-4 mt-5 pr-[20%]">
        <div className="basis-6/12">
          <label className="text-[12px] text-[#000] font-medium">Company ({totalCompanyCount})</label>
          <CompanySearchSelectSingle onSelectCompanyID={handleSelectedCompanyID} />
        </div>
      </div>
      {/* End first box*/}
      <div className='flex gap-4 pr-[20%] mt-5'>
        <div className='basis-6/12'>
          <label className="text-[12px] text-[#000] font-medium">Site Type </label>
          <Select
            className='border !border-gray-200 bg-[#E9EDEF]'
            value={inputValue.siteType}
            onChange={(value) => handleSelectChange("siteType", value)}
            labelProps={{
              className: "hidden",
            }}
          >
            {siteTypeOptions.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>

        <div className='basis-6/12'>
          <label className="text-[12px] text-[#000] font-medium">Video Type </label>
          <Select
            className='border !border-gray-200 bg-[#E9EDEF]'
            value={inputValue.videoType}
            onChange={(value) => handleSelectChange("videoType", value)}
            labelProps={{
              className: "hidden",
            }}
          >
            {documentTypeArr.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {/* End second box*/}

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
            value={inputValue.title}
            onChange={handleChange}
          />
        </div>

        {inputValue?.siteType && (
          <div className='basis-6/12'>
            <label className="text-[12px] text-[#000] font-medium">{inputValue.siteType} Link </label>
            <Input
              type="text"
              name="videoLink"
              placeholder="Enter Link"
              className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
              labelProps={{
                className: "hidden",
              }}
              value={inputValue.videoLink}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      {/* End third box*/}

      <div className='mt-5'>
        <Button
          className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
        <Button
          className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md"
          onClick={handleReset}
        >
          RESET
        </Button>
      </div>
      {/* End Button box*/}
    </>
  );
};

export default ReportOfReportVideos;
