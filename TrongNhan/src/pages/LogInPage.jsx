import { useState, useEffect } from "react";
import { sendLoginRequest, forgotPassword } from "../API"; // Adjust the path as needed
import "../assets/LogInPage.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
const useBodyOverflowHiddenOnRoute = (route) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === route) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up function to revert overflow when the component unmounts or the route changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location, route]);
};
function ErrorModal({ message, onClose }) {
  return (
    <div className="login-page__modal-overlay">
      <div className="login-page__modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function AbstractFigures() {
  return (
    <>
      <span className="login-page__login-abstract-container">
        <div className="login-page__blur-circle" />
        <div className="login-page__blur-circle" />
        <div className="login-page__sphere-1">
          <div />
        </div>
        <div className="login-page__sphere-2">
          <div />
        </div>
        <div className="login-page__layer-2">
          <div className="login-page__layer-0">
            <div className="login-page__layer-1" />
          </div>
        </div>
        <div className="login-page__line-1" />
      </span>
    </>
  );
}

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    const response = await forgotPassword({ email });
    if (response.success) {
      setMessage("Password reset link has been sent to your email.");
    } else {
      setMessage("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="forgot-password__container">
      <form className="forgot-password__form" onSubmit={handleForm}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
        {message && <p className="forgot-password__message">{message}</p>}
        <button type="button" onClick={onBack}>
          Back to Login
        </button>
      </form>
    </div>
  );
}

function Login() {
  useBodyOverflowHiddenOnRoute("/login");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const closeErrorModal = () => {
    setError("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.target.style.backgroundColor = "none"; // Change color as needed
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
    if (isChecked) {
      localStorage.setItem("username", formDataObj.username);
    } else {
      localStorage.removeItem("username");
    }
    const response = await sendLoginRequest(formDataObj)
    if (response.success) {
      localStorage.setItem("UserID", response.userID);
      navigate("/mainpage");
    } else {
      setError(response.message || "Login failed. Please try again.");
      console.log(response);
    }
  };

  return (
    <>
      <div className="login-page__login__container">
        <AbstractFigures />
        {showForgotPassword ? (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        ) : (
          <form
            className="login-page__login-form"
            id="login-form"
            onSubmit={handleForm}
          >
            <span id="format-title">
              <p className="login-page__title">Login</p>
            </span>
            <span id="input-format">
              <input
                required
                type="text"
                placeholder="Username"
                onKeyDown={handleKeyPress}
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </span>
            <span id="input-format">
              <input
                required
                type="password"
                placeholder="Password"
                onKeyDown={handleKeyPress}
                name="password"
              />
            </span>
            <span id="input-format">
              <div className="login-page__remember-me-forgot">
                <div className="login-page__remember-me-container">
                  <label htmlFor="remember-me">
                    <svg
                      className={`login-page__checkbox ${
                        isChecked ? "login-page__checked--active" : ""
                      }`}
                      aria-hidden="true"
                      viewBox="0 0 15 11"
                      fill="none"
                    >
                      <path
                        d="M1 4.5L5 9L14 1"
                        strokeWidth="2"
                        stroke={isChecked ? "#fff" : "none"}
                      />
                    </svg>
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                      onChange={() => setIsChecked(!isChecked)}
                      checked={isChecked}
                    />
                    <span>Remember me</span>
                  </label>
                </div>
                <div className="login-page__forgot-password-container">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            </span>
            <span id="input-format">
              <button
                type="submit"
                id="login-button"
                className="login-page__login-button"
              >
                Login
              </button>
            </span>
            <div className="login-page__dont-have-account">
              Don't have an account ?
              <Link className="login-page__account" to="/signup">
                <span className="login-page__reg">Register</span>
              </Link>
            </div>
          </form>
        )}
        {error && <ErrorModal message={error} onClose={closeErrorModal} />}
      </div>
    </>
  );
}

export default Login;
