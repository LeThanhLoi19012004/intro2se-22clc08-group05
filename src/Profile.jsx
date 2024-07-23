import React, {useState,useRef, useEffect} from "react";
import "./Profile.css";
import sukiLogo from './assets/SukiWhite.svg';




function Profile(){
    const eventInputRef = useRef(null);
    const profileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);


    
    const handleProfileImageClick = () => {
        profileInputRef.current.click();
    };
    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
        }
    };
    return (
        <>
            <div className = "profile__container">
                <form className = "profile__form">
                    <div className = "profile__header-bar"> 
                        <div>
                            <div className  = "profile__profile-container"  onClick = {handleProfileImageClick}>
                                {profileImage ? (<img src = {profileImage} alt = "profile" />
                                ):(<p></p>)}
                            </div>
                            <input
                                type="file"
                                ref={profileInputRef}
                                style={{ display: "none"}}
                                onChange={handleProfileImageChange}
                                name = "event-profile"
                            />
                            <p>Create Under <span>UserName</span></p>
                        </div>
                        <div className = "profile__logo-container">
                            <img src = {sukiLogo} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );


}
export default Profile;