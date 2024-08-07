import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/NavBar.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuTicket } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Suki from '../assets/SukiWhite.svg';
import { renderProfile } from '../API';

function Navbar() {
    const navigate = useNavigate();
    const user_id = localStorage.getItem("UserID");
    const [url, setUrl] = useState( "https://cdn-icons-png.flaticon.com/512/3682/3682281.png")
    const [name, setName] = useState("Guest")
    const handleLogout = () => {
      localStorage.clear();
      navigate('/');
    };
    const handleSetting = () => {
      navigate('/setting')
    };
    useEffect(() => {
      const getImg = async () => {
        const response = await renderProfile({user_id});
        if (response.success){
          setUrl(response.data.avatar);
          setName(response.data.idaccount.username)
        }
      
      }
        getImg();
    }, [])
    const [dropdownActive, setDropdownActive] = useState(false);
    const [notificationDropdownActive, setNotificationDropdownActive] = useState(false);
    const [ticketDropdownActive, setTicketDropdownActive] = useState(false);
    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
        setTicketDropdownActive(false);
        setNotificationDropdownActive(false);
    };
    const toggleNotificationDropdown = () => {
      setNotificationDropdownActive(!notificationDropdownActive);
      setTicketDropdownActive(false);
      setDropdownActive(false);
    };
    const toggleTicketDropdown = () => {
      setTicketDropdownActive(!ticketDropdownActive);
      setNotificationDropdownActive(false);
      setDropdownActive(false);

    };
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/mainpage" className="logo"><img src={Suki} alt="Logo" /></Link>
          <span>SUKI</span>
        </div>
        <div className="navbar-center">
          <div className="search-box">
            <IoSearchOutline style={{ color: 'white' }}/>
            <input type="text" placeholder="Event" />
          </div>
        </div>
        <div className="navbar-right">
          <ul>
            <li onClick={toggleNotificationDropdown}>
              <IoMdNotificationsOutline
                  size={30}
                  style={{
                  color: notificationDropdownActive ? 'black' : 'white',
                  backgroundColor: notificationDropdownActive ? 'white' : 'transparent',
                  borderRadius: '50%',
                  padding: '5px'
                }}
              />
              <div className={`notification-dropdown ${notificationDropdownActive ? 'active' : ''}`}>
                <div className="notification-card">
                  <p>
                    DATA will show heres<br/>
                    DATA will show heres<br/>
                    DATA will show heres<br/>DATA will show heres<br/>
                    DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/> 
                  </p>
                </div>
              </div>
            </li>
            <li onClick={toggleTicketDropdown}><LuTicket 
                   size={30}
                   style={{
                   color: ticketDropdownActive ? 'black' : 'white',
                   backgroundColor: ticketDropdownActive ? 'white' : 'transparent',
                   borderRadius: '50%',
                   padding: '5px'}}/>
              <div className={`ticket-dropdown ${ticketDropdownActive ? 'active' : ''}`}>
                <div className="ticket-card">
                  <p>
                    DATA will show heres<br/>
                    DATA will show heres<br/>
                    DATA will show heres<br/>DATA will show heres<br/>
                    DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/>DATA will show heres<br/> 
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div className="profile_img" onClick={toggleDropdown}>
            <img src={url} alt="profile-img" />
            <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`}>
              <div className="profile-section">
                <img src={url} alt="profile-img" />
                <div className="profile-info">
                  <p>{name}</p>
                </div>
              </div>
              <div className="menu-item" onClick={handleSetting}>
                <FaCog className="icon" />
                <span>Settings</span>
              </div>
              <div className="menu-item" onClick={handleLogout}>
                <LuLogOut className="icon" />
                <span >Log out</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
