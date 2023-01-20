import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { EditEventApi } from "src/DAL/Calendar/Calendar";
import { makeStyles } from "@mui/styles";
import { get_root_value } from "src/utils/domUtils";
import { MemberListing } from "src/DAL/member/Member";
import { GroupListing } from "src/DAL/Groups/Groups";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { get_date_with_user_time_zone } from "src/utils/constants";
import { useContentSetting } from "src/Hooks/ContentSettingState";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const useStyles = makeStyles(() => ({
  paper: {
    background: get_root_value("--popup-background-color"),
    color: get_root_value("--input-text-color"),
  },
}));
export default function EditEvent({
  editValues,
  dataList,
  setShowEditComponent,
  setEditValues,
  getEventinformation,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [groupListing, setGroupListing] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [groupsName, setGroupsName] = React.useState([]);
  const [groupsNameFromEdit, setGroupsNameFromEdit] = React.useState([]);
  const [person, setPerson] = React.useState([]);
  const [startTimes, setStartTime] = useState("");
  const [endTimes, setEndTime] = useState("");
  const { userInfo, adminTimeZone } = useContentSetting();
  const [state, setState] = useState({
    eventDescription: "",
    eventTitle: "",
    eventSlug: "",
    eventColor: "",
    startTime: "",
    endTime: "",
    status: "",
    itrationNumber: "",
    recurringType: "daily",
    startDate: new Date(),
  });
  // Time conversion
  const timeConversion = () => {
    let eventStartTime = "";
    let eventEndTime = "";

    eventStartTime = get_date_with_user_time_zone(
      editValues.start_date + " " + editValues.start_time,
      "hh:mm A",
      userInfo.time_zone,
      adminTimeZone
    );

    const TimeBeginning = moment(eventStartTime, "hh:mm A").format("HH:mm:ss");

    eventEndTime = get_date_with_user_time_zone(
      editValues.end_date_time,
      "hh:mm A",
      userInfo.time_zone,
      adminTimeZone
    );
    const TimeEnding = moment(eventEndTime, "hh:mm A").format("HH:mm:ss");
    setStartTime(editValues.start_time);
    setEndTime(editValues.end_time);
  };

  // Time conversion end here

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChangeDate = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        startDate: event,
      };
    });
  };
  const handleChangeTime = (e) => {
    setStartTime(e.target.value);
  };
  const handleChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };
  const getGroups = async () => {
    setIsLoading(true);
    const result = await GroupListing();
    if (result.code === 200) {
      let total_groups = result.group;
      let active_groups = [];
      total_groups.map((group) => {
        if (group.status === true) {
          active_groups.push(group);
        }
      });
      setGroupListing(active_groups);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const getMember = async () => {
    setIsLoading(true);
    const result = await MemberListing();
    if (result.code === 200) {
      setPersonName(result.member);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleChangeGroup = (event) => {
    const {
      target: { value },
    } = event;
    setGroupsName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeMember = (event) => {
    const {
      target: { value },
    } = event;
    setPerson(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let group_array = [];
    let group_object = {};
    groupsName.map((group) => {
      group_object = {
        group_slug: group,
      };
      group_array.push(group_object);
    });
    let selected_member_array = [];
    let selected_member_object = {};
    person.map((member) => {
      selected_member_object = {
        member_id: member,
      };
      selected_member_array.push(selected_member_object);
    });

    var dateString = moment(state.startDate).format("YYYY-MM-DD");
    const formDataObject = {
      title: state.eventTitle,
      color: state.eventColor,
      recurring_type: state.recurringType,
      start_date: dateString,
      recurring_iteration: state.itrationNumber,
      description: state.eventDescription,
      start_time: startTimes,
      end_time: endTimes,
      status: state.status,
      group: group_array,
      member: selected_member_array,
    };

    const result = await EditEventApi(editValues.event_slug, formDataObject);
    let eventObject = {};
    if (result.code === 200) {
      dataList();
      navigate("/calender");
      setShowEditComponent(false);
      getEventinformation();
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
    }

    // if (result.code === 200) {
    //   getEventinformation(editValues.event_slug);
    //   let event = result.event;
    //   console.log(event, "event");
    //   console.log(event, "eventEvent");
    //   let group_array = [];
    //   let group_object = {};
    //   event.group.map((group) => {
    //     group_object = {
    //       group_slug: group,
    //     };
    //     group_array.push(group_object);
    //   });
    //   console.log(group_array, "group array");
    //   let selected_member_array = [];
    //   let selected_member_object = {};
    //   event.member.map((member) => {
    //     selected_member_object = {
    //       member_id: member._id,
    //     };
    //     selected_member_array.push(selected_member_object);
    //   });
    //   console.log(selected_member_array, "selected_member_array");
    //   console.log(group_array, "group_array");
    //   var dateString = moment(state.startDate).format("YYYY-MM-DD");
    //   eventObject = {
    //     event_id: event._id,
    //     title: event.title,
    //     event_title: event.title,
    //     date: event.start_date,
    //     start_date: event.start_date,
    //     end_date: event.end_date,
    //     start_time: event.start_time,
    //     end_time: event.end_time,
    //     recurring_iteration: event.recurring_iteration,
    //     description: event.description,
    //     event_type: event.event_type,
    //     action_by: event.action_by,
    //     color: event.color,
    //     event_color: event.color,
    //     recurring_type: event.recurring_type,
    //     event_slug: event.event_slug,
    //     status: event.status,
    //     // group: group_array,
    //     // member: selected_member_array,
    //   };
    //   setEditValues(eventObject);
    //   dataList();
    //   setIsLoading(false);
    //   setShowEditComponent(false);
    //   enqueueSnackbar(result.message, { variant: "success" });
    // } else {
    //   setIsLoading(false);
    //   enqueueSnackbar(result.message, { variant: "error" });
    // }
  };
  React.useEffect(() => {
    getGroups();
    getMember();
  }, [editValues]);

  useEffect(() => {
    timeConversion();
    let groupsDetail = editValues.group;
    let membersDetail = editValues.member;
    setState((prevState) => ({
      ...prevState,
      ["eventTitle"]: editValues.title,
      ["eventColor"]: editValues.color,
      ["recurringType"]: editValues.recurring_type,
      ["startDate"]: editValues.start_date,
      ["itrationNumber"]: editValues.recurring_iteration,
      ["eventDescription"]: editValues.description,
      ["startTime"]: startTimes,
      ["endTime"]: editValues.end_time,
      ["eventSlug"]: editValues.event_slug,
      ["status"]: editValues.status,
    }));
    setGroupsNameFromEdit(editValues.group);

    let slugs_array = [];
    groupsDetail?.map((group) => {
      slugs_array.push(group._id.group_slug);
    });
    setGroupsName(slugs_array);
    let members_array = [];
    membersDetail?.map((member) => {
      members_array.push(member._id._id);
    });
    setPerson(members_array);
  }, [editValues]);
  useEffect(() => {
    timeConversion();
  }, []);

  return (
    <div className="container new-memories">
      <form onSubmit={handleSubmit}>
        <TextField
          className="mt-4"
          id="outlined-basic"
          label="Event Title"
          variant="outlined"
          name="eventTitle"
          value={state.eventTitle}
          required={true}
          onChange={(e) => handleChange(e)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            name="startDate"
            value={state.startDate}
            format="YYYY-MM-DD"
            onChange={(e) => handleChangeDate(e)}
            renderInput={(params) => (
              <TextField {...params} className="mt-3" required={true} />
            )}
          />
        </LocalizationProvider>
        <TextField
          id="color"
          type="color"
          label="Event Color"
          name="eventColor"
          className="mt-3"
          variant="outlined"
          required={true}
          value={state.eventColor}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          id="time"
          label="Start Time"
          type="time"
          className="mt-3"
          name="startTime"
          required={true}
          value={startTimes}
          onChange={(e) => handleChangeTime(e)}
        />
        <TextField
          variant="outlined"
          id="time"
          label="End Time"
          type="time"
          className="mt-3"
          name="endTime"
          required={true}
          value={endTimes}
          onChange={(e) => handleChangeEndTime(e)}
        />
        <TextField
          id="outlined-basic"
          label="Number of Times To Repeat"
          variant="outlined"
          name="itrationNumber"
          value={state.itrationNumber}
          required={true}
          onChange={(e) => handleChange(e)}
          type="number"
          className="mt-3"
        />
        <FormControl variant="outlined" className="mt-3">
          <InputLabel id="demo-simple-select-outlined-label">
            Recurring Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={state.recurringType}
            onChange={(e) => handleChange(e)}
            label="recurringType"
            name="recurringType"
            className="svg-color"
            MenuProps={{
              classes: {
                paper: classes.paper,
              },
            }}
            sx={{
              color: get_root_value("--input-text-color"),
            }}
          >
            <MenuItem value="daily">
              <em>Daily</em>
            </MenuItem>
            <MenuItem value="weekly">
              <em>Weekly</em>
            </MenuItem>
            <MenuItem value="monthly">
              <em>Monthly</em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="mt-3">
          <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={state.status}
            onChange={(e) => handleChange(e)}
            label="Status"
            name="status"
            className="svg-color"
            MenuProps={{
              classes: {
                paper: classes.paper,
              },
            }}
            sx={{
              color: get_root_value("--input-text-color"),
            }}
          >
            <MenuItem value="true">
              <em>Active</em>
            </MenuItem>
            <MenuItem value="false">
              <em>Inactive</em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className="mt-3">
          <InputLabel id="demo-multiple-name-label">Groups</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={groupsName}
            onChange={handleChangeGroup}
            input={<OutlinedInput label="Groups" />}
            MenuProps={MenuProps}
          >
            {groupListing.map((name) => (
              <MenuItem
                key={name}
                value={name.group_slug}
                style={getStyles(name, groupsName, theme)}
              >
                {name.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="mt-3">
          <InputLabel id="demo-multiple-name-label">Members</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={person}
            onChange={handleChangeMember}
            input={<OutlinedInput label="Members" />}
            MenuProps={MenuProps}
          >
            {personName.map((name) => (
              <MenuItem
                key={name}
                value={name._id}
                style={getStyles(name, person, theme)}
              >
                {name.first_name + " " + name.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Event Description"
          multiline
          rows={5}
          variant="outlined"
          style={{ width: "100%" }}
          name="eventDescription"
          value={state.eventDescription}
          onChange={(e) => handleChange(e)}
          className="mt-3"
          required={true}
        />

        <div className="text-end mt-3">
          <button className="submit-button" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
