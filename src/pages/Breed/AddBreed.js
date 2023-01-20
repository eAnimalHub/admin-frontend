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
import { animalCategoriesListingApi } from "src/DAL/animalCategoryApi/animalCategoriesApi";
import { addBreedApi, editBreedApi } from "src/DAL/breedApi/BreedApi";

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

export default function AddBreed() {
  const navigate = useNavigate();
  const classes = useStyles();
  const params = useParams();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [programList, setProgramList] = React.useState([]);
  const [programName, setProgramName] = React.useState("");
  const [inputs, setInputs] = React.useState({
    name: "",
    category: "",
    status: "true",
  });

  const getCategoryList = async () => {
    const result = await animalCategoriesListingApi();
    setIsLoading(true);
    if (result.code === 200) {
      //console.log(result, "getCategoryList");
      setProgramList(result.categories);
      setProgramName(result.categories[0]._id);
      setIsLoading(false);
    } else {
      // enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let postData = {
      name: inputs.name,
      category: inputs.category,
      status: inputs.status,
    };
    setIsLoading(true);
    const result = params.id
      ? await editBreedApi(postData, params.id)
      : await addBreedApi(postData);
    if (result.code === 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(-1);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    ////console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  React.useEffect(() => {
    getCategoryList();

    if (params?.id) {
      setInputs((inputs) => ({
        ...inputs,
        ["name"]: state?.name,
        ["category"]: state?.category?._id,
        ["status"]: state?.status,
      }));
    }
  }, []);

  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(state, "statestate");

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
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>{params.id ? "Edit Breed" : "Add Breed"}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            required
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={inputs.category}
              label="Category"
              onChange={handleChange}
            >
              {programList.map((value) => {
                return <MenuItem value={value._id}>{value.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4 mb-3">
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              value={inputs.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
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
