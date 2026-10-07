import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    schools: 0,
    published_schools: 0,
    admins: 0,
    users: 0,
    activities: 0,
    images: 0,
  });

  const [recentSchools, setRecentSchools] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("shulebora_token");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const response = await fetch(
          `${API_URL}/dashboard/stats`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }

        setStats({
          schools: data.stats?.schools || 0,
          published_schools:
            data.stats?.published_schools || 0,
          admins: data.stats?.admins || 0,
          users: data.stats?.users || 0,
          activities: data.stats?.activities || 0,
          images: data.stats?.images || 0,
        });

        setRecentSchools(data.recent_schools || []);

      } catch (err) {
        console.error("Dashboard error:", err);
        setError(
          err.message || "Failed to connect to backend"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const statCards = [
    {
      title: "Total Schools",
      value: stats.schools,
    },
    {
      title: "Published Schools",
      value: stats.published_schools,
    },
    {
      title: "Admins",
      value: stats.admins,
    },
    {
      title: "Users",
      value: stats.users,
    },
    {
      title: "Activities",
      value: stats.activities,
    },
    {
      title: "Images",
      value: stats.images,
    },
  ];

  return (
    <div className="superadmin-dashboard">

      {/* WELCOME */}
      <div className="superadmin-welcome">
        <p className="superadmin-eyebrow">
          SUPERADMIN DASHBOARD
        </p>

        <h1>Welcome back, SuperAdmin</h1>

        <p>
          Manage schools, users, administrators and
          ShuleBora content from one place.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="superadmin-error">
          {error}
        </div>
      )}

      {/* STATISTICS */}
      <div className="superadmin-stats">

        {statCards.map((stat) => (
          <div
            className="superadmin-stat-card"
            key={stat.title}
          >
            <div className="superadmin-stat-icon"></div>

            <div>
              <span>{stat.title}</span>

              <strong>
                {loading ? "..." : stat.value}
              </strong>
            </div>
          </div>
        ))}

      </div>

      {/* RECENT SCHOOLS */}
      <div className="superadmin-panel">

        <div className="superadmin-section-header">

          <div>
            <h2>Recent Schools</h2>

            <p>
              Recently registered schools.
            </p>
          </div>

          <Link
            to="/superadmin/schools"
            className="superadmin-primary-button"
          >
            View All
          </Link>

        </div>

        <div className="superadmin-table-wrapper">

          <table className="superadmin-table">

            <thead>
              <tr>
                <th>School</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="3">
                    Loading schools...
                  </td>
                </tr>
              ) : recentSchools.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    No schools found.
                  </td>
                </tr>
              ) : (
                recentSchools.map((school) => (
                  <tr key={school.id}>

                    <td>
                      <strong>
                        {school.name || "Unnamed School"}
                      </strong>
                    </td>

                    <td>
                      {school.location || "Not specified"}
                    </td>

                    <td>
                      <span
                        className={
                          school.publication_status ===
                          "PUBLISHED"
                            ? "status-published"
                            : "status-pending"
                        }
                      >
                        {school.publication_status ||
                          "UNKNOWN"}
                      </span>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
