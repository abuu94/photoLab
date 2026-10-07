import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const Qualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("shulebora_token");

  const loadQualifications = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/content/my-school/qualifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load qualifications"
        );
      }

      setQualifications(data.items || []);
    } catch (error) {
      console.error("Qualifications loading error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQualifications();
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
      alert("Please enter qualification name.");
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/content/qualifications/${editingId}`
        : `${API_URL}/content/qualifications`;

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
        throw new Error(
          data.message || "Failed to save qualification"
        );
      }

      resetForm();
      await loadQualifications();
    } catch (error) {
      console.error("Qualification save error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (qualification) => {
    setEditingId(qualification.id);

    setForm({
      name: qualification.name || "",
      description: qualification.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this qualification?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/content/qualifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete qualification"
        );
      }

      if (editingId === id) {
        resetForm();
      }

      await loadQualifications();
    } catch (error) {
      console.error("Qualification delete error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">ACADEMICS</p>

          <h1>Qualifications & Strengths</h1>

          <p>
            Showcase your school's academic strengths.
          </p>
        </div>
      </div>

      <div className="superadmin-settings-card">
        <div className="settings-group">
          <h3>
            {editingId
              ? "Edit Qualification"
              : "Add Qualification"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="settings-form-grid">
              <div className="settings-field">
                <label>Qualification / Strength</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Qualified Teaching Staff"
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
                  placeholder="Describe this qualification or strength"
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
                  ? "Update Qualification"
                  : "Add Qualification"}
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
          <h2>School Qualifications</h2>

          <p>
            {qualifications.length} qualifications available
          </p>
        </div>
      </div>

      {loading ? (
        <div className="superadmin-settings-card">
          <p>Loading qualifications...</p>
        </div>
      ) : qualifications.length === 0 ? (
        <div className="superadmin-settings-card">
          <p>
            No qualifications have been added yet.
          </p>
        </div>
      ) : (
        <div className="superadmin-feature-grid">
          {qualifications.map((item) => (
            <div
              className="superadmin-feature-card"
              key={item.id}
            >
              <div className="superadmin-feature-icon"></div>

              <div>
                <h3>{item.name}</h3>

                <p>
                  {item.description ||
                    "Academic qualification or school strength."}
                </p>
              </div>

              <div className="superadmin-card-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
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

export default Qualifications;
