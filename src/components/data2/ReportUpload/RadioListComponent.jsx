import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Box, ListSubheader, Radio } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import QuarterlyComponent from './QuarterlyComponent';




export default function RadioListComponent(props) {

  
  const { 
    lisTitle, 
    listArr,
    name,
    QuarterlyName,
    Inputs,
    IsEdit,
    ResetData,
    RadioReset,
    setRadioReset,
    setInputs } = props;


  const [checked, setChecked] = React.useState([]);
  const [RadioVal, setRadioVal] = React.useState(null);

  // const [RadioReset, setRadioReset] = React.useState(false);


  // const ResetComp = () => {
  //   setChecked([])
  //   setRadioReset(true)
  // }

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setRadioReset(false);
  //   setChecked(newChecked);
    
  // };


  const handleChange1 = (event) => {
    setRadioReset(false);
    setInputs({ ...Inputs, [name]: event });
    // console.log(event);
    setChecked(event);
  };
  
  const controlProps = (item) => ({
    checked: checked == item,
    // onChange: handleChange1,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const [ListDataArr, setListDataArr] = useState([])


  
  useEffect(() => {
    
    console.log('Inputs checked loadddddd >>> ', checked.length, Inputs[name]);
    
    if(IsEdit && Array.isArray(checked) && checked.length === 0 && Inputs[name] != ""){
        let newChecked = Inputs[name] ? Inputs[name] : [];
        if(newChecked){
          setChecked(newChecked)
          setRadioVal(Inputs[QuarterlyName]);
        }else{
          console.log('newChecked.length 0000 000 enter', 'sasasasasasas'); 
          setChecked(null)
        }
    }
  }, [checked, Inputs, RadioVal])
  

  
  React.useEffect(() => {

    if(listArr && listArr.length > 0){
        let Arr = [];
        let arrName = "";
        Object.keys(listArr[0]).map((k_it, i)=>{
            if(i === 1){
                arrName = k_it;
            }
            console.log(k_it);
        })

        // let isQ = {};
      
        listArr.map((it, i)=>{
            const item = {
                "id":it.ID,
                "name":it[arrName],
                "SubMenu":it?.SubMenu,
            }
            Arr.push(item); 
        })
        setListDataArr(Arr);
        // console.log('Inputs[QuarterlyName] <<<<<<>>>>sss>>>>>',QuarterlyName, Inputs[QuarterlyName], Inputs);
        
      }

    // console.log('Inputs[QuarterlyName] >>>>>>>> ', Inputs)
    // setListDataArr

  }, [listArr])


  useEffect(() => {
    setInputs({...Inputs, 'companyreportQuarterly':""})
  }, [checked])

  useEffect(() => {
    if(RadioReset){
      setChecked([])
      setRadioReset(true)
      setInputs({...Inputs, 'companyreportQuarterly':"", 'companyreport':""})
    }
  }, [RadioReset])
  
  
    
  
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }} subheader={<ListSubheader>{lisTitle || 'title'} 
      {/* {Inputs.companyreport &&
        (<IconButton variant='outlined' size="small" onClick={()=>ResetComp()}>
          <RefreshIcon size={"small"} />
        </IconButton>)
      } */}
    </ListSubheader>}>
        {
            ListDataArr && ListDataArr.map((item, i)=>{
                const labelId = `checkbox-list-label-${i}`;
                const value = item.name;
                
                return (
                    <ListItem
                        key={value}
                        disablePadding
                        className='aaaaaa'
                        sx={{ flexDirection:'column', alignItems: 'flex-start' }}
                    >
                        <ListItemButton role={undefined} onClick={(e)=>handleChange1(item.id)} dense>
                        <Box>
                            <Box sx={{ display:'flex',  }}>
                                <ListItemIcon
                                        sx={{ minWidth: 'unset', width:'fit-content' }}>
                                          
                                    <Radio {...controlProps(item.id)} sx={{ paddingY:0, minWidth: 'unset', width:'fit-content'}} />
                                    
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value}`} />
                            </Box>
                            
                        </Box>
                        </ListItemButton>
                    {
                        checked == item.id && item.SubMenu === 'Yes' && (
                            <>
                                <Box sx={{ paddingX: '2rem', width:'100%' }}>
                                    <QuarterlyComponent IsEdit={IsEdit}
    Inputs={Inputs} setInputs={setInputs} name={QuarterlyName} isArray={false} item={item} RadioVal={RadioVal} setRadioVal={setRadioVal} />
                                </Box>
                            </>
                        )
                    }

                    </ListItem>
                )
            })
        }
        
    </List>
  );
}