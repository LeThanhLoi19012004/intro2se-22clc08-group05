import React, {useState, useEffect} from 'react'
import logo from './assets/SukiWhite.svg'

import { Link } from 'react-router-dom'; // Import Link
import { useNavigate } from 'react-router-dom';



import './AdminHomePage.css'
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
          <button className={`event-status ${getStatusClass(status)}`}>{status}</button>
        </div>
      </div>
    );
  };
function AdminHomePage(){
    
    // const navigate = useNavigate();
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
    return(
        <>
        <div className = "admin-homepage__container">
            <header >
                <div className = "admin-homepage__header-img-container">
                    <img src = {logo}/>
                </div>
                
                <div className = "admin-homepage__title">
                    Events To Authorize
                </div>
                <div className = "admin-homepage__profile-container">
                    <img src = {""}/>
                </div>  
            </header>
           
            <div className="admin-homepage__event-list">
                {events.map((event, index) => (
                <EventCard
                    key={index}
                    username={event.username}
                    timeAgo={event.timeAgo}
                    eventName={event.eventName}
                    status={event.status} />
                ))}
            </div>
        </div>
        </>
    );
}

export default AdminHomePage;