import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Register:", formData);

    // Temporary navigation until backend is connected
    navigate("/login");
  };

  return (
    <div className="auth-page">
      {/* LEFT SIDE - REGISTER FORM */}
      <section className="auth-form-side">
        <div className="auth-form-container">

          {/* Logo */}
          <div className="auth-top-logo">
            <img src="/logo.png" alt="ShuleBora Logo" />
          </div>

          {/* Heading */}
          <div className="auth-heading">
            <span>GET STARTED</span>

            <h1>Create your account</h1>

            <p>
              Register to access the ShuleBora platform.
            </p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="auth-field">
              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="email">
                Email Address
              </label>

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

            {/* Phone */}
            <div className="auth-field">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD + CONFIRM PASSWORD */}
            <div className="auth-password-row">

              {/* Password */}
              <div className="auth-field">
                <label htmlFor="password">
                  Password
                </label>

                <div className="auth-password">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="auth-field">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="auth-password">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

            </div>

            {/* Terms */}
            <label className="auth-remember">
              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the terms and conditions
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <div className="auth-switch">
            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>
          </div>

          {/* Back */}
          <Link
            to="/"
            className="auth-home"
          >
            ← Back to ShuleBora
          </Link>

        </div>
      </section>

      {/* RIGHT SIDE - BRANDING */}
      <section className="auth-brand-side">

        {/* Large Background Logo */}
        <div className="auth-brand-background"></div>

        <div className="auth-brand-content">

          {/* Small Logo */}
          <div className="auth-brand-logo">
            <img
              src="/logo.png"
              alt="ShuleBora Logo"
            />
          </div>

          <h2>
            ShuleBora
          </h2>

          <h3>
            Empowering the next generation
            <br />
            to rise up
          </h3>

          <p>
            Join ShuleBora and discover schools,
            activities, facilities and opportunities
            across Zanzibar.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Register;