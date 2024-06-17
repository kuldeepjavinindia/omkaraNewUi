import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import Paper from '@mui/material/Paper';

import { visuallyHidden } from '@mui/utils';



function convertFloat(val, orderBy) {
  let rval = val;
  let isFloatCol = ["column_5","column_6", "column_8", "column_9", "column_10", "column_11"];
  if(isFloatCol.includes(orderBy)){
    rval = rval.replaceAll(',', '');
    rval = parseFloat(rval);
  }
  return rval;
}


function descendingComparator(a, b, orderBy) {
  // console.log(orderBy)
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

export default function InsiderPopupMUITable(props) {
  
  
//   const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const { tableColumns, tableRows, setSelectedSectorsData, SelectedSectorsData, SectorsDataArr, setActiveType } = props;
  // console.log(tableColumns)

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);

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
          
          cStyle.backgroundColor = (column?.bgColor || '#fff9f5');
          cStyle.color = (column?.textColor || '#333');

          var cStyleLeft = 0;

          if (column.sticky) {
            cStyleLeft = i0 * 170;
            cStyle.position = 'sticky';
            cStyle.top = '0px';
            cStyle.left = cStyleLeft;
            cStyle.zIndex = 9;
          }
          


          return (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
            style={cStyle}
          >
          
          <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>

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

// const EnhancedTableToolbar = (props) => {
//   const { numSelected } = props;

//   return ("");
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };



    let newTableRows = stableSort(tableRows, getComparator(order, orderBy))



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer className='table-wo-border'  sx={{ 
          maxHeight:'calc(100vh - 250px)'
         }} >
          <Table stickyHeader aria-label="sticky table" >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableRows && tableRows.length}
            />
            <TableBody>
                
              { tableRows && newTableRows.map((row, index) => {
                {/*  */}
                //   const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row?.code}>
                      { 
                      tableColumns && 
                      tableColumns.map((column, i0) => {
                        // const customItem = row[i0];
                        // const value = customItem?.value;
                        const customItem = row[column.id + '_all'];
                        const value = row[column.id];
                        // console.log(value);
                        
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
                          cStyle.backgroundColor = '#fff';
                        }
                        
                        cStyle.backgroundColor = (customItem?.bgColor || '#fff');
                        cStyle.color = (customItem?.textColor || '#333');
                        
                        return (
                          <TableCell key={column.id} align={column.align} style={cStyle} >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      
                    </TableRow>
                  );
                })}
                
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
    </Box>
  );
}
