import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import faker from "faker";
import { useSnackbar } from "notistack";
// material
import { Box, Card, Stack, IconButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import {
  lessonList,
  programmDetail,
  lessonDelete,
} from "../../DAL/Programmes/Programmes";
import { s3baseUrl } from "../../config/config";
import ProgramPopover from "src/components/ProgramPopOver";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
  fonts: {
    fontSize: "13px",
    fontWeight: "500",
  },
}));

const ProgrammesImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});
const ITEM_HEIGHT = 48;
// ----------------------------------------------------------------------
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 1,
};

export default function LessonListing() {
  const params = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonData, setLessonData] = useState([]);
  const [programmesDetail, setProgrammesDetail] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [lessonSlug, setlessonSlug] = useState("");
  const [lesson, setLesson] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // popup
  const [openmodal, setOpenmodal] = React.useState(false);
  const handleOpenmodal = () => setOpenmodal(true);
  const handleClosemodal = () => setOpenmodal(false);
  // popup
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(params.id, "id");

  const getProgrammesDetail = async () => {
    const result = await programmDetail(params.id);
    if (result.code === 200) {
      console.log(result, "result");
      setProgrammesDetail(result.program);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleNavigate = (value) => {
    console.log(value, "slug edit case");
    navigate(`/lessons/Editlesson/${params.id}/${value}`, {
      state: value,
    });
  };

  const handlePage = () => {
    navigate(`/lessons/addlesson/${params.id}`);
  };

  const getLessonList = async () => {
    const result = await lessonList(params.id);
    if (result.code === 200) {
      console.log(result, "result of lessons");
      setLessonData(result.lesson);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  // const slug = () => {
  //   lessonData.map((lesson, i) => {
  //     setlessonSlug(lesson.lesson_slug);
  //     console.log(lesson.lesson_slug, "lesson slug form the lesson map");
  //   });
  // };
  const handleEdit = (event) => {
    console.log(lesson.lesson_slug, "shukar Alhamdulilah");
    navigate(`/lessons/Editlesson/${lesson.lesson_slug}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setAnchorEl(null);
    console.log(lesson, "to delete");
    let id = params.id + "/" + lesson.lesson_slug;
    console.log(id, "maded slug");

    setIsLoading(true);
    setOpenmodal(false);

    const delete_lesson_resp = await lessonDelete(id);
    if (delete_lesson_resp.code == 200) {
      getLessonList();
      setIsLoading(false);
    } else {
      enqueueSnackbar(delete_lesson_resp.message, { variant: "error" });
      handleClose();
    }
  };

  useEffect(() => {
    getLessonList();
    getProgrammesDetail();
  }, []);
  // useEffect(() => {
  //   slug();
  // }, [lessonData]);

  var id = params.id + "/" + lessonSlug;
  console.log(params, "okokokokkok");
  console.log(id, "ok now what");
  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "bi:pencil-square",
      linkTo: `/lessons/Editlesson/${params.id + "/" + lessonSlug}`,
    },
    {
      label: "Delete",
      icon: "ant-design:delete-filled",
      linkTo: ``,
      function: "delete()",
    },
  ];

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  console.log(params, "lesson slug to be pass");
  console.log(lesson, "lesson data to be changed");

  return (
    <>
      <div className="container">
        <div className="row mobile-margin display-flex">
          <div className="col-12">
            <IconButton
              className="back-screen-button"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
        </div>

        <div className="row section-space">
          <div className="col-9">
            <h1>{programmesDetail.title}</h1>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <button
              className="small-contained-button float-end me-3"
              onClick={handlePage}
            >
              Add New Lesson
            </button>
          </div>
        </div>
        <div className="row">
          {lessonData.map((lesson, i) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
              <Card className="programm-card h-100" sx={{ cursor: "pointer" }}>
                <Box
                  sx={{ pt: "100%", position: "relative", cursor: "pointer" }}
                >
                  <ProgrammesImgStyle
                    alt="lessons"
                    onClick={() =>
                      navigate(
                        `/programmes/lessons_detail/${
                          params.id + "/" + lesson.lesson_slug
                        }`,
                        {
                          state: lesson,
                        }
                      )
                    }
                    src={s3baseUrl + lesson.lesson_images.thumbnail_1}
                  />
                </Box>

                <Stack
                  spacing={2}
                  // sx={{ p: 3 }}
                  className="lesson-content"
                >
                  <div className="row mobile-margin display-flex">
                    <div className="col-10">
                      <h3
                        onClick={() =>
                          navigate(
                            `/programmes/lessons_detail/${
                              params.id + "/" + lesson.lesson_slug
                            }`,
                            {
                              state: lesson,
                            }
                          )
                        }
                      >
                        {lesson.title}
                      </h3>
                    </div>
                    <div className="col-2">
                      {/* <ProgramPopover
                        data={MENU_OPTIONS}
                        slug={lesson.lesson_slug}
                        slug2={params.id}
                        className="float-end"
                      /> */}
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon onClick={() => setLesson(lesson)} />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "10ch",
                          },
                        }}
                      >
                        <MenuItem
                          className={classes.fonts}
                          onClick={handleEdit}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          className={classes.fonts}
                          onClick={handleOpenmodal}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  {/* <h3>{lesson.title}</h3> */}
                  {/* </Link> */}
                  <p className="programme-card-desc">
                    {lesson.short_description}
                  </p>
                </Stack>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openmodal}
        onClose={handleClosemodal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openmodal}>
          <Box sx={style}>
            <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to Delete ${
              lesson ? lesson.title : ""
            }`}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClosemodal} color="primary">
                Disagree
              </Button>
              <Button onClick={handleDelete} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
