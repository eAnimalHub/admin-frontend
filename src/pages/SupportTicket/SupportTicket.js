import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "src/components/DrawerForm/CustomDrawer";
import TicketList from "src/components/SupportTickets/TicketList";
import AddSupportTicket from "./AddSupportTicket";
import SupportTicketFilter from "./SupportTicketFilter";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// import { tickestsListAPI } from "src/DAL/SupportTicket/SupportTicket";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import SearchBar from "material-ui-search-bar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { get_root_value } from "src/utils/domUtils";
import { ticketsListAPI } from "src/DAL/SupportTicket/SupportTicket";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

function SupportTicket() {
  const transactions = [
    {
      created: "2 mins ago",
      name: "Logan",
      currency: "usd",
      amount: 100,
      transaction_status: "Open",
      subject: "Lorem Ipsum is",
    },
    {
      created: "3 mins ago",
      name: "Jhon Danille",
      currency: "usd",
      subject:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "solved",
    },
    {
      created: "4 mins ago",
      name: "Henson wick",
      currency: "usd",
      subject:
        "Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "waiting",
    },
  ];

  const transactions1 = [
    {
      created: "5 mins ago",
      currency: "usd",
      amount: 100,
      transaction_status: "Open",
      subject: "Lorem Ipsum is",
    },
    {
      created: "6 mins ago",
      currency: "usd",
      subject:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "Open",
    },
    {
      created: "12 mins ago",
      currency: "usd",
      subject:
        "Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "Open",
    },
  ];
  const transactions2 = [
    {
      created: "22 mins ago",
      currency: "usd",
      amount: 100,
      transaction_status: "solved",
      subject: "Lorem Ipsum is",
    },
    {
      created: "32 mins ago",
      currency: "usd",
      subject:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "solved",
    },
    {
      created: "21 mins ago",
      currency: "usd",
      subject:
        "Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "solved",
    },
  ];
  const transactions3 = [
    {
      created: "23 mins ago",
      currency: "usd",
      amount: 100,
      transaction_status: "waiting",
      subject: "Lorem Ipsum is",
    },
    {
      created: "25 mins ago",
      currency: "usd",
      subject:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "waiting",
    },
    {
      created: "26 mins ago",
      currency: "usd",
      subject:
        "Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
      transaction_status: "waiting",
    },
  ];

  const navigate = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [listData, setListData] = useState(transactions);
  const [drawerState, setDrawerState] = useState(false);
  const [editDrawerState, setEditDrawerState] = useState(false);
  const [tickestData, setTickestData] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [selectedValue, setSelectedValue] = React.useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const getTickestsListing = async (filterBy) => {
    const formData = new FormData();
    setIsLoading(true);
    formData.append("filter_by", filterBy);
    const result = await ticketsListAPI(formData);
    if (result.code === 200) {
      //console.log(result, "filterList");
      setTickestData(result.support_ticket);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const myfunction = (value) => {
    //console.log(value, "value function");
    navigate(`/support-ticket/${value._id}`, {
      state: value,
    });
  };

  const handleOpenDrawer = () => {
    setDrawerState(true);
  };
  const handleOpenEditDrawer = () => {
    setEditDrawerState(true);
  };

  const handleCloseDrawer = () => {
    setDrawerState(false);
  };
  const handleCloseEditDrawer = () => {
    setEditDrawerState(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    //console.log("search");
  };
  //Getting Note In textarea
  const handleEdit = (value) => {
    setEditValues(value);
    setEditDrawerState(true);
  };
  const handleAgreeDelete = (value) => {
    setMemorySlug(value.pinterestSlug);
    setOpenDelete(true);
  };

  useEffect(() => {
    getTickestsListing(filterBy);
  }, []);
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-sm-12 col-md-6">
          <h2>Support Tickets</h2>
        </div>

        {/* <div className="col-sm-12 col-md-4 mb-2 ">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              backgroundColor: get_root_value("--sidebars-background-color"),
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                backgroundColor: get_root_value("--sidebars-background-color"),
                color: get_root_value("--input-text-color"),
              }}
              placeholder="Search "
              inputProps={{ "aria-label": "search " }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon onClick={handleSearch} />
            </IconButton>
          </Paper>
        </div> */}
        <div className="col-sm-12 col-md-6 text-end">
          <button
            className="small-contained-button me-2 mt-1 mb-4"
            onClick={handleOpenEditDrawer}
          >
            Filters &nbsp;&nbsp; <Icon icon={roundFilterList} />
          </button>
        </div>

        <TicketList
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          data={tickestData}
          onClick={myfunction}
          getTickestsListing={getTickestsListing}
        />
      </div>
      <CustomDrawer
        isOpenDrawer={editDrawerState}
        onOpenDrawer={handleOpenEditDrawer}
        onCloseDrawer={handleCloseEditDrawer}
        pageTitle="Filters"
        componentToPassDown={
          <SupportTicketFilter
            value={selectedValue}
            handleChange={handleChange}
            dataList={getTickestsListing}
            setSelectedValue={setSelectedValue}
            onCloseDrawer={handleCloseEditDrawer}
          />
        }
      />
      <CustomDrawer
        isOpenDrawer={drawerState}
        onOpenDrawer={handleOpenDrawer}
        onCloseDrawer={handleCloseDrawer}
        pageTitle="New Ticket"
        componentToPassDown={
          <AddSupportTicket
            // dataList={memoriesData}
            // setMemoriesData={setMemoriesData}
            onCloseDrawer={handleCloseDrawer}
          />
        }
      />
    </div>
  );
}

export default SupportTicket;
