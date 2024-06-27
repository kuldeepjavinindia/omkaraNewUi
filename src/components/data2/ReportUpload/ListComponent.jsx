import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { Box, ListSubheader } from '@mui/material';
import { useState } from 'react';
import QuarterlyComponent from './QuarterlyComponent';

export default function ListComponent(props) {
  const { 
    lisTitle, 
    listArr,
    name,
    QuarterlyName,
    Inputs,
    RadioReset,
    setRadioReset,
    IsEdit,
    setInputs
 } = props;
  const [checked, setChecked] = React.useState([]);
  const [RadioVal, setRadioVal] = React.useState({});

  const handleToggle = (value) => () => {
    setRadioReset(false);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setInputs({ ...Inputs, [name]: newChecked });
    setChecked(newChecked);
    
  };
  const [ListDataArr, setListDataArr] = useState([])

  
  React.useEffect(() => {
    if(IsEdit && checked.length === 0){
      let newChecked = Inputs[name] ? Inputs[name] : [];
      setChecked(newChecked)
  }
  }, [checked])
 
  

  React.useEffect(() => {
    if(RadioReset){
      setChecked([])
      setRadioReset(true)
    }
  }, [RadioReset])

  

  React.useEffect(() => {
    // console.log(lisTitle, listArr)

    if(listArr && listArr.length > 0){
        let Arr = [];
        let arrName = "";
        Object.keys(listArr[0]).map((k_it, i)=>{
            if(i === 1){
                arrName = k_it;
            }
            console.log(k_it);

        })

        let isQ = {};
        
        let QuarterlyName_d = Inputs[QuarterlyName];

        listArr.map((it, i)=>{
          // let val1 = checked[it.ID];
          let a10 = "";
          let indexOd0 = checked.indexOf(it.ID);

            
          // console.log('checked[it.ID] >>> ', checked.indexOf(it.ID), it.ID); 
          if(indexOd0 !== -1 && name != "OthersReports"){
            let QuarterlyName_d = Inputs[QuarterlyName];



            // console.log('brokerageQuarterly', 'QuarterlyName_d <><><><><>><>', QuarterlyName, QuarterlyName_d)
 

            
            // console.log('QuarterlyName_d000000000000000000 >>>', QuarterlyName_d[it.ID], QuarterlyName_d,  indexOd0);
            
            if(QuarterlyName_d && QuarterlyName_d[it.ID]){  
              console.log('enter >>>', it.ID);
                  a10 = QuarterlyName_d[it.ID];
                  if(a10 === undefined){
                    a10 = ''
                  }
                  console.log('a10 >>>> ', a10);
                }
              }

            isQ = { ...isQ, [it.ID]: a10  }
            const item = {
                "id":it.ID,
                "name":it[arrName],
                "SubMenu":it?.SubMenu,
            }
            Arr.push(item);
        })

        console.log('isQ >>>--->>> isQ isQ isQ', isQ)

        setRadioVal(isQ);
        
        setListDataArr(Arr);
    }

    // setListDataArr
  }, [listArr])
  
    
  
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }} subheader={<ListSubheader>{lisTitle || 'title'}</ListSubheader>}>
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
                        <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                        <Box>
                            <Box sx={{ display:'flex',  }}>
                                <ListItemIcon
                                        sx={{ minWidth: 'unset', width:'fit-content' }}>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(item.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        sx={{ paddingY:0, minWidth: 'unset', width:'fit-content'}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value}`} />
                            </Box>
                            
                        </Box>
                        </ListItemButton>
                    {
                        checked.includes(item.id) && item.SubMenu === 'Yes' && (
                            <>
                                <Box sx={{ paddingX: '1rem', width:'100%' }}>
                                    <QuarterlyComponent IsEdit={IsEdit} Inputs={Inputs} setInputs={setInputs} name={QuarterlyName} isArray={true} item={item} RadioVal={RadioVal} setRadioVal={setRadioVal} />
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