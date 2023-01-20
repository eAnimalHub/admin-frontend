import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  DeleteCommentApi,
  memberGoalStatementListApi,
} from "src/DAL/member/member";
import { useParams } from "react-router-dom";
import { s3baseUrl } from "src/config/config";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomConfirmation from "src/components/ModalPopover/Confirmation";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import AddKimsReply from "./AddKimReply";
import { project_name } from "../../config/config";
import { getNinetyDayQuestionApi } from "../../DAL/NinetyDayQuestion/NinetyDayQuestion";
import FormControl from "@mui/material/FormControl";
import ChartJs from "./Chart";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const ToDoTracker = () => {
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [gallery, setGallery] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [replies, setReplies] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteDoc, setDeleteDoc] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const goalDetail = async () => {
    const result = await getNinetyDayQuestionApi();
    if (result.code == 200) {
      console.log(result, "result of goalstatement");
      setQuestions(result.Questions_array);
    } else {
      console.log("else case");
    }
  };
  const handleDeleteReply = (value) => {
    console.log(value, "handleDeleteReply");
  };
  const handleAgreeDelete = (value) => {
    console.log(value, "delete it ");
    setDeleteDoc(value);
    setOpenDelete(true);
  };
  const handleDelete = async () => {
    console.log(deleteDoc, "delete function run");
    setOpenDelete(false);
    setIsLoading(true);
    const result = await DeleteCommentApi(deleteDoc._id);
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
    console.log(value, "handleReply");
    navigate(`/member/goal-statement-Question-reply/${params.id}`, {
      state: value,
    });
  };
  const handleAnswerHistory = (value) => {
    console.log(value, "handleReply");
    navigate(`/member/goal-statement-Question-history/${params.id}`, {
      state: value,
    });
  };
  React.useEffect(() => {
    goalDetail();
  }, []);
  if (isLoading == true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(project_name, "project_namereply");
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3 reply-anchor">
          <IconButton
            className="back-screen-button mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="col-12 mb-5">
          <ChartJs />
        </div>

        <div className="col-12">
          <h2 className="mb-4">90 Day Formula</h2>
        </div>
        {questions.map((question) => {
          return (
            <>
              {" "}
              <div className="col-12 ">
                <h4>
                  <b>{question.question_statement}</b>
                </h4>
              </div>
              <div className="col-12">
                <div
                  dangerouslySetInnerHTML={{
                    __html: question.description,
                  }}
                ></div>
              </div>
              <div className="col-12 mt-1 mb-3">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-flexible"
                    label={question.answer == "" ? "Did Not Answer" : "Answer"}
                    multiline
                    rows={2}
                    name="Answer"
                    disabled
                    value={question.answer}
                  />
                </FormControl>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoTracker;
