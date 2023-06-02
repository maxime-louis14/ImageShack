import { useEffect } from "react";

export default function UpdateImage(imageId, newIsPublic, token) {
  useEffect(() => {
    const UpdateImage = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/images/${imageId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isPublic: newIsPublic }),
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la requête");
        }

        // Mettez à jour l'image dans l'API si nécessaire
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    UpdateImage();
  }, [imageId, newIsPublic, token]);
}
