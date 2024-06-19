import { BiSortZA } from "react-icons/bi";
import { BiSortAZ } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { AiOutlineMail } from "react-icons/ai";
// import { TbArrowsSort } from "react-icons/tb";
import {
  Button,
  Typography,
  Input,
  IconButton,
  Spinner,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadDocumentAnalysNoteApi, addToImportantApi } from "../../../store/slice/SingleCompnaySlice";
import { UploadDocumentNoteReq, add_to_importantReq } from "../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
// import { MdEdit } from "react-icons/md";
import ModalPreview from "./ModalPreview";
import moment from "moment";
import { AiFillDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { GlobalContext } from "../../../context/GlobalContext";
import DeleteDataModal from "../Modals/DeleteDataModal";
import { NotesActionButtons } from "../../../constants/helper";
import { useAuthState } from "../../../context/AuthContext";






const StarImpComponent = (props) => {


  const rr_dispatch = useDispatch();
  const authState = useAuthState()
  const userId = authState.user.UserID


  const {
    setOpenModal,
    item

  } = props

  const [checked, setChecked] = useState(item.isImp);


  const handleDocToggle = (checked, item_id) => {
    // console.log(">>>>>>>", item);
    // setChecked(!item)

    let nC = !checked;
    let actionVal = 0;

    if (nC) {
      actionVal = "0"
    } else {
      actionVal = "1"
    }


    let params = add_to_importantReq;
    params = {
      ...params,
      "item_id": item_id,
      "user_id": userId,
      "item_type": "notes",
      "action": actionVal
    }


    rr_dispatch(addToImportantApi(params))

    setChecked(nC);

  }



  return (
    <>
      <div onClick={() => handleDocToggle(checked, item?.CommentID)} className=" cursor-pointer"
      >
        {checked ? (
          <AiFillStar size={20} className="text-theme" />
        ) : (
          <AiOutlineStar size={20} className="text-theme" />
        )}
      </div>


    </>
  )
}




const NotesFinalOutput = () => {
  const [AllUploadDocuments, setAllUploadDocuments] = useState([]);
  const [FirstFilterUploadDocuments, setFirstFilterUploadDocuments] = useState(
    []
  ); // filter docs according to tabs

  const [OpenModal, setOpenModal] = useState(false);
  const { AddNote, setAddNote } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [ToggleData, setToggleData] = useState(false);
  const [BtnDelete, setBtnDelete] = useState(false);

  const authState = useAuthState()

  const finalOutPutBtn = [
    {
      id: 1,
      label: "All",
      search_label: "All",
      value: "1",
      isShow: true,
    },
    {
      id: 2,
      label: "Concall Summary",
      search_label: "Concall Summary",
      value: "2",
      isShow: true,
    },
    {
      id: 3,
      label: "Important Source",
      search_label: "Important Source",
      value: "3",
      isShow: true,
    },
    {
      id: 4,
      label: "Management Meeting",
      search_label: "Management Meeting",
      value: "4",
      isShow: true,
    },
    {
      id: 5,
      label: "One Pager",
      search_label: "One Pager",
      value: "5",
      isShow: true,
    },
    {
      id: 6,
      label: "Quarterly Updates",
      search_label: "Quarter Update",
      value: "6",
      isShow: true,
    },
    {
      id: 7,
      label: "Rough",
      search_label: "Rough",
      value: "7",
      isShow: true,
    },
  ];

  const [isActive, setIsActive] = useState(finalOutPutBtn[0]);
  const rr_dispatch = useDispatch();

  const rrd_params = useParams();

  let cmpId = rrd_params?.company_id;
  if (cmpId) {
    cmpId = window.atob(cmpId);
  }
  const {
    UploadDocumentAnalysNote: {
      data: UploadDocumentAnalysData,
      loading: UploadDocumentAnalysLoading,
    },
  } = useSelector((state) => state.SingleCompany);

  const filterData = (e, type = "type") => {
    if (type == "type") {
      let crtType = finalOutPutBtn.find((itm) => itm.value == e);
      let filteredData = [];
      if (crtType.value === "1") {
        filteredData = FirstFilterUploadDocuments;
      } else {
        filteredData = FirstFilterUploadDocuments.filter(
          (item) =>
            item._CommentDetails.CommentType.trim() == crtType?.search_label
        );
      }
      setAllUploadDocuments(filteredData);
    } else if (type == "search") {
      let itemData = FirstFilterUploadDocuments;

      let crtType = finalOutPutBtn.find((itm) => itm.value == isActive.value);



      if (crtType?.search_label !== "All") {
        itemData = itemData.filter(
          (item) =>
            item._CommentDetails.CommentType.trim() == crtType?.search_label
        );
      }
      
      let val = e.target.value.toLowerCase();
      let filteredData = [];
      if (val == "") {
        filteredData = itemData; 
      }

      let arrNew = [];
      itemData.forEach(function (a) {
        var fName = a._CommentDetails.Heading.toLowerCase();
        if (fName.indexOf(val) > -1) {
          arrNew.push(a);
        }
      });
      filteredData = arrNew;
      setAllUploadDocuments(filteredData);
    }
  };

  const handleDelete = (item) => {
    
    setBtnDelete(true)

    let prams = UploadDocumentNoteReq
        prams = {...prams, CommentID: item?.CommentID}
        prams = {...prams, UserID: item?.UserID}
        prams = {...prams, CompanyID: item?.CompanyID}

    // console.log('prams >>> ', prams)

    rr_dispatch(UploadDocumentAnalysNoteApi([prams]));

  }

  const sortData = (itemData, type) => {
    let sData;
    console.log("aaaaa <>>>>> ", FirstFilterUploadDocuments);
    let a0 = FirstFilterUploadDocuments;
    if (isActive?.search_label !== "All") {
      a0 = itemData;
    }

    // return false
    if (type === "name") {
      if (ToggleData) {
        sData = a0
          .slice()
          .sort((a, b) =>
            a._CommentDetails.Heading.localeCompare(b._CommentDetails.Heading)
          );
      } else {
        sData = a0
          .slice()
          .sort((a, b) =>
            b._CommentDetails.Heading.localeCompare(a._CommentDetails.Heading)
          );
      }
    } else if (type === "date") {
      if (ToggleData) {
        sData = a0.slice().sort((a, b) => {
          var a1 = moment(
            a._CommentDetails.DateTime,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //a.Date
          var b1 = moment(
            b._CommentDetails.DateTime,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //b.Date
          var dd = new Date(a1) - new Date(b1);
          return dd;
        });
      } else {
        sData = a0.slice().sort((a, b) => {
          var a1 = moment(
            a._CommentDetails.DateTime,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //a.Date
          var b1 = moment(
            b._CommentDetails.DateTime,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //b.Date
          var dd = new Date(b1) - new Date(a1);
          return dd;
        });
      }
    }

    setToggleData(!ToggleData);
    setAllUploadDocuments(sData);
  };

  useEffect(() => {
    if (UploadDocumentAnalysLoading) {
      let params = UploadDocumentNoteReq;
      params = {
        ...params,
        CompanyID: cmpId,
        UserID: authState.user.UserID,
      };
      rr_dispatch(UploadDocumentAnalysNoteApi([params]));
    }
  }, []);

  useEffect(() => {
    if (!UploadDocumentAnalysLoading) {
      let fData = UploadDocumentAnalysData?.Data;
      setAllUploadDocuments(fData);
      setFirstFilterUploadDocuments(fData);
    }
  }, [UploadDocumentAnalysLoading]);

  useEffect(() => {
    if (!UploadDocumentAnalysLoading && BtnDelete) {
      setOpenModal(null);
    }
  }, [UploadDocumentAnalysLoading]);

  return (
    <>

      <ModalPreview open={open} setOpen={setOpen} selectedItem={selectedItem} />       
      <DeleteDataModal
        ModalTitle={'Alert!'}
        OpenModal={OpenModal}
        setOpenModal={setOpenModal}
        onClick={()=>{
          handleDelete(OpenModal)
        }}
      > 
        
        <Typography className=" font-medium">
          Are you sure want to delete this note?
        </Typography>

      </DeleteDataModal>





      <div className="col-span-12 mt-5 bg-white py-4 rounded-md">
        <div className="pb-2 border-gray-200 border-b border-0 px-4">
          <div className="flex gap-4 items-center justify-between ">
            <Typography className="text-[15px] text-[#000000] font-semibold">
              Notes
            </Typography>
            <div>
              <Menu className=" w-fit">
                <MenuHandler>
                  <IconButton className=" bg-transparent shadow-none hover:shadow-none">
                    {ToggleData ? (
                      <BiSortAZ className="text-theme" size={18} />
                    ) : (
                      <BiSortZA className="text-theme" size={18} />
                    )}
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      sortData(AllUploadDocuments, "date");
                    }}
                  >
                    Sort by Date
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      sortData(AllUploadDocuments, "name");
                    }}
                  >
                    Sort by Name
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-2 my-2">
            {finalOutPutBtn
              .filter((itm) => itm?.isShow === true)
              .map((item, index) => (
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
                      filterData(item?.value);
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
            onChange={(e) => filterData(e, "search")}
            icon={
              <CgSearch size={19} className=" text-gray-400 top-0 absolute" />
            }
          />
        </div>

        <div className="clientDocs_horizontalCardsList px-4">
          {UploadDocumentAnalysLoading ? (
            <Spinner />
          ) : (
            <>
              {AllUploadDocuments && AllUploadDocuments.length === 0 && (
                <>
                  <Typography className="mt-2">
                    No Data Found In <u>{isActive?.search_label}</u>!
                  </Typography>
                </>
              )}

              <ul>
                {AllUploadDocuments &&
                  AllUploadDocuments.length > 0 &&
                  AllUploadDocuments.map((c_item, i) => {
                    let item = c_item?._CommentDetails;
                    // console.log('item > ', item)
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-4 py-3 border-gray-200 border-b "
                      >

                        <div className="flex items-center gap-3 ">

                      
                       <StarImpComponent item={item} />
                      


                       <div
                          className="flex items-center gap-4 cursor-pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            setOpen(!open);
                          }}
                        >

                     

                          <img
                            src={
                              import.meta.env.VITE_BASE_URL +
                              "/images/icons/pdfIcon.svg"
                            }
                            alt=""
                          />
                          <div>
                            <Typography className="text-[#162E4C] font-semibold text-[14px]">
                              {item?.Heading}
                            </Typography>
                            <Typography className="text-[10px] text-gray-500">
                              <span className="font-semibold text-theme capitalize">
                                {item?.UserName}
                              </span>
                              <span className="font-semibold text-[#000] mx-1">
                                {" "}
                                {item?.CommentType}
                              </span>
                              <span className=" font-medium text-[#909090]">
                                {" "}
                                {item?.DateTime}
                              </span>
                            </Typography>
                          </div>
                        </div>

                        </div>

                      
                           
                            


                       
                        <div className="flex gap-1 w-17">
{
  
  (NotesActionButtons.includes(authState?.user?.UserID) || authState?.user?.UserID == item?.UserID) && (

    <>
    
    <IconButton
                            className=" bg-transparent text-theme shadow-none hover:shadow-none"
                            size="sm"
                            onClick={()=>{
                              setAddNote(item)
                            }}
                          >
                            <MdEdit size={20} />
                          </IconButton>

                          <IconButton
                            className=" bg-transparent text-[#DD2025] shadow-none hover:shadow-none"
                            size="sm"
                            onClick={()=>{
                              setOpenModal(item)
                            }}
                          >
                            <AiFillDelete size={20} />
                          </IconButton>
    
    </>
  )
}


                        </div>
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
        </div>
      </div>
      {/* End Component Final Output */}
    </>
  );
};

export default NotesFinalOutput;
