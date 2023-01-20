import PropTypes from "prop-types";
import React from "react";
import { Icon } from "@iconify/react";
import { Form, FormikProvider } from "formik";
import closeFill from "@iconify/icons-eva/close-fill";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import {
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
//
import Scrollbar from "../Scrollbar";
import { s3baseUrl } from "src/config/config";
// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

// ----------------------------------------------------------------------

CustomDrawer.propTypes = {
  isOpenDrawer: PropTypes.bool,
  onResetDrawer: PropTypes.func,
  onOpenDrawer: PropTypes.func,
  onCloseDrawer: PropTypes.func,
};

export default function CustomDrawer({
  isOpenDrawer,
  onOpenDrawer,
  onCloseDrawer,
  setIsLoading,
  componentToPassDown,
  pageTitle,
  test,
  data,
}) {
  return (
    <>
      <FormikProvider>
        <Drawer
          className="forms-drawer event-title"
          anchor="right"
          open={isOpenDrawer}
          onClose={onCloseDrawer}
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
            <Typography
              className="event-title d-flex"
              variant="h6"
              sx={{ ml: 1 }}
            >
              {pageTitle}
            </Typography>
            <Typography
              className="event-title d-flex"
              variant="p"
              sx={{ ml: 0 }}
            >
              {data?.comment?.map((member) => {
                return (
                  <>
                    {/* <Avatar
                        alt={member?.member?.first_name}
                        src={s3baseUrl + member?.member?.profile_image}
                      /> */}

                    {member?.member?.first_name +
                      " " +
                      member?.member?.last_name}
                  </>
                );
              })}
            </Typography>
            <IconButton onClick={onCloseDrawer}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>
          <Divider />
          <Scrollbar>
            <div className="responce-messages">{componentToPassDown}</div>
          </Scrollbar>
        </Drawer>
      </FormikProvider>
    </>
  );
}
