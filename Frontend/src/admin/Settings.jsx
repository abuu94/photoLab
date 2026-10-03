import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [published, setPublished] = useState(true);

  const save = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">ACCOUNT</p>
          <h1>Settings</h1>
          <p>Manage your school admin settings.</p>
        </div>
      </div>

      <form className="superadmin-settings-card" onSubmit={save}>

        <div className="settings-toggle">
          <div>
            <strong>Email Notifications</strong>
            <p>Receive notifications about your school.</p>
          </div>

          <button
            type="button"
            className={`toggle-button ${
              notifications ? "enabled" : ""
            }`}
            onClick={() => setNotifications(!notifications)}
          >
            <span></span>
          </button>
        </div>

        <div className="settings-toggle">
          <div>
            <strong>School Published</strong>
            <p>Control whether your school is visible publicly.</p>
          </div>

          <button
            type="button"
            className={`toggle-button ${
              published ? "enabled" : ""
            }`}
            onClick={() => setPublished(!published)}
          >
            <span></span>
          </button>
        </div>

        <button className="superadmin-primary-button">
          Save Settings
        </button>

      </form>
    </div>
  );
};

export default Settings;
