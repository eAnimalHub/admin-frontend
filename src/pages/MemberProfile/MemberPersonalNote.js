import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { addPersonalNote } from "src/DAL/member/member";
import { paramCase } from "change-case";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { addPersonalNote } from "src/DAL/member/Member";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const MemberPersonalNote = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [personalNote, setPersonalNote] = useState("");
  const [notes, setNotes] = useState([]);

  console.log(personalNote, "okoko");
  console.log(state, "statestatestate");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    let postData = {
      personal_note: personalNote,
      member_id: params.id,
    };

    setIsLoading(true);
    const result = await addPersonalNote(postData);
    if (result.code === 200) {
      console.log(result, "result");
      enqueueSnackbar(result.message, { variant: "success" });
      // navigate(-1);
      setIsLoading(false);
    } else {
      console.log(result, "error case");
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    state?.personal_note?.map((note) => {
      setPersonalNote(note.note);
    });
  }, []);

  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <IconButton
              className="back-screen-button"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="col-lg-8 col-sm-12 mt-3">
            <h2>Personal Note</h2>
          </div>
          <div className="col-lg-4 col-sm-12 text-end">
            {/* <button onClick={handleNavigate} className="small-contained-button">
          Add Consultant
        </button> */}
          </div>
        </div>
        {/* <IconButton onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </IconButton> */}

        <div className="col-12 mb-3">
          <TextField
            fullWidth
            className="mt-3"
            id="outlined-multiline-static"
            label="Personal Notes"
            multiline
            value={personalNote}
            onChange={(value) => setPersonalNote(value.target.value)}
            rows={4}
          />
        </div>
        <div className="col-12 text-end">
          <button className="small-contained-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MemberPersonalNote;
