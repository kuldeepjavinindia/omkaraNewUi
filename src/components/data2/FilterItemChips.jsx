import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';

const FilterItemChips = () => {
  const {
    sectorMaster: { loading: sectorMasterLoading, data: sectorMasterData },
    industryMaster: {
      loading: industryMasterLoading,
      data: industryMasterData,
    },
    allCompanyMaster: { loading: allCompanyLoading, data: allCompanyData },
  } = useSelector((state) => state.Masters);

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
        return allCompanyData
          .filter((item) => itemval.includes(item.CompanyID))
          .map((item) => item.CompanyName)
          .join(', ');
      case 'sectors':
        return sectorMasterData
          .filter((item) => itemval.includes(item.sectorID))
          .map((item) => item.Sector)
          .join(', ');
      case 'industry':
        return industryMasterData
          .filter((item) => itemval.includes(item.IndustryID))
          .map((item) => item.Industry)
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


  };

  
  useEffect(() => {
    
  }, [ToggleState])
  

  // console.log(chipsCards);

  return (
    <>
      <div className="flex gap-2 pb-2">
        {/* {
          JSON.stringify(chipsCards)
        } */}
        {/* {chipsCards
          .filter((item) => item.value1 !== '' || item.value2 !== '')
          .map((item, index) => {


            return (
              <div key={index} className="bg-[#fff] p-3 relative">
                <span
                  className="absolute top-[-6px] right-[-6px] cursor-pointer"
                  onClick={() => handleLabelClose(item.keyname)}
                >
                  <MdCancel fill="#4448f5" size={18} />
                </span>
                <Typography className="text-[12px] text-[#000] font-semibold mb-1">
                  {item.label}
                </Typography>
                <div className="bg-[#e9edef] px-1 border border-theme rounded w-fit">
                  <Typography className="text-[12px] text-[#000] font-semibold">
                    {arrVal(item.keyname, item.value1)}{' '}
                    {item.value2 ? `- ${item.value2}` : ''}
                  </Typography>
                </div>
              </div>
            )
          })} */} 


 

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
    </>
  );
};

export default FilterItemChips;
