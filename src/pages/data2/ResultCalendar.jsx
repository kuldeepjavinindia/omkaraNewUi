import {
  Typography,
  Button,
  Input,
  Select,
  Option,
  Checkbox,
  Switch,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import ResultModal from "../../components/CompanyDetail/ModalComment/ResultModal";
import moment from "moment";
import { calendar_Req } from "../../constants/defaultRequest";
import { ResultCalenderApi } from "../../store/slice/Data2Slice";
import { useDispatch, useSelector } from "react-redux";
import CalendarTableComponent from "../../components/data2/MUITable/CalendarTableComponent";

const ResultCalendar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [open, setOpen] = useState(false);
  const rr_dispatch = useDispatch();

  const [FilterData, setFilterData] = useState(null);
  const [TableColumns, setTableColumns] = useState(null);
  const [TableBodyData, setTableBodyData] = useState(null);
  const [assignedData, setAssignedData] = useState([]);
  const [checked, setChecked] = useState(false);

  const [Inputs, setInputs] = useState(calendar_Req);

  const handleAccIn = () => {
    setAccordion(true);
  };

  const handleAccOut = () => {
    setAccordion(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  // const [inputs, setInputs] = useState({"FromDate":Moment().format('MM/DD/YYYY'), "ToDate":Moment().add(1, 'week').format('MM/DD/YYYY')});
  const {
    ResultCalender: { data: rcData, loading: rcLoading },
    AssignEmployee:{
      data: AssignEmployee, 
      loading: AssignEmployeeLoading, 
      loadingOnAdd
  }


  } = useSelector((state) => state.Data2);

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs({
      ...Inputs,
      [name]: value,
    });
    // console.log(name, value);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const callApi = (type="") => {
    let sectorValue = [];
    let industryValue = [];

    let newFilterArray = calendar_Req;
    if(type != ""){
      newFilterArray = {
        UserId: 22,
        FromDate: moment(Inputs?.FromDate).format("MM/DD/YYYY"),
        ToDate: moment(Inputs?.ToDate).format("MM/DD/YYYY"),
        Sector: sectorValue,
        Industry: industryValue,
        Market_Cap: [Inputs?.MarketCapFrom || "", Inputs?.MarketCapTo || ""],
        Portfolio: Inputs?.Portfolio || false,
      };
    }
    // console.log('newFilterArray >>>> ', {newFilterArray, Inputs})
    let topLabels = {
      portfolio: {
        label: "Portfolio",
        value1: Inputs?.Portfolio || "",
        value2: "",
      },
      sectors: {
        label: "Sector",
        value1: Inputs?.Sectors || "",
        value2: "",
      },
      industry: {
        label: "Industry",
        value1: Inputs?.Industry || "",
        value2: "",
      },
      date_range: {
        label: "Date Range",
        value1: Inputs?.FromDate
          ? moment(Inputs?.From_Date).format("MM/DD/YYYY")
          : null,
        value2: Inputs?.ToDate
          ? moment(Inputs?.To_Date).format("MM/DD/YYYY")
          : null,
      },
      Market_Cap: {
        label: "Market Cap",
        value1: Inputs?.From_MCap || "",
        value2: Inputs?.To_MCap || "",
      },
    };

    rr_dispatch(ResultCalenderApi([newFilterArray]));
  };

  const applyFilter = () => {
    callApi();
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (!rcLoading) {
      

      let a1 = 0;
      const tableHead = rcData.Headers;
      var mColArr = [];
      tableHead.map((resHeads) => {

        let hideCheck = false;
        var sticky = null;
        if (a1 !== 1) {
          hideCheck = true;
        }

        Object.keys(resHeads).forEach(key => {

          var label = resHeads[key];
          // let width = 100;
          // if (key == 'CompanyName' || key == 'Sector' || key == 'Industry') {
          //   width = 200;
          // }

          if (key != '$id') {
            var mCol = {
              id: 'CompanyName' + a1,
              label: `${label} (${moment(label).format('dddd')})`,
              dates: label,
              minWidth: 190,
              maxWidth: 190,
              align: 'canter',
              hideCheck: hideCheck,
              sticky: sticky,
            }
            mColArr.push(mCol);
            a1++;
          }
        })
      });

      setTableColumns(mColArr);

      const tableBody = rcData.Data;
      
      var allRowsData1 = [];
      // console.warn(mColArr);

      tableBody && tableBody.length > 0 && tableBody.map((resBody) => {

        var company = {
          companyLength: resBody.Company.length,
          companies: resBody.Company,
        };
        allRowsData1.push(company);
      });


      
      allRowsData1.sort((a, b) => b.companyLength - a.companyLength);
      // console.warn(firstData0000);

      let firstData = allRowsData1 && allRowsData1.length > 0 && allRowsData1[0].companyLength;

      let rowsData = [];
      for (let i0 = 0; i0 < firstData; i0++) {

        let obj1 = {};

        tableBody.map((resBody, i) => {
          var columnName = 'CompanyName' + i;
          var CompanyId = 'CompanyData' + i;
          var columnValue = resBody.Company[i0];
          if (typeof columnValue != 'undefined') {
            columnValue = columnValue.split('__');
            // console.log('columnValue >> '+columnValue[0] + '<< i >> '+i)
            obj1[columnName] = (columnValue[0] || "");
            obj1[CompanyId] = { 'Company_Name': columnValue[0], 'CompanyID': columnValue[1] };
            var assignedVar = false;
            var uData = [];
            if(assignedData.includes(columnValue[1])){
              assignedVar = true;
              uData = AssignEmployee.data.filter((resAssign) => resAssign.company_id == columnValue[1]);
            }
            obj1[CompanyId]['assigned'] = assignedVar;
            obj1[CompanyId]['usersData'] = uData;

          }

          if ((i + 1) == tableBody.length) {
            rowsData.push(obj1);
          }
        });

      }
      var newRowData = [];
      
      rowsData.map((item) => {
        if(TableColumns && TableColumns.length > 0){
          for (let a0 = 0; a0 < TableColumns.length; a0++) {
            // var tableColumn = TableColumns[a0];
              var a00 = 'CompanyData' + a0;

              const sItem = item[a00];
              if(sItem){
                if(sItem?.assigned === true){
                  newRowData.push(item);
                  console.log('newRowData >> ', item)
                  return ;
                  // return item;
                }
              }
          }
        }
        
      });

      if(checked){
        setTableBodyData(newRowData);
      }else{
        setTableBodyData(rowsData);
      }





    }
  }, [rcLoading]);

  return (
    <>
      <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
        <div className="py-7 px-4">
          {/* rounded-md bg-[#fff] py-7 px-7 */}

          <div className="flex  flex-wrap justify-between">
            {/* Start Header Result Calender Left Side*/}
            <div className=" flex gap-2  items-center resultCalenderheader">
              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  Company Search{" "}
                </label>
                <Input
                  type="text"
                  placeholder="Search Company"
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  // onChange={(e)=>filterData(e, 'search')}
                  icon={
                    <CgSearch
                      size={19}
                      className=" text-gray-400 top-[1px] absolute"
                    />
                  }
                />
              </div>

              <div>
                <label className="text-[12px]  text-[#000] font-medium">
                  Sectors{" "}
                </label>
                <Select
                  className="bg-[#fff] border-none "
                  value=""
                  labelProps={{
                    className: "hidden",
                  }}
                >
                  <Option>Option 1</Option>
                </Select>
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  From{" "}
                </label>
                <Input
                  type="date"
                  name="FromDate"
                  defaultValue={Inputs.FromDate}
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>

              <div>
                <label className="text-[12px] text-[#000] font-medium">
                  To{" "}
                </label>
                <Input
                  type="date"
                  name="ToDate"
                  defaultValue={Inputs.ToDate}
                  className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>

              <div className="smallInput">
                <label className="text-[12px] text-[#000] font-medium">
                  Market Cap{" "}
                </label>
                <div className="flex gap-2 w-[50%]">
                  <Input
                    type="text"
                    name="MarketCapFrom"
                    defaultValue={Inputs.MarketCapFrom}
                    className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e) => handleChangeInput(e)}
                    placeholder=">1"
                  />

                  <Input
                    type="text"
                    name="MarketCapTo"
                    defaultValue={Inputs.MarketCapTo}
                    className=" !border !border-[#C7C7C7]  !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(e) => handleChangeInput(e)}
                    placeholder="<100"
                  />
                </div>
              </div>
            </div>
            {/* End Header Result Calender Left Side*/}

            {/* Start Header Result Calender Right Side*/}
            <div>
              <Typography className="text-[13px] text-[#000] font-medium">
                Data Updated 29-05-2024
              </Typography>

              <div className="flex gap-2 items-center ">
                <div>
                  <Checkbox
                    label="Portfolio"
                    checked={Inputs.Portfolio}
                    onChange={(e) => {
                      setInputs({
                        ...Inputs,
                        Portfolio: e.target.checked,
                      });
                    }}
                  />
                </div>

                <div>
                  <label>
                    <Switch
                      color="blue"
                      checked={isToggled}
                      onChange={handleToggle}
                    />
                    <span className="ml-2">
                      {/* {isToggled ? 'On' : 'Off'} */}
                    </span>
                  </label>
                </div>

                <div>
                  <Button
                    variant="text"
                    className="mr-1 bg-theme text-[#fff] py-2 px-3 rounded text-[12px] "
                    onClick={() => applyFilter()}
                  >
                    SUBMIT{" "}
                  </Button>
                </div>

                <div>
                  <Menu>
                    <MenuHandler>
                      <Button
                        size="sm"
                        className=" flex items-center gap-1 bg-[#D9DDF0] text-[#4448F5] text-[12px] shadow-none rounded leading-0"
                      >
                        Export as
                        <BiChevronDown size={18} />
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem>Export JPG</MenuItem>
                      <MenuItem>Export Excel</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
            {/*  End Header Result Calender Right Side*/}
          </div>
          {/* End Result Header  */}

          {/*Start  Table  */}
          <div className="mt-8">
            <CalendarTableComponent
              FilterData={FilterData}
              setFilterData={setFilterData}
              dataFor={rcData}
              loading={rcLoading}
              tableColumns={TableColumns}
              resultData={TableBodyData}
              assignedMembers={checked}
            />

            {/* <table className=" w-full ">
              <thead>
                <tr className="!bg-[#22242F]">
                  <th className="!text-white p-2 text-[13px] font-semibold !bg-[#22242F] !text-left">
                    31-May-2024 (Friday)
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                  <td className="cursor-pointer">
                    <div
                      className="flex justify-between px-2"
                      // onMouseEnter={handleAccIn}
                      // onMouseOut={handleAccOut}
                      // onClick={handleOpen}
                    >
                      <span>Bharat Dynamics Ltd. </span>

                      <div className="flex gap-2 ">
                        <span
                          className={`bg-theme text-[#fff] border border-theme w-5 h-5 text-[12px] flex  justify-center items-center rounded-full  ${
                            accordion ? "visible" : "invisible "
                          } `}
                        >
                          <FaPlus />
                        </span>

                        <span
                          className={` w-5 h-5 text-[12px] flex  justify-center items-center rounded-full bg-[#E8E8F9] text-theme border border-theme`}
                        >
                          <Typography className="text-[12px]">A</Typography>
                        </span>
                      </div>
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table> */}
          </div>
          {/*Start  Table  */}

          <ResultModal open={open} setOpen={setOpen} />

          <div></div>
        </div>
      </div>
      {/* End Card */}
    </>
  );
};

export default ResultCalendar;
