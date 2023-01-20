import { Avatar, AvatarGroup, Slider } from "@mui/material";
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

function PollsSection(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <div className="profile-cards p-3 mt-3">
        <h4>Polls</h4>
        <p className="date-color">
          Who is the best actor in Marvel Cinematic Universe?
        </p>
        <div className="row">
          <div className="col-9">
            <div className="mb-25 custom-control custom-radio">
              <input
                type="radio"
                name="polls"
                className="custom-control-input"
                value=""
              />
              <label className="custom-control-label ms-1">RDJ</label>
            </div>
          </div>
          <div className="col-3 text-end">82%</div>

          <div className="col-12">
            <Slider
              defaultValue={82}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
          <div className="col-12 avatar-group text-start">
            <AvatarGroup style={{ justifyContent: "start", display: "flex" }}>
              <Avatar alt="Remy Sharp" src={gallery1} />
              <Avatar alt="Travis Howard" src={gallery2} />
              <Avatar alt="Agnes Walker" src={gallery3} />
              <Avatar alt="Agnes Walker" src={gallery4} />
              <Avatar alt="Agnes Walker" src={gallery5} />
              <Avatar alt="Trevor Henderson" src={gallery6} />
            </AvatarGroup>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-9">
            <div className="mb-25 custom-control custom-radio">
              <input
                type="radio"
                name="polls"
                className="custom-control-input"
                value=""
              />
              <label className="custom-control-label ms-1">
                Chris Hemswort
              </label>
            </div>
          </div>
          <div className="col-3 text-end">67%</div>

          <div className="col-12">
            <Slider
              defaultValue={67}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
          <div className="col-12 avatar-group text-start">
            <AvatarGroup style={{ justifyContent: "start", display: "flex" }}>
              <Avatar alt="Remy Sharp" src={gallery6} />
              <Avatar alt="Travis Howard" src={gallery7} />
              <Avatar alt="Agnes Walker" src={gallery8} />
              <Avatar alt="Trevor Henderson" src={gallery9} />
            </AvatarGroup>
          </div>
        </div>
      </div>
    </>
  );
}

export default PollsSection;
