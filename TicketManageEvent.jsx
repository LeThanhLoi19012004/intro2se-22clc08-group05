import React, { useState, useEffect, useCallback} from "react";
import "../assets/ManageEvent.css";
import { useNavigate } from "react-router-dom";
import { renderProfile, updateProfile, ChangeAvatar } from '../API';
import { FaCamera } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Navbar from "../components/NavBar";

const ProfileImage = ({ initialUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialUrl != null ? `data:${initialUrl.contentType};base64,${initialUrl.imageBase64}` : "https://cdn-icons-png.flaticon.com/512/3682/3682281.png");
  const [newImageFile, setNewImageFile] = useState(null);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };  

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };
  const handleChangeAva = async () => {
    const formData = new FormData();
    formData.append('idaccount', localStorage.getItem("UserID")); // Thêm idaccount vào dữ liệu
    formData.append('avatar', newImageFile); // Thêm file vào dữ liệu
    const response = await ChangeAvatar(formData);
    if (response.success)
      setIsPopupOpen(false);
  }
  const handleClosePopup = async () => {
    setIsPopupOpen(false);
    setIsHovered(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setNewImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.jpg', '.svg', '.gif']
    },
  });

  return (
    <div>
      <div
        className={`manage-event-page-profile-image-container ${isHovered ? 'manage-event-page-hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleImageClick}
      >
        <img
          src={imageUrl}
          alt="profile-img"
          className="manage-event-page-profile-img"
        />
        {isHovered && (
          <div className="manage-event-page-edit-overlay">
            <FaCamera className="manage-event-page-edit-icon" />
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className="manage-event-page-popup">
          <div className="manage-event-page-popup-content">
            <button onClick={handleClosePopup} className="manage-event-page-close-button">×</button>
            <h2>Upload a New Avatar</h2>
            <div className="manage-event-page-avatar-preview" {...getRootProps()}>
              <input {...getInputProps()} />
              <img src={imageUrl} alt="Avatar Preview" className="manage-event-page-avatar-image" />
            </div>
            <button className="manage-event-page-save-button" onClick={handleChangeAva}>Save</button>
            <button className="manage-event-page-cancel-button" onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

function Account({ profile }) {
  const [formData, setFormData] = useState({
    fullname: profile.fullname || '',
    dob: profile.dob ? new Date(profile.dob) : null,
    sex: profile.sex || '',
    phone: profile.phone || '',
    address: profile.hometown || '',
  });

  const [changes, setChanges] = useState({});

  useEffect(() => {
    // Initialize formData with profile data
    setFormData({
      idaccount: profile.idaccount,
      fullname: profile.fullname || '',
      dob: profile.dob ? new Date(profile.dob) : null,
      sex: profile.sex || '',
      phone: profile.phone || '',
      address: profile.hometown || '',
    });
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      dob: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare updatedChanges with the entire formData
    const updatedChanges = { ...formData };
  
    // Update state with the current changes
    setChanges(updatedChanges);
    try {
      // Send the updatedChanges to your API
      const response = await updateProfile(updatedChanges);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  
  return (
    <form className="manage-event-page-account" onSubmit={handleSubmit}>
      <div className="manage-event-page-account-header">
        <h1 className="manage-event-page-account-title">Event Name</h1>
        <div className="manage-event-page-btn-container">
          <button type="button" className="manage-event-page-btn-cancel">
            Cancel
          </button>
          <button type="submit" className="manage-event-page-btn-save">
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="manage-event-page-account-edit">
              <input  required 
                            name = "event-name" 
                            type = "text" 
                            id = "event-name" 
                            className = "manage-event-page__event-name" 
                            placeholder='Event Name'
                            maxLength="50"/>
              <div className = "manage-event-page__description-container">
                  <label htmlFor="description">Description</label>
                  <textarea 
                      maxLength = "250" 
                      name = "description" 
                      id = "description" 
                      placeholder='250 word limit'
                      />
              </div>
              <div className = "manage-event-page__rules-container">
                  <label htmlFor="rules">Rules</label>
                  <textarea 
                      maxLength = "250" 
                      name = "rules" 
                      id = "rules" 
                      placeholder='(if any)'

                      />
              </div>
              <div className = "manage-event-page__date-n-time-container">
                  <p>Date & Time</p>
                  <div>
                      <input  required 
                              name = "event-date" 
                              type = "date" 
                              id = "event-date" />
                      <input  required 
                              name = "event-time" 
                              type = "time" 
                              id = "event-time" />
                  </div>
              </div> 
              <div className = "manage-event-page__category-container"> 
                <label htmlFor = "category">Category</label>
                <select name = "event-type">
                </select>
            </div>
              <div className = "manage-event-page__location-container"> 
                  <label htmlFor = "location">Location</label>
                  <input  required 
                          name = "location" 
                          type = "text" 
                          id = "location" 
                          className = "manage-event-page__location"
                          placeholder='Detailed Location'/>
              </div>
              
              <div className = "manage-event-page__participant-container"> 
                <label htmlFor = "participant">Participants </label>
                <input name = "participant" type = "number" id = "participant"
                      className = "manage-event-page__participant" placeholder='Capacity'
                />
              </div>
              <div className = "manage-event-page__ticket-container">
                  <p>Tickets</p>
                  <div>
                      <input type="number" name="quantity" id="ticket-quantity" placeholder="Quantity"/>
                      <select name = "ticket-type">
                          <option value="0">Paid</option>
                          <option value="1">Free</option>
                          <option value="2">Donation</option>
                      </select>
                      <input  type="number" name="ticket-price" id="ticket-price" placeholder="Price"/>
                  </div>
              </div>
              <div className = "manage-event-page__logo">
                  <div className = "img-container" id = "manage-event-page__img-container">
                  </div>
                  <div className = "manage-event-page__upload-delete-container">
                    <button className = "upload" id = "upload" type = "button">Upload</button>
                    <button className = "delete" id = "delete" type = "button">Delete</button>
                  </div>
              </div>
          </div>
          <div className="manage-event__copy-right-msg">
              <img src="#" alt="" />
              <p>Suki Corporation © 2024</p>
            </div>
    </form>
  );
}

function Notification() {
  const [notifications, setNotifications] = useState({
    importantAnnouncementsEmail: true,
    importantAnnouncementsSite: false,
    featureAnnouncementsEmail: true,
    featureAnnouncementsSite: false,
    awardNotificationEmail: true,
    awardNotificationSite: true,
    newFollowersEmail: false,
    newFollowersSite: false,
    newParticipantsEmail: false,
    newParticipantsSite: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };
  const [isCheckedFollowedEvent, setIsCheckedFollowedEvent] = useState(false);
  const [isCheckedJoinedEvent, setIsCheckedJoinedEvent] = useState(false);
  const [isCheckedComingEvent, setIsCheckedComingEvent] = useState(false);
  const [isCheckedNewFollowers, setIsCheckedNewFollowers] = useState(false);
  const [isCheckedNewParticipants, setIsCheckedNewParticipants] = useState(false);

  return (
    <div className="manage-event-page-account">
      <div className="manage-event-page-account-header">
        <h1 className="manage-event-page-account-title">Followers</h1>
      </div>
      <div className="manage-event-page-notification-content">
        <div className = "manage-event-page-notification-content__popup-field-follower">
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
            <div className="manage-event-page-profile-header">
                <ProfileImage />
                <div className="manage-event-page-profile-text-container">
                    <h1 className="manage-event-page-profile-title">Username</h1>
                    <p className="manage-event-page-profile-email">Organizor</p>
                </div>
            </div>
        </div>
        
        <div className="manage-event__copy-right-msg">
          <img src="#" alt="" />
          <p>Suki Corporation © 2024</p>
        </div>
      </div>
    </div>
  );
}

function Setting() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleTogglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
    setError('');
  };

  const handleDarkModeChange = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
    } else {
      setError('');
      window.location.reload();
    }
  };

  return (
    <div className="manage-event-page-account">

      <div className="manage-event-page-account-header">
        <h1 className="manage-event-page-account-title">Tickets</h1>
      </div>
      <div className="manage-event-page-setting-content">
        <div className = "manage-event-page-setting-content__popup-field-tickets">
            <div className = "manage-event-page-setting-content__user-and-ticket">
                <div className="manage-event-page-profile-header">
                    <ProfileImage />
                    <div className="manage-event-page-profile-text-container">
                        <h1 className="manage-event-page-profile-title">Username</h1>
                        <p className="manage-event-page-profile-email">Organizor</p>
                    </div>
                </div>
                <button className="ticket-amount">2 Tickets</button> 
            </div>
            <div className = "manage-event-page-setting-content__user-and-ticket">
                <div className="manage-event-page-profile-header">
                    <ProfileImage />
                    <div className="manage-event-page-profile-text-container">
                        <h1 className="manage-event-page-profile-title">Username</h1>
                        <p className="manage-event-page-profile-email">Organizor</p>
                    </div>
                </div>
                <button className="ticket-amount">2 Tickets</button> 
            </div>
            <div className = "manage-event-page-setting-content__user-and-ticket">
                <div className="manage-event-page-profile-header">
                    <ProfileImage />
                    <div className="manage-event-page-profile-text-container">
                        <h1 className="manage-event-page-profile-title">Username</h1>
                        <p className="manage-event-page-profile-email">Organizor</p>
                    </div>
                </div>
                <button className="ticket-amount">2 Tickets</button> 
            </div>
            <div className = "manage-event-page-setting-content__user-and-ticket">
                <div className="manage-event-page-profile-header">
                    <ProfileImage />
                    <div className="manage-event-page-profile-text-container">
                        <h1 className="manage-event-page-profile-title">Username</h1>
                        <p className="manage-event-page-profile-email">Organizor</p>
                    </div>
                </div>
                <button className="ticket-amount">2 Tickets</button> 
            </div>
            <div className = "manage-event-page-setting-content__user-and-ticket">
                <div className="manage-event-page-profile-header">
                    <ProfileImage />
                    <div className="manage-event-page-profile-text-container">
                        <h1 className="manage-event-page-profile-title">Username</h1>
                        <p className="manage-event-page-profile-email">Organizor</p>
                    </div>
                </div>
                <button className="ticket-amount">2 Tickets</button> 
            </div>
            <div className = "manage-event-page-setting-content__user-and-ticket">
                <div className="manage-event-page-profile-header">
                    <ProfileImage />
                    <div className="manage-event-page-profile-text-container">
                        <h1 className="manage-event-page-profile-title">Username</h1>
                        <p className="manage-event-page-profile-email">Organizor</p>
                    </div>
                </div>
                <button className="ticket-amount">2 Tickets</button> 
            </div>
        </div>
        <div className="manage-event__copy-right-msg">
          <img src="#" alt="" />
          <p>Suki Corporation © 2024</p>
        </div>
      </div>
    </div>
  );
}


function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="manage-event-page-account">
      <div className="manage-event-page-account-header">
        <h1 className="manage-event-page-account-title">Cancel</h1>
      </div>
      <div className="manage-event-page-logout-content">
        <h2 className="manage-event-page-account-question">Do you want to cancel the event?</h2>
        <button className="manage-event-page-account-button" onClick={handleLogout}><span>Cancel</span></button>
      </div>
      <div className="manage-event__copy-right-msg">
          <img src="#" alt="" />
          <p>Suki Corporation © 2024</p>
      </div>
    </div>
  );
}

function Main(){
  const navigate = useNavigate();

  // Redirect to the main page when this component renders
  useEffect(() => {
    navigate('/mainpage');
  }, [navigate]);
  return (
    null // This component does not render anything
  );
}

function TicketManageEvent() {
  const [activeSection, setActiveSection] = useState("Account");
  const [url, setUrl] = useState( "https://cdn-icons-png.flaticon.com/512/3682/3682281.png")
  const [profile, setProfile] = useState({idaccount: {username: "user", email: "email"}});
  const [loading, setLoading] = useState(false);
  const idaccount = localStorage.getItem("UserID");
  useEffect(() => {
    const getPrf = async () => {
      const response = await renderProfile({idaccount});
      if (response.success){
        setUrl(response.data.avatar);
        setProfile(response.data);
      }
      setLoading(true)
    }
    getPrf();
  }, [])
  const renderSection = () => {
    switch (activeSection) {
      case "Account":
        return <Account profile={profile}/>;
      case "Notification":
        return <Notification />;
      case "Setting":
        return <Setting />;
      case "Logout":        
        return <Logout />;
      case "Main":
        return <Main />;
      default:
        return <Account />;
    }
  };

  return loading && (
    <div className="manage-event-page-container">
      <Navbar className = "manage-event-page_navbar"/>

      <div className="manage-event-page-profile">
        <div className="manage-event-page-profile-header">
        <ProfileImage initialUrl={url} />
          <div className="manage-event-page-profile-text-container">
            <h1 className="manage-event-page-profile-title">{profile.idaccount.username}</h1>
            <p className="manage-event-page-profile-email">{profile.idaccount.email}</p>
          </div>
        </div>
        <div className="manage-event-page-menu">
          <a
            className={`manage-event-page-menu-link ${
              activeSection === "Account" ? "manage-event-page-active" : ""
            }`}
            onClick={() => setActiveSection("Account")}
          >
            <i className="fa-solid fa-circle-user manage-event-page-menu-icon"></i>
            Main Info
          </a>
          <a
            className={`manage-event-page-menu-link ${
              activeSection === "Notification" ? "manage-event-page-active" : ""
            }`}
            onClick={() => setActiveSection("Notification")}
          >
            <i className="fa-solid fa-bell manage-event-page-menu-icon"></i>
            Followers
          </a>
          <a
            className={`manage-event-page-menu-link ${
              activeSection === "Setting" ? "manage-event-page-active" : ""
            }`}
            onClick={() => setActiveSection("Setting")}
          >
            <i className="fa-solid fa-gear manage-event-page-menu-icon"></i>
            Tickets
          </a>
          <a
            className={`manage-event-page-menu-link ${
              activeSection === "Logout" ? "manage-event-page-active" : ""
            }`}
            onClick={() => setActiveSection("Logout")}
          >
            <i className="fa-solid fa-right-from-bracket manage-event-page-menu-icon"></i>
            Cancel
          </a>
          <a
            className={`manage-event-page-menu-link ${
              activeSection === "Main" ? "manage-event-page-active" : ""
            }`}
            onClick={() => setActiveSection("Main")}
          >
            <i className="fa-solid fa-circle-user manage-event-page-menu-icon"></i>
            Back to Home
          </a>
        </div>
      </div>
      {renderSection()}
    </div>
  );
}

export default TicketManageEvent;