import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import ReviewCards from "../ReviewCard/ReviewCards";
import AccountPopover from "../../layouts/dashboard/AccountPopover";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPlayer from "react-player";
import RatingCard from "../../components/_dashboard/programmes/RatingCard";
import ProgrammDetailTab from "../../components/_dashboard/programmes/ProgrammDetailTab";
import { programmDetail } from "../../DAL/Programmes/Programmes";
import { htmlDecode } from "../../utils/convertHtml";
import Popover from "../../layouts/dashboard/Popover";
import ProgramPopover from "src/components/ProgramPopOver";
import { s3baseUrl } from "src/config/config";
import ReactVideoPlayer from "src/components/ReactVideoPlayer";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

function ProgrammesDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [programmesDetail, setProgrammesDetail] = useState({});
  const [lessonsList, setLessonsList] = useState([]);
  const [resourcesList, setResourcesList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);

  console.log(params.slug, "id");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProgrammesDetail = async () => {
    const result = await programmDetail(params.slug);
    if (result.code === 200) {
      console.log(result.program.video_url, "result");
      setProgrammesDetail(result.program);
      setLessonsList(result.lesson);
      setResourcesList(result.program_document);
      setReviewsList(result.program_review);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  // handleChange = ()=>{
  //   console.log('oookkk')
  // }

  useEffect(() => {
    getProgrammesDetail();
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  const MENU_OPTIONS = [
    {
      label: "Manage Lessons",
      icon: "bi:pencil-square",
      linkTo: `/lessons/${params.slug}`,
    },
    {
      label: "Manage Reviews",
      icon: "bi:pencil-square",
      linkTo: `/review/${params.slug}`,
      reviews: reviewsList,
    },
    {
      label: "Manage Resources",
      icon: "bi:pencil-square",
      linkTo: `/programmes/sources/${params.slug}`,
      resources: resourcesList,
    },
    // {
    //   label: "Locked Programs",
    //   icon: "bi:pencil-square",
    //   linkTo: `/programmes/lesson_recording_detail/${params.slug}`,
    // },
    {
      label: "BOB Videos",
      icon: "bi:pencil-square",
      linkTo: `/programmes/BobVideos/${params.slug}`,
    },
    {
      label: "Edit",
      icon: "bi:pencil-square",
      linkTo: `/programmes/editprogram/${params.slug}`,
    },
    {
      label: "Delete",
      icon: "bi:pencil-square",
      linkTo: ``,
    },
  ];
  console.log(programmesDetail.video_url, "review list");
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() => navigate("/programmes")}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
      <div className="row section-space">
        <div className="col-11">
          <h1 className="programs-details">
            {location.state ? location.state.title : programmesDetail.title}
          </h1>
        </div>

        <div className="col-1">
          <ProgramPopover
            data={MENU_OPTIONS}
            review={reviewsList}
            resources={resourcesList}
            className="float-end"
          />
        </div>
      </div>
      <div className="row media-margin">
        <div className="col-12">
          <ReactVideoPlayer url={programmesDetail.video_url} />
        </div>
        <div className="col-12 section-space">
          <div
            dangerouslySetInnerHTML={{
              __html: htmlDecode(programmesDetail.detailed_description),
            }}
          ></div>
        </div>
      </div>
      <div className="col-12 mt-3">
        <audio
          className="w-100"
          src={s3baseUrl + programmesDetail.audio_file}
          controls
        />
      </div>
    </div>
  );
}

export default ProgrammesDetail;
