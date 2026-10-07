import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (schoolType) params.append("school_type", schoolType);
      if (location) params.append("location", location);

      const response = await fetch(
        `${API_URL}/schools?${params.toString()}`
      );

      const data = await response.json();

      if (data.success) {
        setSchools(data.schools || []);
      } else {
        setSchools([]);
      }
    } catch (error) {
      console.error("Failed to fetch schools:", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div className="schools-page">

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
            <option value="">School Type</option>
            <option value="primary">Primary School</option>
            <option value="secondary">Secondary School</option>
            <option value="international">International School</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Location</option>
            <option value="zanzibar">Zanzibar</option>
            <option value="urban">Urban West</option>
            <option value="north">North Zanzibar</option>
            <option value="south">South Zanzibar</option>
          </select>

          <button
            className="schools-search-button"
            type="button"
            onClick={fetchSchools}
          >
            Search
          </button>

        </div>

        <div className="schools-results-header">
          <div>
            <h2>Schools</h2>
            <p>
              {loading
                ? "Loading schools..."
                : `${schools.length} registered school${schools.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <select className="schools-sort">
            <option>Most Relevant</option>
            <option>Highest Rated</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="schools-grid">

          {loading ? (
            <p>Loading schools...</p>
          ) : schools.length === 0 ? (
            <p>No schools found.</p>
          ) : (
            schools.map((school) => (
              <div className="school-card" key={school.id}>

                <h3>{school.name}</h3>

                <p>
                  📍 {school.location || "Location not provided"}
                </p>

                <p>
                  {school.school_type || "School"}
                </p>

                {school.description && (
                  <p>{school.description}</p>
                )}

              </div>
            ))
          )}

        </div>

      </section>
    </div>
  );
};

export default Schools;
