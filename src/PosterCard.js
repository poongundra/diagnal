import React, { useEffect, useState } from "react";
import axios from "axios";

export const PosterCard = ({ index, name, posterImage }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://test.create.diagnal.com/images/${posterImage}`
        );
        setImageSrc(response.config.url); // Getting the image URL as 'imageUrl'
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [posterImage]);

  return (
    <div className="flex flex-col items-center bg-primary">
      <div className="aspect-w-2 aspect-h-3 w-full">
        <img
          key={index}
          loading="lazy"
          src={
            posterImage !== "posterthatismissing.jpg"
              ? imageSrc
              : "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"
          }
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-center mt-2 text-white">{name}</p>
    </div>
  );
};
