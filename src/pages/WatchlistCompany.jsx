import {
  Typography,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import CompanySearch from "../components/CompanySearch";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { watchListCompanyReq, watchListReq } from "../constants/defaultRequest";
import { wlCompanyAPI, wlAPI } from "../store/slice/WatchListSlice";
import { Link, useNavigate } from "react-router-dom";
import { DeleteDataModal } from "../components/CompanyDetail";
import { CSVImport } from "../components";
import { useAuthState } from "../context/AuthContext";

const WatchlistCompany = () => {
  const [addCompanyWatchListData, setAddCompanyWatchListData] = useState();
  const rr_dispatch = useDispatch();
  // const navigate =  useNavigate()
  const authState = useAuthState();
  
  const itemData = localStorage.getItem("selectedWL") ? JSON.parse(localStorage.getItem("selectedWL")) : null
  const [SelectedWLItem, setSelectedWLItem] = useState(itemData);

  const {
    wlCompany: {
      loading: wlCompanyLoading,
      data: { Data: wlCompanydata },
    },
  } = useSelector((state) => state.WatchList);


  const {
    wl:{
      loading: wlLoading,
      data: wldata,
    }
  } = useSelector( state=> state.WatchList);


  const [ImportBtn, setImportBtn] = useState(false);
  
  const [OpenModal, setOpenModal] = useState(null);
  const [SelectData, setSelectData] = useState({});


  const handleWlCompDelete = (watchlistData) => {


    let dataWl = addCompanyWatchListData.filter(
      (item) => item.ID != watchlistData.ID
    );
    let param = watchListCompanyReq;
    param = {
      ...param,
      WatchListID: watchlistData.WatchListID,
      ID: watchlistData.ID,
      status: false,
      UserID: authState?.user?.UserID,
      input: 3,
    };
    setOpenModal(null)
    rr_dispatch(wlCompanyAPI(param));
    setAddCompanyWatchListData(dataWl);

  };



  const addCompanyInWL = () => {



    if(addCompanyWatchListData && addCompanyWatchListData.length > 0 && addCompanyWatchListData.find(it=>it.AccordCode == SelectData?.CompanyID)){
      alert('This Company already exist!')
    }else{

    
      let param = watchListCompanyReq;
  
      // itemData
      
      // SelectData
      param =  {
        ...param,
        AccordCode: SelectData?.CompanyID,
        CompanyName: SelectData?.CompanyName,
        WatchListID: itemData?.ID,
        UserID: itemData?.UserID,
        input: 1,
      };
      // console.log('param >>> ', param);
      rr_dispatch(wlCompanyAPI(param));

    }




  }

  


// const handleDeleteWatchList = ()=> {

//     let wlId = wldata.Data.find((item)=> item.ID == SelectedWLItem.ID)
//     let para = watchListReq
//         para = {
//           ...para,
//           ID: wlId?.ID,
//           input: 3
//         }
//     console.log(">>>>>>>>>>",  para);
//     // rr_dispatch(wlAPI(para));

// }


  useEffect(() => {
    if (!wlCompanyLoading) {
      setAddCompanyWatchListData(wlCompanydata);
    }
  }, [wlCompanyLoading, rr_dispatch]);



  useEffect(() => {
    if(Object.keys(SelectData).length > 0){
      // console.log('SelectData >>>> ', SelectData)
      addCompanyInWL(SelectData)
    }
  }, [SelectData])
  

  // if(wlCompanyLoading) {
  //   return <Spinner />
  // }




  

  return (
    <>

      <DeleteDataModal 
        ModalTitle={'Alert!'}
        OpenModal={OpenModal}
        setOpenModal={setOpenModal}
        onClick={()=>{
          // console.log('OpenModal >>> ', OpenModal)
          handleWlCompDelete(OpenModal)
        }}
      > 
        <Typography className=" font-medium">Are you sure want to remove this company from watch list?</Typography>
      </DeleteDataModal>
      <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF] relative">
        <div className="rounded-md bg-[#fff] py-7 px-7">
          <Typography className="text-[15px]  font-semibold mb-5 text-[#000]  uppercase">
            ADD COMPANIES TO {" "}
            
            <span className="text-[#4448F5]">{SelectedWLItem?.WatchListNAme}</span>{" "}
             WATCHLIST (SELECT UPTO 100 COMPANIES)
          </Typography>

          {ImportBtn && (
            <>
                <CSVImport setImportBtn={setImportBtn} ImportBtn={ImportBtn} />
            </>
          )}

          <div className="w-[50%]">
            <div className="flex items-end justify-between mb-3">
              <label className="text-[11px] text-[#000] font-medium">
                Selected : <span className="font-semibold">{addCompanyWatchListData && addCompanyWatchListData.length}</span>
              </label>
              {!ImportBtn && (
                <Button
                  onClick={() => {
                    setImportBtn(!ImportBtn);
                  }}
                  className=" bg-[#ECEDFE] text-theme text-[12px] font-bold px-2 py-2 rounded shadow-none"
                >
                  IMPORT COMPANIES 
                </Button>
              )}
            </div>
            
            <CompanySearch setSelectData={setSelectData} SelectData={SelectData} type="select" />
            
          </div>


          {
            wlCompanyLoading ?
            <>
              <div className="w-full h-full flex justify-start items-center my-5">
                <Spinner className="w-12 h-12" />
              </div>
            </>
            :
            <>
              <div className="grid grid-cols-4 gap-y-3 gap-x-7 mt-8 w-[100%] px-2">
                {addCompanyWatchListData &&
                  addCompanyWatchListData.length > 0 &&
                  addCompanyWatchListData.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="border-0 border-b-[1px] border-[#D1D1D1] pb-3 flex-none basis-[31%] flex items-center justify-between px-1"
                      >
                        <Typography className="text-[13px] text-[#000] font-semibold">
                          {item.CompanyName}{" "}
                        </Typography>
                        <span
                          className="bg-[#FAE0E0] text-[#DD2025] py-1 px-1 rounded cursor-pointer"
                          onClick={() => setOpenModal(item)}
                        >
                          <AiOutlineDelete size={16} />
                        </span>
                      </div>
                    </>
                  ))}
              </div>
            </>
          }


          

           <div className="flex gap-2 mt-4 sticky bottom-0 w-full bg-white shadow-sm p-2 border border-b-0 border-gray-300">
            {/* <Button size="sm" className="bg-theme text-[#fff] rounded" onClick={handleDeleteWatchList} >Delete</Button> */}
            <Link to={`/bse-news`}>
              <Button size="sm" className="bg-theme text-[#fff] rounded">Back</Button>
            </Link> 
           </div>
        </div>
        {/* End Card */}
      </div>
    </>
  );
};

export default WatchlistCompany;
