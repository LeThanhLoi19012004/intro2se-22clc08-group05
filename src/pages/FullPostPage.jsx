import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import '../assets/FullPostPage.css';
import { FaRegStar, FaStar } from 'react-icons/fa'; 

function TicketOrder(props) {
  const calculateTimeLeft = (date) => {
      const targetDate = new Date(date);
      const now = new Date();
      const difference = targetDate - now;

      let timeLeft = {};

      if (difference > 0) {
          timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
          };
      }

      return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date));
  const [rating, setRating] = useState(props.star === -1 ? 0 : props.star);
  const [hover, setHover] = useState(0);

  useEffect(() => {
      const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft(props.date));
      }, 1000);

      return () => clearInterval(timer);
  }, [props.date]);

  const handleRating = (rate) => {
      setRating(rate);
  };

  const isEventEnded = !timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds;

  return (
      <div className="sidebar-activity">
          <h3>TICKET ORDER</h3>
          <ul>
              <li>Available: <span>{props.availableTickets}</span></li>
              <li>Ticket Order: <span>{props.ticketOrder}</span></li>
          </ul>
          <h3>TIME REMAIN</h3>
          <a href="#">
              <img src={props.timeIconSrc} alt="" />
              {isEventEnded ? (
                  <span>Event đã kết thúc</span>
              ) : (
                  `${timeLeft.days ? String(timeLeft.days) : '0'} days, 
                  ${timeLeft.hours ? String(timeLeft.hours).padStart(2, '0') : '00'}:
                  ${timeLeft.minutes ? String(timeLeft.minutes).padStart(2, '0') : '00'}:
                  ${timeLeft.seconds ? String(timeLeft.seconds).padStart(2, '0') : '00'}`
              )}
          </a>
          <div className="discover-more-link">
              <a href="#">Discover more</a>
          </div>
          <h3>RATING</h3>
          <div className="rating">
              {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                      <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          onClick={() => handleRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                      >
                          {index <= (hover || rating) ? (
                              <FaStar className="star" />
                          ) : (
                              <FaRegStar className="star" />
                          )}
                      </button>
                  );
              })}
          </div>
      </div>
  );
}

function Post(props) {
  const calculateTimeLeft = (date) => {
    const targetDate = new Date(date);
    const now = new Date();
    const difference = now - targetDate;
    return Math.floor(difference / (1000 * 60 * 60));
  };

  const [hourAgo, setHourAgo] = useState(calculateTimeLeft(props.date));
  const [liked, setLiked] = useState(props.initialLiked);

  useEffect(() => {
    const timer = setInterval(() => {
      setHourAgo(calculateTimeLeft(props.date));
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [props.date]);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="post">
      <div className="post-author">
        <img src={props.authorImg} alt="Author" />
        <div>
          <h1>{props.userName}</h1>
          <small>{hourAgo} hours ago</small>
        </div>
      </div>
      <p>{props.content}</p>
      <img src={props.postImg} alt="Post" />
      <div className="post-stats">
        <span>{props.comments} comments · {props.shares} shares</span>
      </div>
      <div className="post-activity">
        <div className="post-activity-link" onClick={toggleLike} style={{ cursor: 'pointer' }}>
          {liked ? <BiSolidLike size={28} /> : <BiLike size={28} />}
          <span>  Like</span>
        </div>
        <div className="post-activity-link">
          <FaRegCommentDots size={28} />
          <span>  Comment</span>
        </div>
        <div className="post-activity-link">
          <FaRegShareSquare size={28} />
          <span>  Share</span>
        </div>
      </div>
    </div>
  );
}

function FullPostPage() {
  const postProps = {
    date: "2024-06-30T12:00:00Z",
    userName: "John Doe",
    authorImg: "extract-component/src/components/1.png",
    postImg: "logo.svg",
    content: "The Betty was a creature of habit and she thought she liked it that way. That was until Dave showed up in her life. She now had a choice to...",
    comments: 22,
    shares: 40,
    initialLiked: true
  };
  const ticketProps = {
    date: "2024-08-01T03:57:00Z",
    availableTickets: 30,
    ticketOrder: 20,
    timeIconSrc: "1.png",
    star: 4
  };
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="left-side">
          <Post {...postProps}/>
        </div>
        <div className="right-side">
          <TicketOrder {...ticketProps}/>
        </div>
      </div>
    </div>
  );
}




export default FullPostPage;
