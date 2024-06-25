import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import FilterItemRender from './FilterItemRender'

const FilterChipsMain = () => {

  const {
    FilterChipsData,
    setFilterChipsData
  } = useContext(GlobalContext)

  const [ToggleState, setToggleState] = useState(false);


  const removeItem = (itemKey) => {
    console.log('itemKey >>> ', itemKey)
    const topLabels = FilterChipsData;
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
    setFilterChipsData(topLabels)
  }

  useEffect(() => {
    
  }, [ToggleState])

  return (
    <>
      {
        FilterChipsData && Object.keys(FilterChipsData).length > 0 && Object.keys(FilterChipsData).map((key, i)=>{
            // console.log('FilterChipsData >>>. ', key);
            return (
              <FilterItemRender 
                key={i}
                // showFilter={showFilter} 
                // setShowFilter={setShowFilter} 
                keys={key} itemData={FilterChipsData[key]} 
                onClick={() => removeItem(key)}
              />
            )
        })
      }
    </>
  )
}

export default FilterChipsMain
