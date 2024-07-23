import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import MainPage from './MainPage';
import LoginForm from './LoginForm';
import CreateEvent from './CreateEvent';
import AboutUs from './AboutUs';
import Profile from './Profile';
import ParticipantEventPage from './ParticipantEventPage';
import './App.css'

function App() {

  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<MainPage/>} /> 
          <Route path = "/profile" element = {<Profile/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />}
        </Routes>
      </Router> */}
      <ParticipantEventPage/>
    </>
  )
}

export default App
