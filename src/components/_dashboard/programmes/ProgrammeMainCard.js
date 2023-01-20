import React from "react";
import { Box, Card, Link, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProgrammeMainCard({ product }) {
  const navigate = useNavigate();

  return (
    <>
      <Card
        className="lesson-card"
        onClick={() =>
          navigate(
            "/programmes/lessons_detail/48ce0817-9219-4977-9149-168e020ad288",
            { state: { name: "Creactive Concious" } }
          )
        }
      >
        <div className="row p-3">
          <div className="col-lg-2 col-md-3 col-sm-12">
            <img
              className="lesson-card-image"
              src="https://pgi.dynamitelifestyle.co.uk/uploads/lesson_images/main_image/20210817201024_--CC-Lesson-02.jpg"
              alt="name"
            />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-12">
            <h2 className="lesson-heading">Creactive Concious </h2>
            <p className="normal-font">
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

export default ProgrammeMainCard;
