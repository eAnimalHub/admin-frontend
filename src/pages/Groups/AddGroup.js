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
import { AddGroupApi, GroupListing } from "src/DAL/Groups/Groups";
import { ProgramListing } from "src/DAL/Program/Programs";
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

export default function AddGroups() {
  const navigate = useNavigate();
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
  const [programData, setProgramData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [programListing, setProgramListing] = React.useState([]);
  const [groupListing, setGroupListing] = React.useState([]);
  const [groupsName, setGroupsName] = React.useState([]);
  const [person, setPerson] = React.useState([]);

  const [inputs, setInputs] = React.useState({
    title: "",
    status: "true",
    programs: [],
    members: [],
  });

  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
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

  const getMemberListing = async () => {
    const result = await MemberListing();
    if (result.code === 200) {
      console.log(result, "member list");
      setMemberData(result.member);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const audioFileChange = (e) => {
    console.log(e.target.files[0]);
    setAudio(e.target.files[0]);
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

  // const handleChangeMember = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setGroups(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  //   const memberName = typeof value === "string" ? value.split(",") : value;
  //   setInputs((input) => ({
  //     ...input,
  //     ["members"]: memberName,
  //   }));
  // };
  console.log(programListing, "programListing");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ------------
    let program_array = [];
    let program_object = {};
    selectedPrograms.map((program) => {
      program_object = {
        program_slug: program,
      };
      program_array.push(program_object);
    });
    let member_array = [];
    let member_object = {};
    person.map((person) => {
      console.log(program_array, "program_array");
      member_object = {
        member_id: person,
      };
      member_array.push(member_object);
    });
    // =============
    setIsLoading(true);
    let postData = {
      title: inputs.title,
      status: inputs.status,
      program: program_array,
      member: member_array,
    };
    console.log(postData, "postDatapostData");
    // console.log(program_array, "program_arrayprogram_array");
    const result = await AddGroupApi(postData);
    if (result.code === 200) {
      console.log(result, "result");
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/groups`);
    } else {
      console.log(result, "error case");
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
  //   console.log(typeof audioFile, "values of audio to be send ");
  // console.log(inputs, "Remaining fields");
  console.log(person, "personpersonperson");
  console.log(selectedPrograms, "selectedPrograms");
  React.useEffect(() => {
    getMemberListing();
    getPrograms();
    getMember();
  }, []);

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
          <h2>Add Group</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Group Name"
            variant="outlined"
            fullWidth
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4 mb-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Group Status *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
              label="Room Status*"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-2">
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
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={memberData}
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
