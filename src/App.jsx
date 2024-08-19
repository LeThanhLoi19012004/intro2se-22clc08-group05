import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import GuestPage from "./pages/GuestPage";
import ProfileSetting from "./pages/SettingPage";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import CreateEvent from "./pages/CreateEventPage";
import SearchPage from "./pages/SearchPage";
import "./assets/App.css";
import { Navigate, Outlet } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
import TicketEventPage from "./pages/TicketEventPage"
import AdminHomePage from "./pages/AdminHomePage";
import AdminReview from "./pages/AdminReview";
const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("UserID"); // Kiểm tra xem userid có trong localStorage hay không

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
  const isAdmin = !!localStorage.getItem("isAdmin");
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  // const rememberMe = localStorage.getItem("rememberme");
  // if (!rememberMe || rememberMe === "false") {
  //   localStorage.clear();
  // }
  return (
    <Router>
      <Routes>
      <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminHomePage />} />
        </Route>
        <Route element={<AdminRoute />}>
        <Route path="/admin/review" element={<AdminReview />} />
        </Route>
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/" element={<GuestPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/setting" element={<ProfileSetting />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/event" element={<TicketEventPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/createvent" element={<CreateEvent />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
