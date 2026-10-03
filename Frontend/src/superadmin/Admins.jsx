const Admins = () => {
  const admins = [
    { name: "Ahmed Ali", email: "ahmed@example.com", school: "NIA Academy", status: "Active" },
    { name: "Fatma Omar", email: "fatma@example.com", school: "Zanzibar Modern School", status: "Active" },
    { name: "Hassan Said", email: "hassan@example.com", school: "Al-Noor Islamic School", status: "Inactive" },
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">MANAGEMENT</p>
          <h1>School Admins</h1>
          <p>Create and manage administrators assigned to schools.</p>
        </div>

        <button className="superadmin-primary-button">
          + Create Admin
        </button>
      </div>

      <div className="superadmin-management-card">
        <table className="superadmin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>School</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin.email}>
                <td><strong>{admin.name}</strong></td>
                <td>{admin.email}</td>
                <td>{admin.school}</td>
                <td>
                  <span className="status-badge published">
                    {admin.status}
                  </span>
                </td>
                <td>
                  <button className="table-action">Edit</button>
                  <button className="table-action">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
