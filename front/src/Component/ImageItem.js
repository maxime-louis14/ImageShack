import React from "react";
import "../pages/style/Gallery.css";

export default function ImageItem({ image }) {
  return (
    <div>
      <div className="ImageList" style={{ width: "auto", height: "auto" }}>
        <img
          className="imagehome"
          src={"http://localhost:3001/" + image.name}
          alt={image.url}
        />
      </div>
    </div>
  );
}
