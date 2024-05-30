import { BiChevronDown } from "react-icons/bi"; 
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai"; 
import { BiLinkExternal } from "react-icons/bi"; 
import { AiOutlineLink } from "react-icons/ai"; 
import { IoIosArrowDown } from "react-icons/io";

import { Button, Spinner, Typography , Menu,MenuHandler, MenuList , MenuItem} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import moment from "moment";

const CD_Main = () => {

  
  const OpenExternalLinks = (link, value="_self") => {
    var prefix = 'http';
    if (link.substr(0, prefix.length) !== prefix)
    {
      link = "http://" + link;
    } 
    window.open(link, value)
  }


  const {
    companyNotes:{
      loading: cmpNotesLoading,
      data: cmpNotesData
    }
  } = useSelector(state=>state.SingleCompany)

  const {
    Overview: {
      data: {
        body: OverviewData
      },
      // loading: OverviewLoading,
    }
  } = useSelector(state=>state?.Trendlyne)


  const companyData = cmpNotesData?.Data?.[0] || {};
  const companyFooter = cmpNotesData?.footer || [];
  

  if(cmpNotesLoading){
    return <Spinner className="w-12 h-12" />
  }

  
  return (
    <div className=" text-black ">
      <div> 
        <div className="flex gap-4 relative">
          <div>
            <Typography className="text-[40px] leading-[46px] font-semibold mt-[-5px]">
              {companyData?.CompanyName}
            </Typography>
            <div className="mt-1 mb-4">
              <ul className="flex gap-3">
                <li>
                  <span onClick={()=>OpenExternalLinks(companyData.WebSiteLink, '_blank')} size="sm" className="bg-theme-c2 font-medium text-[12px] xl:text-[16px] text-theme  flex items-center gap-1 shadow-none rounded py-1 px-2 cursor-pointer">
                    <AiOutlineLink />
                    <span>{companyData?.WebSiteLink}</span>
                  </span>
                </li>
                <li>
                  <span onClick={()=>OpenExternalLinks(companyData.BSELink, '_blank')} size="sm" className="bg-theme-c2 font-medium text-theme text-[12px] xl:text-[16px] flex items-center gap-1 shadow-none rounded py-1 px-2 cursor-pointer">
                    <BiLinkExternal />
                    <span>BSE: {companyData?.BSEcode}</span>
                  </span>
                </li>
                <li>
                  <span onClick={()=>OpenExternalLinks(companyData.NSELink, '_blank')} size="sm" className="bg-theme-c2 font-medium text-theme text-[12px] xl:text-[16px] flex items-center gap-1 shadow-none rounded py-1 px-2 cursor-pointer">
                    <BiLinkExternal />
                    <span>NSE: {companyData?.NSEcode}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul className="flex items-center justify-center gap-4">
                <li className="  border-x border-[#C0C5CB] px-2 pt-2">
 
           <div className="flex gap-1 ">
           <Typography className="text-[20px] font-bold relative leading-[21px]" >
                        {/* ₹ {companyData?.CompanyPrice} */}
                        ₹ {OverviewData && OverviewData?.BSEOHLCData?.ltp}
                    </Typography>
              
                    <div className={`text-[13px] font-bold flex items-baseline mt-[-8px] ${OverviewData && OverviewData?.BSEOHLCData?.day_changeP > 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {
                        OverviewData && OverviewData?.BSEOHLCData?.day_changeP > 0
                        ?
                        <AiOutlineCaretUp />
                        :
                        <AiOutlineCaretDown />
                      }
                      
                      
                      
                      {OverviewData && OverviewData?.BSEOHLCData?.day_changeP && OverviewData?.BSEOHLCData?.day_changeP.toFixed(2)}%</div>
           </div>
                   
                   
                    <Typography className="text-[#909090] text-[12px]">
                      { OverviewData?.BSEOHLCData?.date && moment(OverviewData?.BSEOHLCData?.date).format('DD-MMM-YYYY hh:mm:ss') }
                    </Typography>
                </li>
                <li className=" font-medium text-[15px]">
                    52wk H/L : <span className="font-semibold">{companyData?.WH52}/{companyData?.WL52}</span>
                </li>
            </ul>
          </div>

     <div className="flex gap-2 absolute right-0 " >
     <Menu>
      <MenuHandler>
        <Button size="sm" className=" flex items-center gap-1 bg-[#F9FAFA] text-[#000000] text-[12px] shadow-none rounded leading-0">
        <img src={ import.meta.env.VITE_BASE_URL + "/images/icons/addWatchList.svg"}alt=""/>
          Add to watchlist
          <BiChevronDown  size={18}/> 
          </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
    <div>
    <Button size="sm" className="!h-9 bg-[#F9FAFA] text-[#000000] text-[12px]  flex items-center gap-1 shadow-none rounded leading-0">
      <img src={ import.meta.env.VITE_BASE_URL + "/images/icons/customize.svg"}alt=""/> 
      CUSTOMIZE COLOR
            </Button>
    </div>
          </div>


        </div>
        <div>{/* RIGHT BUTTONS */}</div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {
          companyFooter.map((f_item, i)=>{
            let a0 = 0;
            
            return (
              <div className="bg-[#F9FAFA] rounded-sm p-4 font-medium text-[13px]" key={i} >
                <table className="w-full">
                  {
                    Object.keys(f_item).map((child_item,cf)=>{
                      a0++;
                      let row_item = f_item[`row${a0}`];
                      return (
                        <Fragment key={cf}>
                          <tr>
                            {
                              row_item && row_item.length > 0 && row_item.map((rItem, rIndex)=>{
                                return (
                                  <td key={rIndex} className="text-start">{rItem?.column}</td>
                                )
                              })
                            }
                          </tr>
                        </Fragment>
                      )
                    })
                  }
                </table>
              </div>
            )
          })
        }
        
      </div>
      <div className="mt-5 bg-[#F9FAFA] p-4 rounded-sm">
        <Typography className="text-xl font-semibold">About</Typography>
        <Typography className="text-[13px] font-normal text[#22242F]">
          <div dangerouslySetInnerHTML={{ 
            __html: companyData?.companyNotes
           }} />
        </Typography>
      </div>
    </div>
  );
};

export default CD_Main;
