import React, { useState } from 'react';
import logo from '../assets/SukiWhite.svg';
import avatar from '../assets/Avatar.jpg';
import '../assets/AdminHomePage.css';
import {Link,useNavigate} from "react-router-dom"
const EventCard = ({ username, timeAgo, eventName, status }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Approved':
                return 'status-approved';
            case 'Rejected':
                return 'status-rejected';
            case 'Pending':
                return 'status-pending';
            default:
                return '';
        }
    };

    return (
        <div className="admin-homepage__event-card">
            <div className="user-info">
                <div className="user-avatar"></div>
                <div className="user-details">
                    <p className="username">{username}</p>
                    <p className="time-ago">{timeAgo}</p>
                </div>
            </div>
            <p className="event-name">{eventName}</p>
            <div className="event-details">
                <Link to ="/adminReview">
                <button className={`event-status ${getStatusClass(status)}`}>{status}</button>
                </Link>                
            </div>
        </div>
    );
};

const AdminHomePage = () => {
    const [activeSection, setActiveSection] = useState("Events");

    const events = [
        { username: 'Username', timeAgo: '1 day ago', eventName: 'Event Name', status: 'Approved' },
        { username: 'Username', timeAgo: '22 hours ago', eventName: 'Event Name', status: 'Rejected' },
        { username: 'Username', timeAgo: '1 hour ago', eventName: 'Event Name', status: 'Approved' },
        { username: 'Username', timeAgo: '30 minutes ago', eventName: 'Event Name', status: 'Pending' },
        { username: 'Username', timeAgo: '30 minutes ago', eventName: 'Event Name', status: 'Pending' },
        { username: 'Username', timeAgo: '30 minutes ago', eventName: 'Event Name', status: 'Pending' },
        { username: 'Username', timeAgo: '30 minutes ago', eventName: 'Event Name', status: 'Pending' },
        { username: 'Username', timeAgo: '30 minutes ago', eventName: 'Event Name', status: 'Pending' },
    ];

    const renderSection = () => {
        switch (activeSection) {
            case "Accounts":
                return <AdminAccounts />;
            case "Events":
                return (
                    <div className="admin-homepage__event-list">
                        {events.map((event, index) => (
                            <EventCard
                                key={index}
                                username={event.username}
                                timeAgo={event.timeAgo}
                                eventName={event.eventName}
                                status={event.status}
                            />
                        ))}
                    </div>
                );
            case "Comments":
                return <AdminComments />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-homepage__container">
            <header>
                <div className="admin-homepage__header-img-container">
                    <img src={logo} alt="Logo" />
                    <p className="admin-homepage__header-website-title">SUKI</p>
                </div>
                <div className="admin-homepage__header-navigation-bar">
                    <div
                        className={`admin-homepage__header-navigation-bar-button ${
                            activeSection === "Accounts" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("Accounts")}
                    >
                        ACCOUNTS
                    </div>
                    <div
                        className={`admin-homepage__header-navigation-bar-button ${
                            activeSection === "Events" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("Events")}
                    >
                        EVENTS
                    </div>
                    <div
                        className={`admin-homepage__header-navigation-bar-button ${
                            activeSection === "Comments" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("Comments")}
                    >
                        COMMENTS
                    </div>
                </div>
                <div className="admin-homepage__profile-container">
                    <img src={avatar} alt="Avatar" />
                    <p className="admin-homepage__profile-container-name">Administrator</p>
                </div>
            </header>
            <div className="admin-homepage__list-container">{renderSection()}</div>
        </div>
    );
};

const AdminAccounts = () => {
    return (
        <div className="admin-homepage__account-list">
            <div className="admin-homepage__account-card">
                <div className="user-info">
                    <div className="user-avatar"></div>
                    <div className="user-details">
                        <p className="username">Username</p>
                        <p className="time-ago">Participant</p>
                    </div>
                </div>
                <div className="full-information">
                    <p className="small-info"><strong>Full Name: </strong>This Is Name</p>
                    <p className="small-info"><strong>Gender: </strong>Female</p>
                    <p className="small-info"><strong>University: </strong>VNU-HCM, University Of Science</p>
                    <p className="small-info"><strong>Phone: </strong>0987654321</p>
                    <p className="small-info"><strong>ID: </strong>22127000</p>
                    <p className="small-info"><strong>DOB: </strong>01/01/2004</p>
                    <p className="small-info"><strong>Address: </strong>TP. HCM</p>
                </div>
                <div className="event-details">
                    <button className="event-status ban-user">Ban User</button>
                    <button className="event-status delete-user">Delete User</button>
                </div>
            </div>

            <div className="admin-homepage__account-card">
                <div className="user-info">
                    <div className="user-avatar"></div>
                    <div className="user-details">
                        <p className="username">Username</p>
                        <p className="time-ago">Organizer</p>
                    </div>
                </div>
                <div className="full-information">
                    <p className="small-info"><strong>Full Name: </strong>This Is Name</p>
                    <p className="small-info"><strong>Gender: </strong>Male</p>
                    <p className="small-info"><strong>University: </strong>VNU-HCM, University Of Science</p>
                    <p className="small-info"><strong>Phone: </strong>0987654321</p>
                    <p className="small-info"><strong>ID: </strong>22127000</p>
                    <p className="small-info"><strong>DOB: </strong>01/01/2004</p>
                    <p className="small-info"><strong>Address: </strong>TP. HCM</p>
                </div>
                <div className="event-details">
                    <button className="event-status unban-user">Unban User</button>
                    <button className="event-status delete-user">Delete User</button>
                </div>
            </div>
        </div>
    );
};

const AdminComments = () => {
    return (
        <div className="admin-homepage__comment-list">
            <div className="admin-homepage__comment-card">
                <div className="user-info">
                    <div className="user-avatar"></div>
                    <div className="user-details">
                        <p className="username">Username</p>
                        <p className="time-ago">2 days ago</p>
                    </div>
                </div>
                <div className="comment-container">
                    <p className="event-name">Event Name</p>
                    <p className="user-comment">User Comment</p>
                </div>
                <div className="event-details">
                    <button className="event-status delete-comment">Delete Comment</button>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
