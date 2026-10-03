import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    localStorage.setItem(
      "shulebora_user",
      JSON.stringify({
        email,
        loggedIn: true,
      })
    );

    alert("Login successful!");

    navigate("/");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <span>S</span>
          <strong>
            Shule<span>Bora</span>
          </strong>
        </div>

        <div className="auth-header">

          <span className="auth-badge">
            Welcome Back
          </span>

          <h1>Sign in to your account</h1>

          <p>
            Access your ShuleBora account and continue exploring.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-form-group">

            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

          </div>

          <div className="auth-form-group">

            <div className="auth-label-row">

              <label>Password</label>

              <button
                type="button"
                className="forgot-password-button"
                onClick={() => {
                  alert("Forgot Password clicked!");
                }}
              >
                Forgot password?
              </button>

            </div>

            <div className="password-input">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
              >
                {showPassword ? "" : ""}
              </button>

            </div>

          </div>

          <label className="remember-me">

            <input type="checkbox" />

            <span>Remember me</span>

          </label>

          <button
            type="submit"
            className="auth-submit-button"
          >
            Login
            <span>→</span>
          </button>

        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-bottom-text">
          Don't have an account?
          {" "}
          <Link to="/get-started">
            Get Started
          </Link>
        </p>

        <Link
          to="/"
          className="auth-back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
};

export default Login;
