import React from "react";
import { useNavigate } from "react-router-dom";

function AboutSection(props) {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/edit-profile`);
  };
  return (
    <>
      <div className="profile-cards p-3">
        <h4>About</h4>
        <p className="date-color">
          Tart I love sugar plum I love oat cake. Sweet ⭐️ roll caramels I love
          jujubes. Topping cake wafer.
        </p>
        <h4>Joined</h4>
        <p className="date-color">November 15, 2015</p>
        <h4>Lives</h4>
        <p className="date-color">Irland</p>
        <h4>Email</h4>
        <p className="date-color">dlx@dlx.org</p>
        <h4>Website</h4>
        <p className="date-color">www.dlx.com</p>
      </div>
    </>
  );
}

export default AboutSection;
