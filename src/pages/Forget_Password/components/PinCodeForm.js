import React, { useState } from "react";
import PinField from "react-pin-field";
import { useSnackbar } from "notistack";
// material
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { get_root_value } from "src/utils/domUtils";

export default function PinCodeForm({
  onhandlePinCodeSubmit,
  setIsLoading,
  isLoading,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [pinCode, setPinCode] = useState("");

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (pinCode.length > 5) {
      onhandlePinCodeSubmit(pinCode);
    } else {
      enqueueSnackbar("All fields should be filled", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={3} className="pin-code-field">
        <PinField
          onChange={setPinCode}
          type="numeric"
          inputMode="number"
          validate={/^[0-9]$/}
          style={{
            caretColor: "transparent",
            width: 50,
            height: 50,
            outline: "none",
            textAlign: "center",
            borderColor: get_root_value("--portal-theme-primary"),
            justifyContent: "space-between",
          }}
          inputStyle={{ borderColor: "#198BA8" }}
          inputFocusStyle={{ borderColor: "blue" }}
          length={6}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {isLoading ? "Submiting..." : "Submit"}
        </LoadingButton>
      </Stack>
    </form>
  );
}
