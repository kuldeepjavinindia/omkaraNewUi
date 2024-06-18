import { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Input,
  Option,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import './table.css';
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { useBlockLayout, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Box, FormControl, MenuItem, 
  Select,TextField,Tooltip } from "@mui/material";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyle";


export const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column
  return (
      <>
          <div style={{ margin: "0.5rem auto", display: "flex", justifyContent: "center" }} >
              <input 
              style={{ width:'90%' }}
                  onChange={(e) => setFilter(e.target.value)}
                  value={filterValue || ''}
              />
          </div>   
      </>
  )
}


export const GlobalFilter = ({filter, setFilter, searchFor, ...props}) => {
  return (
      <>
      {/* {
          searchFor == 'calendar' ? 
      <label  className='fontSize-07rem'>Search</label>
          :
          null
      } */}
      <Box
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:'flex-start',
              '& > :not(style)': { m: 1 },
          }}
      >
      {
          searchFor == 'calendar' ? 
           null
          :
          <span  className='fontSize-07rem'>Search: {' '}</span>
      }
      <TextField 
          
          {...props}
          style={ props.style ? props.style : {minWidth: '320px'} }
          InputProps={{
              className: 'padding-03rem',
          }}
          size='small'
          placeholder='This will search from below table only'
          onChange={(e) => setFilter(e.target.value)}
          value={filter || ''}
      />
  </Box>

      </>
  )
}





