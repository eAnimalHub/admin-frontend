import React, { useEffect, useMemo, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import profileImg from "../../assets/images/profileImg.png";
import R from "../../assets/images/R.jpeg";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { TimeZones } from "src/utils/constants";
// import { EditProfileApi, memberDetail } from "src/DAL/Profile/Profile";
import { makeStyles } from "@mui/styles";
import { CircularProgress, FormHelperText } from "@mui/material";
// import countryList from "react-select-country-list";
import { get_root_value } from "src/utils/domUtils";
import { s3baseUrl } from "src/config/config";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import moment from "moment";
import { _get_user_from_localStorage } from "src/DAL/localstorage/LocalStorage";
import { EditProfileApi, GetProfileApi } from "src/DAL/Profile/Profile";
import { useContentSetting } from "src/Hooks/ContentSettingState";
import { TimeZones } from "src/utils/constants";

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
  paper: {
    background: get_root_value("--popup-background-color"),
    color: get_root_value("--input-text-color"),
  },
}));

function EditProfile(props) {
  const classes = useStyles();
  const { userInfo, setUserInfo, handleSetUserInfo } = useContentSetting();
  const { enqueueSnackbar } = useSnackbar();
  const [previews, setPreviews] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apimage, setApiImage] = useState("");
  const [file, setProfileImage] = React.useState({});
  const [imageStatus, setImageStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [memberData, setMemberData] = useState({
    address: "",
    biography: "",
    city: "",
    contact_number: "",
    email: "",
    first_name: "",
    image: "",
    last_name: "",
    main_heading: "",
    state: "",
    status: "",
    team_type: "",
    time_zone: "",
  });

  // const options = useMemo(() => countryList().getData(), []);
  // const user_profile = _get_user_from_localStorage();
  const {
    address,
    biography,
    city,
    contact_number,
    email,
    image,
    first_name,
    last_name,
    main_heading,
    state,
    status,
    team_type,
    time_zone,
    _id,
  } = userInfo;

  const handleChangeDate = (event) => {
    setMemberData((prevState) => {
      return {
        ...prevState,
        dob: event,
      };
    });
  };
  const consultantProfile = async () => {
    const result = await "";
    if (result.code === 200) {
      localStorage.setItem("admin_time_zone", JSON.stringify(result.time_zone));
      setUserProfile(result.consultant);
      handleSetUserInfo(result.consultant);
      setMemberData(result.consultant);
      // setUserInfo(result.consultant);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const updateProfile = async () => {
  //   const result = await EditProfileApi();
  //   if (result.code === 200) {
  //     setMemberData(result.member);
  //     setIsLoading(false);
  //   } else {
  //     enqueueSnackbar(result.message, { variant: "error" });
  //     setIsLoading(false);
  //   }
  // };
  // console.log(memberData, "memberDatamemberDatamemberData");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    var dateString = moment(memberData.dob).format("YYYY-MM-DD");
    formData.append("first_name", memberData.first_name);
    formData.append("last_name", memberData.last_name);
    formData.append("email", memberData.email);
    formData.append("city", memberData.city);
    // formData.append("password", memberData.password);
    // formData.append("zip_code", memberData.zip_code);
    formData.append("time_zone", memberData.time_zone);
    formData.append("state", memberData.state);
    // formData.append("country", memberData.country);
    formData.append("address", memberData.address);
    // formData.append("main_heading", memberData.main_heading);
    // formData.append("team_type", memberData.team_type);
    // formData.append("facebook_link", memberData.facebook_link);
    // formData.append("website_link", memberData.website_link);
    // formData.append("instagram_link", memberData.instagram_link);
    // formData.append("linkedin_link", memberData.linkedin_link);
    // formData.append("youtube_link", memberData.youtube_link);
    formData.append("biography", memberData.biography);
    formData.append("contact_number", memberData.contact_number);
    // formData.append(
    //   "nineteen_day_plan_currency",
    //   memberData.nineteen_day_plan_currency
    // );
    // formData.append("dob", dateString);
    if (imageStatus === true) {
      formData.append("image", file);
    }
    const result = await "";
    if (result.code === 200) {
      setEditStatus(true);
      setUserInfo(result.consultant);
      localStorage.setItem(`user_data`, JSON.stringify(result.consultant));
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
    setIsLoading(false);
  };
  const handleUploadFile = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value, "value of edit profile");
    setMemberData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log(memberData, "memberData ");
  };

  const handleUpload = (event) => {
    console.log(event, "event");
    setImageStatus(true);
    // setImage(event.target.files[0]);
    setProfileImage(event.target.files[0]);
    const preview = URL.createObjectURL(event.target.files[0]);
    setPreviews(preview);
  };

  useEffect(() => {
    setMemberData(userInfo);
  }, []);
  useEffect(() => {
    consultantProfile();
  }, []);

  console.log(memberData, "memberData.time_zone");
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(userInfo, "userInfouserInfouserInfo1122");
  return (
    <div className="container ">
      <form onSubmit={handleUpdate}>
        <div className="mt-4 mb-4 d-flex justify-content-center">
          <div className="cards-edit p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <div className="edit-profile-icon">
                <img src="" height="100" width="100" />
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name="profile_image"
                    onChange={(e) => handleUpload(e)}
                  />
                  <IconButton
                    className="edit-profile-icon-position"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <div className="row w-100 mt-3">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="first_name"
                      value={memberData.first_name}
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.last_name}
                      name="last_name"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.email}
                      name="email"
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                </div>

                {/* <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.password}
                      name="password"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Contact Number"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.contact_number}
                      name="contact_number"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.address}
                      name="address"
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.city}
                      name="city"
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Main Heading"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.main_heading}
                      name="main_heading"
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <TextField
                      id="outlined-basic"
                      label="State/County"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={memberData.state}
                      name="state"
                      onChange={(e) => handleChange(e)}
                      required={true}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormControl variant="outlined" className="mt-3" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={memberData.status}
                      onChange={(e) => handleChange(e)}
                      label="Status"
                      name="status"
                      className="svg-color"
                      MenuProps={{
                        classes: {
                          paper: classes.paper,
                        },
                      }}
                      sx={{
                        color: get_root_value("--input-text-color"),
                      }}
                    >
                      <MenuItem value="true">
                        <em>Active</em>
                      </MenuItem>
                      <MenuItem value="false">
                        <em>Inactive</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                {/* <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormControl variant="outlined" className="mt-3" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Team Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={memberData.team_type}
                      onChange={(e) => handleChange(e)}
                      label="Team Type"
                      name="team_type"
                      className="svg-color"
                      MenuProps={{
                        classes: {
                          paper: classes.paper,
                        },
                      }}
                      sx={{
                        color: get_root_value("--input-text-color"),
                      }}
                    >
                      <MenuItem value="consultant">
                        <em>Save As Consultant</em>
                      </MenuItem>
                      <MenuItem value="team">
                        <em>Save As Team</em>
                      </MenuItem>
                      <MenuItem value="both">
                        <em>Both</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div> */}

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Timezone
                      </InputLabel>
                      <Select
                        MenuProps={{
                          classes: {
                            paper: classes.paper,
                          },
                        }}
                        className="svg-color"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={memberData.time_zone}
                        name="time_zone"
                        label="Timezone"
                        onChange={handleChange}
                        size="small"
                        sx={{
                          color: get_root_value("--input-text-color"),
                        }}
                      >
                        {TimeZones.map((value, i) => {
                          return <MenuItem value={value}>{value}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                {/* <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="mt-4">
                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-controlled-open-select-label">
                        Currency for 90 Day Tracker
                      </InputLabel>
                      <Select
                        MenuProps={{
                          classes: {
                            paper: classes.paper,
                          },
                        }}
                        className="svg-color"
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={memberData.nineteen_day_plan_currency}
                        name="nineteen_day_plan_currency"
                        label="Currency for 90 Day Tracker"
                        onChange={(e) => handleChange(e)}
                        size="small"
                        sx={{
                          color: get_root_value("--input-text-color"),
                        }}
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="eur">Euro</MenuItem>
                        <MenuItem value="gbp">Pond</MenuItem>
                        <MenuItem value="usd">Dollar</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div> */}

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="mt-4 textarea-block">
                    <TextField
                      id="outlined-basic"
                      label="Biography"
                      variant="outlined"
                      rows={4}
                      multiline
                      fullWidth
                      size="small"
                      value={memberData.biography}
                      inputProps={{
                        maxLength: 500,
                      }}
                      name="biography"
                      onChange={(e) => handleChange(e)}
                    />
                    <FormHelperText>
                      Maximum limit 500 characters
                    </FormHelperText>
                  </div>
                </div>

                {/* <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="mt-3">
                <span className="upload-button mt-3">
                  <input
                    color="primary"
                    accept="image/*"
                    type="file"
                    id="icon-button-file"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                  <label htmlFor="icon-button-file" className="w-100">
                    <CloudUploadIcon />
                  </label>
                </span>
              </div>
            </div> */}
                {/* <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="mt-3">
                {previews &&
                  previews.map((file, index) => (
                    <div className="col-3 mt-3" key={index}>
                      <div className="preview">
                        <span onClick={() => handleRemove(index)}>x</span>
                        <img src={file} />
                      </div>
                    </div>
                  ))}
              </div>
            </div> */}
              </div>

              <div className="mt-2 ms-auto">
                <button className="small-contained-button mt-4 ">Update</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
