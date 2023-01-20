import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { get_root_value } from "src/utils/domUtils";
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
// import Page from "../components/Page";
// import Label from "./Label";
// import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "src/components/SearchNotFound";
// import DeletedModal from "src/components/ModalPopover/DeleteModal";
import Label from "src/components/Label";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "src/components/_dashboard/user";
// import UserListHead from "./UserListHead";
// import GoalStatementMenu from "../components/_dashboard/user/GoalStatementMenu";
// import { QuestionListing } from "src/DAL/GoalStatement/GoalStatement";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { htmlDecode } from "src/utils/convertHtml";
import CustomPopover from "src/components/CustomPopover";

// import {
//   deleteProgrammeSectionApi,
//   programmeAutoGroupList,
//   programmeSectionList,
//   deleteProgrammeAutoGroupApi,
// } from "src/DAL/Programme/Programme";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
// import { memberGroupListApi, memberListing } from "src/DAL/member/member";
import { s3baseUrl } from "src/config/config";
import { memberGroupListApi } from "src/DAL/member/Member";
// import {
//   consultantGroupListingApi,
//   consultantListing,
//   DeleteConsultantApi,
//   DeleteConsultantGroupApi,
// } from "src/DAL/consultant/consultant";

//
// import USERLIST from "../_mocks_/user";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "number", label: "#", alignRight: false },
  { id: "name", label: " Name", alignRight: false },
  { id: "program", label: "Programme", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  //   { id: "action", label: "Action", alignRight: false },
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
  console.log(query, "query");
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.type.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
const USERLIST = [
  {
    id: 1,
    question: "Current Average Working Hours Per Week?",
    avatarUrl: "/static/mock-images/avatars/avatar_3.jpg",
    status: "active",
  },
];
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
export default function MemberGroupsList() {
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("number");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [deleteDoc, setDeleteDoc] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [member, setData] = useState([]);

  const [UserId, setUserId] = useState(false);
  const dummyGroups = [
    {
      action_by: "admin_user",
      action_id: "61fb68431b921d356406d82d",
      automated_group_end_day: 0,
      automated_group_start_day: 0,
      createdAt: "2022-03-07T09:41:25.776Z",
      group_slug: "ignite-yearly",
      group_type: "general",
      program: [
        {
          title: "Ignite Elite Mastermind",
          updatedAt: "2022-06-17T18:35:45.397Z",
          video_url: "https://player.vimeo.com/video/580790640",
          __v: 3,
          _id: "6215e199272f5b1b28ce529b",
        },
      ],
      status: true,
      title: "Ignite Yearly",
      updatedAt: "2022-07-04T11:46:07.599Z",
      _id: "1",
    },
  ];

  const handleOpen = (e) => {
    console.log("id", e);
    setUserId(e);
    setOpen(true);
  };

  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === "asc";
    // setOrder(isAsc ? "desc" : "asc");
    // setOrderBy(property);
  };

  const getConsultantListing = async () => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      const result = await memberGroupListApi(params.id);
      console.log(result, "consultantGroupListingApi");
      if (result) {
        console.log(result, "Api result ");
        console.log(result.member_groups, "resultresultresult ");
        setData(result.member);
        setIsLoading(false);

        setQuestionData(result.member);

        const data = result.member_groups.map((group) => {
          console.log(group.program, "groupgroupgroupgroupgroupgroup");
          return {
            id: group._id,
            name: group.title,
            program: group.program,
            member: group.member,
            status: group.status,
            type: group.group_type,
            group_slug: group.group_slug,
          };
        });
        setUserList(data);
        setIsLoading(false);
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
        setIsLoading(false);
      }
    } catch (error) {}
  };
  const handleViewDetail = (value) => {
    console.log(value.group_slug, "edit valuoooooe");
    navigate(`/consultant/view-group-detail/${value.group_slug}`, {
      state: value,
    });
  };
  const handleChangePassword = (value) => {
    console.log(value, "edit value");
    navigate(`/consultant/change-password/${value.id}`, {
      state: value,
    });
  };

  const handleChangeGroup = (value) => {
    console.log(value, "value for action");
    navigate(`/consultant/groups/${value.id}`, {
      state: value,
    });
  };

  const handleAgreeDelete = (value) => {
    console.log(value, "delete it ");
    setDeleteDoc(value);
    setOpenDelete(true);
  };
  const handleDelete = async () => {
    console.log(deleteDoc, "delete function run");
    setOpenDelete(false);
    setIsLoading(true);
    const result = await deleteDoc.group_slug;
    if (result.code === 200) {
      getConsultantListing();
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleFilterByName = (event) => {
    console.log(event.target.value, "this is value");
    setFilterName(event.target.value);
  };
  const handleNavigate = () => {
    navigate(`/consultant/add-consultant`);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );

  // console.log(member, "membermembermember");
  useEffect(() => {
    getConsultantListing();
  }, []);
  const MENU_OPTIONS = [
    {
      label: "Delete",
      icon: "ant-design:delete-twotone",
      handleClick: handleAgreeDelete,
    },
    {
      label: "View Detail",
      icon: "fluent:video-recording-20-regular",
      handleClick: handleViewDetail,
    },
  ];
  const isUserNotFound = filteredUsers.length === 0;
  if (isLoading == true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(questionData, "questionData");
  console.log(params, "ok");
  // console.log(selected, "How data is working ");
  return (
    <>
      <CustomConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        title={"Are you sure you want to delete ?"}
        handleAgree={handleDelete}
      />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <IconButton
              className="back-screen-button"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
            {/* <button
            className="small-contained-button float-end mt-1"
            onClick={() =>
              navigate(`/programmes/lessons-listing/${program_slug}`, {
                state: { name: title, slug: program_slug },
              })
            }
          >
            View Lessons
          </button> */}
          </div>
          <div className="col-lg-8 col-sm-12">
            <h2>Member Groups</h2>
          </div>
          <div className="col-lg-4 col-sm-12 text-end">
            {/* <button onClick={handleNavigate} className="small-contained-button">
              Add Consultant
            </button> */}
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
              Goal Statement
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
                    const { id, name, status, program, member, type } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell component="th" scope="row" padding="1">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {program.map((programme) => {
                            return (
                              <>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: programme._id.title + ",",
                                  }}
                                ></div>
                              </>
                            );
                          })}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {type}
                        </TableCell>

                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={status === false ? "error" : "success"}
                          >
                            {status === false ? "InActive" : "Active"}
                          </Label>
                        </TableCell>

                        {/* <TableCell>
                          <CustomPopover
                            menu={MENU_OPTIONS}
                            data={row}
                          />
                        </TableCell> */}
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
