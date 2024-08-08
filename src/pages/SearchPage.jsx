import React, { useState } from "react";
import "../assets/SearchPage.css";
import NavBar from "../components/NavBar.jsx";
import SukiGreen from "../assets/Logo/SukiColor.svg";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Result(props) {
  return (
    <div className="searchpage__result">
      <div className="searchpage__result-author-img">
        <img src={props.profileImg} alt="Profile img" />
      </div>
      <div className="searchpage__result_content">
        <h3>{props.authorName}</h3>
        <p>{props.commentText}</p>
      </div>
    </div>
  );
}

function SearchPage() {
    const handleClickMain = () => {
        window.scrollTo(0, 0);
        window.location.reload();
    };

    const categories = [
        'Music',
        'Charity',
        'Teambuilding',
        'Festival',
        'Meeting'
    ]; 
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleCheckboxChange = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [category]
        );
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        if (startDate && date >= startDate) {
            setEndDate(date);
        } else {
            alert("End date must be greater than or equal to start date");
        }
    };

    return (
        <div className="searchpage__main-container">
            <NavBar authorImg={SukiGreen} />
            <div className="searchpage__container">
                <div className="searchpage__leftbar">
                    <div className="searchpage__menu-item" onClick={handleClickMain} style={{ cursor: "pointer" }}>
                        <span className="searchpage__icon">🏠</span>
                        <span className="searchpage__text">Trang chủ</span>
                    </div>
                    <div className="searchpage__menu-item">
                        <span className="searchpage__icon">❤️</span>
                        <span className="searchpage__text">Yêu thích</span>
                    </div>
                    <div className="searchpage__space"></div>
                    <div className="searchpage__menu-item create-event">
                        <Link to="/createvent">
                            <span className="searchpage__icon">🗓️</span>
                            <span className="searchpage__text">Tạo event</span>
                        </Link>
                    </div>
                    <div className="searchpage__menu-item">
                        <span className="searchpage__icon">⚙️</span>
                        <span className="searchpage__text">Cài đặt</span>
                    </div>
                </div>
                <div className="searchpage__centerbar">
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                    <Result />
                </div>
                <div className="searchpage__rightbar">
                    <div className="searchpage__sidebar">
                        <div className="searchpage__filter-section">
                            <h3 className="searchpage__title">Filter</h3>
                            <div className="searchpage__category">
                                <h4 className="searchpage__subtitle">Category</h4>
                                <ul className="searchpage__category-list">
                                    {categories.map((category, index) => (
                                        <li key={index} className="searchpage__category-item">
                                            <input
                                                type="checkbox"
                                                id={`searchpage__category-${index}`}
                                                className="searchpage__checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCheckboxChange(category)}
                                            />
                                            <label htmlFor={`searchpage__category-${index}`} className="searchpage__label">
                                                {category}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="searchpage__date">
                                <h4 className="searchpage__subtitle">Date</h4>
                                <label htmlFor="searchpage__start-date" className="searchpage__label">Start: </label>
                                <div className="searchpage__datepicker-container">
                                    <DatePicker
                                        id="start-date"
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        placeholderText="mm/dd/yyyy"
                                        className="searchpage__input"
                                    />
                                </div>
                                <label htmlFor="searchpage__end-date" className="searchpage__label">End: </label>
                                <div className="searchpage__datepicker-container">
                                    <DatePicker
                                        id="end-date"
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        placeholderText="mm/dd/yyyy"
                                        className="searchpage__input"
                                        minDate={startDate}  // This ensures that the end date cannot be before the start date
                                    />
                                </div>
                            </div>
                            <div className="searchpage__location">
                                <h4 className="searchpage__subtitle">Location</h4>
                                <input
                                    type="text"
                                    placeholder="Input Location here"
                                    className="searchpage__input"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
