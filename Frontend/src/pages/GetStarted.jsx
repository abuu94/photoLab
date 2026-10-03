import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please complete all fields.");
      return;
    }

    // TEMPORARY FRONTEND REGISTRATION
    localStorage.setItem(
      "shulebora_user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        registered: true,
      })
    );

    alert("Account created successfully!");

    navigate("/login");
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
            Join ShuleBora
          </span>

          <h1>
            Create your account
          </h1>

          <p>
            Join the ShuleBora community and start discovering
            schools and opportunities.
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>


          <div className="auth-form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>


          <div className="auth-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

          </div>


          <button
            type="submit"
            className="auth-submit-button"
          >
            Create Account
            <span>→</span>
          </button>

        </form>


        <div className="auth-divider">
          <span>or</span>
        </div>


        <p className="auth-bottom-text">

          Already have an account?

          <Link to="/login">
            Login
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

export default GetStarted;
