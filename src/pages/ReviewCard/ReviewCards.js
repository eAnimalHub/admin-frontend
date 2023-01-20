import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import {
  programmDetail,
  programmReview,
} from "../../DAL/Programmes/Programmes";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import { s3baseUrl } from "../../config/config";
import { useSnackbar } from "notistack";
import RatingCard from "src/components/_dashboard/programmes/RatingCard";
import ProgrammDetailTab from "src/components/_dashboard/programmes/ProgrammDetailTab";
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const ReviewCards = (props) => {
  //console.log(props, "okokoko");
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [programmesDetail, setProgrammesDetail] = useState({});
  const [lessonsList, setLessonsList] = useState([]);
  const [resourcesList, setResourcesList] = useState([]);
  const [profile, setProfile] = useState("");
  const [review, setReviewDes] = useState("");
  const [clientName, setClientName] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  console.log(params.slug);
  const getProgrammesDetail = async () => {
    const result = await programmReview(params.slug);
    if (result.code === 200) {
      console.log(result, "result for review list");
      setReviewsList(result.program_review);
      result.program_review.map((value, index) => {
        setReviewDes(value.short_description);
        setClientName(value.client_name);
        setProfile(value.review_file_url);
      });

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
  //   console.log(profile, "profile image");

  return (
    <>
      <div className="container">
        <div className="row mobile-margin display-flex">
          <div className="col-12">
            <IconButton
              className="back-screen-button"
              onClick={() => navigate(`/programmes/${params.slug}`)}
            >
              <ArrowBackIcon />
            </IconButton>
            <button
              className="small-contained-button float-end mt-1"
              onClick={() => navigate(`/programmes/addReview/${params.slug}`)}
            >
              Add Programme Review
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <h2>WHAT OUR CLIENTS SAY</h2>
            <p className="normal-font">
              It is for anyone who wants calmness and serenity in their life,
              and it’s perfect for people that crave clarity and direction and
              are ready to uplevel their thinking and results.
            </p>
          </div>
          {reviewsList.length > 0
            ? reviewsList.map((review, i) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mt-4 ">
                  <RatingCard
                    review={review}
                    reviewList={getProgrammesDetail}
                  />
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default ReviewCards;
