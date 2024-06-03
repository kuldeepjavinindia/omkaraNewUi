
import { Typography, Button, Input, TextField  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { wlAPI } from "../store/slice/WatchListSlice";
import { watchListReq } from "../constants/defaultRequest";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const WatchlistEdit = () => {

  const [addWatchListName, setAddWatchListName] = useState();
  const rr_dispatch = useDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();

  
  const rrd_params = useParams();


  const itemData = localStorage.getItem("selectedWL") ? JSON.parse(localStorage.getItem("selectedWL")) : null
  const [SelectedWLItem, setSelectedWLItem] = useState(itemData)
  const {
    wl:{
      loading: wlLoading,
      data: wldata,
    }
  } = useSelector( state=> state.WatchList);




  const handleWachlistName = (e)=> {
    setAddWatchListName(e.target.value)
  };


  const handleAddWatchList = ()=> {
    let prevData = watchListReq
    prevData = {
      ...prevData,
      UserID: authState?.user?.UserID,
      WatchListNAme: addWatchListName,
      input: 1
    }



      rr_dispatch(wlAPI(prevData))

      if(!wlLoading){
        navigate("/watchlist/add-company");
      }

      // navigate("/login");
  }



  const handleUpdate = ()=> {
    let prevData = watchListReq
    prevData = {
      ...prevData,
      ID:SelectedWLItem.ID,
      WatchListNAme: addWatchListName,
      input: 2
    }
      rr_dispatch(wlAPI(prevData)); 


      setSelectedWLItem(null)

  }


  console.log(SelectedWLItem, ">>>>>");
  


  useEffect(() => {

    if(rrd_params.watchlist_id != itemData?.ID){
      setSelectedWLItem(null)    
    }
    
  }, [rrd_params])
  
  if(rrd_params.watchlist_id && rrd_params.watchlist_id != itemData?.ID){
    return 'Page note found';     
  }


  return (
   <>
  <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
 <div className="rounded-md bg-[#fff] py-7 px-7">
  <Typography className="text-[15px]  font-semibold mb-8">CREATE NEW WATCH LIST</Typography>
 <label className="text-[12px] text-[#000] font-medium">Name</label>
 {/* {JSON.stringify(rrd_params)} */}
 <Input
    onChange={(e)=> handleWachlistName(e)}
            type="text"
            placeholder="Enter Name"
            className="mt-1 !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-8"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            defaultValue={SelectedWLItem?.WatchListNAme}
          />
          {
            SelectedWLItem ?
            <Button className="mr-5 mt-8 bg-theme text-[#fff] py-2 rounded" onClick={handleUpdate} > UPDATE</Button>
            :
<Button className="mr-5 mt-8 bg-theme text-[#fff] py-2 rounded" onClick={handleAddWatchList}> SAVE</Button>
          }
        
          <Button className="mr-1 mt-8 bg-[#FAE0E0] text-[#DD2025] py-2 rounded">CANCEL AND GO BACK</Button>
 </div>
 {/* End Card */}
  </div>
   </>
  );
};

export default WatchlistEdit;
