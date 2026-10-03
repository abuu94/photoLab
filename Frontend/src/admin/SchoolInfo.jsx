import { useState } from "react";

const SchoolInfo = () => {
  const [name, setName] = useState("NIA Academy");
  const [location, setLocation] = useState("Zanzibar, Tanzania");
  const [description, setDescription] = useState(
    "A modern school focused on academic excellence, discipline and innovation."
  );

  const save = (e) => {
    e.preventDefault();
    alert("School information saved successfully!");
  };

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SCHOOL</p>
          <h1>School Information</h1>
          <p>Manage your school's general information.</p>
        </div>
      </div>

      <form className="superadmin-settings-card" onSubmit={save}>
        <div className="settings-group">
          <label>School Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="settings-group">
          <label>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="settings-group">
          <label>General Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
          />
        </div>

        <button className="superadmin-primary-button">
          Save Information
        </button>
      </form>
    </div>
  );
};

export default SchoolInfo;
