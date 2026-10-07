import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../services/api";

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/schools`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load schools");
        }
        return res.json();
      })
      .then((data) => {
        setSchools(data.schools || data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load schools.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="member-dashboard">

      <div className="member-page-heading">
        <div>
          <h2>Schools</h2>
          <p>Discover schools available on ShuleBora.</p>
        </div>

        <div className="member-school-count">
          {loading ? "..." : schools.length} Schools
        </div>
      </div>

      {loading && (
        <div className="member-empty">
          Loading schools from database...
        </div>
      )}

      {!loading && error && (
        <div className="member-empty">
          {error}
        </div>
      )}

      {!loading && !error && schools.length === 0 && (
        <div className="member-empty">
          No schools have been added yet.
        </div>
      )}

      {!loading && !error && schools.length > 0 && (
        <div className="member-schools-table">

          <div className="member-schools-table-head">
            <span>School</span>
            <span>Location</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {schools.map((school) => (
            <div
              className="member-school-item"
              key={school.id}
            >

              <div className="member-school-name">
                <div className="member-school-avatar">
                  {(school.name || "S")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <strong>
                    {school.name || "Unnamed School"}
                  </strong>

                  <small>
                    School ID: {school.id}
                  </small>
                </div>
              </div>

              <div className="member-school-location">
                {school.location ||
                  school.address ||
                  school.city ||
                  "Zanzibar"}
              </div>

              <div>
                <span className="member-school-status">
                  {school.status || "ACTIVE"}
                </span>
              </div>

              <div>
                <Link
                  to={`/schools/${school.id}`}
                  className="member-view-button"
                >
                  View
                </Link>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}