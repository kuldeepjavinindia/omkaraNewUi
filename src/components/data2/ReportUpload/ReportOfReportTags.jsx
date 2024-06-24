import {
  Select,
  Option,
  Input,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RR_TagMasterReqApi } from "../../../store/slice/MasterSlice";
import { RR_TagMasterReq } from "../../../constants/defaultRequest";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

const ReportOfReportTags = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [FilterData, setFilterData] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [Tagid, setTagid] = useState([]);

  const options = [
    {
      title: "Others",
      value: "Others",
    },
  ];

  const [Inputs, setInputs] = useState({
    category: "",
    title: "",
  });

  const {
    RR_TagMaster: { data: RRTagMasterData, loading: RRTagMasterLoading },
  } = useSelector((state) => state.Masters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RR_TagMasterReqApi(RR_TagMasterReq));
  }, []);

  useEffect(() => {
    if (!RRTagMasterLoading) {
      let filteredData = RRTagMasterData?.data;
      filteredData = filteredData.filter((item) => item.RR_Tag == "Others");
      setFilterData(filteredData);
      setTableData(filteredData);
    }
  }, [RRTagMasterLoading, RRTagMasterData]);

  console.log(">>>>>>>>>>>>>>>>>>>>", FilterData);

  const submitData = () => {
    let params = {
      ...RR_TagMasterReq,
      TagID: "",
      RR_Tag: "Others",
      Tag_Title: Inputs?.title,
      optionType: 0,
    };

    // console.log(">>>>>>>>>>>>>>>>>>><", params)
    console.log(">>>>>>>>>>>>>>> submit values", Inputs);
    // console.log(Inputs)
    dispatch(RR_TagMasterReqApi(params));
    setIsEditMode(false);

    setInputs({
      Category: "",
      title: "",
    });
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = TableData.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key])
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
      });
    });
    // console.log("filteredRows >>>>>> ", filteredRows);

    if (searchedVal.length < 1) {
      setFilterData(TableData);
    } else {
      setFilterData(filteredRows);
    }
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const columns = [
    { id: "RR_Tag", align: "left", label: "Category", minWidth: 170 },
    { id: "Tag_Title", align: "left", label: "Title", minWidth: 170 },
  ];

  const deleteData = (e, item) => {
    let msg = window.confirm("Are you sure want to delete this tag?");
    if (msg) {
      let params = {
        TagID: item.TagID,
        RR_Tag: "Others",
        Tag_Title: "",
        optionType: 2,
      };
      setPage(0);
      dispatch(RR_TagMasterReqApi(params));
    }
  };

  const editData = (e, item) => {
    // console.log("ID>>>>>>>>>>>>>>>>>>", item.TagID);
    setInputs({
      // Category: item.RR_Tag,
      category: "Others",
      title: item.Tag_Title,
    });
    setTagid(item.TagID);
    setIsEditMode(true);
  };

  const updateData = () => {
    let params = {
      TagID: Tagid,
      RR_Tag: "Others",
      Tag_Title: Inputs.title,
      optionType: 1,
    };
    // console.log("params:::::::>>>>>>>>>", params);
    dispatch(RR_TagMasterReqApi(params));
    setInputs({
      category: "",
      title: "",
    });
    setIsEditMode(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  let rowPerPageArr = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
  
    { label: "All", value: FilterData && FilterData.length },
  ];

  return (
    <>
      <div className="pr-[20%] mt-5">
        <label className="text-[13px] text-[#000] font-semibold">
          CREATE NEW TAG{" "}
        </label>
        <div className="flex gap-4">
          <div className="basis-3/12">
            <Select
              className="border !border-gray-200 bg-[#E9EDEF]"
              value={Inputs.category}
              onChange={(e) =>
                setInputs({
                  ...Inputs,
                  category: e,
                })
              }
              labelProps={{
                className: "hidden",
              }}
            >
              {options.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>

          <div className="basis-6/12">
            <div className="flex gap-4">
              <div className="basis-9/12">
                <Input
                  type="text"
                  placeholder="Enter Title"
                  value={Inputs.title}
                  className="!border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e) =>
                    setInputs({ ...Inputs, title: e.target?.value })
                  }
                />
              </div>
              <div className="basis-3/12">
                {isEditMode ? (
                  <Button
                    className="bg-[#23A356] text-[#fff] text-[13px] font-semibold  h-8 py-0 rounded"
                    onClick={() => updateData()}
                  >
                    UPDATE
                  </Button>
                ) : (
                  <Button
                    className="bg-[#23A356] text-[#fff] text-[13px] font-semibold  h-8 py-0 rounded"
                    onClick={(e) => submitData(e)}
                  >
                    CREATE
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End second box*/}

      <div className="pr-[20%] mt-5 border border-[#DAE9F7] p-5">


     <div className="flex justify-between" >

     <div className="flex  self-end gap-5">
          <div className="  items-center flex gap-5">
            <div className="">
              <Typography className="text-[13px] text-[#000] font-semibold whitespace-nowrap">
                ALL TAGS
              </Typography>
            </div>
            <div className="">
              <Input
                type="text"
                placeholder="Enter Title"
                className=" !w-[400px]  !border !border-gray-200 !h-8 !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                
                icon={
                  <CgSearch
                    size={19}
                    className="text-gray-400 top-[-2px] absolute"
                  />
                }
                onChange={(e) => requestSearch(e.target.value)}

                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
        </div>

        {/* ========= Start Header Page =========== */}
        <div className="flex justify-between items-center">
        

          <div className="flex-grow-0 flex justify-center mx-[14px] mt-[-4px]">
            <TablePagination
              className="table-pagination-top cst-customchange two"
              rowsPerPageOptions={rowPerPageArr}
              component="div"
              count={FilterData && FilterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

          <div className="flex-grow-1 ">
            <div className="flex gap-1">
               <Button
                className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                disabled={page === 0}
                onClick={handlePreviousPage}
              >
                <IoIosArrowBack size={16} />
              </Button>
              <Button
                className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                onClick={() => setPage(0)}
              >
                <IoIosArrowBack size={16} />
                <IoIosArrowBack size={16} />
              </Button>
              <div className="w-[100px]">
                <Input
                  type="number"
                  defaultValue="1"
                  size="md"
                  className="smallInput two border border-[#C7C7C7]  !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={page}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (!isNaN(page) && page >= 1 && page <= totalPages) {
                      setPage(page);
                    }
                  }}
                />
              </div>
              <Button
                className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center ml-2"
                disabled={
                  page >=
                  Math.ceil((FilterData && FilterData.length) / rowsPerPage) - 1
                }
                onClick={handleNextPage}
              >
                <IoIosArrowForward size={16} />
              </Button>
              <Button
                className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                onClick={() => setPage(totalPages)}
              >
                <IoIosArrowForward />
                <IoIosArrowForward />
              </Button>
            </div>
          </div>
        </div>
        {/* ========= End Header Page =========== */}

     </div>

        

        <div className="mt-4">
          {RRTagMasterLoading ? (
            <Spinner className="h-10 w-10" />
          ) : (
            <table className="w-[60%] border-collapse">
              <thead>
                <tr className="">
                  <th className="text-[13px] text-[#000] font-semibold text-left px-2">
                    CATEGORY
                  </th>
                  <th className="text-[13px] text-[#000] font-semibold text-left px-2">
                    TITLE
                  </th>
                  <th className="text-[13px] text-[#000] font-semibold text-right px-2">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {FilterData &&
                  FilterData.length > 0 &&
                  stableSort(FilterData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <tr
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                          className='bg-[#F8F8F8] h-8 '
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <td className="text-[13px] text-[#323232] font-semibold text-left px-2 border border-[#CACACA]"  key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </td>
                            );
                          })}
                          <td align={"right"} className="text-[13px] text-[#323232] font-semibold text-left px-2 border border-[#CACACA] text-right">
                            <IconButton>
                              <BiEdit
                                fill="#2E7A80"
                                size={20}
                                onClick={(e) => editData(e, row)}
                              />
                            </IconButton>

                            <IconButton>
                              <MdOutlineDelete
                                fill="#DD2025"
                                size={20}
                                onClick={(e) => deleteData(e, row)}
                              />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* End second box*/}







    </>
  );
};

export default ReportOfReportTags;
