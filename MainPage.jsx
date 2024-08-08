import React, { useState, useEffect, useTransition } from "react";
import NavBar from "../components/NavBar.jsx";
import "../assets/MainPage.css";
import { FaMusic } from "react-icons/fa";
import { MdOutlineTheaterComedy, MdPeople } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { MdOutlineFestival } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import SukiColor from "../assets/Logo/SukiColor.svg";
import { FaSort } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaHome, FaCompass, FaHeart, FaCog,FaRegCalendarAlt  } from "react-icons/fa";
import { MdMusicNote, MdEvent} from 'react-icons/md';
import { GiHeartPlus,GiPodium } from 'react-icons/gi';
import {FaStar,FaHandsHelping, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import {Link, useLocation} from "react-router-dom";
import Post from '../components/Post.jsx'
import { renderMainPage } from "../API.js";

function LeftSideBar() {
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isExploreClicked, setIsExploreClicked] = useState(false);
  const [isFavoritesClicked, setIsFavoritesClicked] = useState(false);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [isCreateEventClicked, setIsCreateEventClicked] = useState(false);

  const handleClick = (setter) => () => {
    setter(true);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <div className="main-page__left-side">
      <div
        className="main-page__menu-item"
        onClick={handleClick(setIsHomeClicked)}
        style={{ cursor: "pointer" }}
      >
        <span className="main-page__icon">
          <FaHome className="icon" style={{ color: isHomeClicked ? '#ff7383' : '#2d158f' }} />
        </span>
        <span className="main-page__text" style={{ color: isHomeClicked ? '#ff7383' : '#2d158f' }}>
          Home
        </span>
      </div>
      <div
        className="main-page__menu-item"
        onClick={handleClick(setIsExploreClicked)}
        style={{ cursor: "pointer" }}
      >
        <span className="main-page__icon">
          <FaCompass className="icon" style={{ color: isExploreClicked ? '#ff7383' : '#2d158f' }} />
        </span>
        <span className="main-page__text" style={{ color: isExploreClicked ? '#ff7383' : '#2d158f' }}>
          Explore
        </span>
      </div>
      <div
        className="main-page__menu-item"
        onClick={handleClick(setIsFavoritesClicked)}
        style={{ cursor: "pointer" }}
      >
        <span className="main-page__icon">
          <FaHeart className="icon" style={{ color: isFavoritesClicked ? '#ff7383' : '#2d158f' }} />
        </span>
        <span className="main-page__text" style={{ color: isFavoritesClicked ? '#ff7383' : '#2d158f' }}>
          Favorites
        </span>
      </div>
      <div
        className="main-page__menu-item"
        onClick={handleClick(setIsSettingsClicked)}
        style={{ cursor: "pointer" }}
      >
        <span className="main-page__icon">
          <FaCog className="icon" style={{ color: isSettingsClicked ? '#ff7383' : '#2d158f' }} />
        </span>
        <span className="main-page__text" style={{ color: isSettingsClicked ? '#ff7383' : '#2d158f' }}>
          Settings
        </span>
      </div>
      <div className="main-page__menu-gap"></div>
      <Link to="/createvent"
        className="main-page__menu-item-create"
      >
        <div style={{ display: 'flex' }}>
          <span className="main-page__icon">
            <FaRegCalendarAlt className="icon"/>
          </span>
          <span className="main-page__text">
            Create Event
          </span>
        </div>
      </Link>
    </div>
  );
}

