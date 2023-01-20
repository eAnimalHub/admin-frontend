import React from "react";
import { useNavigate } from "react-router-dom";
import { profileBg, profileImage } from "src/assets";
import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import MainPart from "./MainPart";
import TabsPopover from "./TabsPopover";
function Community(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <div className="container">
      {/* <div className="row">
        <div className="col-12">
          <h2>Community</h2>
        </div>
      </div> */}
      <div className="mt-4 mb-4 d-flex justify-content-center">
        <div className="profile-cards">
          <div className="profile-bg">
            <img src={profileBg} />
            <div className="profile-image d-flex">
              <img src={profileImage} />
              <div className="profile-name">
                <h3 className="main-heading-community">Kim Calvert</h3>
                <p className="main-heading-community">
                  CEO at Dynamite Lifestyle
                </p>
              </div>
            </div>
          </div>

          <div className="profile-tabs p-3">
            <div className="row">
              <div className="col-7 d-flex justify-content-between profile-buttons">
                <button className="profile-ticket-button-contained">
                  Feed
                </button>
                <button className="profile-ticket-button-outlined">
                  About
                </button>
                <button className="profile-ticket-button-outlined">
                  Photos
                </button>
                <button className="profile-ticket-button-outlined">
                  Friends
                </button>
              </div>
              {/* <div className="col-5 text-end">
                <button className="profile-ticket-button-contained">
                  Edit
                </button>
              </div> */}
            </div>
          </div>
          <div className="profile-bars svg-color p-3">
            <TabsPopover />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-3 order-2 order-lg-1">
          <LeftPart />
        </div>
        <div className="col-md-12 col-lg-6 order-1 order-lg-2">
          <MainPart />
        </div>
        <div className="col-md-12 col-lg-3 order-3">
          <RightPart />
        </div>
      </div>
    </div>
  );
}

export default Community;
