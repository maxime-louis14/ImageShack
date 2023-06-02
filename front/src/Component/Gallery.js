import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import '../pages/style/Gallery.css'; // Assurez-vous d'importer le fichier CSS approprié

export default function ImagePublicPrive() {
  const [ImageData, setImageData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isPublic, setIsPublic] = useState(true); // État pour déterminer si les images sont publiques ou privées

  useEffect(() => {
    fetch("http://localhost:3000/images", {
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
        setImageData(data);
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  }, [token]);

  const handlePublicClick = () => {
    setIsPublic(true);
  };

  const handlePrivateClick = () => {
    setIsPublic(false);
  };

  const handleRoleChange = (imageId, isPublic) => {
    // Faites la requête API pour mettre à jour le rôle (public/privé) de l'image avec l'ID spécifié
    // Remplacez la requête API fictive par votre propre logique de mise à jour des données
    const updatedImageData = ImageData.map(image => {
      if (image.id === imageId) {
        return { ...image, isPublic: !isPublic };
      }
      return image;
    });

    // Met à jour l'état avec les nouvelles données des images
    setImageData(updatedImageData);
  };

  return (
    <div>
      <Button variant="contained" onClick={handlePublicClick}>
        Afficher les images publiques
      </Button>
      <Button variant="contained" onClick={handlePrivateClick}>
        Afficher les images privées
      </Button>
      <ImageList className="ImageList" sx={{ width: "720px", height: "auto" }} cols={3}>
        {ImageData.map((image, index) => {
          if ((isPublic && image.isPublic) || (!isPublic && !image.isPublic)) {
            return (
              <ImageListItem key={index}>
                <img
                  className="imagehome"
                  src={"http://localhost:3000/" + image.name}
                  alt={"http://localhost:3000/" + image.url}
                />
                <Button
                  variant="contained"
                  onClick={() => handleRoleChange(image.id, image.isPublic)}
                >
                  {image.isPublic ? "Public" : "Privé"}
                </Button>
              </ImageListItem>
            );
          }
          return null;
        })}
      </ImageList>
    </div>
  );
}
