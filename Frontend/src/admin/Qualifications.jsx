const Qualifications = () => {
  const qualifications = [
    "Qualified Teaching Staff",
    "National Examination Success",
    "Modern Curriculum",
    "Student Leadership",
    "ICT Education",
    "Sports Development",
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">ACADEMICS</p>
          <h1>Qualifications & Strengths</h1>
          <p>Showcase your school's academic strengths.</p>
        </div>

        <button className="superadmin-primary-button">
          + Add Qualification
        </button>
      </div>

      <div className="superadmin-feature-grid">
        {qualifications.map((item) => (
          <div className="superadmin-feature-card" key={item}>
            <div className="superadmin-feature-icon"></div>

            <div>
              <h3>{item}</h3>
              <p>
                Academic qualification or school strength.
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

export default Qualifications;
