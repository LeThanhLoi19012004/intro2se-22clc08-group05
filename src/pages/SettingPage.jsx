import React, { useState } from "react";
import "../assets/SettingPage.css";

function Account() {
  return (
    <form className="settingpage-account">
      <div className="settingpage-account-header">
        <h1 className="settingpage-account-title">Account Setting</h1>
        <div className="settingpage-btn-container">
          <button type="button" className="settingpage-btn-cancel">
            Cancel
          </button>
          <button type="button" className="settingpage-btn-save">
            Save
          </button>
        </div>
      </div>
      <div className="settingpage-account-edit">
        <div className="settingpage-input-container">
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div className="settingpage-input-container">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
        </div>
      </div>
      <div className="settingpage-account-edit">
        <div className="settingpage-input-container">
          <label>Email</label>
          <input type="text" placeholder="Email" />
        </div>
        <div className="settingpage-input-container">
          <label>Phone number</label>
          <input type="text" placeholder="Phone number" />
        </div>
      </div>
      <div className="settingpage-account-edit">
        <div className="settingpage-input-container">
          <label>Address</label>
          <textarea placeholder="Address"></textarea>
        </div>
      </div>
    </form>
  );
}

function Notification() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="settingpage-notification">
      <h1 className="settingpage-notification-title">Notification Setting</h1>
      <div className="settingpage-toggle-container">
        <label className="settingpage-toggle-label">
          Receive Notifications
        </label>
        <input
          type="checkbox"
          className="settingpage-toggle"
          checked={notificationsEnabled}
          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
        />
      </div>
    </div>
  );
}

function Setting() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <div className="settingpage-setting">
      <h1 className="settingpage-setting-title">Settings</h1>
      <div className="settingpage-toggle-container">
        <label className="settingpage-toggle-label">Dark Mode</label>
        <input
          type="checkbox"
          className="settingpage-toggle"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
      <div className="settingpage-language-container">
        <label className="settingpage-language-label">Language</label>
        <select
          className="settingpage-language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
      </div>
    </div>
  );
}

function Logout() {
  const handleLogout = () => {
    // Add logout logic here
    alert("Logged out!");
  };

  return (
    <div className="settingpage-logout">
      <h1 className="settingpage-logout-title">Logout</h1>
      <p className="settingpage-logout-message">
        Are you sure you want to log out?
      </p>
      <div className="settingpage-btn-container">
        <button
          type="button"
          className="settingpage-btn-cancel"
          onClick={() => alert("Cancelled")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="settingpage-btn-save"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function ProfileSetting() {
  const [activeSection, setActiveSection] = useState("Account");

  const renderSection = () => {
    switch (activeSection) {
      case "Account":
        return <Account />;
      case "Notification":
        return <Notification />;
      case "Setting":
        return <Setting />;
      case "Logout":        
        return <Logout />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="settingpage-container">
      <div className="settingpage-profile">
        <div className="settingpage-profile-header">
          <img
            src="2.png"
            alt="profile-img"
            className="settingpage-profile-img"
          />
          <div className="settingpage-profile-text-container">
            <h1 className="settingpage-profile-title">Nhan Nguyen</h1>
            <p className="settingpage-profile-email">abc@gmail.com</p>
          </div>
        </div>
        <div className="settingpage-menu">
          <a
            href="#"
            className={`settingpage-menu-link ${
              activeSection === "Account" ? "settingpage-active" : ""
            }`}
            onClick={() => setActiveSection("Account")}
          >
            <i className="fa-solid fa-circle-user settingpage-menu-icon"></i>
            Account
          </a>
          <a
            href="#"
            className={`settingpage-menu-link ${
              activeSection === "Notification" ? "settingpage-active" : ""
            }`}
            onClick={() => setActiveSection("Notification")}
          >
            <i className="fa-solid fa-bell settingpage-menu-icon"></i>
            Notification
          </a>
          <a
            href="#"
            className={`settingpage-menu-link ${
              activeSection === "Setting" ? "settingpage-active" : ""
            }`}
            onClick={() => setActiveSection("Setting")}
          >
            <i className="fa-solid fa-gear settingpage-menu-icon"></i>
            Setting
          </a>
          <a
            href="#"
            className={`settingpage-menu-link ${
              activeSection === "Logout" ? "settingpage-active" : ""
            }`}
            onClick={() => setActiveSection("Logout")}
          >
            <i className="fa-solid fa-right-from-bracket settingpage-menu-icon"></i>
            Logout
          </a>
        </div>
      </div>
      {renderSection()}
    </div>
  );
}

export default ProfileSetting;
