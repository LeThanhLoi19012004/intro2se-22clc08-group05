// <<<<<<< 22127306_NguyễnTrọngNhân
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import GuestPage from './pages/GuestPage';
import ProfileSetting from './pages/SettingPage';
import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import EventPage from './pages/EventPage';
import CreateEvent from './pages/CreateEventPage';
import './assets/App.css'
function App() {

  if (!localStorage.getItem("username")) {
    localStorage.setItem("username", "#") // Set default value for UserID
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestPage />} />
        <Route path="/setting" element={<ProfileSetting />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/mainpage/event/:id" element={<EventPage />} />
        <Route path="/createvent" element={<CreateEvent />} />
      </Routes>
    </Router>
  ); 
}
export default App;
// =======
// import { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignUpForm from './SignUpForm';
// import MainPage from './MainPage';
// import LoginForm from './LoginForm';
// import CreateEvent from './CreateEvent';
// import AboutUs from './AboutUs';
// import Profile from './Profile';
// import ParticipantEventPage from './ParticipantEventPage';
// import './App.css'

// function App() {

//   return (
//     <>
//       {/* <Router>
//         <Routes>
//           <Route path="/" element={<MainPage/>} /> 
//           <Route path = "/profile" element = {<Profile/>} />
//           <Route path="/aboutus" element={<AboutUs/>} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/signup" element={<SignUpForm />} />}
//         </Routes>
//       </Router> */}
//       <ParticipantEventPage/>
//     </>
//   )
// }

// export default App
// >>>>>>> 22127108_TrịnhQuốcHiệp
