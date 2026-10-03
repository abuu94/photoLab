const Activities = () => {
  const activities = [
    {
      title: "Science Fair 2026",
      school: "NIA Academy",
      status: "Published",
    },
    {
      title: "Inter-School Football",
      school: "Zanzibar Modern School",
      status: "Published",
    },
    {
      title: "Parents Meeting",
      school: "Al-Noor Islamic School",
      status: "Draft",
    },
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">CONTENT MANAGEMENT</p>
          <h1>Activities</h1>
          <p>Manage activities published across schools.</p>
        </div>

        <button className="superadmin-primary-button">
          + Add Activity
        </button>
      </div>

      <div className="superadmin-management-card">
        <table className="superadmin-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>School</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.title}>
                <td><strong>{activity.title}</strong></td>
                <td>{activity.school}</td>
                <td>
                  <span className="status-badge published">
                    {activity.status}
                  </span>
                </td>
                <td>
                  <button className="table-action">Edit</button>
                  <button className="table-action">Publish</button>
                  <button className="table-action danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
