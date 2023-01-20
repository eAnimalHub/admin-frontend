import React from "react";
import ProgrammRecording from "src/components/_dashboard/programmes/ProgrammeRecording";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import { lessonRecordinglist } from "src/DAL/Programmes/Programmes";

const LessonsRecording = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [recordings, setrecordings] = React.useState([]);
  let slug = params.programSlug + "/" + params.lessonSlug;

  const recordingslist = async () => {
    const result = await lessonRecordinglist(params.lessonSlug);
    if (result.code == 200) {
      console.log(result, "recording list");
      setrecordings(result.recording);
    }
  };

  useEffect(() => {
    recordingslist();
  }, []);
  console.log(params.programSlug, "params for recording");
  console.log(params.lessonSlug, "params for recording");
  console.log(recordings, "recordings");
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate(`/programmes/lessons_detail/${params.id}`)}
          >
            <ArrowBackIcon />
          </IconButton>
          <button
            className="small-contained-button float-end mt-1"
            onClick={() =>
              navigate(
                `/lessons/addlessonsRecording/${params.programSlug}/${params.lessonSlug}`
              )
            }
          >
            Add Recording
          </button>
        </div>
      </div>
      <div className="row section-space">
        <div className="col-12">
          <h1>Recordings</h1>
        </div>
      </div>
      <div className="row">
        {recordings.map((programm) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
            <ProgrammRecording recordings={programm} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsRecording;
