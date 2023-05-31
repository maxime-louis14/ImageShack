import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import '../pages/style/Gallery.css'; // Assurez-vous d'importer le fichier CSS approprié

export default function ImagesApi() {
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

  return ImageData;
}
