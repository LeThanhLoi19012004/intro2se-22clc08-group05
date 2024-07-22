import React from 'react';
import profileImg from '../assets/1.png';
import img1 from '../assets/img_1.avif';
import img2 from '../assets/img_2.avif';
import img3 from '../assets/img_3.avif';
import img4 from '../assets/img_4.avif';
import img5 from '../assets/img_5.avif';
import img6 from '../assets/img_6.avif';
 import bgImage from '../assets/bg.jpeg';
import Post from '../components/Post';
import NavBar from '../components/NavBar';
import '../assets/EventPage.css';
import MyPostWidget from '../components/DropZone'

function EventPage() {
  const headerStyle = {
    marginTop: '62px',
    width: '100%',
    background: `url(${bgImage}) no-repeat 50% 20% / cover`,
    minHeight: 'calc(100px + 15vw)',
  };

  return (
    <div>
      <NavBar />
      <div className="event-page__header__wrapper">
        <div style={headerStyle}></div>
        <div className="event-page__cols__container">
          <div className="event-page__left__col">
            <div className="event-page__img__container">
              <div className="event-page__round">
                <img src={profileImg} alt="User img" />
              </div>
              <span></span>
            </div>
            <div className="event-page__name-container">
              <h2>Suki</h2>
            </div>
            <div className="event-page__information-container">
            <p>bla bla hello my name is thuan ngu thuan ngu thuan ngu thuan ngu thuan ngu thuan ngu thuan nug nthua nthug sndf sndf sduf sdfsnd sdf sndf sn fsdj fns</p>
            </div>

            <div className="event-page__follow">
              <button>Follow</button>
            </div>
            <ul className="event-page__about">
              <li><span>4,073</span>Followers</li>
              <li><span>0</span>Post</li>
            </ul>
          </div>
          <div className="event-page__right__col">
            <nav>
              <ul>
                <li><a href="/">Posts</a></li>
              </ul>
              <button>Buy Ticket</button>
            </nav>
            <div className="event-page__container-post">
              
            <MyPostWidget/>
              <Post authorImg={img1} postImg={[img2, img3, img4]} />
              <Post authorImg={img1} postImg={[img2, img3, img4]} />
              <Post authorImg={img1} content={"Hello it is me"}  postImg={[img2, img3, img4]} />
              <Post authorImg={img1} content={"Hello it is me"}  postImg={[img2, img3, img4]} />
              <Post authorImg={img1} content={"Hello it is me"} postImg={[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
