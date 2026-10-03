import React, { useState } from "react";
import "./App.css";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="site-width top-bar-inner">
        <div className="top-left">
          SHULEBORA
        </div>

        <div className="top-right">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="main-header">
      <div className="site-width header-inner">

        <div className="header-logo">
          <img src="/logo.png" alt="ShuleBora Logo" />
        </div>

        <div className="header-title">
          <h1>SHULEBORA</h1>
          <p>Empowering the next generation to rise up</p>
        </div>

        <div className="header-right">
          <img src="/logo.png" alt="ShuleBora Logo" />

          <div className="auth-buttons">
            <a href="/login">LOGIN</a>
            <a href="/register">REGISTER</a>
          </div>
        </div>

      </div>
    </header>
  );
}

function Navbar() {
  return (
    <nav className="main-nav">
      <div className="site-width nav-inner">
        <a href="/">HOME</a>
        <a href="/schools">SCHOOLS</a>
        <a href="/activities">ACTIVITIES</a>
        <a href="#about">ABOUT US</a>
        <a href="#contact">CONTACT</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [search, setSearch] = useState("");

  return (
    <section className="hero-section">
      <div className="site-width hero-content">
        <div className="hero-text">
          <span>SHULEBORA SCHOOL DIRECTORY</span>

          <h2>
            Find the Right School
            <br />
            for the Next Generation
          </h2>

          <p>
            Explore schools, educational activities, facilities,
            qualifications and important information in one place.
          </p>
        </div>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search school name, location or programme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button">SEARCH</button>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <main className="site-width main-content">
        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="section-label">SHULEBORA PORTAL</span>
              <h2>Explore Schools</h2>
            </div>

            <a href="/schools" className="outline-button">
              VIEW ALL SCHOOLS
            </a>
          </div>

          <div className="school-list">
            <div className="school-row">
              <div>
                <h3>School Name</h3>
                <p>Location information</p>
              </div>

              <div className="school-meta">
                <span>REGISTERED</span>
                <a href="/schools">VIEW DETAILS</a>
              </div>
            </div>

            <div className="school-row">
              <div>
                <h3>School Name</h3>
                <p>Location information</p>
              </div>

              <div className="school-meta">
                <span>REGISTERED</span>
                <a href="/schools">VIEW DETAILS</a>
              </div>
            </div>

            <div className="school-row">
              <div>
                <h3>School Name</h3>
                <p>Location information</p>
              </div>

              <div className="school-meta">
                <span>REGISTERED</span>
                <a href="/schools">VIEW DETAILS</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" id="activities">
          <div className="section-heading">
            <div>
              <span className="section-label">EDUCATION</span>
              <h2>School Activities</h2>
            </div>

            <a href="/activities" className="outline-button">
              VIEW ACTIVITIES
            </a>
          </div>

          <div className="information-list">
            <div className="information-row">
              <strong>Academic Activities</strong>
              <span>Academic programmes and learning activities</span>
            </div>

            <div className="information-row">
              <strong>Sports Activities</strong>
              <span>Sports and physical education activities</span>
            </div>

            <div className="information-row">
              <strong>Social Activities</strong>
              <span>Social and community activities</span>
            </div>
          </div>
        </section>

        <section className="section-block" id="about">
          <div className="section-heading">
            <div>
              <span className="section-label">ABOUT SHULEBORA</span>
              <h2>About Us</h2>
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

        <section className="section-block" id="contact">
          <div className="section-heading">
            <div>
              <span className="section-label">GET IN TOUCH</span>
              <h2>Contact Us</h2>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>FULL NAME</label>
                <input type="text" placeholder="Enter your full name" />
              </div>

              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="form-group">
              <label>SUBJECT</label>
              <input type="text" placeholder="Enter subject" />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea
                rows="6"
                placeholder="Write your message"
              ></textarea>
            </div>

            <button type="button" className="primary-button">
              SEND MESSAGE
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

function Schools() {
  return (
    <>
      <section className="page-banner">
        <div className="site-width">
          <span>SCHOOL DIRECTORY</span>
          <h2>Registered Schools</h2>
          <p>
            Browse schools and access their educational information.
          </p>
        </div>
      </section>

      <main className="site-width main-content">
        <section className="directory-section">
          <div className="directory-header">
            <div>
              <span className="section-label">DIRECTORY</span>
              <h2>Schools</h2>
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
              <option value="">All Locations</option>
              <option value="zanzibar">Zanzibar</option>
              <option value="unguja">Unguja</option>
              <option value="pemba">Pemba</option>
            </select>

            <button type="button">SEARCH</button>
          </div>

          <div className="school-table">
            <div className="table-header">
              <span>SCHOOL NAME</span>
              <span>LOCATION</span>
              <span>STATUS</span>
              <span>ACTION</span>
            </div>

            <div className="table-row">
              <strong>School Name</strong>
              <span>Location</span>
              <span className="status">REGISTERED</span>
              <a href="/schools">VIEW</a>
            </div>

            <div className="table-row">
              <strong>School Name</strong>
              <span>Location</span>
              <span className="status">REGISTERED</span>
              <a href="/schools">VIEW</a>
            </div>

            <div className="table-row">
              <strong>School Name</strong>
              <span>Location</span>
              <span className="status">REGISTERED</span>
              <a href="/schools">VIEW</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Activities() {
  return (
    <>
      <section className="page-banner">
        <div className="site-width">
          <span>SCHOOL ACTIVITIES</span>
          <h2>Activities</h2>
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
              <strong>Academic Programme</strong>
              <span>ACADEMIC</span>
              <span>Learning and academic development</span>
            </div>

            <div className="table-row">
              <strong>Football</strong>
              <span>SPORTS</span>
              <span>Sports and physical development</span>
            </div>

            <div className="table-row">
              <strong>Community Service</strong>
              <span>SOCIAL</span>
              <span>Community development activities</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="site-width footer-grid">
        <div>
          <h3>SHULEBORA</h3>
          <p>
            School Information Portal for discovering better
            educational opportunities.
          </p>
        </div>

        <div>
          <h4>QUICK LINKS</h4>
          <a href="/">Home</a>
          <a href="/schools">Schools</a>
          <a href="/activities">Activities</a>
        </div>

        <div>
          <h4>CONTACT</h4>
          <p>Email: info@shulebora.com</p>
          <p>Location: Zanzibar, Tanzania</p>
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

function App() {
  const path = window.location.pathname;

  let page;

  if (path === "/schools") {
    page = <Schools />;
  } else if (path === "/activities") {
    page = <Activities />;
  } else {
    page = <Home />;
  }

  return (
    <div className="app">
      <TopBar />
      <Header />
      <Navbar />

      {page}

      <Footer />
    </div>
  );
}

export default App;
