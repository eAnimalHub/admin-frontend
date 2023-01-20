import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
// import { PodsListing } from "src/DAL/Pods/Pods";
import { s3baseUrl } from "../../config/config";
import MenuOption from "src/components/menuIcons/CustomPopover";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
import CustomPopover from "src/components/menuIcons/CustomPopover";
import { room1, room2, room3 } from "../../assets/index";
import { DeletePod, PodsListing } from "src/DAL/Pods/Pods";
import { no_data_found } from "../../assets/index";
import RecordNotFound from "src/components/RecordNotFound";
import { htmlDecode } from "src/utils/convertHtml";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));
const recordings = [
  {
    id: 1,
    title: "Thinking into result",
    image:
      "https://dynamite-lifestyle-dev-app-bucket.s3.amazonaws.com/room/981c8887-e13c-48b5-8016-9ebdc57efcaf.jpg",
    zoomLink: "this is link",
    password: "12345",
    status: "active",
    order: "1",
    areaCode: "57000",
    video_id: "111212131133",
    short_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae lacus ex. Morbi tempor risus vel ex tristique, ac pulvinar leo pharetra. Integer efficitur arcu felis, ",
    detail_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id eros ante. Maecenas nec orci lectus. Ut ut ornare nibh, id pretium erat. Ut rutrum nec ligula at rhoncus. Vivamus mollis leo mi, quis aliquam arcu finibus eu. Cras sed quam mauris. Aenean a purus tellus. Duis ut orci volutpat nisl tincidunt gravida eget sodales erat. Nunc et vestibulum elit.",
  },
  {
    id: 2,
    title: "Ignite Elite Mastermind",
    image:
      "https://dynamite-lifestyle-dev-app-bucket.s3.amazonaws.com/room/becd4e0f-6dc3-4272-984c-ef786530966b.png",
    zoomLink: "this is link",
    password: "12345",
    video_id: "111212131133",
    status: "active",
    order: "1",
    areaCode: "57000",
    short_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae lacus ex. Morbi tempor risus vel ex tristique, ac pulvinar leo pharetra. Integer efficitur arcu felis, ",
    detail_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id eros ante. Maecenas nec orci lectus. Ut ut ornare nibh, id pretium erat. Ut rutrum nec ligula at rhoncus. Vivamus mollis leo mi, quis aliquam arcu finibus eu. Cras sed quam mauris. Aenean a purus tellus. Duis ut orci volutpat nisl tincidunt gravida eget sodales erat. Nunc et vestibulum elit",
  },
  {
    id: 3,
    title: "Business 101 Mastermind",
    video_id: "111212131133",
    image:
      "https://dynamite-lifestyle-dev-app-bucket.s3.amazonaws.com/quotation/83269f16-5f57-4564-8f23-5f5f602be22a.jpg",
    zoomLink: "this is link",
    password: "12345",
    status: "active",
    order: "1",
    areaCode: "57000",
    short_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae lacus ex. Morbi tempor risus vel ex tristique, ac pulvinar leo pharetra. Integer efficitur arcu felis, ",
    detail_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id eros ante. Maecenas nec orci lectus. Ut ut ornare nibh, id pretium erat. Ut rutrum nec ligula at rhoncus. Vivamus mollis leo mi, quis aliquam arcu finibus eu. Cras sed quam mauris. Aenean a purus tellus. Duis ut orci volutpat nisl tincidunt gravida eget sodales erat. Nunc et vestibulum elit",
  },
];
const RoomCard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [podsData, setPodsData] = useState([]);
  const [editValues, setEditValues] = useState({});
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteValue, setDeleteValue] = useState("");

  const getPodsListing = async () => {
    setIsLoading(true);
    const result = await PodsListing();
    if (result.code === 200) {
      //console.log(result, "resultresult");
      setPodsData(result.room);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const handleEdit = (value) => {
    navigate("/pods/edit-pod", {
      state: { editValues: value },
    });
    //console.log(value, "value.edit");
  };
  const handleNavigateDetail = (value) => {
    navigate("/room/detail-room", {
      state: { detailValues: value },
    });
  };
  const handleAgreeDelete = (value) => {
    //console.log(value, "--value to del");
    setDeleteValue(value.room_slug);
    setOpenDelete(true);
    handleCloseMenu();
  };
  const handleNavigate = () => {
    navigate(`/pods/add-pod`);
  };

  //Deleting Recording
  const handleDelete = async () => {
    setOpenDelete(false);
    //console.log(deleteValue, "setDeleteValue");
    // here call api to delete recording

    const result = await DeletePod(deleteValue);
    if (result.code === 200) {
      //console.log(result, "result");
      getPodsListing();
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      //console.log(result);
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
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
    getPodsListing();
  }, []);
  //console.log(podsData, "podsData");
  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <h2>Pods </h2>
        </div>
        <div className="col-3 text-end">
          <button onClick={handleNavigate} className="small-contained-button">
            Add Pod
          </button>
        </div>
        {podsData.length == 0 ? (
          <RecordNotFound title="Pods" />
        ) : (
          podsData.map((value, index) => {
            return (
              <>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                  <div className="card mt-4 pods-cards-shadow cursor h-100">
                    <img
                      src={s3baseUrl + value.room_image.thumbnail_2}
                      className="card-img-top pods-image"
                      alt="Pods"
                      onClick={() => handleNavigateDetail(value)}
                    />
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-10"
                          onClick={() => handleNavigateDetail(value)}
                        >
                          <h3 className="h2-heading">
                            {htmlDecode(value.title)}
                          </h3>
                        </div>
                        <div className="col-2 menu-option">
                          <CustomPopover menu={MENU_OPTIONS} data={value} />
                        </div>
                        <CustomConfirmation
                          open={openDelete}
                          setOpen={setOpenDelete}
                          title={"Are you sure you want to delete this pod?"}
                          handleAgree={handleDelete}
                        />
                      </div>
                      <p className="programme-card-desc mb-3">
                        {htmlDecode(value.short_description)}
                      </p>
                      <div className="card-button">
                        <p className="pods-active-members">
                          {/* <span>Password: {value.password} </span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RoomCard;
