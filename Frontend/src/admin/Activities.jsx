import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    event_date: "",
    status: "DRAFT",
    image: null,
  });

  const token = localStorage.getItem("shulebora_token");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/activities/my-school`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load activities"
        );
      }

      setActivities(data.activities || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      event_date: "",
      status: "DRAFT",
      image: null,
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append(
        "description",
        form.description
      );
      formData.append(
        "event_date",
        form.event_date
      );
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      const url = editingId
        ? `${API_URL}/activities/${editingId}`
        : `${API_URL}/activities`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save activity"
        );
      }

      setMessage(
        editingId
          ? "Activity updated successfully."
          : "Activity created successfully."
      );

      resetForm();

      await loadActivities();

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (activity) => {
    setEditingId(activity.id);

    setForm({
      title: activity.title || "",
      category: activity.category || "",
      description: activity.description || "",
      event_date: activity.event_date
        ? String(activity.event_date).substring(0, 10)
        : "",
      status: activity.status || "DRAFT",
      image: null,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/activities/${id}`,
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
          data.message || "Failed to delete activity"
        );
      }

      setMessage(
        "Activity deleted successfully."
      );

      await loadActivities();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="superadmin-section-page">

      {/* HEADER */}
      <div className="superadmin-section-header">

        <div>
          <p className="superadmin-eyebrow">
            SCHOOL CONTENT
          </p>

          <h1>Activities</h1>

          <p>
            Manage activities happening at your school.
          </p>
        </div>

        <button
          type="button"
          className="superadmin-primary-button"
          onClick={() => {
            setEditingId(null);

            setForm({
              title: "",
              category: "",
              description: "",
              event_date: "",
              status: "DRAFT",
              image: null,
            });

            setShowForm(true);
            setMessage("");
            setError("");
          }}
        >
          + Add Activity
        </button>

      </div>

      {/* MESSAGE */}
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

      {/* FORM */}
      {showForm && (
        <div
          className="superadmin-settings-card"
          style={{
            marginBottom: "25px",
          }}
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
                ? "Edit Activity"
                : "Add Activity"}
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
              <label>Activity Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Science Fair"
                required
              />
            </div>

            <div className="settings-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Academic, Sports, Culture"
              />
            </div>

            <div className="settings-group">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the activity..."
              />
            </div>

            <div className="settings-group">
              <label>Event Date</label>

              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
              />
            </div>

            <div className="settings-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>
              </select>
            </div>

            <div className="settings-group">
              <label>Activity Image</label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
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
                  ? "Update Activity"
                  : "Save Activity"}
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

      {/* ACTIVITIES TABLE */}
      <div className="superadmin-panel">

        {loading ? (
          <p>Loading activities...</p>
        ) : activities.length === 0 ? (
          <p>
            No activities found for your school.
          </p>
        ) : (
          <table className="superadmin-table">

            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Event Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {activities.map((activity) => (

                <tr key={activity.id}>

                  <td>
                    {activity.title}
                  </td>

                  <td>
                    {activity.category || "-"}
                  </td>

                  <td>
                    {activity.event_date
                      ? String(
                          activity.event_date
                        ).substring(0, 10)
                      : "-"}
                  </td>

                  <td>
                    <span className="status-badge">
                      {activity.status}
                    </span>
                  </td>

                  <td>

                    <button
                      type="button"
                      className="table-action"
                      onClick={() =>
                        handleEdit(activity)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="table-action"
                      onClick={() =>
                        handleDelete(activity.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default Activities;