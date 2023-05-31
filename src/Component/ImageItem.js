import React from "react";
import ImageList from "@mui/material/ImageList";
import Button from "@mui/material/Button";
import "../pages/style/Gallery.css";

export default function ImageItem({ image }) {

  return (
    <div>
      <ImageList
        className="ImageList"
        sx={{ width: "auto", height: "auto" }}
        cols={3}
      >
        <img
          className="imagehome"
          src={"http://localhost:3000/" + image.name}
          alt={"http://localhost:3000/" + image.url}
        />
      </ImageList>

    </div>
  );
}