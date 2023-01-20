import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
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
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import {
  AddLessonRecording,
  AddProgram,
  AddProgramDocument,
} from "src/DAL/Programmes/Programmes";

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

export default function AddLessonsRecording() {
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [recordingdate, setDate] = React.useState("");
  const [inputs, setInputs] = React.useState({
    name: "",
    status: "",
    file: {},
    file_type: "",
    video_url: "",
    short_description: "",
    program_slug: "",
  });
  console.log(params, "slug to be passd");
  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["file"]: e.target.files[0],
    });
  };
  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  console.log(recordingdate, "conevrted date");
  const handleChange = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password, "email,password");
    const formData = new FormData();
    formData.append("title", inputs.name);
    // formData.append("program_slug", params.programSlug);
    formData.append("lesson_slug", params.lessonSlug);
    formData.append("video_url", inputs.video_url);
    formData.append("image", inputs.file);
    formData.append("short_description", inputs.short_description);
    formData.append("status", inputs.status);
    formData.append("recording_date", recordingdate);

    //console form data
    for (var value of formData.values()) {
      console.log(value, "form data value Documents");
    }
    setIsLoading(true);
    const result = await AddLessonRecording(formData);
    if (result.code === 200) {
      console.log(result, "result add lesson recording ka");
      navigate(
        `/lesson_recording_detail/${params.programSlug}/${params.lessonSlug}`
      );
    } else {
      console.log(result, "error k case me");
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  console.log(Date, "date picker");
  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12 mb-3">
          <IconButton
            className="back-screen-button"
            onClick={() =>
              navigate(
                `/programmes/lessons_detail/${params.programSlug}/${params.lessonSlug}`
              )
            }
          >
            <ArrowBackIcon />
          </IconButton>
          {/* <button
            className="small-contained-button float-end mt-1"
            onClick={() => navigate(`/programmes/addreview/`)}
          >
            Add Document
          </button> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>Add Lessons Recording</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Recording title*"
            name="name"
            fullWidth
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Recording video URL*"
            name="video_url"
            fullWidth
            value={inputs.video_url}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Recording Date"
              value={recordingdate}
              onChange={(newValue) => {
                setDate(convert(newValue));
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputs.status}
              name="status"
              label="Show on Main Website *"
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
              <p className="">Recording Image</p>
              <FormHelperText className="pt-0">(1348 X 898)</FormHelperText>
            </div>
            <div className="col-6 text-end pt-2">
              <label htmlFor="contained-button-file">
                <Input
                  id="contained-button-file"
                  multiple
                  type="file"
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
          <p className="text-secondary">{inputs.file.name}</p>
        </div>

        <div className="col-12 mt-4">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="Recording Short Description"
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
