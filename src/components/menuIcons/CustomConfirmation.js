import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { get_root_value } from "src/utils/domUtils";
// import { get_root_value } from "src/utils/domUtils";

function CustomConfirmation({ open, setOpen, handleAgree, title }) {
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            backgroundColor: get_root_value("--popup-background-color"),
            // backgroundColor: "black",
            // color: "green",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle>
          {title ? title : "Are you sure you want to take this action?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomConfirmation;
