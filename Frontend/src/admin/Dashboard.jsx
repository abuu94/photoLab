const Dashboard = () => {
  const stats = [
    ["Students", "245", ""],
    ["Activities", "18", ""],
    ["Features", "12", ""],
    ["Facilities", "9", ""],
  ];

  return (
    <div>
      <div className="superadmin-welcome">
        <p className="superadmin-eyebrow">SCHOOL ADMIN</p>
        <h1>Welcome back, School Admin </h1>
        <p>
          Manage your school information and content from one place.
        </p>
      </div>

      <div className="superadmin-stats">
        {stats.map(([title, value, icon]) => (
          <div className="superadmin-stat-card" key={title}>
            <div className="superadmin-stat-icon">{icon}</div>
            <div>
              <span>{title}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="superadmin-grid">

        <div className="superadmin-panel">
          <div className="superadmin-section-header">
            <div>
              <h2>My School</h2>
              <p>School overview</p>
            </div>
          </div>

          <div className="admin-school-overview">
            <h2>NIA Academy</h2>
            <p>Zanzibar, Tanzania</p>
            <p>
              A modern school focused on academic excellence,
              discipline and innovation.
            </p>

            <span className="status-badge">
              Published
            </span>
          </div>
        </div>

        <div className="superadmin-panel">
          <div className="superadmin-section-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Manage school content</p>
            </div>
          </div>

          <div className="superadmin-quick-actions">
            <button>+ Add Activity</button>
            <button>+ Add Feature</button>
            <button>+ Add Facility</button>
            <button>+ Upload Image</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
