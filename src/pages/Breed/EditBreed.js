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
import { DeleteAudioApi, EditRecordingApi } from "src/DAL/Recording/Recordings";
import { s3baseUrl } from "src/config/config";

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

export default function EditRecording() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setiswaiting] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState("Controlled");
  const [personName, setPersonName] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setProfileImage] = React.useState({});
  const [fileNew, setProfileImageNew] = React.useState(false);
  const [audioFile, setAudio] = React.useState();
  const [groups, setGroups] = React.useState([]);
  const [programList, setProgramList] = React.useState([]);
  const [vaultList, setVaultList] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [programName, setProgramName] = React.useState("");
  const [programNameSelected, setProgramNameSelected] = React.useState("");
  const [vaultName, setVaultName] = React.useState("");
  const [audioRecording, setAudioRecording] = React.useState();
  const [inputs, setInputs] = React.useState({
    title: "",
    zoomLink: "",
    status: "",
    recordingStatus: "",
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
  const {
    title,
    status,
    short_description,
    program,
    video_url,
    _id,
    vault_category,
    recording_slug,
    recording_image,
    recording_date,
    audio_recording,
  } = state.editValues;
  console.log(state);

  const getProgramListing = async () => {
    const result = await ProgramListing();
    setIsLoading(true);
    if (result.code === 200) {
      console.log(result, "getProgramListing");
      setProgramList(result.program);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const getVaultList = async () => {
    const result = await VaultListing();
    if (result.code === 200) {
      console.log(result, "result");
      setVaultList(result.vault_category);
    }
  };

  const fileChangedHandler = (e) => {
    console.log(e.target.files[0]);
    // setProfileImage(e.target.files[0]);
    setInputs({
      ...inputs,
      ["image"]: e.target.files[0],
    });
    setProfileImageNew(true);
  };
  const audioFileChange = (e) => {
    console.log(e.target.files[0]);
    setAudio(e.target.files[0]);
  };
  const handleProgramName = (data) => {
    console.log(data, "programName");
    setProgramName(data.program_slug);
  };
  const handleVaultName = (data) => {
    console.log(data, "Name");
    setVaultName(data.vault_slug);
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
    setDate(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("short_description", inputs.short_description);
    formData.append("status", inputs.recordingStatus);
    formData.append("video_url", inputs.videoUrl);
    formData.append("program_slug", programName);
    formData.append("recording_date", moment(date).format("YYYY-MM-DD"));
    formData.append("vault_category_slug", vaultName);
    if (audioFile) {
      formData.append("audio_file", audioFile);
      console.log(audioFile, "not empty case of audio file");
    } else {
    }
    if (fileNew == true) {
      console.log("ok aju ");
      formData.append("image", inputs.image);
    }
    //console form data
    for (var value of formData.values()) {
      console.log(value, "form data value");
    }

    setIsLoading(true);
    const result = await EditRecordingApi(recording_slug, formData);
    if (result.code === 200) {
      console.log(result, "result");
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/recordings`);
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
  const handleChangeProgram = (event) => {
    console.log(event.target.value, "handleChangeProgram");
    setProgramName(event.target.value);
  };
  const handleChangeVault = (event) => {
    console.log(event.target.value, "handleChangeVault");
    setVaultName(event.target.value);
  };
  const handldeDeleteAudio = async () => {
    let postData = {
      status: "audio",
    };
    const result = await DeleteAudioApi(recording_slug, postData);
    if (result.code === 200) {
      console.log(result, "delete Audio");
      enqueueSnackbar(result.message, { variant: "success" });
      setAudioRecording();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  React.useEffect(() => {
    getProgramListing();
    getVaultList();
  }, []);
  React.useEffect(() => {
    setInputs((inputs) => ({
      ...inputs,
      ["title"]: title,
      ["recordingStatus"]: status,
      ["image"]: recording_image.thumbnail_1,
      ["short_description"]: short_description,
      ["videoUrl"]: video_url,
    }));
    setProgramNameSelected(program);
    setProgramName(program.program_slug);
    setVaultName(vault_category.vault_slug);
    setProfileImage(recording_image.thumbnail_1);
    setDate(moment(recording_date).format("MM-DD-YYYY"));
    setAudioRecording(audio_recording);
  }, []);

  //   console.log(typeof audioFile, "values of audio to be send ");
  console.log(date, "datedatedatedate");
  // console.log(programName, "programName");

  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(fileNew, "fileNewfileNew");
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
          <h2>Edit Recording</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Recording Title *"
            variant="outlined"
            fullWidth
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Recording Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <TextField
            id="outlined-basic"
            label="Video Url *"
            variant="outlined"
            fullWidth
            name="videoUrl"
            value={inputs.videoUrl}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Recording Status *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="recordingStatus"
              value={inputs.recordingStatus}
              label="Recording Status *"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Video Show Status*
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="video_show_status"
              value={inputs.video_show_Status}
              label="Show on Main Website *"
              onChange={handleChange}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Programme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={programName}
              label="Programme"
              onChange={handleChangeProgram}
            >
              {programList.map((program, i) => {
                return (
                  <MenuItem value={program.program_slug}>
                    {program.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={programList}
            value={programName}
            getOptionSelected={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {
              // handleProgramName(newValue);
              console.log(programName._id, "programNameprogramNameprogramName");
              console.log(programList._id, "programList");
              setProgramName(newValue._id);
            }}
            // sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Programmes" />
            )}
          />
        </div> */}
        {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vaultList}
            getOptionLabel={(option) => option.vault_title}
            onChange={(event, newValue) => {
              handleVaultName(newValue);
            }}
            // sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Vault Category" />
            )}
          />
        </div> */}
        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Vault Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vaultName}
              label="Vault Category"
              onChange={handleChangeVault}
            >
              {vaultList.map((vault, i) => {
                return (
                  <MenuItem value={vault.vault_slug}>
                    {vault.vault_title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0 ">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <p className="">Upload Audio</p>
              <FormHelperText className="pt-0">
                Audio mp3 (max 200mb)
              </FormHelperText>
            </div>
            <div className="col-lg-4 col-md-7 col-sm-6 col-9">
              {audioRecording && (
                <audio
                  className="w-100"
                  src={s3baseUrl + audioRecording}
                  controls
                />
              )}
            </div>
            <div className="col-lg-1 col-md-1 col-sm-3 col-3 text-end">
              {audioRecording && (
                <DeleteIcon
                  onClick={() => handldeDeleteAudio(audioRecording)}
                  className="mt-3 icon-color"
                />
              )}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 text-end pt-2 ps-0">
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
                  className="small-contained-button"
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
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div className="row w-100 div-style ms-0 pt-0">
            <div className="col-4">
              <p className="">Upload Image *</p>
              <FormHelperText className="pt-0">
                Image Size(1000 X 670) ("JPG", "JPEG", "PNG","WEBP")
              </FormHelperText>
            </div>
            <div className="col-4">
              {file && <img src={s3baseUrl + file} height={50} />}
            </div>
            <div className="col-4 text-end pt-2 ps-0">
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
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];
