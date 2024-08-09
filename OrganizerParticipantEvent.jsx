import React, { useState, useEffect,useRef } from "react";

import bgImage from "../assets/bg.jpeg";
import Post from "../components/Post";
import NavBar from "../components/NavBar";
import "../assets/OrganizerParticipantEvent.css";
import MyPostWidget from "../components/DropZone";

import { renderEvent, renderEventPost} from "../API";

function OrganizerParticipantEvent() {
  const [infoEvent, setInfoEvent] = useState({});
  const [posts, setPosts] = useState([]);
  const event_id = localStorage.getItem('eventid');
  const leftColRef = useRef(null);

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
  const [buttonText, setButtonText] = useState('Join Event');
  const [buttonColor, setButtonColor] = useState("#2d158f");

  const [manageText, setManageText] = useState('Manage');
  const [followButtonBackGround, setFollowButtonBackGround] = useState("#2d158f");
//   const handleBooking = () => {
//     setShowDropdown(!showDropdown);
//     setTimeLeft(300); // Reset timer khi mở dropdown
//     console.log("Book complete\n");
    
//     if(buttonText === "Join Event"){
//       setButtonText("Cancel Participation");

//       setButtonColor('linear-gradient(150deg, #2d158f, #ff7383)');
//     }else{
//       setButtonText("Join Event");

//       setButtonColor('#2d158f');

//     }
    
//   };

  useEffect(() => {
    if (amount && isChecked) {
      setIsButtonDisabled(false);


    } else {
      setIsButtonDisabled(true);
    }
  }, [amount, isChecked]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        leftColRef.current.style.height = "auto";
      } else {
        leftColRef.current.style.height = `${window.innerHeight}px`;
      }
    });

    if (leftColRef.current) {
      observer.observe(leftColRef.current);
    }

    return () => {
      if (leftColRef.current) {
        observer.unobserve(leftColRef.current);
      }
    };
  }, []);
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

//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

  const headerStyle = {
    marginTop: "62px",
    width: "100%",
    background: `url(${bgImage}) no-repeat 50% 20% / cover`,
    minHeight: "calc(100px + 15vw)",
  };
 
  return (
    <div className="organizer-participant-event-page__maincontainer">
      <NavBar />
      <div className="organizer-participant-event-page__header__wrapper">
        <div style={headerStyle}></div>
        <div className="organizer-participant-event-page__cols__container">
          <div  className="organizer-participant-event-page__left__col" ref={leftColRef}>
            <div className ="organizer-participant-event-page__layer">
            <div className="organizer-participant-event-page__img__container">
              <div className="organizer-participant-event-page__round">
                <img src={infoEvent.logoUrl} alt="User img" />
              </div>
              <span></span>
            </div>
            <div className="organizer-participant-event-page__name-container">
              <h2>{infoEvent.eventname}</h2>
            </div>
            <div className="organizer-participant-event-page__information-container">
              <p>{infoEvent.descriptionevent}
              </p>
            </div>
            <div className="organizer-ticket-event-page__upper-part">
              <div className="organizer-participant-event-page__follow">
                <button>{manageText}</button>
              </div>
              <ul className="organizer-participant-event-page__about">
                <li>
                  <div><div>4,073</div><div>Followers</div></div>
                </li>
                <li>
                  <div><div>{posts.length}</div><div>Participants</div></div>
                </li>
                <li>
                  <div><div>100</div><div>Participants Left</div></div>
                </li>
              </ul>
              <ul className = "organizer-participant-event-page__remain-info">
                  <li><span>Date:</span>This is data</li>
                  <li><span>Time:</span>This is data</li>
                  <li><span>Category:</span>This is data</li>
                  <li><span>Location:</span>This is data</li>
              </ul>
            </div>
            <div className = "organizer-participant-event-page__rule-container">
                <p>Rule</p>
                <ul>
                  <li>Rule1</li>
                  <li>Rule2</li>
                  <li>Rule3</li>
                  <li>Rule4</li>
                  <li>Rule5</li>
                  <li>Rule1</li>
                  <li>Rule2</li>
                  
                
                </ul>
            </div>
            {/* <div className = "suki-end"  >Suki Cooperation</div> */}
          </div>
          </div>
          <div className="organizer-participant-event-page__right__col" >
            <nav>
              <ul>
                <li>
                  <a>Posts</a>
                </li>
              </ul>
              {/* <button onClick={handleBooking} className = "booking-button "  
                                style={{ background:  buttonColor}}

              >{buttonText}
              </button> */}
              
            </nav>
            <div className="organizer-participant-event-page__container-post">
              <MyPostWidget />
              {posts.map((post, index) => (
          <Post
            key={index}
            date={post.postcreationdate}            
            userName={post.eventID.eventname}
            content={post.descriptionpost}
            postImg={post.imagesUrls}
            comments={[]}
            authorImg={post.logoeventUrl}
            eventID = {post.eventID._id}
          />
        ))}
            </div>
            <div className = "temp"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerParticipantEvent;
