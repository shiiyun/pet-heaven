
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../components/auth";
import "./auth.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser(email, password);

      onLogin(user);

      navigate("/");
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
            <h1>Welcome Back!</h1>
            <p>
              Every pet deserves a loving home. Continue your journey 
              with Pet Heaven and find your perfect companion.
            </p>

            <div className="auth-banner-bottom">
              <span>♥</span>
              <p>Bringing people and pets together, one paw at a time.</p>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-content">

            <span className="auth-label">MEMBER LOGIN</span>

            <h2>Welcome Back</h2>

            <p className="auth-subtitle">
              Sign in to your Pet Heaven account.
            </p>

            {location.state?.registered && (
              <div className="auth-success" role="status">
                Account created successfully! Please log in.
              </div>
            )}

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="auth-form-group">
                <label htmlFor="login-email">Email Address</label>

                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="login-password">Password</label>

                <div className="auth-password-wrapper">
                  <input
                    id="login-password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
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

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>

            <div className="auth-divider">
              <span>New to Pet Heaven?</span>
            </div>

            <Link to="/signup" className="auth-outline-btn">Create an Account</Link>

            <p className="auth-footer-text">Discover a world of love, care, and furry friendships. 🐾</p>

          </div>
        </div>

      </div>
    </main>
  );
};

export default Login;
