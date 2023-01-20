import { FormControl, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChartJs from "./Chart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getNinetyDayQuestionApi } from "src/DAL/member/Member";

const Todo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [targetAmount, setTargetAmount] = useState("");
  const [totalEarning, setTotalEarning] = useState("");

  const goalDetail = async () => {
    const result = await getNinetyDayQuestionApi();
    if (result.code == 200) {
      console.log(result, "result of goalstatement");
      setQuestions(result.Questions_array);
    } else {
      console.log("else case");
    }
  };

  console.log(state, "statestate");
  const question = state.nineteen_day_vision_questions;
  useEffect(() => {
    goalDetail();
    setTargetAmount(state?.target_amount);
    setTotalEarning(state?.total_earning);
    // setQuestions(state.nineteen_day_vision_questions);
    // console.log(questions, "questionquestion");
  }, []);

  return (
    <div className="container">
      <div className="col-12">
        <IconButton
          className="back-screen-button mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="row">
        <div className="col-12">
          <ChartJs target={targetAmount} earning={totalEarning} />
        </div>
        <div className="col-12 mt-5">
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

export default Todo;
