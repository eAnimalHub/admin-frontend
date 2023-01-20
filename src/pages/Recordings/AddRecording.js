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
import { VaultListing } from "src/DAL/Vault/Vault";
import Autocomplete from "@mui/material/Autocomplete";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import { AddProgram } from "src/DAL/Programmes/Programmes";
import { object } from "prop-types";
import { ProgramListing } from "src/DAL/Program/Programs";
import { AddRecording } from "src/DAL/Recording/Recordings";
import { get_root_value } from "src/utils/domUtils";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
  button: {
    backgroundColor: get_root_value("--button-background-color"),
    color: get_root_value("--button-text-color"),
    "&:hover": {
      backgroundColor: get_root_value("--button-background-color"),
      color: get_root_value("--button-text-color"),
    },
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

export default function MultilineTextFields() {
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
  const [programList, setProgramList] = React.useState([]);
  const [vaultList, setVaultList] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [programName, setProgramName] = React.useState("");
  const [vaultName, setVaultName] = React.useState("");

  const [inputs, setInputs] = React.useState({
    title: "",
    unit: "",
    zoomLink: "",
    status: "",
    recordingStatus: "true",
    program: "",
    image: {},
    password: "",
    areaCode: "",
    videoUrl: "",
    groups: [],
    members: [],
    short_description: "",
    detailed_description: "",
    video_show_Status: "",
  });

  const getProgramListing = async () => {
    const result = await "";
    setIsLoading(true);
    if (result.code === 200) {
      //console.log(result, "getProgramListing");
      setProgramList(result.program);
      setProgramName(result.program[0].program_slug);
      setIsLoading(false);
    } else {
      // enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const getVaultList = async () => {
    const result = await "";
    if (result.code === 200) {
      //console.log(result, "result");
      setVaultList(result.vault_category);
      setVaultName(result.vault_category[0].vault_slug);
    }
  };

  const fileChangedHandler = (e) => {
    //console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
  };
  const audioFileChange = (e) => {
    //console.log(e.target.files[0]);
    setAudio(e.target.files[0]);
  };
  const handleProgramName = (data) => {
    //console.log(data, "programName");
    setProgramName(data.program_slug);
  };
  const handleVaultName = (data) => {
    //console.log(data, "Name");
    setVaultName(data.vault_slug);
  };
  const handldeDeleteAudio = () => {
    //console.log("deleteAudio");
    setAudio();
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

  const handleChangeDate = (newValue) => {
    let todayDate = moment(newValue).format("YYYY-MM-DD");
    let dateType = todayDate.toString();
    //console.log(typeof dateType, "dateType");
    setDate(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs, "Text fields");
    // console.log(personName, "Members");
    // console.log(groups, "Groups");
    // console.log(email, password, "email,password");
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("image", inputs.image);
    formData.append("short_description", inputs.short_description);
    // formData.append("detailed_description", inputs.detailed_description);
    formData.append("status", inputs.recordingStatus);
    formData.append("video_url", inputs.videoUrl);
    formData.append("program_slug", programName);
    formData.append("recording_date", moment(date).format("YYYY-MM-DD"));
    formData.append("vault_category_slug", vaultName);
    // formData.append("is_program_show_on_list", inputs.video_show_Status);
    if (audioFile) {
      formData.append("audio_file", audioFile);
      console.log(audioFile, "not empty case of audio file");
    } else {
    }
    //console form data
    for (var value of formData.values()) {
      //console.log(value, "form data value");
    }

    setIsLoading(true);
    const result = await formData;
    if (result.code === 200) {
      ////console.log(result, "result");
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/recordings`);
    } else {
      ////console.log(result);

      setIsLoading(false);
    }
  };
  const handleChangeProgram = (e) => {
    ////console.log(e, "handleChangeProgram");
    setProgramName(e.target.value);
  };
  const handleChangeVault = (event) => {
    ////console.log(event.target.value, "handleChangeVault");
    setVaultName(event.target.value);
  };

  const handleChange = (event) => {
    ////console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  React.useEffect(() => {
    getProgramListing();
    getVaultList();
  }, []);
  //   ////console.log(typeof audioFile, "values of audio to be send ");
  ////console.log(programList, "programListprogramList");
  ////console.log(programName, "programName");

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
          <h2>Add Product</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Name *"
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
            label="Unit *"
            variant="outlined"
            fullWidth
            name="unit"
            value={inputs.unit}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Product Status *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="recordingStatus"
              value={inputs.recordingStatus}
              label="Product Status *"
              onChange={handleChange}
            >
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Unavailable</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-6">
              <p className="">Upload Image *</p>
              <FormHelperText className="pt-0">
                Image Size(1000 X 670) ("JPG", "JPEG", "PNG","WEBP")
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
                  className="small-contained-button"
                  startIcon={<FileUploadIcon style={{ fill: "white" }} />}
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

        <div className="col-12 mt-5">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="Short Description *"
              multiline
              rows={6}
              name="short_description"
              value={inputs.short_description}
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
