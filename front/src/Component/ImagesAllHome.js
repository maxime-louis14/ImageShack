import React, { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImagesApi from "../api/ImagesApi";
import ImageItem from "./ImageItem";

export default function ImagesAllHome() {
  const [Images, setImages] = useState([]);
  const imagesData = ImagesApi();

  useEffect(() => {
    if(imagesData) {
      setImages(imagesData)
    }
  })


  return (
    <ImageList sx={{ width: 500, height: 400 }} cols={3}>
      {Images ? (
        Images.map(image => (
          <ImageItem key={image.id} image={image} />
        ))
      ) : (
        ""
      )}
    </ImageList>
  );
  
}
