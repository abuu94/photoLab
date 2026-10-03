
import { useState } from "react";

const Activities = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Activities");

  return (
    <div className="activities-page">

      {/* HERO */}
      <section className="activities-page-hero">
        <div className="activities-page-hero-content">

          <span className="section-badge">
            School Activities
          </span>

          <h1>
            Discover What Schools
            <span> Are Doing</span>
          </h1>

          <p>
            Explore activities, events, programs and opportunities
            happening in schools around the community.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="activities-page-content">

        <div className="activities-page-header">

          <div>
            <h2>Latest Activities</h2>

            <p>
              Discover exciting activities happening in schools.
            </p>
          </div>

          <select
            className="activities-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Activities</option>
            <option>Sports</option>
            <option>Education</option>
            <option>Arts & Culture</option>
            <option>Technology</option>
            <option>Environment</option>
            <option>Leadership</option>
          </select>

        </div>

        {/* SEARCH */}
        <div className="activities-search-box">

          <div className="activities-search-input">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <button
            className="activities-search-button"
            type="button"
          >
            Search
          </button>

        </div>

      </section>

    </div>
  );
};

export default Activities;