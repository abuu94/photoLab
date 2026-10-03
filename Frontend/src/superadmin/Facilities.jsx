const Facilities = () => {
  const facilities = [
    "Science Laboratory",
    "Computer Laboratory",
    "Library",
    "Football Ground",
    "School Bus",
    "Dining Hall",
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">
            SCHOOL INFORMATION
          </p>

          <h1>Facilities</h1>

          <p>
            Manage facilities available at schools.
          </p>
        </div>

        <button className="superadmin-primary-button">
          + Add Facility
        </button>
      </div>

      <div className="superadmin-feature-grid">
        {facilities.map((facility) => (
          <div
            className="superadmin-feature-card"
            key={facility}
          >
            <div className="superadmin-feature-icon">
              
            </div>

            <div>
              <h3>{facility}</h3>

              <p>
                Facility information managed by SuperAdmin.
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

export default Facilities;
