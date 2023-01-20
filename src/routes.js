import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  PrivateRouteWithLayout,
  // RouteWithLayout,
  PublicRouteWithLayout,
  // PrivateRouteWithLayout,
} from "./components";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import {
  ForgetPassword,
  Programmes,
  ProgrammesDetail,
  GoalStatement,
  Vault,
  Profile,
  Pods,
  Affirmations,
  Gratitude,
  Quotes,
  Memories,
  MemoriesDetails,
  DailyActivities,
  Calender,
  LessonsDetail,
  LessonListing,
  ProgrammRecordingDetail,
  AffirmationList,
} from "./pages/index";
import LessonsReSource from "./pages/lessonsResource/LessonsResource";
import ReviewCards from "./pages/ReviewCard/ReviewCards";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import AddGratitude from "./pages/Gratitude/AddGratitude";
import MemoriesDetail from "./pages/Memories/MemoriesDetail";
import SourcesFiles from "./pages/SourceCard/SourcesFiles";
import BobVideos from "./pages/BOBVideos/BobVideos";
import LessonsNotes from "./components/LessonNotes/LessonsNotes";
import LessonsRecording from "./pages/LessonsRecording";
import AddProgram from "./pages/Programmes/AddProgram";
import Addlesson from "./pages/Programmes/AddLesson";
import AddProgramReview from "./pages/ReviewCard/AddProgramReview";
import AddDocument from "./pages/SourceCard/AddDocument";
import EditProgram from "./pages/Programmes/EditProgram";
import AddLessonsDoc from "./pages/Programmes/AddLessonsDoc";
import AddLessonsRecording from "./pages/Programmes/AddLessonRecording";
import DeleteProgram from "./components/_dashboard/programmes/Deleteprogram";
import EditLesson from "./pages/Programmes/EditLesson";
import EditProgramReview from "./pages/ReviewCard/EditReview";
import EditProgramDocument from "./pages/SourceCard/EditProgramDocument";
import Members from "./pages/Member/Members";
import Rooms from "./pages/Room/Rooms";
import AddRooms from "./pages/Room/AddRooms";
import RecordingsList from "./pages/Recordings/RecordingsList";
import AddQuestions from "./pages/GoalStatement/AddQuestions";
import EditQuestions from "./pages/GoalStatement/EditQuestion";
import AddRecording from "./pages/Recordings/AddRecording";
import EditRoom from "./pages/Room/EditRoom";
import EditMember from "./pages/Member/EditMembers";
import EditRecording from "./pages/Recordings/EditRecording";
import EditProfile from "./pages/Profile/EditProfile";
import Calenders from "./pages/Calender/CalendarEvents";
import RecordingDetails from "./pages/Recordings/RecordingDetail";
import RoomDetail from "./pages/Room/DetailRoom";
import Groups from "./pages/Groups/Groups";
import AddGroups from "./pages/Groups/AddGroup";
import EditGroups from "./pages/Groups/EditGroup";
import GroupDetail from "./pages/Groups/DetailGroup";
import DetailQuestion from "./pages/GoalStatement/DetailQuestion";
import ListEvents from "./pages/Calender/ListEvents";
import EventDetailList from "./pages/Calender/EventDetailList";
import SupportTicket from "./pages/SupportTicket/SupportTicket";
import SupportTicketDetail from "./pages/SupportTicket/SupportTicketDetail";
import Community from "./pages/Community/Community";
import MemberGoalStatement from "./pages/GoalStatementMembers";
import MemberGoalstatementList from "./pages/MemberGoalStatement/MemberGoalstatementList";
import { AnswerHistory } from "./pages/MemberGoalStatement/AnswerHistory";
import { QuestionsReply } from "./pages/MemberGoalStatement/QuestionsReply";
import MemberProfile from "./pages/MemberProfile/MemberProfile";
import MemberGroupsList from "./pages/MemberProfile/MembersGroupList";
import MemberPersonalNote from "./pages/MemberProfile/MemberPersonalNote";
import ChartJs from "./pages/MemberProfile/Chart";
import Todo from "./pages/MemberProfile/Todo";
import RecordingCards from "./pages/Recordings/RecordingCard";
import YachtList from "./pages/Breed/BreedList";
import AddYacht from "./pages/Breed/AddBreed";
import BreedList from "./pages/Breed/BreedList";
import AddBreed from "./pages/Breed/AddBreed";
import AnimalCategoryList from "./pages/AnimalCategory/AnimalCategoryList";
import AddAnimalCategory from "./pages/AnimalCategory/AddCategory";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsAndCondition } from "./components/TermsAndCondition";
import { AboutUs } from "./components/AboutUs";
import ReportList from "./pages/Report/ReportList";
import ReportingList from "./pages/Report/ReportingList";

// ----------------------------------------------------------------------
const Authentication = () => {
  <Navigate to="/dashboard"> </Navigate>;

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login"> </Navigate>;
  } else {
  }
};
export default function Router() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<DashboardApp />} />
        <Route path="/breed" element={<BreedList />} />
        <Route path="/breed/add-breed" element={<AddBreed />} />
        <Route path="/breed/edit-breed/:id" element={<AddBreed />} />
        <Route path="/categories" element={<AnimalCategoryList />} />
        <Route
          path="/categories/add-category"
          element={<AddAnimalCategory />}
        />
        <Route
          path="/categories/edit-category/:id"
          element={<AddAnimalCategory />}
        />
        <Route path="/breed/add-breed" element={<AddBreed />} />
        <Route path="/Editprofile" element={<EditProfile />} />
        <Route path="/report" element={<ReportingList />} />
      </Route>
      <Route element={<LogoOnlyLayout />}>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/" element={<Authentication />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="404" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <PublicRouteWithLayout component={Login} exact layout={LogoOnlyLayout} path="/login" />
      <PublicRouteWithLayout component={Register} exact layout={LogoOnlyLayout} path="/register" /> */}
      {/* --------------------------------------- Dashboard --------------------------------------- */}
      {/* <PrivateRouteWithLayout
        component={DashboardApp}
        exact
        layout={DashboardLayout}
        path="/dashboard/app"
      /> */}
      {/* --------------------------------------- Change Password --------------------------------------- */}
      {/* <PrivateRouteWithLayout
        component={Products}
        exact
        layout={DashboardLayout}
        path="/dashboard/products"
      /> */}
    </Routes>
  );
}
