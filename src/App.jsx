import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import GuestPage from "./pages/GuestPage";
import ProfileSetting from "./pages/SettingPage";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import EventPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEventPage";
import "./assets/App.css";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("UserID"); // Kiểm tra xem userid có trong localStorage hay không

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/setting" element={<ProfileSetting />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/mainpage/event/:id" element={<EventPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/createvent" element={<CreateEvent />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
