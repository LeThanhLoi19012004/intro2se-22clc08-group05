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
                  color: notificationDropdownActive ? '#ff7383' : 'white',
                  backgroundColor: notificationDropdownActive ? 'white' : 'transparent',
                  borderRadius: '50%',
                  padding: '5px'
                }}
              />
              <div className={`notification-dropdown ${notificationDropdownActive ? 'active' : ''}`}>
                <div className="notification-card">
                  <div className="nav-bar__card-title">Notifications</div>
                  <div className="nav-bar__card-list">
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-pink"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-main">
                          <strong>EventOrganizer</strong> just replied to your comment.
                        </div>
                        <div className="nav-bar__card-list-part-info-time">20 minutes ago</div>
                      </div>
                    </div>
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-pink"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-main">
                          New update of <strong>FutureEvent</strong>.
                        </div>
                        <div className="nav-bar__card-list-part-info-time">3 hours ago</div>
                      </div>
                    </div>
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-white"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-main">
                          <strong>NewEvent</strong> starts in 2 days.
                        </div>
                        <div className="nav-bar__card-list-part-info-time">2 days ago</div>
                      </div>
                    </div>
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-white"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-main">
                          <strong>UserFriend</strong> just replied to your comment.
                        </div>
                        <div className="nav-bar__card-list-part-info-time">10 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li onClick={toggleTicketDropdown}><LuTicket 
                   size={30}
                   style={{
                   color: ticketDropdownActive ? '#ff7383' : 'white',
                   backgroundColor: ticketDropdownActive ? 'white' : 'transparent',
                   borderRadius: '50%',
                   padding: '5px'}}/>
              <div className={`ticket-dropdown ${ticketDropdownActive ? 'active' : ''}`}>
                <div className="ticket-card">
                <div className="nav-bar__card-title">Tickets</div>
                  <div className="nav-bar__card-list">
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-pink"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-events">
                          Event Not Happened Yet With Participation
                        </div>
                        <div className="nav-bar__card-list-part-info-participation">Participation</div>
                      </div>
                    </div>
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-pink"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-events">
                          Event Not Happened Yet With Tickets
                        </div>
                        <div className="nav-bar__card-list-part-info-participation">2 Tickets</div>
                      </div>
                    </div>
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-white"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-events">
                          Event Happened With Participation
                        </div>
                        <div className="nav-bar__card-list-part-info-participation">Participation</div>
                      </div>
                    </div>
                    <div className="nav-bar__card-list-part">
                      <div className="nav-bar__card-list-part-white"></div>
                      <div className="nav-bar__card-list-part-info">
                        <div className="nav-bar__card-list-part-info-events">
                          Event Happened With Tickets
                        </div>
                        <div className="nav-bar__card-list-part-info-participation">1 Ticket</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

          </ul>
          <div className="profile_img" onClick={toggleDropdown}>
            <img src={url} alt="profile-img" />
            <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`}>
              <div className="profile-section">
                <img src={url} alt="profile-img"/>
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
