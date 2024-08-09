import React, { useState, useEffect } from "react";
import "../assets/SearchPage.css";
import NavBar from "../components/NavBar.jsx";
import SukiGreen from "../assets/Logo/SukiColor.svg";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchEvent } from "../API.js";

function Loading() {
    return (
        <div className="loading__typing-indicator">
            <div className="loading__typing-circle"></div>
            <div className="loading__typing-circle"></div>
            <div className="loading__typing-circle"></div>
            <div className="loading__typing-shadow"></div>
            <div className="loading__typing-shadow"></div>
            <div className="loading__typing-shadow"></div>
        </div>
    );
}

function Result(props) {
    return (
        <div className="searchpage__result">
            <div className="searchpage__result-author-img">
                <img src={`data:${props.profileImg.contentType};base64,${props.profileImg.imageBase64}`} alt="Profile img" />
            </div>
            <div className="searchpage__result_content">
                <h3>{props.authorName}</h3>
                <p>{props.content}</p>
            </div>
        </div>
    );
}

function NoResults() {
    return (
        <div className="searchpage__no-results">
            <h2>No Results Found</h2>
            <p>Sorry, but we couldn't find any events matching your search criteria.</p>
        </div>
    );
}

function SearchPage() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q')?.toLowerCase() || "";

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await searchEvent(); // Fetch all events
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const filterEvents = () => {
            const filtered = events.filter(event => {
                const eventDate = new Date(event.eventdate);
                const matchesQuery = event.eventname.toLowerCase().includes(searchQuery);
                const matchesCategory = selectedCategory ? event.eventtype === selectedCategory : true;
                const matchesDateRange = (!startDate || eventDate >= startDate) && (!endDate || eventDate <= endDate);

                return matchesQuery && matchesCategory && matchesDateRange;
            });
            setFilteredEvents(filtered);
        };
        filterEvents();
    }, [events, searchQuery, selectedCategory, startDate, endDate]);

    const categories = [
        'Music',
        'Charity',
        'Teambuilding',
        'Festival',
        'Meeting'
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategory(prevCategory => prevCategory === category ? null : category);
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

    const clearStartDate = () => setStartDate(null);
    const clearEndDate = () => setEndDate(null);

    return (
        <div className="searchpage__main-container">
            <NavBar authorImg={SukiGreen} />
            <div className="searchpage__container">
                <div className="searchpage__leftbar">
                    <div className="searchpage__menu-item" onClick={() => { window.scrollTo(0, 0); window.location.reload(); }} style={{ cursor: "pointer" }}>
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
                    {loading ? (
                        <Loading />
                    ) : filteredEvents.length === 0 ? (
                        <NoResults />
                    ) : (
                        filteredEvents.map((event) => (
                            <Result
                                key={event._id} // Add a unique key for each result
                                profileImg={event.logoevent}
                                authorName={event.eventname}
                                content={event.descriptionevent}
                            />
                        ))
                    )}
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
                                                checked={selectedCategory === category}
                                                onChange={() => handleCategoryChange(category)}
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
                                    <button type="button" className="searchpage__clear-button" onClick={clearStartDate}>Clear</button>
                                </div>
                                <label htmlFor="searchpage__end-date" className="searchpage__label">End: </label>
                                <div className="searchpage__datepicker-container">
                                    <DatePicker
                                        id="end-date"
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        placeholderText="mm/dd/yyyy"
                                        className="searchpage__input"
                                        minDate={startDate}
                                    />
                                    <button type="button" className="searchpage__clear-button" onClick={clearEndDate}>Clear</button>
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
