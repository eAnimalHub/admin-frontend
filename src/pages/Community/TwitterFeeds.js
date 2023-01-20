import React from "react";
import { useNavigate } from "react-router-dom";
import { gallery3, gallery4, gallery7, profileImage } from "src/assets";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function TwitterFeeds(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <div className="profile-cards p-3 mt-3">
        <h4>Twitter Feeds</h4>
        <div className="d-flex comment-image mt-1">
          <img src={gallery7} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Leeanna Alvord</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color svg-color">
              @tiana59 <CheckCircleOutlineIcon />
            </p>
          </div>
        </div>
        <p>I love cookie chupa chups sweet tart apple pie ⭐️ chocolate bar.</p>
        <div className="twiter-links">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            #design #fasion
          </a>
        </div>
        <div className="d-flex comment-image mt-1">
          <img src={gallery4} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Jonathan Lyons</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color svg-color">
              @tiana59 <CheckCircleOutlineIcon />
            </p>
          </div>
        </div>
        <p>I love cookie chupa chups sweet tart apple pie ⭐️ chocolate bar.</p>
        <div className="twiter-links">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            #design #fasion
          </a>
        </div>
        <div className="d-flex comment-image mt-1">
          <img src={gallery3} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Earl Briggs</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color svg-color">
              @tiana59 <CheckCircleOutlineIcon />
            </p>
          </div>
        </div>
        <p>I love cookie chupa chups sweet tart apple pie ⭐️ chocolate bar.</p>
        <div className="twiter-links">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            #design #fasion
          </a>
        </div>
      </div>
    </>
  );
}

export default TwitterFeeds;
