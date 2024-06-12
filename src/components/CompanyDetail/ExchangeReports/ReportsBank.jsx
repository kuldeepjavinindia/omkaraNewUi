import { TbArrowsSort } from "react-icons/tb";
import {
  ButtonGroup,
  Button,
  Spinner,
  Typography,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  IconButton,
  MenuItem,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RepositoryListAPI } from "../../../store/slice/SingleCompnaySlice";
import { RepositoryListReq } from "../../../constants/defaultRequest";
import moment from "moment";
import { useParams } from "react-router-dom";
import { BiSortAZ, BiSortZA } from "react-icons/bi";

const ReportsBank = () => {
  const [IsActivePrimary, setIsActivePrimary] = useState(1);
  const [MonthActiveBtn, setMonthActiveBtn] = useState(1);

  const [AllListData, setAllListData] = useState([]);

  const reportPrimaryBtn = [
    {
      id: 1,
      label: "Company",
      value: "1",
    },
    {
      id: 1,
      label: "Sector",
      value: "2",
    },
  ];

  const reportSecondaryBtn = [
    {
      id: 1,
      label: "1 Month",
      value: "1",
    },
    {
      id: 2,
      label: "3 Months",
      value: "3",
    },
    {
      id: 3,
      label: "6 Months",
      value: "6",
    },
    {
      id: 4,
      label: "12 Months",
      value: "12",
    },
  ];

  const rr_dispatch = useDispatch();
  const rrd_params = useParams();
  const [ToggleData, setToggleData] = useState(false);
    
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }

  const {
    companyNotes:{
      // loading: cmpNotesLoading,
      data: cmpNotesData
    },
    RepositoryList:{
      loading: RepositoryListLoading,
      data: RepositoryListData
    }
  } = useSelector(state=>state.SingleCompany)

  
  const companyData = cmpNotesData?.Data?.[0] || {};

  const callApi = (duration, sector) => {
    let params = RepositoryListReq;
      duration = parseInt(duration);
    let FromDate = moment().subtract(duration, 'M').format('YYYY-MM-DD');
    let ToDate = moment().format('YYYY-MM-DD');
        params = {
      ...params,
          Date:[FromDate, ToDate],
          sectorId:"",
          CompanyId:[cmpId],
        }
        if(sector == 2){
          params = {
            ...params,
            CompanyId:[],
            sectorId:[companyData.sectorID],
          }
        }


    params = {
      ...params,
      
    }

    rr_dispatch(RepositoryListAPI(params))
  }


  const chooseType = (type, item) => {
    if(type === 'type'){
      setIsActivePrimary(item.id);
    }
    if(type === 'month'){
      setMonthActiveBtn(item.id);
    }
    callApi(item?.value, item.id)
  }

  const itemSearch = (event, itemData = RepositoryListData.Data) => {
    var nVal = event.target.value
    // console.log(itemData);
      let arrNew = [];
      itemData.forEach(function (a) {
        var fName = a.Title.toLowerCase();
          nVal = nVal.toLowerCase();
        // console.log(fName, "<=>", nVal);
        if (fName.indexOf(nVal) > -1) {
          arrNew.push(a);
        }
      });
      // console.log('arrNew >>>> ', arrNew);
      setAllListData(arrNew)
      // setFinalOutputData(arrNew);
      // setName(event.target.value);
    };


    


  const sortData = (itemData, type) => {
    let sData;

    let a0 = RepositoryListData?.Data;

    // return false
    if (type === "name") {
      if (ToggleData) {
        sData = a0.slice().sort((a, b) => a.Title.localeCompare(b.Title));
      } else {
        sData = a0.slice().sort((a, b) => b.Title.localeCompare(a.Title));
      }
    } else if (type === "date") {
      if (ToggleData) {
        console.log('ToggleData >> ', {ToggleData, a0})
        sData = a0.slice().sort((a, b) => {
          var a1 = moment(a.ReportDate).format(
            "DD-MMM-YYYY HH:mm:ss"
          ); //a.ReportDate
          var b1 = moment(b.ReportDate).format(
            "DD-MMM-YYYY HH:mm:ss"
          ); //b.ReportDate
          var dd = new Date(a1) - new Date(b1);
          return dd;
        });
      } else {
        sData = a0.slice().sort((a, b) => {
          var a1 = moment(a.ReportDate).format(
            "DD-MMM-YYYY HH:mm:ss"
          ); //a.ReportDate
          var b1 = moment(b.ReportDate).format(
            "DD-MMM-YYYY HH:mm:ss"
          ); //b.ReportDate
          var dd = new Date(b1) - new Date(a1);
          return dd;
        });
      }
    }
    setToggleData(!ToggleData);
    setAllListData(sData);

  };







  useEffect(() => {
    if(RepositoryListLoading){
      callApi(1)
    }
  }, [ rr_dispatch ])

  useEffect(() => {
    if(!RepositoryListLoading){
      setAllListData(RepositoryListData?.Data)
    }
  }, [ rr_dispatch, RepositoryListLoading ])


  return (
    <>
      <div className=" ">
        <div className="bg-white py-4 rounded-sm">
        <div className="pb-2 px-4 border-gray-200 border-b border-0">
          <div className="flex gap-4 items-center justify-between ">
            <Typography className="text-[15px] text-[#000000] font-semibold mb-2">
              Report Bank
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
                        sortData(RepositoryListData?.Data, "date");
                      }}
                    >
                      Sort by Date
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        sortData(RepositoryListData?.Data, "name");
                      }}
                    >
                      Sort by Name
                    </MenuItem>
                  </MenuList>
                </Menu>


            </div>
          </div>
          <ButtonGroup className=" border-[1px] border-gray-400 rounded-lg mb-3 w-fit">
            {reportPrimaryBtn.map((item, i) => {
              return (
                <Button
                  key={i}
                  className={`py-2 border-none ${
                    item.value == IsActivePrimary
                      ? "bg-[#22242F] text-white"
                      : "bg-white text-[#606F7B]"
                  }  `}
                  onClick={() => {
                    // setIsActivePrimary(item.value);
                    
                    chooseType('type', item);
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </ButtonGroup>

          <ul className="flex items-center gap-2  mb-2">
            {reportSecondaryBtn.map((item, index) => (
              <li key={index}>
                <Button
                  size="sm"
                  className={` border rounded-md px-3 py-1.5 shadow-none hover:shadow-none capitalize  ${
                    item?.id == MonthActiveBtn
                      ? "bg-theme text-white border-theme"
                      : "text-[#606F7B] border-gray-400 bg-white"
                  }`}
                  onClick={() => { 
                    chooseType('month', item);
                    //  setMonthActiveBtn(item?.value)
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
            className="flex mt-1 !border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
            labelProps={{
              className: "hidden",
            }}
            onChange={(e) => itemSearch(e)}
            containerProps={{ className: "min-w-[100px]" }}
            icon={
              <CgSearch
                size={17}
                className=" text-gray-400 top-[0px] absolute"
              />
            }
          />
        </div>

        <div className="clientDocs_horizontalCardsList px-4">

          {
            RepositoryListLoading ? (
              <div className="mt-2">
                <Spinner />
              </div>
            )
            :
            <>
            {
            (!RepositoryListLoading && AllListData && AllListData.length == 0) && (
              <Typography className="mt-2">
                Data not found.
              </Typography>
            )
          }
          <ul>
            {
              AllListData && AllListData.length > 0 && AllListData.map((item, i)=>{
                let title = item?.Title;
                let fileLink = item?.link;
                return (
                  <li key={i} className="flex items-center gap-2 py-3 border-gray-200 border-b border-0 cursor-pointer" onClick={()=>{
                    window.open(fileLink, '_blank')
                  }}>
                    <Fragment>
                      <img
                        src={
                          import.meta.env.VITE_BASE_URL + "/images/icons/pdfIcon.svg"
                        }
                        alt=""
                      />
                    </Fragment>
                    <div>
                      <Typography className="text-theme-c7 font-semibold text-[14px]">
                        {title}
                      </Typography>
                      <Typography className="text-[13px] text-[#909090]">
                        <span>{moment(item?.ReportDate).format('DD-MMM-YYYY')}</span>
                      </Typography>
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
       
        
      </div>
      {/* End Component Final Output */}
    </>
  );
};

export default ReportsBank;
