import { useContext, useEffect, useState } from 'react'

import {
    Drawer,
    Button,
    Typography,
    IconButton,
    ListItem,
  } from "@material-tailwind/react";
import { GlobalContext } from '../../../context/GlobalContext';
import { useDispatch, useSelector } from 'react-redux';
import { allCompanyMasterAPI } from '../../../store/slice/MasterSlice';
import { Autocomplete, Box, Checkbox, Chip, Container, Divider, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';

// PeersModal, setPeersModal

const PeerDrawer = () => {

    
  const {
    
    allCompanyMaster:{
        data: allCmpData,
        loading: allCmpLoading
    },
    RatioMaster: { data: RMData, loading: RMLoading,  selected_companies, other_companies },
  } = useSelector((state) => state.Masters);

  const [ChipData, setChipData] = useState(RMData);
  const [checked, setChecked] = useState([]);
  const [ItemList, setItemList] = useState([]);
  const [SelectedCompanies, setSelectedCompanies] = useState([]);
  const [Companies, setCompanies] = useState([]);
  const [RatiosCategory, setRatiosCategory] = useState([]);
  const [CheckBoxDisable, setCheckBoxDisable] = useState(false);



  const {
    PeersModal,
    setPeersModal
  } = useContext(GlobalContext)

  
  const rr_dispatch = useDispatch();


  const selectCompany = () => {
    if( allCmpData.length > 0 ){
      var data1 = [];
      allCmpData.map((item)=>{
        var d1 = {title:item.CompanyName,name:item.CompanyName,value:item.CompanyID};
        data1.push(d1);
      })
      
      data1.sort(function(a, b){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
      })
      setItemList(data1);
    }
  }


  useEffect(() => {
    if(allCmpLoading){
        rr_dispatch(allCompanyMasterAPI())
    }
    if(!allCmpLoading){
        // selectCompany()


        var data1 = [];
        allCmpData.map((item) => {
            // var d1 = { label: item.CompanyName, title: item.CompanyName, name: item.CompanyName, value: item.CompanyID };
            var d1 = {title:item.CompanyName,name:item.CompanyName,value:item.CompanyID};
            data1.push(d1);
    })
        data1.sort((a, b) => {
            var a1 = a.title.toLowerCase();
            var b1 = b.title.toLowerCase();
    
            if (a1 > b1) {
                return 1
            } else
                if (a1 < b1) {
                    return -1
                } else {
                    return 0
                }
        })
        setItemList(data1);


    }
}, [rr_dispatch, allCmpLoading])




useEffect(()=>{
    if(!RMLoading){
      // console.log('selected_companies ???? >', selected_companies)
      setSelectedCompanies(selected_companies)
      setCompanies(other_companies)
      const uniquePeerRatioData = [...new Set(RMData.map(item => item?.category))];
      // console.log('uniqueRMData >> ', uniqueRMData)
      setRatiosCategory(uniquePeerRatioData)
      let selectedData = RMData.filter(item=>item?.is_selected === true);
      setChipData(selectedData)
      setChecked(selectedData.map(item=>item.ID));
    }
  },[RMLoading])

  
  const FilterPeers = () => {
    // dispatch({
    //   type:'PEER_RATIOS_SELECTED',
    //   payload: ChipData.map(item=>item.ID)
    // })
    // dispatch({
    //   type:'PEER_RATIOS_SELECTED_COMPANY',
    //   payload: SelectedCompanies
    // })
    // toggleDrawer('bottom', false)(e)
  }
  const handleToggle = (item) => () => {

    
    let value = item.ID;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    
    if (currentIndex === -1) {
      let a00 = ChipData;
          a00.push(item);
        setChipData(a00);
      newChecked.push(value);
    } else {          
      setChipData((chips) => chips.filter((chip) => chip.ID !== item.ID));
      newChecked.splice(currentIndex, 1);
    }

    // console.log('newChecked >> ', newChecked, (newChecked.length >= 10))
    if(newChecked.length >= 10){
      setCheckBoxDisable(true)
    }else{
      setCheckBoxDisable(false)
    }

    setChecked(newChecked);
  };







  const closeDrawer = () => setPeersModal(false);


  



  return (
    <>
      
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Drawer open={PeersModal} onClose={closeDrawer} className="p-4" size={"85%"} placement='bottom'>



{/* {JSON.stringify(ItemList)} */}




      <Box
      sx={{
        // width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "600px",
      }}
      className=" overflow-auto"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Container>
        <Box sx={{ 
              display:'flex',
              gap:".5rem",
              marginTop:'1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
             }} >
        <Typography
          variant="h5"
          sx={{
            margin: ".5rem 0rem 0",
            fontSize:'1rem',
            // fontWeight:'500'
          }}
        >
          {/* Manage Ratios*/}
          Please select upto 5 companies and Multiple Ratios!

        </Typography>
        <div style={{ 
              display:'flex',
              gap:".5rem",
              marginTop:'1rem'
             }}>
              <Button disabled={ChipData.length === 0 ? true : false } onClick={(e)=>FilterPeers(e)} variant="contained" className='  bg-theme' size="sm">Apply</Button>
              <Button onClick={closeDrawer} variant="outlined" color='red' size="sm">Cancel</Button>
            </div>

        </Box>
        <Divider
            sx={{
              marginTop: 1,
              marginBottom: 2,
            }}
          />
        <Box>
          <Box sx={{
              marginBottom: 2,
            }}>
            <Box sx={{ 
              width:'100%',
              // maxWidth:'350px'
             }}>
              <Typography sx={{ 

               }}>Choose Company</Typography>

    <Autocomplete
          id="free-solo-2-demo0"
          disableClearable
          size="small"
          options={ItemList}
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
      />



              {/* <Autocomplete
                id="free-solo-2-demo"
                disableClearable
                size="small"
                options={ItemList}
                multiple={true}
                disableCloseOnSelect
                defaultValue={SelectedCompanies}
                getOptionDisabled={(options) => {
                  if (Companies.length >= 5) {
                      if (!Companies.includes(options.value)) {
                          return true
                      }
                  }
                }}
                onChange={(evt, newVal) => {
                  var val1 = [];
                  for (var a = 0; a < newVal.length; a++) {
                      val1.push(newVal[a].value);
                  }
                  // console.log('newVal >>>> ', newVal)
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
             </Box>
          </Box>
          <Box>
            {
              ChipData.length === 0 ? (
                <Typography variant="h6" sx={{ color:'#c93333', fontSize:'1rem' }}>At least one column must be selected.</Typography>
              ) : 
                <>
                  <Typography sx={{ }}>Selected Ratios</Typography>
                </>
            }
            
            
            <Box sx={{ 
              gap:'.2rem',
              display:'flex',
              flexWrap:'wrap',
             }}>
              {ChipData.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    label={item?.Name}
                    // onDelete={(e) => handleDelete(e, item)}
                  />
                );
              })}
            </Box>
            
          </Box>
          <Divider
            sx={{
              paddingY: 2,
            }}
          />
          <Box>
            
          <Typography variant="h6"  sx={{ marginTop: '1rem' }}>Manage Ratios</Typography>
          <Box sx={{ 
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginTop:'.5rem'
           }}>
            {
              RatiosCategory.map((c_item, i0)=>{
                  return (
                    <Box key={i0} >
                      <Typography sx={{ 
                        fontWeight:'600',
                        fontSize:'.9rem',
                       }}>{c_item}</Typography>
                       <Box >
                       <List sx={{ width: "100%", bgcolor: "background.paper", paddingTop:'0' }}>
                        {RMData && RMData.length > 0 && RMData.filter(fItm=>fItm.category === c_item).map((item) => {
                            
                          let crtItem = ChipData.find(cItm => cItm?.ID===item?.ID);
                          let value = item.ID;
                          const labelId = `checkbox-list-label-${value}`;
                          
                          return (
                            <>

                  <ListItem
                    key={value}
                    secondaryAction={
                      <>
                        {/* <IconButton edge="end" aria-label="comments">
                          <CommentIcon />
                        </IconButton> */}
                      </>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(item)}
                      dense
                      disabled={!ChipData.find(cItm => cItm?.ID===item?.ID) && CheckBoxDisable}
                    >
                      <ListItemIcon sx={{ minWidth:'auto', padding:'0' }} >
                        <Checkbox
                          edge="start"
                          // checked={checked.indexOf(value) !== -1}
                          checked={(crtItem !== undefined && crtItem !== null) ? true : false}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                          size="small"
                          sx={{ minWidth:'auto', padding:'0', paddingRight:'0.2rem' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '.8rem'}} 
                        id={labelId}
                        primary={`${item.Name}`}
                      />
                    </ListItemButton>
                  </ListItem>
                            </>
                          )
                        })}


                       </List>
                          
                       </Box>
                    </Box>
                  )
              })
            }
            <Box>
              
            </Box>
          </Box>

          </Box>
        </Box>
      </Container>
    </Box>




        {/* <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
          <Button size="sm" variant="outlined">
            Documentation
          </Button>
          <Button size="sm">Get Started</Button>
        </div> */}


      </Drawer>



    </>
  )
}

export default PeerDrawer
