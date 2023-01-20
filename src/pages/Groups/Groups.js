import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
} from "@mui/material";
// components
import Page from "src/components/Page";
import Label from "src/components/Label";
import Scrollbar from "src/components/Scrollbar";
import SearchNotFound from "src/components/SearchNotFound";
import DeletedModal from "src/components/modal/DeleteModal";
import { get_root_value } from "src/utils/domUtils";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "src/components/_dashboard/user";
import GoalStatementMenu from "src/components/_dashboard/user/GoalStatementMenu";
import { QuestionListing } from "src/DAL/GoalStatement/GoalStatement";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import {
  AllGroupListing,
  DeleteGroup,
  GroupListing,
} from "src/DAL/Groups/Groups";
import { ProgrammesSort } from "src/components/_dashboard/programmes";
import GroupsMenu from "src/components/_dashboard/user/GroupsMenu";
import CustomPopover from "src/components/menuIcons/CustomPopover";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
import { htmlDecode } from "src/utils/convertHtml";

//
// import USERLIST from "../_mocks_/user";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "program", label: "Programme", alignRight: false },
  { id: "member", label: "Members", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  //console.log(query, "query");
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
const USERLIST = [
  {
    id: 1,
    question: "Current Average Working Hours Per Week?",
    type: "textarea",
    avatarUrl: "/static/mock-images/avatars/avatar_3.jpg",
    order: 1,
    status: "active",
  },
  {
    id: 2,
    question: "Current Average Closing Rate Ratio Per Month - (If Applicable)",
    type: "textarea",
    avatarUrl: "/static/mock-images/avatars/avatar_3.jpg",
    order: 1,
    status: "active",
  },
  {
    id: 3,
    question: "How Many Hours Do You Want To Work Per Week?",
    type: "textarea",
    avatarUrl: "/static/mock-images/avatars/avatar_3.jpg",
    order: 1,
    status: "active",
  },
];
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export default function Groups() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [deleteValue, setDeleteValue] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [UserId, setUserId] = useState(false);

  const handleOpen = (e) => {
    //console.log("id", e);
    setUserId(e);
    setOpen(true);
  };

  const handleEdit = (value) => {
    navigate("/groups/edit-group", {
      state: { editValues: value },
    });
    //console.log(value, "value.edit");
  };
  const handleAgreeDelete = (value) => {
    //console.log(value, "--value to del");
    setDeleteValue(value.slug);
    setOpenDelete(true);
    // handleCloseMenu();
  };
  //   const handleNavigate = () => {
  //     navigate(`/groups/add-group`);
  //   };

  //Deleting Recording
  const handleDelete = async () => {
    setOpenDelete(false);
    //console.log(deleteValue, "setDeleteValue");
    // here call api to delete recording

    const result = await DeleteGroup(deleteValue);
    if (result.code === 200) {
      //console.log(result, "result");
      getGroupListing();
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      //console.log(result);
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getGroupListing = async () => {
    try {
      const result = await AllGroupListing();
      setIsLoading(true);
      if (result.code === 200) {
        //console.log(result, "result");
        // setQuestionData(result.goal_statement);

        const data = result.group.map((goal) => {
          return {
            id: goal._id,
            title: goal.title,
            type: goal.group_type,
            // avatarUrl: "/static/mock-images/avatars/avatar_3.jpg",
            programs: goal.program,
            member: goal.member.length,
            status: goal.status,
            slug: goal.group_slug,
          };
        });
        setUserList(data.reverse());
        setIsLoading(false);
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
        setIsLoading(false);
      }
    } catch (error) {}
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    //console.log(event.target.value, "this is value");
    setFilterName(event.target.value);
  };
  const handleNavigate = () => {
    navigate(`/groups/add-group`);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );
  useEffect(() => {
    getGroupListing();
  }, []);

  const isUserNotFound = filteredUsers.length === 0;
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  //console.log(questionData, "questionData");
  //console.log(userList, "ok");
  // console.log(selected, "How data is working ");
  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "akar-icons:edit",
      handleClick: handleEdit,
    },

    {
      label: "Delete",
      icon: "ant-design:delete-twotone",
      handleClick: handleAgreeDelete,
    },
  ];
  return (
    <>
      <DeletedModal
        getGroupListing={getGroupListing}
        title="member"
        id={UserId}
        open={open}
        setOpen={setOpen}
      />

      <div className="container">
        <div className="row">
          <div className="col-8">
            <h2>Groups</h2>
          </div>
          <div className="col-4 text-end">
            <button onClick={handleNavigate} className="small-contained-button">
              Add Group
            </button>
          </div>
        </div>
        {/* <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton> */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          {/* <Typography variant="h4" gutterBottom>
            Groups
          </Typography> */}
        </Stack>

        <Card style={{ overflowX: "auto" }}>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={userList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    const {
                      id,
                      role,
                      status,
                      avatarUrl,
                      isVerified,
                      zoomLink,
                      order,
                      password,
                      type,
                      group_type,
                      title,
                      question,
                      programs,
                      member,
                      question_statement,
                    } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        sx={{
                          " td, th, tr": {
                            borderBottom: `1px solid ${get_root_value(
                              "--text-secondary-color"
                            )}`,
                          },
                        }}
                      >
                        {/* <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell> */}
                        <TableCell align="left" key={i}>
                          {i + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {htmlDecode(title)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">
                          {programs.map((program) => {
                            return (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: htmlDecode(program._id.title),
                                }}
                              ></div>
                            );
                          })}
                        </TableCell>
                        <TableCell align="left">{htmlDecode(member)}</TableCell>

                        {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell> */}

                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={status === false ? "error" : "success"}
                          >
                            {status === false ? "Inactive" : "Active"}
                          </Label>
                        </TableCell>

                        <TableCell align="left">
                          <CustomPopover menu={MENU_OPTIONS} data={row} />
                          {/* <GroupsMenu
                              path={`/groups/edit-group`}
                              id={id}
                              getGroupListing={getGroupListing}
                              editValues={row}
                              OnDelete={() => handleOpen(id)}
                            /> */}
                          <CustomConfirmation
                            open={openDelete}
                            setOpen={setOpenDelete}
                            title={
                              "Are you sure you want to delete this group?"
                            }
                            handleAgree={handleDelete}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[50, 100, 150]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </>
  );
}
