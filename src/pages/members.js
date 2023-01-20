import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import React, { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { get_root_value } from "src/utils/domUtils";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
//
// import USERLIST from "../_mocks_/user";
import DeletedModal from "src/components/modal/DeleteModal";
import { AllMemberListing, MemberListing } from "src/DAL/member/Member";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { baseUri, s3baseUrl } from "src/config/config";
import { htmlDecode } from "src/utils/convertHtml";
import CustomPopover from "src/components/CustomPopover";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "profile", label: "Profile", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "programs", label: "Programme", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "goal", label: "Goal", alignRight: false },
  { id: "action", label: "Action", alignRight: true },
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
  //console.log(array, "arrays of data");
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    //console.log(query, "query ");
    return filter(
      array,
      (_user) =>
        _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const USERLIST = [
  {
    id: 1,
    name: "Jn smith",
    email: "jhn@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_2.jpg",
    order: 1,
    goal: "unlock",
  },
  {
    id: 2,
    name: "hon smith",
    email: "jhon@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_4.jpg",
    order: 1,
    goal: "lock",
  },
  {
    id: 3,
    name: "Jhon smith",
    email: "jhon@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_5.jpg",
    order: 1,
    goal: "lock",
  },
  {
    id: 4,
    name: "Jhon smith",
    email: "j@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_6.jpg",
    order: 1,
    goal: "lock",
  },
  {
    id: 5,
    name: "jackie",
    email: "jh@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
    order: 1,
    goal: "unlock",
  },
  {
    id: 9,
    name: "jackie",
    email: "jh@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
    order: 1,
    goal: "unlock",
  },
  {
    id: 8,
    name: "jackie",
    email: "jh@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
    order: 1,
    goal: "unlock",
  },
  {
    id: 7,
    name: "jackie",
    email: "jh@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
    order: 1,
    goal: "unlock",
  },
  {
    id: 6,
    name: "jackie",
    email: "jh@gmail.com",
    status: "active",
    programs: [
      "program1",
      "program2",
      "program1",
      "program2",
      "program1",
      "program2",
    ],
    // programs: "program1",
    avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
    order: 1,
    goal: "unlock",
  },
];
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export default function Member() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState(false);
  const [userList, setUserList] = useState([]);

  const handleOpen = (e) => {
    //console.log("id", e);
    setUserId(e);
    setOpen(true);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getMember = async () => {
    setIsLoading(true);
    const result = await MemberListing();
    if (result.code === 200) {
      //console.log(result, "list of member");
      setMemberListing(result.member);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const getMemberListing = async () => {
    try {
      const result = await AllMemberListing();
      setIsLoading(true);
      if (result.code === 200) {
        //console.log(result, "result");
        // setQuestionData(result.goal_statement);

        const data = result.member.map((goal) => {
          return {
            // id: goal._id,
            // question_statement: goal.question_statement.slice(0, 15) + "...",
            // type: goal.question_type,
            // avatarUrl: "/static/mock-images/avatars/avatar_3.jpg",
            // order: goal.question_order,
            // status: goal.status,
            //
            id: goal._id,
            name: goal.first_name + " " + goal.last_name,
            email: goal.email,
            status: goal.status,
            programs: goal.program,
            avatarUrl: goal.profile_image,
            goal: goal.goal_statement_status,
          };
        });
        setUserList(data);
        //console.log(result.member, "result.member");
        setIsLoading(false);
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    // setOrder(isAsc ? "desc" : "asc");
    // setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

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
    navigate(`/addroom`);
  };
  const handleDetail = (value) => {
    //console.log(value, "edit value");
    navigate(`/members/profile/${value.id}`, {
      state: value,
    });
  };
  const MENU_OPTIONS = [
    {
      label: "View Detail",
      icon: "akar-icons:edit",
      handleClick: handleDetail,
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );
  React.useEffect(() => {
    getMemberListing();
  }, []);
  // console.log(filteredUsers, "filter is working or not");

  const isUserNotFound = filteredUsers.length === 0;
  // console.log(USERLIST, "okokoko");
  //console.log(isUserNotFound, "filterName ");
  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <>
      <DeletedModal title="member" id={UserId} open={open} setOpen={setOpen} />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Member</h2>
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
              Members
            </Typography> */}
          {/* <Button
              className="small-contained-button"
              onClick={handleNavigate}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              Add Member
            </Button> */}
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
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    const {
                      id,
                      name,
                      email,
                      programs,
                      status,
                      avatarUrl,
                      order,
                      goal,
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
                            <Typography
                              variant="subtitle2"
                              noWrap
                              onClick={() => handleDetail(row)}
                              className="anchor-style"
                            >
                              {Capitalize(htmlDecode(name))}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell> */}
                        <TableCell align="left">
                          {avatarUrl ? (
                            <Avatar alt={name} src={s3baseUrl + avatarUrl} />
                          ) : (
                            <Avatar alt={name} src={name} />
                          )}
                          {/* <Avatar alt={name} src={s3baseUrl + avatarUrl} /> */}
                        </TableCell>
                        <TableCell align="left">{htmlDecode(email)}</TableCell>
                        <TableCell
                          sx={{
                            display: "revert",
                          }}
                          align="left"
                        >
                          {programs.length > 0
                            ? programs.map((program) => {
                                return (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: htmlDecode(program._id.title),
                                    }}
                                  ></div>
                                );
                              })
                            : "N/A"}
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(status === false && "error") || "success"}
                          >
                            {status == true ? "Active" : "Inactive"}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(goal === false && "error") || "success"}
                          >
                            {goal === true ? "Unlock" : "Lock"}
                          </Label>
                        </TableCell>

                        {/* <TableCell align="left">{password}</TableCell>
                          <TableCell align="left">{order}</TableCell> */}

                        <TableCell align="right">
                          <CustomPopover menu={MENU_OPTIONS} data={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
              </TableBody>
              {isUserNotFound === true && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
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
            count={userList.length}
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
