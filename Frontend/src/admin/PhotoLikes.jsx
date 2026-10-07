import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

export default function PhotoLikes() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPhotoLikes = async () => {
      try {
        const token = localStorage.getItem("shulebora_token");

        if (!token) {
          setError("No admin login session found.");
          setLoading(false);
          return;
        }

        const url = `${API_URL}/dashboard/admin/photo-likes`;

        console.log("PHOTO LIKES URL:", url);

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();

        console.log("PHOTO LIKES STATUS:", response.status);
        console.log("PHOTO LIKES RAW:", text);

        let data;

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            `Server returned invalid JSON. Status: ${response.status}`
          );
        }

        if (!response.ok) {
          throw new Error(
            data.message || `Request failed: ${response.status}`
          );
        }

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load photo likes."
          );
        }

        setPhotos(
          Array.isArray(data.likes)
            ? data.likes
            : []
        );
      } catch (err) {
        console.error("PHOTO LIKES ERROR:", err);
        setError(err.message || "Failed to load photo likes.");
      } finally {
        setLoading(false);
      }
    };

    loadPhotoLikes();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          background: "#fff",
          minHeight: "400px",
        }}
      >
        <h2>Photo Likes</h2>
        <p>Loading photo likes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "30px",
          background: "#fff",
          minHeight: "400px",
        }}
      >
        <h2>Photo Likes</h2>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#fff0f0",
            border: "1px solid #ffcccc",
            borderRadius: "8px",
            color: "#b00020",
          }}
        >
          <strong>Error:</strong>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#222",
            }}
          >
            Photo Likes
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#666",
            }}
          >
            School photos liked by members.
          </p>
        </div>

        <div
          style={{
            padding: "12px 20px",
            background: "#0092d0",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "700",
          }}
        >
          {photos.length} Photos
        </div>
      </div>

      {photos.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "50px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <h3>No Photo Likes Yet</h3>

          <p style={{ color: "#777" }}>
            No liked photos were returned from the server.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.image_id}
              style={{
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px",
                    color: "#222",
                  }}
                >
                  {photo.photo_title || "School Photo"}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#0092d0",
                    fontWeight: "600",
                  }}
                >
                  {photo.school_name || "Unknown School"}
                </p>
              </div>

              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    paddingBottom: "15px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <span>❤️ Total Likes</span>

                  <strong>
                    {photo.like_count || 0}
                  </strong>
                </div>

                <h4>Members who liked this photo</h4>

                {Array.isArray(photo.members) &&
                photo.members.length > 0 ? (
                  photo.members.map((member, index) => (
                    <div
                      key={
                        member.id ||
                        `${photo.image_id}-${index}`
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 0",
                        borderBottom:
                          "1px solid #f0f0f0",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#0092d0",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                        }}
                      >
                        {(member.name || "M")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong
                          style={{
                            display: "block",
                          }}
                        >
                          {member.name ||
                            "Unknown Member"}
                        </strong>

                        <span
                          style={{
                            display: "block",
                            fontSize: "13px",
                            color: "#777",
                          }}
                        >
                          {member.email ||
                            "No email"}
                        </span>

                        {member.created_at && (
                          <small
                            style={{
                              color: "#999",
                            }}
                          >
                            {String(
                              member.created_at
                            )}
                          </small>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#888" }}>
                    No member information available.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
