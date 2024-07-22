import React from 'react';
import  '../assets/GuestPage.css';
import whiteLogo from '../assets/SukiWhite.svg';
import {Link} from 'react-router-dom';
const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

function GuestPage() {
  return (
    <div>
      <header className="header">
        <div className="left-section">
          <img src={whiteLogo} className="suki-logo"/>SUKI
        </div>

        <div className="right-section">
          <ul className="navigation-bar">
            <div className="search-bar">
              <button className="search-bar__submit">SEARCH</button>
              <input
                type="text"
                className="search-bar__input"
                placeholder="Enter your search"
                aria-label="submit search"
              />
            </div>
            <li className="Create">
              <a href="#">CREATE</a>
            </li>
            <li className="About">
              <a href="#">ABOUT</a>
            </li>
            <li className="Login">
              <Link to="/login">LOGIN</Link>
            </li>
            <li className="Sign-Up">
              <a href="#">SIGN UP</a>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div className="first-slide">
          <div className="ring">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sphere-1"></div>
          <div className="sphere-2"></div>
          <div className="gradient gradient-lg gradient-purple-blue"></div>
          <div className="text">
            <div className="main-text">SUKI</div>
            <div className="secondary-text">The Ultimate Event Creation and Promotion Hub</div>
            <div className="link-button">
              <Link to="/signup" className="sign-up-now">
                SIGN UP NOW!
              </Link>
              <a className="about-us" href="#">
                ABOUT US
              </a>
            </div>
            <div className="under-text">
              This platform is completely <span className="free-text">FREE</span>
            </div>
          </div>
          <section className="container">
            <div className="slider-wrapper">
              <div className="slider">
                <img
                  id="slide-1"
                  src="https://i0.wp.com/bookmypainting.com/wp-content/uploads/2020/02/art-Festival.jpg?resize=795%2C497&ssl=1"
                  alt="Nature Image #1"
                />
                <img
                  id="slide-2"
                  src="https://www.uit.edu.vn/sites/vi/files/uploads/images/202302/image002.jpg"
                  alt="Nature Image #2"
                />
                <img
                  id="slide-3"
                  src="https://danangleisure.com/wp-content/uploads/2022/09/nippon-oi-le-hoi-anime-manga-cosplay-lon-nhat-mien-trung-tai-danang-mikazuki.jpg"
                  alt="Nature Image #3"
                />
              </div>
            </div>
            <div className="slider-nav">
              <a href="#slide-1"></a>
              <a href="#slide-2"></a>
              <a href="#slide-3"></a>
            </div>
          </section>
        </div>
        <div className="second-slide">
          <div className="gradient-1 gradient-lg-1 gradient-purple-blue"></div>
          <div className="gradient-2 gradient-lg-2 gradient-purple-blue"></div>
          <div className="gradient-3 gradient-lg-3 gradient-purple-blue"></div>

          <div className="item-1">
            <div className="large-text">Effortless event planning,</div>
            <div className="large-text">from start to finish</div>
            <div className="small-text">
              We are a go to platform for all organizers and participants out there
            </div>
          </div>
          <div className="item-2">
            <img src="Image/anh1.jpg" className="img-1" alt="Event 1" />
          </div>
          <div className="item-3">
            <div className="tittle">For Organizers</div>
            <div className="context">
              Welcome to suki the ultimate event app in it for all Welcome to suki the ultimate
              event app in it for all We
            </div>
          </div>
          <div className="item-4">
            <div className="tittle">For Participants</div>
            <div className="context">
              Welcome to suki the ultimate event app in it for all Welcome to suki the ultimate
              event app in it for all Welcome to suki the ultimate event app in it for all 
            </div>
          </div>
          <div className="item-5">
            <img src="Image/anh1.jpg" className="img-2" alt="Event 2" />
          </div>
          <div className="item-6">
            <img src="Image/anh1.jpg" className="img-3" alt="Event 3" />
          </div>
          <div className="item-7">
            <div className="tittle">For Guests</div>
            <div className="context">
              Welcome to suki the ultimate event app in it for all Welcome to suki the ultimate
              event app in it f
            </div>
          </div>
        </div>

        <div className="container-discover">
          <h1>Discover, Attend, Connect</h1>
          <div className="container-card">
            <div className="card">
              <img src="#" width="300" height="200" alt="discover" />
              <h2>Full-on Flexibility</h2>
              <p>
                We are a go to ssdf ef sdf sdf sdfsdf sf sdf sdf sdf sdfsdf sdf sdfsdf sdfds sd
                dssd sd d sd sdsd sd sdsd sdf S
              </p>
            </div>
            <div className="card">
              <img src="#" width="300" height="200" alt="discover" />
              <h2>Full-on Flexibility</h2>
              <p>
                We are a go to ssdf ef sdf sdf sdfsdf sf sdf sdf sdf sdfsdf sdf sdfsdf sdfds sd
                dssd sd d sd sdsd sd sdsd sdf S
              </p>
            </div>
          </div>
        </div>

        <div className="container-multiplatform">
          <div className="gradient-4 gradient-lg-4 gradient-purple-blue"></div>
          <div className="gradient-5 gradient-lg-5 gradient-purple-blue"></div>

          <h1>Multiplatform Support</h1>
          <div className="container-card">
            <div className="card">
              <div className="card-background"></div>
              <div className="card-content">
                <h2>Web</h2>
                <p>Use Use Use Use USe Use USe USe USe USe.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-background"></div>
              <div className="card-content">
                <h2>Web</h2>
                <p>Use Use Use Use USe Use USe USe USe USe.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-logo">
          <img
            src="Image/Suki Color Gradient.svg"
            width="400"
            height="400"
            alt="Icon SVG"
            className="suki-img"
          />
          <div className="img-title">
            <h1 className="card-title">SUKI</h1>
            <p>Let's get Suki-ing.</p>
            <form action="/sign-up" method="POST">
              <button type="submit" name="sign-up" value="sign-up">
              <Link to="/signup">
                SIGN UP NOW!
              </Link>
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer className="container-footer">
        <div className="col-1">
          <h3>Contact Us</h3>
          <p>VNU-HCM University Of Science, 227</p>
          <p>Nguyen Van Cu St., Ward 4, District 5,</p>
          <p>Ho Chi Minh City, Vietnam.</p>
          <h3>Hotline</h3>
          <p>0987654321 (Mr. ABC)</p>
          <h3>
            <img src="Image/SukiWhite.svg" width="30" height="30" alt="Icon SVG" className="icon-svg" />
            <span>SUKI</span>
          </h3>
        </div>
        <div className="col-2">
          <h3>Subscribe For New Updates</h3>
          <form method="POST" action="/sign-up">
            <input type="text" placeholder="Email Address" />
            <br />
            <button type="submit" name="Subscribe" value="Subscribe">
              SUBSCRIBE
            </button>
          </form>
          <p>Suki Inc. © 2024 All Rights Reserved</p>
          <p>Introduction to Software Engineering</p>
          <p>22CLC08 - Group 5</p>
        </div>
      </footer>
    </div>
  );
};

export default GuestPage;
