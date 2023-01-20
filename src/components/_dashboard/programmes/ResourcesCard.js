import React, { useState } from "react";
import {
  Box,
  Card,
  Link,
  Typography,
  Tooltip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { s3baseUrl } from "src/config/config";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ProgramDocumentDelete } from "src/DAL/Programmes/Programmes";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 1,
};

const ITEM_HEIGHT = 48;

function ResourcesCard({ imageLink, resource, list }) {
  const params = useParams();
  const classes = useStyles();
  // console.log(resource, "resources in resources card");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [activeState, setactiveState] = React.useState("");
  const [openmodal, setOpenmodal] = React.useState(false);
  const handleOpenmodal = () => setOpenmodal(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClosemodal = () => setOpenmodal(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    navigate(
      `/programmes/editresource/${params.slug}/${resource.document_slug}`
    );
  };
  const handleDelete = async () => {
    setIsLoading(true);
    // console.log(selectedProgram);
    let id = params.slug + "/" + resource.document_slug;
    console.log(id, "slug data");
    setAnchorEl(null);

    setOpenmodal(false);

    const delete_document_resp = await ProgramDocumentDelete(id);
    console.log(delete_document_resp, "delete_document_resp");
    if (delete_document_resp.code == 200) {
      list();
      setIsLoading(false);
    } else {
      setIsLoading(false);
      enqueueSnackbar(delete_document_resp.message, { variant: "error" });
      handleClose();
    }
  };

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  // console.log(params, "params to edit");

  return (
    <>
      <Card
        className="lesson-card h-100"
        // onClick={() =>
        //   navigate(
        //     "/programmes/lessons_detail/48ce0817-9219-4977-9149-168e020ad288",
        //     { state: { name: "Creactive Concious" } }
        //   )
        // }
      >
        <div className="row p-3">
          <div className="col-lg-3 col-md-3 col-sm-12">
            <img
              className="lesson-card-image"
              src={
                resource.document_type === "image"
                  ? s3baseUrl + resource.document_file_url
                  : imageLink
              }
              alt="name"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-4 mt-2">
            <h4 className="lesson-heading ">{resource.title} </h4>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 text-end">
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
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleOpenmodal}>Delete </MenuItem>
            </Menu>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            <p className="normal-font pb-4 pt-2">
              {resource.detailed_description}
            </p>
            <div className="download-button">
              <Tooltip title="Download">
                <DownloadIcon className="icon-style" />
              </Tooltip>
            </div>
            {/* <Button variant="outlined" startIcon={<DownloadIcon />}>
              Download
            </Button> */}
            {/* <p className="programme-duration">5 Lessons &nbsp; | &nbsp; 5 hr 16 min 19 sec</p> */}
          </div>
        </div>
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
            <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to Delete ${resource.title}`}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClosemodal} color="primary">
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

export default ResourcesCard;
