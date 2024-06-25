import * as React from "react";
import {
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { openCompany } from "../../constants/helper";

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    NewColumns,
    handleCheckbox,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  console.log("NewColumns >>>> ", NewColumns);

  const ChildCell = ({ data, style, p_label }) => {
    return (
      <>
        {data &&
          data.length > 0 &&
          data.map((element, i) => {

            if(element.isVisible){
            return (
              <>
                <TableCell key={i} style={{
                  ...style,
                  minWidth: element?.width
                 }}>
                  <div>
                    <TableSortLabel
                      active={orderBy === element?.accessor}
                      direction={orderBy === element?.accessor ? order : "asc"}
                      onClick={createSortHandler(element?.accessor)}
                      sx={{ 
                        textAlign:'start'
                       }}
                    >
                      {element.label}
                      {orderBy === element?.accessor ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                    {
                    element?.isCheckbox && (
                      <Checkbox size="small" className='border !border-[#fff] !bg-transparent h-4 w-4 rounded checked:border-[#fff] '
                      checked={element?.isCheckbox} onClick={()=>{
                        handleCheckbox(element, 'child', p_label)
                      }} />
                    )
                  }
                  </div>
                </TableCell>
              </>
            );
          }
          })}
      </>
    );
  };

  return (
    <TableHead>
      <TableRow>
        {NewColumns.map((headCell, i) =>{

          if(headCell.columns.filter(item=>item.isVisible == true).length > 0 && headCell.isVisible){

            
let cStyle = { 
  minWidth: "140px",
  maxWidth: headCell.maxWidth,
  padding: '0.5rem',
  fontSize: '12px',
  fontWeight: '500',
  backgroundColor: headCell?.bgColor || '#1E233A',
  color: headCell?.textColor || '#fff',
  position: 'sticky',
  top: 0, 
  zIndex: 2
};

// Apply sticky styles to the first three columns
if (i < 3) {
  cStyle.left = `${i * 140}px`; 
  cStyle.zIndex = 9;
}



          return (
            <TableCell  style = {cStyle} key={i} colSpan={headCell.columns.filter(item=>item.isVisible == true).length} >
              <div>
              <div style={{ 
                textAlign:'center'
               }}>
                {headCell.label}
                {
                    headCell?.isCheckbox && (
                      <Checkbox size="small" className='border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff] checked:border-[#fff] '
                      checked={headCell?.isCheckbox} onClick={()=>{
                        handleCheckbox(headCell, 'main')
                      }} />
                    )
                  }
        </div>

              </div>
            </TableCell>
          )

        }
        }
        )}
      </TableRow>
      <TableRow>
        {NewColumns.map((headCell, i) => {
          if(headCell.isVisible){

          let array = headCell.columns;
          let cStyle = { 
            minWidth: "140px",
            maxWidth: headCell.maxWidth,
            padding: '0.5rem',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: headCell?.bgColor || '#1E233A',
            color: headCell?.textColor || '#fff',
            position: 'sticky',
            top: 0, 
            zIndex: 2, 
          };
          
          if (i < 3) {
            cStyle.left = `${i * 140}px`; 
            cStyle.zIndex = 9;
          }

          return (
            <>
              <ChildCell p_label={headCell.label} style = {cStyle} data={array} key={i} />
            </>
          )

          }
        }
      )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AbsResultMUI(props) {
  const {
    NewColumns,
    setNewColumns,
    TableData,
    FilterData,
    setFilterData,
    TotalData,
    setTotalData,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [ToggleCheckBox, setToggleCheckBox] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };



  
  let rowPerPageArr = [
    // { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
    { label: 500, value: 500 },
    { label: 1000, value: 1000 },
    { label: 2500, value: 2500 },
    { label: 5000, value: 5000 },
    { label: 'All', value: (FilterData && FilterData.length) },
  ];


  const requestSearch = (searchedVal) => {
    const filteredRows = TableData.filter((row) => {
        return Object.keys(row).some((key) => {
          return String(row[key]).toLowerCase().includes(searchedVal.toLowerCase());
        });
    });
    
    if (searchedVal.length < 1) {
      setFilterData(TableData)
    }
    else {
      setFilterData(filteredRows)
    }
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  React.useEffect(() => {
    if (TableData) {
      setFilterData(TableData);
    }
  }, [TableData]);





  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };


  
 
const handleCheckbox = (item, type="", p_label="") => {
  // console.log('item >>> ', item) 
  
  let cols = NewColumns;

  if(type == 'child' && p_label != ""){
    // updatedItem.isVisible
    let fData = NewColumns.find(item=>item.label == p_label)
    let c_findIndex = NewColumns.indexOf(fData);

    let child_findIndex = fData.columns.indexOf(item)
    
    let updatedItem = item;
    updatedItem.isVisible = !item.isVisible;
    fData['columns'][child_findIndex] = updatedItem


    cols[c_findIndex] = fData
    // console.log('fData >>>> ', cols)
  }else{
    let updatedItem = item;
        updatedItem.isVisible = !item.isVisible;
    let findIndex = NewColumns.indexOf(item)
        cols[findIndex] = updatedItem
  }
  
 
  // console.log(cols);
  setNewColumns(cols) 
  setToggleCheckBox(!ToggleCheckBox)
  
}





  
  const BodyChildCell = ({ data, rowData, style }) => {

    return (
      <>
        {data &&
          data.length > 0 &&
          data.map((element, i) => {
            if(element.isVisible){
            let val = rowData[element.accessor];
            
            return (
              <>
                <TableCell key={i} style={{
                  ...style
                 }}>
                  <div>
                    {val}
                  {/* {element.label} */}
                  </div>
                </TableCell>
              </>
            );
          }
          }
        )}
      </>
    );
  };




  return (

    <>


  {/* ========= Start Header Page =========== */}
  <div className="flex justify-between items-center pb-4">
              <div className="flex-grow-2 flex items-center gap-2 w-[60%]">
                <div>
                  <Typography className="text-[11px] lg:text-[12px] font-semibold text-[#000]">
                    SHOWING <span className="text-theme">
                       {/* 1 -500 of {tableRows.length}  */}
                       {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, FilterData && FilterData.length)} of {FilterData && FilterData.length}
                      </span> ENTRIES
                  </Typography>
                </div>
                <div className="flex-grow">
                  <Input
                    type="text"
                    onChange={(e)=> requestSearch(e.target.value)}
                    placeholder="Search Company"
                    className="!border !border-gray-200 !h-8 !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    icon={
                      <CgSearch
                        size={19}
                        className="text-gray-400 top-[-2px] absolute"
                      />
                    }
                  />
                </div>
              </div>

              <div className="flex-grow-0 flex justify-center mx-[14px] mt-[-4px]">

         <TablePagination
          className='table-pagination-top cst-customchange'
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
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
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
                      className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
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
            page >= Math.ceil((FilterData && FilterData.length) / rowsPerPage) - 1
          }
             onClick={handleNextPage}
          >
              <IoIosArrowForward size={16} />
                 </Button>
                 <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                  onClick={() => setPage(totalPages)}
                  >
                    <IoIosArrowForward />
                    <IoIosArrowForward />
                  </Button>
                </div>
              </div>
    </div>
  {/* ========= End Header Page =========== */}


    <Box sx={{ width: "100%", minHeight: '70vh' }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* TableData {FilterData.length} */}
        <TableContainer className='table-wo-border'  sx={{ 
          maxHeight:'calc(100vh - 250px)'
         }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={FilterData && FilterData.length}
              NewColumns={NewColumns}
              handleCheckbox={handleCheckbox}
            />
            <TableBody>
              {FilterData &&
                FilterData.length > 0 &&
                FilterData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  if (index == 0) {
                    console.log("row <><<><> ", row);
                  }
                  let a0 = 0;
                  let rowObj = Object.keys(row);

                  return (
                    
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      // sx={{ cursor: "pointer" }}
                    >

                      {NewColumns.map((headCell, i) =>{

if(headCell.isVisible){
                        let cStyle = { 
                          minWidth: "140px",
                          maxWidth: headCell.maxWidth,
                          padding: '0.5rem',
                          fontSize: '12px',
                          fontWeight: '500',
                          position: 'sticky',
                          top: 0, 
                          zIndex: 2, 
                        };

                        if (i < 3) {
                          cStyle.backgroundColor = '#fff';
                          cStyle.left = `${i * 140}px`; 
                          cStyle.zIndex = 9;
                        }
                        if (i == 2) {
                          cStyle.borderRight = '1px solid #000';
                        }

                          return (
                            <>
                              <BodyChildCell data={headCell.columns} rowData={row} style={cStyle} />
                            </>
                          )
                      }
                      }
                      )}

                      
                      {/* {rowObj.map((item_1, i_i) => {
                        let a0_0 = row[item_1];
                        // let clr = row?.CompanyDetail;
                        let cStyle = {};

                        if (i_i > 3) {
                          return (
                            <TableCell key={i_i} >
                            
                              <div onClick={()=>{
                                if(i_i == 4){
                                    openCompany({
                                      CompanyID: row?.CompanyID
                                    }, "", true)
                                }
                              }} className={`${i_i == 4 ? "cursor-pointer cell_"+row?.CompanyDetail.Color : ""} px-1`} style={cStyle}>
                                     {a0_0}
                                </div>
                            </TableCell>
                          );
                        }
                        
                      })} */}



                    </TableRow>



                  );
                })}
                
            </TableBody>
          </Table>
        </TableContainer>
 
      </Paper>
    </Box>


{/* start Bottom Pagination Button */}
   <div className="mt-2">
      <div className="flex justify-end">
      <div className="flex-grow-0 flex justify-center mx-[14px] ">
         <TablePagination
          className='table-pagination-top cst-customchange'
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
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
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
                      className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
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
            page >= Math.ceil((FilterData && FilterData.length) / rowsPerPage) - 1
          }
             onClick={handleNextPage}
          >
              <IoIosArrowForward size={16} />
                 </Button>
                 <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                  onClick={() => setPage(totalPages)}
                  >
                    <IoIosArrowForward />
                    <IoIosArrowForward />
                  </Button>
    </div>
    
  </div>
      </div>
  
    </div>
{/* End Bottom Pagination Button */}

    </>

  
  );
}
