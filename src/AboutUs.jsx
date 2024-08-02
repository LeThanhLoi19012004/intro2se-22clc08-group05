import React, {useState, useEffect} from 'react'
import logo from './assets/SukiWhite.svg'

import { Link } from 'react-router-dom'; // Import Link
import { useNavigate } from 'react-router-dom';



import './AboutUs.css'
function AbstractFigures(){
    return(
        <>
        <span className = "sign-up__abstract-container">
            
            <div className = "sign-up__gradient-smudge"></div>
            <div className = "sign-up__gradient-smudge"></div>
        </span>
        </>
    );
}
function AboutUs(){
    
    const navigate = useNavigate();
    return(
        <>
        <div className = "about-us__container">
            <header >
                <div className = "about-us__header-img-container">
                    <img src = {logo}/>
                </div>
                
                <nav className="about-us__navbar">
                    <ul className="about-us__navbar-list">
                        <li><a href = "" >Search</a></li>
                        <li><Link to ="/">Home</Link></li>
                        <li><Link to = "/aboutus">About</Link></li>
                        <li><Link to = "/login">Login</Link></li>
                        <li><Link to = "/signup">Sign Up</Link></li>
                    </ul>
                </nav>

            </header>
            <div className = "about-us__card">
                <p className = "title">About Us</p>
                <div className = "about-us__story-container">
                <div className = "about-us__logo-container">
                    <img src = {logo}/>
                </div>
                <div className = "about-us__story-text">
                <span>The Story</span>
<p className = "p-1">Suki Event Management Platform was created out of a passion for creating unforgettable experiences and simplifying the event planning process. We believe everyone should have access to events, regardless of their planning experience.</p>
<p className = "p-2">We handmade Suki, a user-friendly event management platform designed with you in mind. Whether you're an event organizer bringing your vision to life, or an attendee seeking incredible experiences, Suki always empowers you.</p>
                </div>
            </div>
            <div className = "about-us__team-container">
                <div className = "about-us__team-text">
                <span>The Team</span>
<p className = "p-1">We are EVE, the fifth group in our university class, 22CLC08. This is a project created by us for our Course of Introduction to Software Engineering. Throughout this project, we have learned a lot of new concepts and ideas, and we are confident to bring this website to life.</p>
<p className = "p-2">Our team consists of five people: Lâm Tiến Huy, Lê Thành Lợi, Trịnh Quốc Hiệp, Nguyễn Trọng Nhân, and Kha Vĩnh Thuận. Each person in our team is very committed to this project, to perfect this product for all of you. </p>
                </div>
                <div className = "about-us__team-img-container">
                    <img src = {""}/>
                </div>
            </div>
            </div>
            
        </div>
        </>
    );
}

export default AboutUs;