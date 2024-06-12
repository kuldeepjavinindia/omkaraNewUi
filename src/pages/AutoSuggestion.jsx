import  { useState, useCallback } from "react";
import axios from "axios";
import lodash from "lodash";



const DEBOUBCE_DELAY = 500;
const ITEMS_API_URL = "https://vasudeep.com:8084/https://omkaradata.com/api/SymbolMaster_New";

const AutoSuggestion = () => {
  const [userInput, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnInputChange = (userInput) => {
      setIsLoading(true);

      // console.log(`${ITEMS_API_URL}?q=${userInput}`)
    let params = {"Search":userInput,"Type":"","sector_id":[],"industry_id":[],"company_id":[]}
      axios
        .post(`${ITEMS_API_URL}`, params)
        .then((response) => {
          setResult(response.data);
          setError("");
          setIsLoading(false);
          console.log('response.data', response.data);
        })
        .catch(() => {
          setError("An error occured. Please try again.");
          setIsLoading(false);
        });
  };

  const handler = useCallback(lodash.debounce(handleOnInputChange, DEBOUBCE_DELAY), []);

  const onChange = (event) => {
    setInput(event.target.value);
    handler(userInput);
  };

  const onItemSelection = (event) => {
    setInput(event.target.innerText);
    setResult([]);
  };

  return (
    <div className="wrapper">
      AutoSuggestion
      <div className="control">
        <input
          type="text"
          className="input border"
          onChange={onChange}
          value={userInput}
        />
      </div>
      {error && <p>{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      <div className="list">
        {result.map((item, index) => (
          <div
            className="list-item"
            key={index}
            id={`list-item-${index}`}
            onClick={onItemSelection}
          >
            {item.CompanyName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoSuggestion;
