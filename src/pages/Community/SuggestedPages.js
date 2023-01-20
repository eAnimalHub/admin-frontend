import React from "react";
import { useNavigate } from "react-router-dom";
import {
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  profileImage,
} from "src/assets";
import StarBorderIcon from "@mui/icons-material/StarBorder";
function SuggestedPages(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <div className="profile-cards p-3 mt-3">
        <h4>Suggested Pages</h4>
        <div className="d-flex comment-image">
          <img src={profileImage} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Peter Reed</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color reduce-margin-from-para">
              Company
            </p>
          </div>
        </div>
        <div className="d-flex comment-image">
          <img src={gallery1} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Harriett Adkins</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color reduce-margin-from-para">
              Beauty Store
            </p>
          </div>
        </div>
        <div className="d-flex comment-image">
          <img src={gallery2} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Juan Weaver</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color reduce-margin-from-para">
              Company
            </p>
          </div>
        </div>
        <div className="d-flex comment-image">
          <img src={gallery3} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Claudia Chandler</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color reduce-margin-from-para">
              Software Company
            </p>
          </div>
        </div>
        <div className="d-flex comment-image">
          <img src={gallery4} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Earl Briggs</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color reduce-margin-from-para">
              Beauty Store
            </p>
          </div>
        </div>
        <div className="d-flex comment-image">
          <img src={gallery5} />
          <div className="text-start comment-icon w-100">
            <div className="d-flex justify-content-between w-100">
              <p className="card-title pt-2 mb-0 ">Jonathan Lyons</p>
              <div className="svg-color pt-2 ">
                <StarBorderIcon />
              </div>
            </div>
            <p className="text-start date-color reduce-margin-from-para">
              Company
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestedPages;
