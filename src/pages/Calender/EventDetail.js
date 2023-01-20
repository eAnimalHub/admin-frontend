import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomPopover from "src/components/CustomPopover";
import { DeleteEvent, eventsDetailApi } from "src/DAL/Calendar/Calendar";
import EditEvent from "./EditEvents";
import CustomConfirmation from "src/components/menuIcons/CustomConfirmation";
import { Chip } from "@mui/material";
import { IconButton, Divider, CircularProgress } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { htmlDecode } from "src/utils/convertHtml";
import { get_date_with_user_time_zone } from "src/utils/constants";
import { useContentSetting } from "src/Hooks/ContentSettingState";

// import { get_date_with_user_time_zone } from "src/utils/constants";
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export default function EventDetail({
  eventDetailData,
  onCloseDrawer,
  dataList,
}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState(false);
  const [eventSlug, setEventSlug] = useState("");
  const [editValues, setEditValues] = useState({});
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [eventDetail, setEventDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, adminTimeZone } = useContentSetting();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleEdit = (value) => {
    setShowEditComponent(true);
  };
  const handleAgreeDelete = (value) => {
    setEventSlug(value);
    setOpenDelete(true);
  };
  let eventStartTime = "";
  let eventEndTime = "";

  const getEventinformation = async () => {
    const result = await eventsDetailApi(eventDetailData.event_slug);
    if (result.code === 200) {
      //console.log(result, "eventDetail");
      setEditValues(result.event);
      setIsLoading(false);
      // eventStartTime = get_date_with_user_time_zone(
      //   result.event.start_date_time,
      //   "hh:mm A",
      //   userInfo.time_zone,
      //   adminTimeZone
      // );
      eventStartTime = get_date_with_user_time_zone(
        result.event.start_date + " " + result.event.start_time,
        "hh:mm A",
        userInfo.time_zone,
        adminTimeZone
      );
      //console.log(eventStartTime, "result.event.start_date");

      eventEndTime = get_date_with_user_time_zone(
        result.event.end_date_time,
        "hh:mm A",
        userInfo.time_zone,
        adminTimeZone
      );

      // eventEndTime = get_date_with_user_time_zone(
      //   result.event.end_date_time,
      //   "hh:mm A",
      //   userInfo.time_zone,
      //   adminTimeZone
      // );
      setStartTime(result.event.start_time);
      setEndTime(eventEndTime);
      //console.log(eventEndTime, "eventEndTime");
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  //Deleting event
  const handleDelete = async () => {
    setOpenDelete(false);
    setIsLoading(true);
    const result = await DeleteEvent(eventSlug);
    if (result.code === 200) {
      // console.log(result, "result");
      setIsLoading(false);
      dataList();
      enqueueSnackbar(result.message, { variant: "success" });
      navigate("/calender");
      onCloseDrawer();
    } else {
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
    // setEditValues(eventDetailData);
  }, [eventDetailData]);
  useEffect(() => {
    getEventinformation();
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }
  //console.log(editValues, "editValueseditValues");
  return (
    <>
      {showEditComponent ? (
        <EditEvent
          editValues={editValues}
          dataList={dataList}
          setEditValues={setEditValues}
          getEventinformation={getEventinformation}
          setShowEditComponent={setShowEditComponent}
        />
      ) : (
        <div className="container event-details">
          <h1>{htmlDecode(editValues.title)}</h1>
          <div className="row media-margin">
            <div className="col-12 section-space">
              <div className="row">
                <div className="col-4">
                  <b>Start Date :</b>&nbsp;
                </div>
                <div className="col-8">
                  <p>{editValues?.start_date}</p>
                </div>
                <div className="col-4">
                  <b>Start Time :</b>&nbsp;
                </div>
                <div className="col-8">
                  <p>
                    {moment(startTime, "hh:mm").format("hh:mm A")}
                    {/* {editValues.event_type == "individual"
                      ? moment(editValues.start_time, "hh:mm").format("hh:mm A")
                      : get_date_with_user_time_zone(
                          editValues.start_date_time,
                          "hh:mm A"
                        )} */}
                  </p>
                </div>
                <div className="col-4">
                  <b>End Time :</b>&nbsp;
                </div>
                <div className="col-8">
                  <p>
                    {/* {moment(editValues?.end_time, "hh:mm").format("hh:mm A")} */}
                    {moment(editValues?.end_time, "hh:mm").format("hh:mm A")}
                    {/* {editValues.event_type == "individual"
                      ? moment(editValues.end_time, "hh:mm").format("hh:mm A")
                      : get_date_with_user_time_zone(
                          editValues.end_date_time,
                          "hh:mm A"
                        )} */}
                  </p>
                </div>
              </div>
              <p>{htmlDecode(editValues.description)}</p>
            </div>
            <div className="text-end">
              {editValues.status === true ? (
                <button className="small-contained-chip-success">Active</button>
              ) : (
                <button className="small-contained-chip-error">Inctive</button>
              )}
            </div>
          </div>
          {editValues.action_by == "consultant_user" && (
            <div className="affirmation-dots">
              <CustomPopover
                menu={MENU_OPTIONS}
                data={eventDetailData.event_slug}
              />
            </div>
          )}
          <CustomConfirmation
            open={openDelete}
            setOpen={setOpenDelete}
            title={"Are you sure you want to delete this Event?"}
            handleAgree={handleDelete}
          />
        </div>
      )}
    </>
  );
}
