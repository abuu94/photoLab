import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Features = () => {
  const [features, setFeatures] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("shulebora_token");

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/content/my-school/features`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load features"
        );
      }

      setFeatures(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
    setShowForm(false);
  };

  const openAdd = () => {
    resetForm();
    setShowForm(true);
    setMessage("");
    setError("");
  };

  const openEdit = (feature) => {
    setEditingId(feature.id);
    setName(feature.name || "");
    setDescription(feature.description || "");
    setShowForm(true);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const url = editingId
        ? `${API_URL}/content/features/${editingId}`
        : `${API_URL}/content/features`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save feature"
        );
      }

      setMessage(
        editingId
          ? "Feature updated successfully."
          : "Feature created successfully."
      );

      resetForm();
      await loadFeatures();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feature?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_URL}/content/features/${id}`,
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
          data.message || "Failed to delete feature"
        );
      }

      setMessage("Feature deleted successfully.");

      await loadFeatures();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="superadmin-section-page">

      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">
            SCHOOL CONTENT
          </p>

          <h1>Features</h1>

          <p>
            Manage the strengths and features of your school.
          </p>
        </div>

        <button
          type="button"
          className="superadmin-primary-button"
          onClick={openAdd}
        >
          + Add Feature
        </button>
      </div>

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            border: "1px solid #198754",
            color: "#198754",
            background: "#fff",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            border: "1px solid #dc3545",
            color: "#dc3545",
            background: "#fff",
          }}
        >
          {error}
        </div>
      )}

      {showForm && (
        <div
          className="superadmin-settings-card"
          style={{ marginBottom: "25px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>
              {editingId
                ? "Edit Feature"
                : "Add Feature"}
            </h2>

            <button
              type="button"
              className="table-action"
              onClick={resetForm}
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="settings-group">
              <label>Feature Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Qualified Teachers"
                required
              />
            </div>

            <div className="settings-group">
              <label>Description</label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows="5"
                placeholder="Describe this feature..."
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                className="superadmin-primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Feature"
                  : "Save Feature"}
              </button>

              <button
                type="button"
                className="table-action"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      <div className="superadmin-feature-grid">

        {loading ? (
          <p>Loading features...</p>
        ) : features.length === 0 ? (
          <p>
            No features found for your school.
          </p>
        ) : (
          features.map((feature) => (

            <div
              className="superadmin-feature-card"
              key={feature.id}
            >

              <div className="superadmin-feature-icon"></div>

              <div>
                <h3>{feature.name}</h3>

                <p>
                  {feature.description ||
                    "Highlight this strength to the community."}
                </p>
              </div>

              <div className="superadmin-card-actions">

                <button
                  type="button"
                  onClick={() =>
                    openEdit(feature)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(feature.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default Features;
