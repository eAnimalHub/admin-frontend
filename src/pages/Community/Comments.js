import React from "react";
import { useNavigate } from "react-router-dom";
import { gallery2, gallery3, profileImage } from "src/assets";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
function Comments(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex comment-image mt-3">
        <img src={gallery2} />
        <div className="text-start set-title-width comment-icon">
          <div className="d-flex justify-content-between w-100">
            <p className="card-title pt-2 mb-0 ">Leeanna Alvord</p>
            <div className="svg-color pt-2 ">
              <FavoriteBorderIcon />
              <span className="date-color ms-2">44k</span>
            </div>
          </div>
          <p className="text-start date-color mb-0">
            Easy & smart fuzzy search🕵🏻 functionality which enables users to
            search quickly.
          </p>
        </div>
      </div>
      <div className="d-flex comment-image mt-3">
        <img src={gallery3} />
        <div className="text-start set-title-width comment-icon">
          <div className="d-flex justify-content-between w-100">
            <p className="card-title pt-2 mb-0 ">Leeanna Alvord</p>
            <div className="svg-color pt-2 ">
              <FavoriteBorderIcon />
              <span className="date-color ms-2">44k</span>
            </div>
          </div>
          <p className="text-start date-color mb-0">
            Easy & smart fuzzy search🕵🏻 functionality which enables users to
            search quickly.
          </p>
        </div>
      </div>
    </>
  );
}

export default Comments;
