import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState } from "react";
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
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
//
// import USERLIST from "../_mocks_/user";
import DeletedModal from "src/components/modal/DeleteModal";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "programs", label: "Programs", alignRight: false },
  { id: "videID", label: "Video ID", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
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
        _user.videoID.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.date.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
const USERLIST = [
  {
    id: 1,
    name: "Jhon smith",
    email: "jhon@gmail.com",
    status: "active",
    videoID: "12",
    programs: "program1",
    date: "02/04/2022",
    avatarUrl: "/static/mock-images/avatars/avatar_2.jpg",
    order: 1,
    goal: "unlock",
  },
  {
    id: 2,
    name: "leo",
    email: "jhon@gmail.com",
    status: "active",
    videoID: "12121",
    programs: "program1",
    date: "08/04/2022",
    avatarUrl: "/static/mock-images/avatars/avatar_2.jpg",
    order: 2,
    goal: "unlock",
  },
  {
    id: 3,
    name: "smith",
    email: "jhon@gmail.com",
    status: "active",
    videoID: "198367263522",
    programs: "program1",
    date: "02/04/2022",
    avatarUrl: "/static/mock-images/avatars/avatar_2.jpg",
    order: 3,
    goal: "unlock",
  },
];

export default function RecordingList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState(false);
  const handleOpen = (e) => {
    console.log("id", e);
    setUserId(e);
    setOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
    setFilterName(event.target.value);
  };
  const handleNavigate = () => {
    navigate(`/recordings/add-recording`);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );
  console.log(filteredUsers, "filter is working or not in recording");

  const isUserNotFound = filteredUsers.length === 0;
  console.log(USERLIST, "okokoko");
  console.log(selected, "How data is working ");

  return (
    <>
      <DeletedModal title="member" id={UserId} open={open} setOpen={setOpen} />

      <Page title="Hina Khan | Consultant">
        <Container>
          {/* <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton> */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Recordings
            </Typography>
            <button onClick={handleNavigate} className="small-contained-button">
              Add Recordings
            </button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          name,
                          email,
                          programs,
                          status,
                          avatarUrl,
                          order,
                          goal,
                          videoID,
                          date,
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
                          >
                            <TableCell component="th" scope="row" padding="1">
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {/* <TableCell align="left">{company}</TableCell> */}

                            {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell> */}
                            {/* <TableCell align="left">{email}</TableCell> */}
                            <TableCell align="left">{programs}</TableCell>
                            <TableCell align="left">{videoID}</TableCell>
                            <TableCell align="left">{date}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (status === "inactive" && "error") ||
                                  "success"
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>

                            {/* <TableCell align="left">{password}</TableCell>
                          <TableCell align="left">{order}</TableCell> */}

                            <TableCell align="right">
                              <UserMoreMenu
                                // path={`/recordings/Edit-recording/${id}`}
                                id={id}
                                OnDelete={() => handleOpen(id)}
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
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    </>
  );
}
