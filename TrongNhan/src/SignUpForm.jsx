import React, {useState, useEffect} from 'react'
import logo from './assets/SukiWhite.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link



import './SignUpForm.css'
function AbstractFigures(){
    return(
        <>
        <span className = "sign-up__abstract-container">
            
            <div className = "sign-up__gradient-smudge"></div>
            <div className = "sign-up__gradient-smudge"></div>
        </span>
        </>
    );
}
function SignUpForm(){
    
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(true); // Reset password match status on change
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(true); // Reset password match status on change
    };

    useEffect(() => {
        const inputs = document.querySelectorAll('input[required]');
        const submitButton = document.getElementById('sign-up__button');

        const validateInput = (input) => {
            if (!input.value.trim()) {
                input.style.backgroundColor = '#db6b6b';
            } else {
                input.style.backgroundColor = '';
            }
        };

        const validatePasswords = () => {
            if (password && confirmPassword && password !== confirmPassword) {
                document.getElementById('confirmPassword').style.backgroundColor = '#db6b6b';
                setPasswordMatch(false);
            } else {
                document.getElementById('confirmPassword').style.backgroundColor = '';
                setPasswordMatch(true);
            }
        };

        const handleInputEvent = (input) => {
            validateInput(input);
            if (input.id === 'password' || input.id === 'confirmPassword') {
                validatePasswords();
            }
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

            validatePasswords();

            if (!passwordMatch) {
                isValid = false;
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
    }, [password, confirmPassword, passwordMatch]);

    const handleForm = (event) => {
        event.preventDefault();

        let form = event.target;
        let formData = new FormData(form);

        // Example form data logging
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    };
    
   
    

    return(
        <>
        <div className = "sign-up__container">
        {/* <AbstractFigures className = "sign-up-form-abstract"/> */}
            <form className = "sign-up__form" onSubmit = {handleForm} action="/sign-up" method="POST">
                <div className = "logo-container">
                    <img src = {logo}/>
                </div>

                <input  required
                        name = "username" 
                        type = "text" 
                        className = "sign-up__username" 
                        placeholder='Username'/>

                <input  required 
                        name = "email" 
                        type = "email" 
                        className = "sign-up__email" 
                        placeholder='Email'/>
                <input  required 
                        id="password" 
                        name="password" 
                        className="sign-up__password" 
                        placeholder="Password" 
                        type="password" 
                        onChange={handlePasswordChange} />
                <input  required 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        className="sign-up__password" 
                        placeholder="Confirm Password" 
                        type="password" 
                        onChange={handleConfirmPasswordChange} />
                {!passwordMatch && <p className="sign-up__error-text">Passwords do not match!</p>}

                <div className = "sign-up__term-n-condition-container">
                    <label htmlFor = "term-n-condition">
                        <svg 
                            className = {`checkbox ${isChecked ? "checked--active" : ""}`} 
                            aria-hidden = "true"
                            viewBox= "0 0 15 11"
                            fill = "none">
                            <path 
                                d = "M1 4.5L5 9L14 1"
                                strokeWidth = "2"
                                stroke = {isChecked ? "#fff" : "none"}
                                />
                            </svg>

                        <input 
                            required
                            type = "checkbox" 
                            id = "term-n-condition" 
                            name = "term-n-condition" 
                            onChange={() =>{setIsChecked(!isChecked)}}/>
                    </label>
                    <div>I agree with the Terms and Conditions of the Suki Event Management Platform and responsible for the information provided in this form.</div>

                </div>
                <button className = "sign-up__button" type = "submit" name = "sign-up__button" id = "sign-up__button">Sign Up</button>

                <div className = "sign-up__already-have-account-container">
                    <span>Already have an account ?</span>
                    <Link to = "/login" href = "#" className = "sign-up__login-now" >Log in Now!</Link>
                </div>
            </form>
        </div>
        </>
    );
}

export default SignUpForm;