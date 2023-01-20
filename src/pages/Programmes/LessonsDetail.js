import React, { useEffect, useState } from "react";
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
  Box,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactPlayer from "react-player";
import RatingCard from "../../components/_dashboard/programmes/RatingCard";
import ProgrammRecording from "../../components/_dashboard/programmes/ProgrammeRecording";
import ResourcesCard from "../../components/_dashboard/programmes/ResourcesCard";
import { lessonDetail } from "../../DAL/Programmes/Programmes";
import { htmlDecode } from "../../utils/convertHtml";
import Popover from "../../layouts/dashboard/Popover";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

function LessonsDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonsDetail, setLessonsDetail] = useState({});
  const [resourcesList, setResourcesList] = useState([]);

  const [value, setValue] = React.useState(0);
  let word =
    "https://play-lh.googleusercontent.com/9kABykeGovHPy-dN19lRxxnCp8IZK3Pkl8qLFNxrEe-hhKVZeiyhTBEIRUt6t-vhxQ";
  let pdf =
    "https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(params.slug1, "slug1 lessons details");
  console.log(params.slug, "slug lessons details");
  let slug = params.slug1 + "/" + params.slug;
  console.log(slug);

  const getLesonDetail = async () => {
    const result = await lessonDetail(params.slug);
    if (result.code === 200) {
      console.log(result, "result");
      setLessonsDetail(result.lesson);
      setResourcesList(result.document_list);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLesonDetail();
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  const MENU_OPTIONS = [
    {
      label: "Manage Resources",
      icon: "bi:pencil-square",
      linkTo: `/programmes/lesson_sources/${params.slug1}/${params.slug}`,
    },

    {
      label: "Manage Recordings",
      icon: "bi:pencil-square",
      linkTo: `/lesson_recording_detail/${params.slug}`,
    },

    {
      label: "Manage Notes",
      icon: "bi:pencil-square",
      linkTo: `/programmes/lesson/notes/${params.slug1}/${params.slug}`,
    },
  ];
  console.log(params, "list");
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
          <button
            className="small-contained-button float-end mt-1"
            // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
          >
            Mark Complete
          </button>
        </div>
      </div>

      <div className="row section-space">
        <div className="col-6">
          <h1 className="programmes-heading">{lessonsDetail.title}</h1>
        </div>
        <div className="col-6">
          <Popover
            data={MENU_OPTIONS}
            lessonsResources={resourcesList}
            className="float-end"
          />
        </div>
      </div>
      <div className="row media-margin">
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
        <div className="col-12 section-space">
          <button
            className="small-contained-button"
            // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
          >
            {"<<"} Previous
          </button>
          <button
            className="small-contained-button float-end"
            // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
          >
            Next {">>"}
          </button>
        </div>

        <div className="col-12 mt-3 text-center">
          <div>
            {/* <p>Audio only</p> */}
            <audio className="w-100" controls>
              <source
                src="https://gaana.com/song/dance-meri-rani-1"
                type="audio/mp3"
              />
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
            </audio>
          </div>
        </div>
        <div className="col-12 section-space">
          <div
            dangerouslySetInnerHTML={{
              __html: htmlDecode(lessonsDetail.detailed_description),
            }}
          ></div>
          {/* <p>
            {htmlDecode(lessonsDetail.detailed_description)}
          </p> */}
        </div>
        {/* <div className="col-12 section-space">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Recordings" {...a11yProps(0)} />
                <Tab label="Resources" {...a11yProps(1)} />
                <Tab label="Notes" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="row">
                <div className="col-12 mt-3">
                  <ProgrammRecording />
                </div>

                <div className="col-12 mt-3">
                  <ProgrammRecording />
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="row">
                {resourcesList.length > 0
                  ? resourcesList.map((resource, i) => (
                      <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                        <ResourcesCard imageLink={word} resource={resource} />
                      </div>
                    ))
                  : ""}
                <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                  <ResourcesCard imageLink={pdf} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                  <ResourcesCard imageLink={pdf} />
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="row">
                <div className="col-12 section-space">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="lesson-notes-title mb-2">
                        20-JUN-2021 08:03 AM
                      </h6>
                      <p className="mb-0 normal-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content. Some quick
                        example text to build on the card title and make up the
                        bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 section-space">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="lesson-notes-title mb-2">
                        20-JUN-2020 08:03 PM
                      </h6>
                      <p className="mb-0 normal-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content. Some quick
                        example text to build on the card title and make up the
                        bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <span
                    htmlFor="exampleFormControlInput1"
                    className="form-label-lesson"
                  >
                    Lesson Notes:
                  </span>
                  <textarea
                    rows="5"
                    className="form-control text-area-task"
                    // id="exampleFormControlInput1"
                  />
                  <button
                    className="mt-2 float-end small-contained-button"
                    // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
                  >
                    Save
                  </button>
                </div>
              </div>
            </TabPanel>
          </Box>
        </div> */}
      </div>
    </div>
  );
}

export default LessonsDetail;
