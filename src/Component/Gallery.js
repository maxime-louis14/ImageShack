import React from "react";
import Imgix from "react-imgix";

const images = [
  "forest1",
  "forest2",
  "forest3",
  "mountain1",
  "mountain2",
  "mountain3",
  "river1",
  "river2",
  "river3",
];

const buildURL = (imagePath) =>
  `https://assets.imgix.net/tutorials/${imagePath}.webp`;

const Gallery = () => {
  return (
    <div className="gallery">
      {images.map((image) => (
        <Imgix
          key={image}
          src={buildURL(image)}
          imgixParams={{
            fit: "crop",
            fm: "jpg",
          }}
          width="495"
          height="600"
          sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ))}
    </div>
  );
};

export default Gallery;
