
import { useState } from "react";

const Schools = () => {
  const [search, setSearch] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="schools-page">

      {/* HERO */}
      <section className="schools-hero">

        <div className="schools-hero-content">

          <span className="schools-badge">
            Discover Schools
          </span>

          <h1>
            Find the Right School
            <span> for Your Future</span>
          </h1>

          <p>
            Explore schools around you, discover their facilities,
            activities, academic information and connect with them.
          </p>

        </div>

      </section>

      {/* SEARCH & FILTER */}
      <section className="schools-content">

        <div className="schools-search-box">

          <div className="schools-search-input">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search school by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
          >
            <option value="">
              School Type
            </option>

            <option value="primary">
              Primary School
            </option>

            <option value="secondary">
              Secondary School
            </option>

            <option value="international">
              International School
            </option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">
              Location
            </option>

            <option value="zanzibar">
              Zanzibar
            </option>

            <option value="urban">
              Urban West
            </option>

            <option value="north">
              North Zanzibar
            </option>

            <option value="south">
              South Zanzibar
            </option>
          </select>

          <button
            className="schools-search-button"
            type="button"
          >
            Search
          </button>

        </div>

        {/* RESULTS HEADER */}
        <div className="schools-results-header">

          <div>
            <h2>Schools</h2>

            <p>
              Discover registered schools
            </p>
          </div>

          <select className="schools-sort">
            <option>Most Relevant</option>
            <option>Highest Rated</option>
            <option>Newest</option>
          </select>

        </div>

      </section>

    </div>
  );
};

export default Schools;