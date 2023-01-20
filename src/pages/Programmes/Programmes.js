import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// material
import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// components
import { ProgrammesList } from "../../components/_dashboard/programmes";
//
import { programmesListing } from "../../DAL/Programmes/Programmes";

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: "50%",
    marginTop: "20%",
  },
}));

export default function Programmes() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [programmesData, setProgrammesData] = useState([]);

  const handlePage = () => {
    navigate(`/programmes/addProgram`);
  };

  const getProgrammesList = async () => {
    const result = await programmesListing();
    if (result.code === 200) {
      console.log(result, "result");
      setProgrammesData(result.program);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProgrammesList();
  }, []);

  if (isLoading) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  return (
    // <Page title="Dashboard: Products | Minimal-UI">
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2 className="">Programmes</h2>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <button
            className="small-contained-button float-end me-3"
            onClick={handlePage}
          >
            Add New Programme
          </button>
        </div>
      </div>

      {/* <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProgrammesFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProgrammesSort />
          </Stack>
        </Stack> */}

      <ProgrammesList programmes={programmesData} />
      {/* <ProgrammesCartWidget /> */}
    </div>
    // </Page>
  );
}
