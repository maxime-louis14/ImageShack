import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import "../pages/style/Gallery.css";
import { useNavigate } from "react-router-dom";

export default function ImageCompte() {
  const [ImageData, setImageData] = useState([]);
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/imagesUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        return response.json();
      })
      .then(data => {
        const updatedData = data.map(image => ({
          ...image,
          private: !image.isPublic
        }));
        setImageData(updatedData);
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  }, []);

  const toggleImagePrivacy = (id) => {
    const imageToUpdate = ImageData.find(image => image.id === id);
    const isPrivate = imageToUpdate.private;

    const updatedImage = {
      ...imageToUpdate,
      private: !isPrivate
    };

    fetch("http://localhost:3001/images/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ private: !isPrivate })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        return response.json();
      })
      .then(data => {
        const updatedImageData = ImageData.map(image =>
          image.id === id ? updatedImage : image
        );
        setImageData(updatedImageData);
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  };

  const deleteImage = (id) => {
    fetch("http://localhost:3001/deleteImage/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setImageData(prevData =>
          prevData.filter(image => image.id !== id)
        );
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }

  return (
    <div>
      <ImageList className="ImageList" sx={{ width: "auto", height: "auto" }} cols={3}>
        {ImageData.map((image, index) => (
          <div key={index}>
            <ImageListItem onClick={() => Navigate(`/image/${image.url}`, { state: image })}>
              {image.private ? (
                <span className="private-indicator">Privée</span>
              ) : (
                <span className="private-indicator">Public</span>
              )}
              <img
                className="imagehome"
                src={"http://localhost:3001/" + image.name}
                alt={"http://localhost:3001/" + image.url}
              />
            </ImageListItem>
            <Button variant="contained" onClick={() => toggleImagePrivacy(image.id)}>
              Changer la confidentialité
            </Button>
            <button
              onClick={() => deleteImage(image.id)}
              className="delete-image-buttonCompte"
            >
              Supprimer une image
            </button>
          </div>
        ))}
      </ImageList>
    </div>
  );
}
