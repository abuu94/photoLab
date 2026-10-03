import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { title: "Schools", value: "24", icon: "" },
    { title: "Admins", value: "18", icon: "" },
    { title: "Users", value: "1,240", icon: "" },
    { title: "Activities", value: "156", icon: "" },
  ];

  const schools = [
    ["NIA Academy", "Zanzibar", "Published"],
    ["Zanzibar Modern School", "Stone Town", "Published"],
    ["Future Stars Academy", "Mwanakwerekwe", "Pending"],
  ];

  return (
    <div>
      <div className="superadmin-welcome">
        <p className="superadmin-eyebrow">
          SUPERADMIN DASHBOARD
        </p>

        <h1>Welcome back, SuperAdmin </h1>

        <p>
          Manage schools, users, administrators and all
          ShuleBora content from one place.
        </p>
      </div>

      <div className="superadmin-stats">
        {stats.map((stat) => (
          <div className="superadmin-stat-card" key={stat.title}>
            <div className="superadmin-stat-icon">
              {stat.icon}
            </div>

            <div>
              <span>{stat.title}</span>
              <strong>{stat.value}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="superadmin-panel">
        <div className="superadmin-section-header">
          <div>
            <h2>Recent Schools</h2>
            <p>Recently registered schools.</p>
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
              {schools.map((school) => (
                <tr key={school[0]}>
                  <td>{school[0]}</td>
                  <td>{school[1]}</td>
                  <td>
                    <span className="status-badge">
                      {school[2]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
