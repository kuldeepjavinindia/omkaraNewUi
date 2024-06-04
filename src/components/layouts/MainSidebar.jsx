import { FiLogOut } from "react-icons/fi"; 
import { BsFillKeyFill } from "react-icons/bs"; 
import { AiFillSetting } from "react-icons/ai"; 
import { HiUserCircle } from "react-icons/hi"; 
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";

export function ProfileMenu() {

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const authState = useAuthState();



    const handleLogout = () => {
        localStorage.clear()
        dispatch({ type: 'LOGOUT' });
        navigate('/login')
    };

  return (
    <Menu placement="right">
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer"
          src={import.meta.env.VITE_BASE_URL + "/images/defaultProfile.svg"}
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <HiUserCircle size={18} />
          <Typography variant="small" className="font-medium capitalize">
            Welcome {authState?.user?.UserNAme}
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <AiFillSetting size={18} />

          <Typography variant="small" className="font-medium">
            Edit Profile
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
         <BsFillKeyFill size={18} />

          <Typography variant="small" className="font-medium">
            Reset Password
          </Typography>
        </MenuItem>
        
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="">
          <div onClick={()=>handleLogout()} className="flex items-center gap-1">
          <FiLogOut />
          <Typography variant="small" className="font-medium">
            Sign Out
          </Typography>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function SubMenuItem({ data }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover placement="right">
      <MenuHandler>
        
        <Typography as="li" variant="small" className="m-item">
          <Link to={data?.link} className="text-white  flex justify-center flex-col items-center hover:bg-[#585D67] focus:bg-[#585D67] active:bg-[#585D67] p-2 rounded-md">
            <img src={data?.imgPath} />
            {/* {item.name} */}
            {data?.name} {"  "}
          </Link>
        </Typography>
      </MenuHandler>
      <MenuList className="bg-theme-c3 p-0 ml-2">
        {data?.childItem &&
          data?.childItem.map((item, i) => {
            return (
              <>
                <MenuItem key={i} className="flex items-center gap-2 active:bg-inherit hover:bg-[#585D67] hover hover:focusg-[#585D67]:activeg-[#585D67]">
                  <Link to={item?.link} className=" font-normal text-white">
                    <Typography variant="small">
                      {item?.name}
                    </Typography>
                  </Link>
                </MenuItem>
                {
                  (i !== (data?.childItem.length-1)) &&
                  <hr className="my-0" />
                }
              </>
            );
          })}
      </MenuList>
    </Menu>
  );
}


// HOME
// BSE NEWS
// REPORTS BANK
// RESULTS > QUATERLY RESULTS > CALENDAR (REMOVE OLD ONE)
// DAILY DATA > ADD 4 TABS WHICH ARE THERE
// VALUATIONS
// FII SECTOR FLOWS
// RESOURCES


const menuItem = [
  {
    id: 1,
    name: "Home",
    link: "/",
    imgPath: import.meta.env.VITE_BASE_URL + "/images/icons/home.svg",
    childItem: [],
  },
  {
    id: 2,
    name: "Quarterly Result",
    link: "#0",
    imgPath: import.meta.env.VITE_BASE_URL + "/images/icons/quarterly.svg",
    childItem: [
      {
        id: 1,
        // name: "Result Data",
        name: "Quarterly Results",
        link: "#0",
      },
      {
        id: 2,
        name: "Result Calendar (New)",
        link: "#0",
      },
      // {
      //   id: 3,
      //   name: "Result Calendar (Old)",
      //   link: "#0",
      // },
    ],
  },
  {
    id: 3,
    name: "BSE News",
    link: "/bse-news",
    imgPath: import.meta.env.VITE_BASE_URL + "/images/icons/bse.svg",
    childItem: [],
  },
  {
    id: 4,
    name: "Report Bank",
    link: "#0",
    imgPath: import.meta.env.VITE_BASE_URL + "/images/icons/reports.svg",
    childItem: [],
  },
  
  {
    id: 5,
    name: "Analysis",
    link: "#0",
    imgPath: import.meta.env.VITE_BASE_URL + "/images/icons/dailydata.svg",
    childItem: [
      {
        id: 1,
        name: "Delivery Data",
        link: "/delivery-data",
      },
      {
        id: 2,
        name: "Price Action",
        link: "#0",
      },
      {
        id: 3,
        name: "Insider Trading",
        link: "#0",
      },
      {
        id: 4,
        name: "Bulk-Block Deal",
        link: "#0",
      },
      {
        id: 6,
        name: "Valuations",
        link: "#0",
      },

      {
        id: 7,
        name: "FII Sectors",
        link: "#0",
      },
    ],
  },
 
  
  {
    id: 8,
    name: "Resources",
    link: "#0",
    imgPath: import.meta.env.VITE_BASE_URL + "/images/icons/resources.svg",
    childItem: [],
  },
];

const MainSidebar = () => {
  const navList = (
    <ul className="flex flex-col gap-0">
      {menuItem.map((item, i) => {
        if (item?.childItem && item?.childItem.length > 0) {
          return (
            <Fragment key={i}>
              <SubMenuItem data={item} />
            </Fragment>
          );
        } else {
          return (
            <Fragment key={i}>
              <Typography
                as="li"
                variant="small"
                color="white"
                className="m-item"
              >
                <Link to={item.link} className="text-white flex justify-center flex-col items-center  hover:bg-[#585D67] focus:bg-[#585D67] active:bg-[#585D67] p-2 rounded-md">
                <img src={item.imgPath} />
                  {item.name}
                </Link>
              </Typography>
            </Fragment>
          );
        }
      })}
    </ul>
  );

  return (
    <>
      <aside className="main-sidebar flex justify-between flex-col p-2 rounded-md items-center">
        <div className="w-full">
          <Link to={'/'}>
            <img src={import.meta.env.VITE_BASE_URL + "/images/small-logo.svg"} alt="" className="mb-4 mx-auto h-10" />
          </Link>
          {navList}
        </div>
        <div>
          <ProfileMenu />
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;
