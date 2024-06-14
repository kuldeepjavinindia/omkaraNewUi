import { Button } from '@material-tailwind/react';
import { Autocomplete, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Radio, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allCompanyMasterAPI } from '../../../store/slice/MasterSlice';
import CompanySearchSelectBox from '../../CompanySearchSelectbox';
import { GlobalContext } from '../../../context/GlobalContext';

const PeerToPeerTrendChooseField = (props) => {
    

    const {
        applyAction,
        RatioObj, setRatioObj,
        selectedValue, setSelectedValue
    } = props;

    const {
        // PeersAnalyticsCancelRef,
        PeersBtnRef1,
      } = useContext(GlobalContext)




    const [ShowDiv, setShowDiv] = useState(false);
    const [AllCompanies, setAllCompanies] = useState([])
    const [SelectedCompanies, setSelectedCompanies] = useState([])
    const [Companies, setCompanies] = useState([]);
    const [RatiosCategory, setRatiosCategory] = useState([])
    const [Disabled, setDisabled] = useState(false);
    // const [Companies, setCompanies] = useState(false);

    const rr_dispatch = useDispatch();


    
  const {
    RatioMaster: { data: RMData, loading: RMLoading,  selected_companies, other_companies },
  } = useSelector((state) => state.Masters);




    
    useEffect(()=>{
        if(!RMLoading){
          setSelectedCompanies(selected_companies)
        //   setCompanies(other_companies)
          const uniquePeerRatioData = [...new Set(RMData.map(item => item?.category))];
          setRatiosCategory(uniquePeerRatioData)
        }

    },[RMLoading])


    useEffect(() => {
        setSelectedCompanies([]);
        // setCompanies([]);
    },[props])

    // useEffect(() => {
    //     if(allCmpLoading){
    //         rr_dispatch(allCompanyMasterAPI())
    //     }
    //     if(!allCmpLoading){
    //         var data1 = [];
    //         allCmpData.map((item) => {
    //             // var d1 = { label: item.CompanyName, title: item.CompanyName, name: item.CompanyName, value: item.CompanyID };
    //             var d1 = {title:item.CompanyName,name:item.CompanyName,value:item.CompanyID};
    //             data1.push(d1);
    //     })
    //         data1.sort((a, b) => {
    //             var a1 = a.title.toLowerCase();
    //             var b1 = b.title.toLowerCase();
        
    //             if (a1 > b1) {
    //                 return 1
    //             } else
    //                 if (a1 < b1) {
    //                     return -1
    //                 } else {
    //                     return 0
    //                 }
    //         })
    //         setAllCompanies(data1);
    //     }
    // }, [rr_dispatch, allCmpLoading])
    

    useEffect(() => {
        if(Companies.length > 4){
          setDisabled(true)
        }else{
          setDisabled(false)
        }
      }, [Companies])

    


  return (
    <>
      {
        ShowDiv ?

        <>






<div>


        <div className='flex justify-between gap-2 p-2 items-center'>
            <Typography className=' !text-[1.1rem] text-black'>
                Please select upto 5 companies and 1 chart type!
            </Typography>

            <div className='flex justify-end gap-2 mb-2'>
            <Button
                disabled={ !selectedValue || Companies.length == 0 > 5 ? true : false}
                variant='contained'
                size="sm"
                color='green'
                onClick={() => { applyAction(selectedValue, Companies.map(item=>item.CompanyID)); setShowDiv(!ShowDiv); }}
            >
                Apply
            </Button>
            
            
            <Button
                variant='contained'
                size="sm"
                color='red'
                onClick={() => setShowDiv(!ShowDiv)}
            >
                Cancel
            </Button>
            </div>  
        </div>

<div className='bg-white'>
      {/* <Autocomplete
          id="free-solo-2-demo0"
          disableClearable
          size="small"
          options={AllCompanies}
          multiple={true}
          disableCloseOnSelect
          defaultValue={SelectedCompanies}
          getOptionDisabled={(options) => {
              if (Companies.length >= 5) {
                  if (!Companies.includes(options?.value)) {
                      return true
                  }
              }
          }}
          onChange={(evt, newVal) => {
              var val1 = [];
              for (var a = 0; a < newVal.length; a++) {
                  val1.push(newVal[a]?.value);
              }
              setSelectedCompanies(newVal);
              setCompanies(val1);
          }}
          sx={{ width: '100%', borderColor: "#000" }}
          getOptionLabel={(option) => option.title}
          // renderOption={(props, option) => <li {...props}>{option.title}</li>}
          renderInput={(params) => (
          <>
              <TextField size="small" {...params} placeholder="Select..." className='aaaaaa' sx={{ borderColor: "#000" }} />
          </>
          )}
      /> */}


    {/*Start Search and Select box component */}
       <CompanySearchSelectBox Companies={Companies} setCompanies={setCompanies} Disabled={Disabled} setDisabled={setDisabled} />
    {/*End Search and Select box component */}



  </div>

  <div className='w-full grid grid-cols-5 bg-white mt-2'>

  {
                              RatiosCategory.length > 0 && RatiosCategory.map((c_item, i) => {
                                  return (
                                      <div className="ChooseFieldItem" key={i}>

                                          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                  subheader={<ListSubheader sx={{ fontSize: 18 }}>{c_item}</ListSubheader>}
                                              >
                                                  {RMData && RMData.length > 0 && RMData.filter(fItm=>fItm.category === c_item).map((value, i1) => {
                                                      const labelId = `checkbox-list-label-${i1}`;
                                                      return (
                                                          <ListItem
                                                              key={value.title}
                                                              disablePadding
                                                          >
                                                              <ListItemButton role={undefined} onClick={() =>  {
                                                                setSelectedValue(value.ID)
                                                                setRatioObj(value)
                                                              }} dense>
                                                                  <ListItemIcon
                                                                      sx={{
                                                                          minWidth: '1rem',
                                                                      }}
                                                                  >
                                                                      <Radio
                                                                          sx={{
                                                                              padding: '0 0.3rem 0 0rem'
                                                                          }}
                                                                          checked={selectedValue === value.ID}
                                                                          size="small"
                                                                          value={value.ID}
                                                                          name="radio-buttons"
                                                                          inputProps={{ 'aria-label': 'A' }}
                                                                      />
                                                                  </ListItemIcon>
                                                                  <ListItemText id={labelId}
                                                                      primary={<Typography fontSize={12} >{value.Name}</Typography>}
                                                                  />
                                                              </ListItemButton>
                                                          </ListItem>
                                                      );
                                                  })}
                                              </List>
                                      </div>
                                  )
                              })
                          }
  </div>

                          



</div>



        
        </>
        :
        <>
        <div className='flex justify-end gap-2 mb-2'>
            <Button className=' text-theme border-theme'  size="sm"variant='outlined' onClick={()=>{
                PeersBtnRef1.current.click()
            }}>Cancel</Button>
            <Button className=' bg-theme' size="sm" onClick={()=>{
                setShowDiv(!ShowDiv)
            }} >Select Companies</Button>
        </div>


        </>
        
      }

    </>



  )
}

export default PeerToPeerTrendChooseField
