import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import {
  DocumentDetail,
  programmDetail,
} from "../../DAL/Programmes/Programmes";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import ResourcesCard from "src/components/_dashboard/programmes/ResourcesCard";
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

const SourcesFiles = (props) => {
  console.log(props, "props of source file");
  let word =
    "https://play-lh.googleusercontent.com/9kABykeGovHPy-dN19lRxxnCp8IZK3Pkl8qLFNxrEe-hhKVZeiyhTBEIRUt6t-vhxQ";
  let pdf =
    "https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ";

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

  console.log(params.slug, "params");
  const getProgrammesDetail = async () => {
    const result = await DocumentDetail(params.slug);
    if (result.code === 200) {
      if (result.program_document.length < 1) {
        setIsLoading(false);
      }
      console.log(result.program_document, "result for programs list");
      setReviewsList(result.program_review);
      result.program_document.map((value, index) => {
        setReviewDes(value.short_description);
        setClientName(value.client_name);
        setProfile(value.review_file_url);
        setResourcesList(result.program_document);
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
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() =>
              navigate(`/programmes/programmes_detail/${params.slug}`)
            }
          >
            <ArrowBackIcon />
          </IconButton>
          <button
            className="small-contained-button float-end mt-1"
            onClick={() => navigate(`/programmes/Addsources/${params.slug}`)}
          >
            Add Document
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <h2>Sources Files</h2>
          {/* <p className="normal-font">
            It is for anyone who wants calmness and serenity in their life, and
            it’s perfect for people that crave clarity and direction and are
            ready to uplevel their thinking and results.
          </p> */}
        </div>
        {resourcesList.length > 0
          ? resourcesList.map((review, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                {/* <RatingCard review={review} /> */}
                <ResourcesCard
                  imageLink={pdf}
                  list={() => getProgrammesDetail()}
                  resource={review}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default SourcesFiles;
