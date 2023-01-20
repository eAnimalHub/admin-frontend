import PropTypes from "prop-types";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Form, FormikProvider } from "formik";
import closeFill from "@iconify/icons-eva/close-fill";
import roundClearAll from "@iconify/icons-ic/round-clear-all";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
//
import Scrollbar from "../../Scrollbar";
import ColorManyPicker from "../../ColorManyPicker";

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];
export const FILTER_PROGRAMM_OPTIONS = [
  "Thinking into Result",
  "Calm & Creative Collection",
  "The Freedom Series",
];
export const FILTER_CATEGORY_OPTIONS = [
  "90 Day Plan",
  "Tuesday Call Replays",
  "Ignite Tuesday Morning Calls",
  "Bussiness 101 Mastermind",
];

// ----------------------------------------------------------------------

VaultFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
};

export default function VaultFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik,
}) {
  const { values, getFieldProps, handleChange } = formik;

  return (
    <>
      <Button
        disableRipple
        sx={{ float: "right" }}
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: "none", overflow: "hidden" },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="h6" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    Programme
                  </Typography>
                  <FormGroup>
                    {FILTER_PROGRAMM_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            {...getFieldProps("gender")}
                            value={item}
                            checked={values.gender.includes(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>

                <div>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    Category
                  </Typography>
                  <FormGroup>
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            {...getFieldProps("gender")}
                            value={item}
                            // checked={values.gender.includes(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
              </Stack>
            </Scrollbar>

            <Box sx={{ pl: 3, pr: 3, pt: 2 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: 5 }}
                  >
                    <path
                      d="M13.1165 0.25H0.883548C0.321452 0.25 0.0378205 0.932013 0.436097 1.33029L5.3125 6.20743V11.6406C5.3125 11.8471 5.41325 12.0406 5.58242 12.1591L7.69179 13.6351C8.10794 13.9264 8.6875 13.6312 8.6875 13.1167V6.20743L13.564 1.33029C13.9615 0.932804 13.6798 0.25 13.1165 0.25Z"
                      fill="#1a93a9"
                    />
                  </svg>
                }
              >
                Filter
              </Button>
            </Box>
            <Box sx={{ pl: 3, pr: 3, pt: 3, pb: 1 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
