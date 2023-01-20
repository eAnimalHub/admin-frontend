import React, { useState } from "react";
import { useFormik } from "formik";
import { Container, ButtonGroup, Button } from "@mui/material";
import { VaultFilterSidebar } from "../../components/_dashboard/vault";

function Vault(props) {
  const [openFilter, setOpenFilter] = useState(false);

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

  return (
    <Container>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <h2>Vault</h2>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <VaultFilterSidebar
            formik={formik}
            isOpenFilter={openFilter}
            onResetFilter={handleResetFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
        </div>
      </div>

      <div className="row section-space">
        <div className="col-12">
          <h3 className="programmes-heading">
            Chapter 3 - Power of Assumption - Part 2
          </h3>
        </div>
      </div>
      <div className="row media-margin">
        <div className="col-12">
          <video width="100%" controls>
            <source src="https://vimeo.com/226053498" type="video/mp4" />
            <track
              src="captions_en.vtt"
              kind="captions"
              srcLang="en"
              label="english_captions"
            />
          </video>
        </div>

        <div className="col-12 mt-3 text-center">
          <div>
            <audio className="w-100" controls>
              <source
                src="https://gaana.com/song/dance-meri-rani-1"
                type="audio/mp3"
              />
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
            </audio>
          </div>
        </div>
        <div className="col-12 section-space">
          <p>
            The Calm & Creative Collection focuses on the root cause; the
            subconscious mind. It will raise your level of awareness and
            understanding, which will dramatically transform your life. These
            tools will give you the knowledge and the exact process you need to
            apply it to your life. You’ll finally be able to take control and
            create what you desire. It is for anyone who wants calmness and
            serenity in their life, and it’s perfect for people that crave
            clarity and direction and are ready to uplevel their thinking and
            results.
          </p>
        </div>
        <div className="col-3">
          <button className="vault-category">Creative Collections</button>
        </div>
      </div>
    </Container>
  );
}

export default Vault;