function RightSidebar() {
  // const newsItems = Array(8).fill({
  //   title: "Bla bla bla bla bla bla",
  //   description: "bla bla bla bla bla bla bla",
  // });

  return (
    <div className="main-page__right-side">
      <div className="main-page__sidebar-news-scroll">
        <h1>Followed</h1>
        {/* {newsItems.map((item, index) => (
          <div key={index}>
            <a href="#">{item.title}</a>
            <span>{item.description}</span>
          </div>
        ))} */}
        <div className="main-page__event_list-right">
          <div className="main-page__event-info">
            <div className="main-page__event-avatar"></div>
              <div className="main-page__event-details">
                <p className="main-page__event-name">Event Name</p>
                <p className="main-page__event-category">Category</p>
            </div>
          </div>
          <div className="main-page__event-info">
            <div className="main-page__event-avatar"></div>
              <div className="main-page__event-details">
                <p className="main-page__event-name">Event Name</p>
                <p className="main-page__event-category">Category</p>
            </div>
          </div>
          <div className="main-page__event-info">
            <div className="main-page__event-avatar"></div>
              <div className="main-page__event-details">
                <p className="main-page__event-name">Event Name</p>
                <p className="main-page__event-category">Category</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page__sidebar-news">
        <h1>Recents</h1>
        {/* {newsItems.map((item, index) => (
          <div key={index}>
            <a href="#">{item.title}</a>
            <span>{item.description}</span>
          </div>
        ))} */}
        <div className="main-page__event_list-right">
          <div className="main-page__event-info">
            <div className="main-page__event-avatar"></div>
              <div className="main-page__event-details">
                <p className="main-page__event-name">Event Name</p>
                <p className="main-page__event-category">Category</p>
            </div>
          </div>
          <div className="main-page__event-info">
            <div className="main-page__event-avatar"></div>
              <div className="main-page__event-details">
                <p className="main-page__event-name">Event Name</p>
                <p className="main-page__event-category">Category</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page__sidebar-useful-link">
        <div className="main-page__copy-right-msg">
          <img src="#" alt="" />
          <p>Suki Corporation © 2024</p>
        </div>
      </div>
    </div>
  );
}

function CenterSide() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sortType, setSortType] = useState('none');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await renderMainPage();
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const events = [
    { name: 'Music', icon: <FaMusic style={{ color: 'white' }} /> },
    { name: 'Charity', icon: <GiHeartPlus style={{ color: 'white' }} /> },
    { name: 'Teambuilding', icon: <FaUsers style={{ color: 'white' }} /> },
    { name: 'Meeting', icon: <GiVideoConference style={{ color: 'white' }} /> },
    { name: 'Festival', icon: <FaStar style={{ color: 'white' }} /> },
  ];

  const handleEventClick = (index) => {
    setSelectedEvent(index);
  };

  const handleClickSort = () => {
    setSortType((prev) => (prev === 'none' ? 'top' : prev === 'top' ? 'down' : 'none'));
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.postcreationdate);
    const dateB = new Date(b.postcreationdate);

    if (sortType === 'top') return dateB - dateA;
    if (sortType === 'down') return dateA - dateB;
    return 0;
  });

  return (
    <div className="main-page__center-side">
      <div className="main-page__event-nav-bar">
        {events.map((event, index) => (
          <div
            className={`main-page__event-item ${selectedEvent === index ? 'main-page__selected' : ''}`}
            key={index}
            onClick={() => handleEventClick(index)}
          >
            <div className="main-page__event-icon">{event.icon}</div>
            <span>{event.name}</span>
          </div>
        ))}
      </div>

      <div
        className="main-page__sort-by"
        onClick={handleClickSort}
        style={{ cursor: 'pointer' }}
      >
        <hr />
        <p>
          Sort by: <span>{sortType} {sortType === 'none' ? <FaSort /> : sortType === 'top' ? <FaSortUp /> : <FaSortDown />}</span>
        </p>
      </div>

      {loading ? (
        <div className="main-page__loader">
          <p>Loading posts...</p>
        </div>
      ) : error ? (
        <div className="main-page__error-message">
          <p>An error has occurred: {error.message}</p>
        </div>
      ) : (
        sortedPosts.map((post, index) => (
          <Post
            key={index}
            date={post.postcreationdate}
            userName={post.eventID.eventname}
            content={post.descriptionpost}
            postImg={post.imagesUrls}
            comments={[]}
            authorImg={post.logoeventUrl}
            eventID={post.eventID._id}
          />
        ))
      )}
    </div>
  );
}

function MainPage() {
  return (
    <div className="main-page__main-container">
      <NavBar authorImg={SukiColor} />
      <div className="main-page__container">
        <LeftSideBar />
        <CenterSide />
        <RightSidebar />
      </div>
    </div>
  );
}


export default MainPage;