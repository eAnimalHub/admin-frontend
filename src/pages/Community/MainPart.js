import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  feedImage,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  profileBg,
  profileImage,
} from "src/assets";
import { Avatar, AvatarGroup } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Comments from "./Comments";
import AddComment from "./AddComment";
function MainPart(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <div className="profile-cards p-3 mb-3">
        <div className="d-flex comment-image">
          <img src={profileImage} className="p-0" />
          <div className="text-start set-title-width poster-name">
            <p className="card-title pt-2 mb-0">Leeanna Alvord</p>
            <span className="date-color">
              {/* {get_date_with_user_time_zone(
              value.createdAt,
              "DD-MM-YYYY hh:mm:ss",
              userInfo.time_zone,
              adminTimeZone
            )} */}
              12 Dec 2018 at 1:16 AM
            </span>
          </div>
        </div>
        <div className="mt-2">
          <p>
            Wonderful Machine· A well-written bio allows viewers to get to know
            a photographer beyond the work. This can make the difference when
            presenting to clients who are looking for the perfect fit.
          </p>
        </div>
        <div className="feed-image">
          <img src={feedImage} />
        </div>
        <div className="row mt-1 comment-icon">
          {/* <div className="likes d-flex justify-content-between comment-icon mt-1"> */}

          <div className="col-4 col-md-6 col-lg-2 svg-color mt-3">
            <FavoriteBorderIcon />
            <span className="date-color ms-2">1.2k</span>
          </div>
          <div className="col-8 col-md-6 col-lg-6 avatar-group text-end mt-2">
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src={gallery1} />
              <Avatar alt="Travis Howard" src={gallery2} />
              <Avatar alt="Agnes Walker" src={gallery3} />
              <Avatar alt="Trevor Henderson" src={gallery4} />
              <span className="date-color ms-2 mt-2">+144 more</span>
            </AvatarGroup>
          </div>
          <div className="col-4 col-md-6 col-lg-2 svg-color mt-3">
            <ChatBubbleOutlineIcon />
            <span className="date-color ms-2">1.2k</span>
          </div>
          <div className="col-8 col-md-6 col-lg-2 svg-color mt-3 text-end">
            <ShareIcon />
            <span className="date-color ms-2">1.2k</span>
          </div>
        </div>
        <div className="profile-comments">
          <Comments />
          <AddComment />
        </div>
      </div>
      <div className="profile-cards p-3 mb-3">
        <div className="d-flex comment-image">
          <img src={gallery5} className="p-0" />
          <div className="text-start set-title-width poster-name">
            <p className="card-title pt-2 mb-0">Leeanna Alvord</p>
            <span className="date-color">
              {/* {get_date_with_user_time_zone(
              value.createdAt,
              "DD-MM-YYYY hh:mm:ss",
              userInfo.time_zone,
              adminTimeZone
            )} */}
              12 Dec 2018 at 1:16 AM
            </span>
          </div>
        </div>
        <div className="mt-2">
          <p>
            Wonderful Machine· A well-written bio allows viewers to get to know
            a photographer beyond the work. This can make the difference when
            presenting to clients who are looking for the perfect fit.
          </p>
        </div>
        <div className="feed-image">
          <img src={feedImage} />
        </div>
        <div className="row mt-1 comment-icon">
          {/* <div className="likes d-flex justify-content-between comment-icon mt-1"> */}

          <div className="col-4 col-md-6 col-lg-2 svg-color mt-3">
            <FavoriteBorderIcon />
            <span className="date-color ms-2">1.2k</span>
          </div>
          <div className="col-8 col-md-6 col-lg-6 avatar-group text-end mt-2">
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src={gallery9} />
              <Avatar alt="Travis Howard" src={gallery8} />
              <Avatar alt="Agnes Walker" src={gallery7} />
              <Avatar alt="Trevor Henderson" src={gallery6} />
              <span className="date-color ms-2 mt-2">+144 more</span>
            </AvatarGroup>
          </div>
          <div className="col-4 col-md-6 col-lg-2 svg-color mt-3">
            <ChatBubbleOutlineIcon />
            <span className="date-color ms-2">1.2k</span>
          </div>
          <div className="col-8 col-md-6 col-lg-2 svg-color mt-3 text-end">
            <ShareIcon />
            <span className="date-color ms-2">1.2k</span>
          </div>
        </div>
        <div className="profile-comments">
          <Comments />
          <AddComment />
        </div>
      </div>
    </>
  );
}

export default MainPart;