const ValuationTable = (props) => {

  const {
    bodyData, headers
  } = props
  
  const [newColumns, setNewColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  
  useEffect(() => {
      // console.log('props <<<>>> ', props)
  }, [props])
  
  
  const generateData = async() => {
   
    var allRowsData = [];
    bodyData.map((resBody)=>{
        
        var singleRow = {};

        Object.keys(resBody).forEach(key => {
                singleRow[key] = resBody[key];
            })
            
        allRowsData.push(singleRow);
        
    });

    

    var a1 = 0;
    // var mTitle = ' ';
    // var width = 75;
    var mColArr = [];

    
    headers.map((resHeads)=>{
        // let subColArr = [];
        // var subCol = [];
        var sticky = null;
        let hideCheck = false;
        if(a1 !== 1){
             hideCheck = true;
        }

        Object.keys(resHeads).forEach(key => {
            // console.log(key, resHeads[key]);
            var label = resHeads[key].label;
            var show_status = resHeads[key].show_status;
            if(show_status){
                let width = 80;

                if(key == 'CompanyName' || key == 'Sector' || key == 'Industry'){
                    width = 200;
                }

                if(key != '$id'){
                    var mCol = {
                        Header:(label || ""),
                        Footer:(label || ""),
                        sticky:sticky,
                        hideCheck:hideCheck,
                        accessor:key,
                        width:width,
                    }
                    mColArr.push(mCol);
                }
            }
            a1++;
          })
    });

    const NEW_COLUMN = mColArr;
    setTableData(allRowsData);
    setNewColumns(NEW_COLUMN);
    
}



 
useEffect(() => {
  generateData();
}, [])

const columns = useMemo(() => newColumns, [newColumns])
const data = useMemo(() => tableData, [tableData])
const totalDataObj = useMemo(() => totalData, [totalData])
const defaultColumn = useMemo(() => {
   return {
       Filter: ColumnFilter
   }
}, [])

const tableInstance = useTable({
  columns,
  data,
  defaultColumn,
  initialState:{ "sortBy": [{ "id": "MarketCap", "desc": true }], pageSize:15 },
},
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
  useBlockLayout,
  useSticky
);

const { 
  getTableProps, 
  getTableBodyProps, 
  headerGroups,
  footerGroups,
  rows, 
  prepareRow,
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  state,
  gotoPage,
  pageCount,
  setPageSize,
  allColumns,
  getToggleHideAllColumnsProps,
  setGlobalFilter,
  toggleHideAllColumns
} = tableInstance;


const { pageIndex, pageSize, globalFilter, hiddenColumns } = state;
const firstRows = rows.slice(0,20)

const showPageSize = (
  <div>
      <FormControl fullWidth>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              size={'small'}
              className="showItem"
              onChange={e => setPageSize(Number(e.target.value))}
          >
              {
                  [15,30,50,100,200,500,1000,2000,5000, 'All'].map(pageSize=>(
                      <MenuItem style={{ fontSize: '0.8rem' }} key ={(typeof pageSize == 'string'? rows.length : pageSize)} value={(typeof pageSize == 'string'? rows.length : pageSize)}>{(typeof pageSize == 'string'? pageSize : 'Show '+pageSize)}</MenuItem>
                  ))
              }
          </Select>
      </FormControl>  
  </div>
)



const ExportData = () => {
  // const wb = XLSX.utils.book_new(); 
  // let sh = XLSX.utils.table_to_sheet(document.getElementById('table-to-xls'));
  // XLSX.utils.book_append_sheet(wb, sh, "Sheet1");
  // XLSX.writeFile(wb, "valuation.xlsx");
}

const rowsLength = rows.length; 
var dataTo = (pageIndex + 1)*pageSize; 
if(rowsLength < dataTo){
  dataTo = rowsLength;
}
var dataFrom  = (((pageIndex + 1)*pageSize)-pageSize)+1; 
if(rowsLength < dataFrom){
  dataFrom = rowsLength;
}
const showingTotalEntries = (
  <>
      <div className='fontSize-07rem showing_entries'>
      {
          hiddenColumns.length > 0
          ?
          <Tooltip title="Reset Columns" placement="top">
              <Button className='mw-40' style={{ marginRight:'0.5rem' }} variant="outlined" size='small' onClick={()=>toggleHideAllColumns(false)}>All</Button>
          </Tooltip>
          :
              null
      }
          Showing <strong>{dataFrom}</strong> to <strong>{ dataTo }</strong> of <strong>{rowsLength}</strong> entries
      </div>
  </>
);

const gotoPageInput = (
  <>
      <div  className='fontSize-07rem'>
          {/* <FormControl  sx={{ width: '10ch' }}>
              <TextField
                  InputProps={{
                      className: 'padding-03rem',
                  }}
                  size='small' defaultValue={pageIndex + 1} type="number" 
                  onChange={e => {
                      const pageNumber = e.target.value ? Number(e.target.value)-1 : 0;
                      gotoPage(pageNumber);
                  }}
                  value={(pageIndex + 1)}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: pageOptions.length }} />
          </FormControl> */}
      </div>
  </>
);

const showPaginationButton = (
  <>
      <div  className='pagination' style={{ display:'flex' }}>
          <Button className='mw-40' variant="outlined" size='small' disabled={!canPreviousPage}  onClick={()=>gotoPage(0)}>{"<<"}</Button>
          <Button className='mw-40' variant="outlined" size='small' disabled={!canPreviousPage} onClick={()=>previousPage()}>{'<'}</Button>
          {gotoPageInput}
          <Button className='mw-40' variant="outlined" size='small' disabled={!canNextPage} onClick={()=>nextPage()}>{'>'}</Button>
          <Button className='mw-40' variant="outlined" size='small' disabled={!canNextPage}  onClick={()=>gotoPage(pageCount-1)}>{">>"}</Button>
      </div>
  </>
);
const data11111 = () => {
  var d1 = [];
  
  const totalDataObj1 = totalDataObj[0]
  
  var a = 0;
  for (const key in totalDataObj1) {
      if (Object.hasOwnProperty.call(totalDataObj1, key)) {
          a++;
          const element = totalDataObj1[key];
          var width1 = 75;
          var className = 'totalRow0';
          if(a == 2){
              width1 = 150;
              className = 'totalRow1';
          }else
          if(a == 3){
              width1 = 150;
              className = 'totalRow2';
          }else
          if(a == 4){
              width1 = 100;
              className = 'totalRow3';
          }
          if(key != '$id'){
              var d11 = [<div key={key} className={`th ${className}`} style={{ width:width1 }}>{element}</div>];   
              d1.push(d11);
          }
      }
  }
  
  return (d1);
}



  return (
    <>
      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Valuation
        </Typography>
        <span className="bg-[#D4E4E5] rounded p-2 cursor-pointer">
          <SiMicrosoftexcel size={15} fill="#2E7A80" />
        </span>
      </div>

      <div
        className="border-[1px] border-theme-c6 bg-theme-c5 p-4 rounded"
        style={{ height: `calc(100vh - 7.5rem)` }}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* ========= Start Header Page =========== */}
            <div className="flex justify-between items-center">
              <div className="flex-grow-2 flex items-center gap-2 w-[60%]">
                <div>
                  <Typography className="text-[11px] lg:text-[12px] font-semibold text-[#000]">
                    SHOWING <span className="text-theme">1 to 10 of 10</span>{" "}
                    ENTRIES
                  </Typography>
                </div>
                <div className="flex-grow">
                  <Input
                    type="text"
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
                <Select
                  className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none"
                  labelProps={{
                    className: "hidden",
                  }}
                  value="Show 15"
                >
                  <Option>Option 1</Option>
                </Select>
              </div>

              <div className="flex-grow-1 ">
                <div className="flex gap-1">
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowBack size={16} />
                  </Button>
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowBack size={16} />
                    <IoIosArrowBack size={16} />
                  </Button>
                  <div className="w-[100px]">
                    <Input
                      type="text"
                      defaultValue="1"
                      size="md"
                      className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <Button className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowForward />
                  </Button>
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowForward />
                    <IoIosArrowForward />
                  </Button>
                </div>
              </div>
            </div>
            {/* ========= End Header Page =========== */}

            <div className="">



            <div> 
                                 
                                 <div> 
                     
                                 
                                 <table style={{ display:'none' }} id="table-to-xls" { ...getTableProps() }>
                                   <thead>
                                     {
                                         headerGroups.map((headerGroup, i) => (
                                             <tr key={i} { ...headerGroup.getHeaderGroupProps() }>
                                                 {
                                                     headerGroup.headers.map((column, c_i) => (
                                                         <th key={c_i} { ...column.getHeaderProps() }>{column.Header}</th>
                                                     ))
                                                 }
                                             </tr>
                                         ))
                                     }
                                   </thead>
                                   <tbody  { ...getTableBodyProps() }>
                                   {
                                     rows.map((row, i) => {
                                         prepareRow(row)
                                         return (
                                             <tr key={i} { ...row.getRowProps() } >
                                                 { row.cells.map((cell, c_i) => {
                                                     return <td  key={c_i} { ...cell.getCellProps() } >{cell.render('Cell')}</td>
                                                 }) } 
                                             </tr>
                                         )
                                     })
                                   }
                                     
                                   </tbody>
                                   <tfoot>
                                       {
                                           footerGroups.map((footerGroup, i) => (
                                              <tr key={i} { ...footerGroup.getFooterGroupProps() }>
                                                  {
                                                     footerGroup.headers.map((column, c_i) => (
                                                         <td key={c_i} { ...column.getFooterProps() }>
                                                             {
                                                                 column.render('Footer')
                                                             }
                                                         </td>
                                                     ))
                                                  }
                                              </tr> 
                                           ))
                                       }
                                   </tfoot>
                               </table>  
                                 </div>
                                 
                             {/* <div>
                             <Button style={{ float: "right" }} variant="contained" size='small' className='btn-theme' onClick={()=>ExportData()}><GetAppIcon /></Button>
                             </div> */}
                                 
                             <div className='b-tableAction' style={{ marginTop:'-0.5rem' }}>
                                 {showingTotalEntries}
                                 <GlobalFilter
                                     setFilter={setGlobalFilter}
                                     filter={globalFilter}
                                 />
                                 {showPageSize}
                                 {showPaginationButton}
                             </div>
                     
                             </div> 



                             <Styles>
        <div {...getTableProps()} className="table sticky " style={{ width: '100%', height: '75vh' }}>
            <div className="header">
            {headerGroups.map((headerGroup, i) => (
                <div key={i} {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column, c_i) => (
                    <div  key={c_i} {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                    
                    
                    <div> {column.render('Header')} </div>
                    {/* <div> {column.canFilter ? column.render('Filter') : null} </div> */}
                    
                    <div style={{ display:'flex',justifyContent:'space-between' }}>
                        {
                            column.hideCheck == true ?
                            (
                                <div key={column.id}>
                                    <label>
                                    <input type='checkbox' { ...column.getToggleHiddenProps() } />
                                    </label>
                                </div>
                            )
                            :
                            null 
                        }
                        <div> { column.isSorted ? (column.isSortedDesc ? ' ↓': ' ↑' ) : null } </div>
                    </div>
                    

                    
                    </div>
                ))}
                </div>
            ))}
            </div>
            <div {...getTableBodyProps()} className="body">
            {
                page.map((row, i) => {
                    prepareRow(row);
                    return (
                    <div key={i} {...row.getRowProps()} className="tr">
                    
                    {/* {console.log(row.cells)} */}

                        {row.cells.map((cell) => (
                        <>
                            <div
                            {...cell.getCellProps([
                                {
                                    style: cell.column?.style
                                },
                                ])}
                                className="td">
                                {cell.render('Cell')}
                            </div>
                        </>
                        ))}
                    </div>
                    );
                })
            } 
            </div>
            <div className="footer">

                <div className="tr" style={{ display:'flex' }}>
                    {data11111()}
                </div>

            {footerGroups.map((footerGroup, i) => (
                <div  key={i} {...footerGroup.getHeaderGroupProps()} className="tr">
                {
                    footerGroup.headers.map((column, c_i) => (
                        <div key={c_i} {...column.getHeaderProps()} className="th">
                            {column.render('Footer')}
                        </div>
                    ))
                }
                </div>
            ))}


            </div>
        </div>

        <div className='b-tableAction'>
            {showPageSize}
            {showPaginationButton}
        </div>

        </Styles>


              {/* Start Table */}
              {/* <div className="mt-8 data2Tabels relative overflow-x-auto">
                <table className="forensicTable w-[40%] border border-collapse border-[#B3B3B3] h-full">
                  <thead className="bg-[#1E233A]">
                    <tr className="!bg-[#1E233A] ">
                      <th className="!text-white  text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <div className="flex item-center gap-1">
                          <div>COMPANY NAME</div>
                          <div>
                            <Checkbox
                              className=" border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]
                checked:border-[#fff]
                "
                            />
                          </div>
                        </div>
                      </th>
                      <th className="!text-white  text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A] ">
                        <div className="flex item-center gap-1">
                          <div>SECTOR</div>
                          <div>
                            <Checkbox
                              className="border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]
                checked:border-[#fff]"
                            />
                          </div>
                        </div>
                      </th>
                      <th className="!text-white  text-[12px] xl:text-[13px] font-semibold !bg-[#1E233A]">
                        <div className="flex item-center gap-1">
                          <div>INDUSTRY</div>
                          <div>
                            <Checkbox
                              className="border !border-[#fff] !bg-transparent h-4 w-4 rounded bg-transparent border border-[#fff]
                checked:border-[#fff]"
                            />
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td className="sticky left-0 bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="sticky sticky left-[133px] bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Agri
                      </td>
                      <td className="sticky  left-[192px] border-r border-[#B3B3B3]  bg-[#E8F0F4] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        10204
                      </td>
                    </tr>
                    <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] h-10">
                      <td className="sticky left-0 bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Bharat Dynamics Ltd.
                      </td>
                      <td className="sticky sticky left-[133px] bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        Agri
                      </td>
                      <td className="sticky  left-[192px] border-r border-[#B3B3B3]  bg-[#fff] text-[12px] xl:text-[13px] text-[#000] font-semibold text-left">
                        10204
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td className="text-white  text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left">
                        COMPANY NAME
                      </td>
                      <td className="text-white  text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left">
                        SECTOR
                      </td>
                      <td className="text-white  text-[12px] xl:text-[13px] font-semibold bg-[#1E233A] text-left">
                        INDUSTRY
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div> */}
              {/* End Table */}
            </div>
          </div>

          {/* start Bottom Pagination Button */}
          {/* <div className="mt-4">
            <div className="flex justify-end">
              <div className="flex-grow-0 flex justify-center mx-[14px] ">
                <Select
                  className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none"
                  value="Show 15"
                  labelProps={{
                    className: "hidden",
                  }}
                >
                  <Option>Option 1</Option>
                </Select>
              </div>

              <div className="flex-grow-1 ">
                <div className="flex gap-1">
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowBack size={16} />
                  </Button>
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowBack size={16} />
                    <IoIosArrowBack size={16} />
                  </Button>
                  <div className="w-[100px]">
                    <Input
                      type="text"
                      defaultValue="1"
                      size="md"
                      className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <Button className="w-[48px] !h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowForward />
                  </Button>
                  <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowForward />
                    <IoIosArrowForward />
                  </Button>
                </div>
              </div>
            </div>
          </div> */}
          {/* End Bottom Pagination Button */}
        </div>
      </div>
    </>
  );
};

export default ValuationTable;
