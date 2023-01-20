import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import useNavigate from "react-router";
import { useNavigate } from "react-router";
import User from "../User";
import RoomCard from "./RoomCard";

const columns = [
  { id: "uid", label: "#", minWidth: 50 },
  { id: "name", label: "title", minWidth: 170 },
  { id: "image", label: "image", minWidth: 170 },
  { id: "zoomLink", label: "Zoom Link", minWidth: 80 },

  {
    id: "password",
    label: "Password",
    minWidth: 170,
    align: "right",
  },
  {
    id: "order",
    label: "Order",
    minWidth: 100,
    align: "right",
  },
  {
    id: "status",
    label: "status",
    minWidth: 100,
    align: "right",
  },
];

const rows = [
  {
    uid: 1,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 2,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 3,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 4,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 5,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 6,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 7,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 8,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 9,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
  {
    uid: 10,
    name: "zubair",
    image: "image link here",
    zoomLink: "Zubair",
    password: "TIR, TIR",
    status: "true",
    order: "1",
  },
];

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const addRooms = () => {
    navigate(`/addroom`);
  };

  return (
    <>
      {/* <User /> */}
      <RoomCard />
    </>
  );
}
