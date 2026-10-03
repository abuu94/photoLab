import { useState } from "react";

function Settings() {
  const [siteName, setSiteName] = useState("ShuleBora");
  const [email, setEmail] = useState("admin@shulebora.com");
  const [maintenance, setMaintenance] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SYSTEM</p>
          <h1>Settings</h1>
          <p>Manage general ShuleBora platform settings.</p>
        </div>
      </div>

      <form
        className="superadmin-settings-card"
        onSubmit={handleSave}
      >
        <div className="settings-group">
          <label>Platform Name</label>

          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>

        <div className="settings-group">
          <label>Administrator Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="settings-toggle">
          <div>
            <strong>Maintenance Mode</strong>
            <p>
              Temporarily disable public access to the platform.
            </p>
          </div>

          <button
            type="button"
            className={`toggle-button ${
              maintenance ? "enabled" : ""
            }`}
            onClick={() => setMaintenance(!maintenance)}
          >
            <span></span>
          </button>
        </div>

        <button
          type="submit"
          className="superadmin-primary-button"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
