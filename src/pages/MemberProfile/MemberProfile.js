import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { s3baseUrl } from "src/config/config";
import Label from "src/components/Label";
import ProgrammeListMemberProfile from "./ProgrammeListMemberProfile";
// import { memberDetailApi, memberPodsListing } from "src/DAL/member/member";
import PodsListMemberProfile from "./PodsListMemberProfile";
import { useSnackbar } from "notistack";
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RecordNotFound from "src/components/RecordNotFound";
import MemberCalenders from "./MemberEventCalendar";
import { dummyImage } from "src/assets";
import { memberDetailApi } from "src/DAL/member/Member";

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

const MemberProfile = () => {
  const params = useLocation();
  const member_id = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  console.log(params, "params for Data");
  const navigate = useNavigate();
  const [pods, setPods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsList, setEventList] = useState([]);
  const [memberDetail, setMemberDetail] = useState();
  const [data, setData] = useState();

  const podsList = async () => {
    const result = await member_id.id;
    if (result.code == 200) {
      setIsLoading(false);
      setPods(result.rooms);
      console.log(
        result.rooms,
        "member_idmember_idmember_idmember_idmember_id"
      );
    } else {
      setIsLoading(false);
      // enqueueSnackbar(result.message, { variant: "error" });
    }
  };
  const memberDetailInfo = async () => {
    const result = await memberDetailApi(member_id.id);
    if (result.code == 200) {
      console.log(result, "membermember");
      setEventList(result.event);
      setPods(result.rooms);
      setMemberDetail(result.member);
      setData(result);
    } else {
    }
  };

  const handleGroupNavigate = () => {
    console.log(member_id, "handleGroupNavigate");
    navigate(`/members/groups/${member_id.id}`);
  };
  const handleNotesNavigate = () => {
    navigate(`/members/personal_note/${member_id.id}`, {
      state: memberDetail,
    });
  };
  console.log(memberDetail, "memberDetailmemberDetail");
  const handleGoalStatementNavigate = () => {
    console.log(member_id, "handleGroupNavigate");
    // navigate(`/members/goalstatement/${member_id.id}`);
  };
  const handleToDo = () => {
    console.log(member_id, "handleGroupNavigate");
    navigate(`/members/to-do/${member_id.id}`, {
      state: data,
    });
  };

  const {
    city,
    contact_number,
    email,
    first_payment_date,
    goal,
    id,
    lastName,
    member_biography,
    name,
    profile_image,
    programs,
    selectedCountry,
    state,
    status,
    street,
    time_zone,
    zip_code,
  } = params.state;
  console.log(params.state, "params.stateparams.stateparams.state");

  useEffect(() => {
    podsList();
    memberDetailInfo();
  }, []);
  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  console.log(programs, "programprogramprogram");
  console.log(pods, "programprogramprogram");
  return (
    <div className="container">
      <div className="col-12">
        <IconButton
          className="back-screen-button mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
        {/* <button
            className="small-contained-button float-end mt-1"
            onClick={() => navigate(`/programmes/addreview/`)}
          >
            Add Programme Review
          </button> */}
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <h2>Member Profile</h2>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-3 member-profile-image text-center mb-5">
          <img
            className="rounded-circle ms-auto me-auto"
            height="200px"
            width="200px"
            src={
              profile_image === undefined || profile_image === ""
                ? dummyImage
                : s3baseUrl + profile_image
            }
          />
        </div>
        <div className="col-sm-12 col-md-4 col-lg-3 text-start d-flex mb-5">
          <div className="ms-auto me-auto text-left">
            {/* <h3>{name}</h3> */}
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => handleGroupNavigate()}
            >
              View Groups
            </Button>
            <br />
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => handleNotesNavigate()}
            >
              View Client Notes
            </Button>{" "}
            <br />
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => handleGoalStatementNavigate()}
            >
              View GoalStatement
            </Button>{" "}
            <br />
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => handleToDo()}
            >
              To Do Tracker
            </Button>{" "}
            <br />
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-6">
          <div className="row d-flex">
            <div className="col-6 text-center">
              <h6 className="mb-3">
                <b>Name:</b>
              </h6>
              <h6 className="mb-3">
                <b>Status:</b>
              </h6>

              <h6 className="mb-3">
                <b>Email:</b>
              </h6>
              <h6 className="mb-3">
                <b>Address:</b>
              </h6>
            </div>
            <div className="col-6">
              <h6 className="mb-3">{name}</h6>
              <h6 className="mb-3">
                <Label
                  variant="ghost"
                  color={status === false ? "error" : "success"}
                >
                  {status === false ? "InActive" : "Active"}
                </Label>
              </h6>
              {/* <h6 className="mb-3">{contact_number}</h6> */}
              <h6 className="mb-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: email,
                  }}
                ></div>
              </h6>
              <h6 className="mb-3">{street}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <MemberCalenders memberId={member_id.id} data={data} />
        </div>
        <div className="col-12">
          {programs?.length < 1 ? (
            <>
              <h2>Programmes</h2>
              <RecordNotFound title="Programmes" />
            </>
          ) : (
            <ProgrammeListMemberProfile programmes={programs} />
          )}
        </div>
        <div className="col-12">
          {pods?.length < 1 ? (
            <>
              <h2>Pods</h2>
              <RecordNotFound title="Pods" />
            </>
          ) : (
            <PodsListMemberProfile pods={pods} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
