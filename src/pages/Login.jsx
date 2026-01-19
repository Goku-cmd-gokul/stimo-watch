import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  /* Handle input change */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* Email validation */
  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    console.log("Login Data:", formData);

    setError("");
    setFormData({ email: "", password: "" });

    // ✅ Redirect to Home after login
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <h2>Sign In</h2>

          {error && <p className="error">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <button type="submit" className="login-submit-btn">
              Sign In
            </button>
          </form>

          <p className="signup-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
