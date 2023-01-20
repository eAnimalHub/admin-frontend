import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";
import { styled, StyledEngineProvider } from "@mui/material/styles";
import Affirmationlayout from "../../components/AffirmationLayout";
import Pods from "src/components/Pods/Pods";

function Affirmations(props) {
  const navigate = useNavigate();

  const handlePage = () => {};

  const handleChange = () => {
    navigate("/affirmations/affirmationList");
  };
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920103619_--img-neil.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.",
      title: "Category 1",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920115240_--Layer_1_(3).png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.",
      title: "Category 1",
    },
  ];
  return (
    <>
      {/* <ProgrammesCard /> */}
      {/* <Pods data={itemData} /> */}

      <div className="container">
        <div className="row">
          <div className="col-6">
            <h2 className="quotes-heading">Affirmation</h2>
          </div>
          <div className="col-6">
            <button
              className="small-contained-button float-end me-3"
              onClick={handlePage}
            >
              ADD CATEGORY
            </button>
          </div>
        </div>
        <div className="row padding-screen pt-2">
          {itemData.map((value, index) => {
            return (
              <>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div
                    className="card shadow-lg cursor  h-100  pods-image pods-cards-shadow"
                    onClick={handleChange}
                  >
                    <img
                      src={value.img}
                      className="card-img-top pods-image"
                      alt="Affirmation"
                    />
                    <div className="card-body">
                      <h3 className="card-title h2-heading">{value.title}</h3>
                      <p className="programme-card-desc mb-3">
                        {value.description}
                      </p>
                      <div className="card-button">
                        <p className="pods-active-members">
                          <span>{value.activeMembers}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* <Affirmationlayout data={itemData} /> */}
    </>
  );
}

export default Affirmations;
