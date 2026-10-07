import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    school_id: "",
    name: "",
    description: "",
  });

  const loadSchools = async () => {
    try {
      const response = await fetch(
        `${API_URL}/schools?status=PUBLISHED`
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
    }
  };

  const loadFacilities = async () => {
    if (!form.school_id) {
      setFacilities([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/content/facilities/${form.school_id}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load facilities"
        );
      }

      setFacilities(data.items || []);
    } catch (err) {
      setError(
        err.message || "Failed to load facilities"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchools();
  }, []);

  useEffect(() => {
    loadFacilities();
  }, [form.school_id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.school_id || !form.name) {
      setError(
        "School and facility name are required."
      );
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem(
        "shulebora_token"
      );

      const response = await fetch(
        `${API_URL}/content/facilities`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            school_id: Number(form.school_id),
            name: form.name,
            description: form.description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to create facility"
        );
      }

      setForm({
        ...form,
        name: "",
        description: "",
      });

      setShowForm(false);

      await loadFacilities();

      alert("Facility created successfully.");
    } catch (err) {
      setError(
        err.message || "Failed to create facility"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem(
        "shulebora_token"
      );

      const response = await fetch(
        `${API_URL}/content/facilities/${id}`,
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
          data.message || "Failed to delete facility"
        );
      }

      await loadFacilities();
    } catch (err) {
      alert(
        err.message || "Failed to delete facility"
      );
    }
  };

  const filteredFacilities = facilities.filter(
    (facility) => {
      const value = search.toLowerCase();

      return (
        facility.name
          ?.toLowerCase()
          .includes(value) ||
        facility.description
          ?.toLowerCase()
          .includes(value)
      );
    }
  );

  return (
    <div className="superadmin-section-page">

      <div className="superadmin-section-header">

        <div>
          <p className="superadmin-eyebrow">
            SCHOOL CONTENT
          </p>

          <h1>Facilities</h1>

          <p>
            Manage facilities available at
            each school.
          </p>
        </div>

        <button
          className="superadmin-primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          {showForm
            ? "Close Form"
            : "+ Add Facility"}
        </button>

      </div>

      {error && (
        <div className="superadmin-error">
          {error}
        </div>
      )}

      <div className="superadmin-management-card">

        <div className="superadmin-search-row">

          <select
            name="school_id"
            value={form.school_id}
            onChange={handleChange}
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

          <input
            type="text"
            placeholder="Search facilities..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {showForm && (
        <div className="superadmin-management-card">

          <div className="superadmin-section-header">
            <div>
              <h2>Create Facility</h2>

              <p>
                Add a facility to the selected
                school.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleCreate}
            className="superadmin-settings-card"
          >

            <div className="settings-group">
              <label>School</label>

              <select
                name="school_id"
                value={form.school_id}
                onChange={handleChange}
                required
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

            <div className="settings-group">
              <label>Facility Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Science Laboratory"
                required
              />
            </div>

            <div className="settings-group">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe this facility..."
                rows="5"
              />
            </div>

            <button
              type="submit"
              className="superadmin-primary-button"
              disabled={saving}
            >
              {saving
                ? "Creating..."
                : "Create Facility"}
            </button>

          </form>
        </div>
      )}

      <div className="superadmin-management-card">

        <div className="superadmin-table-wrapper">

          <table className="superadmin-table">

            <thead>
              <tr>
                <th>Facility</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {!form.school_id ? (
                <tr>
                  <td colSpan="3">
                    Select a school to view facilities.
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan="3">
                    Loading facilities...
                  </td>
                </tr>
              ) : filteredFacilities.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    No facilities found.
                  </td>
                </tr>
              ) : (
                filteredFacilities.map(
                  (facility) => (
                    <tr key={facility.id}>

                      <td>
                        <strong>
                          {facility.name}
                        </strong>
                      </td>

                      <td>
                        {facility.description ||
                          "-"}
                      </td>

                      <td>
                        <button
                          className="table-action danger"
                          onClick={() =>
                            handleDelete(
                              facility.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Facilities;
