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
  EditGroupApi,
  GroupDetailApi,
  GroupListing,
} from "src/DAL/Groups/Groups";
import { ProgramListing } from "src/DAL/Program/Programs";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import {
  IconButton,
  Divider,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { AddProgram } from "src/DAL/Programmes/Programmes";
import { object } from "prop-types";
import { MemberListing } from "src/DAL/member/Member";
import { htmlDecode } from "src/utils/convertHtml";

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

export default function EditGroups() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state, "editValueseditValues");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setiswaiting] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState("Controlled");
  const [personName, setPersonName] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setProfileImage] = React.useState({});
  const [audioFile, setAudio] = React.useState();
  const [groups, setGroups] = React.useState([]);
  const [programListing, setProgramListing] = React.useState([]);
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [member, setMember] = React.useState([]);
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const [person, setPerson] = React.useState([]);
  const [inputs, setInputs] = React.useState({
    title: "",
    zoomLink: "",
    status: "",
    image: {},
    password: "",
    areaCode: "",
    type: "",
    groups: [],
    members: [],
    short_description: "",
    detailed_description: "",
  });
  const {
    id,
    image,
    order,
    password,
    status,
    title,
    zoomLink,
    areaCode,
    short_description,
    detail_description,
    programs,
    slug,
  } = state.editValues;

  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
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
  const getPrograms = async () => {
    setIsLoading(true);
    const result = await ProgramListing();
    if (result.code === 200) {
      console.log(result, "list of program");
      setProgramListing(result.program);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
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

  const groupDetail = async () => {
    const result = await GroupDetailApi(slug);
    if (result.code === 200) {
      console.log(result.group_members, "groupDetail");
      setSelectedMembers(result.group_members);
      let member_array = [];
      result.group_members.map((member) => {
        member_array.push(member._id);
      });
      setPerson(member_array);
      // setSelectedPrograms(result.group_programs);
    }
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
  const handleChangePrograms = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPrograms(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const ProgramsName = typeof value === "string" ? value.split(",") : value;
    setInputs((input) => ({
      ...input,
      ["programs"]: ProgramsName,
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
    let program_array = [];
    let program_object = {};
    selectedPrograms.map((program) => {
      program_object = {
        program_slug: program,
      };
      program_array.push(program_object);
    });
    let selected_member_array = [];
    let selected_member_object = {};
    person.map((member) => {
      selected_member_object = {
        member_id: member,
      };
      selected_member_array.push(selected_member_object);
    });
    console.log(inputs, "Text fields");
    let postData = {
      title: inputs.title,
      status: inputs.status,
      program: program_array,
      member: selected_member_array,
    };
    console.log(postData, "postData");
    setIsLoading(true);
    const result = await EditGroupApi(slug, postData);
    if (result.code === 200) {
      console.log(result, "result");
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/groups`);
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
      ["zoomLink"]: zoomLink,
      ["password"]: password,
      ["status"]: status,
      ["areaCode"]: areaCode,
      ["detailed_description"]: detail_description,
      ["short_description"]: short_description,
      // ["areaCode"]: areaCode,
    }));
    setProfileImage(image);
    let program_slug = [];
    let program_slug_object = {};
    programs.map((program) => {
      console.log(program._id.program_slug, "program_slug_object");
      program_slug.push(program._id.program_slug);
    });
    setSelectedPrograms(program_slug);
    console.log(program_slug, "program_slugprogram_slug");
  }, []);
  useEffect(() => {
    getMember();
    getPrograms();
    groupDetail();
    // questionDetail();
  }, []);

  //   console.log(typeof audioFile, "values of audio to be send ");
  // console.log(programListing, "programListing");
  console.log(person, "personpersonperson");
  console.log(selectedPrograms, "selectedProgramsselectedPrograms");

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
          <h2>Edit Group</h2>
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Group Status*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
              label="Group Type *"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={personName}
              value={selectedMembers}
              getOptionSelected={(option, value) => option._id === value._id}
              getOptionLabel={(option) => option.first_name}
              filterSelectedOptions
              onChange={(event, newValue) => {
                setSelectedMembers(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Members" placeholder="Members" />
              )}
            /> */}
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
                    {htmlDecode(name.first_name + " " + name.last_name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={programListing}
              value={selectedPrograms}
              getOptionSelected={(option, value) =>
                option.program_slug === value.program_slug
              }
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={(event, newValue) => {
                setSelectedPrograms(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Programme"
                  placeholder="Programme"
                />
              )}
            /> */}
            <FormControl className="mt-3" fullWidth>
              <InputLabel id="demo-multiple-name-label">Programme</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedPrograms}
                onChange={handleChangePrograms}
                input={<OutlinedInput label="Programme" />}
                MenuProps={MenuProps}
              >
                {programListing.map((name) => (
                  <MenuItem
                    key={name}
                    value={name.program_slug}
                    style={getStyles(name, personName, theme)}
                  >
                    {name.title}
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
