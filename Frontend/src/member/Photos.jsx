import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

export default function Photos() {
  const token = localStorage.getItem("shulebora_token");

  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/schools`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load schools");
        return res.json();
      })
      .then((data) => {
        const list = data.schools || [];

        setSchools(list);

        if (list.length > 0) {
          setSelectedSchool(list[0]);
        }

        setLoadingSchools(false);
      })
      .catch((error) => {
        console.error(error);
        setSchools([]);
        setLoadingSchools(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedSchool) return;

    setLoadingPhotos(true);
    setPhotos([]);
    setMessage("");

    fetch(`${API_URL}/content/images/${selectedSchool.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load photos");
        return res.json();
      })
      .then((data) => {
        setPhotos(data.images || []);
        setLoadingPhotos(false);
      })
      .catch((error) => {
        console.error(error);
        setPhotos([]);
        setLoadingPhotos(false);
        setMessage("Unable to load school photos.");
      });
  }, [selectedSchool]);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/dashboard/member/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const likes = data.likes || [];

        setLikedPhotos(
          likes.map((item) => Number(item.image_id))
        );
      })
      .catch((error) => {
        console.error(error);
        setLikedPhotos([]);
      });
  }, [token]);

  const toggleLike = async (imageId) => {
    if (!token) {
      setMessage("Please login to like photos.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/dashboard/member/likes/${imageId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Unable to update like.");
        return;
      }

      if (data.liked) {
        setLikedPhotos((prev) => {
          if (prev.includes(Number(imageId))) {
            return prev;
          }

          return [...prev, Number(imageId)];
        });
      } else {
        setLikedPhotos((prev) =>
          prev.filter(
            (id) => Number(id) !== Number(imageId)
          )
        );
      }

      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to update like.");
    }
  };

  const getImageUrl = (photo) => {
    if (!photo.image_url) {
      return "";
    }

    if (photo.image_url.startsWith("http://")) {
      return photo.image_url;
    }

    if (photo.image_url.startsWith("https://")) {
      return photo.image_url;
    }

    return `${API_URL.replace("/api", "")}${photo.image_url}`;
  };

  return (
    <div className="member-photos-page">

      <div className="member-photos-header">
        <div>
          <h2>School Photos</h2>
          <p>
            Select a school to view all photos uploaded by the school.
          </p>
        </div>

        <div className="member-photo-count">
          {loadingPhotos ? "..." : `${photos.length} Photos`}
        </div>
      </div>

      <div className="member-photo-school-selector">

        <div className="member-photo-selector-title">
          <strong>Select School</strong>
          <span>
            Choose a school to view its photos
          </span>
        </div>

        {loadingSchools ? (
          <div className="member-photo-empty">
            Loading schools...
          </div>
        ) : schools.length === 0 ? (
          <div className="member-photo-empty">
            No schools available.
          </div>
        ) : (
          <div className="member-school-selector-list">

            {schools.map((school) => (
              <button
                key={school.id}
                type="button"
                className={
                  selectedSchool?.id === school.id
                    ? "member-school-select active"
                    : "member-school-select"
                }
                onClick={() => setSelectedSchool(school)}
              >
                <span className="member-school-select-avatar">
                  {(school.name || "S")
                    .charAt(0)
                    .toUpperCase()}
                </span>

                <span className="member-school-select-info">
                  <strong>{school.name}</strong>

                  <small>
                    {school.location ||
                      school.address ||
                      "Zanzibar"}
                  </small>
                </span>
              </button>
            ))}

          </div>
        )}

      </div>

      {selectedSchool && (
        <div className="member-selected-school">

          <div>
            <span>SELECTED SCHOOL</span>

            <h3>
              {selectedSchool.name}
            </h3>

            <p>
              {selectedSchool.location ||
                selectedSchool.address ||
                "Zanzibar"}
            </p>
          </div>

          <div className="member-selected-photo-count">
            {photos.length} Photos
          </div>

        </div>
      )}

      {message && (
        <div className="member-photo-message">
          {message}
        </div>
      )}

      {loadingPhotos ? (
        <div className="member-photo-empty">
          Loading photos...
        </div>
      ) : photos.length === 0 ? (
        <div className="member-photo-empty">
          <strong>No photos available</strong>

          <p>
            This school has not uploaded any photos yet.
          </p>
        </div>
      ) : (
        <div className="member-photo-grid">

          {photos.map((photo) => {

            const imageId = Number(photo.id);

            const liked =
              likedPhotos.includes(imageId);

            const imageUrl =
              getImageUrl(photo);

            return (
              <div
                className="member-photo-item"
                key={imageId}
              >

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={
                      photo.title ||
                      "School Photo"
                    }
                    className="member-photo-image"
                    onError={(e) => {
                      console.error(
                        "Image failed:",
                        imageUrl
                      );

                      e.currentTarget.style.display =
                        "none";

                      if (
                        e.currentTarget
                          .nextElementSibling
                      ) {
                        e.currentTarget
                          .nextElementSibling
                          .style.display = "flex";
                      }
                    }}
                  />
                ) : null}

                <div
                  className="member-photo-no-image"
                  style={{
                    display: imageUrl
                      ? "none"
                      : "flex",
                  }}
                >
                  No Image
                </div>

                <div className="member-photo-info">

                  <strong>
                    {photo.title ||
                      "School Photo"}
                  </strong>

                  {photo.caption && (
                    <span>
                      {photo.caption}
                    </span>
                  )}

                  <div className="member-photo-actions">

                    <button
                      type="button"
                      className={
                        liked
                          ? "member-like-button liked"
                          : "member-like-button"
                      }
                      onClick={() =>
                        toggleLike(imageId)
                      }
                    >
                      {liked
                        ? "♥ Liked"
                        : "♡ Like"}
                    </button>

                    <span className="member-photo-school-name">
                      {selectedSchool.name}
                    </span>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}
