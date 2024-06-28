import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';



const FilterItemChips = ({dispatchName, dispatchName2, finalRquest}) => {
  const {
    sectorMaster: { loading: sectorMasterLoading, data: sectorMasterData },
    industryMaster: {
      loading: industryMasterLoading,
      data: industryMasterData,
    },
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
    turnAroundMaster: { loading: TALoading, data: TAData },
  } = useSelector((state) => state.Masters);

  const rr_dispatch = useDispatch()

  const { filterDataChip, setFilterDataChip } = useContext(GlobalContext);
  const [chipsCards, setChipsCards] = useState(filterDataChip);
  const [ToggleState, setToggleState] = useState(false);

  // useEffect(() => {
  //   if (filterDataChip) {
  //     const chipArr = Object.keys(filterDataChip).map((key) => ({
  //       keyname: key,
  //       label: filterDataChip[key].label,
  //       value1: filterDataChip[key]?.value1,
  //       value2: filterDataChip[key]?.value2,
  //     }));

  //     setChipsCards(chipArr);
  //   } else {
  //     setChipsCards([]);
  //   }
  // }, [filterDataChip]);

  const arrVal = (key, itemval) => {
    switch (key) {
      case 'company': 
      case 'Company': 
        return allCompanyData
          .filter((item) => itemval.includes(item.CompanyID))
          .map((item) => item.CompanyName)
          .join(', ');
      case 'sectors':
      case 'Sector':
        return sectorMasterData
          .filter((item) => itemval.includes(item.sectorID))
          .map((item) => item.Sector)
          .join(', ');
      case 'industry':
      case 'Industry':
        return industryMasterData
          .filter((item) => itemval.includes(item.IndustryID))
          .map((item) => item.Industry)
          .join(', ');

      case 'EBDITA_TO':
        return TAData
        .filter((item) => item.Id == itemval)
        .map((item) => item.FilterName)
        .join(', ');

      case 'PAT_TO':
        return TAData
        .filter((item) => item.Id == itemval)
        .map((item) => item.FilterName)
        .join(', ');


      default:
        return itemval;
    }
  };

  const handleLabelClose = (itemKey) => {
    // setFilterDataChip((prevChips) =>
    //   prevChips.map((chip) =>
    //     chip.keyname === keyname ? { ...chip, value1: '', value2: '' } : chip
    //   )
    // );

    // if (setFilterDataChip) {
    //   setFilterDataChip((prevData) => {
    //     const newData = { ...prevData };
    //     delete newData[keyname];
    //     return newData;
    //   });
    // }

    const topLabels = filterDataChip;
    let topLabels1 = null;
    
    Object.keys(topLabels).map((key) => {
      if (itemKey == key) {
        topLabels1 = topLabels[itemKey];
        topLabels1 = { ...topLabels1, value1: '', value2: '' };
        topLabels[itemKey] = topLabels1;
      }
    })
    console.log(topLabels);
    setToggleState(!ToggleState)
    setFilterDataChip(topLabels)

    let finalParams = finalRquest(filterDataChip);
     rr_dispatch(dispatchName(finalParams))
     rr_dispatch(dispatchName2(finalParams))

    // console.log("toggle state >>>>>>", filterDataChip);
  };

  
  useEffect(() => {
   
  }, [ToggleState])
  


  const resetAll = ()=> {
    window.location.reload();
  }

  // console.log(chipsCards);

  return (
    <>
    <div className="flex justify-between ">
    
      <div className="flex gap-2 pb-2 flex-wrap">
      {
        filterDataChip && Object.keys(filterDataChip).map( (key, index) => {
          let item = filterDataChip?.[key];
          console.log('item.value1 >> ', item)
          if(item.value1 != ""){
            return (
              <div key={index} className="bg-[#fff] p-3 relative">
                <span
                  className="absolute top-[-6px] right-[-6px] cursor-pointer"
                  onClick={() => handleLabelClose(key)}
                >
                  <MdCancel fill="#4448f5" size={18} />
                </span>
                <Typography className="text-[12px] text-[#000] font-semibold mb-1">
                  {item.label}
                </Typography>
                <div className="bg-[#e9edef] px-1 border border-theme rounded w-fit">
                  <Typography className="text-[12px] text-[#000] font-semibold">
                    {arrVal(key, item.value1)}{' '}
                    {item.value2 ? `- ${item.value2}` : ''}
                  </Typography>
                </div>
              </div>
            )
          }
        })
      }
      </div>
     
      <div>
   <Button className="mr-1 bg-theme text-[#fff] py-2 px-2 rounded shadow-none" onClick={resetAll} >   Reset</Button>
      </div>



    </div>

              

      
    </>
  );
};

export default FilterItemChips;
