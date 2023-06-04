import { useEffect, useState } from "react";

export default function useImagesApi() {
  const [imageData, setImageData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:3001/images", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
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
  }, [token]);

  return imageData;
}
