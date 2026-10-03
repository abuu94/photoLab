const Dashboard = () => {
  const stats = [
    ["24", "Schools", "🏫"],
    ["86", "Photos", "🖼"],
    ["35", "My Likes", "❤️"],
  ];

  const photos = [
    {
      id: 1,
      school: "NIA Academy",
      title: "Sports Day",
      views: 450,
      likes: 120,
    },
    {
      id: 2,
      school: "Zanzibar Modern School",
      title: "School Event",
      views: 620,
      likes: 185,
    },
    {
      id: 3,
      school: "Al-Noor Islamic School",
      title: "Students Activity",
      views: 280,
      likes: 64,
    },
  ];

  return (
    <div className="member-page">

      <div className="superadmin-welcome">
        <p className="superadmin-eyebrow">
          MEMBER PORTAL
        </p>

        <h1>Welcome back</h1>

        <p>
          Discover schools and explore the latest
          school photos and activities.
        </p>
      </div>

      <div className="superadmin-stats-grid">

        {stats.map(([value, label, icon]) => (
          <div
            className="superadmin-stat-card"
            key={label}
          >
            <div className="superadmin-stat-icon">
              {icon}
            </div>

            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}

      </div>

      <div className="member-panel">

        <div className="member-panel-header">
          <div>
            <p className="superadmin-eyebrow">
              DISCOVER
            </p>

            <h2>Latest School Photos</h2>
          </div>
        </div>

        <div className="member-photo-grid">

          {photos.map((photo) => (
            <div
              className="member-photo-card"
              key={photo.id}
            >

              <div className="member-photo-placeholder">
                🖼
              </div>

              <div className="member-photo-content">

                <span className="member-school">
                  {photo.school}
                </span>

                <h3>{photo.title}</h3>

                <div className="member-photo-meta">
                  <span>👁 {photo.views}</span>
                  <span>❤️ {photo.likes}</span>
                </div>

                <button className="member-like-button">
                  ♡ Like
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
