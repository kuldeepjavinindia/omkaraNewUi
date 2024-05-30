import { BiChevronDown } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { CgSearch } from "react-icons/cg"; 
import { Button, Input, Spinner } from "@material-tailwind/react"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  // Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CompanySearch from "../CompanySearch";

const MainHeader = () => {

  // const rr_dispatch = useDispatch();
  const [FirstWL, setFirstWL] = useState(null);


  const {
    wl:{
      loading: wlLoading,
      data: {
        Data: wldata
      },
    }
  } = useSelector( state=> state.WatchList)


  useEffect(() => {
    let firstWL = localStorage.getItem('selectedWL');
        firstWL = JSON.parse(firstWL);
        setFirstWL(firstWL);
  }, [localStorage.getItem('selectedWL')])





  return (
    <>
      <header className="h-menu flex justify-between items-center w-full border-b-[1px] border-gray-300 p-2 sticky top-0 z-30 bg-white">
        <div className="h-menu">
           <ul className="flex items-center gap-2">
              <li className=" font-semibold text-sm">
                SELECTED WATCHLIST
              </li>

              <li>
              <Menu
                dismiss={{
                  itemPress: false,
                }}
              >
                <MenuHandler>
                  <Button  size="sm" variant="outlined" className="flex items-center gap-1 text-theme border-theme rounded" >
                    <BiChevronDown className="w-4"/> 
                    {FirstWL?.WatchListNAme}
                  </Button>
                </MenuHandler>

                <MenuList>
                  {
                    wlLoading && (

                      <Spinner />
                    )
                  }
                  {
                    wlLoading === false && wldata && wldata.length > 0 && wldata.map((item, i)=>{
                      return (
                        <>
                          <MenuItem className="p-0" key={i}>
                            <label
                              htmlFor="item-1"
                              className="flex cursor-pointer items-center gap-2 p-2"
                            >
                              {item?.WatchListNAme}
                            </label>
                          </MenuItem>
                        </>
                      )
                    })
                  }
                  
                  
                  {/* <MenuItem className="p-0">
                    <label
                      htmlFor="item-2"
                      className="flex cursor-pointer items-center gap-2 p-2"
                    >
                      <Checkbox
                        ripple={false}
                        id="item-2"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                      />
                      Company 2
                    </label>
                  </MenuItem>
                  <MenuItem className="p-0">
                    <label
                      htmlFor="item-3"
                      className="flex cursor-pointer items-center gap-2 p-2"
                    >
                      <Checkbox
                        ripple={false}
                        id="item-3"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                      />
                      Company 3
                    </label>
                  </MenuItem> */}
                </MenuList>
              </Menu>
              </li>

              <li>
                <Button size="sm" className="flex items-center gap-1 bg-[#e7e8f9] rounded text-theme shadow-none hover:shadow-none">
                  <AiOutlinePlus />
                  Add Companies
                </Button>           
              </li>
              <li>
                <Button size="sm" className="bg-[#e7e8f9] rounded text-[#fff] text-theme shadow-none hover:shadow-none">Edit</Button>
              </li>
              <li>
                <Button size="sm" className="bg-theme rounded text-[#fff] flex items-center gap-1 shadow-none hover:shadow-none">
                  <AiOutlinePlus />
                  Create New Watchlist
                </Button>
              </li>
           </ul>
        </div>
        <div className="max-w-[400px] xl:max-w-[650px] w-full">
          <CompanySearch 
          inputProps={{ className:"!bg-[#E9EDEF] border-transparent !border-0 focus:!border-[2px]" }}
          iconProps={{ className:"text-[19px]" }}
            
          />
        </div>
      </header>
    </>
  )
}

export default MainHeader
