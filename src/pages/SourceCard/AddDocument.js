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
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import { AddProgram, AddProgramDocument } from "src/DAL/Programmes/Programmes";

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

export default function AddDocument() {
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [inputs, setInputs] = React.useState({
    name: "",
    status: "",
    file: {},
    file_type: "",
    detailed_description: "",
    program_slug: "",
  });
  console.log(params.id, "slug to be passd");
  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["file"]: e.target.files[0],
    });
  };
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
    formData.append("program_slug", params.id);
    formData.append("document_file", inputs.file);
    formData.append("document_type", inputs.file_type);
    formData.append("detailed_description", inputs.detailed_description);
    formData.append("status", inputs.status);

    //console form data
    for (var value of formData.values()) {
      console.log(value, "form data value Documents");
    }
    setIsLoading(true);
    const result = await AddProgramDocument(formData);
    if (result.code === 200) {
      console.log(result, "result");
      navigate(`/programmes/sources/${params.id}`);
    } else {
      console.log(result);
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12 mb-3">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate(`/programmes/sources/${params.id}`)}
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
          <h2>Add Programme Document</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Document Name*"
            name="name"
            fullWidth
            value={inputs.name}
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
              value={inputs.file_type}
              name="file_type"
              label="Show on Main Website *"
              onChange={handleChange}
            >
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="audio">Audio</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
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
              <p className="">Upload Resource</p>
              <FormHelperText className="pt-0">Resource</FormHelperText>
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
            {" "}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
