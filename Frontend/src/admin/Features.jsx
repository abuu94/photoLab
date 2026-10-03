const Features = () => {
  const features = [
    "Qualified Teachers",
    "Modern Learning",
    "Student Development",
    "Academic Excellence",
    "Technology Integration",
    "Safe Environment",
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">SCHOOL CONTENT</p>
          <h1>Features</h1>
          <p>Manage the strengths and features of your school.</p>
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
              <p>
                Highlight this strength to the community.
              </p>
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
