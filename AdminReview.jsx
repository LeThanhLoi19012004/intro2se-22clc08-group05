import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import sukiLogo from '../assets/SukiWhite.svg';
import "../assets/AdminReview.css";

import Ring1 from '../assets/Abstract Objects/Ellipse 9-1.svg';
import Ellipse1 from '../assets/Abstract Objects/Ellipse 7-3.svg';
import Polyline1 from '../assets/Abstract Objects/Vector 8.svg';
import Polygon1 from '../assets/Abstract Objects/Polygon 2.svg';

function AbstractFigures(){
    return(
        <div className = "admin-review__abstract-container">
            <div className="admin-review__top-left-gradient"/>
            <div className="admin-review__bottom-right-gradient"/>

            <img src={Ring1} className="admin-review__ring-1"/>
            <img src={Ellipse1} className="admin-review__ellipse-1"/>
            <img src={Polyline1} className="admin-review__polyline-1"/>
            <img src={Polygon1} className="admin-review__polygon-1"/>

        </div>
    );
}

function AdminReview() {
    const eventInputRef = useRef(null);
    const profileInputRef = useRef(null);
    const [eventImage, setEventImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [approveButtonText, setApproveButtonText] = useState("Approve Event");
    const [rejectButtonText, setRejectButtonText] = useState("Reject Event");
    const [isApproved, setIsApproved] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [activeButton, setActiveButton] = useState(null); // Manage which button is active

    
    const handleEventImageClick = () => {
        eventInputRef.current.click();
    };

    // const handleProfileImageClick = () => {
    //     profileInputRef.current.click();
    // };

    // const handleEventImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setEventImage(imageUrl);
    //         const imgContainer = document.getElementById('admin-review__img-container');
    //         imgContainer.style.backgroundColor = 'transparent'; // Set to transparent or any desired color
    //     }
    // };

    // const handleProfileImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setProfileImage(imageUrl);
    //     }
    // };

    const handleForm = (event) => {
        event.preventDefault();

        let form = event.target;
        let formData = new FormData(form);

        if (eventImage) {
            formData.append('eventImage', eventImage);
        }

        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        // Example form data logging
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    };

    const handleApprove = () => {
        setIsApproved(true);
        setIsRejected(false);
        setApproveButtonText("Event Approved!");
        setActiveButton("approve");
    };

    const handleReject = () => {
        setIsRejected(true);
        setIsApproved(false);
        setRejectButtonText("Event Rejected!");
        setActiveButton("reject");
    };

    return (
        <>
            <div className="admin-review__container">
                <AbstractFigures/>

                <form className="admin-review__form" onSubmit={handleForm}>
                    <div className="admin-review__header-bar">
                        <div>
                            <div className="admin-review__profile-container">
                                {profileImage ? (<img src={profileImage} alt="profile" />
                                ) : (<p></p>)}
                            </div>
                            <input
                                type="file"
                                ref={profileInputRef}
                                style={{ display: "none" }}
                                name="event-profile"
                            />
                            <p>Create Under <span>UserName</span></p>
                        </div>
                        <div className="admin-review__logo-container">
                            <img src={sukiLogo} />
                        </div>
                    </div>
                    <div id="event-name" className="data-field">Event Name</div>
                    <div className="admin-review__description-container">
                        <label htmlFor="description">Description</label>
                        <div className="data-field">Description</div>
                    </div>
                    <div className="admin-review__rules-container">
                        <label htmlFor="rules">Rules</label>
                        <div className="data-field">Rule</div>
                    </div>
                    <div className="admin-review__date-n-time-container">
                        <p>Date & Time</p>
                        <div>
                            <div className="data-field">Date</div>
                            <div className="data-field">Time</div>
                        </div>
                    </div>
                    <div className="admin-review__category-container">
                        <label htmlFor="category">Category</label>
                        <div className="data-field">Category</div>
                    </div>
                    <div className="admin-review__location-container">
                        <label htmlFor="location">Location</label>
                        <div className="data-field">Location</div>
                    </div>
                    <div className="admin-review__participant-container">
                        <label htmlFor="participant">Participants</label>
                        <div className="data-field">Participant</div>
                    </div>
                    <div className="admin-review__ticket-container">
                        <p>Tickets</p>
                        <div>
                            <div className="data-field">Quantity</div>
                            <div className="data-field">Type</div>
                            <div className="data-field">Price</div>
                        </div>
                    </div>
                    <div className="admin-review__logo">
                        <div className="img-container" id="admin-review__img-container">
                            {eventImage ? (<img src={eventImage} alt="Event" />
                            ) : (<p></p>)}
                        </div>
                        <input className ="inputref"
                            type="file"
                            ref={eventInputRef}
                            style={{ display: "none" }}
                            name="event-logo"
                            required
                        />
                        <div className="admin-review__upload-delete-container">
                            <button className="upload" id="upload" type="button">Upload</button>
                            <button className="delete" id="delete" type="button">Delete</button>
                        </div>
                    </div>
                    <div className="admin-review__comment-container">
                        <label htmlFor="comment">Administrator Comments</label>
                        <textarea
                            maxLength="250"
                            name="comment"
                            id="comment"
                            placeholder='if the administrators reject the event, they can show organizers why in this section, and how to make new one.'
                        />
                    </div>
                    <div className="admin-review__submit-container">
                        
                        <div>
                          
                            {activeButton !== "reject" && (
                                <button
                                    className="admin-review__approve"
                                    type="button"
                                    id="admin-review-approve"
                                    onClick={handleApprove}
                                    disabled={isApproved}
                                >
                                    {approveButtonText}
                                </button>
                            )}
                            {isRejected && (
                                <Link to="/adminHome">
                                    <button className="admin-review__return-main"  type="button">
                                        Back To Home
                                    </button>
                                </Link>
                            )}
                        </div>
                        <div>
                            {activeButton !== "approve" && (
                                <button
                                    className="admin-review__reject"
                                    type="button"
                                    id="admin-review-reject"

                                    onClick={handleReject}
                                    disabled={isRejected}
                                >
                                    {rejectButtonText}
                                </button>
                            )}
                            {isApproved && (
                                <Link to="/adminHome">
                                    <button className="admin-review__return-main"  type="button">
                                        Back To Home
                                    </button>
                                </Link>
                            )}
                            
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AdminReview;
