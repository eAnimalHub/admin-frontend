import React from "react";
import { useNavigate } from "react-router-dom";
import {
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  profileImage,
} from "src/assets";

function LatestPhotos(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <div className="profile-cards p-3">
      <h4>Latest Photos</h4>
      <div className="row">
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery1} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery2} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery3} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery4} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery5} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery6} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery7} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery8} />
        </div>
        <div className="col-6 col-md-4 mt-3 profile-gallery-photo">
          <img src={gallery9} />
        </div>
      </div>
    </div>
  );
}

export default LatestPhotos;
