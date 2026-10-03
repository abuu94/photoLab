const Users = () => {
  const users = [
    { name: "Mussa Mohd", email: "mussa@example.com", role: "User", status: "Active" },
    { name: "Amina Ali", email: "amina@example.com", role: "User", status: "Active" },
    { name: "Salim Omar", email: "salim@example.com", role: "User", status: "Blocked" },
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">USER MANAGEMENT</p>
          <h1>Users</h1>
          <p>View, block, unblock and manage platform users.</p>
        </div>
      </div>

      <div className="superadmin-management-card">
        <div className="superadmin-search-row">
          <input
            type="text"
            placeholder="Search users..."
          />
        </div>

        <table className="superadmin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td><strong>{user.name}</strong></td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`status-badge ${
                      user.status === "Active"
                        ? "published"
                        : "blocked"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="table-action">
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button>
                  <button className="table-action danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
