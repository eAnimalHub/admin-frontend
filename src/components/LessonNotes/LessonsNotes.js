import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LessonsNotes = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
      <div className="row section-space">
        <div className="col-12">
          <h1>Notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 section-space">
          <div className="card">
            <div className="card-body">
              <h6 className="lesson-notes-title mb-2">20-JUN-2021 08:03 AM</h6>
              <p className="mb-0 normal-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 section-space">
          <div className="card">
            <div className="card-body">
              <h6 className="lesson-notes-title mb-2">20-JUN-2020 08:03 PM</h6>
              <p className="mb-0 normal-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <span
            htmlFor="exampleFormControlInput1"
            className="form-label-lesson"
          >
            Lesson Notes:
          </span>
          <textarea
            rows="5"
            className="form-control text-area-task"
            // id="exampleFormControlInput1"
          />
          <button
            className="mt-2 float-end small-contained-button"
            // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonsNotes;
