
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../components/auth";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const {
      name,
      email,
      password,
      confirmPassword
    } = formData;

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password
      });

      navigate("/login", {
        state: { registered: true }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        <div className="auth-banner">
          <div className="auth-banner-content">
            <span className="auth-banner-icon">🐾</span>

            <h1>Join Our Family!</h1>
            <p>Create an account and become part of a community 
              dedicated to giving every pet a loving home.
            </p>

            <div className="auth-banner-bottom">
              <span>♥</span>
              <p>Small actions, big changes. Make a difference today.</p>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-content">

            <span className="auth-label">JOIN PET HEAVEN</span>

            <h2>Create an Account</h2>
            <p className="auth-subtitle">Join us and start your adoption journey.</p>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup}>

              <div className="auth-form-group">
                <label htmlFor="signup-name">
                  Full Name
                </label>

                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-email">Email Address</label>

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-password">
                  Password
                </label>

                <div className="auth-password-wrapper">
                  <input
                    id="signup-password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-confirm">Confirm Password</label>

                <input
                  id="signup-confirm"
                  type={
                    showPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account →"}
              </button>

            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <Link to="/login" className="auth-outline-btn">Sign In</Link>

            <p className="auth-footer-text">Join us in making a difference, one paw at a time. 🐾</p>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Signup;
