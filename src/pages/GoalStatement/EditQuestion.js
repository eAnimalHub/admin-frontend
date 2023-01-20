import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";

import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import { AddProgram } from "src/DAL/Programmes/Programmes";
import { object } from "prop-types";
import {
  AddQuestion,
  EditQuestion,
  getDetailQuestion,
} from "src/DAL/GoalStatement/GoalStatement";
import { MemberListing } from "src/DAL/member/Member";
import { GroupListing } from "src/DAL/Groups/Groups";

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

export default function EditQuestions() {
  const navigate = useNavigate();
  const classes = useStyles();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setiswaiting] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState("Controlled");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setProfileImage] = React.useState({});
  const [audioFile, setAudio] = React.useState();
  const [personName, setPersonName] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [member, setMember] = React.useState([]);
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const [selectedGroups, setSelectedGroups] = React.useState([]);
  const [groupListing, setGroupListing] = React.useState([]);
  const [person, setPerson] = React.useState([]);
  const [groupsName, setGroupsName] = React.useState([]);
  const [inActiveGroup, setInactiveGroup] = React.useState([]);
  const [inputs, setInputs] = React.useState({
    question: "",
    questionType: "",
    questionPlaceholder: "",
    status: "",
    order: "",
    groups: [],
    members: [],
  });

  const fileChangedHandler = (e) => {
    // console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
  };
  const questionDetail = async () => {
    const result = await getDetailQuestion(params.slug);
    if (result.code === 200) {
      console.log(result, "resultresultresultresultresult");
      const data = result.goal_statement;
      let member_id = result.goal_statement_members;
      let member_object = [];
      member_id.map((member) => {
        member_object.push(member._id);
      });
      // setGroupListing((groups) => ({
      //   groupListing: [...groups, result.goal_statement_groups],
      // }));

      let groups_slug = result.goal_statement_groups;
      let selected_group = [];
      // let inactive_selected_group = []; // to show inactive group
      groups_slug.map((group) => {
        selected_group.push(group.group_slug);
        // inactive_selected_group.push(group);
      });
      // let all_group = groupListing.concat(inactive_selected_group); // to show inactive group
      // console.log(all_group, "all_groupall_groupall_group"); // to show inactive group
      // setGroupListing(all_group); // to show inactive group

      let selected_inactive_group = [];
      groups_slug.map((group) => {
        if (group.status == false)
          // selected_inactive_group.push(group.group_slug);
          selected_inactive_group.push(group.group_slug);
      });
      // setInactiveGroup(selected_inactive_group);
      setInactiveGroup(result.goal_statement_groups);

      console.log(
        inActiveGroup,
        "inActiveGroupinActiveGroupinActiveGroupinActiveGroup"
      );
      // member_array.push(member_object);
      console.log(member_object, "member_object");
      console.log(selected_group, "selected_group");
      setSelectedMembers(result.goal_statement_members);
      setSelectedGroups(result.goal_statement_groups);
      setInputs((inputs) => ({
        ...inputs,
        ["question"]: data.question_statement,
        ["questionPlaceholder"]: data.question_placeholder,
        ["questionType"]: data.question_type,
        ["status"]: data.status,
        ["order"]: data.question_order,
      }));
      console.log(member_id, "member_idmember_id");
      setPerson(member_object);
      setGroupsName(selected_group);
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

  console.log(groupListing, "groupListinggroupListing");
  console.log(inActiveGroup, "inActiveGroupinActiveGroup");

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
      // setGroupListing(active_groups.concat(inActiveGroup));
      setGroupListing(active_groups);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleChangeGroup = (event) => {
    console.log(event, "iiiiiiiiiiiiiiii");
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
  console.log(groups, "groupsgroups");
  const handleSubmit = async (e) => {
    let group_array = [];
    let group_object = {};
    groupsName.map((group) => {
      group_object = {
        group_slug: group,
      };
      group_array.push(group_object);
    });
    // let member_array = [];
    // let member_object = {};
    // personName.map((person) => {
    //   member_object = {
    //     member_id: person,
    //   };
    //   member_array.push(member_object);
    // });
    // member id getting
    let selected_member_array = [];
    let selected_member_object = {};
    person.map((member) => {
      selected_member_object = {
        member_id: member,
      };
      selected_member_array.push(selected_member_object);
    });
    console.log(selected_member_array, "selected_member_array");
    console.log(group_array, "group_arraygroup_array");
    // member id getting end
    const postData = {
      question_statement: inputs.question,
      question_type: inputs.questionType,
      question_placeholder: inputs.questionPlaceholder,
      status: inputs.status,
      // order: inputs.order,
      group: group_array,
      member: selected_member_array,
    };

    e.preventDefault();
    setIsLoading(true);
    console.log(postData, "postdData");
    const result = await EditQuestion(postData, params.slug);
    if (result.code === 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/goal-statement`);
    } else {
      console.log(result, "kkkkkkk");
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleGroupSelect = (data) => {
    console.log(data, "dddddd");
    setSelectedGroups((currentArray) => [...currentArray, data]);
  };
  console.log(selectedGroups, "selectedGroupsselectedGroupsselectedGroups");

  const handleChange = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  React.useEffect(() => {
    questionDetail();
  }, []);
  React.useEffect(() => {
    getMember();
    getGroups();
  }, []);

  console.log(person, "personpersonperson");
  console.log(groupsName, "groupsgroupsgroups");

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
          <h2>Edit Question</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Question"
            variant="outlined"
            fullWidth
            name="question"
            value={inputs.question}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Question Placeholder*"
            variant="outlined"
            fullWidth
            name="questionPlaceholder"
            value={inputs.questionPlaceholder}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Question Type *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="questionType"
              value={inputs.questionType}
              label="Question Type *"
              onChange={handleChange}
            >
              <MenuItem value="textbox">Textbox</MenuItem>
              <MenuItem value="textarea">Textarea</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Question Status *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
              label="Question Status *"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Order*"
            variant="outlined"
            fullWidth
            name="order"
            value={inputs.order}
            onChange={handleChange}
          />
        </div> */}

        {/* <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Member</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChangeMembers}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Member" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {member.map((name) => (
                  <MenuItem
                    key={name}
                    value={name._id}
                    style={(name, personName, theme)}
                  >
                    {name.first_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div> */}
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={groupListing}
              value={selectedGroups}
              getOptionSelected={(option, value) => option._id === value._id}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={(event, newValue) => {
                setSelectedGroups(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Groups" placeholder="Groups" />
              )}
            /> */}
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
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
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
        </div>
        {/* <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-6">
              <p className="">Upload Audio</p>
              <FormHelperText className="pt-0">Audio mp3</FormHelperText>
            </div>
            <div className="col-6 text-end pt-2">
              <label htmlFor="audio">
                <Input
                  accept="audio/mp3,audio/*;capture=microphone"
                  id="audio"
                  multiple
                  name="audio"
                  type="file"
                  onChange={audioFileChange}
                />
                <Button
                  variant="contained"
                  startIcon={<FileUploadIcon />}
                  component="span"
                >
                  Upload
                </Button>
              </label>
            </div>
          </div>
          <p className="text-secondary">{audioFile && audioFile.name}</p>
        </div> */}
        <div className="text-end mt-4">
          <button onClick={handleSubmit} className="small-contained-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
