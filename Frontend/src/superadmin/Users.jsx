import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("shulebora_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load users"
        );
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error("Users error:", err);
      setError(
        err.message || "Failed to connect to backend"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus =
      currentStatus === "ACTIVE"
        ? "BLOCKED"
        : "ACTIVE";

    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(
        `${API_URL}/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update user status"
        );
      }

      loadUsers();
    } catch (err) {
      alert(
        err.message || "Failed to update user status"
      );
    }
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(
        `${API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete user"
        );
      }

      loadUsers();
    } catch (err) {
      alert(
        err.message || "Failed to delete user"
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.full_name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="superadmin-section-page">
      {/* HEADER */}
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">
            USER MANAGEMENT
          </p>

          <h1>Users</h1>

          <p>
            View, block, unblock and manage platform users.
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="superadmin-error">
          {error}
        </div>
      )}

      {/* MANAGEMENT CARD */}
      <div className="superadmin-management-card">

        {/* SEARCH */}
        <div className="superadmin-search-row">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* TABLE */}
        <div className="superadmin-table-wrapper">
          <table className="superadmin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>
                        {user.full_name}
                      </strong>
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.phone || "-"}
                    </td>

                    <td>
                      {user.role}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          user.status === "ACTIVE"
                            ? "published"
                            : "blocked"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-action"
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.status
                          )
                        }
                      >
                        {user.status === "ACTIVE"
                          ? "Block"
                          : "Unblock"}
                      </button>

                      <button
                        className="table-action danger"
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        Delete
                      </button>
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

export default Users;
