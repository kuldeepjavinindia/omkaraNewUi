import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { visuallyHidden } from '@mui/utils';
import { TextField } from '@mui/material';
// import InsiderPopup from './InsiderPopup';
import { useEffect } from 'react';


function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}



function convertFloat(val, orderBy) {
  let rval = val;
  if(orderBy !== "column_2" && orderBy !== "column_4"){
    rval = rval.replaceAll(',', '');
    rval = parseFloat(rval);
  }
  return rval;
}

function descendingComparator(a, b, orderBy) {

  let a_orderBy = convertFloat(a[orderBy], orderBy);
  let b_orderBy = convertFloat(b[orderBy], orderBy);

  if (b_orderBy < a_orderBy) {
    return -1;
  }
  if (b_orderBy > a_orderBy) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

export default function CommonMUITable(props) {
  
  
  const [Open, setOpen] = React.useState(false);
  
  const [SelectedCompany, setSelectedCompany] = React.useState({});

  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const { 
    tableColumns, 
    tableRows, 
    FilterData,
    setFilterData,
    divRef,
    ShowCheckboxButton } = props;
  // console.log(tableColumns)

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('column_2');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);

  const handleRequestSort = (event, property) => {
    
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableRows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  React.useEffect(() => {
    if (ShowCheckboxButton === true) {
      setRowsPerPage(FilterData.length)
    }
    if (ShowCheckboxButton === false) {
      setRowsPerPage(25)
    }
  }, [ShowCheckboxButton]);
  
  
  const clickOnCell = (rowData, companyName, companyId) => {
    setSelectedCompany({companyName:companyName, companyId:companyId})
    setOpen(true)

  };

  
const EnhancedTableHead = (props0) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props0;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      
      { tableColumns && 
        tableColumns.map((column, i0) => {
          let cStyle = { 
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            textAlign: 'left',
            padding: '0.5rem',
            fontSize: '12px',
            fontWeight: '500',
          }

          var cStyleLeft = 0;

          if (column.sticky) {
            cStyleLeft = i0 * 170;
            cStyle.position = 'sticky';
            cStyle.top = '0px';
            cStyle.left = cStyleLeft;
            cStyle.zIndex = 9;
          }
          
          cStyle.backgroundColor = (column?.bgColor || '#1E233A');
          cStyle.color = (column?.textColor || '#fff');

          if(column.id !== "column_2"){
            cStyle.textAlign = 'center';
          }


          return (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
            style={cStyle}
          >
           <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>

              <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={createSortHandler(column.id)}
                  className=' !text-white'
                  sx={{ 
                    justifyContent: column.id !== 'column_2' ? 'center' : 'start',
                    width: '100%'
                   }}
                >
                  {column.label}
                   {
                    ShowCheckboxButton === false ? 
                      <>
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                      </>
                    :
                    ''
                   }

                </TableSortLabel>
            </Box>

          </TableCell>
      )}
      )}
      
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return ("");
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
  
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - FilterData.length) : 0;
    

  const requestSearch = (searchedVal) => {
    const filteredRows = tableRows.filter((row) => {
      
        return Object.keys(row).some((key) => {
          return String(row[key]).toLowerCase().includes(searchedVal.toLowerCase());
        });
    });
    
    if (searchedVal.length < 1) {
      setFilterData(tableRows)
    }
    else {
      setFilterData(filteredRows)
    }
  };


    let rowPerPageArr = [
      { label: 25, value: 25 },
      { label: 50, value: 50 },
      { label: 100, value: 100 },
      { label: 500, value: 500 },
      { label: 1000, value: 1000 },
      { label: 2500, value: 2500 },
      { label: 5000, value: 5000 },
      { label: 'All', value: (FilterData && FilterData.length) },
    ];
    
    useEffect(() => {
      if (tableRows) {
        setFilterData(tableRows)
      }
    }, [tableRows])
    

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        
      {/* <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant='sub-title2' sx={{ fontSize: '.9rem', marginLeft: '1rem' }}>
          Showing <b>{FilterData && FilterData.length > 0 ? page * rowsPerPage + 1 : 0}</b> to <b>{FilterData && FilterData.length > 0 ? (FilterData.length > page * rowsPerPage + rowsPerPage && rowsPerPage != '-1') ?  page * rowsPerPage + rowsPerPage : FilterData.length : "0"}</b> of <b>{FilterData && FilterData.length}</b> entries
        </Typography>

        <TextField placeholder='Search' className='search-input0' sx={{ padding: '0.1rem 0.7rem' }} onChange={(e) => requestSearch(e.target.value)} /> 

        <Input
          type="text"
          defaultValue="1"
          size="md"
          className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
          labelProps={{
            className: "hidden",
          }}
        />

        <TablePagination
          className='table-pagination-top'
          rowsPerPageOptions={rowPerPageArr}
          component="div"
          count={FilterData && FilterData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box> */}



        {/* <InsiderPopup Open={Open} setOpen={setOpen} companyName={SelectedCompany?.companyName} companyId={SelectedCompany?.companyId} /> */}


        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer className='table-wo-border'  sx={{ 
          maxHeight:'calc(100vh - 250px)'
         }} ref={divRef} >
          <Table stickyHeader aria-label="sticky table " id="table-to-xls">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={FilterData && FilterData.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                 {/* {console.log(FilterData)} */}
              { FilterData && stableSort(FilterData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow role="checkbox" tabIndex={-1} key={row?.code}>
                      { 
                      tableColumns && 
                      tableColumns.map((column, i0) => {
                        // console.log(row);
                        // const customItem = row[i0];
                        // const value = customItem?.value;
                        
                        const customItem = row[column.id + '_all'];
                        const value = row[column.id];
                        const COMPANY_NAME = row['column_2'];
                        const stockId = row['column_1'];
                        
                        let cStyle = { textAlign: 'left', padding: '0.5rem', fontSize: '12px',fontWeight: '500', color: '#000' };
                        if(column.id === "sectorName"){
                          cStyle['cursor'] = "pointer";
                        }
                        
                        var cStyleLeft = 0;

                        if (column.sticky) {
                          cStyleLeft = i0 * 170; 
                          cStyle.position = 'sticky';
                          cStyle.top = '0px';
                          cStyle.left = cStyleLeft;
                          cStyle.zIndex = 9;
                        }
                        cStyle.backgroundColor = (customItem?.bgColor || '#fff');
                        cStyle.color = (customItem?.textColor || '#333');
                        if(column.id !== "column_2"){
                          cStyle.textAlign = 'center';
                        }
                        if(column.id === "column_2"){
                          cStyle.cursor = 'pointer';
                        }
                        
                        return (
                          <TableCell onClick={(e)=> column.id === "column_2" ? clickOnCell(row, COMPANY_NAME, stockId) : null } key={column.id} align={column.align} style={cStyle} >
                            {value}
                          </TableCell>
                        );
                      })}
                      
                    </TableRow>
                  );
                })}
                
            </TableBody>
          </Table>
        </TableContainer>
        
        
        {/* <TablePagination
          className='table-pagination-top'
          rowsPerPageOptions={rowPerPageArr}
          component="div"
          count={FilterData && FilterData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        
      </Paper>
    </Box>
  );
}
