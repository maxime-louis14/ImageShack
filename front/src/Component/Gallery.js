import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import '../pages/style/Gallery.css'; // Assurez-vous d'importer le fichier CSS approprié
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [ImageData, setImageData] = useState([]);
  const token = localStorage.getItem("token");
  const Navigate = useNavigate()
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
        console.log('la liste des fichier', data)
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
        <ImageListItem key={index} onClick={() => Navigate(`/image/${images.url}`, {state: images})}>
          <img className="imagehome" src={"http://localhost:3000/" + images.name} alt={"http://localhost:3000/" + images.url} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}