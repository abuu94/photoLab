import { useState } from "react";

const Images = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "School Building",
      category: "School",
      views: 450,
      likes: 120,
      date: "03 Oct 2026",
    },
    {
      id: 2,
      title: "Classroom",
      category: "Learning",
      views: 320,
      likes: 86,
      date: "02 Oct 2026",
    },
    {
      id: 3,
      title: "Science Laboratory",
      category: "Facilities",
      views: 280,
      likes: 64,
      date: "01 Oct 2026",
    },
    {
      id: 4,
      title: "Sports Ground",
      category: "Sports",
      views: 610,
      likes: 185,
      date: "30 Sep 2026",
    },
    {
      id: 5,
      title: "School Event",
      category: "Events",
      views: 720,
      likes: 240,
      date: "28 Sep 2026",
    },
    {
      id: 6,
      title: "Students",
      category: "Students",
      views: 540,
      likes: 156,
      date: "27 Sep 2026",
    },
  ]);

  const totalViews = images.reduce(
    (total, image) => total + image.views,
    0
  );

  const totalLikes = images.reduce(
    (total, image) => total + image.likes,
    0
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    setImages((currentImages) =>
      currentImages.filter((image) => image.id !== id)
    );
  };

  const handleView = (image) => {
    alert(
      `${image.title}\n\nViews: ${image.views}\nLikes: ${image.likes}`
    );
  };

  return (
    <div className="superadmin-section-page">

      {/* HEADER */}
      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">MEDIA</p>

          <h1>School Photos</h1>

          <p>
            Manage and monitor photos posted by your school.
          </p>
        </div>

        <button
          type="button"
          className="superadmin-primary-button"
        >
          + Upload Photo
        </button>
      </div>

      {/* STATISTICS */}
      <div className="superadmin-stats-grid">

        <div className="superadmin-stat-card">
          <div className="superadmin-stat-icon">
            🖼
          </div>

          <div>
            <span>Total Photos</span>
            <strong>{images.length}</strong>
          </div>
        </div>

        <div className="superadmin-stat-card">
          <div className="superadmin-stat-icon">
            👁
          </div>

          <div>
            <span>Total Views</span>
            <strong>
              {totalViews.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="superadmin-stat-card">
          <div className="superadmin-stat-icon">
            ❤️
          </div>

          <div>
            <span>Total Likes</span>
            <strong>
              {totalLikes.toLocaleString()}
            </strong>
          </div>
        </div>

      </div>

      {/* PHOTO SECTION */}
      <div className="superadmin-panel">

        <div className="superadmin-panel-header">
          <div>
            <h2>My School Photos</h2>

            <p>
              Photos uploaded to your school profile.
            </p>
          </div>
        </div>

        {/* PHOTOS */}
        <div className="superadmin-photo-grid">

          {images.map((image) => (
            <div
              className="superadmin-photo-card"
              key={image.id}
            >

              {/* IMAGE PLACEHOLDER */}
              <div className="superadmin-photo-preview">
                <span>🖼</span>
              </div>

              {/* PHOTO INFO */}
              <div className="superadmin-photo-body">

                <div className="superadmin-photo-title-row">
                  <div>
                    <h3>{image.title}</h3>

                    <p>
                      {image.category}
                    </p>
                  </div>
                </div>

                {/* STATS */}
                <div className="superadmin-photo-stats">

                  <span>
                    👁 {image.views.toLocaleString()}
                  </span>

                  <span>
                    ❤️ {image.likes.toLocaleString()}
                  </span>

                </div>

                <small>
                  Posted: {image.date}
                </small>

                {/* ACTIONS */}
                <div className="superadmin-card-actions">

                  <button
                    type="button"
                    onClick={() => handleView(image)}
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* EMPTY STATE */}
        {images.length === 0 && (
          <div className="superadmin-empty-state">
            <div>🖼</div>

            <h3>No photos available</h3>

            <p>
              Upload your first school photo to
              display it on your school profile.
            </p>

            <button
              type="button"
              className="superadmin-primary-button"
            >
              + Upload Photo
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Images;