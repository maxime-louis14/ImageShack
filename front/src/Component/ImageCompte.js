import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageItem from "./ImageItem";
import ImagesApi from "../api/Api";
import UpdateImage from "../api/UpdateImage";

export default function ImagesCompte() {
  const [Images, setImages] = useState([]);
  const images = ImagesApi();
  const [isPublicMap, setIsPublicMap] = useState({}); // État pour suivre l'état isPublic de chaque image

  useEffect(() => {
    setImages(images);

    // Créer une carte des états isPublic pour chaque image
    const map = {};
    images.forEach((image) => {
      map[image.id] = image.isPublic;
    });
    setIsPublicMap(map);
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
    <>
      <ImageList sx={{ width: "auto", height: "auto" }} cols={3}>
        {images.map((image) => (
          <ImageItem
            key={image.id}
            image={image}
            handleRoleChange={handleRoleChange}
            isPublic={isPublicMap[image.id]} // Passer l'état isPublic correspondant à chaque image
          />
        ))}
      </ImageList>
    </>
  );
}

