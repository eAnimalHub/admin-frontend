import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { s3baseUrl } from "src/config/config";
import ChatCard from "src/components/SupportTickets/ChatCard";
import ModelBox from "src/components/ModalBox/ImageModalBox";
import {
  csvImage,
  docImage,
  pdfImage,
  wordImage,
  audioImage,
  xlsxImage,
  otherImage,
} from "src/assets";
const imageLinks = {
  docx: wordImage,
  mp3: audioImage,
  pdf: pdfImage,
  csv: csvImage,
  doc: docImage,
  xlsx: xlsxImage,
  xls: xlsxImage,
  other: otherImage,
};
import {
  markResolved,
  SupportTicketDetailApi,
} from "src/DAL/SupportTicket/SupportTicket";
import { htmlDecode } from "src/utils/convertHtml";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export default function SupportTicketDetail(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const params = useParams();
  const { state } = useLocation();
  const [supportTicketData, setSupportTicketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openResolved, setOpenResolved] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleOpen = (image_path) => {
    setImageUrl(image_path);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const getSupportTicketDetail = async () => {
    const result = await SupportTicketDetailApi(params.id);
    if (result.code === 200) {
      console.log(result, "resultresultresultresultresultresult");
      setSupportTicketData(result.support_ticket);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      navigate(`/support-ticket`);
    }
  };
  const handleMarkResolvedPopup = (value) => {
    setOpenResolved(true);
  };
  const handleMarkResolved = async () => {
    setOpenResolved(false);
    setIsLoading(true);
    const result = await markResolved(params.id);
    if (result.code === 200) {
      getSupportTicketDetail(result.support_ticket);
      enqueueSnackbar(result.message, { variant: "success" });
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      navigate(`/support-ticket`);
    }
  };
  console.log(state, "statestatestatestate");
  const getCommentImage = (file) => {
    console.log(file, "filefilefilefile");
    const ext = file.thumbnail_1.split(".").pop();
    if (
      ext == "jpg" ||
      ext == "JPG" ||
      ext == "png" ||
      ext == "webp" ||
      ext == "jpeg" ||
      ext == "JPEG" ||
      ext == "PNG"
    ) {
      console.log(ext, "extextextextextext");
      return s3baseUrl + file.thumbnail_2;
    } else if (imageLinks[ext]) {
      console.log("imageLinksimageLinks");
      return imageLinks[ext];
    } else {
      console.log("otherotherotherotherother");
      return imageLinks.other;
    }
  };

  useEffect(() => {
    getSupportTicketDetail();
  }, []);
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  return (
    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button me-3"
            onClick={() => navigate("/support-ticket")}
          >
            <ArrowBackIcon />
          </IconButton>

          {state?.member?.first_name
            ? state?.member?.first_name + " (" + state?.member?.email + ")"
            : ""}

          {supportTicketData.ticket_status === 1 ||
          supportTicketData.ticket_status === 2 ? (
            <button
              className="small-contained-button float-end mt-1 disabled"
              disabled="disabled"
            >
              Resolved
            </button>
          ) : (
            <button
              className="small-contained-button float-end mt-1"
              onClick={handleMarkResolvedPopup}
            >
              Mark Resolve
            </button>
          )}
        </div>
      </div>
      <div className="row section-space">
        <div className="col-sm-12">
          <h1>{htmlDecode(supportTicketData.subject)}</h1>
        </div>
      </div>

      <div className="row media-margin">
        <div className="col-12">
          <p>{htmlDecode(supportTicketData.description)}</p>
        </div>
        <div className="col-sm-12 my-2">
          {supportTicketData.ticket_images &&
            supportTicketData.ticket_images.map((image, i) => {
              const ext = image.thumbnail_1.split(".").pop();
              if (
                ext == "jpg" ||
                ext == "JPG" ||
                ext == "png" ||
                ext == "webp" ||
                ext == "jpeg" ||
                ext == "JPEG" ||
                ext == "PNG"
              ) {
                return (
                  <span className="preview ticket_image_preview" key={i}>
                    <img
                      onClick={() => {
                        handleOpen(s3baseUrl + image.thumbnail_1);
                      }}
                      className="p-0"
                      src={s3baseUrl + image.thumbnail_2}
                    />
                  </span>
                );
              } else {
                return (
                  <span className="preview ticket_image_preview" key={i}>
                    <a
                      href={s3baseUrl + image.thumbnail_1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={getCommentImage(image)} />
                    </a>
                  </span>
                );
              }
            })}
        </div>
        <ChatCard
          comments={supportTicketData.comment}
          ticket_id={supportTicketData._id}
          list_data={getSupportTicketDetail}
          supportTicketData={supportTicketData}
          memberName={state?.member?.first_name}
          memberEmail={state?.member?.email}
        />
        <ModelBox open={open} handleClose={handleClose} image_url={imageUrl} />
        <CustomConfirmation
          open={openResolved}
          setOpen={setOpenResolved}
          title={"Are you sure you want to mark this Ticket as resolved?"}
          handleAgree={handleMarkResolved}
        />
      </div>
    </div>
  );
}
