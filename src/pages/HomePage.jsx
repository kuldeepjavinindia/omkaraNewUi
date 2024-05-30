import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import CompanySearch from "../components/CompanySearch";

// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment, incrementByAmount } from "../store/slice/counterSlice";

const SuggestedSearches = [
  {
    label: "Tata Technologies",
  },
  {
    label: "Tata Coffee LTD.",
  },
  {
    label: "Nestley Pvt LTD",
  },
  {
    label: "Zomato India",
  },
  
];   
const HomePage = () => {
  useEffect(() => {}, []);

  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();



  return (
    <>
    
      <div className="home-section place-content-center pt-2 ">
        
        <div className=" flex justify-center items-center flex-col  rounded-md ">

        {/* <div>
            <div>
                <button onClick={() => dispatch(decrement())}>-</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>
            <div>
                <button onClick={() => dispatch(incrementByAmount(5))}>
                    Increment by 5
                </button>
            </div>
        </div> */}


          <img src={import.meta.env.VITE_BASE_URL + "/images/logo.png"} className="w-full max-w-[258px] xl:max-w-[328px]  mb-8 xl:mb-20 mt-0 xl:mt-[-6rem]" />

          <div className=" w-full max-w-[50%] xl:max-w-[45%] ">
            <Typography className="text-center font-semibold text-[30px] xl:text-[40px] mb-4 xl:mb-8 uppercase text-[#585D67]">
              LET’S LEARN
            </Typography>
            {/* <div>
              <Input label="Search Company " className="bg-white border-transparent !border-0 focus:!border-[2px]" size="md" icon={<CgSearch size={19}  className=" text-gray-400"/>} />
            </div> */}
            <CompanySearch 
              inputProps={{ 
               className: "bg-white border-transparent !border-0 focus:!border-[2px]",
               size:"md"
              }}
              iconProps= {{ 
                size:19,
                className: "text-gray-400"
               }}
            />
          </div>

          <div className="mx-auto place-content-center mt-8 xl:mt-16">
            <Typography className="text-center my-2 text-sm uppercase font-semibold" >
              Suggested searches
            </Typography>
            <div className="home-chips mt-4 xl:mt-6">
              <ul className="flex max-w-[600px] flex-wrap gap-2 items-center justify-center mx-auto">
                {SuggestedSearches.map((item, i) => {
                  return (
                    <li key={i}>
                      <Button size="sm" className="bg-white border-[1px] border-theme text-theme">
                        {item?.label}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
