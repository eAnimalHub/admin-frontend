import React, { useState } from "react";
import { TextField } from "@mui/material";
// import { AddGratitudeApi } from "../../DAL/Gratitude/Gratitude";
import { useSnackbar } from "notistack";

export default function AddComment({ dataList }) {
  const { enqueueSnackbar } = useSnackbar();
  const [previews, setPreviews] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = React.useState("");
  const [state, setState] = useState("");

  //Adding Category

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // if (image === "") {
    //   enqueueSnackbar("Image is required", { variant: "error" });
    //   setIsLoading(false);
    // } else {
    //   const formData = new FormData();
    //   formData.append("gratitude_text", state.description);
    //   formData.append("image", image);
    //   const result = await AddGratitudeApi(formData);
    //   if (result.code === 200) {
    //     onCloseDrawer();
    //     dataList();
    //     setIsLoading(false);
    //     enqueueSnackbar(result.message, { variant: "success" });
    //   } else {
    //     enqueueSnackbar(result.message, { variant: "error" });
    //     setIsLoading(false);
    //   }
    // }
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

  return (
    <>
      <div className="new-memories">
        <form onSubmit={handleSubmit}>
          <TextField
            className="mt-4 inputs-fields"
            id="outlined-multiline-static"
            label="Add Comment"
            multiline
            rows={3}
            name="description"
            value={state.description}
            variant="outlined"
            style={{ width: "100%" }}
            required={true}
            onChange={(e) => handleChange(e)}
          />

          <div className="text-end mt-3">
            <button className="comment-submit-button" disabled={isLoading}>
              {isLoading ? "Saving..." : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
