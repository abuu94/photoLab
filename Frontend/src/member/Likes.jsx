const Likes = () => {
  const likedPhotos = [
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

      {/* HEADER */}
      <div className="member-page-header">

        <div>

          <p className="superadmin-eyebrow">
            MY ACTIVITY
          </p>

          <h1>
            My Likes
          </h1>

          <p>
            Photos you have liked on ShuleBora.
          </p>

        </div>

      </div>

      {/* LIKED PHOTOS */}
      <div className="member-photo-grid">

        {likedPhotos.map((photo) => (

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

              <h3>
                {photo.title}
              </h3>

              <div className="member-photo-meta">

                <span>
                  👁 {photo.views}
                </span>

                <span>
                  ❤️ {photo.likes}
                </span>

              </div>

              <button
                type="button"
                className="member-like-button liked"
              >
                ❤️ Liked
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Likes;