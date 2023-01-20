import * as React from "react";
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
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";

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

export default function AddLessonsDoc() {
  const navigate = useNavigate();
  const id = useParams();
  const params = useParams();
  const theme = useTheme();
  const [value, setValue] = React.useState("Controlled");
  const [personName, setPersonName] = React.useState([]);
  const [inputs, setInputs] = [
    {
      program_title: "",
      bob_video_id_status: "",
      bob_video_url: "",
      kim_video_url_status: "",
      kim_video_url: "",
      participant_guide_status: "",
      participant_guide: "",
      goal_card_status: "",
      goal_card: "",
      other_documents_status: "",
      participant_guide: "",
      mp3_status: "",
      mp3_recording: "",
      main_image: "",
      program_logo: "",
      program_status: "",
      show_on_vault: "",
      lesson_button_name: "",
      video_url_status: "",
      video_url: "",
      name_bob_video_url: "",
      name_kim_video_url: "",
      name_participant_guide: "",
      name_goal_card: "",
      name_other_documents: "",
      mp3_recording_name: "",
      program_vault_logo: "",
      is_show_on_website: "",
      set_up_video_id: "",
      set_up_video_title: "",
      program_order: "",
      program_description: "",
      program_detailed_description_status: "",
      detailed_program_description: "",
      locked_program_image: "",
      locked_program_button_link: "",
      program_locked_main_video_id: "",
      program_locked_main_video_id: "",
      program_locked_short_description: "",
      program_locked_detailed_description: "",
    },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12 mb-3">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate(`/programmes/lesson_sources/${params.id}`)}
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
          <h2>Add Lessonsssss Document</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Document Name*"
            name="review_title"
            fullWidth
            value={value}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Document Type *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Show on Main Website *"
              onChange={handleChange}
            >
              <MenuItem value="Active">Image</MenuItem>
              <MenuItem value="Inactive">Video</MenuItem>
              <MenuItem value="Inactive">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Show on Main Website *"
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
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
        </div>

        <div className="col-12 mt-5">
          <Editor />
        </div>

        <div className="text-end mt-4">
          <button className="small-contained-button"> Submit</button>
        </div>
      </div>
    </div>
  );
}
