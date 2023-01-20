import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import profileImg from "../../assets/images/profileImg.png";
import { useNavigate } from "react-router-dom";
import R from "../../assets/images/R.jpeg";
import { profileBg, profileImage } from "src/assets";
import LatestPhotos from "./LatestPhotos";
import Suggestions from "./Suggestions";
import PollsSection from "./PollsSection";

function RightPart(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <LatestPhotos />
      <Suggestions />
      <PollsSection />
    </>
  );
}

export default RightPart;
