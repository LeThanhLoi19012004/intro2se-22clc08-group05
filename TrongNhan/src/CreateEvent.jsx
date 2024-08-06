import React, {useState,useRef, useEffect} from "react";
import "./CreateEvent.css";
import sukiLogo from './assets/SukiWhite.svg';




function AbstractFigures(){
    return(
        <>
        <span className = "create-event__abstract-container">
            
            <div className = "create-event__gradient-smudge"></div>
            <div className = "create-event__gradient-smudge"></div>
        </span>
        </>
    );
}

function CreateEvent(){
    
    const eventInputRef = useRef(null);
    const profileInputRef = useRef(null);
    const [eventImage, setEventImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [category, setCategory] = useState("0");

    // const [isChecked, setIsChecked] = useState(false);
    const handleEventImageClick = () => {
        eventInputRef.current.click();
      };
    
    const handleProfileImageClick = () => {
        profileInputRef.current.click();
    };

    const handleEventImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setEventImage(imageUrl);
          const imgContainer = document.getElementById('create-event__img-container');
          imgContainer.style.backgroundColor = 'transparent'; // Set to transparent or any desired color
        }
    };
    
    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
        }
    };
    
   
    useEffect(() => {
        const inputs = document.querySelectorAll('input[required], textarea[required]');
        const submitButton = document.getElementById('create-event-button');
        const imgContainer = document.getElementById('create-event__img-container');

        const validateInput = (input) => {
            if (!input.value.trim()) {
                input.style.backgroundColor = '#db6b6b';
            } else {
                input.style.backgroundColor = '';
            }
        };

        const handleInputEvent = (input) => {
            validateInput(input);
        };

        inputs.forEach(input => {
            input.addEventListener('input', () => handleInputEvent(input));
        });

        const validateForm = () => {
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.backgroundColor = '#db6b6b';
                    isValid = false;
                } else {
                    input.style.backgroundColor = '';
                }
            });

            if (!eventImage) {
                imgContainer.style.backgroundColor = "#db6b6b";
                isValid = false;
            } else {
                imgContainer.style.backgroundColor = '';
            }

            return isValid;
        };

        const handleSubmit = (e) => {
            if (!validateForm()) {
                e.preventDefault();
            }
        };

        submitButton.addEventListener('click', handleSubmit);

        return () => {
            submitButton.removeEventListener('click', handleSubmit);
            inputs.forEach(input => {
                input.removeEventListener('input', () => handleInputEvent(input));
            });
        };
    }, [eventImage]);

    const handleForm = (event) => {
        event.preventDefault();

        let form = event.target;
        let formData = new FormData(form);

        if (eventImage) {
            formData.append('eventImage', eventImage);
        }

        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        // Example form data logging
        formData.forEach((value, key) => {
            console.log(key, value);
        });

    
    };


    return(
        <>
        <div className = "create-event__container">
        {/* <AbstractFigures/> */}
        
        <form className = "create-event__form" onSubmit = {handleForm}>
            <div className = "create-event__header-bar">
                <div>
                    <div className="create-event__profile-container" onClick = {handleProfileImageClick}>
                        {profileImage ? (<img src = {profileImage} alt = "profile" />
                        ):(<p></p>)}
                    </div>
                    <input
                        type="file"
                        ref={profileInputRef}
                        style={{ display: "none" }}
                        onChange={handleProfileImageChange}
                        name = "event-profile"
                    />
                    <p>Create Under <span>UserName</span></p>
                </div>
                <div className = "create-event__logo-container">
                    <img src = {sukiLogo}/>
                </div>
            </div>
            <input  required 
                    name = "event-name" 
                    type = "text" 
                    id = "event-name" 
                    className = "create-event__event-name" 
                    placeholder='Event Name'
                    maxLength="50"/>
            <div className = "create-event__description-container">
                <label htmlFor="description">Description</label>
                <textarea 
                    maxLength = "250" 
                    name = "description" 
                    id = "description" 
                    placeholder='250 word limit'
                    />
            </div>
            <div className = "create-event__rules-container">
                <label htmlFor="rules">Rules</label>
                <textarea 
                    maxLength = "250" 
                    name = "rules" 
                    id = "rules" 
                    placeholder='(if any)'

                    />
            </div>
            <div className = "create-event__date-n-time-container">
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
            <div className = "create-event__category-container"> 
                <label htmlFor = "category">Category</label>
                <select name = "event-type" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value = "0">Charity</option>
                    <option value = "1">Meeting</option>
                    <option value = "2">Team Building</option>
                    <option value = "3">Music</option>
                    <option value = "4">Festival</option>
                </select>
            </div>
            <div className = "create-event__location-container"> 
                <label htmlFor = "location">Location</label>
                <input  required 
                        name = "location" 
                        type = "text" 
                        id = "location" 
                        className = "create-event__location"
                        placeholder='Detailed Location'/>
            </div>
            
            <div className = "create-event__participant-container"> 
                <label htmlFor = "participant">Participants </label>
                <input  required name = "participant" type = "number" id = "participant" className = "create-event__participant" placeholder='Capacity'min = {0}
                        readOnly = {category === '3' || category === '4'}
                        style={{ opacity: (category === '3' || category === '4') ? '0.5' : '' }}

                />
            </div>
            <div className = "create-event__ticket-container">
                <p>Tickets</p>
                <div>
                    <input  type="number" name="quantity" id="ticket-quantity" placeholder="Quantity" min={0} 
                            readOnly={category === '0' || category === '1' || category === '2'} 
                            style={{ opacity: (category === '0' || category === '1' || category === '2') ? '0.5' : '' }}
                    />
                    <select name = "ticket-type" readOnly={category === '0' || category === '1' || category === '2'}   style={{ opacity: (category === '0' || category === '1' || category === '2') ? '0.5' : '' }}>
                        <option value="0">Paid</option>
                        <option value="1">Free</option>
                        <option value="2">Donation</option>
                    </select>
                    <input  type="number" name="ticket-price" id="ticket-price" placeholder="Price" min={0} 
                            readOnly={category === '0' || category === '1' || category === '2'} 
                            style={{ opacity: (category === '0' || category === '1' || category === '2') ? '0.5' : '' }}/>
                </div>
            </div>
            <div className = "create-event__logo">
                <div className = "img-container" id = "create-event__img-container">
                {eventImage ? (<img src = {eventImage} alt = "Event" />
                    ):(<p></p>)}

                </div>
                <input
                    type="file"
                    ref={eventInputRef}
                    style={{ display: "none" }}
                    onChange={handleEventImageChange}
                    name = "event-logo"
                    required
                />
                <div className = "create-event__upload-delete-container">
                    <button className = "upload" id = "upload" type = "button" onClick = {handleEventImageClick}>Upload</button>
                    <button className = "delete" id = "delete" type = "button" onClick = {()=>setEventImage(null)}>Delete</button>

                </div>
                
            </div>
            <div className = "create-event__submit-container">
                    <button type = "submit" className = "create-event__button" id = "create-event-button">Create Event</button>
                </div>
        </form>
        </div>
        </>
    );

};

export default CreateEvent;

