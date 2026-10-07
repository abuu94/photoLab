import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Activities");
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (category !== "All Activities") {
        params.append("category", category);
      }

      const response = await fetch(
        `${API_URL}/activities?${params.toString()}`
      );

      const data = await response.json();

      if (data.success) {
        setActivities(data.activities || []);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSearch = () => {
    fetchActivities();
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="activities-page">

      {/* HERO */}
      <section className="activities-page-hero">
        <div className="activities-page-hero-content">

          <span className="section-badge">
            SCHOOL ACTIVITIES
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

        {/* HEADER */}
        <div className="activities-page-header">

          <div>
            <span className="section-label">
              SHULEBORA PORTAL
            </span>

            <h2>
              Latest Activities
            </h2>

            <p>
              Discover exciting activities happening in schools.
            </p>
          </div>

          <select
            className="activities-filter"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
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
              placeholder="Search activities or school..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

          </div>

          <button
            className="activities-search-button"
            type="button"
            onClick={handleSearch}
          >
            SEARCH
          </button>

        </div>


        {/* RESULTS */}
        <div className="activities-results-header">

          <div>
            <h2>
              Activities
            </h2>

            <p>
              {loading
                ? "Loading activities..."
                : `${activities.length} published ${
                    activities.length === 1
                      ? "activity"
                      : "activities"
                  }`
              }
            </p>
          </div>

        </div>


        {/* ACTIVITY GRID */}
        <div className="activities-grid">

          {loading ? (

            <div className="activities-empty">
              <div className="activities-empty-icon">
                ⏳
              </div>

              <h3>
                Loading activities...
              </h3>

              <p>
                Please wait while we load the latest school activities.
              </p>
            </div>

          ) : activities.length === 0 ? (

            <div className="activities-empty">

              <div className="activities-empty-icon">
                📚
              </div>

              <h3>
                No activities available
              </h3>

              <p>
                There are currently no published activities.
                Please check again later.
              </p>

            </div>

          ) : (

            activities.map((activity) => (

              <article
                className="activity-card"
                key={activity.id}
              >

                {/* IMAGE */}
                <div className="activity-card-image">

                  {activity.image_url ? (

                    <img
                      src={activity.image_url}
                      alt={activity.title}
                    />

                  ) : (

                    <div className="activity-image-placeholder">
                      <span>🎓</span>
                    </div>

                  )}

                </div>


                {/* BODY */}
                <div className="activity-card-body">

                  <div className="activity-card-top">

                    <span className="activity-category">
                      {activity.category || "School Activity"}
                    </span>

                    <span className="activity-date">
                      {formatDate(activity.event_date)}
                    </span>

                  </div>

                  <h3>
                    {activity.title}
                  </h3>

                  {activity.description && (
                    <p className="activity-description">
                      {activity.description}
                    </p>
                  )}


                  <div className="activity-school">

                    <span>
                      
                    </span>

                    <div>
                      <strong>
                        {activity.school_name}
                      </strong>

                      {activity.school_location && (
                        <small>
                          {activity.school_location}
                        </small>
                      )}
                    </div>

                  </div>

                </div>

              </article>

            ))

          )}

        </div>

      </section>

    </div>
  );
};

export default Activities;
