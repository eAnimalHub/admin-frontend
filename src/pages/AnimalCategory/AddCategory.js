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
import Switch from "@mui/material/Switch";
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
import {
  AddCategoryApi,
  EditCategoryApi,
} from "src/DAL/animalCategoryApi/animalCategoriesApi";
import { s3baseUrl } from "src/config/config";

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

export default function AddAnimalCategory() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setiswaiting] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState("Controlled");
  const [personName, setPersonName] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setProfileImage] = React.useState();
  const [oldImage, setOldImage] = React.useState("");
  const [audioFile, setAudio] = React.useState();
  const [groups, setGroups] = React.useState([]);
  const [programList, setProgramList] = React.useState([]);
  const [vaultList, setVaultList] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [programName, setProgramName] = React.useState("");
  const [vaultName, setVaultName] = React.useState("");
  const [formType, setFormType] = React.useState("add");

  const [inputs, setInputs] = React.useState({
    name: "",
    description: "",
    image: {},
    status: true,
    order: "",
    is_popular: true,
  });

  const fileChangedHandler = (e) => {
    //console.log(e.target.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
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
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("status", inputs.status);
    formData.append("is_popular", inputs.is_popular);
    if (params.id) {
      formData.append("order", inputs.order);
    }
    if (file) {
      formData.append("image", inputs.image);
    }
    formData.append("description", inputs.description);

    setIsLoading(true);
    const result =
      formType == "add"
        ? await AddCategoryApi(formData)
        : await EditCategoryApi(params.id, formData);
    if (result.code === 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/categories`);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSwitch = (event) => {
    setInputs((values) => ({
      ...values,
      ["is_popular"]: event.target.checked,
    }));
  };

  React.useEffect(() => {
    if (state !== null) {
      setInputs(state?.editValues);
      setOldImage(state?.editValues?.image?.thumbnail_1);
      setFormType("edit");
    }
  }, []);
  //   ////console.log(typeof audioFile, "values of audio to be send ");

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
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>{`${formType == "add" ? "Add" : "Edit"} Category`}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Name *"
            variant="outlined"
            fullWidth
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </div>
        {formType !== "add" && (
          <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
            <TextField
              id="outlined-basic"
              label="Order"
              variant="outlined"
              fullWidth
              name="order"
              value={inputs.order}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
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
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          Is Popular :
          <Switch
            checked={inputs.is_popular}
            onChange={handleSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-5">
              <p className="">Upload Image *</p>
              <FormHelperText className="pt-0">
                Image Size(1000 X 670) ("JPG", "JPEG", "PNG","WEBP")
              </FormHelperText>
            </div>
            <div className="col-2">
              {file ? (
                <img src={file} height={50} />
              ) : (
                oldImage && <img src={s3baseUrl + oldImage} height={50} />
              )}
            </div>
            <div className="col-5 text-end pt-2">
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

        <div className="text-end mt-4">
          <button onClick={handleSubmit} className="small-contained-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
