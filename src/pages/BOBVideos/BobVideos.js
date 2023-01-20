import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";

const BobVideos = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() =>
              navigate(`/programmes/programmes_detail/${params.id}`)
            }
          >
            <ArrowBackIcon />
          </IconButton>
          {/* <button
            className="small-contained-button float-end mt-1"
            onClick={() => navigate(`/programmes/lessons_listing/${params.id}`)}
          >
            View Lessons
          </button> */}
        </div>
        <div className="col-6">
          <h2>BOB Videos</h2>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          {/* <ReactPlayer
              controls
              playIcon
              url="https://vimeo.com/226053498"
              width="100%"
              className="custom-video-player"
              pip
              stopOnUnmount
              playsinline
              volume={0}
              muted={0}
            /> */}
          <video width="100%" controls>
            <source src="https://vimeo.com/226053498" type="video/mp4" />
            <track
              src="captions_en.vtt"
              kind="captions"
              srcLang="en"
              label="english_captions"
            />
          </video>
        </div>
        <div className="col-12 text-left section-space">
          <p className="program-font-size">
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
    </div>
  );
};

export default BobVideos;
