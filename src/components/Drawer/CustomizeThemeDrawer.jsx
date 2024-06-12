import { AiOutlineClose } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { GlobalContext } from "../../context/GlobalContext";
import { CgColorPicker } from "react-icons/cg";
import { chartColor, themeColor } from "../../store/slice/ThemeColorSlice";

const CustomizeThemeDrawer = () => {
  // const [open, setOpen] = useState(false);

  const { ThemeDrawer, setThemeDrawer } = useContext(GlobalContext);
  const rr_dispatch = useDispatch();

//   const openDrawer = () => setThemeDrawer(true);
  const closeDrawer = () => setThemeDrawer(false);

  const handleChartColorInput = (value, type) => {
    // dispatch({ type: type, payload: value });
    // themeColor
    // chartColor
    
    if (type === "themeColor") {
        rr_dispatch(
            themeColor(value)
        );
      document.documentElement.style.setProperty("--theme-color", value);
    }else
    if (type === "chartColor") {
        rr_dispatch(
            chartColor(value)
        );
    //   document.documentElement.style.setProperty("--primary-color", value);
    }

  };


  const DefaultThemeColors = [
    {
      id: 1,
      name: "",
      color: "#67b7dc",
    },
    {
      id: 2,
      name: "",
      color: "#6794dc",
    },
    {
      id: 3,
      name: "",
      color: "#6771dc",
    },
    {
      id: 4,
      name: "",
      color: "#8067dc",
    },
    {
      id: 5,
      name: "",
      color: "#a367dc",
    },
    {
      id: 6,
      name: "",
      color: "#dc6788",
    },
    {
      id: 7,
      name: "",
      color: "#da6866",
    },
    {
      id: 8,
      name: "",
      color: "#da8b66",
    },
  ];
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const ThemeColorData = useSelector((state) => state.ThemeColor);

  useEffect(() => {
    // console.log('ThemeColorData >>> ', ThemeColorData)
  }, [ThemeColorData]);

  return (
    <>
    
      <Drawer
        open={ThemeDrawer}
        onClose={closeDrawer}
        className="p-4 overflow-y-auto"
        size={350}
        placement="right"
      >
        <div className="mb-6 flex items-center justify-between border-b border-gray-500">
          <Typography variant="h5" color="blue-gray">
            Choose Theme Color
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <AiOutlineClose />
          </IconButton>
        </div>
        <div className="b-2 ">
          <div style={{ marginBottom: "1rem" }}>
            <Typography sx={{}} variant="h6">
              Theme Color
            </Typography>
          </div>
          {/* {JSON.stringify(DefaultThemeColors)} */}
          <div>
            <div className="color-container flex gap-4 flex-wrap justify-between">
              {DefaultThemeColors.map((item, i) => {
                return (
                  <div
                  className=" w-14 h-14 rounded-full shadow-md border-2 cursor-pointer"
                    key={i}
                    onClick={() =>
                      handleChartColorInput(item?.color, "themeColor")
                    }
                    style={{
                      backgroundColor: item?.color,
                    }}
                  ></div>
                );
              })}
              <div className="w-14 h-14  rounded-full  shadow-md border-2 flex  items-center justify-center  relative cursor-pointer"  onClick={()=>{
                ref1.current.click()
              }}>
                <CgColorPicker size={24} />
                <input
                 className=" opacity-0 absolute"
                  ref={ref1}
                  type="color"
                  onChange={(e) =>
                    handleChartColorInput(e.target.value, "themeColor")
                  }
                  value={ThemeColorData?.themeColor}
                />
              </div>
            </div>
          </div>

          {/* CHART */}
            <div className=" border-b border-gray-500 my-4"></div>
          <div style={{ marginBottom: '1rem' }}>
            <Typography sx={{  }} variant="h6">Chart Color</Typography>
          </div>
          <div>
            <div className="color-container flex gap-4 flex-wrap justify-between">
              {
                DefaultThemeColors.map((item, i)=>{
                  return (
                    <div 
                        className=" w-14 h-14 rounded-full shadow-md border-2 cursor-pointer"
                        key={i}
                        onClick={() => handleChartColorInput(item?.color, "chartColor")} style={{ 
                      backgroundColor:item?.color
                     }}></div>
                  )
                })
              }
              <div className="w-14 h-14  rounded-full  shadow-md border-2 flex  items-center justify-center  relative cursor-pointer" onClick={()=>{
                ref2.current.click()
              }}><CgColorPicker size={24} />
                <input
                 className=" opacity-0 absolute"
                  ref={ref2}
                  type="color"
                  onChange={(e) => handleChartColorInput(e.target.value, "chartColor")}
                  value={ThemeColorData?.chartColor}
                />
              </div>
                
            </div>
          </div>


        </div>
      </Drawer>
    </>
  );
};

export default CustomizeThemeDrawer;
