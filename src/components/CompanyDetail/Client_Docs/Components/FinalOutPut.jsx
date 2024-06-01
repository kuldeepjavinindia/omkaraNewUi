import { AiFillDelete } from "react-icons/ai"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { TbArrowsSort } from "react-icons/tb";
import { Button, Typography, Input, IconButton, Spinner, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadDocumentAPI } from "../../../../store/slice/SingleCompnaySlice";
import { UploadDocumentReq } from "../../../../constants/defaultRequest";
import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { openCompany, openPdfWithWaterMark } from "../../../../constants/helper";
import moment from "moment";
import { BiSortAZ, BiSortZA } from "react-icons/bi";

const FinalOutPut = () => {

  const [AllUploadDocuments, setAllUploadDocuments] = useState([]);
  const [FirstFilterUploadDocuments, setFirstFilterUploadDocuments] = useState([]); // filter docs according to tabs

  const [ToggleData, setToggleData] = useState(false);

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
      label: "Initial Coverage",
      search_label: "Initial Coverage",
      value: "2",
      isShow:true
    },
    {
      id: 3,
      label: "Qtr Update",
      search_label: "Quarterly Update",
      value: "3",
      isShow:true
    },
    {
      id: 4,
      label: "Others",
      search_label: "Others",
      value: "4",
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
    UploadDocument:{
      data: UploadDocumentData,
      loading: UploadDocumentLoading
    }
  } = useSelector(state=>state.SingleCompany)



  const filterData = (e, type="type") => {
    if(type == "type"){
      let crtType = finalOutPutBtn.find(itm=>itm.value == e);
      let filteredData = [];
      if(crtType.value === "1"){
        filteredData = FirstFilterUploadDocuments;
      }else{
        filteredData = FirstFilterUploadDocuments.filter(item=>item.DocumentType == crtType?.search_label);
      }
      setAllUploadDocuments(filteredData);      
    }else
    if(type == "search"){
      let val = e.target.value.toLowerCase();
      let filteredData = [];

      let itemData = FirstFilterUploadDocuments;
      let crtType = finalOutPutBtn.find((itm) => itm.value == isActive.value);
      itemData = itemData.filter((item) => item.DocumentType.trim() == crtType?.search_label );

      if(val == ""){
        filteredData = itemData;
      }
      
      let arrNew = [];
      itemData.forEach(function (a) {
          var fName = a.fileName.toLowerCase();
          if (fName.indexOf(val) > -1) {
                  arrNew.push(a)
          }
      });
      filteredData = arrNew;
      setAllUploadDocuments(filteredData);    
    }
  }


  
  const sortData = (itemData, type) => {
    let sData;
    
    let a0 = FirstFilterUploadDocuments;
    if(isActive?.search_label !== "All"){
      a0 = itemData;
    }

    // return false
    if (type === "name") {
      if (ToggleData) {
        sData = a0.slice().sort((a, b) =>
          a.fileName.localeCompare(b.fileName)
        );
      } else {
        sData = a0.slice().sort((a, b) =>
          b.fileName.localeCompare(a.fileName)
        );
      }
    } else if (type === "date") {
      if (ToggleData) {
        sData = a0.slice().sort((a, b) => {
          var a1 = moment(
            a.Date,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //a.Date
          var b1 = moment(
            b.Date,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //b.Date
          var dd = new Date(a1) - new Date(b1);
          return dd;
        });
      } else {
        sData = a0.slice().sort((a, b) => {
          var a1 = moment(
            a.Date,
            "DD-MM-YYYY HH:mm:ss",
            true
          ).format("DD-MMM-YYYY HH:mm:ss"); //a.Date
          var b1 = moment(
            b.Date,
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
      if(UploadDocumentLoading){
        let params = UploadDocumentReq
        params = {
          ...params,
          CompanyID: cmpId
        }
        rr_dispatch(UploadDocumentAPI([params]))
      }
      if(!UploadDocumentLoading){

        // let filterArr = finalOutPutBtn.map(item=> item.search_label)
        let fData = UploadDocumentData.filter( el =>
          finalOutPutBtn.some( f =>
                        f.search_label === el.DocumentType 
                      )
                    )
        setAllUploadDocuments(fData)
        setFirstFilterUploadDocuments(fData)
      }
  }, [rr_dispatch, UploadDocumentLoading])
  

  return (
    <>
      <div className="col-span-5 mt-5 bg-white py-4 rounded-md">
        <div className="pb-2 border-gray-200 border-b border-0 px-4">
          <div className="flex gap-4 items-center justify-between ">
            <Typography className="text-[15px] text-[#000000] font-semibold">
              Final Output
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

          <ul className="flex items-center gap-2 my-2">
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
            placeholder="Search Company"
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
            UploadDocumentLoading ? (
              <Spinner />
            )
            :
            <>
            {
            AllUploadDocuments && AllUploadDocuments.length === 0 && (
              <>
                <Typography className="mt-2">No Data Found In <u>{isActive?.search_label}</u>!</Typography>
              </>
            )
          }

          <ul>
            {
              AllUploadDocuments && AllUploadDocuments.length > 0 && AllUploadDocuments.map((item, i)=>{
                // console.log('item >>> ', item)
                return (
                  <li key={i} className="flex items-center justify-between gap-4 py-3 border-gray-200 border-b ">
                    <div className="flex items-center gap-4 justify-between w-full">
                      <div className="flex items-center gap-4 cursor-pointer" onClick={()=>{
                        openPdfWithWaterMark(item.link, 'Final Output')
                      }}>
                        <img
                          src={
                            import.meta.env.VITE_BASE_URL + "/images/icons/pdfIcon.svg"
                          }
                          alt=""
                        />
                        <div>
                          <Typography className="text-theme-c7 font-semibold text-[14px]">
                            {item?.fileName}
                          </Typography>
                          <Typography className="text-[10px] text-gray-500">
                            <span className="font-semibold">{item?.UserName}</span>
                            <span className=" font-medium">•{" "}{item?.Date}</span> <span className="font-medium">•{" "}{item?.DocumentType}</span>
                          </Typography>
                        </div>
                      </div>
                      <div>
                        {/* <IconButton className=" bg-transparent text-theme shadow-none hover:shadow-none" size="sm">
                          <AiOutlineMail size={20} />
                        </IconButton>
                        <IconButton className=" bg-transparent text-[#DD2025] shadow-none hover:shadow-none" size="sm">
                          <AiFillDelete size={20} />
                        </IconButton> */}
                      </div>
                    </div>
                  </li>
                )
              })
            }
            
          </ul>
            </>
          }
          
        </div>
      </div>
      {/* End Component Final Output */}
    </>
  );
};

export default FinalOutPut;
