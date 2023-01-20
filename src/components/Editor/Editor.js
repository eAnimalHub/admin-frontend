import * as React from "react";
import TextField from "@mui/material/TextField";

export default function BasicTextFields() {
  return (
    <TextField
      multiline
      rows={6}
      id="outlined-basic"
      fullWidth
      label="Field for ckEditor"
      variant="outlined"
    />
  );
}
