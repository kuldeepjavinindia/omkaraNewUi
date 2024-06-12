import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import {
  vimeo_parser,
  youtube_parser,
  selectSitesArr,
  selectVideoArr,
  getVidFullUrl,
} from "../../../constants/helper";
import { useDispatch, useSelector } from "react-redux";
import { MediaRoomDataReq } from "../../../constants/defaultRequest";
import { useAuthState } from "../../../context/AuthContext";
import { MediaRoomApi } from "../../../store/slice/SingleCompnaySlice";
import { GlobalContext } from "../../../context/GlobalContext";

const ReportBackVideos = () => {
  const [addVideo, setAddVideo] = useState(false);

  const {
    ReportBankDrawer,
    // setReportBankDrawer
  } = useContext(GlobalContext);

  const authState = useAuthState();
  const crtUserId = authState.user.UserID;
  const cmpId = ReportBankDrawer?.row_data?.CompanyID;

  const handleAddVideo = () => {
    setAddVideo(true);
  };

  const handleCancelVideo = () => {
    setAddVideo(false);
  };
  const [Inputs, setInputs] = useState({});
  const rr_dispatch = useDispatch();

  const {
    MediaRoom: { data: MediaRoomData, loading: MediaRoomLoading },
  } = useSelector((state) => state.SingleCompany);

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

  const submitForm = () => {
    let data = Inputs;

    if (
      data.videoType === "" ||
      data.videoType === undefined ||
      data.videoType === null
    ) {
      alert("Site Type is required!");
      return;
    }

    if (
      data?.DocumentType === "" ||
      data?.DocumentType === undefined ||
      data?.DocumentType === null
    ) {
      alert("Video Type is required!");
      return;
    }

    if (
      Inputs?.videoType === "" ||
      Inputs?.videoType === undefined ||
      Inputs?.videoType === null
    ) {
      alert("Video Title is required!");
      return;
    }
    if (
      Inputs?.videoCode === "" ||
      Inputs?.videoCode === undefined ||
      Inputs?.videoCode === null
    ) {
      alert("Video Link is required!");
      return;
    }

    // data = { ...data };
    let videoCode = "none";
    if (data.videoType) {
      if (data.videoType == "vimeo") {
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
      CompanyID: cmpId,
      userid: crtUserId,
      videoCode: videoCode,
      videoType: data?.videoType,
      videoTitle: data?.videoTitle,
      DocumentType: data?.DocumentType,
      SectorID: SectorID,
      IndustryID: IndustryIDArr,
      Type: "RR_Media",
    };

    rr_dispatch(MediaRoomApi([param]));
  };

  useEffect(() => {
    let param = MediaRoomDataReq;
    param = {
      ...param,
      CompanyID: cmpId,
      userid: crtUserId,
      Type: "RR_Media",
    };

    rr_dispatch(MediaRoomApi([param]));
  }, [rr_dispatch]);

  // useEffect(() => {
  //   if (!MediaRoomLoading) {
  //     // let param = MediaRoomDataReq;
  //     // param = {
  //     //   ...param,
  //     //   CompanyID: cmpId,
  //     //   userid: crtUserId,
  //     // };

  //     // rr_dispatch(MediaRoomApi([param]));
  //   }
  // }, [rr_dispatch, MediaRoomLoading])

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Typography className="text-[21px] text-[#000] font-bold">
          {ReportBankDrawer?.row_data?.CompanyName}
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={() => {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div className="flex gap-2">
        <div className="basis-10/12">
          <Input
            type="text"
            placeholder="Search"
            className="!border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            // icon={<CgSearch size={19} className="text-gray-400 top-[-2px] absolute" />}
          />
        </div>
        <div className="">
          {addVideo ? (
            <Button
              color="red"
              variant="outlined"
              className="text-[13px] font-semibold  h-8 py-0 px-3 rounded whitespace-nowrap shadow-none"
              onClick={() => {
                setAddVideo(false);
              }}
            >
              Close
            </Button>
          ) : (
            <Button
              className="bg-theme text-white text-[13px] font-semibold  h-8 py-0 px-3 rounded whitespace-nowrap shadow-none"
              onClick={() => {
                setAddVideo(true);
              }}
            >
              ADD NEW
            </Button>
          )}
        </div>
      </div>

      {!addVideo ? (
        <>
          <div className="flex gap-2 mt-5">
            <Button className="whitespace-nowrap capitalize 	text-[#5D5F60] bg-[#E9EDEF] py-1 px-2 text-[13px] font-medium shadow-none rounded-full">
              <div className="flex items-center gap-1">
                <span>Agri </span>
                <img
                  src={
                    import.meta.env.VITE_BASE_URL + "/images/icons/tagIcon.svg"
                  }
                  alt=""
                  className="w-3"
                />
                {/* <PiTagBold />  */}
              </div>
            </Button>

            <Button className="whitespace-nowrap capitalize 	text-[#5D5F60] bg-[#E9EDEF] py-1 px-2 text-[13px] font-medium shadow-none rounded-full">
              <div className="flex items-center gap-1">
                <span>Agri </span>
                <img
                  src={
                    import.meta.env.VITE_BASE_URL + "/images/icons/tagIcon.svg"
                  }
                  alt=""
                  className="w-3"
                />
                {/* <PiTagBold />  */}
              </div>
            </Button>
          </div>

          <div className="mt-8 ">
            {/* {
                    JSON.stringify(ReportBankDrawer?.row_data)
                  } */}
            {MediaRoomData?.Data &&
              MediaRoomData?.Data.length > 0 &&
              MediaRoomData?.Data.map((item, i) => {
                const videoCode = item.videoCode;
                const videoType = item.videoType;
                let n_getVidFullUrl = getVidFullUrl(videoCode, videoType);

                return (
                  <>
                    <div className="border border-[#DAE9F7]  p-3 rounded mb-8">
                      <div className="">
                        <ReactPlayer
                          url={n_getVidFullUrl}
                          // playing={playing}
                          // setPlaying={setPlaying}
                          controls={true}
                          width="300px"
                          height="200px"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <Typography className="text-[13px] text-[#232323]  font-medium cursor-pointer ">
                          {item.videoTitle}
                        </Typography>
                        <Typography className="text-[13px] text-[#DD2025]  font-bold  cursor-pointer">
                          {" "}
                          DELETE
                        </Typography>
                      </div>
                    </div>
                    {/* End item */}
                  </>
                );
              })}
          </div>
        </>
      ) : (
        <>
          <div className="mt-6">
            <div className="mb-3">
              <label className="text-[#000] text-[12px] font-medium ">
                Select Site Type
              </label>
              <Select
                value={Inputs.videoType}
                onChange={(val) => {
                  setInputs((prev) => {
                    return { ...prev, videoType: val };
                  });
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
            <div className="mb-3">
              <label className="text-[12px] text-[#000] font-medium">
                Title
              </label>
              <Input
                type="text"
                placeholder="Enter Title"
                className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="text-[#000] text-[12px] font-medium ">
                Select Video Type
              </label>
              <Select
                // disabled
                value={Inputs.DocumentType}
                onChange={(val) => {
                  setInputs((prev) => {
                    return { ...prev, DocumentType: val };
                  });
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
            <div className="mb-3">
              <label className="text-[12px] text-[#000] font-medium">
                Youtube Link
              </label>
              <Input
                type="text"
                placeholder="Enter Link"
                className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>

            <div className="mt-5">
              <Button
                className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"
                onClick={() => submitForm()}
              >
                {" "}
                SUBMIT{" "}
              </Button>
              <Button
                className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md"
                onClick={handleCancelVideo}
              >
                CANCEL AND GO BACK{" "}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReportBackVideos;
