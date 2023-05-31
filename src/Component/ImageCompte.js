import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImagesApi from "../api/Api";
import ImageItem from "./ImageItem";

export default function ImagesAllHome() {
  const [images, setImages] = useState(ImagesApi());

  const handleRoleChange = (imageId) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === imageId) {
          return {
            ...image,
            role: image.role === "public" ? "Priveé" : "public",
          };
        }
        return image;
      });
    });
  };

  return (
    <>
      <ImageList sx={{ width: "auto", height: "auto" }} cols={3}>
        {images.map((image) => (
          <ImageItem
            key={image.id}
            image={image}
            handleRoleChange={() => handleRoleChange(image.id)}
          />
        ))}
        <img
          className="imagehome"
          src={"http://localhost:3000/" + images.name}
          alt={"http://localhost:3000/" + images.url}
        />
      </ImageList>
      <button onClick={() => handleRoleChange(0)}>
        Changer le rôle de l'image supplémentaire
      </button>
    </>
  );
}
