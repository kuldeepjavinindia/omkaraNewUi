import { Typography, Button, Input, TextField } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { wlAPI } from "../store/slice/WatchListSlice";
import { watchListReq } from "../constants/defaultRequest";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteDataModal } from "../components/CompanyDetail";

const WatchlistEdit = () => {
  const [addWatchListName, setAddWatchListName] = useState(null);
  const [SaveData, setSaveData] = useState(false);
  const [DeleteData, setDeleteData] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);

  const rr_dispatch = useDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();

  const rrd_params = useParams();

  const itemData = localStorage.getItem("selectedWL")
    ? JSON.parse(localStorage.getItem("selectedWL"))
    : null;
  const [SelectedWLItem, setSelectedWLItem] = useState(itemData);
  const {
    wl: { loading: wlLoading, data: wldata },
  } = useSelector((state) => state.WatchList);

  const handleWachlistName = (e) => {
    setAddWatchListName(e.target.value);
  };

  const handleUpdate = () => {
    let prevData = watchListReq;
    prevData = {
      ...prevData,
      UserID: authState?.user?.UserID,
      ID: SelectedWLItem.ID,
      WatchListNAme: addWatchListName,
      input: 2,
    };
    rr_dispatch(wlAPI(prevData));
    setSaveData(!SaveData);
  };


  

const handleDeleteWatchList = ()=> {
    setDeleteData(true)

    let wlId = wldata.Data.find((item)=> item.ID == SelectedWLItem.ID)
    let para = watchListReq
        para = {
          ...para,
          ID: wlId?.ID,
          input: 3
        }
    rr_dispatch(wlAPI(para));
}






  useEffect(() => {
    if (rrd_params.watchlist_id != itemData?.ID) {
      setSelectedWLItem(null);
    }
  }, [rrd_params]);

  useEffect(() => {
    if (!wlLoading && SaveData) {
      let data = wldata?.Data;
      let New_data = data.find(
        (item) => item.WatchListNAme == addWatchListName
      );
      localStorage.setItem("selectedWL", JSON.stringify(New_data));
      navigate("/watchlist/add-company");
    }
  }, [rr_dispatch, wlLoading]);

  useEffect(() => {
    if (!wlLoading && DeleteData) {
      let data = wldata?.Data;
      let New_data = data?.[0];

      localStorage.setItem("selectedWL", JSON.stringify(New_data));
      navigate("/watchlist/add-company");
    }
  }, [rr_dispatch, wlLoading]);

  if (rrd_params.watchlist_id && rrd_params.watchlist_id != itemData?.ID) {
    return "Page note found";
  }

  return (
    <>
      
      <DeleteDataModal 
        ModalTitle={'Alert!'}
        OpenModal={OpenModal}
        setOpenModal={setOpenModal}
        onClick={()=>{
          // console.log('OpenModal >>> ', OpenModal)
          handleDeleteWatchList(OpenModal)
        }}
      > 
        <Typography className=" font-medium">
            are you sure you want to delete <span className=" font-semibold text-theme uppercase">{`"${SelectedWLItem?.WatchListNAme}"`}</span> watch list?
        </Typography>
      </DeleteDataModal>



      <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
        <div className="rounded-md bg-[#fff] py-7 px-7">
          <Typography className="text-[15px]  font-semibold mb-4">
            CREATE NEW WATCH LIST
          </Typography>
          <label className="text-[12px] text-[#000] font-medium">Name</label>
    
          <Input
            onChange={(e) => handleWachlistName(e)}
            type="text"
            placeholder="Enter Name"
            className="mt-1 !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-8"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            defaultValue={SelectedWLItem?.WatchListNAme}
          />

          <div className="flex items-center mt-4 gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Button
                loading={wlLoading}
                className=" bg-theme text-[#fff] py-2 rounded"
                onClick={() => handleUpdate()}
              >
                {" "}
                UPDATE
              </Button>

              
              <Button
                disabled={wlLoading}
                className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded"

                onClick={()=>{
                  navigate('/bse-news')
                }}
              >
                CANCEL AND GO BACK
              </Button>

              {/* <Button
                disabled={wlLoading}
                className=" bg-[#FAE0E0] text-[#DD2025] py-2 rounded"
              >
                CANCEL AND GO BACK
              </Button> */}
            </div>
            
            <div>
              <Button color="red" className=" py-2 rounded" onClick={ ()=>{ setOpenModal(true); } } >
                Delete
              </Button>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
    </>
  );
};

export default WatchlistEdit;
