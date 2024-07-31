import React, { useState, useEffect } from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import '../assets/Post.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function Comment(props) {
  return (
    <div className='post__comment'>
      <div className="post__comment-author-img">
        <img src={props.profileImg} alt='Profile img' />
      </div>
      <div className="post__comment_content">
        <h3>{props.authorName}</h3>
        <p>{props.commentText}</p>
      </div>
    </div>
  );
}

function Overlay(props) {
  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('post__no-scroll');
    } else {
      document.body.classList.remove('post__no-scroll');
    }

    return () => {
      document.body.classList.remove('post__no-scroll');
    };
  }, [props.isOpen]);

  return (
    props.isOpen && (
      <div className="post__container-overlay" onClick={props.onClose}>
        <div className="post__overlay" onClick={(e) => e.stopPropagation()}>
          <div className="post__overlay-content">
            <h1>{props.eventName} 's Post</h1>
            <button className="post__close-button" onClick={props.onClose}>
              X
            </button>
          </div>
          <hr />
          <div className="post__comment-section">
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
            <Comment profileImg={props.profileImg} authorName="Author name" commentText="This is a sample comment!. Have a good day." />
          </div>
          <div className="post__user-comment">
            <input type='text' placeholder='Write a comment...' />
            <button className='post__send-button'>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

const PostCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return ( images.length != 0 && 
    <div className="post__post-img">
      {images.length > 0 && (
        <>
          <img src={images[currentIndex]} alt="Post" />
          {images.length > 1 && (
            <div className="carousel-controls">
              <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0} 
                className="control-button prev"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={handleNext} 
                disabled={currentIndex === images.length - 1} 
                className="control-button next"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function Post(props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const event_id = props.eventID;
  const movetoEvent = () => {
    localStorage.setItem('eventid', event_id);
    window.scrollTo(0, 0); // Cuộn về đầu trang
    navigate(`/mainpage/event/${event_id}`)
  }
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
    <div className="post__post">
      <div className="post__post-author">
        <div className="post__post-author-img">
          <img onClick={movetoEvent} src={props.authorImg} alt="Author" />
        </div>
        <div>
          <h1 onClick={movetoEvent}>{props.userName}</h1>
          <small>
            {hourAgo < 24
              ? `${hourAgo} hours ago`
              : hourAgo < 24 * 365
              ? `${Math.floor(hourAgo / 24)} days ago`
              : `${Math.floor(hourAgo / (24 * 365))} years ago`}
          </small>
        </div>
      </div>
      <p>{props.content}</p>
      <PostCarousel images={props.postImg} />
      <div className="post__post-stats">
        <span>
          {props.likes} likes · {props.comments.length} comments
        </span>
      </div>
      <div className="post__post-activity">
        <div
          className="post__post-activity-link"
          onClick={toggleLike}
          style={{ cursor: 'pointer' }}
        >
          {liked ? <BiSolidLike size={17} /> : <BiLike size={17} />}
          <span> Like</span>
        </div>
        <div className="post__post-activity-link">
          <FaRegCommentDots size={17}  onClick={() => setShowOverlay(!showOverlay)}/>
          <span onClick={() => setShowOverlay(!showOverlay)}> Comment</span>
        </div>
        <div className="post__post-activity-link">
          <FaRegShareSquare size={17} />
          <span> Share</span>
        </div>
      </div>
      <Overlay isOpen={showOverlay} onClose={() => setShowOverlay(false)} profileImg={props.authorImg} />
    </div>
  );
}

export default Post;
