import { useEffect, useState } from "react";
import API_URL from "../services/api";

const EMPTY_FORM = {
  phone: "",
  alternate_phone: "",
  email: "",
  address: "",
  website: "",
  social_links: "",
};

const Contacts = () => {
  const [schools, setSchools] = useState([]);
  const [contact, setContact] = useState(null);

  const [schoolId, setSchoolId] = useState("");

  const [loadingSchools, setLoadingSchools] = useState(true);
  const [loadingContact, setLoadingContact] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);

  // =========================================================
  // LOAD SCHOOLS
  // =========================================================
  const loadSchools = async () => {
    try {
      setLoadingSchools(true);
      setError("");

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
      console.error("Load schools error:", err);

      setError(
        err.message || "Failed to load schools"
      );
    } finally {
      setLoadingSchools(false);
    }
  };

  // =========================================================
  // LOAD CONTACT
  // =========================================================
  const loadContact = async (id) => {
    if (!id) {
      setContact(null);
      setForm(EMPTY_FORM);
      return;
    }

    try {
      setLoadingContact(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/content/contacts/${id}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load contact"
        );
      }

      const item = data.contact;

      if (!item) {
        setContact(null);
        setForm(EMPTY_FORM);
        return;
      }

      setContact(item);

      let socialLinks = "";

      if (item.social_links) {
        try {
          if (typeof item.social_links === "string") {
            const parsed = JSON.parse(
              item.social_links
            );

            socialLinks = JSON.stringify(
              parsed,
              null,
              2
            );
          } else {
            socialLinks = JSON.stringify(
              item.social_links,
              null,
              2
            );
          }
        } catch {
          socialLinks =
            item.social_links || "";
        }
      }

      setForm({
        phone: item.phone || "",
        alternate_phone:
          item.alternate_phone || "",
        email: item.email || "",
        address: item.address || "",
        website: item.website || "",
        social_links: socialLinks,
      });
    } catch (err) {
      console.error("Load contact error:", err);

      setError(
        err.message || "Failed to load contact"
      );

      setContact(null);
    } finally {
      setLoadingContact(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    loadSchools();
  }, []);

  // =========================================================
  // SCHOOL CHANGE
  // =========================================================
  useEffect(() => {
    loadContact(schoolId);
  }, [schoolId]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =========================================================
  // SAVE CONTACT
  // =========================================================
  const handleSave = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!schoolId) {
      setError("Please select a school.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem(
        "shulebora_token"
      );

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      let socialLinks = null;

      if (form.social_links.trim()) {
        try {
          socialLinks = JSON.parse(
            form.social_links
          );
        } catch {
          throw new Error(
            "Social Links must contain valid JSON."
          );
        }
      }

      const payload = {
        school_id: Number(schoolId),
        phone: form.phone.trim(),
        alternate_phone:
          form.alternate_phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        website: form.website.trim(),
        social_links: socialLinks,
      };

      const response = await fetch(
        `${API_URL}/content/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save contact"
        );
      }

      await loadContact(schoolId);

      setSuccess(
        contact
          ? "Contact updated successfully."
          : "Contact created successfully."
      );
    } catch (err) {
      console.error("Save contact error:", err);

      setError(
        err.message || "Failed to save contact"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE CONTACT
  // =========================================================
  const handleDelete = async () => {
    if (!schoolId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem(
        "shulebora_token"
      );

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/content/contacts/${schoolId}`,
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
          data.message ||
            "Failed to delete contact"
        );
      }

      setContact(null);
      setForm(EMPTY_FORM);

      setSuccess(
        "Contact deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete contact error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete contact"
      );
    }
  };

  // =========================================================
  // SELECTED SCHOOL NAME
  // =========================================================
  const selectedSchool = schools.find(
    (school) =>
      String(school.id) === String(schoolId)
  );

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="superadmin-section-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="superadmin-section-header">

        <div>
          <p className="superadmin-eyebrow">
            SCHOOL CONTENT
          </p>

          <h1>Contacts</h1>

          <p>
            Manage phone numbers, email,
            address, website and social
            information for each school.
          </p>
        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}
      {error && (
        <div className="superadmin-error">
          {error}
        </div>
      )}

      {/* =====================================================
          SUCCESS
      ===================================================== */}
      {success && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            borderRadius: "6px",
            background: "#e8f7ee",
            color: "#18794e",
            border: "1px solid #b7e4c7",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {success}
        </div>
      )}

      {/* =====================================================
          SCHOOL SELECTOR
      ===================================================== */}
      <div className="superadmin-management-card">

        <div className="settings-group">

          <label>
            Select School
          </label>

          {loadingSchools ? (
            <p>
              Loading schools...
            </p>
          ) : (
            <select
              value={schoolId}
              onChange={(event) =>
                setSchoolId(event.target.value)
              }
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
          )}

        </div>

      </div>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}
      {schoolId && (
        <div className="superadmin-management-card">

          <div className="superadmin-section-header">

            <div>

              <p className="superadmin-eyebrow">
                {selectedSchool?.name ||
                  "SELECTED SCHOOL"}
              </p>

              <h2>
                {contact
                  ? "Edit School Contact"
                  : "Add School Contact"}
              </h2>

              <p>
                Enter the official contact
                information for this school.
              </p>

            </div>

          </div>

          {loadingContact ? (
            <div
              style={{
                padding: "30px 0",
                textAlign: "center",
              }}
            >
              Loading contact information...
            </div>
          ) : (
            <form
              onSubmit={handleSave}
              className="superadmin-settings-card"
            >

              {/* =================================================
                  PHONE
              ================================================= */}
              <div className="settings-group">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+255 777 000 000"
                />

              </div>

              {/* =================================================
                  ALTERNATE PHONE
              ================================================= */}
              <div className="settings-group">

                <label>
                  Alternate Phone
                </label>

                <input
                  type="text"
                  name="alternate_phone"
                  value={
                    form.alternate_phone
                  }
                  onChange={handleChange}
                  placeholder="+255 712 000 000"
                />

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}
              <div className="settings-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="school@example.com"
                />

              </div>

              {/* =================================================
                  ADDRESS
              ================================================= */}
              <div className="settings-group">

                <label>
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Kisauni, Zanzibar"
                />

              </div>

              {/* =================================================
                  WEBSITE
              ================================================= */}
              <div className="settings-group">

                <label>
                  Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />

              </div>

              {/* =================================================
                  SOCIAL LINKS
              ================================================= */}
              <div className="settings-group">

                <label>
                  Social Links
                </label>

                <textarea
                  name="social_links"
                  value={
                    form.social_links
                  }
                  onChange={handleChange}
                  placeholder={`{
  "facebook": "",
  "instagram": "",
  "youtube": "",
  "twitter": ""
}`}
                  rows="8"
                />

                <small
                  style={{
                    display: "block",
                    marginTop: "8px",
                    color: "#777",
                    fontSize: "12px",
                  }}
                >
                  Enter social media links
                  using valid JSON format.
                </small>

              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >

                <button
                  type="submit"
                  className="superadmin-primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : contact
                    ? "Update Contact"
                    : "Save Contact"}
                </button>

                {contact && (
                  <button
                    type="button"
                    className="table-action danger"
                    onClick={handleDelete}
                    disabled={saving}
                  >
                    Delete Contact
                  </button>
                )}

              </div>

            </form>
          )}

        </div>
      )}

      {/* =====================================================
          CONTACT PREVIEW
      ===================================================== */}
      {schoolId &&
        contact &&
        !loadingContact && (
          <div className="superadmin-management-card">

            <div className="superadmin-section-header">

              <div>

                <p className="superadmin-eyebrow">
                  CURRENT INFORMATION
                </p>

                <h2>
                  Contact Preview
                </h2>

              </div>

            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >

              {/* PHONE */}
              <div
                style={{
                  padding: "18px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  Phone
                </strong>

                <p>
                  {contact.phone || "-"}
                </p>
              </div>

              {/* ALTERNATE PHONE */}
              <div
                style={{
                  padding: "18px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  Alternate Phone
                </strong>

                <p>
                  {contact.alternate_phone ||
                    "-"}
                </p>
              </div>

              {/* EMAIL */}
              <div
                style={{
                  padding: "18px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  Email
                </strong>

                <p>
                  {contact.email || "-"}
                </p>
              </div>

              {/* ADDRESS */}
              <div
                style={{
                  padding: "18px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  Address
                </strong>

                <p>
                  {contact.address || "-"}
                </p>
              </div>

              {/* WEBSITE */}
              <div
                style={{
                  padding: "18px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  Website
                </strong>

                <p>
                  {contact.website || "-"}
                </p>
              </div>

              {/* SOCIAL LINKS */}
              <div
                style={{
                  padding: "18px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  Social Links
                </strong>

                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {contact.social_links
                    ? typeof contact.social_links ===
                      "string"
                      ? contact.social_links
                      : JSON.stringify(
                          contact.social_links
                        )
                    : "-"}
                </p>
              </div>

            </div>

          </div>
        )}

    </div>
  );
};

export default Contacts;
