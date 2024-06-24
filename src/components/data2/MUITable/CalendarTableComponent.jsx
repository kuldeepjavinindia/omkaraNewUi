import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
// import LoadingComponent from '../Loading';
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, Tooltip } from "@mui/material";
// import { CalendarAdd } from '../Forms';
import { useDispatch, useSelector } from "react-redux";
// import DrawerContainer from '../Common/DrawerContainer';
import { Button, Typography } from "@mui/material";
// import { vdrAssignEmployeeAction, vdrEmployeeAction } from '../../redux/actions/VdrAction';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";

// import TooltipText from '../../frontend/components/CustomChart/TooltipText';
import { showCalendarActionBtn } from "../../../constants/helper";
import { AssignEmployeeApi } from "../../../store/slice/Data2Slice";
import TooltipText from "./TooltipText";
import { useAuthState } from "../../../context/AuthContext";
import { IconButton } from "@material-tailwind/react";
// import Avatar from 'react-avatar';

export default function CalendarTableComponent({
  resultData,
  tableColumns,
  loading,
  ref,
  dataFor,
  assignedMembers,
  FilterData,
  setFilterData,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  //   const { data: employeeData, loading: employeeLoading } = useSelector((state) => state.vdrCompanyReducer);

  const authState = useAuthState();

  const [stateDrawer, setStateDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const dispatch = useDispatch();
  const [anchor, setAnchor] = React.useState("bottom");
  const [groupData, setGroupData] = React.useState(null);
  const [companyData, setCompanyData] = React.useState(null);
  const [openForm, setOpenForm] = React.useState(null);
  const [parentGroup, setParentGroup] = React.useState(null);
  const [levelType, setLevelType] = React.useState(0);
  const [inputType, setInputType] = React.useState(0);

  const [HoverState, setHoverState] = React.useState(null);

  const [AssignEmployeeArr, setAssignEmployeeArr] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const {
    AssignEmployee: {
      data: AssignEmployee,
      loading: AssignEmployeeLoading,
      loadingOnAdd,
    },
  } = useSelector((state) => state.Data2);

  const cellClicked = (rowData) => {
    // console.log(JSON.stringify(rowData))
  };

  const toggleDrawer = (anchor, open) => (event) => {
    // dispatch({ type: SORT_DATA_REQUEST })
    if (event) {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
    }
    setStateDrawer({ ...stateDrawer, [anchor]: open });
  };

  const cellFunction = (cellId) => {
    setHoverState(cellId);
  };

  //   React.useEffect(() => {
  //     if (employeeLoading) {
  //       dispatch(vdrEmployeeAction())
  //     }

  //   }, [dispatch])

  React.useEffect(() => {
    if (resultData) {
      setFilterData(resultData);
    }
  }, [resultData]);

  React.useEffect(() => {
    // console.log(assignedMembers)
  }, [assignedMembers]);

  //   React.useEffect(() => {
  //     if (AssignEmployeeLoading) {
  //       dispatch(vdrAssignEmployeeAction({ optionType: "2" }, 'list'));
  //     }
  //     if (!AssignEmployeeLoading) {
  //       var arrData = AssignEmployee.data.map((item) => item.company_id)
  //       setAssignEmployeeArr(arrData);
  //     }
  //   }, [dispatch, AssignEmployeeLoading])

  const removeAssignEmployee = (CompanyID) => {
    const paramsData = {
      user_id: 1,
      company_id: CompanyID,
      employee_id: 0,
      optionType: "3",
    };

    dispatch(AssignEmployeeApi(paramsData, "remove"));

    if (loadingOnAdd === false) {
      window.location.reload();
    }
  };

  //   if (loading) {
  //     return <LoadingComponent />
  //   }
  // console.table(loggedInAdmin);

  return (
    <Paper sx={{ width: "100%" }} ref={ref}>
      {/* <DrawerContainer containerFor={openForm} stateDrawer={stateDrawer} setStateDrawer={setStateDrawer} toggleDrawer={toggleDrawer} anchor={anchor} >
        {
          openForm === 'calendar' ?
            <CalendarAdd
              levelType={levelType || ''}
              inputType={inputType || ''}
              parentGroup={parentGroup || ''}
              singleCompanyData={companyData || ''}
            />
            :
            null
        }
      </DrawerContainer> */}

      <TableContainer sx={{ maxHeight: "85vh" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          id="table-to-xls"
          className="calendar"
        >
          <TableHead>
            <TableRow>
              {tableColumns &&
                tableColumns.map((column) => {
                  return (
                    <TableCell
                      sx={{}}
                      className="text-[12px]"
                      key={column.id}
                      align={column.align}
                      // style={{ minWidth: column.minWidth, maxWidth: column.maxWidth, fontWeight: '600' }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>

          <TableBody>
            {FilterData &&
              FilterData.map((row) => {
                {
                  /* console.warn(row); */
                }
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {tableColumns &&
                      tableColumns.map((column, a0) => {
                        const value = row[column.id];
                        var a00 = "CompanyData" + a0;
                        {
                          /* console.log(row[a00].CompanyID); */
                        }

                        let cStyle = {
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        };

                        if (dataFor === "backend") {
                          if (AssignEmployeeArr.includes(row[a00]?.CompanyID)) {
                            cStyle.backgroundColor = "#f47c23";
                            cStyle.color = "#fff";
                          }
                        }

                        {
                          /* console.log(row[a00]); */
                        }
                        // if(!row[a00]?.assigned && assignedMembers){
                        //   return (
                        //     <TableCell  className="text-ellipsis tableCell">

                        //     </TableCell>
                        //   )
                        // }else{

                        // }
                        return (
                          <TableCell
                            onMouseEnter={() =>
                              cellFunction(row[a00]?.CompanyID)
                            }
                            onMouseLeave={() => cellFunction(null)}
                            key={column.id}
                            className="text-ellipsis tableCell fontSize-12px fontWeight-600"
                            align={column.align}
                            style={cStyle}
                            onClick={() => cellClicked(row)}
                          >
                            {/* { row[a00]?.usersData ? <Avatar size={50}  textSizeRatio={10} name={row[a00]?.usersData[0].user_name} /> : null } */}

                            <div className="demoNew">
                              {row[a00]?.usersData[0]?.user_name ? (
                                <TooltipText
                                  title={row[a00]?.usersData[0]?.user_name}
                                >
                                  <Avatar
                                    sx={{
                                      bgcolor: "cornflowerblue",
                                      width: 20,
                                      height: 20,
                                      fontSize: 12,
                                      marginRight: "5px",
                                    }}
                                    variant="circle"
                                  >
                                    {row[a00]?.usersData[0].user_name.charAt(0)}
                                  </Avatar>
                                </TooltipText>
                              ) : null}

                              {column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : value ? (
                                <TooltipText
                                  className="text-ellipsis"
                                  title={value}
                                >
                                  <span>{value}</span>
                                </TooltipText>
                              ) : null}
                            </div>

                            {value && (
                              <>
                                {/* {JSON.stringify(showCalendarActionBtn(authState.user.UserID))} */}
                                {showCalendarActionBtn(authState.user.UserID) &&
                                  !AssignEmployeeArr.includes(
                                    row[a00]?.CompanyID
                                  ) &&
                                  HoverState === row[a00]?.CompanyID && (
                                    <div className="cell_add_icon">
                                      <TooltipText title={"Assign"}>
                                        <IconButton
                                          size="sm"
                                          className=" bg-theme"
                                          onClick={(e) => [
                                            setCompanyData({
                                              deleteStatus: false,
                                              company_id: row[a00].CompanyID,
                                              company_name: value,
                                              date: column?.dates,
                                              companyData: row[a00],
                                            }),
                                            toggleDrawer(anchor, true)(e),
                                            setOpenForm("calendar"),
                                            setLevelType(1),
                                            setInputType(0),
                                          ]}
                                          color="primary"
                                          company_id={row[a00]?.CompanyID || ""}
                                        >
                                          <BsFillPlusCircleFill size={16} />
                                        </IconButton>
                                      </TooltipText>
                                    </div>
                                  )}

                                {showCalendarActionBtn(authState.user.UserID) &&
                                  AssignEmployeeArr.includes(
                                    row[a00]?.CompanyID
                                  ) &&
                                  HoverState === row[a00]?.CompanyID && (
                                    <div className="cell_add_icon">
                                      <TooltipText title={"Remove"}>
                                        <Button
                                          size="small"
                                          variant="contained"
                                          sx={{ minWidth: "fit-content" }}
                                          onClick={() =>
                                            removeAssignEmployee(
                                              row[a00]?.CompanyID
                                            )
                                          }
                                          color="error"
                                          company_id={row[a00]?.CompanyID || ""}
                                        >
                                          <AiFillMinusCircle size={20} />
                                        </Button>
                                      </TooltipText>
                                    </div>
                                  )}
                              </>
                            )}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={resultData && resultData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
