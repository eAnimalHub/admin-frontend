import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import profileImg from "../../assets/images/profileImg.png";
import { useNavigate } from "react-router-dom";
import R from "../../assets/images/R.jpeg";
// import BillingCard from "../../components/Billing/BillingCard";

function Profile(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Profile</h2>
        </div>
      </div>
      <div className="mt-4 mb-4 d-flex justify-content-center">
        <div className="cards p-4">
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltJTIwYm95fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              height="100"
              width="100"
            />
          </div>
          <div className="row mt-5 ps-5 text-start">
            <div className="col-4">
              <p>
                <b>Name:</b>
              </p>
            </div>
            <div className="col-8">
              <p>Sajjad Yousaf</p>
            </div>
            <div className="col-4">
              <p>
                <b>Email:</b>
              </p>
            </div>
            <div className="col-8">
              <p>dlx@gmail.com</p>
            </div>
            <div className="col-4">
              <p>
                <b>Phone:</b>
              </p>
            </div>
            <div className="col-8">
              <p>1234567890</p>
            </div>
            <div className="col-4">
              <p>
                <b>Associate:</b>
              </p>
            </div>
            <div className="col-8">
              <p>Sajjad Yousaf</p>
            </div>
            <div className="col-4">
              <p>
                <b>Country:</b>
              </p>
            </div>
            <div className="col-8">
              <p>Pakistan</p>
            </div>
            <div className="col-4">
              <p>
                <b>Address:</b>
              </p>
            </div>
            <div className="col-8">
              <p>Sahiwal saeed center</p>
            </div>
            <div className="col-4">
              <p>
                <b>State:</b>
              </p>
            </div>
            <div className="col-8">
              <p>Sahiwal</p>
            </div>
            <div className="col-4">
              <p>
                <b>Timezone:</b>
              </p>
            </div>
            <div className="col-8">
              <p>US</p>
            </div>
            <div className="col-4">
              <p>
                <b>Area Code:</b>
              </p>
            </div>
            <div className="col-8">
              <p>57000</p>
            </div>
            <div className="col-4">
              <p>
                <b>Biography:</b>
              </p>
            </div>
            <div className="col-8">
              <p>
                This is DLX from sahiwal saeed center 1st floor how can we help
                you .
              </p>
            </div>
          </div>

          <div className="mt-2 text-center">
            <button
              onClick={handlePage}
              className="btn1 small-contained-button"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      {/* <BillingCard /> */}
    </div>
  );
}

export default Profile;
