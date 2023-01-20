import React from "react";
import { Box, Card, Link, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { s3baseUrl } from "src/config/config";

function ProgrammRecording({ recordings }) {
  console.log(recordings.title, "Data in program recording");
  const navigate = useNavigate();
  return (
    <>
      <Card
        className="lesson-card"
        onClick={() =>
          navigate(
            "/programmes/programm_recording_detail/48ce0817-9219-4977-9149-168e020ad288",
            { state: { name: "Secrets of Serenity" } }
          )
        }
      >
        <div className="row">
          <div className="col-lg-12 col-md-3 col-sm-12">
            <img
              className="lesson-card-image"
              src={s3baseUrl + recordings.recording_image.thumbnail_2}
              alt="name"
            />
          </div>
          <div className="col-lg-12 col-md-9 col-sm-12 mt-3">
            <h4 className="lesson-heading ps-3 pe-3">{recordings.title}</h4>
            <p className="normal-font ps-3 pe-3">
              It is for anyone who wants calmness and serenity in their life,
              and it’s perfect for people that crave clarity and direction and
              are ready to uplevel their thinking and results.
            </p>
            {/* <p className="programme-duration">5 Lessons &nbsp; | &nbsp; 5 hr 16 min 19 sec</p> */}
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProgrammRecording;
