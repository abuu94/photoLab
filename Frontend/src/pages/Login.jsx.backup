import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login:", formData);

    // Temporary demo
    navigate("/admin");
  };

  return (
    <div className="auth-page">

      {/* LEFT: LOGIN FORM */}
      <section className="auth-form-side">

        <div className="auth-form-container">

          <div className="auth-top-logo">
            <img src="/logo.png" alt="ShuleBora Logo" />
          </div>

          <div className="auth-heading">
            <span>WELCOME BACK</span>
            <h1>Login to your account</h1>
            <p>Enter your credentials to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="auth-field">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">

              <div className="auth-label-row">
                <label htmlFor="password">Password</label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <div className="auth-password">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            <label className="auth-remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button type="submit" className="auth-submit">
              Login
            </button>

          </form>

          <div className="auth-switch">
            <span>Don't have an account?</span>
            <Link to="/register">Create Account</Link>
          </div>

          <Link to="/" className="auth-home">
            ← Back to ShuleBora
          </Link>

        </div>

      </section>


      {/* RIGHT: BRANDING */}
      <section className="auth-brand-side">

        <div className="auth-brand-background"></div>

        <div className="auth-brand-content">

          <div className="auth-brand-logo">
            <img src="/logo.png" alt="ShuleBora Logo" />
          </div>

          <h2>ShuleBora</h2>

          <h3>
            Empowering the next generation
            <br />
            to rise up
          </h3>

          <p>
            A platform for discovering and connecting
            with schools across Zanzibar.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Login;