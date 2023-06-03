import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageItem from "./ImageItem";
import ImagesApi from "../api/Api";
import UpdateImage from "../api/UpdateImage";

export default function ImagesCompte() {
  const [Images, setImages] = useState([]);
  const images = ImagesApi();
  const [isPublicMap, setIsPublicMap] = useState({});

  useEffect(() => {
    // Vérifier si `images` a une valeur avant de l'utiliser pour définir `Images`
    if (images) {
      setImages(images);
      
      // Créer une carte des états isPublic pour chaque image
      const map = {};
      images.forEach((image) => {
        map[image._id] = image.isPublic;
      });
      setIsPublicMap(map);
    }
  }, [images]);

  const handleRoleChange = (imageId) => {
    const token = localStorage.getItem("token");
    const newIsPublic = !isPublicMap[imageId];

    UpdateImage(imageId, newIsPublic, token);

    setIsPublicMap((prevMap) => ({
      ...prevMap,
      [imageId]: newIsPublic,
    }));
  };

  return (
    <div>
      <ImageList cols={3}>
        {Images.map((image) => (
          <ImageItem
            key={image._id}
            image={image}
            handleRoleChange={handleRoleChange}
            isPublic={isPublicMap[image._id]}
          />
        ))}
      </ImageList>
    </div>
  );
}
