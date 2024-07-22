import React, { useState } from 'react';
import '../assets/NavBar.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuTicket } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Suki from '../assets/Suki.svg';

function Navbar(props) {
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    return (
      <nav className="navbar">
        <div className="navbar-left">
          <a href="index.html" className="logo"><img src={Suki} alt="Logo" /></a>
        </div>
        <div className="navbar-center">
          <div className="search-box">
            <IoSearchOutline />
            <input type="text" placeholder="Event" />
          </div>
        </div>
        <div className="navbar-right">
          <ul>
            <li><IoMdNotificationsOutline size={28} /></li>
            <li><LuTicket size={28} /></li>
          </ul>
          <div className="profile_img" onClick={toggleDropdown}>
            <img src={props.authorImg} alt="profile-img" />
            <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`}>
              <div className="profile-section">
                <img src={props.authorImg} alt="profile-img" />
                <div className="profile-info">
                  <p>Nhân</p>
                </div>
              </div>
              <div className="menu-item">
                <FaCog className="icon" />
                <span>Settings & privacy</span>
              </div>
              <div className="menu-item">
                <LuLogOut className="icon" />
                <span>Log out</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
