import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MemberList from "./MemberListing";
import GroupList from "./GroupListing";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CircularProgress, IconButton } from "@mui/material";
import { getDetailQuestion } from "src/DAL/GoalStatement/GoalStatement";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { eventsDetailApi } from "src/DAL/Calendar/Calendar";
import TotalMemberList from "./TotalMember";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
export default function EventDetailList() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const state = useLocation();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const [groups, setGroups] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totoalMembers, setTotalMembers] = useState([]);
  const [questionStatement, setQuestionStatement] = useState("");
  let event_slug = state.state.editValues.event_slug;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const DetailEevent = async () => {
    const result = await eventsDetailApi(event_slug);
    if (result.code === 200) {
      let total_member = [];

      result.event_groups.map((groups) => {
        groups.member.map((members) => {
          total_member.push(members);
        });

        let grand_total_member = total_member.concat(result.event_members);
      });

      setGroups(result.event_groups);
      setMembers(result.event_members);
      setQuestionStatement(result.event.title);
      setTotalMembers(result.event.notify_user);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    DetailEevent();
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="col-12 text-center">
          <h2>{questionStatement}</h2>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Member List" {...a11yProps(0)} />
            <Tab label="Group List" {...a11yProps(1)} />
            <Tab label="Totall Members" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MemberList members={members} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GroupList groups={groups} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TotalMemberList members={totoalMembers} />
        </TabPanel>
      </Box>
    </div>
  );
}
