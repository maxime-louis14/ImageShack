import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import "../pages/style/Gallery.css"; // Assurez-vous d'importer le fichier CSS approprié
import { useNavigate } from "react-router-dom";

export default function ImageCompte() {
  const [ImageData, setImageData] = useState([]);
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/imagesUser", {
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
        console.log("la liste des fichiers", data);
        data.sort((a,b) => {
          return new Date(b.date) - new Date(a.date);
        })
        setImageData(data);
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  }, []);

  const toggleImagePrivacy = (id) => {
    // Envoyez une requête pour changer l'état de l'image en privé ou public
    // Utilisez la méthode appropriée (PUT ou PATCH) pour mettre à jour l'état de l'image
    // Mettez à jour l'état de l'image dans le tableau ImageData en conséquence
    // Par exemple, vous pouvez utiliser une requête comme celle-ci :
    fetch("http://localhost:3001/images/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ private: true }) // Modifiez la valeur de `private` selon vos besoins
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }
        return response.json();
      })
      .then(data => {
        // Mettez à jour l'état de l'image dans le tableau ImageData
        const updatedImageData = ImageData.map(image =>
          image.id === id ? { ...image, private: true } : image
        );
        setImageData(updatedImageData);
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  };

  

  return (
    <div>
      <ImageList className="ImageList" sx={{ width: "50vw", height: "auto" }} cols={1}>
        {ImageData && ImageData.map((image, index) => {
          
          let monthactive; 
        let previousdate;
        let previousmonth;
        const imagedate = new Date(image.date)
        const imagemonth = imagedate.toLocaleString("default", {month: 'long'})
        if(ImageData[index - 1]){
          previousdate = new Date(ImageData[index - 1].date)
          previousmonth = previousdate.toLocaleString("default", {month: 'long'})
        }
        if(previousdate && imagedate && previousmonth == imagemonth){
          monthactive = false
        } else {
          
          monthactive = true
        }
          return (
            <div>
          <ImageListItem key={index} onClick={() => Navigate(`/image/${image.url}`, { state: image })}>
            {monthactive && (
              <h2>{new Date(image.date).toLocaleString("default", {
                month: "long",
              })}</h2>
            )}
            {/* Affiche un indicateur "Privé" si l'image est privée */}
            {image.isPublic ? (
              <span className="private-indicator">Public</span>
            ) : <span className="private-indicator">Privée</span>}
            <p>
                        
                        {new Date(image.date).toLocaleString("default", {
                          day: "numeric",
                          month: "long",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
            <img
              className="imagehome"
              src={"http://localhost:3001/" + image.name}
              alt={"http://localhost:3001/" + image.url}
            />
 
          </ImageListItem>
           {/* Affiche un bouton pour changer la confidentialité de l'image */}
          <Button
              variant="contained"
              onClick={() => toggleImagePrivacy(image.id)}
            >
              Changer la confidentialité
            </Button>
          </div>
        )})}
      </ImageList>
    </div>
  );
  
}