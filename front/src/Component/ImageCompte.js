import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageItem from "./ImageItem";
import useImagesApi from "../api/ImagesApi";
import Imageid from "../api/Imageid";

export default function ImagesCompte({ handleRoleChange }) {
  // Déclaration des états
  const [images, setImages] = useState([]); // État pour stocker les images
  const imageData = useImagesApi(); // Appel au hook personnalisé useImagesApi
  const [isPublicMap, setIsPublicMap] = useState({}); // État pour stocker les statuts de visibilité des images

  // Utilisation de useEffect pour effectuer une action après le rendu initial ou lorsqu'une dépendance change
  useEffect(
    () => {
      if (imageData) {
        setImages(imageData); // Mise à jour de l'état des images avec les données récupérées depuis useImagesApi

        const map = {};
        imageData.forEach(image => {
          map[image.id] = image.isPublic; // Création d'une carte (map) pour stocker les statuts de visibilité des images
        });
        setIsPublicMap(map); // Mise à jour de l'état de la carte des statuts de visibilité
      }
    },
    [imageData]
  );

  // Fonction pour gérer le changement de statut de visibilité d'une image
  const handleImageRoleChange = async id => {
    const token = localStorage.getItem("token");
    const newIsPublic = !isPublicMap[id]; // Inversion du statut de visibilité actuel

    try {
      await Imageid(id, newIsPublic, token); // Appel à la fonction Imageid pour mettre à jour le statut de visibilité dans l'API
      setIsPublicMap(prevMap => ({
        ...prevMap,
        [id]: newIsPublic // Mise à jour du statut de visibilité dans l'état de la carte
      }));
    } catch (error) {
      console.error("Error changing visibility:", error);
    }
  };

  return (
    <div>
      <ImageList cols={3}>
        {images.map(image =>
          <div key={image.id}>
            <ImageItem
              key={image.id}
              image={image}
              handleRoleChange={handleImageRoleChange}
              isPublic={isPublicMap[image.id]} // Passage du statut de visibilité à l'élément ImageItem
            />
            <button
              className="customButton"
              onClick={() => {
                handleRoleChange(); // Appel à la fonction handleRoleChange pour gérer le rôle de l'image
              }}
            >
              Changer le statut
            </button>
          </div>
        )}
      </ImageList>
    </div>
  );
}
