import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// import {
//   DeleteCommentApi,
//   memberGoalStatementListApi,
// } from "src/DAL/member/member";
import { useLocation, useParams } from "react-router-dom";
import { s3baseUrl } from "src/config/config";
import { CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
// import AddKimsReply from "./AddKimReply";
import { project_name } from "../../config/config";
import TextField from "@mui/material/TextField";
import GoalGallerySlider from "./GoalGallerySlider";
import CustomDrawer from "src/components/CustomDrawer/CustomDrawer";
import { useState } from "react";
import { AnswerHistory } from "./AnswerHistory";
import { QuestionsReply } from "./QuestionsReply";
import {
  getGoalStatementQuestion,
  questionDetailApi,
} from "src/DAL/GoalStatement/GoalStatement";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const MemberGoalstatementList = () => {
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [gallery, setGallery] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [replies, setReplies] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteDoc, setDeleteDoc] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [openAnswerHistory, setOpenAnswerHistory] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [answerHistoryData, setAnswerHistoryData] = useState();
  const [replyData, setReplyData] = useState();
  const [expanded, setExpanded] = React.useState(0);

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    //console.log(panel, "panel");
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpenAnswerDrawer = (value) => {
    //console.log(value, "valueOfQ");
    setAnswerHistoryData(value);
    setOpenAnswerHistory(true);
  };

  const handleCloseAnswerDrawer = () => {
    setOpenAnswerHistory(false);
  };
  const handleOpenReplyDrawer = (value) => {
    setReplyData(value);
    setOpenReply(true);
  };
  //console.log(replyData, "handleOpenReplyDrawer");
  const handleCloseReplyDrawer = () => {
    setOpenReply(false);
  };
  //console.log(state, "statestatestate");

  const detailQuestionHistory = async () => {
    setIsLoading(true);
    const result = await questionDetailApi(params.id);
    if (result.code == 200) {
      console.log(result, "Question detail");
      setGallery(result.goal_statement_gallery);
      setQuestions(result.goal_statement_question);
      setReplies(result.reply);

      let galleryArray = [];
      let galleryObject = {};
      result.goal_statement_gallery.map((gallery, index) => {
        galleryObject = {
          original: s3baseUrl + gallery.thumbnail_1,
          thumbnail: s3baseUrl + gallery.thumbnail_2,
        };
        galleryArray.push(galleryObject);
      });

      setGallery(galleryArray);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      //console.log("api is not working");
    }
  };

  const handleDeleteReply = (value) => {
    //console.log(value, "handleDeleteReply");
  };
  const handleAgreeDelete = (value) => {
    //console.log(value, "delete it ");
    setDeleteDoc(value);
    setOpenDelete(true);
  };
  const handleDelete = async () => {
    //console.log(deleteDoc, "delete function run");
    setOpenDelete(false);
    setIsLoading(true);
    const result = await deleteDoc._id;
    if (result.code === 200) {
      goalDetail();
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleReply = (value) => {
    //console.log(value, "handleReply");
    navigate(`/member-goalstatement/question-reply/${params.id}`, {
      state: value,
    });
  };
  const handleAnswerHistory = (value) => {
    //console.log(value, "handleReply");
    navigate(`/member-goalstatement/answer-history/${params.id}`, {
      state: value,
    });
  };
  React.useEffect(() => {
    detailQuestionHistory();
  }, []);
  React.useEffect(() => {}, []);

  if (isLoading == true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  //console.log(questions, "questions");
  return (
    <div className="container">
      <CustomConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        title={"Are you sure you want to delete ?"}
        handleAgree={handleDelete}
      />
      <div className="row">
        <div className="col-12 mb-3 reply-anchor">
          <IconButton
            className="back-screen-button mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          {/* <a
            className="small-contained-button float-end mt-1 anchor-style"
            // onClick={() => navigate(`/programmes/addreview/`)}
            href="#kim-reply"
          >
            {project_name == "basic-dev"
              ? "Kim's Reply"
              : project_name == "dynamite-lifestyle-dev"
              ? "Kim's Reply"
              : project_name == "danielle-dev"
              ? "Danielle's Reply"
              : project_name == "hina-khan-dev"
              ? "Hina's Reply"
              : project_name == "dev-feature"
              ? "Kim's Reply"
              : project_name == "pgi-dev"
              ? "Kim's Reply"
              : "Kim's Reply"}
          </a> */}
        </div>
        <div className="col-12 mb-5 ">
          {
            <>
              <h2 className="mb-5">Goal Statement Gallery</h2>
              {gallery.length == 0 ? (
                <div className="goal-gallery p-3">
                  Member has not added any goal statement gallery yet
                </div>
              ) : (
                <GoalGallerySlider data={gallery} />
              )}
            </>
          }
        </div>

        {/* <div className="col-12">
          <h2 className="mb-4">Goal Statement Questions</h2>
        </div> */}
        {questions.map((question, index) => {
          //console.log(question, "indexindexindexindex");
          return (
            <Accordion
              expanded={expanded === index}
              onChange={handleChangeAccordion(index)}
              className="question-background"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{question.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="">
                    <div className="row">
                      <div className="col-12 mb-5 text-muted">
                        {question.answer == "" ? "" : question.answer}
                      </div>
                      <div className="col-6 mb-3 text-muted text-start">
                        <button
                          className="small-contained-button ms-3"
                          onClick={() => {
                            handleOpenAnswerDrawer(question);
                          }}
                        >
                          Answer History
                        </button>
                      </div>
                      <div className="col-6 mb-3 text-muted text-end">
                        <button
                          className="small-contained-button me-auto"
                          onClick={() => handleOpenReplyDrawer(question)}
                        >
                          Reply {" (" + question.comment.length + ")"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <div className="row">
        <div className="col-12">
          <h2 id="kim-reply" className="mb-4">
            {/* {replies.length == 0
              ? ""
              : project_name == "basic-dev"
              ? "Kim's Reply"
              : project_name == "dynamite-lifestyle-dev"
              ? "Kim's Reply"
              : project_name == "danielle-dev"
              ? "Danielle's Reply"
              : project_name == "hina-khan-dev"
              ? "Hina's Reply"
              : project_name == "dev-feature"
              ? "Kim's Reply"
              : project_name == "pgi-dev"
              ? "Kim's Reply"
              : "Kim's Reply"} */}
          </h2>
        </div>

        {/* {replies.map((reply) => {
          console.log(reply);
          return (
            <>
              <div className="col-12 mb-3">
                <CircleIcon /> {reply.message}
              </div>
              <div className="col-12 mb-1">
                {reply?.audio_file && (
                  <audio
                    className="w-100"
                    src={s3baseUrl + reply?.audio_file}
                    controls
                  />
                )}
              </div>
              <div className="col-6 mb-5 text-muted">
                {moment(reply.createdAt).format("YYYY-MM-DD")}
              </div>
              <div className="col-6 text-end">
                <button
                  className="small-contained-button"
                  onClick={() => handleAgreeDelete(reply)}
                >
                  Delete
                </button>
              </div>
            </>
          );
        })} */}
      </div>
      <div className="row">
        <div className="col-12">
          {/* <AddKimsReply goalDetail={goalDetail} /> */}
        </div>
      </div>
      <CustomDrawer
        isOpenDrawer={openAnswerHistory}
        onOpenDrawer={handleOpenAnswerDrawer}
        onCloseDrawer={handleCloseAnswerDrawer}
        pageTitle={`Answer History`}
        componentToPassDown={
          <AnswerHistory
            data={answerHistoryData}
            member_id={params.id}
            detailQuestionHistory={detailQuestionHistory}
          />
        }
      />
      <CustomDrawer
        isOpenDrawer={openReply}
        onOpenDrawer={handleOpenReplyDrawer}
        onCloseDrawer={handleCloseReplyDrawer}
        pageTitle={`Replies`}
        data={replyData}
        componentToPassDown={
          <QuestionsReply
            data={replyData}
            detailQuestionHistory={detailQuestionHistory}
            onCloseDrawer={handleCloseReplyDrawer}
          />
        }
      />
    </div>
  );
};

export default MemberGoalstatementList;
