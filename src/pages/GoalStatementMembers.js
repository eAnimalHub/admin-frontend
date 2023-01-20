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
import { goalMemberListingApi } from "src/DAL/MemberGoalStatement/MemberGoalStatement";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "profile", label: "Profile", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "goal", label: "Goal", alignRight: false },
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

export default function MemberGoalStatement() {
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

  // const getMember = async () => {
  //   setIsLoading(true);
  //   const result = await MemberListing();
  //   if (result.code === 200) {
  //     console.log(result, "list of member");
  //     setMemberListing(result.member);
  //     setIsLoading(false);
  //   } else {
  //     enqueueSnackbar(result.message, { variant: "error" });
  //     setIsLoading(false);
  //   }
  // };
  const handleEdit = (value) => {
    //console.log(value, "edit value");
    navigate(`/member-goalstatement/goalstatement/${value.id}`, {
      state: value,
    });
  };
  const navigateByName = (value) => {
    //console.log(value, "edit value");
    navigate(`/member-goalstatement/goalstatement/${value.id}`, {
      state: value,
    });
  };
  const dummyMember = [
    {
      action_by: "admin_user",
      action_id: "61fb68431b921d356406d82d",
      city: "Sahiwal",
      consultant: {
        first_name: "dlx",
        last_name: "Logixxxxxx",
        address: "sahiwal",
        city: "sahiwal",
        main_heading: "DLX",
      },
      contact_number: "",
      country: "DZ",
      createdAt: "2022-05-11T11:51:05.693Z",
      dob: null,
      email: "jhoneDoe@gmail.com",
      facebook_link: "",
      first_name: "Jhone",
      first_payment_date: "2022-05-11",
      goal_statement_gallery: [],
      goal_statement_question: [],
      goal_statement_status: true,
      instagram_link: "",
      is_send_code: false,
      is_verified_code: false,
      last_name: "Doe",
      linkedin_link: "",
      member_biography:
        "lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum",
      nineteen_day_plan_currency: "eur",
      nineteen_day_vision: {
        aim: "",
        achive_goal: "",
        list_achive_goal: "",
        list_habit_or_belife: "",
        bullet_proof_attitide: "",
      },
      personal_note: [],
      profile_image: "member/c703bd29-25c1-46af-b1da-fcc5ebf23529.png",
      program: [],
      state: "Pakistan",
      status: true,
      street: "Sahiwal",
      stripe_customer_id: "cus_LfZCq1gDgOe9yz",
      time_zone: "Antarctica/Palmer",
      updatedAt: "2022-05-30T05:45:09.797Z",
      verification_code: "",
      website_link: "",
      youtube_link: "",
      zip_code: "57000",
      _id: "627ba329f32f070e8ccba4d8",
    },
  ];
  const getMemberListing = async () => {
    try {
      setIsLoading(true);
      const result = await goalMemberListingApi();
      if (result.code === 200) {
        //console.log(result, "resultMember");

        const data = result.member_array.map((member) => {
          //console.log(member, "plplplplplp");
          return {
            id: member._id,
            name: member.first_name + " " + member.last_name,
            email: member.email,
            status: member.status,
            programs: member.program,
            avatarUrl: member.profile_image,
            goal: member.goal_statement_status,
            object: member,
          };
        });
        setUserList(data);
        //console.log(result, "result.member");
        setIsLoading(false);
      } else {
        // enqueueSnackbar(result.message, { variant: "error" });
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );
  const MENU_OPTIONS = [
    {
      label: "Detail",
      icon: "akar-icons:edit",
      handleClick: handleEdit,
    },
  ];
  React.useEffect(() => {
    getMemberListing();
  }, []);
  // console.log(filteredUsers, "filter is working or not");

  const isUserNotFound = filteredUsers.length === 0;
  // console.log(USERLIST, "okokoko");
  //console.log(isUserNotFound, "filterName ");
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <>
      <DeletedModal title="member" id={UserId} open={open} setOpen={setOpen} />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Member Goal Statement</h2>
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
                        <TableCell align="left">{i + 1}</TableCell>

                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography
                              variant="subtitle2"
                              noWrap
                              onClick={() => navigateByName(row)}
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
                        {/* <TableCell
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
                        </TableCell> */}
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
                          {/* <UserMoreMenu
                            path={`/members/edit-members/${id}`}
                            id={id}
                            OnDelete={() => handleOpen(id)}
                          /> */}
                          <CustomPopover menu={MENU_OPTIONS} data={row} />
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
              {isUserNotFound === true && (
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
