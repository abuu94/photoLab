const Features = () => {
  const features = [
    "Academic Excellence",
    "Qualified Teachers",
    "Sports Programs",
    "ICT Education",
    "Islamic Studies",
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SCHOOL INFORMATION</p>
          <h1>Features</h1>
          <p>Manage school strengths and key features.</p>
        </div>

        <button className="superadmin-primary-button">
          + Add Feature
        </button>
      </div>

      <div className="superadmin-feature-grid">
        {features.map((feature) => (
          <div className="superadmin-feature-card" key={feature}>
            <div className="superadmin-feature-icon"></div>

            <div>
              <h3>{feature}</h3>
              <p>School feature available on the platform.</p>
            </div>

            <div className="superadmin-card-actions">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
