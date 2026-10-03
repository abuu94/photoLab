const Schools = () => {
  const schools = [
    { name: "NIA Academy", location: "Zanzibar", status: "Published" },
    { name: "Zanzibar Modern School", location: "Urban West", status: "Published" },
    { name: "Al-Noor Islamic School", location: "Kisauni", status: "Pending" },
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">MANAGEMENT</p>
          <h1>Schools</h1>
          <p>Manage all registered schools on ShuleBora.</p>
        </div>

        <button className="superadmin-primary-button">
          + Add School
        </button>
      </div>

      <div className="superadmin-management-card">
        <div className="superadmin-search-row">
          <input
            type="text"
            placeholder="Search schools..."
          />

          <select>
            <option>All Status</option>
            <option>Published</option>
            <option>Pending</option>
            <option>Unpublished</option>
          </select>
        </div>

        <table className="superadmin-table">
          <thead>
            <tr>
              <th>School</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {schools.map((school) => (
              <tr key={school.name}>
                <td><strong>{school.name}</strong></td>
                <td>{school.location}</td>
                <td>
                  <span className="status-badge published">
                    {school.status}
                  </span>
                </td>
                <td>
                  <button className="table-action">View</button>
                  <button className="table-action">Edit</button>
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

export default Schools;
