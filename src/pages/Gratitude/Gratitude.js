import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { styled, StyledEngineProvider } from "@mui/material/styles";
import PinterestLayout from "src/components/PinterestLayout/Pinterest";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Gratitude() {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate("/gratitude/addgratitude");
  };
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/general_gratitude/20211005141540_--1604474605.8_tress.jpg",
      description:
        "Today more than any I am grateful to be alive. What lies ahead of me today excites me so much.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/general_gratitude/20211005141800_--1604437586.24_image7.png",
      description:
        "I am so powerful with my thoughts life is one big game and the more I play the more I win.What FUN LIFE IS for me.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/general_gratitude/20211005142000_--1604437039.04_image4.png",
      description: "I am so happy and grateful for this amazing day.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/general_gratitude/20211005141903_--1604437856_image8.png",
      description:
        "Today I am so bloody grateful for Bebe she is just one Amazing human being.Thank you for the gift that she is.:))",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/general_gratitude/20211005141713_--1604437000.34_image5.png",
      description:
        "Today I achieved everything I wanted with such ease.Nothing is impossible",
    },
  ];
  return (
    <>
      <div className="container-fluid">
        <div className="row mobile-margin display-flex">
          <div className="col-12">
            <IconButton
              className="back-screen-button mb-4"
              onClick={() => handleNavigate()}
            >
              <ArrowBackIcon />
            </IconButton>
            <button
              className="small-contained-button float-end me-4"
              // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
            >
              Add Gratitude
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <h2 className="quotes-heading">Gratitude</h2>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2 className="quotes-heading">Gratitude</h2>
          </div>
          <div className="col-6">
            <button
              className="small-contained-button float-end me-3"
              onClick={handleChange}
            >
              ADD GRATITUDE
            </button>
          </div>
        </div>
      </div> */}

      <PinterestLayout data={itemData} />

      {/* <div className="grid-container">
        {itemData.map((value, index) => {
          console.log(value, "data of map");
          return (
            <div>
              <img className="grid-item" src={value.img} alt="" />
              <p>{value.description}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
}

export default Gratitude;
