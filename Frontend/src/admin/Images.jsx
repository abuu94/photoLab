import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("shulebora_token");

  const loadImages = async () => {
    try {
      setLoading(true);

      const schoolResponse = await fetch(
        `${API_URL}/schools/my-school`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const schoolData = await schoolResponse.json();

      if (!schoolResponse.ok) {
        throw new Error(
          schoolData.message || "Failed to load school"
        );
      }

      const schoolId =
        schoolData.school?.id ||
        schoolData.data?.id ||
        schoolData.id;

      if (!schoolId) {
        throw new Error("Unable to identify your assigned school.");
      }

      const response = await fetch(
        `${API_URL}/content/images/${schoolId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load images"
        );
      }

      setImages(data.images || []);
    } catch (error) {
      console.error("Images loading error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("image", imageFile);
      formData.append("title", title);

      const response = await fetch(
        `${API_URL}/content/images`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to upload image"
        );
      }

      setTitle("");
      setImageFile(null);

      const fileInput =
        document.getElementById("school-image-file");

      if (fileInput) {
        fileInput.value = "";
      }

      alert("Photo uploaded successfully!");

      await loadImages();
    } catch (error) {
      console.error("Image upload error:", error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/content/images/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete image"
        );
      }

      await loadImages();
    } catch (error) {
      console.error("Image delete error:", error);
      alert(error.message);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    return `${API_URL}/content/uploads/${imagePath}`;
  };

  return (
    <div className="superadmin-section-page">

      <div className="superadmin-section-header">
        <div>
          <p className="superadmin-eyebrow">MEDIA</p>

          <h1>School Photos</h1>

          <p>
            Manage photos displayed on your school profile.
          </p>
        </div>
      </div>

      {/* UPLOAD */}
      <div className="superadmin-settings-card">
        <div className="settings-group">
          <h3>Upload School Photo</h3>

          <form onSubmit={handleUpload}>

            <div className="settings-form-grid">

              <div className="settings-field">
                <label>Photo Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. School Building"
                />
              </div>

              <div className="settings-field">
                <label>Select Photo</label>

                <input
                  id="school-image-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(e.target.files[0] || null)
                  }
                  required
                />
              </div>

            </div>

            <div className="superadmin-card-actions">

              <button
                type="submit"
                className="superadmin-primary-button"
                disabled={uploading}
              >
                {uploading
                  ? "Uploading..."
                  : "Upload Photo"}
              </button>

            </div>

          </form>
        </div>
      </div>

      {/* PHOTO LIST */}
      <div className="superadmin-panel">

        <div className="superadmin-panel-header">
          <div>
            <h2>My School Photos</h2>

            <p>
              {images.length} photo
              {images.length === 1 ? "" : "s"} uploaded.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="superadmin-empty-state">
            <p>Loading photos...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="superadmin-empty-state">

            <h3>No photos available</h3>

            <p>
              Upload your first school photo to display
              it on your school profile.
            </p>

          </div>
        ) : (
          <div className="superadmin-photo-grid">

            {images.map((image) => (

              <div
                className="superadmin-photo-card"
                key={image.id}
              >

                <div className="superadmin-photo-preview">

                  <img
                    src={getImageUrl(image.image_path)}
                    alt={image.title || "School photo"}
                  />

                </div>

                <div className="superadmin-photo-body">

                  <div className="superadmin-photo-title-row">

                    <div>

                      <h3>
                        {image.title || "School Photo"}
                      </h3>

                      {image.created_at && (
                        <p>
                          {new Date(
                            image.created_at
                          ).toLocaleDateString()}
                        </p>
                      )}

                    </div>

                  </div>

                  <div className="superadmin-card-actions">

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          getImageUrl(image.image_path),
                          "_blank"
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(image.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Images;
