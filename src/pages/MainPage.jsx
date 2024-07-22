import React, { useState, useEffect, useTransition } from "react";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";
import "../assets/MainPage.css";
import { FaMusic } from "react-icons/fa";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { MdOutlineFestival } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import SukiGreen from "../assets/SukiGreen.svg";
import { FaSort } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import {Link} from "react-router-dom";
import Post from '../components/Post.jsx'

function LeftSideBar() {
  const [prev, setRefresh] = useState(false);

  const renderLinks = (items) => {
    return items.map((item, index) => (
      <a key={index} href="#">
        <img src="#" alt="" />
        {item}
      </a>
    ));
  };
  const handleClickMain = () => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
    window.location.reload();
  };

  return (
    <div className="main-page__left-side">
      <div
        className="main-page__menu-item"
        onClick={handleClickMain}
        style={{ cursor: "pointer" }}
      >
        <span className="main-page__icon">🏠</span>
        <span className="main-page__text">Trang chủ</span>
      </div>
      <div className="main-page__menu-item">
        <span className="main-page__icon">🧭</span>
        <span className="main-page__text">Khám phá</span>
      </div>
      <div className="main-page__menu-item">
        <span className="main-page__icon">❤️</span>
        <span className="main-page__text">Yêu thích</span>
      </div>
      <div className="main-page__menu-item">
        <span className="main-page__icon">📈</span>
        <span className="main-page__text">Bảng xếp hạng</span>
      </div>
      <div className="main-page__space"></div>
      <div className="main-page__menu-item create-event">
        <span className="main-page__icon">🗓️</span>
        <span className="main-page__text">Tạo event</span>
      </div>
      <div className="main-page__menu-item">
        <span className="main-page__icon">⚙️</span>
        <span className="main-page__text">Cài đặt</span>
      </div>
    </div>
  );
}

function RightSidebar(){
  const newsItems = Array(4).fill({
    title: "Bla bla bla bla bla bla",
    description: "bla bla bla bla bla bla bla",
  });

  return (
    <div className="main-page__right-side">
      <div className="main-page__sidebar-news">
        <img src="#" alt="info" className="main-page__info-icon" />
        <h1>Trending News</h1>
        {newsItems.map((item, index) => (
          <div key={index}>
            <a href="#">{item.title}</a>
            <span>{item.description}</span>
          </div>
        ))}
        <a href="#" className="main-page__read-more-link">
          Read more
        </a>
      </div>

      <div className="main-page__sidebar-ad">
        <small>Sponsored</small>
        <p>Iphone 16 is coming...</p>
        <div>
          <img src="#" alt="" />
          <img src="#" alt="" />
        </div>
        <b>Brand and Demand in Apple</b>
        <a href="https://www.apple.com/apple-news/" className="main-page__ad-link">
          Learn more
        </a>
      </div>

      <div className="main-page__sidebar-useful-link">
        <div className="main-page__copy-right-msg">
          <img src="#" alt="" />
          <p>Suki Corporation © 2024</p>
        </div>
      </div>
    </div>
  );
};



function CenterSide() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sortType, setSortType] = useState("none");

  const handleEventClick = (index) => {
    setSelectedEvent(index);
  };
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/main-page");
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const events = [
    { name: "Ca nhạc", icon: <FaMusic /> },
    { name: "Từ thiện", icon: <MdOutlineTheaterComedy /> },
    { name: "Hội nghị", icon: <GiVideoConference /> },
    { name: "Festival", icon: <MdOutlineFestival /> },
    { name: "Team building", icon: <AiOutlineTeam /> },
  ];

  const handleClickSort = () => {
    if (sortType === "none") {
      setSortType("top");
    } else if (sortType === "top") {
      setSortType("down");
    } else {
      setSortType("none");
    }
  };
  return (
    <div className="main-page__center-side">
      <div className="main-page__event-nav-bar">
        {events.map((event, index) => (
          <div
            className={`event-item ${
              selectedEvent === index ? "selected" : ""
            }`}
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
        style={{ cursor: "pointer" }}
      >
        <hr />
        <p>
          Sort by: <span>{sortType} {sortType === "none" ? <FaSort/> : sortType === "top" ? <FaSortUp/> : <FaSortDown/>}</span>
        </p>
      </div>
      {loading ? (
        <div className="main-page__loader">
          <p>Loading posts...</p>
        </div>
      ) : error ? (
        <div className="main-page__error-message">
          {" "}
          <p>An error has occurred: {error.message}</p>
        </div>
      ) : (
        posts.map((post, index) => (
          <Post
            key={index}
            date={post.date}
            authorImg={post.authorImg}
            userName={post.userName}
            content={post.content}
            postImg={post.postImg}
            comments={post.comments}
            likes={post.likes}
          />
        ))
      )}
    </div>
  );
}

function MainPage() {
  return (
    <div className="main-page__main-container">
      <NavBar authorImg={SukiGreen} />
      <div className="main-page__container">
        <LeftSideBar />
        <RightSidebar />
        <CenterSide />
      </div>
    </div>
  );
}

export default MainPage;
