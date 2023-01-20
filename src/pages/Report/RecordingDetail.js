import React, { useState, useEffect } from "react";
import { IconButton, CircularProgress, Chip, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { get_root_value } from "src/utils/domUtils";

// import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
// import { PodsDetailApi } from "src/DAL/Pods/Pods";
import { s3baseUrl } from "src/config/config";
// import ReactTooltip from "react-tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReactVideoPlayer from "src/components/ReactVideoPlayer";
import { htmlDecode } from "src/utils/convertHtml";
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
const RecordingDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const [podsData, setPodsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const {
    password,
    description,
    name,
    program,
    video_url,
    short_description,
    audio_recording,
    date,
    title,
    id,
    image,
    status,
    video_id,
    active_members,
  } = state.detailValues;
  //   const getMemoryDetail = async () => {
  //     const result = await PodsDetailApi(params.pod_slug);
  //     if (result.code === 200) {
  //       setPodsData(result.room);
  //       setIsLoading(false);
  //     } else {
  //       enqueueSnackbar(result.message, { variant: "error" });
  //       navigate(`/pods`);
  //     }
  //   };

  const setCopiedPassword = () => {
    enqueueSnackbar("Password Copied To Clipboard", { variant: "success" });
    setCopied(true);
  };

  useEffect(() => {
    // getMemoryDetail();
  }, []);
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(JSON.stringify(localStorage.getItem("data")), "userData");
  console.log(state.detailValues, "state.detailValues");

  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          {/* {video_id && (
            <a href={video_id} target="_blank" rel="noopener noreferrer">
              <button className="small-contained-button float-end mt-1">
                Join Meeting
              </button>
            </a>
          )} */}
        </div>
      </div>

      <div className="row section-space">
        <div className="col-12 zoom-password">
          <h1 className="d-inline">{htmlDecode(title)}</h1>
          {podsData.zoom_link && (
            <CopyToClipboard
            //   text={podsData.password}
            //   onCopy={() => setCopiedPassword(true)}
            >
              <Tooltip title="Click to copy password">
                <Chip
                  label={
                    <>
                      {/* {podsData.password} */}
                      <LockIcon />
                    </>
                  }
                  color="primary"
                  className="float-end me-1"
                  variant="outlined"
                />
              </Tooltip>
            </CopyToClipboard>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="mt-3">{htmlDecode(short_description)}</p>
        </div>
        {/* <div className="col-12 text-end mb-3">
          <Chip
            sx={{
              color: get_root_value("--input-text-color"),
              backgroundColor: get_root_value("--sidebars-background-color"),
            }}
            label={status.toUpperCase()}
          />
        </div> */}
        <div className="col-12">
          {/* <img width="100%" src={image} /> */}
          <ReactVideoPlayer url={video_url} />
        </div>
        <div className="col-12 mt-3">
          {audio_recording && (
            <div className="col-12 text-center">
              <div>
                <audio
                  className="w-100"
                  src={s3baseUrl + audio_recording}
                  controls
                />
              </div>
            </div>
          )}
        </div>
        <div className="col-12 section-space">
          <div

          // dangerouslySetInnerHTML={{
          //   __html: podsData.detail_description,
          // }}
          >
            {/* <p className="text-muted">Programs:</p> */}
          </div>
          {/* <Chip
            label={program.title}
            sx={{
              color: get_root_value("--input-text-color"),
              backgroundColor: get_root_value("--sidebars-background-color"),
            }}
          /> */}
          <button className="small-contained-button">
            {htmlDecode(program.title)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingDetails;
