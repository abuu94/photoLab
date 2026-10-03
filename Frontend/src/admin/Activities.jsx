const Activities = () => {
  const activities = [
    ["Science Fair", "Academic", "Published"],
    ["Football Competition", "Sports", "Published"],
    ["Debate Competition", "Academic", "Draft"],
    ["Cultural Day", "Culture", "Published"],
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SCHOOL CONTENT</p>
          <h1>Activities</h1>
          <p>Manage activities happening at your school.</p>
        </div>

        <button className="superadmin-primary-button">
          + Add Activity
        </button>
      </div>

      <div className="superadmin-panel">
        <table className="superadmin-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>
                  <span className="status-badge">
                    {item[2]}
                  </span>
                </td>
                <td>
                  <button className="table-action">Edit</button>
                  <button className="table-action">Delete</button>
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
