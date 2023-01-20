import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { menOne, menTwo } from "../../../assets";
import { s3baseUrl } from "../../../config/config";
import { maxHeight } from "@mui/system";
import { useNavigate } from "react-router-dom";
//-------------
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ProgramReviewDelete } from "src/DAL/Programmes/Programmes";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 1,
};

const ArrowStyle = styled("span")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: "absolute",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)",
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const ITEM_HEIGHT = 48;

export default function RatingCard({ review, reviewList }) {
  console.log(review, "cards data");
  const classes = useStyles();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedReview, setSlugdata] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const open = Boolean(anchorEl);
  //===========
  const [openmodal, setOpenmodal] = React.useState(false);
  const handleOpenmodal = () => setOpenmodal(true);
  const handleClosemodal = () => setOpenmodal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleNavigate = () => {
    // navigate(`/programmes/editProgrammeReview/${review._id}`);
    navigate(`/programmes/editProgrammeReview/${review.program}/${review._id}`);
  };
  const handleClickOpen = (data) => {
    // console.log(data, "id to del");
    setSlugdata(data);
    setOpenmodal(true);
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };

  const handleDelete = async () => {
    // console.log(selectedReview,"jo del ho ga");
    setIsLoading(true);
    setAnchorEl(null);
    setOpenmodal(false);
    setSlugdata([]);
    console.log(selectedReview);
    const delete_review_resp = await ProgramReviewDelete(selectedReview);
    if (delete_review_resp.code == 200) {
      reviewList();
      setIsLoading(false);
    } else {
      enqueueSnackbar(delete_review_resp.message, { variant: "error" });
      handleClose();
    }
  };
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  console.log(
    s3baseUrl + review.review_images_url.thumbnail_1,
    "review_type image url"
  );
  return (
    <>
      <Card sx={{ borderRadius: 1, height: "100%" }}>
        <div className="row pt-3 ml-0 mr-0 ">
          <div className="col-12 feedback-programme-header">
            <img
              src={s3baseUrl + review.review_images_url.thumbnail_1}
              width="70"
              height="70"
              style={{ borderRadius: 50 }}
            />
          </div>
          <div className="col-10 feedback-programme-header">
            {/* <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar> */}
            <h5 className="feedback-programme-text">{review.client_name}</h5>
          </div>
          <div className="col-2 pe-4 feedback-programme-header">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
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
              <MenuItem onClick={() => handleNavigate(review._id)}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleClickOpen(review._id)}>
                Delete
              </MenuItem>
            </Menu>
          </div>
          <div className="col-12 pb-5">
            <p className="normal-font ps-3 pe-3">{review.short_description}</p>
          </div>
          <div className="col-12 rating-stars-place">
            <Rating
              name="read-only"
              value={5}
              readOnly
              className="rating-stars"
            />
          </div>
        </div>

        {/* <CardContent>
        <p>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </p>
        
      </CardContent> */}
      </Card>
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
            <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to Delete`}</DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
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
