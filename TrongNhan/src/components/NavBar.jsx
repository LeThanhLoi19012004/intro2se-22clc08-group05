import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/NavBar.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuTicket } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Suki from '../assets/Suki.svg';
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

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    return (
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/mainpage" className="logo"><img src={Suki} alt="Logo" /></Link>
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
                <span>Settings & privacy</span>
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
