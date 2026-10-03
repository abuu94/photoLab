const Schools = () => {
  const schools = [
    {
      name: "NIA Academy",
      location: "Kisauni, Zanzibar",
      students: "450 Students",
    },
    {
      name: "Zanzibar Modern School",
      location: "Urban West, Zanzibar",
      students: "620 Students",
    },
    {
      name: "Al-Noor Islamic School",
      location: "Mkunazini, Zanzibar",
      students: "380 Students",
    },
  ];

  return (
    <div className="member-page">

      <div className="member-page-header">
        <div>
          <p className="superadmin-eyebrow">
            DISCOVER
          </p>

          <h1>Schools</h1>

          <p>
            Explore registered schools across Zanzibar.
          </p>
        </div>
      </div>

      <div className="member-search">
        <input
          type="text"
          placeholder="Search schools..."
        />
      </div>

      <div className="member-school-grid">

        {schools.map((school) => (
          <div
            className="member-school-card"
            key={school.name}
          >
            <div className="member-school-icon">
              🏫
            </div>

            <div>
              <h3>{school.name}</h3>

              <p>
                📍 {school.location}
              </p>

              <span>
                {school.students}
              </span>
            </div>

            <button>
              View School
            </button>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Schools;
