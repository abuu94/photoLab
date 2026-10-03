const Settings = () => {
  return (
    <div className="member-page">

      <div className="member-page-header">
        <div>
          <p className="superadmin-eyebrow">
            ACCOUNT
          </p>

          <h1>Settings</h1>

          <p>
            Manage your account preferences.
          </p>
        </div>
      </div>

      <div className="member-settings-panel">

        <div className="member-setting-item">
          <div>
            <h3>Email Notifications</h3>
            <p>
              Receive important notifications by email.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />
        </div>

        <div className="member-setting-item">
          <div>
            <h3>Like Notifications</h3>
            <p>
              Receive notifications about your activity.
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />
        </div>

        <div className="member-setting-item">
          <div>
            <h3>Change Password</h3>
            <p>
              Update your account password.
            </p>
          </div>

          <button>
            Change Password
          </button>
        </div>

      </div>

    </div>
  );
};

export default Settings;
