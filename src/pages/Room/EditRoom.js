import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
//import Editor from "../../components/Editor/Editor";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import { AddProgram } from "src/DAL/Programmes/Programmes";
import { object } from "prop-types";
import { s3baseUrl } from "src/config/config";
import { EditPods } from "src/DAL/Pods/Pods";
import { GroupListing } from "src/DAL/Groups/Groups";
import { MemberListing } from "src/DAL/member/Member";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Input = styled("input")({
  display: "none",
});

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function EditRoom() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setiswaiting] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState("Controlled");
  const [personName, setPersonName] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [file, setProfileImage] = React.useState({});
  const [audioFile, setAudio] = React.useState();
  const [groups, setGroups] = React.useState([]);
  const [groupListing, setGroupListing] = React.useState([]);
  const [person, setPerson] = React.useState([]);
  const [groupsName, setGroupsName] = React.useState([]);

  const [inputs, setInputs] = React.useState({
    title: "",
    zoomLink: "",
    status: "",
    order: "",
    // image: {},
    password: "",
    roomType: "general",
    short_description: "",
    detailed_description: "",
  });
  const {
    id,
    room_slug,
    room_image,
    room_type,
    order,
    password,
    status,
    title,
    zoom_link,
    areaCode,
    short_description,
    detail_description,
    group,
    member,
  } = state.editValues;
  console.log(state.editValues, "editValueseditValues");

  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
    setImageStatus(true);
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
      console.log(result, "list of group");
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
      console.log(result, "list of member");
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

  const audioFileChange = (e) => {
    console.log(e.target.files[0]);
    setAudio(e.target.files[0]);
  };
  const handleChangeMembers = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const membersName = typeof value === "string" ? value.split(",") : value;
    setInputs((input) => ({
      ...input,
      ["members"]: membersName,
    }));
  };
  const handleChangeGroups = (event) => {
    const {
      target: { value },
    } = event;
    setGroups(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const groupName = typeof value === "string" ? value.split(",") : value;
    setInputs((input) => ({
      ...input,
      ["groups"]: groupName,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const formData = new FormData();
    console.log(inputs, "Text fields");
    formData.append("title", inputs.title);

    formData.append("short_description", inputs.short_description);
    formData.append("detail_description", inputs.detailed_description);
    formData.append("status", inputs.status);
    formData.append("order", inputs.order);
    formData.append("room_type", inputs.roomType);
    formData.append("zoom_link", inputs.zoomLink);
    formData.append("password", inputs.password);
    formData.append("group", JSON.stringify(group_array));
    formData.append("member", JSON.stringify(selected_member_array));
    if (imageStatus == true) {
      formData.append("image", inputs.image);
    }
    for (var value of formData.values()) {
      console.log(value, "form data value");
    }

    setIsLoading(true);
    const result = await EditPods(room_slug, formData);
    if (result.code === 200) {
      console.log(result, "result");
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/pods`);
    } else {
      console.log(result);
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    setInputs((inputs) => ({
      ...inputs,
      ["title"]: title,
      ["zoomLink"]: zoom_link,
      ["password"]: password,
      ["status"]: status,
      ["order"]: order,
      ["roomType"]: room_type,
      ["detailed_description"]: detail_description,
      ["short_description"]: short_description,
      // ["areaCode"]: areaCode,
    }));
    let groups_slug = group;
    let selected_group = [];
    groups_slug.map((group) => {
      selected_group.push(group._id.group_slug);
    });
    let member_id = member;
    let member_object = [];
    member_id.map((member) => {
      member_object.push(member._id._id);
    });
    setGroupsName(selected_group);
    setPerson(member_object);
    setProfileImage(room_image.thumbnail_1);
    console.log(selected_group, "selected_groupselected_group");
  }, []);
  useEffect(() => {
    getGroups();
    getMember();
  }, []);

  //   console.log(typeof audioFile, "values of audio to be send ");
  console.log(groupsName, "groupsNamegroupsNamegroupsNamegroupsNamegroupsName");
  console.log(inputs, "inputs");

  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          {/* <button
            className="small-contained-button float-end mt-1"
            onClick={() => navigate(`/programmes/addreview/`)}
          >
            Add Programme Review
          </button> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>Edit Pod</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Zoom Link"
            variant="outlined"
            fullWidth
            name="zoomLink"
            value={inputs.zoomLink}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Area Code*"
            variant="outlined"
            fullWidth
            name="areaCode"
            value={inputs.areaCode}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Order*"
            variant="outlined"
            fullWidth
            name="areaCode"
            value={inputs.order}
            onChange={handleChange}
          />
        </div> */}

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pod Status*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
              label="pod status*"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pods Type*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="roomType"
              value={inputs.roomType}
              label="pods Type*"
              onChange={handleChange}
            >
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-4">
              <p className="">Upload Image</p>
              <FormHelperText className="pt-0">
                Image Size(1000 X 670) ("JPG", "JPEG", "PNG","WEBP")
              </FormHelperText>
            </div>
            <div className="col-3">
              {file && <img src={s3baseUrl + file} height={50} />}
            </div>
            <div className="col-5 text-end pt-2">
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="image"
                  onChange={fileChangedHandler}
                />
                <button className="small-contained-button" component="span">
                  {<FileUploadIcon />} Upload
                </button>
              </label>
            </div>
          </div>
          {inputs.image ? (
            inputs.image.name == "" ? (
              ""
            ) : (
              <p className="text-secondary">{inputs.image.name}</p>
            )
          ) : (
            ""
          )}
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <FormControl className="mt-3" fullWidth>
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
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <FormControl className="mt-3" fullWidth>
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
        </div>

        <div className="col-12 mt-5">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="Short Description"
              multiline
              rows={6}
              name="short_description"
              value={inputs.short_description}
              onChange={handleChange}
            />
            <FormHelperText>Maximum limit 500 characters</FormHelperText>
          </FormControl>
        </div>
        <div className="col-12 mt-4">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="Detail Description"
              multiline
              rows={6}
              name="detailed_description"
              value={inputs.detailed_description}
              onChange={handleChange}
            />
            <FormHelperText>Maximum limit 500 characters</FormHelperText>
          </FormControl>
        </div>

        <div className="text-end mt-4">
          <button onClick={handleSubmit} className="small-contained-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
