import { AiFillDelete } from "react-icons/ai"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { TbArrowsSort } from "react-icons/tb";
import { Button, Typography, Input, IconButton, Spinner } from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadDocumentAnalysNoteApi } from "../../../store/slice/SingleCompnaySlice";
import { UploadDocumentNoteReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalPreview from "./ModalPreview";



const NotesFinalOutput = () => {

  const [AllUploadDocuments, setAllUploadDocuments] = useState([]);
  const [FirstFilterUploadDocuments, setFirstFilterUploadDocuments] = useState([]); // filter docs according to tabs

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const finalOutPutBtn = [
    {
      id: 1,
      label: "All",
      search_label: "All",
      value: "1",
      isShow:true
    },
    {
      id: 2,
      label: "Concall Summary",
      search_label: "Concall Summary",
      value: "2",
      isShow:true
    },
    {
      id: 3,
      label: "Important Source",
      search_label: "Important Source",
      value: "3",
      isShow:true
    },
    {
      id: 4,
      label: "Management Meeting",
      search_label: "Management Meeting",
      value: "4",
      isShow:true
    },
    {
        id: 5,
        label: "One Pager",
        search_label: "One Pager",
        value: "5",
        isShow:true
      },
      {
        id: 6,
        label: "Quarterly Updates",
        search_label: "Quarterly Updates",
        value: "6",
        isShow:true
      },
      {
        id: 7,
        label: "Rough",
        search_label: "Rough",
        value: "7",
        isShow:true
      },
  ];

  const [isActive, setIsActive] = useState(finalOutPutBtn[0]);
  const rr_dispatch = useDispatch();

  const rrd_params = useParams();
    
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }
  const {
    UploadDocumentAnalysNote:{ data: UploadDocumentAnalysData, loading: UploadDocumentAnalysLoading}
  } = useSelector(state=>state.SingleCompany)



  const filterData = (e, type="type") => {
    if(type == "type"){
      let crtType = finalOutPutBtn.find(itm=>itm.value == e);
      let filteredData = [];
      if(crtType.value === "1"){
        filteredData = FirstFilterUploadDocuments;
      }else{
        filteredData = FirstFilterUploadDocuments.filter(item=>item.DocumentType.trim() == crtType?.search_label);
      }
      setAllUploadDocuments(filteredData);      
    }else
    if(type == "search"){
      let val = e.target.value.toLowerCase();
      let filteredData = [];
      if(val == ""){
        filteredData = FirstFilterUploadDocuments;
      }
      
      let arrNew = [];
      FirstFilterUploadDocuments.forEach(function (a) {
          var fName = a.fileName.toLowerCase();
          if (fName.indexOf(val) > -1) {
            
                  arrNew.push(a)
          }
      });
      filteredData = arrNew;
      setAllUploadDocuments(filteredData);    
    }
  }

 

  useEffect(() => {
      if(UploadDocumentAnalysLoading){
        let params = UploadDocumentNoteReq
        params = {
          ...params,
          CompanyID: cmpId
        }
        rr_dispatch(UploadDocumentAnalysNoteApi([params]))
      }
      if(!UploadDocumentAnalysLoading){

        // let filterArr = finalOutPutBtn.map(item=> item.search_label)
        let fData = UploadDocumentAnalysData?.Data;

        // let fData = UploadDocumentAnalysData?.Data.filter( el =>
        //   finalOutPutBtn.some( f => f.search_label.trim() === el.DocumentType.trim()  ) )
         setAllUploadDocuments(fData)
         setFirstFilterUploadDocuments(fData)
        }
  }, [UploadDocumentAnalysLoading])
  
  return (
    <>
      <ModalPreview open = {open} setOpen={setOpen} selectedItem= {selectedItem} />
      <div className="col-span-12 mt-5 bg-white py-4 rounded-md">
        <div className="pb-2 border-gray-200 border-b border-0 px-4">
          <div className="flex gap-4 items-center justify-between ">
            <Typography className="text-[15px] text-[#000000] font-semibold">
             Notes
            </Typography>
            <div>
              <TbArrowsSort className="text-theme" size={18} />
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-2 my-2">
            {finalOutPutBtn.filter(itm=> itm?.isShow ===true).map((item, index) => (
              <li key={index}>
                <Button
                  size="sm"
                  className={`rounded-md px-3 py-1.5 shadow-none hover:shadow-none capitalize ${
                    item?.value == isActive.value
                      ? "bg-theme border-theme text-white border"
                      : "text-[#606F7B]  border border-gray-400 bg-white hover:bg-theme-c2 hover:text-theme hover:border-theme "
                  }`}
                  onClick={() => {
                    setIsActive(item);
                    filterData(item?.value)
                  }}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
          <Input
            type="text"
            placeholder="Search Document"
            className="mt-1 !border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            onChange={(e)=>filterData(e, 'search')}
            icon={
              <CgSearch
                size={19}
                className=" text-gray-400 top-0 absolute"
              />
            }
          />
        </div>

        <div className="clientDocs_horizontalCardsList px-4">
          {
            UploadDocumentAnalysLoading && (
              <Spinner />
            )
          }
          {
            AllUploadDocuments && AllUploadDocuments.length === 0 && (
              <>
                <Typography className="mt-2">No Data Found In <u>{isActive?.search_label}</u>!</Typography>
              </>
            )
          }

          <ul>
            {
              AllUploadDocuments && AllUploadDocuments.length > 0 && AllUploadDocuments.map((c_item, i)=>{
                let item = c_item?._CommentDetails;

                return (
                  <li key={i} className="flex items-center justify-between gap-4 py-3 border-gray-200 border-b ">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL + "/images/icons/pdfIcon.svg"
                        }
                        alt=""
                      />
                      <div>
                        <Typography className="text-[#162E4C] font-semibold text-[14px]">
                          {item?.Heading}
                        </Typography>
                        <Typography className="text-[10px] text-gray-500">
                          <span className="font-semibold text-[#4448F5]">{item?.UserName}</span>
                          <span className="font-semibold text-[#000] mx-1"> {" "}{item?.CommentType}</span>
                          <span className=" font-medium text-[#909090]"> {" "}{item?.DateTime}</span> 
                        </Typography>
                      </div>
                    </div>
                    <div className="flex gap-1 w-17">
                    <IconButton onClick={()=> {
                      console.log('aa');
                      setSelectedItem(item);
                      setOpen(!open)
                    }} className=" bg-transparent text-theme shadow-none hover:shadow-none" size="sm">
                          <FaEye  size={20} />
                        </IconButton>
                        {/* <IconButton className=" bg-transparent text-theme shadow-none hover:shadow-none" size="sm">
                          <MdEdit  size={20} />
                        </IconButton> */}
                        {/* <IconButton className=" bg-transparent text-[#DD2025] shadow-none hover:shadow-none" size="sm">
                          <AiFillDelete size={20} />
                        </IconButton> */}
                    </div>
                  </li>
                )
              })
            }
            
          </ul>
        </div>
      </div>
      {/* End Component Final Output */}
    </>
  );
};

export default NotesFinalOutput;
