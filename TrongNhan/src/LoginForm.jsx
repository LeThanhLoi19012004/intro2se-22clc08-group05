import {react, useState} from "react";
import "./LoginForm.css"
import ellipse7 from "./assets/Ellipse 7-1.svg";
import ellipse9 from "./assets/Ellipse 9-1.svg";
import { Link } from 'react-router-dom';

function AbstractFigures(){

    return(
        <>
            <span className = "login-abstract-container">
                <img src = {ellipse7} className = "ellipse7"/>
                
                {/* <div className = "blur-circle-1"/>
                <div className = "blur-circle-2"/> */}
   
                {/* <img src = {ellipse9} className = "ellipse9"/> */}

            </span>
        </>
    );
}
function LoginForm (){
    const [isChecked, setIsChecked] = useState(false);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.style.backgroundColor = 'none'; // Change color as needed
        }
    };
    const handleForm = (event) =>{
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
    }
    return (
        <>
            <div className = "login__container">
            
            <AbstractFigures/>

            <form className = "login-form" id = "login-form" onSubmit={handleForm} >
                <span id = "format-title">
                    <p className = "title">Login</p>
                </span>
                <span id = "input-format">
                    <input  required    
                            type = "text" 
                            placeholder="Username"  
                            onKeyDown={handleKeyPress} 
                            name="username" 
                            />
                </span>
                <span id = "input-format">
                    <input  required 
                            type = "password" 
                            placeholder="Password"  
                            onKeyDown={handleKeyPress}
                            name = "password"/>
                </span>
                <span id = "input-format">
                <div className = "remember-me-forgot">
                    <div className = "remember-me-container">
                        <label htmlFor = "remember-me">
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
                            
                            <input required type = "checkbox" id = "remember-me" name = "remember-me" onChange={() =>{setIsChecked(!isChecked)}}/>
                            <span>Remember me</span>
                        </label>
                    </div>
                    <div className = "forgot-password-container">
                        <a href = "#">Forgot Password ?</a>
                    </div>
                </div>
                </span>
                <span id = "input-format">
                    <button type ="submit" id = "login-button" className = "login-button">Login</button>
                </span>
                <div className = "dont-have-account">
                    Don't have an account ? 
                    <Link to="/signup" className = "account" href = "#"><span className = "reg">Register</span></Link>
                </div>
            </form>
            </div> 


            
        </>
    );
};

export default LoginForm;