import { Button, Spinner, Typography, Input } from "@material-tailwind/react";
import { FaSortAlphaDown } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EarningsCallAPI } from "../../../../store/slice/TrendlyneSlice";
import { TrendlyneReq } from "../../../../constants/defaultRequest";
import moment from "moment";
import { openCompany } from "../../../../constants/helper";
const ConcallTranscripts = () => {
  const {
    EarningsCall: { data: EarningsCallData, loading: EarningsCallLoading },
  } = useSelector((state) => state.Trendlyne);

  const {
    companyNotes: {
      // loading: cmpNotesLoading,
      data: cmpNotesData,
    },
  } = useSelector((state) => state.SingleCompany);

  const rr_dispatch = useDispatch();

  const [ListData, setListData] = useState([]);

  const mergeFun = () => {
    // let present = InvestorPresentationData;
    let present = [];
    // let earning = EarningsCallData.filter(item=> item.postType !== "Investor Presentation" );
    let earning = EarningsCallData; //.filter(item=> item.postType !== "Investor Presentation" );
    let earning0 = earning;

    let a0v =
      earning0 &&
      earning0.length > 0 &&
      earning0.map((item) => {
        item = { ...item, newPostType: item?.postType };
        if (
          item.postType == "Trendlyne Earnings Call" ||
          item.postType == "Earnings Call"
        ) {
          item = { ...item, newPostType: "Earnings Call New" };
        }
        if ((item?.description).includes("Audio/Video")) {
          item = { ...item, newPostType: "mp3" };
        }
        if (
          (item?.title).includes("Investor Presentation") &&
          !(item?.title).includes("Intimation")
        ) {
          item = { ...item, newPostType: "Investor Presentation New" };
        }
        return item;
      });
    earning = a0v || [];

    // Combine the 'present' and 'earning' arrays
    const combinedArray = [...present, ...earning];

    // Create an empty object to store the grouped objects
    const groupedObjects = {};

    // Iterate over the combinedArray
    combinedArray.forEach((obj) => {
      const {
        // postType,
        pubDate,
        pdfUrl,
        videoUrl,
        newPostType,
        url,
      } = obj;
      const date = new Date(pubDate);
      const monthYear = `${date.getMonth()}-${date.getFullYear()}`;

      if (!groupedObjects[monthYear]) {
        groupedObjects[monthYear] = {
          date,
          pdf1: [],
          pdf2: [],
          video: [],
        };
      }

      let n_pdfUrl = pdfUrl || url;

      if (newPostType === "Investor Presentation New") {
        groupedObjects[monthYear].pdf1.push(n_pdfUrl);
      }

      if (newPostType === "Earnings Call New") {
        groupedObjects[monthYear].video.push(videoUrl);
        groupedObjects[monthYear].pdf2.push(n_pdfUrl);
      }
    });

    // Sort the grouped objects by date in descending order
    // console.log('groupedObjects >> ', groupedObjects)
    const sortedObjects = Object.values(groupedObjects).sort(
      (a, b) => b.date - a.date
    );

    // Create the final thirdArray by extracting the required keys
    const thirdArray = sortedObjects.map(({ date, pdf1, pdf2, video }) => {
      // console.log('pdf1, pdf2 >>> ', pdf1, pdf2)
      return {
        date,
        pdf1: pdf1,
        pdf2: pdf2,
        video: video,
      };
    });

    // console.log('thirdArray 00000 >>>>> ', thirdArray);

    let forthArray = [];
    thirdArray.map((item0) => {
      let date = item0?.date;
      let pdf1 = item0?.pdf1;
      let pdf2 = item0?.pdf2;
      let video = item0?.video;
      // let a0 = {}

      let l_pdf = pdf1;
      // let crt_pdf = 'pdf1';

      if (pdf1.length < pdf2.length) {
        l_pdf = pdf2;
        // crt_pdf = 'pdf2';
      }

      l_pdf.map((item, i0) => {
        let obj = {
          date: date,
          pdf1: pdf1[i0] || "",
          pdf2: pdf2[i0] || "",
          video: video[i0] || "",
        };
        if (
          (pdf1[i0] === undefined || pdf1[i0] === "" || pdf1[i0] === null) &&
          (pdf2[i0] === undefined || pdf2[i0] === "" || pdf2[i0] === null)
        ) {
          // console.log('both >>> ', pdf1[i0], pdf2[i0])
        } else {
          // forthArray.push(obj); // remove duplicate data
        }
        forthArray.push(obj);
      });
    });
    // console.log('forthArray >>> ', forthArray)
    setListData(forthArray);
  };


  useEffect(() => {
    if (EarningsCallLoading) {
      let compSlug = cmpNotesData.Data?.[0]?.BSEcode;
      let param = TrendlyneReq;
      param = {
        ...param,
        compSlug,
      };
      rr_dispatch(EarningsCallAPI(param));
    }
    if (!EarningsCallLoading) {
      // let newArr = EarningsCallData;
      mergeFun();
    }
  }, [EarningsCallLoading]);

  return (
    <>
      <div className="col-span-4 mt-5 bg-white py-4 rounded-md">
        <div className="pb-2 border-gray-200 border-b border-0 px-4">
          <div className="flex gap-4 items-center justify-between mb-2">
            <Typography className="text-[15px] text-[#000000] font-semibold">
              Concall Transcripts
            </Typography>
            <FaSortAlphaDown className="text-theme" size={18} />
          </div>

          <Input
            type="text"
            placeholder="Search Company"
            className="mt-1 !border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={(e) => handleChange(e)}
            containerProps={{ className: "min-w-[100px]" }}
            icon={
              <CgSearch size={19} className=" text-gray-400 top-0 absolute" />
            }
          />
        </div>
        {/* End Top */}

        <div className="clientDocs_horizontalCardsList px-4">

          <ul>
            {ListData && ListData.length > 0 && ListData.map((value, i) => {
              // let title = `_____`;
              let fileLink1 = "";
              let fileExtension1 = "";
              fileLink1 = value.pdf1;
              fileExtension1 = fileLink1.split(".").pop();
              if (fileExtension1.toLowerCase() === "pdf") {
                // fileLink1 = `/MyPdfViewer`;
              }
              let fileLink2 = "";
              let fileExtension2 = "";
              fileLink2 = value.pdf2;
              fileExtension2 = fileLink2.split(".").pop();
              if (fileExtension2.toLowerCase() === "pdf") {
                // fileLink2 = `/MyPdfViewer`;
              }

              return (
                <Fragment key={i}>
                <li className="flex items-center justify-between gap-2 py-3 border-gray-200 border-b border-0 ">
                  <Typography className="text-theme-c7 font-semibold text-[14px]">
                    {moment(value?.date).format('MMM YYYY')}
                  </Typography>
                  <div className="flex gap-2 items-stretch">
                    <Button
                      size="sm"
                      className={` text-[#1E1E1E] text-[11px] py-1 border-2 border-gray-900  bg-white rounded`}
                      onClick={()=>{
                        openCompany(fileLink2, 'other')
                      }}
                      disabled={value?.pdf2 === '' ? true : false}
                    >
                      Transcript
                    </Button>
                    <Button
                      disabled={value?.video === '' ? true : false}
                      size="sm"
                      className={` text-[#1E1E1E] py-1 px-2 border-gray-900 border-2 bg-white rounded`}onClick={()=>{
                        openCompany(value?.video, 'other')
                      }}
                    >
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL +
                          "/images/icons/playEnable.svg"
                        }
                        alt=""
                        className="w-3.5"
                      />
                    </Button>
                    <Button
                      disabled={value?.pdf1 === '' ? true : false}
                      size="sm"
                      className={` text-[#1E1E1E] py-1 px-2 border-gray-900 border-2 bg-white rounded`}
                      onClick={()=>{
                        openCompany(fileLink1, 'other')
                      }}
                    >
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL +
                          "/images/icons/tvEnable.svg"
                        }
                        alt=""
                        className="w-3.5"
                      />
                    </Button>
                  </div>
                </li>
                </Fragment>
              )
            })}
            
          </ul>
        </div>
      </div>
      {/* End Component Concall Transcripts */}
    </>
  );
};

export default ConcallTranscripts;
