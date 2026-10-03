import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration successful.");

    navigate("/login");
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        <div className="auth-header">

          <img
            src="/logo.png"
            alt="ShuleBora Logo"
            className="auth-logo"
          />

          <span className="section-label">
            SHULEBORA
          </span>

          <h1>
            Create Account
          </h1>

          <p>
            Register to access ShuleBora services.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              FULL NAME
            </label>

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

          </div>

          <div className="form-group">

            <label>
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

          </div>

          <div className="form-group">

            <label>
              PASSWORD
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create password"
            />

          </div>

          <div className="form-group">

            <label>
              CONFIRM PASSWORD
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

          </div>

          <button
            type="submit"
            className="primary-button"
          >
            CREATE ACCOUNT
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            LOGIN
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Register;