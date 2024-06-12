import React, { useEffect, useState, useRef, useCallback } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {  List, ListItem, Spinner } from "@material-tailwind/react";
import { companyMasterAPI } from '../store/slice/MasterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineCancel } from "react-icons/md";
import { companyMasterReq } from '../constants/defaultRequest';
import lodash from "lodash";


const DEBOUBCE_DELAY = 500;


const CompanySearchSelectbox = () => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const [companyNames, setCompanyNames] = useState([]);
  const [openCompanies, setOpenCompanies] = useState(false);
  const dropdownRef = useRef(null);
  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch();
  const {
    companyMaster: { data: allCmpData, loading: allCmpLoading }
  } = useSelector((state) => state.Masters);


  const callApi = (val) => {
    let params = companyMasterReq;
    params = {
        ...params,
        Search: val
    }

    dispatch(companyMasterAPI(params));
  }

  const handler = useCallback(lodash.debounce(callApi, DEBOUBCE_DELAY), []);



  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    setOpenCompanies(true); // Keep the dropdown open while typing
    handler(value)
  };




  // useEffect(() => {
  //   if (search) {
  //     handler()
  //   } else {
  //     selectCompany();
  //   }
  // }, [dispatch, search]);

  const selectCompany = () => {
    const allCompaniesData = allCmpData && allCmpData.map((item) => ({
      compnayTitle: item.CompanyName,
      compnayName: item.CompanyName,
      companyID: item.CompanyID
    }));

    allCompaniesData.sort((a, b) => a.compnayTitle.localeCompare(b.compnayTitle));
    setOptions(allCompaniesData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem(prev => prev - 1);
    } else if (e.key === "ArrowDown" && selectedItem < filteredOptions.length - 1) {
      setSelectedItem(prev => prev + 1);
    } else if (e.key === "Enter" && selectedItem >= 0) {
      onSelectData(filteredOptions[selectedItem]);
    }
  };

  const onSelectData = (item) => {
    // Avoid adding the same item twice
    if (!companyNames.find(cn => cn.companyID === item.companyID)) {
      setCompanyNames((prev) => [...prev, item]);
    }
    setSearch(""); // Clear the search input after selection
    setOpenCompanies(true); // Keep the dropdown open for further selection
  };

  const removeSelectedItem = (item) => {
    setCompanyNames(companyNames.filter(cn => cn.companyID !== item.companyID));
  };

  useEffect(() => {
    if (companyNames.length === 5) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [companyNames]);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenCompanies(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.compnayTitle.toLowerCase().includes(search.toLowerCase()) &&
    !companyNames.some(cn => cn.companyID === option.companyID) // Exclude already selected options
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-400 rounded-md">
        {companyNames.map((item) => (
          <div
            key={item.companyID}
            className="flex items-center bg-blue-100 rounded px-2 py-1 mr-2 mb-1"
          >
            <span className="text-sm text-blue-800">{item.compnayTitle}</span>
            <MdOutlineCancel
              className="w-4 h-4 ml-1 text-blue-800 cursor-pointer"
              onClick={() => removeSelectedItem(item)}
            />
          </div>
        ))}
        <input
          type="text"
          className="flex-1 focus:outline-none p-2"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          disabled={disable}
          placeholder="Search and select companies"
        />
          {/* <span className="cursor-pointer" >
           <IoIosArrowUp size={15} />
          </span> */}

      </div>
      
      {search !== ""  && (
        <div className="searchResult absolute top-12 bg-white w-full p-2 rounded-lg border-[1px] border-gray-400 border-t-0 z-[1]">
          <List className="p-0 max-h-36 overflow-y-auto">
            {allCmpLoading ? (
              <ListItem disabled size="sm" className="text-sm py-1">
                <Spinner />
              </ListItem>
            ) : (
              <>
                {allCmpData.length === 0 ? (
                  <ListItem disabled size="sm" className="text-sm py-1">Data not found</ListItem>
                ) : (
                  allCmpData.map((item, i) => (
                    <div onClick={() => onSelectData(item)} key={i}>
                      <ListItem
                        size="sm"
                        className={`${selectedItem === i ? "bg-blue-gray-50" : ""} text-sm py-1 cursor-pointer`}
                      >
                        {item?.CompanyName}
                      </ListItem>
                    </div>
                  ))
                )}
              </>
            )}
          </List>
        </div>
      )}
    </div>
  );
};

export default CompanySearchSelectbox;
