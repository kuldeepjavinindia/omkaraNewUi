import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeMasterAPI } from "../../../store/slice/MasterSlice";
import { selectEmployee } from "../../../constants/helper";
import { Autocomplete, TextField } from "@mui/material";
import { AssignEmployeeApi } from "../../../store/slice/Data2Slice";

const ResultModal = () => {
  const { ResultModalBtn, setResultModalBtn } = useContext(GlobalContext);
  const handleOpen = () => setResultModalBtn(null);
  const [EmployeeMasterArr, setEmployeeMasterArr] = useState([]);

  const [EmployeeArr, setEmployeeArr] = useState([]);

  const rr_dispatch = useDispatch();


  const  {
    EmployeeMaster:{
      data: EMData,
      loading: EMLoading,
    }
  } = useSelector(state=>state.Masters)

  useEffect(() => {
  if(EMLoading){
    console.log('object')
    rr_dispatch(EmployeeMasterAPI())
  }    
  if(!EMLoading){
    // console.log('object')

    selectEmployee(EMData.data, setEmployeeMasterArr);
  }    
  }, [rr_dispatch , EMLoading])
  


  const submitForm = () => {
    const paramsData = {
            user_id:1,
            company_id: ResultModalBtn?.data?.company_id,
            employee_id: EmployeeArr.value,
            optionType:"0"
        }
        // console.log('paramsData ???? ', paramsData)
        rr_dispatch(AssignEmployeeApi(paramsData))
        setResultModalBtn(null)
  }




  


  return (
    <>
      <div>
        <Dialog
          open={ResultModalBtn?.type}
          // handler={handleOpen}
          size="xxl"
        >
          {
            // JSON.stringify(ResultModalBtn?.data)
          }
          <DialogHeader className="w-[50%] mx-auto justify-center text-[15px] font-semibold">
            
            ASSIGN COMPANY
          </DialogHeader>

          <DialogBody className="w-[50%] mx-auto pt-0">
            <div>
              <label className="text-[12px] text-[#000] font-medium">
                Company
              </label>
              <Input
                type="text"
                placeholder="Company"
                readOnly
                className=" !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100"
                labelProps={{ 
                  className: 'hidden'
                 }}
                 defaultValue={ResultModalBtn?.data?.company_name}
              />
            </div>

            <div>
              <label className="text-[12px] text-[#000] font-medium">
                Employees
              </label>
              

              <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={EmployeeMasterArr}
                    values={EmployeeArr}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newInputValue) => {
                      var val1 = [];
                      for (var a = 0; a < newInputValue.length; a++) {
                        val1.push(newInputValue[a].value);
                      }
                      // setInputs({ ...Inputs, ["Sector"]: val1 });
                      setEmployeeArr(newInputValue);
                    }}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        className=" text-[13px] px-2 hover:bg-gray-300 cursor-pointer  capitalize"
                      >
                        {option.title}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Select"
                        size="small"
                        className="capitalize"
                      />
                    )}
                  />


                 
              
            </div>

            {/* <label className="text-[12px]  text-[#000] font-medium">
              Sectors
            </label>
            <Select className="!border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ">
              <Option>Option 1</Option>
            </Select> */}
          </DialogBody>
          <DialogFooter className="justify-start w-[50%] mx-auto pt-0">
            <Button
              variant="text"
              className="mr-1 bg-theme text-[#fff] py-2 rounded"
              onClick={()=>{
                submitForm()
              }}
            >
              <span>SUBMIT</span>
            </Button>
            <Button
              variant="text"
              onClick={handleOpen}
              className="mr-1 bg-[#FAE0E0] text-[#DD2025] py-2 rounded"
            >
              <span>CANCEL AND GO BACK </span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default ResultModal;
