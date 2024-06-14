import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import lodash from "lodash";
import { List, ListItem, Spinner } from "@material-tailwind/react";
import { MdOutlineCancel } from "react-icons/md";

const CompanySearchSelectBox = (props) => {
  const { Disabled, setDisabled, Companies, setCompanies, multiple } = props;

  const DEBOUBCE_DELAY = 500;
  const ITEMS_API_URL =
    "https://vasudeep.com:8084/https://omkaradata.com/api/SymbolMaster_New";

  const [userInput, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  // const [Companies, setCompanies] = useState([]);

  const handleOnInputChange = (userInput) => {
    setIsLoading(true);
    let params = {
      Search: userInput,
      Type: "",
      sector_id: [],
      industry_id: [],
      company_id: [],
    };
    axios
      .post(`${ITEMS_API_URL}`, params)
      .then((response) => {
        setResult(response.data);
        setError("");
        setIsLoading(false);
        console.log("response.data", response.data);
      })
      .catch(() => {
        setError("An error occured. Please try again.");
        setIsLoading(false);
      });
  };

  const handler = useCallback(
    lodash.debounce(handleOnInputChange, DEBOUBCE_DELAY),
    []
  );

  const onChange = (event) => {
    setInput(event.target.value);
    if (userInput) {
      handler(userInput);
    }
  };

  const onItemSelection = (event) => {
    setInput(event.target.innerText);
    setResult([]);
  };

  const removeSelectedItem = (item) => {
    setCompanies(Companies.filter((cn) => cn.CompanyID !== item.CompanyID));
  };

  const onSelectData = (item) => {
    let checkData = Companies.find((cn) => cn.CompanyID === item.CompanyID);
    console.log({ item, Companies });
    if (!Companies.find((cn) => cn.CompanyID === item.CompanyID)) {
      setCompanies((prev) => [...prev, item]);
    }
    setInput("");
    setResult([]);
  };

  useEffect(() => {}, [Disabled]);

  return (
    <>
      <div className=" flex wrapper flex-wrap">

        
      <div className="flex items-center">
          {Companies.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-blue-100 rounded px-2 py-1 mr-2 mb-1 w-fit"
            >
              <span className="text-sm text-blue-800">{item.CompanyName}</span>
              <MdOutlineCancel
                className="w-4 h-4 ml-1 text-blue-800 cursor-pointer"
                onClick={() => removeSelectedItem(item)}
              />
            </div>
          ))}
        </div>

        <div className="  relative w-full">

        <div className="control grow  ">
          <input
            type="text"
            className="flex-1 focus:outline-none p-2 border rounded w-full"
            value={userInput}
            onChange={onChange}
            //  onKeyDown={handleKeyDown}
            disabled={Disabled}
            placeholder="Search and select companies"
          />
        </div>
          
        {userInput && (
          <>
            <div className="">
              <div className="searchResult absolute top-12 bg-white w-full p-2 rounded-lg border-[1px] border-gray-400 border-t-0 z-[2]">
                <List className="p-0 max-h-36 overflow-y-auto">
                  {isLoading ? (
                    <ListItem disabled size="sm" className="text-sm py-1">
                      Loading...
                    </ListItem>
                  ) : (
                    <>
                      <>
                        {result.length === 0 && !isLoading ? (
                          <>
                            <ListItem
                              disabled
                              size="sm"
                              className="text-sm py-1"
                            >
                              Data not found
                            </ListItem>
                          </>
                        ) : (
                          result.map((item, i) => (
                            <div onClick={() => onSelectData(item)} key={i}>
                              <ListItem
                                size="sm"
                                className={`${
                                  selectedItem === i ? "bg-blue-gray-50" : ""
                                } text-sm py-1 cursor-pointer`}
                              >
                                {item?.CompanyName}
                              </ListItem>
                            </div>
                          ))
                        )}
                      </>
                    </>
                  )}
                </List>
              </div>
            </div>
          </>
        )}


        
        </div>

        {/* {error && <p>{error}</p>} */}


      </div>
    </>
  );
};

export default CompanySearchSelectBox;
