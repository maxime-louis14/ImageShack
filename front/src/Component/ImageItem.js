import React from "react";
import "../pages/style/Gallery.css";

export default function ImageItem({ image, handleRoleChange, isPublic }) {
  const handleClick = () => {
    handleRoleChange(image._id);
  };

  return (
    <>
    <div>
      {isPublic && (
        <div className="ImageList" style={{ width: "auto", height: "auto" }}>
          <img
            className="imagehome"
            src={"http://localhost:3001/" + image.name}
            alt={"http://localhost:3001/" + image.url}
          />
        </div>
      )}
      {isPublic && (
        <button className="customButton" onClick={handleClick}>
          Changer le statut
        </button>
      )}
      </div>
    </>
  );
}
