import { Typography, Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { wlAPI } from "../store/slice/WatchListSlice";
import { watchListReq } from "../constants/defaultRequest";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const WatchlistCreate = () => {
  const [addWatchListName, setAddWatchListName] = useState(null);
  
  const [SaveData, setSaveData] = useState(false);

  const rr_dispatch = useDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();

  const rrd_params = useParams();

  const itemData = localStorage.getItem("selectedWL")
    ? JSON.parse(localStorage.getItem("selectedWL"))
    : null;
  // const [SelectedWLItem, setSelectedWLItem] = useState(itemData);
  const {
    wl: { loading: wlLoading, data: wldata },
  } = useSelector((state) => state.WatchList);

  const handleWachlistName = (e) => {
    setAddWatchListName(e.target.value);
  };

  const handleAddWatchList = () => {
    let prevData = watchListReq;
    prevData = {
      ...prevData,
      UserID: authState?.user?.UserID,
      WatchListNAme: addWatchListName,
      input: 1,
    };

    rr_dispatch(wlAPI(prevData));
    setSaveData(!SaveData)
    // navigate("/login");
  };


  useEffect(() => {
    if (!wlLoading && SaveData) {
      
      let data = wldata?.Data
      let New_data = data.find(item=>item.WatchListNAme == addWatchListName)
      localStorage.setItem("selectedWL", JSON.stringify(New_data))
      navigate("/watchlist/add-company");
    }
  }, [rr_dispatch, wlLoading]);

  return (
    <>
      <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
        <div className="rounded-md bg-[#fff] py-7 px-7">
          <Typography className="text-[15px]  font-semibold mb-4 uppercase">
            Create New Watch List
          </Typography>
          <label className="text-[12px] text-[#000] font-medium">Name</label>
          {/* {JSON.stringify(rrd_params)} */}
          <Input
            onChange={(e) => handleWachlistName(e)}
            type="text"
            placeholder="Enter Name"
            className="mt-1 !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-8"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />

          <div className="flex gap-2 mt-5 items-center">
            <Button
              loading={wlLoading}
              className="bg-theme text-[#fff] py-2 rounded"
              onClick={()=>handleAddWatchList()}
            >
              {" "}
              SAVE
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

          </div>
        </div>
        {/* End Card */}
      </div>
    </>
  );
};

export default WatchlistCreate;
