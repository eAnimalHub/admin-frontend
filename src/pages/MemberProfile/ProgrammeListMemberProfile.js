import { useFormik } from "formik";
import { useEffect, useState } from "react";
// material
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../../components/Page";
import {
  ProgrammesSort,
  ProgrammesList,
  ProgrammesCartWidget,
  ProgrammesFilterSidebar,
  ProgrammesCard,
} from "../../components/_dashboard/programmes";
//
import PRODUCTS from "../../_mocks_/products";
// import { programmeListing } from "src/DAL/Programme/Programme";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { s3baseUrl } from "src/config/config";
import { htmlDecode } from "src/utils/convertHtml";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------
const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export default function ProgrammeListMemberProfile({ programmes }) {
  console.log(programmes, "programmesprogrammesprogrammes");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [program, setProgram] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const { resetForm, handleSubmit } = formik;
  const programsList = async () => {
    const result = await "";
    console.log(result, "kkkkkkkkkkk");
    if (result.code == 200) {
      setIsLoading(false);
      setProgram(result.program);
    } else {
      setIsLoading(false);
      // enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  const handleNavigateDetail = (value) => {
    console.log(value._id.program_slug, "valueeeee");
    navigate(`/programmes/programmes-detail/${value._id.program_slug}`, {
      state: { detailValues: value },
    });
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  useEffect(() => {
    programsList();
  }, []);
  if (isLoading === true) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-sm-12">
          <h2>Programme </h2>
        </div>
        <div className="col-lg-5 col-sm-12 text-end">
          {/* <button
            onClick={() => navigate(`/programmes/add-programme`)}
            className="small-contained-button"
          >
            Add Programme
          </button> */}
        </div>
        {programmes?.map((value, index) => {
          return (
            <>
              <div className="col-lg-4 col-md-4 col-sm-12 mb-4" key={index}>
                <div className="card mt-4 pods-cards-shadow cursor h-100">
                  <img
                    src={s3baseUrl + value._id.program_images?.thumbnail_1}
                    className="card-img-top pods-image"
                    alt="Programme"
                    // onClick={() => handleNavigateDetail(value)}
                  />
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <h3
                          className="h2-heading"
                          onClick={() => handleNavigateDetail(value)}
                        >
                          {htmlDecode(value._id.title)}
                        </h3>
                      </div>

                      <div className="col-2 menu-option">
                        {/* <CustomPopover menu={MENU_OPTIONS} data={value} /> */}
                      </div>
                      {/* <CustomConfirmation
                        open={openDelete}
                        setOpen={setOpenDelete}
                        title={
                          "Are you sure you want to delete this recording?"
                        }
                        handleAgree={handleDelete}
                      /> */}
                    </div>
                    <p
                      className="programme-card-desc mb-3"
                      // onClick={() => handleNavigateDetail(value)}
                    >
                      {htmlDecode(value._id.short_description)}
                    </p>
                    {/* <p className="programme-card-desc mb-3 programme-card-desc-muted">
                      <b className="text-muted">Programme:</b>{" "}
                      {value.program.title}
                    </p> */}
                    {/* <div className="row recording-card-date">
                      <div className="col-4 card-button recording-card-date-position">
                        <p className="pods-active-members">
                          <span> {value.no_of_lesson} Lessons</span>
                        </p>
                      </div>
                      <div className="col-8 text-end ms-auto">
                        {value.total_lesson_duration}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          );
        })}
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
}
