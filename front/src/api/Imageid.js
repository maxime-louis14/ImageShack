export default function Imageid(imageId, newIsPublic, token) {
  const Imageid = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/images/${imageId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      // Mettez à jour l'image dans l'API si nécessaire
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  Imageid();
}
