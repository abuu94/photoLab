import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import "./App.css";

/* =========================
   AUTH
========================= */

import Login from "./pages/Login";
import Register from "./pages/Register";

/* =========================
   ADMIN
========================= */

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Dashboard";
import SchoolInfo from "./admin/SchoolInfo";
import AdminActivities from "./admin/Activities";
import AdminFeatures from "./admin/Features";
import AdminFacilities from "./admin/Facilities";
import AdminImages from "./admin/Images";
import Contacts from "./admin/Contacts";
import Qualifications from "./admin/Qualifications";
import AdminSettings from "./admin/Settings";

/* =========================
   SUPERADMIN
========================= */

import SuperAdminLayout from "./superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./superadmin/Dashboard";
import SuperAdminSchools from "./superadmin/Schools";
import SuperAdminAdmins from "./superadmin/Admins";
import SuperAdminUsers from "./superadmin/Users";
import SuperAdminActivities from "./superadmin/Activities";
import SuperAdminFeatures from "./superadmin/Features";
import SuperAdminFacilities from "./superadmin/Facilities";
import SuperAdminSettings from "./superadmin/Settings";

/* =========================================================
   TOP BAR
========================================================= */

function TopBar() {
  return (
    <div className="top-bar">
      <div className="site-width top-bar-inner">

        <div className="top-left">
          SHULEBORA
        </div>

        <div className="top-right">

          <Link to="/#about">
            About Us
          </Link>

          <Link to="/#contact">
            Contact
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <header className="main-header">

      <div className="site-width header-inner">

        <div className="header-logo">
          <img
            src="/logo.png"
            alt="ShuleBora Logo"
          />
        </div>

        <div className="header-title">

          <h1>
            SERIKALI YA MAPINDUZI YA ZANZIBAR
          </h1>

          <p>
            Zanzibar Private and Public Schools
          </p>

        </div>

        <div className="header-right">

          <img
            src="/logo.png"
            alt="ShuleBora Logo"
          />

          <div className="auth-buttons">

            <Link to="/login">
              LOGIN
            </Link>

            <Link to="/register">
              REGISTER
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  return (
    <nav className="main-nav">

      <div className="site-width nav-inner">

        <Link to="/">
          HOME
        </Link>

        <Link to="/schools">
          SCHOOLS
        </Link>

        <Link to="/activities">
          ACTIVITIES
        </Link>

        <Link to="/#about">
          ABOUT US
        </Link>

        <Link to="/#contact">
          CONTACT
        </Link>

      </div>

    </nav>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="hero-section">

      <div className="site-width hero-content">

        <div className="hero-text">

          <span>
            SHULEBORA SCHOOL DIRECTORY
          </span>

          <h2>
            Find all activity in any school in
            <br />
            Zanzibar, Tanzania
          </h2>

          <p>
            All activity made by school you can see its photo here
          </p>

        </div>

        <div className="hero-search">

          <input
            type="text"
            placeholder="Search school name..."
          />

          <button type="button">
            SEARCH
          </button>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  return (
    <>
      <Hero />

      <main className="site-width main-content">

        {/* SCHOOLS */}

        <section className="section-block">

          <div className="section-heading">

            <div>

              <span className="section-label">
                SHULEBORA PORTAL
              </span>

              <h2>
                Explore Schools
              </h2>

            </div>

            <Link
              to="/schools"
              className="outline-button"
            >
              VIEW ALL SCHOOLS
            </Link>

          </div>

          <div className="school-list">

            {[
              "NIA Academy",
              "Zanzibar Modern School",
              "Al-Noor Islamic School",
            ].map((school) => (

              <div
                className="school-row"
                key={school}
              >

                <div>

                  <h3>
                    {school}
                  </h3>

                  <p>
                    Zanzibar, Tanzania
                  </p>

                </div>

                <div className="school-meta">

                  <span>
                    REGISTERED
                  </span>

                  <Link to="/schools">
                    VIEW DETAILS
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* ACTIVITIES */}

        <section
          className="section-block"
          id="activities"
        >

          <div className="section-heading">

            <div>

              <span className="section-label">
                EDUCATION
              </span>

              <h2>
                School Activities
              </h2>

            </div>

            <Link
              to="/activities"
              className="outline-button"
            >
              VIEW ACTIVITIES
            </Link>

          </div>

          <div className="information-list">

            <div className="information-row">

              <strong>
                Academic Activities
              </strong>

              <span>
                Academic programmes and learning activities
              </span>

            </div>

            <div className="information-row">

              <strong>
                Sports Activities
              </strong>

              <span>
                Sports and physical education activities
              </span>

            </div>

            <div className="information-row">

              <strong>
                Social Activities
              </strong>

              <span>
                Social and community activities
              </span>

            </div>

          </div>

        </section>

        {/* ABOUT */}

        <section
          className="section-block"
          id="about"
        >

          <div className="section-heading">

            <div>

              <span className="section-label">
                ABOUT SHULEBORA
              </span>

              <h2>
                About Us
              </h2>

            </div>

          </div>

          <div className="text-section">

            <p>
              ShuleBora is a school information platform designed to help
              communities discover and understand schools through reliable
              information.
            </p>

            <p>
              The platform provides information about schools, activities,
              facilities, qualifications, contacts and other important
              educational information.
            </p>

          </div>

        </section>

        {/* CONTACT */}

        <section
          className="section-block"
          id="contact"
        >

          <div className="section-heading">

            <div>

              <span className="section-label">
                GET IN TOUCH
              </span>

              <h2>
                Contact Us
              </h2>

            </div>

          </div>

          <form className="contact-form">

            <div className="form-row">

              <div className="form-group">

                <label>
                  FULL NAME
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                />

              </div>

              <div className="form-group">

                <label>
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                SUBJECT
              </label>

              <input
                type="text"
                placeholder="Enter subject"
              />

            </div>

            <div className="form-group">

              <label>
                MESSAGE
              </label>

              <textarea
                rows="6"
                placeholder="Write your message"
              />

            </div>

            <button
              type="button"
              className="primary-button"
            >
              SEND MESSAGE
            </button>

          </form>

        </section>

      </main>
    </>
  );
}

/* =========================================================
   SCHOOLS
========================================================= */

function Schools() {

  const schools = [
    "NIA Academy",
    "Zanzibar Modern School",
    "Al-Noor Islamic School",
  ];

  return (
    <>
      <section className="page-banner">

        <div className="site-width">

          <span>
            SCHOOL DIRECTORY
          </span>

          <h2>
            Registered Schools
          </h2>

          <p>
            Browse schools and access their educational information.
          </p>

        </div>

      </section>

      <main className="site-width main-content">

        <section className="directory-section">

          <div className="directory-header">

            <div>

              <span className="section-label">
                DIRECTORY
              </span>

              <h2>
                Schools
              </h2>

            </div>

            <div className="results-count">
              Registered Schools
            </div>

          </div>

          <div className="filter-area">

            <input
              type="text"
              placeholder="Search by school name..."
            />

            <select defaultValue="">

              <option value="">
                All Locations
              </option>

              <option value="zanzibar">
                Zanzibar
              </option>

              <option value="unguja">
                Unguja
              </option>

              <option value="pemba">
                Pemba
              </option>

            </select>

            <button type="button">
              SEARCH
            </button>

          </div>

          <div className="school-table">

            <div className="table-header">

              <span>SCHOOL NAME</span>
              <span>LOCATION</span>
              <span>STATUS</span>
              <span>ACTION</span>

            </div>

            {schools.map((school) => (

              <div
                className="table-row"
                key={school}
              >

                <strong>
                  {school}
                </strong>

                <span>
                  Zanzibar
                </span>

                <span className="status">
                  REGISTERED
                </span>

                <Link to="/schools">
                  VIEW
                </Link>

              </div>

            ))}

          </div>

        </section>

      </main>
    </>
  );
}

/* =========================================================
   ACTIVITIES
========================================================= */

function Activities() {
  return (
    <>
      <section className="page-banner">

        <div className="site-width">

          <span>
            SCHOOL ACTIVITIES
          </span>

          <h2>
            Activities
          </h2>

          <p>
            Discover educational, sports and community activities.
          </p>

        </div>

      </section>

      <main className="site-width main-content">

        <section className="section-block">

          <div className="activity-table">

            <div className="table-header">

              <span>ACTIVITY</span>
              <span>CATEGORY</span>
              <span>DESCRIPTION</span>

            </div>

            <div className="table-row">

              <strong>
                Academic Programme
              </strong>

              <span>
                ACADEMIC
              </span>

              <span>
                Learning and academic development
              </span>

            </div>

            <div className="table-row">

              <strong>
                Football
              </strong>

              <span>
                SPORTS
              </span>

              <span>
                Sports and physical development
              </span>

            </div>

            <div className="table-row">

              <strong>
                Community Service
              </strong>

              <span>
                SOCIAL
              </span>

              <span>
                Community development activities
              </span>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

/* =========================================================
   PUBLIC LAYOUT
========================================================= */

function PublicLayout({ children }) {

  return (
    <div className="app">

      <TopBar />

      <Header />

      <Navbar />

      {children}

      <Footer />

    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {

  return (
    <footer className="footer">

      <div className="site-width footer-grid">

        <div>

          <h3>
            SHULEBORA
          </h3>

          <p>
            School Information Portal for discovering better educational
            opportunities.
          </p>

        </div>

        <div>

          <h4>
            QUICK LINKS
          </h4>

          <Link to="/">
            Home
          </Link>

          <Link to="/schools">
            Schools
          </Link>

          <Link to="/activities">
            Activities
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

        <div>

          <h4>
            CONTACT
          </h4>

          <p>
            Email: info@shulebora.com
          </p>

          <p>
            Location: Zanzibar, Tanzania
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <div className="site-width">

          © 2026 SHULEBORA. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

/* =========================================================
   ADMIN ROUTES
========================================================= */

function AdminRoutes() {

  return (
    <AdminLayout>

      <Routes>

        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="school-info"
          element={<SchoolInfo />}
        />

        <Route
          path="activities"
          element={<AdminActivities />}
        />

        <Route
          path="features"
          element={<AdminFeatures />}
        />

        <Route
          path="facilities"
          element={<AdminFacilities />}
        />

        <Route
          path="images"
          element={<AdminImages />}
        />

        <Route
          path="contacts"
          element={<Contacts />}
        />

        <Route
          path="qualifications"
          element={<Qualifications />}
        />

        <Route
          path="settings"
          element={<AdminSettings />}
        />

      </Routes>

    </AdminLayout>
  );
}

/* =========================================================
   SUPERADMIN ROUTES
========================================================= */

function SuperAdminRoutes() {

  return (
    <SuperAdminLayout>

      <Routes>

        <Route
          index
          element={<SuperAdminDashboard />}
        />

        <Route
          path="schools"
          element={<SuperAdminSchools />}
        />

        <Route
          path="admins"
          element={<SuperAdminAdmins />}
        />

        <Route
          path="users"
          element={<SuperAdminUsers />}
        />

        <Route
          path="activities"
          element={<SuperAdminActivities />}
        />

        <Route
          path="features"
          element={<SuperAdminFeatures />}
        />

        <Route
          path="facilities"
          element={<SuperAdminFacilities />}
        />

        <Route
          path="settings"
          element={<SuperAdminSettings />}
        />

      </Routes>

    </SuperAdminLayout>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/schools"
          element={
            <PublicLayout>
              <Schools />
            </PublicLayout>
          }
        />

        <Route
          path="/activities"
          element={
            <PublicLayout>
              <Activities />
            </PublicLayout>
          }
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN */}

        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />

        {/* SUPERADMIN */}

        <Route
          path="/superadmin/*"
          element={<SuperAdminRoutes />}
        />

        {/* UNKNOWN */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;