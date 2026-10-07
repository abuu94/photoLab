import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    school_id: "",
  });

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(`${API_URL}/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load admins");
      }

      setAdmins(data.admins || []);
    } catch (err) {
      console.error("Admins error:", err);
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const loadSchools = async () => {
    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(`${API_URL}/schools`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSchools(data.schools || []);
      }
    } catch (err) {
      console.error("Schools error:", err);
    }
  };

  useEffect(() => {
    loadAdmins();
    loadSchools();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Name, email and password are required.");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setCreating(true);

      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(`${API_URL}/admins`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          school_id: form.school_id
            ? Number(form.school_id)
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to create admin"
        );
      }

      alert("Admin created successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        school_id: "",
      });

      setShowForm(false);

      loadAdmins();
    } catch (err) {
      console.error("Create admin error:", err);
      alert(err.message || "Failed to create admin");
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (
    adminId,
    currentStatus
  ) => {
    const newStatus =
      currentStatus === "ACTIVE"
        ? "BLOCKED"
        : "ACTIVE";

    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(
        `${API_URL}/admins/${adminId}/status`,
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
          data.message || "Failed to update admin"
        );
      }

      loadAdmins();
    } catch (err) {
      alert(err.message || "Failed to update admin");
    }
  };

  const handleDelete = async (adminId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(
        `${API_URL}/admins/${adminId}`,
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
          data.message || "Failed to delete admin"
        );
      }

      loadAdmins();
    } catch (err) {
      alert(err.message || "Failed to delete admin");
    }
  };

  const filteredAdmins = admins.filter((admin) => {
    const value = search.toLowerCase();

    return (
      admin.full_name
        ?.toLowerCase()
        .includes(value) ||
      admin.email
        ?.toLowerCase()
        .includes(value) ||
      admin.school_name
        ?.toLowerCase()
        .includes(value)
    );
  });

  return (
    <div className="superadmin-section-page">

      {/* HEADER */}
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">
            MANAGEMENT
          </p>

          <h1>School Admins</h1>

          <p>
            Manage administrators assigned to schools.
          </p>
        </div>

        <button
          className="superadmin-primary-button"
          onClick={() => setShowForm(true)}
        >
          + Create Admin
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="superadmin-error">
          {error}
        </div>
      )}

      {/* CREATE ADMIN FORM */}
      {showForm && (
        <div className="superadmin-management-card">

          <div className="superadmin-section-header">
            <div>
              <p className="superadmin-eyebrow">
                NEW ACCOUNT
              </p>

              <h2>Create School Admin</h2>

              <p>
                Create an administrator account and
                assign it to a school.
              </p>
            </div>

            <button
              type="button"
              className="table-action danger"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>

          <form
            onSubmit={handleCreateAdmin}
            style={{
              padding: "10px 0 20px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "20px",
              }}
            >

              {/* NAME */}
              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              {/* PHONE */}
              <div>
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>

              {/* SCHOOL */}
              <div
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <label>Assign School</label>

                <select
                  name="school_id"
                  value={form.school_id}
                  onChange={handleInputChange}
                >
                  <option value="">
                    Select School
                  </option>

                  {schools.map((school) => (
                    <option
                      key={school.id}
                      value={school.id}
                    >
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <button
                type="button"
                className="table-action"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="superadmin-primary-button"
                disabled={creating}
              >
                {creating
                  ? "Creating..."
                  : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADMINS TABLE */}
      <div className="superadmin-management-card">

        <div className="superadmin-search-row">
          <input
            type="text"
            placeholder="Search admins..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="superadmin-table-wrapper">
          <table className="superadmin-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>School</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">
                    Loading admins...
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No admins found.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id}>

                    <td>
                      <strong>
                        {admin.full_name}
                      </strong>
                    </td>

                    <td>{admin.email}</td>

                    <td>
                      {admin.phone || "-"}
                    </td>

                    <td>
                      {admin.school_name ||
                        "Not assigned"}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          admin.status === "ACTIVE"
                            ? "published"
                            : "blocked"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-action"
                        onClick={() =>
                          handleStatusChange(
                            admin.id,
                            admin.status
                          )
                        }
                      >
                        {admin.status === "ACTIVE"
                          ? "Block"
                          : "Unblock"}
                      </button>

                      <button
                        className="table-action danger"
                        onClick={() =>
                          handleDelete(admin.id)
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

export default Admins;