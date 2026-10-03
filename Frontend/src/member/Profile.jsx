const Profile = () => {
  return (
    <div className="member-page">

      <div className="member-page-header">
        <div>
          <p className="superadmin-eyebrow">
            ACCOUNT
          </p>

          <h1>My Profile</h1>

          <p>
            Manage your personal account information.
          </p>
        </div>
      </div>

      <div className="member-profile-panel">

        <div className="member-profile-avatar">
          M
        </div>

        <div className="member-profile-form">

          <div className="member-form-group">
            <label>Full Name</label>
            <input
              type="text"
              defaultValue="Member"
            />
          </div>

          <div className="member-form-group">
            <label>Email Address</label>
            <input
              type="email"
              defaultValue="member@example.com"
            />
          </div>

          <div className="member-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
            />
          </div>

          <button className="superadmin-primary-button">
            Update Profile
          </button>

        </div>
      </div>

    </div>
  );
};

export default Profile;
