import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
// import { PodsListing } from "src/DAL/Pods/Pods";
import { s3baseUrl } from "../../config/config";
import MenuOption from "src/components/menuIcons/CustomPopover";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CustomPopover from "src/components/menuIcons/CustomPopover";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
import { Chip } from "@mui/material";
import { get_root_value } from "src/utils/domUtils";
import {
  DeleteRecording,
  RecordingListing,
} from "src/DAL/Recording/Recordings";
import RecordNotFound from "src/components/RecordNotFound";
import { htmlDecode } from "src/utils/convertHtml";
import { product1, product2, product3 } from "src/assets";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};
const recordings = [
  {
    id: 1,
    name: "SERENGETI",
    image: product1,
    unit: "750 ml",
    description: "Wine of South Africa",
    status: true,
  },
  {
    id: 2,
    name: "Butterfly",
    image: product2,
    unit: "180g",
    description: "Super glow",
    status: true,
  },
  {
    id: 3,
    name: "Jigging Light",
    image: product3,
    unit: "5/0",
    description: "Jigging Light",
    status: true,
  },
];
const RecordingCards = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [recordingsList, setRecordingsList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [editValues, setEditValues] = useState({});
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteValue, setDeleteValue] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const recordingList = async () => {
    setIsLoading(true);
    const result = await "";
    if (result.code === 200) {
      //console.log(result, "recordings");
      setRecordingsList(result.recording);
      setIsLoading(false);
    } else {
      // enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleEdit = (value) => {
    // navigate("/recordings/Edit-recording", {
    //   state: { editValues: value },
    // });
    //console.log(value, "value.edit");
  };
  const handleAgreeDelete = (value) => {
    //console.log(value, "--value to del");
    setDeleteValue(value.recording_slug);
    setOpenDelete(true);
    handleCloseMenu();
  };

  //Deleting Recording
  const handleDelete = async () => {
    setOpenDelete(false);
    //console.log(deleteValue, "setDeleteValue");
    // here call api to delete recording

    const result = await deleteValue;
    setIsLoading(false);
    if (result.code === 200) {
      //console.log(result, "result");
      recordingList();
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      //console.log(result);
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const selectedValue = (value) => {
    setEditValues(value);
    //console.log(value, "value...");
  };
  const handleNavigate = () => {
    navigate(`/products/add-products`);
  };
  const handleNavigateDetail = (value) => {
    navigate("/recordings/detail-recording", {
      state: { detailValues: value },
    });
  };

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "akar-icons:edit",
      handleClick: handleEdit,
    },

    {
      label: "Delete",
      icon: "ant-design:delete-twotone",
      handleClick: handleAgreeDelete,
    },
  ];

  useEffect(() => {
    recordingList();
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-sm-12">
          <h2>Products </h2>
        </div>
        <div className="col-lg-5 col-sm-12 text-end">
          <button onClick={handleNavigate} className="small-contained-button">
            Add Products
          </button>
        </div>
        {recordings.length == 0 ? (
          <RecordNotFound title="Products" />
        ) : (
          recordings.map((value, index) => {
            return (
              <>
                <div className="col-lg-4 col-md-4 col-sm-12 mb-4" key={index}>
                  <div className="card mt-4 pods-cards-shadow cursor h-100">
                    <img
                      src={value.image}
                      className="card-img-top pods-image"
                      alt="Pods"
                      height={400}
                      // onClick={() => handleNavigateDetail(value)}
                    />
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <h3
                            className="h2-heading"
                            // onClick={() => handleNavigateDetail(value)}
                          >
                            {htmlDecode(value.name)}
                          </h3>
                        </div>

                        <div className="col-2 menu-option">
                          <CustomPopover menu={MENU_OPTIONS} data={value} />
                        </div>
                        <CustomConfirmation
                          open={openDelete}
                          setOpen={setOpenDelete}
                          title={
                            "Are you sure you want to delete this recording?"
                          }
                          handleAgree={handleDelete}
                        />
                      </div>
                      <p
                        className="programme-card-desc mb-3"
                        // onClick={() => handleNavigateDetail(value)}
                      >
                        {htmlDecode(value.description)}
                      </p>
                      {/* <p className="programme-card-desc mb-3 programme-card-desc-muted">
                      <b className="text-muted">Programme:</b>{" "}
                      {value.program.title}
                    </p> */}
                      <div className="row recording-card-date">
                        <div className="col-8 card-button recording-card-date-position">
                          <p className="pods-active-members">
                            <span> {htmlDecode(value.unit)} </span>
                          </p>
                        </div>
                        <div className="col-4 text-end ms-auto">
                          {/* <div className="col-12 text-end mb-3"> */}
                          {value.status == true ? (
                            <button className="small-contained-chip-success">
                              ACTIVE
                            </button>
                          ) : (
                            <button className="small-contained-chip-error">
                              INACTIVE
                            </button>
                          )}
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
      {/* <Modal
        open={openDelete}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <b> Are you sure you want to delete ?</b>
          </Typography>
          <div className="text-end mt-2">
            <button className="me-2 small-contained-button">Cancel</button>
            <button className="small-contained-button">Agreed</button>
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button onClick={handleAgreeDelete}>Agree</Button>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
};

export default RecordingCards;
