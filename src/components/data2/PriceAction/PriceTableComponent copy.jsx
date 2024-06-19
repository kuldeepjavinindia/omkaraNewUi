import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Box, Checkbox, FormControlLabel, TextField, Typography, Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';


function createData(name, code, population, size, name0, code0, population0, size0) {
  const density = population / size;
  const density0 = population / size;
  return { accessor_0: name, code, population, size, density, name0, code0, population0, size0, density0 };
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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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



// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };





export default function PriceTableComponent({ ShowCheckboxButton, setShowCheckboxButton, StickyColumns, ShowColumns, setShowColumns, resultData, tableColumns, FilterData, setFilterData }) {


  // console.log('ShowColumns >>> ',ShowColumns);

  const EnhancedTableHead = (props) => {
    const { tableColumns, order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const handleChange = (event) => {
      setShowColumns({
        ...ShowColumns,
        [event.target.name]: event.target.checked,
      });
    };

    return (
      <TableHead>
        <TableRow>

          {tableColumns &&
            tableColumns.map((headCell, i0) => {

              var cStyle = {
                minWidth: headCell.minWidth, maxWidth: headCell.maxWidth, backgroundColor: '#fff3ea'
              }
              var cStyleLeft = 0;

              if (headCell.sticky) {
                cStyleLeft = i0 * 150;
                cStyle.position = 'sticky';
                cStyle.top = '0px';
                cStyle.left = cStyleLeft;
                cStyle.zIndex = 9;
              }
              if (ShowCheckboxButton === false) {
                cStyle.borderRight = '1px solid rgb(221 221 221)';
                cStyle.borderBottom = '1px solid rgb(221 221 221)';
              } else {
                cStyle.border = '0px';
              }
              if (i0 == (StickyColumns - 1)) {
                cStyle.boxShadow = 'rgb(204 204 204) 2px 0px 3px';
              }

              if (ShowColumns[headCell.id]) {

                return (
                  <React.Fragment
                    key={headCell.id} >
                    <TableCell
                      className='fontSize-12px '
                      sx={{
                        padding: '5px'
                      }}
                      style={cStyle}
                      // align={headCell.numeric ? 'right' : 'left'}
                      // padding={headCell.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={createSortHandler(headCell.id)}
                        >
                          <Typography variant='body' sx={{ wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: headCell.label }} />
                          {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden} style={{ margin: 0 }}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          ) : null}

                        </TableSortLabel>
                        {
                          headCell.hideCheck ?
                            <>
                              {
                                ShowCheckboxButton === false
                                  ?
                                  <FormControlLabel
                                    className='table-th-checkbox'
                                    sx={{
                                      padding: 0
                                    }}
                                    control={
                                      <Checkbox size='small' defaultChecked value={ShowColumns[headCell.id]} onChange={(e) => handleChange(e)} name={headCell.id} />
                                    }
                                  />
                                  :
                                  null
                              }
                            </>
                            :
                            null
                        }
                      </Box>

                    </TableCell>
                  </React.Fragment>
                )
              }
            })

          }
        </TableRow>
      </TableHead>
    );
  }



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  // const ddd = resultData
  // //   console.log(FilterData)

  // console.log(loading);
  // React.useEffect(() => {
  //   if(loading){
  //     setFilterData(null)
  //     console.log('loading')
  //   }
  // }, [dispatch, loading])

  React.useEffect(() => {
    if (resultData) {
      setFilterData(resultData)
    }
  }, [resultData])



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const cellClicked = (rowData) => {
    console.log(JSON.stringify(rowData))
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = resultData.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().includes(searchedVal.toLowerCase());
      });
    });
    if (searchedVal.length < 1) {
      setFilterData(resultData)
    }
    else {
      setFilterData(filteredRows)
    }
  };

  // console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  return (
    <Paper className = "listPage" sx={{ width: '100%' }}>

      <Box className= "tabel-cst-filter" sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant='sub-title2' sx={{ fontSize: '.9rem', marginLeft: '1rem' }}>
          Showing <b>{page * rowsPerPage + 1}</b> to <b>{page * rowsPerPage + rowsPerPage}</b> of <b>{FilterData && FilterData.length}</b> entries
        </Typography>


        <TextField placeholder='Search' className='search-input' sx={{ padding: '0.3rem 0.7rem' }} onChange={(e) => requestSearch(e.target.value)} />

        <TablePagination
          className='table-pagination-top'
          rowsPerPageOptions={[10, 25, 100, 1000, 5000, { label: 'All', value: -1 }]}
          component="div"
          count={FilterData && FilterData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <TableContainer >
        <Table stickyHeader aria-label="sticky table" id="table-to-xls">

          <EnhancedTableHead
            tableColumns={tableColumns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={FilterData && FilterData.length}
          />


          <TableBody>
            {FilterData && stableSort(FilterData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i00) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                    {tableColumns && tableColumns.map((column, i0) => {
                      let value = row[column.id];
                      var cStyle = {
                        minWidth: column.minWidth, maxWidth: column.maxWidth
                      }
                      var cStyleLeft = 0;

                      if (column.sticky) {
                        cStyleLeft = i0 * 150;
                        cStyle.position = 'sticky';
                        cStyle.top = '0px';
                        cStyle.left = cStyleLeft;
                      }

                      if (i0 == (StickyColumns - 1)) {
                        cStyle.boxShadow = 'rgb(204 204 204) 2px 0px 3px';
                      }

                      if (ShowCheckboxButton === false) {
                        cStyle.borderRight = '1px solid rgb(221 221 221)';
                        cStyle.borderBottom = '1px solid rgb(221 221 221)';
                        cStyle.backgroundColor = '#fff';
                      } else {
                        cStyle.border = '0px';
                      }


                      {/* console.log(column) */ }


                      var className = "";
                      var tooltipTitle = "";
                      if (column.id == "Company_Name" || column.id == "Sector" || column.id == "Industry") {
                        className = "text-ellipsis";
                        tooltipTitle = value;
                      }
                      {/* if(column.id == "PriceDate"){
                        value = moment(value, 'DD-MM-YYYY HH:mm:ss', true).format('DD MMM YYYY');
                      } */}
                      if (ShowColumns[column.id]) {
                        return (
                          <React.Fragment key={column.id} >
                            <TableCell className={`table-td ${className} fontSize-12px fontWeight-600`} style={cStyle} align={column.align} onClick={() => cellClicked(row)}>
                              <Tooltip title={tooltipTitle} placement='top'>
                                <span>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </span>
                              </Tooltip>
                            </TableCell>
                          </React.Fragment>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 1000, 5000, { label: 'All', value: -1 }]}
        component="div"
        count={FilterData && FilterData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
