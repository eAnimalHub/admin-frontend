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
import { htmlDecode } from "src/utils/convertHtml";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
const GroupDetail = () => {
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
    detail_description,
    short_description,
    title,
    programs,
    date,
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
  console.log(state, "statestate");
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
        <div className="col-12">
          <img width="100%" src={image} />
        </div>
        {/* <div className="col-12 section-space">
          <div

          // dangerouslySetInnerHTML={{
          //   __html: podsData.detail_description,
          // }}
          >
            <p className="text-muted">Programs:</p>
          </div>
          <Chip
            label={programs}
            sx={{
              color: get_root_value("--input-text-color"),
              backgroundColor: get_root_value("--sidebars-background-color"),
            }}
          />
        </div> */}
        <div className="col-12 mt-3">{htmlDecode(detail_description)}</div>
      </div>
    </div>
  );
};

export default GroupDetail;
