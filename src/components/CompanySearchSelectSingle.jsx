import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { List, ListItem, Spinner } from "@material-tailwind/react";
import { allCompanyMasterAPI } from '../store/slice/MasterSlice';
import { useSelector, useDispatch } from 'react-redux';

const CompanySearchSelectSingle = ({ onSelectCompanyID }) => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openCompanies, setOpenCompanies] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const {
    allCompanyMaster: { data: allCmpData, loading: allCmpLoading }
  } = useSelector((state) => state.Masters);

  useEffect(() => {
    if (!allCmpData.length) {
      dispatch(allCompanyMasterAPI());
    } else {
      selectCompany();
    }
  }, [dispatch, allCmpData]);

  const selectCompany = () => {
    const allCompaniesData = allCmpData.map((item) => ({
      compnayTitle: item.CompanyName,
      compnayName: item.CompanyName,
      companyID: item.CompanyID
    }));

    allCompaniesData.sort((a, b) => a.compnayTitle.localeCompare(b.compnayTitle));
    setOptions(allCompaniesData);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setOpenCompanies(true); // Open the dropdown when typing
    setSelectedCompany(null);
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
    setSelectedCompany(item); // Set the selected company
    setSearch(item.compnayTitle); // Update input with selected company's name
    onSelectCompanyID(item.companyID); // Propagate the selected company's ID

    setOpenCompanies(false); // Close the dropdown after selection
  };

  const handleClick = () => {
    setOpenCompanies(prevState => !prevState);
  };

  const handleOutsideClick = (e) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(e.target) &&
      inputRef.current && 
      !inputRef.current.contains(e.target)
    ) {
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
    option.compnayTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center p-1 border border-gray-400 rounded-md">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 focus:outline-none p-2"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpenCompanies(true)} // Open the dropdown on focus
          placeholder="Search and select a company"
        />
        <span onClick={handleClick} className="cursor-pointer">
          {openCompanies ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
        </span>
      </div>

      {/* Only display the dropdown list if there are filtered options or the search term is not empty */}
      {openCompanies && (filteredOptions.length > 0 || search !== "") && (
        <div className="searchResult absolute top-12 bg-white w-full p-2 rounded-lg border-[1px] border-gray-400 border-t-0 z-[1]">
          <List className="p-0 max-h-36 overflow-y-auto">
            {allCmpLoading ? (
              <ListItem disabled size="sm" className="text-sm py-1">
                <Spinner />
              </ListItem>
            ) : (
              <>
                {filteredOptions.length === 0 ? (
                  <ListItem disabled size="sm" className="text-sm py-1">Data not found</ListItem>
                ) : (
                  filteredOptions.map((item, i) => (
                    <div onClick={() => onSelectData(item)} key={i}>
                      <ListItem
                        size="sm"
                        className={`${selectedItem === i ? "bg-blue-gray-50" : ""} text-sm py-1 cursor-pointer`}
                      >
                        {item?.compnayTitle}
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

export default CompanySearchSelectSingle;
