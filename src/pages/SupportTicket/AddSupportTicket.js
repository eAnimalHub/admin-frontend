import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSnackbar } from "notistack";
import { get_root_value } from "src/utils/domUtils";
import { makeStyles } from "@mui/styles";
// import {
//   AddSupportTicketAPI,
//   departmentListAPI,
//   UploadSupportTicketImageOnS3,
// } from "src/DAL/SupportTicket/SupportTicket";

const useStyles = makeStyles(() => ({
  paper: {
    background: get_root_value("--popup-background-color"),
    color: get_root_value("--input-text-color"),
  },
}));

export default function AddSupportTicket({
  onCloseDrawer,
  // dataList,
  // departmentSlug,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [state, setState] = useState({
    subject: "",
    description: "",
    department: "",
    categoriesList: [],
  });

  const handleRemove = (index) => {
    previews.splice(index, 1);
    files.splice(index, 1);
    setPreviews([...previews]);
    setFiles([...files]);
  };

  const handleUpload = (event) => {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const preview = URL.createObjectURL(fileList[i]);
      setFiles((prevFiles) => [...prevFiles, file]);
      setPreviews((prevPreviews) => [...prevPreviews, preview]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const getDepartmentListing = async () => {
    const result = "";
    if (result.code === 200) {
      setDepartmentsData(result.department);
      setIsLoading(false);
    } else {
      // enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const UploadImages = async (formData) => {
    const result = await formData;
    return result.image_path;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (files.length < 1) {
      setIsLoading(false);
      enqueueSnackbar("Please select at least 1 image", { variant: "error" });
    } else {
      const results = files.map((image, index) => {
        const formData = new FormData();
        formData.append("image", image);
        const result = UploadImages(formData);
        return result;
      });

      Promise.all(results).then(async (img_results) => {
        var setImageArray = [];
        img_results.map((image_path, index) => {
          setImageArray.push(image_path);
        });
        const formData = new FormData();
        formData.append("subject", state.subject);
        formData.append("description", state.description);
        formData.append("department", state.department);
        formData.append("ticket_images", JSON.stringify(setImageArray));
        const result = await formData;
        if (result.code === 200) {
          onCloseDrawer();
          dataList();
          setIsLoading(false);
          enqueueSnackbar(result.message, { variant: "success" });
        } else {
          // enqueueSnackbar(result.message, { variant: "error" });
          setIsLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    getDepartmentListing();
  }, []);
  return (
    <div className="container new-memories">
      <form onSubmit={handleSubmit}>
        <TextField
          className="mt-4 inputs-fields"
          id="outlined-basic"
          label="Ticket Subject"
          variant="outlined"
          name="subject"
          value={state.subject}
          required={true}
          onChange={(e) => handleChange(e)}
        />
        <FormControl variant="outlined" className="mt-4">
          <InputLabel id="demo-simple-select-outlined-label">
            Department
          </InputLabel>
          <Select
            required={true}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={state.department}
            onChange={(e) => handleChange(e)}
            label="Department"
            name="department"
            className="svg-color"
            sx={{
              color: get_root_value("--input-text-color"),
            }}
            MenuProps={{
              classes: {
                paper: classes.paper,
              },
            }}
          >
            {departmentsData.map((department, index) => (
              <MenuItem value={department._id} eventKey={index}>
                {department.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="outlined-multiline-static"
          label="Enter Description"
          multiline
          rows={5}
          name="description"
          value={state.description}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          style={{ width: "100%" }}
          className="mt-3"
          required={true}
        />
        <div className="col-md-12 mt-2 d-flex">
          <div className="row w-100 mb-3 add-photo">
            <p className="mt-2">Recommended Size (1000x1000)</p>
            {previews &&
              previews.map((file, index) => (
                <div className="col-3 mt-2">
                  <span className="preview">
                    <span onClick={() => handleRemove(index)}>x</span>
                    <img src={file} />
                  </span>
                </div>
              ))}
            <div className="col-3 mt-2">
              <span className="upload-button">
                <input
                  color="primary"
                  accept="image/*"
                  type="file"
                  id="icon-button-file"
                  style={{ display: "none" }}
                  onChange={handleUpload}
                  multiple={true}
                />
                <label htmlFor="icon-button-file">
                  <CloudUploadIcon />
                </label>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <span className="float-end">
            <button className="submit-button" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
