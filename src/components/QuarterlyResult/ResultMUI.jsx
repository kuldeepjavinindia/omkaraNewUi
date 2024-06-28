import { AiOutlineInfoCircle } from "react-icons/ai"; 
import * as React from 'react';
import {
  Typography,
  Input,
  Button
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { visuallyHidden } from '@mui/utils';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import { ResultDocumentApi } from "../../store/slice/SingleCompnaySlice";
import { useDispatch } from "react-redux";
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

// const row_s = [
//   createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];

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
  return order === 'desc'
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, NewColumns, handleCheckbox } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  let a0_new = 0
  return (
    <TableHead>
      
      
      <TableRow className="!bg-[#1E233A]">
        
      {NewColumns.map((headCell, k) => {
        if(k == 0){
          a0_new = 0
        }
  if(headCell?.isVisible){
  let width = headCell.width;

  let cStyle = { 
    minWidth: width,
    maxWidth: width,
    
    fontSize: '11px',
    fontWeight: '500',
    backgroundColor: headCell?.bgColor || '#1E233A',
    color: headCell?.textColor || '#fff',
    position: 'sticky',
    top: 0, 
    zIndex: 2, 
  };
  
  // Apply sticky styles to the first three columns
  if (k < 3) {
    cStyle.left = `${a0_new}px`; 
    cStyle.zIndex = 9;
    a0_new = a0_new + width
  }
  
    return (
      <TableCell
        key={headCell?.id}
        align={headCell?.numeric ? 'right' : 'left'}
        // padding={headCell?.disablePadding ? 'none' : 'normal'}
        sortDirection={orderBy === headCell?.id ? order : false}
        style={cStyle}
      >
        <div>
          
        {
            headCell?.isCheckbox && (
              <Checkbox
              size="small"
              sx={{ 
                padding: 0
               }}
              checked={headCell?.isCheckbox} onClick={()=>{
                handleCheckbox(headCell)
              }} />
            )
          }

          <TableSortLabel
            active={orderBy === headCell?.id}
            direction={orderBy === headCell?.id ? order : 'asc'}
            onClick={createSortHandler(headCell?.id)}
            className="TableSortLabel"
          >
            <span dangerouslySetInnerHTML={{ __html: headCell?.label }} />
  
            {orderBy === headCell?.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
  
  
  
        </div>
      </TableCell>
    );
}
})}


      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



export default function ResultMUI({
    NewColumns,
    setNewColumns,
    TableData,
    FilterData,
    setFilterData,
    DialogData,
    setDialogData,
}) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('MarketCap');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [ToggleCheckBox, setToggleCheckBox] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = FilterData.map((n) => n.id);
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };




  let rowPerPageArr = [
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty FilterData.
  const rr_dispatch = useDispatch()
  
  const clickInfo = (e, rowData) => {
    console.log('rowData >> ', rowData)
    let params = {
          CompanyID: rowData?.CompanyID,
          data2: true
        }
      // console.log('params >> ', params)
      rr_dispatch(ResultDocumentApi(params))
      setDialogData(true)
        
  }




  const handleCheckbox = (item) => {
    // console.log('item >>> ', item) 
    let cols = NewColumns;
    let updatedItem = item;
    updatedItem.isVisible = !item.isVisible;
  
    let findIndex = NewColumns.indexOf(item)
    cols[findIndex] = updatedItem
    console.log('item >>> ', {cols, updatedItem})
    setNewColumns(cols) 
    setToggleCheckBox(!ToggleCheckBox)
    
  }


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


  let a0_new = 0

  return (

 <>
  {/* ========= Start Header Page =========== */}
  <div className="flex justify-between items-center pb-4 paginationHeader" >
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
                  
                <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                   onClick={() => setPage(0)}
                  >
                    <IoIosArrowBack size={16} />
                    <IoIosArrowBack size={16} />
                  </Button>
                <Button
          className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
          disabled={page === 0}
          onClick={handlePreviousPage}
        >
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

                      value={page+1}
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


 <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        
        <TableContainer className='table-wo-border tableHeightManage'  sx={{ 
          maxHeight:'calc(100vh - 250px) '
         }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              NewColumns={NewColumns}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              handleCheckbox={handleCheckbox}
              rowCount={FilterData && FilterData.length}
            />
            <TableBody>
              { FilterData && FilterData.length > 0 && stableSort(FilterData, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((row, index) => {
                
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                  
                    key={row?.id}
                  >
                    {

 NewColumns.map((headCell, k) => {

  if(k == 0){
    a0_new = 0
  }

  if(headCell?.isVisible){

    let item = row[headCell.id];
    let item2 = row[`${headCell.id}_obj`];
    let val = item
  
  let cStyle = {}
  let divStyle = {}
    if(typeof item2 == 'object'){
      // val = item.value
      divStyle = {
        ...divStyle,
        color: item2?.Color
      }
      // console.log('val item2 >><><>< ', item2, divStyle)
    }


// Apply general cell styles
  let width = headCell.width;
  cStyle = { 
    ...cStyle, // Retain any styles applied from the object check above
    width: width,
    maxWidth: width,
    textAlign: 'left',
    
    fontSize: '12px',
    fontWeight: '600',
  };

    var cStyleLeft = 0;

    if (k < 3) {
      cStyleLeft = a0_new;
      cStyle.position = 'sticky';
      cStyle.top = '0px';
      cStyle.left = cStyleLeft;
      cStyle.zIndex = 5;
      cStyle.backgroundColor = '#fff';
      a0_new = a0_new + width
    }
    
    let COLOR = row?.CompanyDetail?.Color

  return (
    <>
                   <TableCell style={cStyle}>
                    {
                      headCell.id == 'Info' ?
                      <div>
                          <IconButton className=" !p-0" onClick={(e)=>clickInfo(e, row)}>
                              <AiOutlineInfoCircle size={16} />
                          </IconButton>
                      </div>
                      :
                      <div style={divStyle} className={`texttableEliplse ${headCell.id == "Company_Name" ? "cursor-pointer cell_"+COLOR : ""} `} onClick={()=>{
                        if(headCell.id == "Company_Name"){
                            openCompany({CompanyID: row.CompanyID}, '', true)
                        }
                      }} >
                        {
                          headCell.id == "Company_Name" ?
                          <Tooltip title={val} placement="top" disableInteractive>
                          {val}
                        </Tooltip>
                          :
                          val
                        }
                        
                        
                      </div>
                    }
                   </TableCell>
    </>
  )


}
})

                    }
                    
                  </TableRow>
                );
              })}
              
              
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
      
    </Box>


{/* start Bottom Pagination Button */}
<div className="mt-2 ">
      <div className="flex justify-end">
      <div className="flex-grow-0 flex justify-center mx-[14px] paginationHeader">
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
      
    <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
                   onClick={() => setPage(0)}
                  >
                    <IoIosArrowBack size={16} />
                    <IoIosArrowBack size={16} />
                  </Button>
    <Button
          className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center"
          disabled={page === 0}
          onClick={handlePreviousPage}
        >
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

                      value={page+1}
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
