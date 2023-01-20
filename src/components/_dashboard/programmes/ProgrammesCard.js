import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import LockIcon from "@mui/icons-material/Lock";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";
import ColorPreview from "../../ColorPreview";
import { s3baseUrl } from "../../../config/config";
import Popover from "src/layouts/dashboard/Popover";
import ProgramPopover from "src/components/ProgramPopOver";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect } from "react";
import { ProgramDelete } from "src/DAL/Programmes/Programmes";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@mui/styles";

// ----------------------------------------------------------------------

const ProgrammesImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------
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
//-----------------------------------------------------------------------
ProgrammesCard.propTypes = {
  product: PropTypes.object,
};
const ITEM_HEIGHT = 48;
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
  fonts: {
    fontSize: "13px",
    fontWeight: "500",
  },
}));

export default function ProgrammesCard({ programm }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    _id,
    program_slug,
    title,
    short_description,
    program_images,
    no_of_lesson,
    total_lesson_duration,
    program_lock_status,
  } = programm;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenmodal] = React.useState(false);
  const open = Boolean(anchorEl);
  const [slugName, setSlugName] = React.useState("");
  const [selectedProgram, setSlugdata] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // const handleOpen = () => setOpenmodal(true);
  // const handleClose = () => setOpenmodal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleClickOpen = (data) => {
  //   setdata(data);
  //   setOpen(true);
  // };
  const handleClickOpen = (data) => {
    setSlugdata(data);
    setOpenmodal(true);
  };
  const handleDelete = async () => {
    // console.log(selectedProgram);
    setIsLoading(true);
    setOpenmodal(false);
    setSlugdata([]);
    console.log(selectedProgram);
    const delete_program_resp = await ProgramDelete(selectedProgram);
    if (delete_program_resp.code == 200) {
      window.location.reload();
      setIsLoading(false);
    } else {
      enqueueSnackbar(delete_program_resp.message, { variant: "error" });
      handleClose();
    }
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };
  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "bi:pencil-square",
      linkTo: `/programmes/editprogram/${program_slug}`,
    },
    {
      label: "Delete",
      icon: "ant-design:delete-filled",
      linkTo: ``,
      function: "delete()",
    },
  ];
  useEffect(() => {
    if (openModal === true) {
      setAnchorEl(null);
    }
  }, [openModal]);
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  // console.log(selectedProgram, "slug jo delete krna ha");
  return (
    <>
      <Card className="programm-card h-100" sx={{ cursor: "pointer" }}>
        <Box sx={{ pt: "100%", position: "relative", cursor: "pointer" }}>
          {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}
          {/* Lock icon on the programs */}
          {/* {program_lock_status === true ? (
          <LockIcon
            style={{
              zIndex: 9,
              top: 10,
              right: 9,
              position: "absolute",
            }}
          />
        ) : (
          ""
        )} */}

          <ProgrammesImgStyle
            // onClick={() =>
            //   navigate(`/programmes/programmes_detail/${_id}`, {
            //     state: programm,
            //   })
            // }
            alt={title}
            onClick={() =>
              navigate(`/programmes/${program_slug}`, {
                state: programm,
              })
            }
            src={s3baseUrl + program_images.thumbnail_1}
          />
        </Box>

        <Stack spacing={2} className="programme-content">
          {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
          <div className="row mobile-margin display-flex">
            <div className="col-10">
              <h3
                onClick={() =>
                  navigate(`/programmes/${program_slug}`, {
                    state: programm,
                  })
                }
              >
                {title}
              </h3>
            </div>
            <div className="col-2">
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
                <MenuItem
                  className={classes.fonts}
                  onClick={() =>
                    navigate(`/programmes/editprogram/${program_slug}`)
                  }
                >
                  Edit
                </MenuItem>
                <MenuItem
                  className={classes.fonts}
                  onClick={() => handleClickOpen(program_slug)}
                >
                  Delete
                </MenuItem>
              </Menu>
              {/* <ProgramPopover
              data={MENU_OPTIONS}
              slug={program_slug}
              className="float-end"
            /> */}
            </div>
          </div>

          {/* </Link> */}
          <p className="programme-card-desc">{short_description}</p>

          {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack> */}
          {/* <div
          className="card-button"
          //  style={{ position: 'absolute', bottom: 15, width: '92%', textAlign: 'center' }}
        >
          <Button
            variant="contained"
            color="warning"
            // fullWidth
            style={{ width: 200 }}
            onClick={() => navigate(`/programmes/programmes_detail/${id}`, { state: product })}
          >
            WATCH
          </Button>
        </div> */}
          <div className="card-button">
            <p className="programme-duration">
              <span>
                {no_of_lesson} Lessons &nbsp; | &nbsp; {total_lesson_duration}
              </span>
            </p>
          </div>
        </Stack>
      </Card>
      {/* <Dialog
        open={openModal}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to Delete ${program_slug}`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <DialogTitle id="alert-dialog-slide-title">{`Are you sure you want to Delete ${program_slug}`}</DialogTitle>
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
