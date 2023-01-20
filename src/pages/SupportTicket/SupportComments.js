import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { MomentDetailApi } from "src/DAL/Memories/Memories";
import { CircularProgress, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { s3baseUrl } from "src/config/config";
import ChatCard from "src/components/SupportTickets/ChatCard";
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
export default function SupportComments() {
  const navigate = useNavigate();
  //   const params = useParams();
  //   const [memoriesData, setMemoriesData] = useState([]);
  //   const [sliderData, setSliderData] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const { enqueueSnackbar } = useSnackbar();
  //   const classes = useStyles();
  //   const getMemoryDetail = async () => {
  //     const result = await MomentDetailApi(params.memory_slug);
  //     if (result.code === 200) {
  //       console.log(result.magicMoment, "result.magicMoment");
  //       setMemoriesData(result.magicMoment);
  //       let galleryArray = [];
  //       let galleryObject = {};
  //       result.magicMoment.moment_image.map((gallery, index) => {
  //         galleryObject = {
  //           original: s3baseUrl + gallery.thumbnail_1,
  //           thumbnail: s3baseUrl + gallery.thumbnail_2,
  //         };
  //         galleryArray.push(galleryObject);
  //       });
  //       setSliderData(galleryArray);
  //       setIsLoading(false);
  //     } else {
  //       enqueueSnackbar(result.message, { variant: "error" });
  //       navigate(`/memories`);
  //     }
  //   };

  //   useEffect(() => {
  //     getMemoryDetail();
  //   }, []);

  //   if (isLoading) {
  //     return <CircularProgress className={classes.loading} color="primary" />;
  //   }
  return (
    <div className="container">
      <div className="row section-space">
        <div className="col-sm-12">
          <ChatCard />
        </div>
      </div>
    </div>
  );
}
