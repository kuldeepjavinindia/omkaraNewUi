import { Input, List, ListItem, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CgClose, CgSearch } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { companyMasterReq } from "../constants/defaultRequest";
import { companyMasterAPI } from "../store/slice/MasterSlice";
import { openCompany } from "../constants/helper";

const CompanySearch = (props) => {
    const {
        inputProps,
        iconProps
    } = props
  const [Search, setSearch] = useState("");

  const [SelectedItem, setSelectedItem] = useState(-1);

  
  const {
    companyMaster:{
      loading: cmpMstLoading,
      data: cmpMstData,
    }
  } = useSelector( state=> state.Masters)

  const handleSearch = (e) => {
    let val = e.target.value;
    setSearch(val);
  };
  const handelClose = () => {
    setSearch("");
    setSelectedItem(-1)
  };
  const handelKeyDown = e => {
    let crtKey = e.key;

    if(crtKey === "ArrowUp" && SelectedItem > 0){
        setSelectedItem(prev => prev - 1 )
    }
    else
    if(crtKey === "ArrowDown" && SelectedItem < cmpMstData.length - 1){
        setSelectedItem(prev => prev + 1 )
    }
    else
    if(crtKey === "Enter"){
        openCompany(cmpMstData[SelectedItem])
    }else{
        setSelectedItem(-1)
    }
    

  };
  const rr_dispatch  = useDispatch();

  useEffect(() => {
    if(Search != '' && Search.length > 3){
        let params = companyMasterReq;
        params = {
            ...params,
            Search: Search
        }
        rr_dispatch(companyMasterAPI(params))
    }
  }, [Search])
  

  return (
    <div className="relative">
      
      <Input
        className={inputProps?.className ? inputProps?.className : ""}
        label={inputProps?.label ? inputProps?.label : "Search Company"}
        size={inputProps?.size ? inputProps?.size : "md"}
        icon={
            <>
            {
                Search != "" ?
                    <span  onClick={ (e) => handelClose(e)} className=" cursor-pointer">
                        <CgClose  size={iconProps?.size ? iconProps?.size : ""} className={inputProps?.className ? inputProps?.className : ""}/>
                    </span>
                :
                    <CgSearch size={iconProps?.size ? iconProps?.size : ""} className={iconProps?.className ? iconProps?.className : ""} />
            }
                
                
            </>
        }
        value={Search}
        onChange={(e) => handleSearch(e)}
        onKeyDown={(e)=>handelKeyDown(e)}
        // onBlur={(e)=>handelClose(e)}
      />
      {
        Search != "" && (
            <div className="searchResult absolute top-10 bg-white w-full p-2 rounded-lg border-[1px] border-gray-400 border-t-0">
                <List className="p-0 max-h-36 overflow-y-auto" >
                    {
                        cmpMstLoading ? (
                            <ListItem disabled size="sm" className=" text-sm py-1">
                                <Spinner />
                            </ListItem>
                        ) :
                        <>
                        {
                            cmpMstData && cmpMstData.length == 0 && (
                                <ListItem disabled size="sm" className=" text-sm py-1">Data not found</ListItem>
                            )
                        }
                        {
                            cmpMstData && cmpMstData.length > 0 && cmpMstData.map((item, i)=>{
                                return (
                                    <div  onClick={()=>openCompany(item)} key={i}>
                                        <ListItem size="sm" className={`${SelectedItem === i ? "bg-blue-gray-50" : ""} text-sm py-1`}>{item?.CompanyName}</ListItem>
                                    </div>
                                )
                            })
                        }
                        
                        </>
                    }
                </List>
            </div>

        )
      }
      
    </div>
  );
};

export default CompanySearch;
