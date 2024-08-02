import React, {useState,useRef, useEffect} from "react";
import "./ParticipantEventPage.css";
import sukiLogo from './assets/SukiWhite.svg';
import { FaBell } from "react-icons/fa";
import { FaTicketAlt} from "react-icons/fa";

function ParticipantEventPage(){

    return(
        <>
            <div className = "participant-event-page__container">
                <header>
                    <div className = "participant-event-page__logo-container">
                        <img src = {sukiLogo} />
                    </div>
                    <p className = "suki-word">SUKI</p>
                    <input placeholder="Search" className = "participant-event-page__search-bar"/>
                    <div className = "participant-event-page__navbar">
                        <ul>
                            <li><a href = "" ><FaBell size = {35} color = "white"  />   </a></li>
                            <li><a href = "" ><FaTicketAlt size = {35} color = "white"/> </a></li>
                        </ul>
                    </div>
                    <div className = "participant-event-page__profile-container">
                        <img src = {""} /> 
                    </div> 
                    <p className = "user-word">User</p>
                </header>
                <div className = "participant-event-page__cover-photo"> 
                    
                </div>
                <div className = "participant-event-data-field">
                <div className = "participant-event-page__info-bar">
                    <div className = "avatar-container">
                        <img src = ""/>
                    </div>
                    <p className = "event-name"><span>Event Name</span></p>
                    <p className = "description">This is a sample description of the event. This is a sample description of the event</p>
                    <button className = "follow-button">FOLLOW</button>
                    <div className = "follower-box">
                        <div className = "tag">
                            <p><span>10000</span></p>
                            <p>Followers</p>
                        </div>
                        <div className = "tag">
                            <p><span>10000</span></p>
                            <p>Tickets</p>
                        </div>
                    </div>
                    <div className = "follower-box">
                        <div className  = "tag">
                            <p><span>10000</span></p>
                            <p>Tickets Left</p>
                        </div>
                    </div>
                    <div className = "info-box">
                        <p><span className = "label">Date:</span> dd/mm/yyyy</p>
                        <p><span className = "label">Time:</span> --:-- -- </p>
                        <p><span className = "label">Category:</span> Type</p>
                        <p><span className = "label">Location:</span> Detailed Location</p>
                    </div>
                    <div className = "rule-section">
                        <p>Rules</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                        <p>Rule1: Fill rule here</p>
                        <p>Rule2: Fill rule here</p>
                    </div>
                </div>
                <div className = "participant-event-page__post-section">
                    <div className="post">Post 1</div>
                    <div className="post">Post 2</div>
                    <div className="post">Post 3</div>
                    <div className="post">Post 4</div>
                    <div className="post">Post 5</div>
                    <div className="post">Post 6</div>
                    <div className="post">Post 7</div>
                    <div className="post">Post 1</div>
                    <div className="post">Post 2</div>
                    <div className="post">Post 3</div>
                    <div className="post">Post 4</div>
                    <div className="post">Post 5</div>
                    <div className="post">Post 6</div>
                    <div className="post">Post 7</div>
                </div>
            </div>

            </div>
        </>
    );
};
export default ParticipantEventPage;