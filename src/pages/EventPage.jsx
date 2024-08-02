import React, { useState, useEffect } from "react";
import profileImg from "../assets/1.png";
import img1 from "../assets/img_1.avif";
import img2 from "../assets/img_2.avif";
import img3 from "../assets/img_3.avif";
import img4 from "../assets/img_4.avif";
import bgImage from "../assets/bg.jpeg";
import Post from "../components/Post";
import NavBar from "../components/NavBar";
import "../assets/EventPage.css";
import MyPostWidget from "../components/DropZone";
import { useParams } from "react-router-dom";
import { renderEvent, renderEventPost} from "../API";

function EventPage() {
  const [infoEvent, setInfoEvent] = useState({});
  const [posts, setPosts] = useState([]);
  const event_id = localStorage.getItem('eventid');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await renderEvent({event_id});
        if (response.success){
          setInfoEvent(response.data);
        }
        const response2 = await renderEventPost({event_id});
        if (response2.success){
          setPosts(response2.data);
          console.log(response2.data)
        }
      } catch (error){
        console.log(error)
      }
    }
    fetchEvents();
  }, [])
  const [showDropdown, setShowDropdown] = useState(false);
  const [amount, setAmount] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút
  const [disabledBooking, setIsButtonDisabled] = useState(true);

  const handleBooking = () => {
    setShowDropdown(!showDropdown);
    setTimeLeft(300); // Reset timer khi mở dropdown
  };

  useEffect(() => {
    if (amount && isChecked) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [amount, isChecked]);

  useEffect(() => {
    if (showDropdown) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setShowDropdown(false); // Tự động đóng booking event khi hết thời gian
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showDropdown]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const headerStyle = {
    marginTop: "62px",
    width: "100%",
    background: `url(${bgImage}) no-repeat 50% 20% / cover`,
    minHeight: "calc(100px + 15vw)",
  };

  return (
    <div className="event-page__maincontainer">
      <NavBar />
      <div className="event-page__header__wrapper">
        <div style={headerStyle}></div>
        <div className="event-page__cols__container">
          <div className="event-page__left__col">
            <div className="event-page__img__container">
              <div className="event-page__round">
                <img src={infoEvent.logoUrl} alt="User img" />
              </div>
              <span></span>
            </div>
            <div className="event-page__name-container">
              <h2>{infoEvent.eventname}</h2>
            </div>
            <div className="event-page__information-container">
              <p>{infoEvent.descriptionevent}
              </p>
            </div>

            <div className="event-page__follow">
              <button>Follow</button>
            </div>
            <ul className="event-page__about">
              <li>
                <span>4,073</span>Followers
              </li>
              <li>
                <span>{posts.length}</span>Post
              </li>
            </ul>
          </div>
          <div className="event-page__right__col">
            <nav>
              <ul>
                <li>
                  <a>Posts</a>
                </li>
              </ul>
              <button onClick={handleBooking}>Buy Ticket</button>
              {showDropdown && (
                <div className="event-page__dropdown-menu" onClick={handleBooking}>
                  <div className="event-page__dropdown-content" onClick={(e) => e.stopPropagation()}>
                    <div className="event-page__dropdown-input-wrapper">
                      <label className="event-page__dropdown-label" htmlFor="booking-amount">Amount:</label>
                      <input
                        type="text"
                        id="booking-amount"
                        placeholder="Booking Amount"
                        className="event-page__dropdown-input"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                    </div>
                    <div className="event-page__dropdown-agreement">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="agree">
                        I agree with the Terms and Conditions of the Suki Event Management Platform and responsible for the information provided in this form.
                      </label>
                    </div>
                    <div className="event-page__dropdown-timer">Time left: {formatTime(timeLeft)}</div>
                    <button
                      onClick={handleBooking}
                      className="event-page__dropdown-buy-button"
                      disabled={disabledBooking}
                    >
                      Buy Tickets
                    </button>
                  </div>
                </div>
              )}
            </nav>
            <div className="event-page__container-post">
              <MyPostWidget />
              {posts.map((post, index) => (
          <Post
            key={index}
            date={post.postcreationdateFormatted}
            userName={post.eventID.eventname}
            content={post.descriptionpost}
            postImg={post.imagesUrls}
            comments={[]}
            authorImg={post.logoeventUrl}
            eventID = {post.eventID._id}
          />
        ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
