import React, { useState } from 'react';
import logo from '../assets/SukiWhite.svg';
import { useNavigate } from 'react-router-dom';
import '../assets/SignUpPage.css';
import { sendSignupRequest } from '../API';

function AbstractFigures() {
    return (
        <>
            <span className="sign-up__abstract-container">
                <div className="sign-up__abstract-triangle">
                    <div className="sign-up__edge1" />
                    <div className="sign-up__edge2" />
                    <div className="sign-up__edge3" />
                </div>
                <div className="sign-up__abstract-triangle">
                    <div className="sign-up__edge1" />
                    <div className="sign-up__edge2" />
                    <div className="sign-up__edge3" />
                </div>
                <div className="sign-up__abstract-triangle">
                    <div className="sign-up__edge1" />
                    <div className="sign-up__edge2" />
                    <div className="sign-up__edge3" />
                </div>
                <div className="sign-up__abstract-polyline">
                    <div className="sign-up__line1" />
                    <div className="sign-up__line2" />
                    <div className="sign-up__line3" />
                </div>
                <div className="sign-up__abstract-circle">
                    <div className="sign-up__lighting" />
                </div>
                <div className="sign-up__gradient-smudge"></div>
                <div className="sign-up__gradient-smudge"></div>
            </span>
        </>
    );
}

function SignUpForm() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (!(form instanceof HTMLFormElement)) {
            console.error('Form is not an instance of HTMLFormElement');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        // Proceed with form submission
        const formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        const response = await sendSignupRequest(formDataObj);
        console.log(response);
        if (response.success)
          navigate('/mainpage');
        else{
          console.log(response);
      }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(true); // Reset password match status on change
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(true); // Reset password match status on change
    };

    return (
        <div className="sign-up__form-container">
            <AbstractFigures className="sign-up-form-abstract" />
            <form className="sign-up__form" onSubmit={handleSubmit} action="/sign-up" method="POST">
                <div className="logo-container">
                    <img src={logo} alt="Logo" />
                </div>
                <input type="text" className="sign-up__username" placeholder="Username" name="username" />
                <input type="text" className="sign-up__name" placeholder="Name" name="name" />
                <input type="date" className="sign-up__dob" placeholder="Date of Birth" name="dob" />
                <input type="email" className="sign-up__email" placeholder="Email" name="email" />
                <input id="password" name="password" className="sign-up__password" placeholder="Password" type="password" onChange={handlePasswordChange} />
                <input id="confirmPassword" name="confirmPassword" className="sign-up__password" placeholder="Confirm Password" type="password" onChange={handleConfirmPasswordChange} />
                {!passwordMatch && <p className="sign-up__error-text">Passwords do not match!</p>}
                <button className="sign-up__button" type="submit" name="submit">Sign Up</button>
                <div className="sign-up__already-have-account-container">
                    <span>Already have an account?</span>
                    <a href="#" className="sign-up__login-now">Log in Now!</a>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;
