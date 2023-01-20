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
import { IconButton, Divider, CircularProgress } from "@mui/material";
import { AddProgram } from "src/DAL/Programmes/Programmes";
import { object } from "prop-types";

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

export default function EditMember() {
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
  const [inputs, setInputs] = React.useState({
    title: "",
    zoomLink: "",
    status: "",
    image: {},
    password: "",
    areaCode: "",
    groups: [],
    members: [],
    short_description: "",
    detailed_description: "",
  });

  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
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
    console.log(inputs, "Text fields");
    // console.log(personName, "Members");
    // console.log(groups, "Groups");
    // console.log(email, password, "email,password");
    // const formData = new FormData();
    // formData.append("title", inputs.name);
    // formData.append("main_image", inputs.image);
    // formData.append("short_description", inputs.short_description);
    // formData.append("detailed_description", inputs.detailed_description);
    // formData.append("status", inputs.status);
    // formData.append("video_url", inputs.video_url);
    // if (audioFile) {
    //   formData.append("audio_file", audioFile);
    //   console.log(audioFile, "not empty case of audio file");
    // } else {
    // }
    // //console form data
    // for (var value of formData.values()) {
    //   console.log(value, "form data value");
    // }

    // setIsLoading(true);
    // const result = await AddProgram(formData);
    // if (result.code === 200) {
    //   console.log(result, "result");
    //   navigate(`/programmes`);
    // } else {
    //   console.log(result);
    //   enqueueSnackbar(result.message, { variant: "error" });
    //   setIsLoading(false);
    // }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //   console.log(typeof audioFile, "values of audio to be send ");
  console.log(inputs, "Remaining fields");

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
          <h2>Edit Member</h2>
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
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Area Code*"
            variant="outlined"
            fullWidth
            name="areaCode"
            value={inputs.areaCode}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Member Status *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
              label="Member Status*"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-6">
              <p className="">Upload Image</p>
              <FormHelperText className="pt-0">
                Image Size(1348 X 898)
              </FormHelperText>
            </div>
            <div className="col-6 text-end pt-2">
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="image"
                  onChange={fileChangedHandler}
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
          {inputs.image.name == "" ? (
            ""
          ) : (
            <p className="text-secondary">{inputs.image.name}</p>
          )}
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-2">
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
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Groups</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={groups}
                onChange={handleChangeGroups}
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
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={(name, groups, theme)}
                  >
                    {name}
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

        <div className="col-12 mt-5">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="Room Short Description"
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
              label="Room Detail Description"
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
