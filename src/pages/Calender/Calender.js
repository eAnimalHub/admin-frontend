import { Container, Button } from "@mui/material";
import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

function Calender(props) {
  const [events, setEvents] = useState([
    {
      title: "PGI Event 1",
      date: "2022-01-05",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/2011_Range_Rover_--_12-31-2010.jpg/1200px-2011_Range_Rover_--_12-31-2010.jpg",
    },
    {
      title: "PGI Event 2",
      date: "2022-01-13",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-TcbGreWd3jFhB8JJrB5MCHD_1YL6AmUxg&usqp=CAU",
    },
    {
      title: "PGI Event 3",
      date: "2022-01-15",
      img: "https://www.constructionweekonline.com/cloud/2021/07/07/img-worlds-of-adventure.jpg",
    },
  ]);
  const [imgUrl, setimgUrl] = React.useState("");
  const [isOpenImage, setisOpenImage] = React.useState(false);
  const [isOpen, setisOpen] = React.useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowImageDialog = (url) => {
    setisOpenImage(!isOpenImage);
    setisOpen(!isOpen);
    //console.log("url", url);
    setimgUrl(url);
  };
  const handleShowDialog = () => {
    setisOpen(!isOpen);
  };

  const handleCloseDialog = () => {
    setisOpen(false);
    setisOpenImage(false);
  };

  const renderEventContent = (eventInfo) => {
    //console.log(eventInfo.event);
    return (
      <div
        className="calender-events-box"
        onClick={() => console.log(eventInfo.event)}
      >
        {/* <img
          className="eventimage"
          src={eventInfo.event._def.extendedProps.img}
          onClick={() =>
            handleShowImageDialog(eventInfo.event._def.extendedProps.img)
          }
        /> */}

        <b className="calender-events-text">{eventInfo.event.title}</b>
      </div>
    );
  };

  return (
    <Container>
      <h2>Calender</h2>
      <div className="row">
        <div className="col-md-12" style={{ marginTop: 50 }}>
          <FullCalendar
            dateClick={() => console.log("click")}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "today prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            className="fc-day-sun fc-toolbar-chunk fc eventimage fc-col-header-cell-cushion fc-today-button fc-right fc-prev-button fc-right fc-next-button fc-dayGridMonth-button fc-timeGridWeek-button fc-timeGridDay-button fc-daygrid-day-number fc-daygrid-day-top"
            eventContent={renderEventContent}
            events={events}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
          />
        </div>
      </div>
    </Container>
  );
}

export default Calender;
