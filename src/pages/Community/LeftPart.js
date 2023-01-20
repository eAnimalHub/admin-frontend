import React from "react";
import { useNavigate } from "react-router-dom";
import AboutSection from "./AboutSection";
import SuggestedPages from "./SuggestedPages";
import TwitterFeeds from "./TwitterFeeds";

function LeftPart(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <AboutSection />
      <SuggestedPages />
      <TwitterFeeds />
    </>
  );
}

export default LeftPart;
