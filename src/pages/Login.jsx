import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      {/* Background Overlay */}
      <div className="login-overlay"></div>

   

      {/* Content */}
      <div className="login-wrapper">
        <h1>Unlock a world of endless entertainment</h1>
        <p>Login to Discover, Stream, and Enjoy!</p>

        <div className="login-card">
          <h2>Sign in</h2>

          <input
            type="email"
            placeholder="example.email@gmail.com"
          />

          <div className="password-field">
            <input
              type="password"
              placeholder="Enter at least 8+ characters"
            />
            <span className="eye">👁</span>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>

          <button className="login-btn">Sign in</button>

          <p className="signup-text">
            New to PlayCine?{" "}
            <span onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
