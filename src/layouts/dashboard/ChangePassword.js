import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import unlockFill from "@iconify/icons-eva/unlock-fill";
import { makeStyles } from "@mui/styles";
import { changePassword } from "src/DAL/Profile/Profile";
// import { chanePassword } from "src/DAL/Login/Login";
const useStyles = makeStyles({
  resize: {
    fontSize: 20,
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 1,
};

export default function ChangePassword({
  openPasswordModal,
  setopenPasswordModal,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setopenPasswordModal(true);
  const handleClose = () => setopenPasswordModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    password: "",
    repeatPassword: "",
    old_password: "",
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("confirm_password", inputs.repeatPassword);
    let postData = {};
    if (inputs.password === inputs.repeatPassword) {
      postData = {
        old_password: inputs.old_password,
        password: inputs.password,
        confirm_password: inputs.repeatPassword,
      };
      const result = await postData;
      console.log(postData, "postDatapostData");
      if (result.code === 200) {
        setInputs({});
        setIsLoading(false);
        handleClose();
        enqueueSnackbar("Password Changed Successfully", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      enqueueSnackbar("Password And Confirm Password Not Matched!", {
        variant: "error",
      });
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <Modal
        disableTypography="true"
        open={openPasswordModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handlePasswordSubmit}>
          <Box sx={style}>
            <div
              clo-12
              className="text-end modalIcon"
              onClick={() => {
                handleClose();
              }}
            >
              X
            </div>
            <Typography
              className="text-center mb-4"
              id="spring-modal-title"
              variant="h6"
              component="h2"
            >
              Change Password
            </Typography>
            <div className="col-12 mt-3">
              <TextField
                className="text-muted"
                // InputLabelProps={{ style: { fontSize: 14 } }}
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                fullWidth
                type="password"
                size="small"
                autoFocus
                name="old_password"
                value={inputs.old_password}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="col-12 mt-3">
              <TextField
                className="text-muted"
                // InputLabelProps={{ style: { fontSize: 14 } }}
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                fullWidth
                type="password"
                size="small"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required={true}
              />
            </div>

            <div className="col-12 mt-3">
              <TextField
                className="text-muted"
                // InputLabelProps={{ style: { fontSize: 14 } }}
                id="outlined-basic"
                label="Repeat New Password"
                variant="outlined"
                fullWidth
                type="password"
                size="small"
                name="repeatPassword"
                value={inputs.repeatPassword}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="col-12 mt-3">
              <button className="small-contained-button w-100">
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
