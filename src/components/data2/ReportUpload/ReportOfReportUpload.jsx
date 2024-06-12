
import { Select, Option , Input, Radio, Typography, Checkbox, Button} from '@material-tailwind/react'
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useDropzone } from "react-dropzone";


const ReportOfReportUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    
  
const CompanyRportRadio = [
    {
        id: 1,
        "name":  "Annual Report",
        "value" : 1,
    },
    {
        id: 2,
        "name":  "Credit Report ",
        "value" : 2,
    },
    {
        id: 3,
        "name":  "Investor Presentation",
        "value" : 3,
    },
    {
        id: 4,
        "name":  "Concall Transcript",
        "value" : 4,
    },
    {
        id: 5,
        "name":  "Quarterly Report",
        "value" : 5,
    },
]


const BrokerageCheckbox = [
    {
        id: 1,
        "name":  "Annual Report",
        "value" : 1,
    },
    {
        id: 2,
        "name":  "General Update ",
        "value" : 2,
    },
    {
        id: 3,
        "name":  "Sector Update",
        "value" : 3,
    },
    {
        id: 4,
        "name":  "Management Meet",
        "value" : 4,
    },
    {
        id: 5,
        "name":  "Result Review",
        "value" : 5,
    },
    {
        id: 6,
        "name":  "Result Preview",
        "value" : 6,
    },
]


const OthersCheckbox = [
    {
        id: 1,
        "name":  "Global Report",
        "value" : 1,
    },
    {
        id: 2,
        "name":  "Strategy Report  ",
        "value" : 2,
    },
    {
        id: 3,
        "name":  "Good Road",
        "value" : 3,
    },
    {
        id: 4,
        "name":  "Budget Report",
        "value" : 4,
    },
    {
        id: 5,
        "name":  "Conference Notes ",
        "value" : 5,
    },
    {
        id: 6,
        "name":  "Top Picks",
        "value" : 6,
    },
    {
        id: 7,
        "name":  "Economy",
        "value" : 7,
    },
    {
        id: 8,
        "name":  "Promoter Update",
        "value" : 8,
    },
]



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


  return (
   <>
   <div className="flex gap-4 mt-5 pr-[20%]">
   <div className="basis-3/12">
       <label className="text-[12px] text-[#000] font-medium">Sectors (58) </label>
       <Select  className='border border-[#C7C7C7]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
       </div>

       <div className="basis-3/12">
       <label className="text-[12px] text-[#000] font-medium">Industry (23) </label>
       <Select  className='border border-[#C7C7C7]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
       </div>

       <div className="basis-3/12">
       <label className="text-[12px] text-[#000] font-medium">Company (23) </label>
       <Select  className='border border-[#C7C7C7]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
       </div>

       <div className="basis-3/12">
       <label className="text-[12px] text-[#000] font-medium">Broker (23) </label>
       <Select  className='border border-[#C7C7C7]' 
       labelProps={{
              className: "hidden",
            }}>
        <Option>Agri.</Option>
        <Option>Bank</Option>
      </Select>
       </div>

   </div>
   {/* End first box*/}
   <div className='pr-[20%] mt-5'>
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
   <div className='flex pr-[20%] mt-5'>
   <div className=' basis-3/12'>
    <label className="text-[12px] text-[#000] font-medium">Report Date</label>
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
   <div className='flex pr-[20%] mt-5'>
   <div className=' basis-3/12'>
    <Typography className="text-[13px] text-[#000] font-medium">COMPANY REPORT</Typography>
    <div className="flex flex-col ml-[-11px]">

   {
    CompanyRportRadio.map((item)=> (
    <Radio name="type" key={item.id}
    className=" custom-radio  checked:border-[#4448F5]"
    color='blue'
    label = {
        <Typography className='text-[#8E8E96] text-[12px] font-medium'>
         {item.name}
        </Typography>
     }
    />
    ))
   }

    
   
  </div>
   </div>

   <div className=' basis-3/12'>
    <Typography className="text-[13px] text-[#000] font-medium">BROKERAGE</Typography>
    <div className="flex flex-col ml-[-11px]">
        {
            BrokerageCheckbox.map((item)=> (
                <Checkbox  key={item.id}  className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
                label = {
                   <Typography className='text-[#8E8E96] text-[12px] font-medium'>
                    {item.name}
                   </Typography>
                }
               />
            ))
        }
 
  </div>
   </div>

   <div className=' basis-3/12'>
    <Typography className="text-[13px] text-[#000] font-medium">OTHERS</Typography>
    <div className="flex flex-col ml-[-11px]">
        {
            OthersCheckbox.map((item)=> (
                <Checkbox  key={item.id}  className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"  
                label = {
                   <Typography className='text-[#8E8E96] text-[12px] font-medium'>
                    {item.name}
                   </Typography>
                }
               />
            ))
        }
 
  </div>
   </div>

   </div>
   {/* End second box*/}

   <div className=' pr-[20%] mt-5'>
    <Typography className='text-[13px] text-[#000] font-semibold'>IMPORTANT FLAG</Typography>
    <div className="flex items-center gap-2">
     <div> <Radio name="type"  className=" custom-radio  checked:border-[#4448F5]" /></div>
     <div>
     <span className='flex items-center gap-1 '> <FaStar fill='#4448F5'/> <Typography className='text-[#8E8E96] text-[12px] font-medium'> (Star) </Typography> </span>
     </div>
    </div>
 
   </div>
   {/* End second box*/}
   <div className='pr-[20%] mt-5'>
    <Typography className='text-[#000] text-[13px] font-semibold'>DOCUMENT</Typography>
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
   </div>
   {/* End second box*/}

           <div className='mt-5'>
           <Button className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"> SUBMIT </Button>
                  <Button className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md">
                  RESET </Button>
           </div>
   {/* End second box*/}
    
   </>
  )
}

export default ReportOfReportUpload