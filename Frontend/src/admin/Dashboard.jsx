import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../services/api";

const Dashboard = () => {

  const [school, setSchool] = useState(null);

  const [stats, setStats] = useState({
    activities: 0,
    features: 0,
    facilities: 0,
    qualifications: 0,
    images: 0,
    contacts: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================================================
  // LOAD ADMIN DASHBOARD
  // =========================================================

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("shulebora_token");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const response = await fetch(
          `${API_URL}/dashboard/admin-stats`,
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
            data.message ||
            "Failed to load admin dashboard"
          );
        }


        // SCHOOL
        setSchool(data.school || null);


        // STATISTICS
        setStats({
          activities:
            data.stats?.activities || 0,

          features:
            data.stats?.features || 0,

          facilities:
            data.stats?.facilities || 0,

          qualifications:
            data.stats?.qualifications || 0,

          images:
            data.stats?.images || 0,

          contacts:
            data.stats?.contacts || 0,
        });


        // ACTIVITIES
        setRecentActivities(
          data.recent_activities || []
        );

      } catch (err) {

        console.error(
          "Admin Dashboard Error:",
          err
        );

        setError(
          err.message ||
          "Failed to connect to backend"
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboard();

  }, []);


  // =========================================================
  // STAT CARDS
  // =========================================================

  const statCards = [

    {
      title: "Activities",
      value: stats.activities,
    },

    {
      title: "Features",
      value: stats.features,
    },

    {
      title: "Facilities",
      value: stats.facilities,
    },

    {
      title: "Images",
      value: stats.images,
    },

    {
      title: "Qualifications",
      value: stats.qualifications,
    },

    {
      title: "Contacts",
      value: stats.contacts,
    },

  ];


  // =========================================================
  // STATUS
  // =========================================================

  const schoolStatus =
    school?.publication_status ||
    "UNKNOWN";


  return (

    <div>

      {/* =====================================================
          WELCOME
      ====================================================== */}

      <div className="superadmin-welcome">

        <p className="superadmin-eyebrow">
          SCHOOL ADMIN
        </p>

        <h1>
          Welcome back, School Admin
        </h1>

        <p>
          Manage your school information,
          activities and content from one place.
        </p>

      </div>


      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (

        <div className="superadmin-error">
          {error}
        </div>

      )}


      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="superadmin-stats">

        {statCards.map((stat) => (

          <div
            className="superadmin-stat-card"
            key={stat.title}
          >

            <div className="superadmin-stat-icon"></div>

            <div>

              <span>
                {stat.title}
              </span>

              <strong>
                {loading ? "..." : stat.value}
              </strong>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          SCHOOL + QUICK ACTIONS
      ====================================================== */}

      <div className="superadmin-grid">


        {/* =================================================
            MY SCHOOL
        ================================================== */}

        <div className="superadmin-panel">

          <div className="superadmin-section-header">

            <div>

              <h2>
                My School
              </h2>

              <p>
                School overview
              </p>

            </div>

          </div>


          {loading ? (

            <div className="admin-school-overview">
              Loading school information...
            </div>

          ) : !school ? (

            <div className="admin-school-overview">
              No school assigned to this admin.
            </div>

          ) : (

            <div className="admin-school-overview">

              <h2>
                {school.name || "School"}
              </h2>

              <p>
                {school.location ||
                  "Location not specified"}
              </p>

              {school.school_type && (

                <p>
                  <strong>
                    School Type:
                  </strong>{" "}
                  {school.school_type}
                </p>

              )}

              {school.description && (

                <p>
                  {school.description}
                </p>

              )}


              <span
                className={`status-badge ${
                  schoolStatus === "PUBLISHED"
                    ? "published"
                    : ""
                }`}
              >
                {schoolStatus}
              </span>

            </div>

          )}

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="superadmin-panel">

          <div className="superadmin-section-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage school content
              </p>

            </div>

          </div>


          <div className="superadmin-quick-actions">

            <Link
              to="/admin/activities"
              className="superadmin-primary-button"
            >
              + Add Activity
            </Link>

            <Link
              to="/admin/features"
              className="superadmin-primary-button"
            >
              + Add Feature
            </Link>

            <Link
              to="/admin/facilities"
              className="superadmin-primary-button"
            >
              + Add Facility
            </Link>

            <Link
              to="/admin/images"
              className="superadmin-primary-button"
            >
              + Upload Image
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          RECENT ACTIVITIES
      ====================================================== */}

      <div className="superadmin-panel">

        <div className="superadmin-section-header">

          <div>

            <h2>
              Recent Activities
            </h2>

            <p>
              Latest activities from your school.
            </p>

          </div>

          <Link
            to="/admin/activities"
            className="superadmin-primary-button"
          >
            View All
          </Link>

        </div>


        <div className="superadmin-table-wrapper">

          <table className="superadmin-table">

            <thead>

              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="4">
                    Loading activities...
                  </td>
                </tr>

              ) : recentActivities.length === 0 ? (

                <tr>
                  <td colSpan="4">
                    No activities found.
                  </td>
                </tr>

              ) : (

                recentActivities.map(
                  (activity) => (

                    <tr key={activity.id}>

                      <td>
                        <strong>
                          {activity.title}
                        </strong>
                      </td>

                      <td>
                        {activity.category ||
                          "—"}
                      </td>

                      <td>
                        {activity.event_date ||
                          "—"}
                      </td>

                      <td>
                        {activity.status ||
                          "—"}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};


export default Dashboard;
