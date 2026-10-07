import { useEffect, useState } from "react";
import API_URL from "../services/api";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    school_id: "",
    title: "",
    category: "",
    description: "",
    event_date: "",
    status: "PUBLISHED",
    image_url: "",
  });

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("shulebora_token");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (category) {
        params.append("category", category);
      }

      const response = await fetch(
        `${API_URL}/activities?${params.toString()}`,
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
      setError(
        err.message || "Failed to load activities"
      );
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    loadSchools();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadActivities();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.school_id ||
      !form.title ||
      !form.category ||
      !form.event_date
    ) {
      setError(
        "School, title, category and event date are required."
      );
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem(
        "shulebora_token"
      );

      const response = await fetch(
        `${API_URL}/activities`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            school_id: Number(form.school_id),
            title: form.title,
            category: form.category,
            description: form.description,
            event_date: form.event_date,
            status: form.status,
            image_url: form.image_url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to create activity"
        );
      }

      setForm({
        school_id: "",
        title: "",
        category: "",
        description: "",
        event_date: "",
        status: "PUBLISHED",
        image_url: "",
      });

      setShowForm(false);

      await loadActivities();

      alert("Activity created successfully.");
    } catch (err) {
      setError(
        err.message || "Failed to create activity"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (activityId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem(
        "shulebora_token"
      );

      const response = await fetch(
        `${API_URL}/activities/${activityId}`,
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

      await loadActivities();
    } catch (err) {
      alert(
        err.message || "Failed to delete activity"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const categories = [
    ...new Set(
      activities
        .map((activity) => activity.category)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="superadmin-section-page">

      <div className="superadmin-section-header">

        <div>
          <p className="superadmin-eyebrow">
            MANAGEMENT
          </p>

          <h1>Activities</h1>

          <p>
            Manage school activities and events
            published on ShuleBora.
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
            : "+ Add Activity"}
        </button>

      </div>

      {error && (
        <div className="superadmin-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="superadmin-management-card">

          <div className="superadmin-section-header">
            <div>
              <h2>Create New Activity</h2>

              <p>
                Add an activity and assign it to
                a published school.
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
              <label>Activity Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Annual Sports Day"
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
                placeholder="e.g. Sports"
                required
              />
            </div>

            <div className="settings-group">
              <label>Event Date</label>

              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="settings-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="PUBLISHED">
                  PUBLISHED
                </option>

                <option value="DRAFT">
                  DRAFT
                </option>
              </select>
            </div>

            <div className="settings-group">
              <label>Image URL</label>

              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="settings-group">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the activity..."
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
                : "Create Activity"}
            </button>

          </form>
        </div>
      )}

      <div className="superadmin-management-card">

        <div className="superadmin-search-row">

          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        <div className="superadmin-table-wrapper">

          <table className="superadmin-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>School</th>
                <th>Category</th>
                <th>Event Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="6">
                    Loading activities...
                  </td>
                </tr>
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity.id}>

                    <td>
                      <strong>
                        {activity.title}
                      </strong>
                    </td>

                    <td>
                      {activity.school_name ||
                        "Unknown School"}
                    </td>

                    <td>
                      {activity.category ||
                        "-"}
                    </td>

                    <td>
                      {formatDate(
                        activity.event_date
                      )}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          activity.status ===
                          "PUBLISHED"
                            ? "published"
                            : "blocked"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-action danger"
                        onClick={() =>
                          handleDelete(
                            activity.id
                          )
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

export default Activities;
