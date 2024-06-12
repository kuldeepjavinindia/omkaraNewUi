import {
  Button,
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
  Spinner,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Radio,
  Checkbox,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { SentNotificationApi, UserNotificationApi } from "../../../store/slice/SingleCompnaySlice";
import { useAuthState } from "../../../context/AuthContext";

const SendNotificationModal = (props) => {
  const { modalTitle } = props;

  const notificationType = [
    {
      label: "Whatsapp Only",
      value: "Whatsapp",
    },
    {
      label: "E-Mail Only",
      value: "E-Mail",
    },
    {
      label: "Both",
      value: "Both",
    },
  ];

  const rr_dispatch = useDispatch();


  const [Inputs, setInputs] = useState({
    
});
  const authState = useAuthState();

  const [selected, setSelected] = useState([]);
  const [TableRowData, setTableRowData] = useState([]);
  const [AllTableRowData, setAllTableRowData] = useState([]);
  const [Type, setType] = useState(notificationType?.[0].value);

  const {
    companyNotes: { loading: cmpNotesLoading, data: cmpNotesData },
    UserNotification:{
      data: UNData,
      loading: UNLoading,
    },
    SentNotification:{
      // data: SNData,
      loading: SNLoading,
    }
  } = useSelector(state=>state.SingleCompany)

  
  // const {
  //   companyNotes: { loading: cmpNotesLoading, data: cmpNotesData },
  // } = useSelector((state) => state.SingleCompany);
  
  const companyData = cmpNotesData?.Data?.[0] || {};


  const {
    SendNotification,
    setSendNotification
  } = useContext(GlobalContext);

  const submitForm = () => {

    var dataR = {};
    dataR = {
        ...dataR,
        comName: companyData.CompanyName,
        comId: SendNotification?.CompanyID,
        userId: authState?.user?.UserId,
        docId: SendNotification?.FileID,
        dateTime: SendNotification?.Date,
        docName: SendNotification?.fileName,
        messageFor: Inputs.notification_on,
        message: Inputs.message,
        sendUserIds: selected
    }
    rr_dispatch(SentNotificationApi(dataR));

  };
  const handleOpen = () => {
    setSendNotification(null);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;


  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = TableRowData.map((n) => n?.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    // console.log(selected);
    
  };







  
  
  const requestSearch = (e) => {
    let searchedVal = e.target.value;
  if(searchedVal.length === 0 || searchedVal.length > 2){

    const filteredRows = AllTableRowData.filter((row, r0) => {
      if(row){
        return Object.keys(row).some((key) => {
          if(key == "name" || key == "email" || key == "mobile"){
            if(key){
              return row[key] ? String(row[key]).toLowerCase().includes(searchedVal.toLowerCase()) :  false;
            }
          }
        });
      }
    });
    if (searchedVal.length < 1) {
      setTableRowData(AllTableRowData)
    }
    else {
      setTableRowData(filteredRows)
    }
  }
  };


  const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let prevInput = Inputs
      prevInput = {
        ...prevInput,
        [name]: value
      };

      setInputs(prevInput)

  }


  let UploadDocumentAnalysLoading = false;
  
  useEffect(() => {
      if(UNLoading){
        rr_dispatch(UserNotificationApi({dataFor: "vdr"}))
      }
      if(!UNLoading){
        // rr_dispatch(UserNotificationApi())
      setTableRowData(UNData);
      setAllTableRowData(UNData);
      }
  }, [rr_dispatch, UNLoading])
  
  useEffect(() => {
    if(!SNLoading){
      setSendNotification(null);
    }
  }, [rr_dispatch, SNLoading])
  

  return (
    <>
      <div>
        <Dialog
          open={SendNotification}
          // handler={handleOpen}
          size="xxl"
        >
          <DialogHeader className="w-full max-w-[700px] mx-auto justify-center text-[18px] p-0 mb-2">
            {modalTitle ||
              `${companyData.CompanyName}: (${SendNotification?.fileName})`}
          </DialogHeader>

          <DialogBody className="w-full max-w-[700px] mx-auto pt-0 max-h-5/6 overflow-auto">
            {UploadDocumentAnalysLoading ? (
              <>
                <div className=" flex gap-1">
                  <Spinner /> Please wait...
                </div>
              </>
            ) : (
              <>
                <div className="mb-1">
                  <div className="mb-2">
                    <Input
                        label="Search"
                        onChange={(e)=>{
                          requestSearch(e)
                        }}
                    />
                  </div>

                  <div className=" h-[50vh] overflow-auto ">
                   
                    <table className=" relative w-full table-auto text-left ">
                      <thead className=" sticky  z-[1] top-0 bg-red-500 ">
                        <tr >
                          <th className="text-ellipsis border-b border-blue-gray-100 bg-[#22242F] text-white p-2 text-[13px] font-medium w-10">
                            <Checkbox 
                              onClick={(e)=>{
                                handleSelectAllClick(e)
                              }}
                              color="indigo"
                            />
                          </th>
                          <th className="text-ellipsis border-b border-blue-gray-100 bg-[#22242F] text-white p-2 text-[13px] font-medium">
                            User Name 
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          TableRowData && TableRowData.length > 0 && TableRowData.map((item, i)=>{
                            
                            const isItemSelected = isSelected(item?.id);

                            return (
                              <Fragment key={i}>
                                <tr className="odd:bg-[#E8F0F4] even:bg-[#fff] cursor-pointer" 
                        onClick={(event) => handleClick(event, item?.id)} 
                         >
                                  <td className="px-2 py-1 text-[13px] font-medium border-b border-blue-gray-100 ">
                                    <Checkbox  checked={isItemSelected} 
                              color="indigo"/>
                                  </td>
                                  <td className="px-2 py-1 text-[13px] font-medium border-b border-blue-gray-100 ">
                                    <div>
                                        <div>{item?.name || ""}</div>
                                        <div>
                                          <span>{item?.email || ""}</span> |  <span>{item?.mobile || ""}</span>
                                        </div>
                                    </div>
                                  </td>
                                </tr>
                              </Fragment>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  <div>
                    
                    <List className="px-0">
                      {notificationType.map((item, i) => {
                        return (
                          <ListItem className="p-0" key={i}
                          // onClick={() => {
                          //   setType(item.value);
                          // }}
                          ripple={false}
                          >
                            <label
                              htmlFor={"vertical-list-react"+i}
                              className="flex w-full cursor-pointer items-center px-3 py-1"
                            >
                              <ListItemPrefix className="mr-3">
                                <Radio
                                  name="notification_on"
                                  id={"vertical-list-react"+i}
                                  ripple={false}
                                  className="hover:before:opacity-0"
                                  onChange={(e)=>handleChange(e)}
                                  value={item.value}
                                  containerProps={{
                                    className: "p-0",
                                  }}
                                />
                              </ListItemPrefix>
                              <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                              >
                                {item.label}
                              </Typography>
                            </label>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                  <div>
                    <label htmlFor="Message">Message</label>
                    <Textarea 
                      id="Message"
                      name="message"
                      className="!border !border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 bg-[#E9EDEF]"
                     labelProps={{ 
                      className:"hidden"
                     }} onChange={(e)=>handleChange(e)}></Textarea>
                  </div>
                </div>
              </>
            )}
          </DialogBody>

          {!UploadDocumentAnalysLoading && (
            <>
              <DialogFooter className="justify-start w-full max-w-[700px] mx-auto pt-0 flex gap-2">
                <Button
                  onClick={() => submitForm()}
                  className="mr-1 bg-theme text-[#fff] py-2 rounded shadow-none hover:shadow-md"
                >
                  <span>{"Submit"}</span>
                </Button>
                <Button
                  onClick={() => handleOpen()}
                  className="bg-[#FAE0E0] text-[#DD2025] py-2 rounded shadow-none hover:shadow-md"
                >
                  <span>{"Cancel"} </span>
                </Button>
              </DialogFooter>
            </>
          )}
        </Dialog>
      </div>
    </>
  );
};

export default SendNotificationModal;
