import { AiFillStar } from "react-icons/ai"; 
import { AiOutlineStar } from "react-icons/ai"; 
import { useContext, useEffect, useRef, useState } from "react";
import {
  Typography,
  Input,
  Select,
  Option,
  Button,
  Switch,
  IconButton,
} from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import PropTypes from 'prop-types';
// import { SiMicrosoftexcel } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import ResultBankModal from "../../CompanyDetail/Modals/ResultBankModal";
import { CgPlayButtonR } from "react-icons/cg";
import { PiTagBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RepoListingButtons } from "../../../constants/helper";
import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { BsCardList, BsCollectionPlay, BsFillTagsFill } from "react-icons/bs";
import { 
  RiFilePpt2Fill,
  RiFileExcel2Fill,
  RiFileWord2Fill
 } from "react-icons/ri";
 import { SiAdobeacrobatreader } from "react-icons/si";
import moment from "moment";
import { useAuthState } from "../../../context/AuthContext";
import ReportBackVideos from "./ReportBackVideos";
import { GlobalContext } from "../../../context/GlobalContext";
import { RepositoryListAPI } from "../../../store/slice/SingleCompnaySlice";




 function convertFloat(val, orderBy) {
  let rval = val;
  let isFloatCol = ["column_6", "column_7", "column_8"];
  if(isFloatCol.includes(orderBy)){
    rval = rval.replaceAll(',', '');
    rval = parseFloat(rval);
  }
  return rval;
}

