import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../services/api";
import "./member.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("shulebora_user") || "{}");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/schools`)
      .then((res) => res.json())
      .then((data) => {
        setSchools(data.schools || data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setSchools([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="member-dashboard">

      <section className="member-welcome">
        <div>
          <span>WELCOME TO SHULEBORA</span>
          <h2>Welcome, {user.full_name || "Member"}</h2>
          <p>
            Discover schools, explore school information,
            view school photos and save your favourite photos.
          </p>
        </div>

        <div className="member-profile">
          <div className="member-profile-avatar">
            {(user.full_name || "M").charAt(0).toUpperCase()}
          </div>
          <div>
            <strong>{user.full_name || "Member"}</strong>
            <small>{user.email || "Member Account"}</small>
          </div>
        </div>
      </section>

      <section className="member-stats">

        <div className="member-stat-box">
          <div className="member-stat-number">
            {loading ? "..." : schools.length}
          </div>
          <div>
            <strong>Available Schools</strong>
            <p>Schools available on ShuleBora.</p>
          </div>
        </div>

        <div className="member-stat-box">
          <div className="member-stat-icon">▧</div>
          <div>
            <strong>School Photos</strong>
            <p>Explore photos uploaded by schools.</p>
          </div>
        </div>

        <div className="member-stat-box">
          <div className="member-stat-icon">♡</div>
          <div>
            <strong>My Likes</strong>
            <p>Photos you have liked.</p>
          </div>
        </div>

      </section>

      <section className="member-actions">

        <div className="member-section-header">
          <div>
            <h2>Member Services</h2>
            <p>Explore ShuleBora using the services below.</p>
          </div>
        </div>

        <div className="member-action-grid">

          <Link to="/member/schools">
            <div className="member-action-icon">▣</div>
            <strong>Schools</strong>
            <span>Discover schools and view their information.</span>
            <small>View Schools →</small>
          </Link>

          <Link to="/member/photos">
            <div className="member-action-icon">▧</div>
            <strong>School Photos</strong>
            <span>View photos and discover school environments.</span>
            <small>View Photos →</small>
          </Link>

          <Link to="/member/likes">
            <div className="member-action-icon">♡</div>
            <strong>My Likes</strong>
            <span>Access photos you have liked.</span>
            <small>View Likes →</small>
          </Link>

        </div>

      </section>

      <section className="member-recent">

        <div className="member-section-header">
          <div>
            <h2>Available Schools</h2>
            <p>Schools available on ShuleBora.</p>
          </div>

          <Link to="/member/schools">View All</Link>
        </div>

        {loading && (
          <div className="member-empty">
            Loading schools...
          </div>
        )}

        {!loading && schools.length === 0 && (
          <div className="member-empty">
            No schools available yet.
          </div>
        )}

        {!loading && schools.length > 0 && (
          <div className="member-school-list">
            {schools.slice(0, 5).map((school) => (
              <div className="member-school-row" key={school.id}>

                <div className="member-school-avatar">
                  {(school.name || "S").charAt(0).toUpperCase()}
                </div>

                <div className="member-school-info">
                  <strong>{school.name}</strong>
                  <span>
                    {school.location ||
                      school.address ||
                      "Zanzibar"}
                  </span>
                </div>

                <Link to="/member/schools">
                  View
                </Link>

              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
