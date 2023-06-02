import React from "react";
import ImageList from "@mui/material/ImageList";
import Button from "@mui/material/Button";
import "../pages/style/Gallery.css";

export default function ImageItem({ image, handleRoleChange, isPublic }) {
  const handleClick = () => {
    handleRoleChange(image.id);
  };

  return (
    <div>
      <ImageList
        className="ImageList"
        sx={{ width: "auto", height: "auto" }}
        cols={3}
      >
        {isPublic && ( // Afficher l'image uniquement si isPublic est true
          <img
            className="imagehome"
            src={"http://localhost:3000/" + image.name}
            alt={"http://localhost:3000/" + image.url}
          />
        )}
      </ImageList>
      {isPublic && ( // Afficher le bouton uniquement si isPublic est true
        <Button onClick={handleClick}>Changer le statut</Button>
      )}
    </div>
  );
}

