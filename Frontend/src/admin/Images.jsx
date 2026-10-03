const Images = () => {
  const images = [
    "School Building",
    "Classroom",
    "Science Laboratory",
    "Sports Ground",
    "School Event",
    "Students",
  ];

  return (
    <div className="superadmin-section-page">
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">MEDIA</p>
          <h1>School Images</h1>
          <p>Manage images displayed on your school profile.</p>
        </div>

        <button className="superadmin-primary-button">
          + Upload Image
        </button>
      </div>

      <div className="superadmin-feature-grid">
        {images.map((image) => (
          <div className="superadmin-feature-card" key={image}>
            <div className="superadmin-feature-icon"></div>

            <div>
              <h3>{image}</h3>
              <p>School image</p>
            </div>

            <div className="superadmin-card-actions">
              <button>View</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
