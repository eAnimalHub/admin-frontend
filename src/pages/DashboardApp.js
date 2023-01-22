// material
import { Box, Grid, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { dashboardDataApi } from "src/DAL/Dashboard/DashboardApi";
import { useContentSetting } from "src/Hooks/ContentSettingState";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";
import Calenders from "./Calender/CalendarEvents";
import DashboardCalender from "./Calender/CalendarEventsDashboard";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [dashboardData, setDashboardData] = useState();

  const getDashboard = async () => {
    const result = await dashboardDataApi();
    if (result.code == 200) {
      setDashboardData(result.data);
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <>
      <Page title="Animal Hub">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales customer={dashboardData?.customers} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers ads={dashboardData?.ads_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders category={dashboardData?.categories} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports breeds={dashboardData?.breeds} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
