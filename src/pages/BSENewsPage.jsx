import { CgArrowTopRight } from "react-icons/cg";
import { Chip, Input, Spinner } from "@material-tailwind/react";
import { CgSearch } from "react-icons/cg";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnnouncementNormalAPI } from "../store/slice/TrendlyneSlice";
import { TrendlyneReq, companyMasterReq } from "../constants/defaultRequest";
import moment from "moment";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { companyMasterAPI } from "../store/slice/MasterSlice";
 
export function RedirectingDialog({open, setOpen}) {
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog size="sm" open={open} handler={handleOpen}>
        {/* <DialogHeader>Redirecting...</DialogHeader> */}
        <DialogHeader>
          <div className="flex items-center text-lg font-semibold gap-4 text-black">
            <Spinner className="h-8 w-8 text-theme/30" />
            Please wait...
          </div>
        </DialogHeader>

        {/* <DialogBody>
          <div className="flex items-center text-lg font-semibold gap-4 text-black">
            <Spinner className="h-8 w-8 text-theme/30" />
            Please wait...
          </div>

        </DialogBody> */}
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}





const BSENewsPage = () => {


  const rr_dispatch = useDispatch();




  const {
    wlCompany:{
      loading: wlCompanyLoading,
      data: {
        Data: wlCompanyData
      },
    }
  } = useSelector( state=> state.WatchList)

  
  const {
    companyMaster:{
      loading: cmpMstLoading,
      data: cmpMstData,
    }
  } = useSelector( state=> state.Masters)


  const [perPageCount, setperPageCount] = useState(100); 
  const [pageNumber, setPageNumber] = useState(1);
  const [AllCmpData, setAllCmpData] = useState([]);

  const [open, setOpen] = useState(false);
  
  const [AllWishlist, setAllWishlist] = useState({})
  const [All_Wishlist, setAll_Wishlist] = useState({})


  const callTrendlyneApi = async (params) => {
    const {
      stockCodeList,
      pageNumber,
      // perPageCount,
      // compSlug
    } = params;
    let output = [];
    let limit = 30;
    let start = 0;
    let end = limit;
    let arrayCount = Math.ceil((stockCodeList.length/limit));

    // console.log('arrayCount >>>> ', arrayCount)
    let a = Promise.all(
      new Array(arrayCount).fill().map((d,i)=>i).map(async (item_, i_) => {
        let a0 = stockCodeList.splice(start, end)
        let param = TrendlyneReq;
        param = {
          ...param,
          compSlug: ['INFY'],
          params: {
            stockCodeList: a0,
            pageNumber: pageNumber
          }
        }
        let data = await AnnouncementNormalAPI(param);
        return data
      })
    ).then(res=>{
      // console.log('res >>> ', res)
      res.map(item=>{
        output = [ ...output, ...item.body.newsList ]
      })
      
      output.sort( function ( a0, b0 ) {
            var c = new Date(a0.pubDate);
            var d = new Date(b0.pubDate);
            return d-c;
      })

      // console.log('output >>>> ', output)

      return output;
    })
    
    // a = a
    // a.sort( function ( a0, b0 ) {
    //       var c = new Date(a0);
    //       var d = new Date(b0);
    //       return d-c;
    // })
    return a;
  }


  const callFunction = async (type="") => {
    let allCmpData = AllCmpData;
    let compId = [];


    if(wlCompanyData){
      compId = wlCompanyData.map(item0=> {
        return item0.BseCode
      })
    }
    if(compId.length === 0){
      return ;
    }

    let pagNum = pageNumber;
    if(type=="loadmore")
    {
      pagNum = pageNumber+1;
      setPageNumber(pageNumber+1);
    }

    let compSlug = compId[0];
    let data_1 = await callTrendlyneApi({compSlug, stockCodeList: compId, pageNumber: pagNum, perPageCount:perPageCount})
    allCmpData = [ ...allCmpData, ...data_1 ];
    // console.log('allCmpData <<>>>>> ', allCmpData)
    setAllCmpData(allCmpData);

    const groupedObjects = {};
    allCmpData.forEach(obj => {
      const { pubDate } = obj;
        const monthYear = moment(pubDate).format('YYYY-MM-DD');
        if (!groupedObjects[monthYear]) {
          let data = allCmpData.filter(itm=>moment(itm.pubDate).format('YYYY-MM-DD') === monthYear);
          groupedObjects[monthYear] = data
        }
    });

    var keys = Object.keys( groupedObjects );
    keys.sort( function ( a, b ) {
      var c = new Date(a);
      var d = new Date(b);
      return d-c;
    });
    let finalArr = {};
    // Iterate through the array of keys and access the corresponding object properties
    for ( var i = 0; i < keys.length; i++ ) {
        finalArr = {...finalArr, [keys[i]]: groupedObjects[ keys[i] ]}
    }

    console.log('finalArr <><><<>><>><><><<<<< ', finalArr)
    setAllWishlist(finalArr)
    setAll_Wishlist(finalArr)



  }
  const openCompanyInNewTab = (companyName) => {
    console.log(companyName)
    let params = companyMasterReq;
    params = {
      ...params,
      Search:companyName.stockName,
      // Search:companyName.BSEcode,
      // Type:"BSE"
    }
    rr_dispatch(companyMasterAPI(params))
    
    setOpen(true)
  }


  const getDateData = (date_val) => {
    let newDate = date_val;
    var startdate = moment().subtract(1, "days").format("YYYY-MM-DD");
    if(moment().isSame(date_val, 'day')){
      return 'Today';
    }else if(startdate === date_val) {
      return 'Yesterday';
    }
    newDate = moment(date_val).format('DD-MMM, YYYY');
    return newDate;
  }




  
  const filterData = (e) => {
    let searchedVal = e.target.value;
    let a000 = {} 
    for (const p_key in All_Wishlist) {
      // console.log(key)
      if (All_Wishlist.hasOwnProperty.call(All_Wishlist, p_key)) {
        const element = All_Wishlist[p_key];
        let AllTableRowData = element;
        const filteredRows = AllTableRowData.filter((row, r0) => {
          if(row){
            return Object.keys(row).some((key) => {
              if(key == "title" || key == "postType" || key == "description"){
                if(key){
                  return row[key] ? String(row[key]).toLowerCase().includes(searchedVal.toLowerCase()) :  false;
                }
              }
            });
          }
        });
        a000 = {...a000, [p_key]: filteredRows}
      }
    }
    setAllWishlist(a000);
    // console.log(' a000 >>> ', a000)
  }







  useEffect(() => {
    if(!wlCompanyLoading){
      if(AllCmpData.length === 0){
        callFunction() 
      }
    }
  }, [wlCompanyLoading])


  useEffect(() => {
    if(!cmpMstLoading && open === true){
      let crtCom = cmpMstData?.[0];

      let url = 'company-detail/'+ window.btoa(crtCom?.CompanyID)+'/'
      window.open(url, '_blank');
      console.log('cmpMstLoading >>> ', cmpMstData, url)
      setOpen(false);

    }
  }, [cmpMstLoading])
  

  if(wlCompanyLoading){
    return <Spinner className="w-12 h-12" />
  }

  return (
    <div className="bse-new-container">
      <div className="w-full border-[1px] border-[#B8BCF1] rounded py-3 px-3 bg-[#E9EDEF]">
        <div className="rounded-md bg-[#fff] pt-2 px-1">
        <div className="px-4 py-2">
          <RedirectingDialog  open={open} setOpen={setOpen} />
          <Input onChange={(e)=>{
            filterData(e)
          }} label="Search Company From List" className="!bg-[#E9EDEF] border-transparent !border-0 focus:!border-[2px]" size="md" icon={<CgSearch className="text-[19px]" />} />
        </div>
        <div className="px-4 py-2">
          

          
          <ul className="wishlistBody-list">

            {
              Object.keys(AllWishlist).map((itm, i0)=>{
                if(AllWishlist[itm].length > 0){
                  let childData = AllWishlist[itm] && AllWishlist[itm].length > 0 && AllWishlist[itm].filter(f_itm=>f_itm.postType != "Trendlyne Earnings Call");
                  return (
                    <Fragment key={i0}>
                        <li className="my-3">
                            <Chip
                              value={getDateData(itm)}
                              size="md"
                              className="w-36 text-center bg-[#1E233A]"
                            />
                            <ul className=" mt-2 border-2  rounded-lg p-2" style={{ 
                              backgroundColor: '#f8f8f8'
                             }}>

                            {/* AllWishlist[itm] && AllWishlist[itm].length > 0 && AllWishlist[itm].filter(f_itm=>f_itm.postType != "Trendlyne Earnings Call").map((c_itm, c_i)=>{ */}
                              { childData.map((c_itm, i) => {
                                //  let companyData = companyMaster.find(f_item=>f_item.BSECode == c_itm.BSEcode)

                                 let gotoLink = `/company-detail/`
                                 let title_1 = c_itm?.title;
                                 let title_1Arr = title_1.split(' - ')
                                 title_1Arr = title_1Arr.slice(2, title_1Arr.length)
                                 title_1 = title_1Arr.join(' ')
                                 
                                return (
                                  <Fragment key={i} >
                                    <li
                                      className={`pt-1 px-2 ${
                                        childData.length - 1 != i
                                          ? " pb-2 border-b-[1px] border-[#c2c3f7]"
                                          : " pb-1"
                                      }`}
                                    >
                                      <div className="l-title">
                                        <a
                                          onClick={()=>openCompanyInNewTab(c_itm, gotoLink)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-fit block text-sm font-semibold cursor-pointer"
                                        >
                                          <div className="w-fit flex items-center font-bold">
                                            {c_itm?.stockName}
                                            <span>
                                              <CgArrowTopRight size={20} />
                                            </span>
                                          </div>
                                        </a>
                                      </div>
                                      <div className="l-body">
                                        <a
                                          href={c_itm?.externalUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[#3D9298] font-medium text-sm"
                                        >
                                          {title_1}
                                        </a>
                                      </div> 
                                    </li>
                                  </Fragment>
                                );
                              })}
                            </ul>
                          </li>     
                    </Fragment>
                  )
                }
              })
            }
            
            
          </ul>
        </div>

        <div className="px-4 pb-4">
        { Object.keys(AllWishlist).length > 0 && (
              <Button onClick={() => callFunction("loadmore")} className="bg-theme" size="sm" >Load More</Button>
          )
        }
        </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default BSENewsPage;
