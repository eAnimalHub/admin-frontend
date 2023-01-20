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
import { s3baseUrl } from "src/config/config";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import {
  AddProgram,
  EditPrograms,
  getProgramDetail,
} from "src/DAL/Programmes/Programmes";
import { object } from "prop-types";
import { isEmpty } from "lodash";

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

export default function MultilineTextFields() {
  const navigate = useNavigate();
  const classes = useStyles();
  const params = useParams();
  const id = params.id;
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setiswaiting] = useState(false);
  const theme = useTheme();
  const [image, setImage] = React.useState("");
  const [audioFile, setAudioFile] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setProfileImage] = React.useState({});
  const [audio, setAudio] = React.useState({});
  const [inputs, setInputs] = React.useState({
    name: "",
    video_url: "",
    status: "",
    order: "",
    image: {},
    audio: {},
    short_description: "",
    detailed_description: "",
  });

  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
  };
  const audioFileChange = (e) => {
    console.log(e.target.files[0], "audio jo new uploaded ha ");
    setAudioFile(e.target.files[0]);
    setInputs({
      ...inputs,
      ["audio"]: e.target.files[0],
    });
  };
  const audioPlay = () => {};

  const get_program = async () => {
    setIsLoading(true);
    const program_detail = await getProgramDetail(params.id);
    if (program_detail.code == 200) {
      setIsLoading(false);
      console.log(program_detail.program, "Program data to use");
      const result = program_detail.program;
      setProfileImage(result.program_images.thumbnail_1);
      setAudio(result.audio_file);
      setInputs({
        ...inputs,
        ["name"]: result.title,
        ["video_url"]: result.video_url,
        ["status"]: result.status,
        ["order"]: result.order,
        ["short_description"]: result.short_description,
        ["detailed_description"]: result.detailed_description,
      });
    } else {
      console.log(typeof file, "to know the type of the file");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password, "email,password");

    const formData = new FormData();
    formData.append("title", inputs.name);
    formData.append("short_description", inputs.short_description);
    formData.append("detailed_description", inputs.detailed_description);
    formData.append("status", inputs.status);
    formData.append("order", inputs.order);
    formData.append("video_url", inputs.video_url);
    if (image) {
      formData.append("main_image", image);
    }
    // if (Object.keys(audioFile).length === 0) {
    //   console.log("empty");
    // } else {
    //   formData.append("audio_file", audioFile);
    // }
    if (audioFile) {
      formData.append("audio_file", audioFile);
      console.log(audioFile, "not empty case of audio file");
    } else {
    }
    //console form data
    for (var value of formData.values()) {
      console.log(value, "form data value");
    }
    setIsLoading(true);
    const result = await EditPrograms(id, formData);
    setIsLoading(true);
    if (result.code === 200) {
      console.log(result, "result");
      setIsLoading(false);
      navigate(`/programmes`);
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
    get_program();
  }, []);

  // console.log(inputs, "values of consultant");
  console.log(audio, "values of audio");
  console.log(s3baseUrl + file, " to show file");
  console.log(image, " to show image");
  console.log(audioFile, " to show audio ");
  console.log(typeof file, "to know the type of the file");

  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button mb-4"
            onClick={() => navigate(`/programmes`)}
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
          <h2>Edit Programme</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Programme Name *"
            name="name"
            fullWidth
            placeholder="Enter Program Title"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Main Video URL"
            fullWidth
            value={inputs.video_url}
            name="video_url"
            placeholder="Enter video ID"
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="order"
            fullWidth
            value={inputs.order}
            name="order"
            placeholder="order"
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Programme Status *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
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
            <div className="col-lg-4 col-md-4 col-sm-6">
              <p className="">Upload Image</p>
              <FormHelperText className="pt-0">Size(1348 X 898)</FormHelperText>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <img className="" height={50} src={s3baseUrl + file} />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-end pt-2">
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
          <p className="text-secondary">{inputs.image.name}</p>
          {/* {inputs.image == "" ? (
            ""
          ) : (
            <p className="text-secondary">{inputs.image.name}</p>
          )} */}
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-6">
              <p className="">Upload Audio</p>
              <FormHelperText className="pt-0">audio mp3</FormHelperText>
            </div>

            <div className="col-lg-6 col-md-4 col-sm-12 text-end pt-2">
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
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <audio className="w-100" src={s3baseUrl + audio} controls />
        </div>

        <div className="col-12 mt-5">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="Programme Short Description"
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
              label="Programme Detail Description"
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
