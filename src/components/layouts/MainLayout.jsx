import { Outlet, useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import MainSidebar from "./MainSidebar";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wlAPI, wlCompanyAPI } from "../../store/slice/WatchListSlice";
import { watchListCompanyReq, watchListReq } from "../../constants/defaultRequest";
import { allCompanyMasterAPI } from "../../store/slice/MasterSlice";

const MainLayout = () => {

  
  const authState = useAuthState();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const rr_dispatch = useDispatch();

  const {
    wl:{
      loading: wlLoading,
      data: {
        Data:wldata
      },
    }
  } = useSelector( state=> state.WatchList)
  

  // const {
  //   allCompanyMaster:{
  //     loading: cmpMstLoading,
  //     data: cmpMstData,
  //   }
  // } = useSelector( state=> state.Masters)
  
 
  
  useEffect(() => {
    if(localStorage.getItem('user')){
      // console.log("localStorage.getItem('user') ?>>>>> ", localStorage.getItem('user'));
      dispatch({ type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user')) }); 
    }else{
      if (!authState.isAuthenticated) {
        navigate("/login");
      }
    }
  }, [])




  useEffect( () => {

    if(authState.isAuthenticated){
      if(wlLoading){
        let params = watchListReq;
        params = {
          ...params,
          UserID: authState?.user?.UserID
        }
        rr_dispatch(wlAPI(params))
      }
    }
  }, [authState])

  useEffect( () => {

    if(authState.isAuthenticated){
      if(!wlLoading){
        let params = watchListCompanyReq;
        let firstWL = localStorage.getItem("selectedWL") ? JSON.parse(localStorage.getItem("selectedWL")) : wldata?.[0];

        if(wldata.length > 0){
          localStorage.setItem("selectedWL", JSON.stringify(firstWL));
          if(firstWL){
            params = {
              ...params,
              UserID: authState?.user?.UserID,
              WatchListID: firstWL?.ID
            }
            rr_dispatch(wlCompanyAPI(params))
          }
        }
        
      }
    }
  }, [wlLoading])


  // useEffect(() => {
  //   if(cmpMstLoading){
  //     rr_dispatch(allCompanyMasterAPI())
  //   }
  //   if(!cmpMstLoading){
  //     console.log('cmpMstData >>>>> ', cmpMstData)
  //   }
      
  // }, [cmpMstLoading])
  

  
  


  return (
    <>
      <main className="flex gap-2 p-2  w-full">
      
        <MainSidebar />
        <div className="main-body w-full" >
          <MainHeader />
          <Outlet />
          <MainFooter />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
