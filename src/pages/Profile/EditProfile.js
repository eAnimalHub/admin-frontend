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
import { editProfileApi } from "src/DAL/Dashboard/DashboardApi";

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
  const [adminData, setAdminData] = useState();
  const [file, setProfileImage] = React.useState({});
  const [imageStatus, setImageStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [memberData, setMemberData] = useState({
    contact_number: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_image: {},
    status: true,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    var dateString = moment(memberData.dob).format("YYYY-MM-DD");
    formData.append("first_name", memberData.first_name);
    formData.append("last_name", memberData.last_name);
    formData.append("contact_number", memberData.contact_number);
    formData.append("status", memberData.status);

    if (imageStatus === true) {
      formData.append("image", file);
    }
    const result = await editProfileApi(adminData.user_id._id, formData);
    if (result.code === 200) {
      setEditStatus(true);
      setUserInfo(result.adminUser);
      localStorage.setItem(`user`, JSON.stringify(result.adminUser));
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
    setIsLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleUpload = (event) => {
    setImageStatus(true);
    // setImage(event.target.files[0]);
    setProfileImage(event.target.files[0]);
    const preview = URL.createObjectURL(event.target.files[0]);
    setPreviews(preview);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setAdminData(userData);
    setMemberData(() => ({
      ...memberData,
      ["first_name"]: userData.first_name,
      ["last_name"]: userData.last_name,
      ["email"]: userData.user_id.email,
      ["contact_number"]: userData.contact_number,
      ["status"]: userData.status,
      ["profile_image"]: userData.profile_image,
    }));
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container ">
      <form onSubmit={handleUpdate}>
        <div className="mt-4 mb-4 d-flex justify-content-center">
          <div className="cards-edit p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <div className="edit-profile-icon">
                <img
                  src={
                    previews ? previews : s3baseUrl + memberData.profile_image
                  }
                  height="100"
                  width="100"
                />
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
                <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="status"
                      value={memberData.status}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* <div className="col-lg-6 col-md-6 col-sm-12">
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
                </div> */}

                {/* <div className="col-lg-12 col-md-12 col-sm-12">
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
