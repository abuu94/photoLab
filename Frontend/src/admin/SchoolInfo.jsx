import { useEffect, useState } from "react";
import API_URL from "../services/api";

const SchoolInfo = () => {
  const [school, setSchool] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("shulebora_token");

  useEffect(() => {
    loadSchool();
  }, []);

  const loadSchool = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/schools/my-school`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load school information"
        );
      }

      setSchool(data.school);

      setName(data.school.name || "");
      setLocation(data.school.location || "");
      setDescription(data.school.description || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_URL}/schools/my-school`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            location,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save school information"
        );
      }

      setMessage(
        "School information saved successfully!"
      );

      await loadSchool();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="superadmin-section-page">
        <div className="superadmin-section-header">
          <div>
            <p className="superadmin-eyebrow">SCHOOL</p>
            <h1>School Information</h1>
            <p>Loading your school information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="superadmin-section-page">

      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SCHOOL</p>

          <h1>School Information</h1>

          <p>
            Manage your school's general information.
          </p>
        </div>
      </div>

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

      {school && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            background: "#f8f9fa",
            borderLeft: "4px solid #0092d0",
          }}
        >
          <strong>School ID:</strong> {school.id}
          {"  "}
          <span style={{ marginLeft: "20px" }}>
            <strong>Status:</strong>{" "}
            {school.publication_status || "N/A"}
          </span>
        </div>
      )}

      <form
        className="superadmin-settings-card"
        onSubmit={save}
      >

        <div className="settings-group">
          <label>School Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        </div>

        <div className="settings-group">
          <label>Location</label>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        <div className="settings-group">
          <label>General Description</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="6"
          />
        </div>

        <button
          type="submit"
          className="superadmin-primary-button"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Information"}
        </button>

      </form>
    </div>
  );
};

export default SchoolInfo;