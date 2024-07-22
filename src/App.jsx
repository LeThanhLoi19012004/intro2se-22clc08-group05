import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import SignUpPage from './pages/SignUpPage';
//import GuestPage from './pages/GuestPage';
 //import LogInPage from './pages/LogInPage';
// import ProfileSetting from './pages/SettingPage';
import MainPage from './pages/MainPage';
// import FullPostPage from './pages/FullPostPage';
// import ErrorPage from './pages/ErrorPage';
import EventPage from './pages/EventPage';
import './assets/App.css'
function App() {

  if (!localStorage.getItem("user:id")) {
    localStorage.setItem("UserID", "#") // Set default value for UserID
  }

  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<GuestPage />} />
  //       <Route path="/signup" element={<SignUpForm />} />
  //       <Route path="/login" element={<LogInPage />} />
  //       <Route path="/setting" element={<ProfileSetting />} />
  //       <Route path="/mainpage" element={<MainPage />} />
  //       <Route path="/mainpage/fullpost:id" element={<FullPostPage />} />
  //       <Route path="*" element={<ErrorPage />} />
  //     </Routes>
  //   </Router>
  // ); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/event:id" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;