import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress, IconButton } from "@mui/material";
import { questionReplyHistory } from "src/DAL/MemberGoalStatement/MemberGoalStatement";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import CircleIcon from "@mui/icons-material/Circle";
import moment from "moment";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export const AnswerHistory = ({ data, member_id }) => {
  const id = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const params = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(params, "params");
  console.log(id, params?.state?._id, "id");
  const [replies, setReplies] = useState([]);

  console.log(data?._id, member_id, "pppppppppppppppp");

  const historyDetail = async () => {
    setIsLoading(true);
    let postData = {
      question_id: data._id,
      member_id: member_id,
    };
    const result = await questionReplyHistory(postData);
    if (result.code == 200) {
      console.log(result, "resultsetIsLoading");
      setReplies(result.answer_stats);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };
  React.useEffect(() => {
    historyDetail();
  }, []);
  console.log(data, "datadatadatadata");
  if (isLoading == true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  const replyData = [
    {
      answer:
        "Fusce fermentum. Morbi mattis ullamcorper velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. In ut quam vitae odio lacinia tincidunt. Aenean viverra rhoncus pede.",
      createdAt: "2022-03-11",
      goal_statement_question: "6221b32949e0e02ced71fc2b",
      member: "61fca916dfb6667be3ca8834",
      updatedAt: "2022-03-11",
      _id: "1",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        {/* <div className="col-12 mb-3">
          <IconButton
            className="back-screen-button mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
        </div> */}
        <div className="col-12 mt-2">
          <p>{data?.question}</p>
        </div>
        {replies?.length < 1 ? (
          <h6>No Answers Yet</h6>
        ) : (
          replies?.map((reply) => {
            console.log(reply);
            return (
              <>
                <div className="col-12 mb-3">
                  <CircleIcon
                    style={{ fontSize: "15px", paddingRight: "3px" }}
                  />
                  {reply?.answer}
                </div>

                <div className="col-6 mb-5 text-muted">
                  {moment(reply?.createdAt).format("YYYY-MM-DD")}
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};
