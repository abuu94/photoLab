import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("PUBLISHED");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSchools = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (statusFilter !== "All Status") {
        params.append("status", statusFilter);
      }

      const response = await fetch(
        `${API_URL}/schools?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load schools"
        );
      }

      setSchools(data.schools || []);
    } catch (err) {
      console.error("Schools error:", err);
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchools();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadSchools();
  };

  const handleDelete = async (schoolId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this school?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(
        `${API_URL}/schools/${schoolId}`,
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
          data.message || "Failed to delete school"
        );
      }

      loadSchools();
    } catch (err) {
      alert(err.message || "Failed to delete school");
    }
  };

  const handleStatusChange = async (schoolId, status) => {
    try {
      const token = localStorage.getItem("shulebora_token");

      const response = await fetch(
        `${API_URL}/schools/${schoolId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      loadSchools();
    } catch (err) {
      alert(err.message || "Failed to update school status");
    }
  };

  const getStatusClass = (status) => {
    if (status === "PUBLISHED") {
      return "published";
    }

    if (status === "PENDING") {
      return "pending";
    }

    return "unpublished";
  };

  return (
    <div className="superadmin-section-page">
      {/* HEADER */}
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">
            MANAGEMENT
          </p>

          <h1>Schools</h1>

          <p>
            Manage all registered schools on ShuleBora.
          </p>
        </div>

        <button className="superadmin-primary-button">
          + Add School
        </button>
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
        <form
          className="superadmin-search-row"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All Status">
              All Status
            </option>

            <option value="PUBLISHED">
              Published
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="UNPUBLISHED">
              Unpublished
            </option>
          </select>

          <button
            type="submit"
            className="superadmin-primary-button"
          >
            Search
          </button>
        </form>

        {/* TABLE */}
        <div className="superadmin-table-wrapper">
          <table className="superadmin-table">
            <thead>
              <tr>
                <th>School</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">
                    Loading schools...
                  </td>
                </tr>
              ) : schools.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    No schools found.
                  </td>
                </tr>
              ) : (
                schools.map((school) => (
                  <tr key={school.id}>
                    <td>
                      <strong>
                        {school.name}
                      </strong>
                    </td>

                    <td>
                      {school.location || "-"}
                    </td>

                    <td>
                      {school.school_type || "-"}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          school.publication_status
                        )}`}
                      >
                        {school.publication_status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-action"
                        onClick={() =>
                          alert(
                            `School ID: ${school.id}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        className="table-action"
                        onClick={() =>
                          alert(
                            "Edit feature will be connected next."
                          )
                        }
                      >
                        Edit
                      </button>

                      {school.publication_status !==
                        "PUBLISHED" && (
                        <button
                          className="table-action"
                          onClick={() =>
                            handleStatusChange(
                              school.id,
                              "PUBLISHED"
                            )
                          }
                        >
                          Publish
                        </button>
                      )}

                      <button
                        className="table-action danger"
                        onClick={() =>
                          handleDelete(school.id)
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

export default Schools;