import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const Contacts = () => {
  const [contact, setContact] = useState({
    phone: "",
    alternate_phone: "",
    email: "",
    address: "",
    website: "",
    social_links: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("shulebora_token");

  const loadContact = async () => {
    try {
      setLoading(true);

      const schoolResponse = await fetch(
        `${API_URL}/schools/my-school`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const schoolData = await schoolResponse.json();

      if (!schoolResponse.ok) {
        throw new Error(
          schoolData.message || "Failed to get school information"
        );
      }

      const schoolId =
        schoolData.school?.id ||
        schoolData.data?.id ||
        schoolData.id;

      if (!schoolId) {
        throw new Error("Unable to identify your assigned school.");
      }

      const response = await fetch(
        `${API_URL}/content/contacts/${schoolId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load contact information"
        );
      }

      if (data.contact) {
        let socialLinks = data.contact.social_links || "";

        if (typeof socialLinks === "object") {
          socialLinks = JSON.stringify(socialLinks);
        }

        setContact({
          phone: data.contact.phone || "",
          alternate_phone: data.contact.alternate_phone || "",
          email: data.contact.email || "",
          address: data.contact.address || "",
          website: data.contact.website || "",
          social_links: socialLinks,
        });
      }
    } catch (error) {
      console.error("Contact loading error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let socialLinks = contact.social_links;

      if (socialLinks.trim()) {
        try {
          socialLinks = JSON.parse(socialLinks);
        } catch {
          socialLinks = {
            links: socialLinks,
          };
        }
      } else {
        socialLinks = null;
      }

      const response = await fetch(
        `${API_URL}/content/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: contact.phone,
            alternate_phone: contact.alternate_phone,
            email: contact.email,
            address: contact.address,
            website: contact.website,
            social_links: socialLinks,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save contact information"
        );
      }

      alert("Contact information saved successfully!");

      await loadContact();
    } catch (error) {
      console.error("Contact save error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="superadmin-section-page">
        <div className="superadmin-settings-card">
          <p>Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">CONTACT</p>

          <h1>School Contacts</h1>

          <p>
            Manage how the community can contact your school.
          </p>
        </div>
      </div>

      <form
        className="superadmin-settings-card"
        onSubmit={save}
      >
        <div className="settings-group">
          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="+255 000 000 000"
          />
        </div>

        <div className="settings-group">
          <label>Alternative Phone Number</label>

          <input
            type="text"
            name="alternate_phone"
            value={contact.alternate_phone}
            onChange={handleChange}
            placeholder="+255 000 000 000"
          />
        </div>

        <div className="settings-group">
          <label>Email Address</label>

          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="school@example.com"
          />
        </div>

        <div className="settings-group">
          <label>Address</label>

          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            placeholder="Zanzibar, Tanzania"
          />
        </div>

        <div className="settings-group">
          <label>Website</label>

          <input
            type="text"
            name="website"
            value={contact.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="settings-group">
          <label>Social Links</label>

          <textarea
            name="social_links"
            value={contact.social_links}
            onChange={handleChange}
            placeholder='{"facebook":"https://facebook.com/...", "instagram":"https://instagram.com/..."}'
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="superadmin-primary-button"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Contacts"}
        </button>
      </form>
    </div>
  );
};

export default Contacts;
