import {
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Checkbox,
  Radio,
} from "@material-tailwind/react";
import {
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  allCompanyMasterAPI,
  industryMasterAPI,
  sectorMasterAPI,
} from "../../../store/slice/MasterSlice";
import {
  deliveryDataFilters,
  industryMasterFun,
  priceActionFilters,
  selectCompany,
  selectSectors,
} from "../../../constants/helper";
import { useSelector, useDispatch } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { DeliveryVolumeApi } from "../../../store/slice/Data2Slice";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const animatedComponents = makeAnimated();

const FilterSidebarDeliveryData = () => {
  const {
    sectorMaster: { loading: sectorMasterLoading, data: sectorMasterData },
    industryMaster: {
      loading: industryMasterLoading,
      data: industryMasterData,
    },
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
  } = useSelector((state) => state.Masters);

  const [Inputs, setInputs] = useState({});
  const [SectorMasterArr, setSectorMasterArr] = useState([]);
  const [IndustryMasterArr, setIndustryMasterArr] = useState([]);
  const [CompanyMasterArr, setCompanyMasterArr] = useState([]);
  const [Sectors, setSectors] = useState([]);
  const [Industry, setIndustry] = useState([]);
  const [Company, setCompany] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const rr_dispatch = useDispatch();

  const [ActiveAccordion, setActiveAccordion] = useState({
    accordion_1: true,
    accordion_2: false,
    accordion_3: false,
    accordion_4: false,
  });



  const handleOpen = (value) => {
    let key = `accordion_${value}`;
    setActiveAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  

  const handleChangeChecked = (event) => {
    let val = event.target.checked;
    let name = event.target.name;
    let prev = Inputs;

    setInputs((prev) => ({
      ...prev,
      [name]: val,
    }));

    // console.log(name, val);
  };

  const handleChangeInput = (e) => {
    const { name, value, checked } = e.target;
    let prev = Inputs;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (checked) {
      setSelectedValue(value);
    }
  };


  useEffect(() => {
    rr_dispatch(sectorMasterAPI());
    rr_dispatch(industryMasterAPI());
    rr_dispatch(allCompanyMasterAPI());
    rr_dispatch(DeliveryVolumeApi(deliveryDataFilters()));
  }, []);
  
  useEffect(() => {
    if (!sectorMasterLoading) {
      selectSectors(sectorMasterData, setSectorMasterArr);
    }
  }, [sectorMasterLoading]);

  useEffect(() => {
    if (!industryMasterLoading) {
      industryMasterFun(industryMasterData, setIndustryMasterArr);
    }
  }, [industryMasterLoading]);

  useEffect(() => {
    if (!allCompanyLoading) {
      selectCompany(allCompanyData, setCompanyMasterArr);
    }
  }, [allCompanyLoading]);










  

  return (
    <>
      <div className="filterSidebar  rounded py-2 px-2 bg-[#E9EDEF]  overflow-y-scroll relative screen-height">
        <div className="flex items-center justify-between pl-2 sticky top-[-9px] z-10  bg-[#E9EDEF]">
          <Typography className="text-[15px] text-[#000] font-semibold">
            Filter price
          </Typography>
          <div>
            <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none">
              APPLY
            </Button>
            <Button className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 px-2 rounded shadow-none">
              RESET{" "}
            </Button>
          </div>
        </div>
        <div className="">
          {/* Start Card Form */}
          <Accordion
            className="my-2 shadow-none bg-white rounded-md"
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<BiChevronDown size={30} />}
              aria-controls="panel1-content"
              id="panel1-header"
              // sx={{
              //   fontSize:'10px'
              //  }}
              className=" text-[15px] font-semibold"
            >
              Classification
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="grid grid-cols-1">
                  <label className="text-[12px] text-[#000] font-medium ">
                    Sectors ({SectorMasterArr.length})
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={SectorMasterArr}
                    values={Sectors}
                    multiple
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Sector"]: val1 });
                      setSectors(newInputValue);
                    }}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Select"
                        size="small"
                        className=""
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <label className="text-[12px] text-[#000] font-medium ">
                    Industry ({IndustryMasterArr.length})
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={IndustryMasterArr}
                    values={Industry}
                    multiple
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Industry"]: val1 });
                      setIndustry(newInputValue);
                      // console.log('Company >> ',company)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          allCompanyLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <label className="text-[12px] text-[#000] font-medium ">
                    Company ({CompanyMasterArr.length})
                  </label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={CompanyMasterArr}
                    values={Company}
                    multiple
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer "
                      >
                        {option.title}
                      </li>
                    )}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      setInputs({ ...Inputs, ["Company"]: val1 });
                      setCompany(newInputValue);
                      // console.log('Company >> ',company)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={
                          allCompanyLoading ? "Loading..." : "Select"
                        }
                        size="small"
                        className=""
                      />
                    )}
                  />
                </div>

                <div className=" flex items-center mt-2">
                  <div className="ml-[-11px]">
                    <Radio
                      name="type"
                      value="portfolio"
                      label="Portfolio"
                      className="w-[18px] h-[18px] custom-radio left-custome checked:border-[#4448F5]"
                      onChange={handleChangeInput}
                      checked={selectedValue === "portfolio"}
                    />

                    <Radio
                      name="type"
                      value="F_O"
                      label="F&O"
                      className=" custom-radio  checked:border-[#4448F5]"
                      onChange={handleChangeInput}
                      checked={selectedValue === "F_O"}
                    />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_2}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={2} open={ActiveAccordion.accordion_2} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="flex border-none py-0 pt-0 "
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Daily Moving Average
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="ml-[0]">
                <Checkbox
                  label="50 DMA"
                  name="50DMA"
                  className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
                  onChange={handleChangeChecked}
                />
                <Checkbox
                  label="200 DMA"
                  name="200DMA"
                  className="w-[18px] h-[18px] custom-checkbox checked:border-[#4448F5] checked:bg-[#4448F5] rounded"
                  onChange={handleChangeChecked}
                />
              </div>
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_3}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={3} open={ActiveAccordion.accordion_3} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Time Interval
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="flex ml-[-11px]">
                <div className="flex flex-col gap-2">
                  <Radio
                    name="type"
                    label="Weekly"
                    className=" custom-radio  checked:border-[#4448F5]"
                  />
                  <Radio
                    name="type"
                    label="Monthly"
                    className=" custom-radio  checked:border-[#4448F5]"
                  />
                  <Radio
                    name="type"
                    label="Half Yearly"
                    className=" custom-radio  checked:border-[#4448F5]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Radio
                    name="type"
                    label="15 Days"
                    className=" custom-radio  checked:border-[#4448F5]"
                  />
                  <Radio
                    name="type"
                    label="Quarterly"
                    className=" custom-radio  checked:border-[#4448F5]"
                  />
                  <Radio
                    name="type"
                    label="Yearly"
                    className=" custom-radio  checked:border-[#4448F5]"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}

          {/* Start Card Form */}
          <Accordion
            open={ActiveAccordion.accordion_4}
            className="rounded bg-[#fff] px-2 py-3 mt-2"
            icon={<Icon id={4} open={ActiveAccordion.accordion_3} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="flex border-none py-0 pt-0"
            >
              <Typography className="text-[15px] text-[#000] font-semibold w-[90%]">
                Deliverable Volume
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <label className="text-[12px] text-[#000] font-medium">
                Market Cap{" "}
              </label>
              <div className="flex gap-2">
                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="marketcap100"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    // onChange={handleChangeInput}
                    placeholder=">100"
                  />
                </div>

                <div className="min-w[48%] w-[48%]">
                  <Input
                    type="text"
                    name="marketcap5000"
                    className="  !w-[48%] !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    // onChange={handleChangeInput}
                    placeholder="<5000"
                  />
                </div>
              </div>

              <label className="text-[12px] text-[#000] font-medium">
                LTP vs 200DMA (%){" "}
              </label>
              <Input
                type="text"
                name="ltp"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                // onChange={handleChangeInput}
                placeholder="2"
              />

              <label className="text-[12px] text-[#000] font-medium">
                Yesterday Deliverable Volume ('000)
              </label>
              <Input
                type="text"
                name="TTM"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                // onChange={handleChangeInput}
                placeholder=">100"
              />

              <label className="text-[12px] text-[#000] font-medium">
                Deliverable Times (x)
              </label>
              <Input
                type="text"
                name="rice"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                // onChange={handleChangeInput}
                placeholder=">0.5"
              />

              <label className="text-[12px] text-[#000] font-medium">
                Deliverable Value(Cr.)
              </label>
              <Input
                type="text"
                name="TTM Sale"
                className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{
                  className: "hidden",
                }}
                // onChange={handleChangeInput}
                placeholder=">100"
              />
            </AccordionBody>
          </Accordion>
          {/* End Card Form */}
        </div>
      </div>
      {/* End Filter SideBar */}
    </>
  );
};

export default FilterSidebarDeliveryData;
