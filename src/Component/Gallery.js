import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import '../pages/style/Gallery.css'; // Assurez-vous d'importer le fichier CSS approprié

export default function Gallery() {
  const [ImageData, setImageData] = useState([]);
  const token = localStorage.getItem("token");

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
  }, []);

  console.log(ImageData);

  return (
    <ImageList className="ImageList" sx={{ width: "auto", height: "auto" }} cols={3}>
      {ImageData.map((images, index) => (
        <ImageListItem key={index}>
          <img className="imagehome" src={"http://localhost:3000/" + images.name} alt={"http://localhost:3000/" + images.url} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
