import { useState } from "react";

const Photos = () => {
  const [likedPhotos, setLikedPhotos] = useState([]);

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
    {
      id: 4,
      school: "NIA Academy",
      title: "Classroom",
      views: 390,
      likes: 95,
    },
    {
      id: 5,
      school: "Zanzibar Modern School",
      title: "Science Laboratory",
      views: 510,
      likes: 143,
    },
    {
      id: 6,
      school: "Al-Noor Islamic School",
      title: "School Building",
      views: 330,
      likes: 78,
    },
  ];

  const toggleLike = (id) => {
    setLikedPhotos((current) =>
      current.includes(id)
        ? current.filter((photoId) => photoId !== id)
        : [...current, id]
    );
  };

  return (
    <div className="member-page">

      <div className="member-page-header">
        <div>
          <p className="superadmin-eyebrow">
            MEDIA
          </p>

          <h1>School Photos</h1>

          <p>
            Explore photos from schools across Zanzibar.
          </p>
        </div>
      </div>

      <div className="member-search">
        <input
          type="text"
          placeholder="Search photos or schools..."
        />

        <select defaultValue="all">
          <option value="all">
            All Schools
          </option>

          <option value="nia">
            NIA Academy
          </option>

          <option value="modern">
            Zanzibar Modern School
          </option>

          <option value="noor">
            Al-Noor Islamic School
          </option>
        </select>
      </div>

      <div className="member-photo-grid">

        {photos.map((photo) => {
          const liked = likedPhotos.includes(photo.id);

          return (
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
                  <span>
                    👁 {photo.views}
                  </span>

                  <span>
                    ❤️ {photo.likes + (liked ? 1 : 0)}
                  </span>
                </div>

                <button
                  type="button"
                  className={`member-like-button ${
                    liked ? "liked" : ""
                  }`}
                  onClick={() => toggleLike(photo.id)}
                >
                  {liked ? "❤️ Liked" : "♡ Like"}
                </button>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Photos;
