import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MemoriesSlider } from "../../components/_dashboard/memories";
export default function MemoriesDetail() {
  const navigate = useNavigate();
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920103619_--img-neil.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
      title: "Memory",
    },
  ];
  return (
    <Container>
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate("/memories")}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
      <div className="row section-space">
        <div className="col-sm-12 col-md-6">
          <h1>MemoriesDetail</h1>
        </div>
        <div className="col-sm-12 col-md-6 memories-date">
          <p className="text-md-end">4 January 2022</p>
        </div>
      </div>
      <div className="row media-margin">
        <div className="col-12">
          <MemoriesSlider data={itemData} />
        </div>
        <div className="col-12 section-space">
          <p>
            The Calm & Creative Collection focuses on the root cause; the
            subconscious mind. It will raise your level of awareness and
            understanding, which will dramatically transform your life. These
            tools will give you the knowledge and the exact process you need to
            apply it to your life. You’ll finally be able to take control and
            create what you desire. It is for anyone who wants calmness and
            serenity in their life, and it’s perfect for people that crave
            clarity and direction and are ready to uplevel their thinking and
            results.
          </p>
        </div>
      </div>
    </Container>
  );
}
