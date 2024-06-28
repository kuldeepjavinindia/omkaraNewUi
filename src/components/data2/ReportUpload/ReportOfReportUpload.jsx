import {
  Select,
  Option,
  Input,
  Radio,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  industryMasterFun,
  selectBrokerMaster,
  selectCompany,
  selectSectors,
} from "../../../constants/helper";
import {
  RR_BrokerMasterAPI,
  RR_BrokerageAPI,
  RR_CompanyReportAPI,
  RR_OtherReportsAPI,
  allCompanyMasterAPI,
  industryMasterAPI,
  sectorMasterAPI,
} from "../../../store/slice/MasterSlice";
import { Autocomplete, TextField } from "@mui/material";
import RadioListComponent from "./RadioListComponent";
import ListComponent from "./ListComponent";

const ReportOfReportUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const CompanyRportRadio = [
    {
      id: 1,
      name: "Annual Report",
      value: 1,
    },
    {
      id: 2,
      name: "Credit Report ",
      value: 2,
    },
    {
      id: 3,
      name: "Investor Presentation",
      value: 3,
    },
    {
      id: 4,
      name: "Concall Transcript",
      value: 4,
    },
    {
      id: 5,
      name: "Quarterly Report",
      value: 5,
    },
  ];

  const BrokerageCheckbox = [
    {
      id: 1,
      name: "Annual Report",
      value: 1,
    },
    {
      id: 2,
      name: "General Update ",
      value: 2,
    },
    {
      id: 3,
      name: "Sector Update",
      value: 3,
    },
    {
      id: 4,
      name: "Management Meet",
      value: 4,
    },
    {
      id: 5,
      name: "Result Review",
      value: 5,
    },
    {
      id: 6,
      name: "Result Preview",
      value: 6,
    },
  ];

  const OthersCheckbox = [
    {
      id: 1,
      name: "Global Report",
      value: 1,
    },
    {
      id: 2,
      name: "Strategy Report  ",
      value: 2,
    },
    {
      id: 3,
      name: "Good Road",
      value: 3,
    },
    {
      id: 4,
      name: "Budget Report",
      value: 4,
    },
    {
      id: 5,
      name: "Conference Notes ",
      value: 5,
    },
    {
      id: 6,
      name: "Top Picks",
      value: 6,
    },
    {
      id: 7,
      name: "Economy",
      value: 7,
    },
    {
      id: 8,
      name: "Promoter Update",
      value: 8,
    },
  ];

  const rr_dispatch = useDispatch();

  const {
    RR_CompanyReport: {
      // loading:RR_CompanyReportLoading,
      data: RR_CompanyReportData,
    },
    RR_OtherReports: {
      // loading:RR_OtherReportsLoading,
      data: RR_OtherReportsData,
    },
    RR_Brokerage: { loading: RR_BrokerageLoading, data: RR_BrokerageData },
    RR_BrokerMaster: {
      loading: RR_BrokerMasterLoading,
      data: RR_BrokerMasterData,
    },
    sectorMaster: { loading: sectorMasterLoading, data: sectorMasterData },
    industryMaster: {
      loading: industryMasterLoading,
      data: industryMasterData,
    },
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
  } = useSelector((state) => state.Masters);

  const [Inputs, setInputs] = useState([]);
  const [RadioReset, setRadioReset] = useState([]);

  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [IndustryMasterArr, setIndustryMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr] = useState([]);
  const [BrokerMasterArr, setBrokerMasterArr] = useState([]);

  const [Sectors, setSectors] = useState([]);
  const [BrokerMaster, setBrokerMaster] = useState([]);
  const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);
  let u_params = {

  }
  useEffect(() => {
    rr_dispatch(RR_CompanyReportAPI());
    rr_dispatch(RR_OtherReportsAPI());
    rr_dispatch(RR_BrokerageAPI());
    rr_dispatch(RR_BrokerMasterAPI());
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(industryMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
  }, []);

  useEffect(() => {
    if (!sectorMasterLoading) {
      selectSectors(sectorMasterData, setSectorMasterArr);
    }
  }, [rr_dispatch, sectorMasterLoading]);

  useEffect(() => {
    if (!industryMasterLoading) {
      industryMasterFun(industryMasterData, setIndustryMasterArr);
    }
  }, [rr_dispatch, industryMasterLoading]);

  useEffect(() => {
    if (!allCompanyLoading) {
      selectCompany(allCompanyData, setCompanyMasterArr);
    }
  }, [rr_dispatch, allCompanyLoading]);

  useEffect(() => {
    if (!RR_BrokerMasterLoading) {
      selectBrokerMaster(RR_BrokerMasterData, setBrokerMasterArr);
    }
  }, [rr_dispatch, RR_BrokerMasterLoading]);

  // ======Start upload file
  const { getRootProps, getInputProps } = useDropzone({
    // accept: [".pdf", ".xlsx", ".xls", ".doc", ".docx", ".ppt", ".pptx"],
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles);
    },
  });


  const submitData = () => {
      console.log('submitData >>>>> ', Inputs);
  }


  const handleUpload = () => {
    console.log("File uploaded:", selectedFile);
  };

  return (
    <>
      <div className="flex gap-4 mt-5 pr-[20%]">
        <div className="basis-3/12">
          <label className="text-[12px] text-[#000] font-medium">
            Sectors ({SectorMasterArr.length})
          </label>
          
          <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={SectorMasterArr}
                // values={Sectors}
                multiple
                getOptionLabel={(option) => option.title}
                onChange={(event, newInputValue) => {
                  var val1 = [];
                  for (var a = 0; a < newInputValue.length; a++) {
                    val1.push(newInputValue[a].value);
                  }
                  setInputs({ ...Inputs, ['sectorId']: val1 });
                  setSectors(newInputValue);
                }}

                renderOption={(props, option ) => (
                  <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                    {option.title}
                  </li>
                )}

                
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" placeholder="Select" size="small" className="" />}
              />


        </div>

        <div className="basis-3/12">
          <label className="text-[12px] text-[#000] font-medium">
            Industry ({IndustryMasterArr.length})
          </label>
          <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={IndustryMasterArr}

                    multiple
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Industry"]: val1 });
                      setIndustry(newInputValue);
                      
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          allCompanyLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />
          
        </div>

        <div className="basis-3/12">
          <label className="text-[12px] text-[#000] font-medium">
            Company ({CompanyMasterArr.length})
          </label>
          <Autocomplete  
            disablePortal
            id="combo-box-demo"
            options={CompanyMasterArr}
            // values={Company}
            multiple
            getOptionLabel={(option) => option.title}
            renderOption={(props, option ) => (
              <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                {option.title}
              </li>
            )}
            onChange={(event, newInputValue) => {
              var val1 = [];
              for (var a = 0; a < newInputValue.length; a++) {
                val1.push(newInputValue[a].value);
              }
              setInputs({ ...Inputs, ['CompanyId']: val1 });
              setCompany(newInputValue)
              // console.log('Company >> ',company)
            }}
            renderInput={(params) => <TextField {...params} label="" placeholder={allCompanyLoading ? "Loading..." : "Select"} size="small" className="" />}
          />
          
        </div>

        <div className="basis-3/12">
          <label className="text-[12px] text-[#000] font-medium">
            Broker ({BrokerMasterArr.length})
          </label>
          <Autocomplete 
                disablePortal
                id="combo-box-demo"
                options={BrokerMasterArr}
                onChange={(event, newInputValue) => {
                  var val1 = [];
                  for (var a = 0; a < newInputValue.length; a++) {
                    val1.push(newInputValue[a].value);
                  }
                  setInputs({ ...Inputs, ['BrokerId']: val1 });
                  setBrokerMaster(newInputValue);
                }}
                // values={BrokerMaster}
                multiple
                getOptionLabel={(option) => option.title}
                renderOption={(props, option ) => (
                  <li {...props} className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer ">
                    {option.title}
                  </li>
                )}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" placeholder="Select" size="small" className="" />}
              />
          
        </div>
      </div>
      {/* End first box*/}
      <div className="pr-[20%] mt-5">
        <label className="text-[12px] text-[#000] font-medium">Title</label>
        <Input
          type="text"
          placeholder="Enter Title"
          className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
          labelProps={{
            className: "hidden",
          }}
        />
      </div>
      {/* End second box*/}
      <div className="flex pr-[20%] mt-5">
        <div className=" basis-3/12">
          <label className="text-[12px] text-[#000] font-medium">
            Report Date
          </label>
          <Input
            type="date"
            placeholder="Enter Title"
            className=" !border !border-[#C7C7C7] !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
          />
        </div>
      </div>
      {/* End second box*/}
      <div className="flex pr-[20%] mt-5">
        <div className=" basis-3/12">
          <RadioListComponent IsEdit={u_params?.fileId ? true : false} RadioReset={RadioReset} setRadioReset={setRadioReset} lisTitle="Company Report" listArr={RR_CompanyReportData} name="companyreport" QuarterlyName="companyreportQuarterly" Inputs={Inputs} setInputs={setInputs} />
          {/* <Typography className="text-[13px] text-[#000] font-medium">
            COMPANY REPORT
          </Typography>
          <div className="flex flex-col ml-[-11px]">
            {CompanyRportRadio.map((item) => (
              <Radio
                name="type"
                key={item.id}
                className=" custom-radio  checked:border-[#4448F5]"
                color="blue"
                label={
                  <Typography className="text-[#8E8E96] text-[12px] font-medium">
                    {item.name}
                  </Typography>
                }
              />
            ))}
          </div> */}
        </div>

        <div className=" basis-3/12">
          <ListComponent IsEdit={u_params?.fileId ? true : false} RadioReset={RadioReset} setRadioReset={setRadioReset} lisTitle="Brokerage" listArr={RR_BrokerageData} name="brokerage" QuarterlyName="brokerageQuarterly" Inputs={Inputs} setInputs={setInputs} />
          {/* <Typography className="text-[13px] text-[#000] font-medium">
            BROKERAGE
          </Typography>
          <div className="flex flex-col ml-[-11px]">
            {BrokerageCheckbox.map((item) => (
              <Checkbox
                key={item.id}
                className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
                label={
                  <Typography className="text-[#8E8E96] text-[12px] font-medium">
                    {item.name}
                  </Typography>
                }
              />
            ))}
          </div> */}
        </div>

        <div className=" basis-3/12">
          <ListComponent IsEdit={u_params?.fileId ? true : false} RadioReset={RadioReset} setRadioReset={setRadioReset} lisTitle="Others" listArr={RR_OtherReportsData} name="othersReports" QuarterlyName="" Inputs={Inputs} setInputs={setInputs} />
          {/* <Typography className="text-[13px] text-[#000] font-medium">
            OTHERS
          </Typography>
          <div className="flex flex-col ml-[-11px]">
            {OthersCheckbox.map((item) => (
              <Checkbox
                key={item.id}
                className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
                label={
                  <Typography className="text-[#8E8E96] text-[12px] font-medium">
                    {item.name}
                  </Typography>
                }
              />
            ))}
          </div> */}
        </div>
      </div>
      {/* End second box*/}

      <div className=" pr-[20%] mt-5">
        <Typography className="text-[13px] text-[#000] font-semibold">
          IMPORTANT FLAG
        </Typography>
        <div className="flex items-center gap-2">
          <div>
            {" "}
            <Radio
              name="type"
              className=" custom-radio  checked:border-[#4448F5]"
            />
          </div>
          <div>
            <span className="flex items-center gap-1 ">
              {" "}
              <FaStar fill="#4448F5" />{" "}
              <Typography className="text-[#8E8E96] text-[12px] font-medium">
                {" "}
                (Star){" "}
              </Typography>{" "}
            </span>
          </div>
        </div>
      </div>
      {/* End second box*/}
      <div className="pr-[20%] mt-5">
        <Typography className="text-[#000] text-[13px] font-semibold">
          DOCUMENT
        </Typography>
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
                        {selectedFile.map((item, i) => {
                          return (
                            <li className=" font-medium" key={i}>
                              {item?.name}
                            </li>
                          );
                        })}
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
      </div>
      {/* End second box*/}

      <div className="mt-5">
        <Button className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md" onClick={()=>submitData()}>
          {" "}
          SUBMIT{" "}
        </Button>
        <Button className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md">
          RESET{" "}
        </Button>
      </div>
      {/* End second box*/}
    </>
  );
};

export default ReportOfReportUpload;