function descendingComparator(a, b, orderBy) {
  // console.log('orderBy >>>>', orderBy);
  
  if(orderBy === "ReportDate"){
    return (new Date(b[orderBy]).valueOf() - new Date(a[orderBy]).valueOf());
  }

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




const ReportBankSearchTable = () => {


  const authState = useAuthState();

  const userId = authState?.user?.UserID
  

  const {
    RepoListParams,
    setRepoListParams,
    ReportBankDrawer,
    setReportBankDrawer
  } = useContext(GlobalContext)
  



  const [TableColumns, setTableColumns] = useState([]);
  const [TableRows, setTableRows] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [checked, setChecked] = useState({});
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('ReportDate');

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [StarChecked, setStarChecked] = useState(false);

  const divRef = useRef(null)  



const [rowsPerPage, setRowsPerPage] = useState(RepoListParams?.numPerPage);
const [OrderType, setOrderType] = useState(RepoListParams?.order);
const [Order_Column, setOrder_Column] = useState(RepoListParams?.order_column);
const [CrtPage, setCrtPage] = useState(RepoListParams?.page);
const [NumPerPage, setNumPerPage] = useState(RepoListParams?.numPerPage);
const [SearchInp, setSearchInp] = useState(RepoListParams?.search);

const rr_dispatch = useDispatch();

  

  const {
    companyNotes:{
      // loading: cmpNotesLoading,
      data: cmpNotesData
    },
    RepositoryList:{
      loading: RepositoryListLoading,
      data: RepositoryListData
    }
  } = useSelector(state=>state.SingleCompany)

  const isDashboard = false;



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChange00 = (event, FileID) => {

    let vale0 = event.target.checked ? "1" : "0";
    let a0 = {...checked, [FileID]: vale0}
    setChecked(a0)
    let params = {
      "Flag":vale0,
      "FileId":FileID
    }

  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = TableRows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  let arrData = RepoListingButtons;


  
  const handleChangeStart = (event) => {
    let value = event.target.checked;

    let newData = TableRows;
    if(value ===true){
      newData = FilterData.filter(itemF=>{
        if(value ===true && itemF.Flag === "1"){
          return true
        }
      });
    }

    setFilterData(newData)

    setStarChecked(event.target.checked);
  };

  const editFile = async (event, flagId) => {
    // console.log('flagId >> ', flagId);
    // let fData = flagId;
    // fData = JSON.stringify(fData)
    // localStorage.setItem('editFileData', fData);
    // window.location.href = 'upload/'+flagId.FileId
  };

  




  
  const deleteFile = async (event, flagId) => {
    // let msg = window.confirm('Are you sure want to delete this file!');

    // if(msg){
    //   var dd = {
    //         "UserId":userId,
    //         "FileId":flagId
    //     };
    //     // console.log(dd);
    //   dispatch({ type: REPOSITORY_LIST_REQUEST })
    //   await RepositoryDeleteDataRequest({
    //         "UserId":userId,
    //         "FileId":flagId
    //     }).then(res=>{
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 2000);
    //       console.log('err');
    //     }).catch(err=>{
    //       console.log(err);
    //     })
    //     console.log('err >>>> ');
    // }

    }





    
  let searchBtnRef = useRef(null);
  
  useEffect(() => {
    if(isDashboard){
      searchBtnRef.current.click()
    }
  }, [])

  


  
  
const EnhancedTableHead = (props0) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props0;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      
      { TableColumns && 
        TableColumns.map((column, i0) => {
          let cStyle = { 
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            textAlign: 'left',
            padding: '0.5rem',
            fontSize: isDashboard ? '11px' : '12px',
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

          if(column.id !== "column_1"){
            cStyle.textAlign = 'left';
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
{
  column.id === 'flagId' ?
  <>
  <Tooltip title={`${StarChecked === false ? "Show only starred" : "Show all"}`} placement="top">
      <Switch
            checked={StarChecked}
            onChange={handleChangeStart}
            inputProps={{ 'aria-label': 'controlled' }}
          />  
  </Tooltip>
  </> 
  :
  <>
    <TableSortLabel
        active={orderBy === column.id}
        direction={orderBy === column.id ? order : 'asc'}
        onClick={createSortHandler(column.id)}
        sx={{ 
          justifyContent: 'start',
          width: '100%',
          color:"#fff !important"
          }}
          className="td_W_svg"
      >
        {column.label}

        {orderBy === column.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}


    </TableSortLabel>
  </>
}
              
            </Box>

          </TableCell>
      )
    
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
  

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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


const buttonType = (type) => {

  let arr = {
    "clsName":"",
    "component":<>
      <SiAdobeacrobatreader />
        {type}
    </>,
  } 


  if(type === 'doc' || type === 'docx'){
    arr = {
      "clsName":"docBtn",
      "component":<>
        <RiFileWord2Fill />
          {type}
      </>,
    } 
    
  }
  if(type === 'xls' || type === 'xlsx'){
    arr = {
      "clsName":"excelBtn",
      "component":<>
        <RiFileExcel2Fill />
          {type}
      </>,
    } 
    
  }
  if(type === 'ppt' || type === 'pptx'){
    arr = {
      "clsName":"pptBtn",
      "component":<>
        <RiFilePpt2Fill />
          {type}
      </>,
    }
  }
  return arr;
}

// const resetSearchCall = (e) => {
//   setCrtPage(1);
//   setSearchInp("");
//   // let topLabels = resultFilterInputData0;
//   let pOptionData = RepoListParams;
//       pOptionData = {
//         ...pOptionData,
//         order: OrderType,
//         order_column: Order_Column,
//         page: 1,
//         search: "",
//         numPerPage: NumPerPage
//       }
//   //     // console.log(pOptionData);
      
//   // topLabels = { ...topLabels, paramsData:pOptionData }
//   // let filterArray = repositoryTestListFilters(topLabels);
  
//   // dispatch(RepoListParamOptionAction(pOptionData));

//   // dispatch(resultFilterInputAction(topLabels));
//   // dispatch(RepositoryListAction(filterArray, 'test'));

// }
const searchCall = (type='submit') => {
  // SearchInp
  // setSearchInp

  setCrtPage(1);
  let pOptionData = RepoListParams;
  if(type == "reset"){
    setSearchInp("");
    pOptionData = {
      ...pOptionData,
      order: OrderType,
      order_column: Order_Column,
      page: 1,
      search: "",
      numPerPage: NumPerPage
    }
  }else{
    pOptionData = {
      ...pOptionData,
      order: OrderType,
      order_column: Order_Column,
      page: 1,
      search: SearchInp,
      numPerPage: NumPerPage
    }
  }
      setRepoListParams(pOptionData)
      rr_dispatch(RepositoryListAPI(pOptionData));

  // console.log(pOptionData);
  // topLabels = { ...topLabels, paramsData:pOptionData }
  // let filterArray = repositoryTestListFilters(topLabels);
  // dispatch(RepoListParamOptionAction(pOptionData));
  // dispatch(resultFilterInputAction(topLabels));
  // dispatch(RepositoryListAction(filterArray, 'test'));

}


const PrevFun = (e, type) => {

  let CrtPage0 = Number(CrtPage)-1;

  if(CrtPage0 < 1){
    return false;
  }
  setCrtPage(CrtPage0);
  // let topLabels = resultFilterInputData0;
  let pOptionData = RepoListParams;
      pOptionData = {
        ...pOptionData,
        order: OrderType,
        order_column: Order_Column,
        page: CrtPage0,
        numPerPage: NumPerPage
      }
      setRepoListParams(pOptionData)
      rr_dispatch(RepositoryListAPI(pOptionData));

}

const NextFun = () => {
 
  let CrtPage0 = Number(CrtPage)+1;

  if(CrtPage0 < 1){
    return false;
  }
  
  setCrtPage(CrtPage0);
  
  let pOptionData = RepoListParams;
      pOptionData = {
        ...pOptionData,
        order: OrderType,
        order_column: Order_Column,
        page: CrtPage0,
        numPerPage: NumPerPage
      }
    setRepoListParams(pOptionData)
    rr_dispatch(RepositoryListAPI(pOptionData));

}








  
  useEffect(() => {

    if(!RepositoryListLoading){
      let tableHeadArr = [];
      let tableRowsArr = [];
      
      tableHeadArr = [
        
        {
            id: 'flagId',
            label: '',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 70
        },
        // {
        //     id: 'Date',
        //     label: 'Date',
        //     sticky: false,
        //     format: (value) => value.toLocaleString('en-IN'),
        //     minWidth: 120
        // },
        {
            id: 'ReportDate',
            label: 'Report Date',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
        {
            id: 'Period',
            label: 'Period',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 80
        },
        // {
        //     id: 'Month',
        //     label: 'Month',
        //     sticky: false,
        //     format: (value) => value.toLocaleString('en-IN'),
        //     minWidth: 120
        // },
        {
            id: 'CompanyName',
            label: 'Company Name',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 200
        },
        {
            id: 'SectorName',
            label: 'Sector',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
        {
            id: 'ReportType',
            label: 'Report Type',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
        {
            id: 'BrokerName',
            label: 'Broker Name',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
        {
            id: 'UserName',
            label: 'Author',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
        {
            id: 'Title',
            label: 'Title',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 350
        },
        {
            id: 'FileName',
            label: 'Report',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
        {
            id: 'Video',
            label: 'Videos/ Tags',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 70
        },
        {
            id: 'action',
            label: 'Action',
            sticky: false,
            format: (value) => value.toLocaleString('en-IN'),
            minWidth: 120
        },
      ];

      let a0_index = [1,2,3,8,5,6,9]
      let output = tableHeadArr;
      if(isDashboard){
        output = tableHeadArr.filter((_, index) => a0_index.includes(index));
      }
          // output = tableHeadArr;
      setTableColumns(output);
      // console.log(dataList.Data);
      let checkArr = {};
      RepositoryListData.Data.map((item, i)=>{
        let tagsTxt = item.tags;
        tagsTxt = tagsTxt.map(tg_it=>(tg_it?.Tag_Title).trim());
        tagsTxt = tagsTxt.join(', ');
        
        item = {...item, tagsTxt:tagsTxt}
        tableRowsArr.push(item);
        checkArr = { ...checkArr, [item.FileId]: item['Flag']}

      });

      // tableRowsArr


      tableRowsArr = tableRowsArr.sort((a,b)=>{
        return (new Date(b['Date']).valueOf() - new Date(a['Date']).valueOf());
      })

      setChecked(checkArr);
      setTableRows(tableRowsArr);
      
    }
  }, [RepositoryListLoading])


   const optionSelect = [
      10,25,50,100,500,1000
    ];
    
    const changeOption = (e) => {
      // changeOption
      // console.log('changeOption >> ', e.target.value)
// let value = e.target.value
//       let CrtPage0 = 1;

//       if(CrtPage0 < 1){
//         return false;
//       }
//       // console.log(CrtPage0);
//       setCrtPage(CrtPage0);
//       let topLabels = resultFilterInputData0;
//       let pOptionData = paramsData;

//       pOptionData = {
//         ...pOptionData,
//         order: "asc",
//         order_column: "Company_name",
//         page: 1,
//         numPerPage: value
//       }
//       setCrtPage(1)
//       setOrderType('asc')
//       setOrder_Column('Company_name')
//       setNumPerPage(value);
          
//       topLabels = { ...topLabels, paramsData:pOptionData }
//       let filterArray = repositoryTestListFilters(topLabels);
      
//       dispatch(RepoListParamOptionAction(pOptionData));
//       dispatch(resultFilterInputAction(topLabels));
//       dispatch(RepositoryListAction(filterArray, 'test'));

    }


    useEffect(() => {
      if (TableRows) {
        setFilterData(TableRows)
      }
    }, [TableRows])






  

  return (
    <>
    {
      ReportBankDrawer?.type && (
        <>

      {/* Video Modal */}
      {/* <ResultBankModal open={open} setOpen={setOpen} /> */}
        <ResultBankModal >

            {
              ReportBankDrawer?.type == "videos" && 
                  <ReportBackVideos />
            }

        </ResultBankModal>
      {/* Video Modal */}

        </>
      )
    }

      <div className="flex justify-between pb-2">
        <Typography className="text-[15px] text-[#000] font-semibold">
          Repository List
        </Typography>
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
                    {/* SHOWING <span className="text-theme">1 to 10 of 10</span>{" "} ENTRIES */}

                    Showing <b>{((CrtPage-1)*NumPerPage)+1}</b> to <b>{(RepositoryListData?.total_rows < CrtPage*NumPerPage ? RepositoryListData?.total_rows : CrtPage*NumPerPage )}</b> of <b>{RepositoryListData?.total_rows}</b> entries


                  </Typography>
                </div>

                <div className="flex-grow flex items-center gap-1">
                  <Input
                    type="text"
                    placeholder="Search Company"
                    className="!border !border-gray-200 !h-8 !bg-[#fff] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                    labelProps={{
                      className: "hidden",
                    }}
                    value={SearchInp}
                    disabled={RepoListParams?.search ? true : false}

                    onChange={(e) => setSearchInp(e.target.value)}

                    // icon={
                    //   <CgSearch
                    //     size={19}
                    //     className="text-gray-400 top-[-2px] absolute"
                    //   />
                    // }

                  />  

                  {
                    RepoListParams?.search ? 
                    <Button size="sm" className='px-3 py-1.5 w-20 mb-2' color="red" onClick={()=>searchCall('reset')}>Reset</Button>
                    :
                    <Button size="sm" className='bg-theme px-3 py-1.5 w-20 mb-2' onClick={()=>searchCall()}>Search</Button>
                  }



                </div>
              </div>

              <div className="flex-grow-0 flex justify-center mx-[14px] mt-[-4px]">
                <Select
                  className="smallInput bg-[#fff] mt-0 !h-8 rounded border-none top-0"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={(e)=>changeOption(e)} 

                  value="10"
                >
                  
                  {
                    optionSelect.map((item)=>{
                      return (
                        <>
                          <Option key={item} >{item}</Option>
                          {/* <option selected={NumPerPage == item ? true : false}  key={item} value={item}>{item}</option> */}
                        </>
                      )
                    })
                  }


                </Select>
              </div>

              <div className="flex-grow-1 ">
                <div className="flex gap-1">
                  <Button onClick={()=>PrevFun()} disabled={CrtPage === 1 ? true : false} className="w-[48px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowBack size={16} />
                  </Button>
                  {/* <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowBack size={16} />
                    <IoIosArrowBack size={16} />
                  </Button> */}
                  <div className="w-[100px]">
                    <Input
                      type="text"
                      defaultValue="1"
                      size="md"
                      readOnly
                      value={CrtPage}
                      className="smallInput two border-none !h-8 !bg-[#fff] text-[#000] ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <Button onClick={()=>NextFun()} disabled={ RepositoryListData?.total_rows < CrtPage*NumPerPage ? true : false } className="w-[48px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowForward />
                  </Button>
                  {/* <Button className="w-[48px] h-[30px] p-0 border border-[#C7C7C7] bg-[#fff] text-[#C7C7C7] rounded shadow-none !h-8 flex items-center justify-center">
                    <IoIosArrowForward />
                    <IoIosArrowForward />
                  </Button> */}
                </div>
              </div>
            </div>



            {/* ========= End Header Page =========== */}




            <div className="">
              {/* Start Table */}
              <div className="mt-8 data2Tabels relative overflow-x-auto">
                



{/* <EnhancedTableToolbar numSelected={selected.length} /> */}
<TableContainer className='table-wo-border'  sx={{ 
          maxHeight: isDashboard ? 'calc(100vh - 195px)' : 'calc(100vh - 250px)'
         }} ref={divRef} >
          <Table stickyHeader aria-label="sticky table " id="table-to-xls" className={isDashboard ? 'table-cst-strip' : ""}>
            
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={FilterData && FilterData.length}
            />
            <TableBody>
              { FilterData && stableSort(FilterData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  // const labelId = `enhanced-table-checkbox-${index}`;
                  // console.log(row);
                  let Date = row.Date;
                  if(row.Date){
                    Date = moment(row.Date).format('MMMM DD YYYY, h:mm:ss a');
                  }

                  let value = row.FileName;
                  
                  return (

                    <TableRow role="checkbox" tabIndex={-1} key={row?.code} className="odd:!bg-[#E8F0F4] even:!bg-[#fff]">
                      
                      { 
                      TableColumns && 
                      TableColumns.map((column, i0) => {
                        // console.log(row);
                        // const customItem = row[i0];
                        // const value = customItem?.value;
                        
                        const customItem = row[column.id + '_all'];
                        const value = row[column.id];
                        // const COMPANY_NAME = row['column_1'];
                        // const stockId = row['column_7'];
                        
                        let cStyle = { textAlign: 'left', padding: '0.5rem', 
                        fontSize: isDashboard ? '11px' : '12px',
                        fontWeight: '500', color: '#000' };
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
                        
                        // cStyle.backgroundColor = (customItem?.bgColor || '#fff');

                        cStyle.color = (customItem?.textColor || '#333');
                        if(column.id !== "column_1"){
                          cStyle.textAlign = 'left';
                        }
                        if(column.id === "column_1"){
                          cStyle.cursor = 'pointer';
                        }
                        
                        if(column.id === 'FileName'){
                          let extension = row.FileName;
                              extension = extension.split('.').pop();
                              let a0 = buttonType(extension);
                          let clsName = a0?.clsName;

                          return (
                            <TableCell key={column.id} align={column.align} style={{ ...cStyle, textAlign:'left' }} >
                              {
                                row.Notes == "Yes" ? (
                                  <>
                                    <Button
                                        onClick={(e)=>{
                                          
                                          // setDrawerState(true);
                                          // setItemData(row);
                                          // // SINGLE_COMPANY_COMMENT_RESET
                                          // dispatch({type:SINGLE_COMPANY_COMMENT_RESET})

                                        }} variant="outlined" size="small" sx={{
                                          borderRadius:"50px",
                                          paddingX:'1rem'
                                        }} >
                                          <BsCardList style={{
                                            marginRight:5,
                                          }} />
                                        Note
                                    </Button>
                                  </>
                                )
                                :
                                <>
                                  <a href={row.link} target="_blank" className={`pdfBtn ${clsName}`} rel="noopener noreferrer"  style={{ 
                                      
                                    }}>
                                      {a0?.component}
                                  </a>
                                </>
                              }
                              

                            </TableCell>
                          );
                        }else 
                        if(column.id === 'ReportType')
                        {
                          // console.log(value)
                          return (
                            <TableCell key={column.id} align={column.align} style={cStyle} >
                              {
                                row.Notes == "Yes" ?
                                "Notes"
                                :
                                value.join(' , ')
                              }
                              
                            </TableCell>
                          );
                        }else
                        if(column.id === 'flagId')
                        {
                          // console.log(checked[row.FileId])
                          return (
                            <TableCell key={column.id} align={column.align} style={cStyle} >
                              <Checkbox
                                {...label}
                                checked={checked[row.FileId] == "1" ? true : false}
                                onChange={(e)=>handleChange00(e, row.FileId)}
                                icon={<AiOutlineStar />}
                                checkedIcon={<AiFillStar />}
                              />


                              {/* {
                                row?.Flag == "1" ?
                                  <IconButton onClick={()=>flagIdChoose("0", row?.FileId)}>
                                    <StarIcon />
                                  </IconButton>
                                :
                                  <IconButton onClick={()=>flagIdChoose("1", row?.FileId)}>
                                    <StarOutlineIcon />
                                  </IconButton>
                              } */}
                              {/* {column.format && typeof value === 'float0'
                                ? column.format(value)
                                : value.join(' , ') } */}

                            </TableCell>
                          );
                        }else
                        if(column.id === 'Notes')
                        {
                          return (
                            <TableCell key={column.id} align={column.align} style={cStyle} >
                              
                              <>
                                <Button onClick={(e)=>{
                                    // setDrawerState(true);
                                    // setItemData(row);
                                  }} variant="outlined" size="sm" >
                                  View
                                </Button>
                                
                              </>
                              

                            </TableCell>
                          );
                        }else
                        if(column.id === 'Video')
                        {
                          return (
                            <TableCell key={column.id} align={column.align} style={cStyle} >
                              
                              <div className=" flex gap-1 ">


{
  row?.videos == "YES" ? (
    <>
                                  <Button size="sm" onClick={(e)=>{
                                        setReportBankDrawer({
                                          type:'videos',
                                          row_data:row
                                        })
                                        // setVideoDrawerState(true);
                                        // setItemData(row);
                                        // dispatch({type:MEDIA_DATA_RESET})
                                      }} variant="outlined" sx={{ 
                                        // borderRadius:"50px",
                                        // minWidth:'3rem',
                                        // paddingX:'.6rem',
                                        // paddingY:'.25rem',
                                        // marginX:.5
                                       }}  className=" rounded-full" color="indigo">
                                        <BsCollectionPlay style={{
                                          // marginRight:5,
                                         }} />
                                      
                                  </Button>
    </>
  ) : null
}


{
                                  row?.tags && row?.tags.length > 0 && (
                                          <Button onClick={(e)=>{
                                                  // setTagDrawerState(true);
                                                  // setItemData(row);
                                                  // dispatch({type:MEDIA_DATA_RESET})
                                                }} variant="outlined" size="sm" sx={{ 
                                                  // borderRadius:"50px",
                                                  // minWidth:'3rem',
                                                  // paddingX:'.6rem',
                                                  // paddingY:'.25rem',
                                                  // marginX:.5
                                                  }} className=" rounded-full" color="indigo">
                                                  <BsFillTagsFill style={{
                                                    // marginRight:5,
                                                    }} />
                                            </Button>
                                   )
                                } 


                              </div>
                              

                            </TableCell>
                          );
                        }else
                        
                        if(column.id === 'action')
                        {
                          return (
                            <TableCell key={column.id} align={column.align} style={cStyle} >
                              
                              {
                                ( userId || arrData.includes(userId) || (userId != undefined && userId != "" && userId == row?.UserId) ) ? 
                                  <div className="flex gap-2">

                                    <IconButton onClick={(e)=>editFile(e, row)} size="sm" className=" bg-transparent border-[#2E7A80]"  color='#2E7A80' variant="outlined">
                                      {/* <EditIcon color='success' /> */}
                                      <BiEdit fill="#2E7A80" size={20} />
                                    </IconButton>
                                    
                                    <IconButton onClick={(e)=>deleteFile(e, row.FileId)} size="sm" className=" bg-transparent"  color='red' variant="outlined">
                                      {/* <DeleteIcon color='error' /> */}
                                      <MdOutlineDelete  size={20} />

                                    </IconButton>
                                  </div>
                                :
                                <></>
                              }
                              

                            </TableCell>
                          );
                        }else
                        {
                          return (
                            <TableCell key={column.id} align={column.align} style={cStyle} >
                              {column.format && typeof value === 'float0'
                                ? column.format(value)
                                : value }
                            </TableCell>
                          );
                        }
                        
                        
                      })}
                      
                    </TableRow>
                  );
                })}
                
            </TableBody>
          </Table>
        </TableContainer>
        
        








              </div>
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

export default ReportBankSearchTable;
