import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("shulebora_token");

  const loadFacilities = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/content/my-school/facilities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load facilities");
      }

      setFacilities(data.facilities || data.data || []);
    } catch (error) {
      console.error("Facilities loading error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter facility name.");
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/content/facilities/${editingId}`
        : `${API_URL}/content/facilities`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save facility");
      }

      resetForm();
      await loadFacilities();
    } catch (error) {
      console.error("Facility save error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (facility) => {
    setEditingId(facility.id);

    setForm({
      name: facility.name || "",
      description: facility.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmed) return;

    try {
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

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete facility");
      }

      if (editingId === id) {
        resetForm();
      }

      await loadFacilities();
    } catch (error) {
      console.error("Facility delete error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SCHOOL CONTENT</p>

          <h1>Facilities</h1>

          <p>
            Manage facilities available at your school.
          </p>
        </div>
      </div>

      <div className="superadmin-settings-card">
        <div className="settings-group">
          <h3>
            {editingId ? "Edit Facility" : "Add Facility"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="settings-form-grid">
              <div className="settings-field">
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

              <div className="settings-field">
                <label>Description</label>

                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Facility information"
                />
              </div>
            </div>

            <div className="superadmin-card-actions">
              <button
                type="submit"
                className="superadmin-primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Facility"
                  : "Add Facility"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="superadmin-section-header">
        <div>
          <h2>School Facilities</h2>

          <p>
            {facilities.length} facilities available
          </p>
        </div>
      </div>

      {loading ? (
        <div className="superadmin-settings-card">
          <p>Loading facilities...</p>
        </div>
      ) : facilities.length === 0 ? (
        <div className="superadmin-settings-card">
          <p>No facilities have been added yet.</p>
        </div>
      ) : (
        <div className="superadmin-feature-grid">
          {facilities.map((facility) => (
            <div
              className="superadmin-feature-card"
              key={facility.id}
            >
              <div className="superadmin-feature-icon"></div>

              <div>
                <h3>{facility.name}</h3>

                <p>
                  {facility.description ||
                    "Facility information shown on your school profile."}
                </p>
              </div>

              <div className="superadmin-card-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(facility)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(facility.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Facilities;
