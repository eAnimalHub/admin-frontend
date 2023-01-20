import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { s3baseUrl } from "src/config/config";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { AddCommentOnQuestion } from "src/DAL/MemberGoalStatement/MemberGoalStatement";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
import data from "@iconify/icons-eva/menu-2-fill";
import { DeleteQuestionCommentApi } from "src/DAL/MemberGoalStatement/MemberGoalStatement";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export const QuestionsReply = ({
  data,
  onCloseDrawer,
  detailQuestionHistory,
}) => {
  const params = useLocation();
  const id = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteDoc, setDeleteDoc] = React.useState("");
  console.log(data, "value from page");
  const questionReplyData = [
    {
      action_by: "admin_user",
      action_id: "61fb68431b921d356406d82d",
      comment: "ok",
      createdAt: "2022-07-06",
      goal_statement_question: "6221b30049e0e02ced71fc0e",
      member: "61fca916dfb6667be3ca8834",
      updatedAt: "2022-07-06",
      _id: "1",
    },
  ];

  console.log(params.state._id, "paramsok");
  console.log(id, "id");
  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(message, "handleSubmit");
    let postData = {
      question_id: data._id,
      member_id: id.id,
      comment: message,
    };
    console.log(postData, "postData");
    const result = await AddCommentOnQuestion(postData);
    if (result.code == 200) {
      detailQuestionHistory();
      onCloseDrawer();
      enqueueSnackbar(result.message, { variant: "success" });
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
      // enqueueSnackbar(result.message, { variant: "error" });
    }
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
    const result = await DeleteQuestionCommentApi(deleteDoc._id);
    if (result.code === 200) {
      detailQuestionHistory();
      onCloseDrawer();
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      // enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  if (isLoading == true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  return (
    <div className="container">
      <CustomConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        title={"Are you sure you want to delete ?"}
        handleAgree={handleDelete}
      />
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 mb-3 mt-3">
              <p>{data?.question}</p>
              <Divider />
            </div>

            {data?.comment.length < 1 ? (
              <h6>No Replies</h6>
            ) : (
              data?.comment?.map((reply) => {
                console.log(reply, "yaha sy a rha ha ");
                return (
                  <>
                    <div className="col-10 mb-3">
                      <CircleIcon
                        style={{ fontSize: "15px", paddingRight: "3px" }}
                      />
                      {reply?.comment}
                    </div>

                    <div className="col-2 text-end mb-3">
                      <DeleteIcon
                        className="anchor-style"
                        onClick={() => handleAgreeDelete(reply)}
                      />
                    </div>
                  </>
                );
              })
            )}
            <div className="col-12">
              <div className="col-12 mt-5 mb-2">
                <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Comment"
                    multiline
                    rows={2}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormControl>
              </div>
              <div className="col-12 text-end">
                <button
                  onClick={handleSubmit}
                  className="small-contained-button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
