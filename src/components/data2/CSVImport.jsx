import {
  Select,
  Typography,
  Option,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { WLBulkUploadAPI } from "../../store/slice/WatchListSlice";
import WatchListBulkUploadModal from "../CompanyDetail/Modals/WatchListBulkUploadModal";

const CSVImport = (props) => {
  const { ImportBtn, setImportBtn } = props;
  const rr_dispatch = useDispatch()

  const [SelectType, setSelectType] = useState("");
  const [CSVCodeData, setCSVCodeData] = useState(null);
  const [StatusOpen, setStatusOpen] = useState(false);


  
  const changeFile = (e) => {
  

    const file = e.target.files[0];
    
      if(file?.type === "text/csv"){
          Papa.parse(file, {
            complete: (result) => {
              // The parsed CSV data is available in the result.data array
              console.log(result.data);
              let a0 = result.data;
              let newD = [];
              a0.map(item=>{
                let firstCol = Object.keys(item)?.[0];
                if(item[firstCol]){
                  let NewOb = {
                    type: SelectType,
                    code:item[firstCol]
                  }
                  newD.push(NewOb)
                }
              });
              setCSVCodeData(newD);
            },
            header: true, // Set to true if your CSV has a header row
          });
      }else{
          if (file) {
              const reader = new FileReader();
        
              reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
        
                // Assuming the first sheet in the Excel file is the one you want to convert
                const sheetName = workbook.SheetNames[0];
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                  let a0 = sheetData;
                  let newD = [];
                  a0.map(item=>{
                  let firstCol = Object.keys(item)?.[0];
                    if(item[firstCol]){
                      let NewOb = {
                        type: SelectType,
                        code:item[firstCol]
                      }
                      newD.push(NewOb)
                    }
                  });
                //   console.log('========sheetData============================');
                //   console.log("sheetData >> ", sheetData);
                //   console.log(newD);
                //   console.log('=====sheetData===============================');
                  setCSVCodeData(newD);
              };
        
              reader.readAsArrayBuffer(file);
            }
      }

    
  };


  
  const submitCsvUpload = () => {
      
    let currentWishlist = localStorage.getItem('selectedWL') ? JSON.parse(localStorage.getItem('selectedWL')) : null;
    let params = {
      UserID: currentWishlist?.UserID,
      WatchListID: currentWishlist?.ID,
      CodeData: CSVCodeData
    }
    // console.log('params ??? ', params)
    rr_dispatch(WLBulkUploadAPI(params)) 
    setStatusOpen(true);

  }





  return (
    <>
        <WatchListBulkUploadModal setStatusOpen={setStatusOpen} StatusOpen={StatusOpen} />
      <div className="p-4 mb-5 border border-[#C7C8FC] rounded w-[35%]">
        <Typography className="text-[15px]  font-semibold mb-3 text-[#000]">
          Multiple Companies Upload
        </Typography>

        <div className="mb-2">
          <Select
            label="Select Version"
            value={SelectType}
            onChange={(val) => setSelectType(val)}
            className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 bg-[#E9EDEF]"
            labelProps={{
              className: "hidden",
            }}
          >
            <Option value="">Select Code Type</Option>
            <Option value="NSE">NSE</Option>
            <Option value="BSE">BSE</Option>
          </Select>
        </div>

        <Input
          type="file"
          placeholder="Enter Name"
          className="mt-1 !border !border-gray-200  !bg-[#E9EDEF] text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 mb-8"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[100px]" }}
          onChange={(e)=>changeFile(e)}
          accept='.csv, .xlsx, .xls'
          // onChange={(e)=>filterData(e, 'search')}
        />

        <Button className="mr-5 mt-5 bg-theme text-[#fff] py-2 rounded" onClick={()=> {
            submitCsvUpload()
        }}>
          <span>SUBMIT</span>
        </Button>
        <Button
          onClick={() => {
            setImportBtn(!ImportBtn);
          }}
          className="mr-1 mt-5 bg-[#FAE0E0] text-[#DD2025] py-2 rounded"
        >
          <span>CLOSE</span>
        </Button>
      </div>
    </>
  );
};

export default CSVImport;
