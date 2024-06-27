import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const QuarterlyComponent = (props) => {
const {
    RadioVal, 
    setRadioVal, 
    item, 
    IsEdit, 
    isArray,
    Inputs,
    setInputs, name
} = props;

const dispatch = useDispatch();
    const radioChange = (event) => {
        let val = event.target.value;
        if(!isArray){
            setRadioVal(val);
        }else{
            let checked = RadioVal;
            checked = {...checked, [item.id]: val};
            setRadioVal(checked);
            val = checked;
        }
        
        setInputs({ ...Inputs, [name]: val });
      };
      useEffect(() => {
        if(!isArray && !IsEdit){
            setRadioVal("")
        }
    }, [dispatch])
      
      
  return ( 
    <>
     <div>
        {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={isArray ? RadioVal[item.id] : RadioVal }
            onChange={radioChange}
            sx={{ flexDirection:'row', paddingLeft:'2rem' }}
            className='radioGroup'
        >
            <FormControlLabel value="Q1" control={<Radio size="small" sx={{ paddingY:0,paddingLeft:0,paddingRight:'4px', }} />} label="Q1" sx={{ fontSize:'12px' }} />
            <FormControlLabel value="Q2" control={<Radio size="small" sx={{ paddingY:0,paddingLeft:0,paddingRight:'4px', }} />} label="Q2" sx={{ fontSize:'12px' }} />
            <FormControlLabel value="Q3" control={<Radio size="small" sx={{ paddingY:0,paddingLeft:0,paddingRight:'4px', }} />} label="Q3" sx={{ fontSize:'12px' }} />
            <FormControlLabel value="Q4" control={<Radio size="small" sx={{ paddingY:0,paddingLeft:0,paddingRight:'4px', }} />} label="Q4" sx={{ fontSize:'12px' }} />
        </RadioGroup>
    </div>
    </>
  )
}

export default QuarterlyComponent