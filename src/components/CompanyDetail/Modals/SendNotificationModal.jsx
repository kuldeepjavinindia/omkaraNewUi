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
} from "@material-tailwind/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { UserNotificationApi } from "../../../store/slice/SingleCompnaySlice";

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


  const [Type, setType] = useState(notificationType?.[0].value);

  const {
    UserNotification:{
      data: UNData,
      loading: UNLoading,
    }
  } = useSelector(state=>state.SingleCompany)

  const {
    SendNotification,
    setSendNotification
  } = useContext(GlobalContext);

  const submitForm = () => {};
  const handleOpen = () => {
    setSendNotification(null);
  };

  const UploadDocumentAnalysLoading = false;
  
  useEffect(() => {
      if(UNLoading){
        rr_dispatch(UserNotificationApi())
      }
      if(!UNLoading){
        // rr_dispatch(UserNotificationApi())
      }
  }, [rr_dispatch, UNLoading])
  

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
              `Trent Ltd.: (Investor-Grievances-report_Jun22.pdf)"`}
          </DialogHeader>

          <DialogBody className="w-full max-w-[700px] mx-auto pt-0">
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
                    />
                  </div>

                  <div className=" h-[50vh] overflow-auto ">
                   
                    <table className=" relative w-full table-auto text-left ">
                      <thead className=" sticky  z-[1] top-0 bg-red-500 ">
                        <tr >
                          <th className="text-ellipsis border-b border-blue-gray-100 bg-[#22242F] text-white p-2 text-[13px] font-medium w-10">

                          </th>
                          <th className="text-ellipsis border-b border-blue-gray-100 bg-[#22242F] text-white p-2 text-[13px] font-medium">
                            User Name 
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          UNData && UNData.length > 0 && UNData.map((item, i)=>{
                            return (
                              <Fragment key={i}>
                                <tr className="odd:bg-[#E8F0F4] even:bg-[#fff]" >
                                  <td className="px-2 py-1 text-[13px] font-medium border-b border-blue-gray-100 ">
                                    <Checkbox />
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
                          onClick={(e) => {
                            setType(item.value);
                          }}
                          ripple={false}
                          >
                            <label
                              htmlFor={"vertical-list-react"+i}
                              className="flex w-full cursor-pointer items-center px-3 py-1"

                            >
                              <ListItemPrefix className="mr-3">
                                <Radio
                                  name="vertical-list"
                                  id={"vertical-list-react"+i}
                                  ripple={false}
                                  className="hover:before:opacity-0"
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
                  <div></div>
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
